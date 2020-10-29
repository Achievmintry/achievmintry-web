import { abis } from "@project/contracts";

export class TokenService {
  web3;
  contract;
  accountAddress;

  constructor(web3, tokenAddr, accountAddress) {
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abis.erc20, tokenAddr);
    this.accountAddress = accountAddress;
  }

  async getSymbol(override) {
    let symbol;

    if (override) {
      return override;
    }

    try {
      symbol = await this.contract.methods.symbol().call();
    } catch {
      symbol = "unknown";
    }

    if (symbol.indexOf("0x") > -1) {
      symbol = this.web3.utils.hexToUtf8(symbol);
    }

    return symbol;
  }

  async getDecimals() {
    let decimals;

    try {
      decimals = await this.contract.methods.decimals().call();
      return decimals;
    } catch {
      return 18;
    }
  }

  async totalSupply(token) {
    const contract = token
      ? new this.web3.eth.Contract(abis.erc20, token)
      : this.contract;
    const totalSupply = await contract.methods.totalSupply().call();
    return totalSupply;
  }

  async balanceOf(
    account = this.accountAddress,
    atBlock = "latest",
    token = null
  ) {
    const contract = token
      ? new this.web3.eth.Contract(abis.erc20, token)
      : this.contract;

    const balanceOf = await contract.methods
      .balanceOf(account)
      .call({}, atBlock);

    return balanceOf;
  }

  async balanceOfToken(token) {
    if (!token) {
      return;
    }
    const contract = new this.web3.eth.Contract(abis.erc20, token);

    const balanceOf = await contract.methods
      .balanceOf(this.accountAddress)
      .call({});
    const decimals = await contract.methods.decimals().call();

    return balanceOf / 10 ** decimals;
  }

  async allowance(contractAddr, accountAddr = this.accountAddress) {
    const allowance = await this.contract.methods
      .allowance(accountAddr, contractAddr)
      .call();
    return allowance;
  }
}

export class Web3TokenService extends TokenService {
  async approve(wad, address) {
    const txReceipt = await this.contract.methods
      .approve(address, wad)
      .send({ from: this.accountAddress });

    return txReceipt.transactionHash;
  }

  async deposit(amount) {
    const txReceipt = await this.contract.methods
      .deposit()
      .send({ from: this.accountAddress, value: amount });

    return txReceipt.transactionHash;
  }

  async transfer(dest, wad) {
    const txReceipt = await this.contract.methods
      .transfer(dest, wad)
      .send({ from: this.accountAddress });

    return txReceipt.transactionHash;
  }

  async unlock(token, address) {
    if (token === "0x000000000000000") {
      return;
    }
    const contract = new this.web3.eth.Contract(abis.erc20, token);
    const max = this.web3.utils.toBN(2).pow(this.web3.utils.toBN(255));
    const txReceipt = await contract.methods
      .approve(address, max.toString())
      .send({ from: this.accountAddress });

    return txReceipt.transactionHash;
  }

  async unlocked(token, contractAddr, accountAddr = this.accountAddress) {
    if (token === "0x000000000000000") {
      return 0;
    }
    const contract = new this.web3.eth.Contract(abis.erc20, token);
    const allowance = await contract.methods
      .allowance(accountAddr, contractAddr)
      .call();
    return allowance;
  }
}
