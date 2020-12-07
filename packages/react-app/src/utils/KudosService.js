import { abis } from "@project/contracts";
import Web3 from "web3";

export class KudosService {
  web3;
  contract;

  constructor(tokenAddr, web3 = null) {
    if (!web3) {
      console.log("new web3");
      web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_RPC)
      );
    }
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abis.kudos, tokenAddr);

    this.sendTx = this.sendTx; // eslint-disable-line
    this.tokenOfOwnerByIndex = this.tokenOfOwnerByIndex; // eslint-disable-line
    this.getChievsById = this.getChievsById; // eslint-disable-line
    this.getNumClonesInWild = this.getNumClonesInWild; // eslint-disable-line
    this.getLatestId = this.getLatestId; // eslint-disable-line
    this.displayPrice = this.displayPrice; // eslint-disable-line
    this.getLogs = this.getLogs; // eslint-disable-line
    this.getOwnedForAccount = this.getOwnedForAccount; // eslint-disable-line
    this.getTokenUri = this.getTokenUri // eslint-disable-line
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

  async getChievsById(tokenId) {
    let token;
    try {
      token = await this.contract.methods.getChievsById(tokenId).call();
      return token;
    } catch {
      return undefined;
    }
  }

  async getTokenUri(tokenId) {
    try {
      const uri = await this.contract.methods.tokenURI(tokenId).call();
      const data = await fetch(uri);
      return data.json();
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
    const logs = await this.contract.getPastEvents("Transfer", {
      // filter: {
      //   myIndexedParam: [20, 23],
      //   myOtherIndexedParam: "0x123456789...",
      // }, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: "latest",
    });

    console.log('logs', logs);

    const sortedLogs = logs.sort(function(a, b) {
      return a.blockNumber - b.blockNumber;
    });
    // console.log('sortedLogs', sortedLogs);
    const origOwners = {};
    sortedLogs.forEach((item) => {
      const account = item.returnValues.to.toLowerCase();
      if (
        item.returnValues.from === "0x0000000000000000000000000000000000000000"
      ) {
        origOwners[account] = origOwners[account] || [];
        origOwners[account].push(item.returnValues.tokenId);
      }
    });

    const currentOwners = {};
    sortedLogs.forEach((item) => {
      const account = item.returnValues.to.toLowerCase();
      currentOwners[account] = currentOwners[account] || [];
      currentOwners[account].push(item.returnValues.tokenId);
    });

    return {
      sortedLogs,
      origOwners,
      currentOwners,
    };
  }

  async getOwnedForAccount(ownersObj, acct) {
    const promises = [];
    const nftsOc = [];

    // ownersObj list of all accts that own a token and the token ids it owns

    // get only nfts where *account* is owner
    // get onchain data
    if (!ownersObj[acct]) {
      return {};
    }
    ownersObj[acct].forEach((item) => {
      promises.push(this.getChievsById(item));
    });
    const nftData = await Promise.all(promises);
    // console.log('nftData', nftData);
    // get details of all *acct* owned tokens and flag if gen0
    ownersObj[acct].forEach((item, idx) => {
      const kudo = {
        tokenId: item,
        gen0: nftData[idx].clonedFromId === item,
        clonedFromId: nftData[idx].clonedFromId,
        count: 0,
      };
      nftsOc.push(kudo);
    });
    // for each unique owned nft get count
    var counts = {};
    nftsOc.forEach((item, idx) => {
      counts[item.clonedFromId] = 1 + (counts[nftsOc[idx].clonedFromId] || 0);
    });
    return counts;
  }

  getGen0Owned(ownersObj, acct, counts) {
    const gen0Ownership = {};

    Object.keys(counts).forEach((countItem) => {
      const index = ownersObj[acct].findIndex((item) => {
        return item === countItem;
      });

      if (index > -1) {
        gen0Ownership[countItem] = true;
      } else {
        gen0Ownership[countItem] = false;
      }
    });
    return gen0Ownership;
  }
}

export class Web3KudosService extends KudosService {
  constructor(...args) {
    super(...args);

    this.mint = this.mint; // eslint-disable-line
    this.burn = this.burn; // eslint-disable-line
    this.clone = this.clone; // eslint-disable-line
  }

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
