import { abis } from "@project/contracts";
import Web3 from "web3";

export class KudosService {
  web3;
  contract;
  tokenData = {};

  constructor(tokenAddr, web3 = null) {
    if (!web3) {
      console.log("new web3");
      web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_RPC)
      );
    }
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abis.kudos, tokenAddr);
  }

  sendTx(name, tx, callback, from, value) {
    return tx
      .send({ from: from, value: value })
      .on("transactionHash", (txHash) => {
        console.log("txHash", txHash);
        callback(txHash, name);
      })
      .on("error", (error) => callback(null, error));
  }

  async tokenOfOwnerByIndex(owner, index) {
    let tokenId;
    try {
      tokenId = await this.contract.methods
        .tokenOfOwnerByIndex(owner, index)
        .call();
    } catch {
      tokenId = undefined;
    }

    return tokenId;
  }

  async getKudosById(tokenId) {
    let token;
    try {
      token = await this.contract.methods.getKudosById(tokenId).call();
      return token;
    } catch {
      return undefined;
    }
  }

  async getNumClonesInWild(tokenId) {
    let count;
    try {
      count = await this.contract.methods.getNumClonesInWild(tokenId).call();
      return count;
    } catch {
      return undefined;
    }
  }

  async getLatestId() {
    let count;
    try {
      count = await this.contract.methods.getLatestId().call();
      return count;
    } catch {
      return undefined;
    }
  }

  displayPrice(price) {
    price = price.toString();
    return this.web3.utils.fromWei(price);
  }

  async getLogs() {
    const logs = await this.contract.getPastEvents("AllEvents", {
      filter: {
        myIndexedParam: [20, 23],
        myOtherIndexedParam: "0x123456789...",
      }, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: "latest",
    });

    const sortedLogs = logs.sort(function(a, b) {
      return a.blockNumber - b.blockNumber;
    });
    // console.log('sortedLogs', sortedLogs);
    const origOwners = {};
    sortedLogs.forEach((item) => {
      const account = item.returnValues._to.toLowerCase();
      if(item.returnValues._from === "0x0000000000000000000000000000000000000000"){
        origOwners[account] = origOwners[account] || []
        origOwners[account].push(item.returnValues._tokenId)
      }
    })

    const currentOwners = {};
    sortedLogs.forEach((item) => {
      const account = item.returnValues._to.toLowerCase();
      currentOwners[account] = currentOwners[account] || []
      currentOwners[account].push(item.returnValues._tokenId)
    })

    return {
      sortedLogs,
      origOwners,
      currentOwners
    }

  }
}

export class Web3KudosService extends KudosService {
  // admin
  async mint(to, from, priceFinney, numClonesAllowed, tokenURI) {
    await this.contract.methods.mint(
      to,
      priceFinney,
      numClonesAllowed,
      tokenURI
    );
  }

  // admin
  async burn(from, owner, tokenId) {
    await this.contract.methods.burn(owner, tokenId);
  }

  // public
  async clone(to, from, tokenId, numClonesRequested, value, callback) {
    console.log("clone", from);
    const newTx = this.contract.methods.clone(to, tokenId, numClonesRequested);
    const txReceipt = this.sendTx(
      "clone",
      newTx,
      callback,
      from,
      value,
      callback
    );
    return txReceipt.transactionHash;
  }
}
