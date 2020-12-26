import { abis } from "@project/contracts";
import Web3 from "web3";

import logData from "../data/chain-logs/0-13722094.json"

const fromBlock = 13722095;
export class ChievsService {
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
    this.contract = new web3.eth.Contract(abis.chievs, tokenAddr);

    this.sendTx = this.sendTx; // eslint-disable-line
    this.tokenOfOwnerByIndex = this.tokenOfOwnerByIndex; // eslint-disable-line
    this.getChievsById = this.getChievsById; // eslint-disable-line
    this.getNumClonesInWild = this.getNumClonesInWild; // eslint-disable-line
    this.getLatestId = this.getLatestId; // eslint-disable-line
    this.displayPrice = this.displayPrice; // eslint-disable-line
    this.getLogs = this.getLogs; // eslint-disable-line
    // this.getOwnedForAccount = this.getOwnedForAccount; // eslint-disable-line
    this.getTokenUri = this.getTokenUri; // eslint-disable-line
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
    const pastEvents = logData
    const curentEvents = await this.contract.getPastEvents("AllEvents", {
      fromBlock: fromBlock,
      toBlock: "latest",
    });

    const allEvents = [...pastEvents, ...curentEvents];

    const transferLogs = allEvents.filter((e) => e.event === "Transfer");
    const gen0Logs = allEvents.filter((e) => e.event === "MintGen0");
    const cloneLogs = allEvents.filter((e) => e.event === "Clone");
    // TODO: index other events

    // sort log oldest to newest so latest transfer is owner
    const sortedTransfers = transferLogs.sort(function(a, b) {
      return a.blockNumber - b.blockNumber;
    });
    // get the original owners
    // the first transfer maybe the one that counts
    const origOwners = {};
    sortedTransfers.forEach((item) => {
      const account = item.returnValues.to.toLowerCase();
      if (
        item.returnValues.from === "0x0000000000000000000000000000000000000000"
      ) {
        origOwners[account] = origOwners[account] || [];
        origOwners[account].push(item.returnValues.tokenId);
      }
    });

    // current owners in the case that someone has transfered ownership
    const currentOwners = {};
    sortedTransfers.forEach((item) => {
      const account = item.returnValues.to.toLowerCase();
      currentOwners[account] = currentOwners[account] || [];
      currentOwners[account].push(item.returnValues.tokenId);
    });

    // get all clone token info
    const clones = cloneLogs.map((token) => {
      return {
        type: "clone",
        blockNumber: token.blockNumber,
        sender: token.returnValues.sender,
        receiver: token.returnValues.receiver,
        tokenId: token.returnValues.tokenId,
        clonedFromId: token.returnValues.clonedFromId,
        details: token.returnValues.details,
        ownedBy: Object.keys(currentOwners).find(
          (owner) =>
            currentOwners[owner].indexOf(token.returnValues.tokenId) > -1
        ),
      };
    });

    // get all gen0 token info
    const gen0s = gen0Logs.map((token) => {
      return {
        type: "gen0",
        blockNumber: token.blockNumber,
        sender: null,
        receiver: token.returnValues.to,
        tokenId: token.returnValues.tokenId,
        clonedFromId: token.returnValues.tokenId,
        numClonesAllowed: token.returnValues.numClonesAllowed,
        cloner: token.returnValues.cloner,
        priceFinney: token.returnValues.priceFinney,
        ownedBy: Object.keys(currentOwners).find(
          (owner) =>
            currentOwners[owner].indexOf(token.returnValues.tokenId) > -1
        ),
        clones: clones.filter(
          (clone) => clone.clonedFromId === token.returnValues.tokenId
        ),
      };
    });
    // get all token info
    const allTokens = [...clones, ...gen0s];

    // get all tokens for all the current owners
    const usersTokens = [];
    Object.keys(currentOwners).forEach((key) => {
      const item = {
        address: key,
        tokens: allTokens.filter((token) => token.ownedBy === key),
      };
      usersTokens.push(item);
    });

    return {
      origOwners,
      currentOwners,
      usersTokens,
      allTokens,
    };
  }
}

export class Web3ChievsService extends ChievsService {
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

  async clone(to, from, tokenId, value, callback, details = "") {
    // to is an array

    const newTx = this.contract.methods.clone(to, tokenId, details);
    const txReceipt = this.sendTx(
      "clone",
      newTx,
      callback,
      from,
      value
    );
    return txReceipt.transactionHash;
  }
}
