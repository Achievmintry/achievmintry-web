pragma solidity ^0.5.0;

import 'https://github.com/Achievmintry/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC721/ERC721Full.sol';
import 'https://github.com/Achievmintry/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol';

/// @title Chievs
/// @author Dekan Brown <dekanbrown[at]odyssy.io>
/// @notice Chievs ERC721 interface for minting, cloning, and transferring Chievs tokens. Based on Kudos by Jason Haas <jasonrhaas[at]gmail.com>



contract Chievs is ERC721Full("ChievToken", "CHIEV"), Ownable {
    using SafeMath for uint256;
    
    event MintGen0(address indexed to, uint256 numClonesAllowed, uint256 indexed tokenId, address indexed cloner, uint256 priceFinney, uint256 permTokenId);
    event Clone(address indexed sender, address indexed receiver, uint256 tokenId, uint256 indexed clonedFromId, uint256 tokenOwnerFee, uint256 contractOwnerFee);
    event SetPrice(uint256 indexed tokenId, uint256 newPriceFinne);
    event SetCloner(uint256 indexed tokenId, address newCloner);
    event SetPermTokenId(uint256 indexed tokenId, uint256 newPermTokenId);
    event SetTokenUri(uint256 indexed tokenId, string _tokenURI);

    struct Chiev {
        uint256 priceFinney;
        uint256 numClonesAllowed;
        uint256 numClonesInWild;
        uint256 clonedFromId;
        address cloner;
        uint256 permTokenId;
    }

    Chiev[] public chievs;
    uint256 public cloneFeePercentage = 50;
    uint256 public minterTokenRole = 0;
    bool public isMintable = true;

    modifier mintable {
        require(
            isMintable == true,
            "New chievs are no longer mintable on this contract."
        );
        _;
    }

    constructor () public {
        // If the array is new, skip over the first index.
        if(chievs.length == 0) {
            Chiev memory _dummyChiev = Chiev({priceFinney: 0,numClonesAllowed: 0, numClonesInWild: 0,
                                           clonedFromId: 0, cloner: address(0), permTokenId: 0
                                           });
            chievs.push(_dummyChiev);
        }
    }

    /// @dev mint(): Mint a new Gen0 Chievs.  These are the tokens that other Chievs will be "cloned from".
    /// @param _to Address to mint to.
    /// @param _priceFinney Price of the Chievs in Finney.
    /// @param _numClonesAllowed Maximum number of times this Chievs is allowed to be cloned.
    /// @param _tokenURI A URL to the JSON file containing the metadata for the Chievs.  See metadata.json for an example.
    /// @return the tokenId of the Chievs that has been minted.  Note that in a transaction only the tx_hash is returned.
    function mint(address _to, uint256 _priceFinney, uint256 _numClonesAllowed, string memory _tokenURI) public mintable onlyOwnerOrRole returns (uint256 tokenId) {

        Chiev memory _chiev = Chiev({priceFinney: _priceFinney, numClonesAllowed: _numClonesAllowed,
                                  numClonesInWild: 0, clonedFromId: 0, cloner: address(0), permTokenId: 0
                                  });
        // The new chiev is pushed onto the array and minted
        // Note that Solidity uses 0 as a default value when an item is not found in a mapping.

        tokenId = chievs.push(_chiev) - 1;
        chievs[tokenId].clonedFromId = tokenId;

        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        emit MintGen0(_to, _numClonesAllowed, tokenId, address(0), _priceFinney, 0);

    }
    
    /// @dev mintPermissioned(): Mint a new permissioned Gen0 Chievs.  These are the tokens that other Chievs will be "cloned from". and can only be cloned by cloner addr
    /// @param _to Address to mint to.
    /// @param _cloner Address which can clone.
    /// @param _priceFinney Price of the Chievs in Finney.
    /// @param _numClonesAllowed Maximum number of times this Chievs is allowed to be cloned.
    /// @param _tokenURI A URL to the JSON file containing the metadata for the Chievs.  See metadata.json for an example.
    /// @return the tokenId of the Chievs that has been minted.  Note that in a transaction only the tx_hash is returned.
    function mintPermissioned(address _to, address _cloner, uint256 _priceFinney, uint256 _numClonesAllowed, string memory _tokenURI) public mintable onlyOwnerOrRole returns (uint256 tokenId) {

        Chiev memory _chiev = Chiev({priceFinney: _priceFinney, numClonesAllowed: _numClonesAllowed,
                                  numClonesInWild: 0, clonedFromId: 0, cloner: _cloner, permTokenId: 0
                                  });
        // The new chiev is pushed onto the array and minted
        // Note that Solidity uses 0 as a default value when an item is not found in a mapping.

        tokenId = chievs.push(_chiev) - 1;
        chievs[tokenId].clonedFromId = tokenId;

        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        emit MintGen0(_to, _numClonesAllowed, tokenId, _cloner, _priceFinney, 0);

    }

    /// @dev mint(): Mint a new permissioned Gen0 Chievs.  These are the tokens that other Chievs will be "cloned from". and can only be cloned by cloner addr
    /// @param _to Address to mint to.
    /// @param _permTokenId Address which can clone.
    /// @param _priceFinney Price of the Chievs in Finney.
    /// @param _numClonesAllowed Maximum number of times this Chievs is allowed to be cloned.
    /// @param _tokenURI A URL to the JSON file containing the metadata for the Chievs.  See metadata.json for an example.
    /// @return the tokenId of the Chievs that has been minted.  Note that in a transaction only the tx_hash is returned.
    function mintTokenPermissioned(address _to, uint256 _permTokenId, uint256 _priceFinney, uint256 _numClonesAllowed, string memory _tokenURI) public mintable onlyOwnerOrRole returns (uint256 tokenId) {

        Chiev memory _chiev = Chiev({priceFinney: _priceFinney, numClonesAllowed: _numClonesAllowed,
                                  numClonesInWild: 0, clonedFromId: 0, cloner: address(0), permTokenId: _permTokenId
                                  });
        Chiev memory _gen0Chiev = chievs[_permTokenId];        
        require(
            _gen0Chiev.numClonesInWild < _gen0Chiev.numClonesAllowed,
            "Role token is not a valid Gen0.");
        require(
            _gen0Chiev.cloner == address(0),
            "Role Token already has cloner permissions.");
        // The new chiev is pushed onto the array and minted
        // Note that Solidity uses 0 as a default value when an item is not found in a mapping.

        tokenId = chievs.push(_chiev) - 1;
        chievs[tokenId].clonedFromId = tokenId;

        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        emit MintGen0(_to, _numClonesAllowed, tokenId, address(0), _priceFinney, _permTokenId);

    }


    /// @dev clone(): Clone a new Chievs from a Gen0 Chievs.
    /// @param _addresses The addresses to clone to.
    /// @param _tokenId The token id of the Chievs to clone and transfer.
    function clone(address[] memory _addresses, uint256 _tokenId) public payable mintable {
        // Grab existing Chiev blueprint
        Chiev memory _chiev = chievs[_tokenId];
        
        uint256 _numClonesRequested = _addresses.length;
        uint256 cloningCost  = _chiev.priceFinney * 10**15 * _numClonesRequested;

        address ownerAddr = owner();
        address payable ownedBy = address(uint160(ownerAddr));

        require(
            _chiev.numClonesInWild + _numClonesRequested <= _chiev.numClonesAllowed,
            "The number of Chievs clones requested exceeds the number of clones allowed.");
        require(
            msg.value >= cloningCost,
            "Not enough Wei to pay for the Chievs clones.");
        if(_chiev.permTokenId != 0){
            require(hasCloneOfGen0(msg.sender, _chiev.permTokenId) , "Only token holder can clone");
        }

        // Pay the contract owner the cloneFeePercentage amount
        uint256 contractOwnerFee = (cloningCost.mul(cloneFeePercentage)).div(100);
        ownedBy.transfer(contractOwnerFee);

        // Pay the token owner the cloningCost - contractOwnerFee
        uint256 tokenOwnerFee = cloningCost.sub(contractOwnerFee);
        // cast to payable
        address payable ownerOfPayable = address(uint160(ownerOf(_tokenId)));
        ownerOfPayable.transfer(tokenOwnerFee);

        // Update original chiev struct in the array
        _chiev.numClonesInWild += _numClonesRequested;
        chievs[_tokenId] = _chiev;

        // Create new chiev, don't let it be cloned
        for (uint i = 0; i < _numClonesRequested; i++) {
            Chiev memory _newChiev;
            _newChiev.priceFinney = _chiev.priceFinney;
            _newChiev.numClonesAllowed = 0;
            _newChiev.numClonesInWild = 0;
            _newChiev.clonedFromId = _tokenId;

            // Note that Solidity uses 0 as a default value when an item is not found in a mapping.
            uint256 newTokenId = chievs.push(_newChiev) - 1;

            // Mint the new chievs to the _to account
            _mint(_addresses[i], newTokenId);

            // Use the same tokenURI metadata from the Gen0 Chievs
            string memory _g0tokenURI = tokenURI(_tokenId);
            _setTokenURI(newTokenId, _g0tokenURI);
            emit Clone(msg.sender, _addresses[i], newTokenId, _tokenId, tokenOwnerFee, contractOwnerFee);
        }
        // Return the any leftvoer ETH to the sender
        msg.sender.transfer(msg.value - contractOwnerFee - tokenOwnerFee);
    }


    /// @dev burn(): Burn Chievs token.
    /// @param _owner The owner address of the token to burn.
    /// @param _tokenId The Chievs ID to be burned.
    function burn(address _owner, uint256 _tokenId) public onlyOwner {
        Chiev memory _chiev = chievs[_tokenId];
        uint256 gen0Id = _chiev.clonedFromId;
        if (_tokenId != gen0Id) {
            Chiev memory _gen0Chiev = chievs[gen0Id];
            _gen0Chiev.numClonesInWild -= 1;
            chievs[gen0Id] = _gen0Chiev;
        }
        delete chievs[_tokenId];
        _burn(_owner, _tokenId);
    }

    /// @dev setCloneFeePercentage(): Update the Chievs clone fee percentage.  Upon cloning a new chievs,
    ///                               cloneFeePercentage will go to the contract owner, and
    ///                               (100 - cloneFeePercentage) will go to the Gen0 Chievs owner.
    /// @param _cloneFeePercentage The percentage fee between 0 and 100.
    function setCloneFeePercentage(uint256 _cloneFeePercentage) public onlyOwner {
        require(
            _cloneFeePercentage >= 0 && _cloneFeePercentage <= 100,
            "Invalid range for cloneFeePercentage.  Must be between 0 and 100.");
        cloneFeePercentage = _cloneFeePercentage;
    }
    
    /// @dev seMinterTokenRole(): Update the minter token role
    function setMinterTokenRole(uint256 _permTokenId) public onlyOwner {
        Chiev memory _gen0Chiev = chievs[_permTokenId];        
        require(
            _gen0Chiev.numClonesInWild < _gen0Chiev.numClonesAllowed,
            "Permission token is not a valid Gen0.");
        minterTokenRole = _permTokenId;
    }
    

    /// @dev setMintable(): set the isMintable public variable.  When set to `false`, no new 
    ///                     chievs are allowed to be minted or cloned.  However, all of already
    ///                     existing chievs will remain unchanged.
    /// @param _isMintable flag for the mintable function modifier.
    function setMintable(bool _isMintable) public onlyOwner {
        isMintable = _isMintable;
    }

    /// @dev setPrice(): Update the Chievs listing price.
    /// @param _tokenId The Chievs Id.
    /// @param _newPriceFinney The new price of the Chievs.
    function setPrice(uint256 _tokenId, uint256 _newPriceFinney) public onlyOwner {
        Chiev memory _chiev = chievs[_tokenId];
        _chiev.priceFinney = _newPriceFinney;
        chievs[_tokenId] = _chiev;
        emit SetPrice(_tokenId, _newPriceFinney);
    }

    /// @dev setCloner(): Update the Chievs permissioned cloner.
    /// @param _tokenId The Chievs Id.
    /// @param _newCloner The new cloner of the Chievs.
    function setCloner(uint256 _tokenId, address _newCloner) public onlyOwner {
        Chiev memory _chiev = chievs[_tokenId];
        _chiev.cloner = _newCloner;
        chievs[_tokenId] = _chiev;
        emit SetCloner(_tokenId, _newCloner);
    }

    /// @dev setPermTokenId(): Update the Chievs permissioned perm Token.
    /// @param _tokenId The Chievs Id.
    /// @param _newPermTokenId The new PermToken of the Chievs.
    function setPermTokenId(uint256 _tokenId, uint256 _newPermTokenId) public onlyOwner {
        Chiev memory _chiev = chievs[_tokenId];
        _chiev.permTokenId = _newPermTokenId;
        chievs[_tokenId] = _chiev;
        emit SetPermTokenId(_tokenId, _newPermTokenId);
    }

    /// @dev setTokenURI(): Set an existing token URI.
    /// @param _tokenId The token id.
    /// @param _tokenURI The tokenURI string.  Typically this will be a link to a json file on IPFS.
    function setTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyOwner {
        _setTokenURI(_tokenId, _tokenURI);
        emit SetTokenUri(_tokenId, _tokenURI);
    }

    /// @dev getChievsById(): Return a Chievs struct/array given a Chievs Id. 
    /// @param _tokenId The Chievs Id.
    /// @return the Chievs struct, in array form.
    function getChievsById(uint256 _tokenId) view public returns (uint256 priceFinney,
                                                                uint256 numClonesAllowed,
                                                                uint256 numClonesInWild,
                                                                uint256 clonedFromId,
                                                                address cloner,
                                                                uint256 permTokenId
                                                                )
    {
        Chiev memory _chiev = chievs[_tokenId];

        priceFinney = _chiev.priceFinney;
        numClonesAllowed = _chiev.numClonesAllowed;
        numClonesInWild = _chiev.numClonesInWild;
        clonedFromId = _chiev.clonedFromId;
        cloner = _chiev.cloner;
        permTokenId = _chiev.permTokenId;
    }

    /// @dev getNumClonesInWild(): Return a Chievs struct/array given a Chievs Id. 
    /// @param _tokenId The Chievs Id.
    /// @return the number of cloes in the wild
    function getNumClonesInWild(uint256 _tokenId) view public returns (uint256 numClonesInWild)
    {   
        Chiev memory _chiev = chievs[_tokenId];

        numClonesInWild = _chiev.numClonesInWild;
    }

    /// @dev getLatestId(): Returns the newest Chievs Id in the chievs array.
    /// @return the latest chievs id.
    function getLatestId() view public returns (uint256 tokenId)
    {
        if (chievs.length == 0) {
            tokenId = 0;
        } else {
            tokenId = chievs.length - 1;
        }
    }
    
    /// @dev hasCloneOfGen0(): Returns if owner of clone of gen0
    /// @return bool
    function hasCloneOfGen0(address owner, uint256 gen0TokenId) view public returns (bool hasToken)
    {

            for(uint i = 0; i<balanceOf(owner); i++){
                uint256 tid = tokenOfOwnerByIndex(owner, i);
                if(chievs[tid].clonedFromId == gen0TokenId) {
                    return true;
                }
            }
            return false;

        
    }
    
    modifier onlyOwnerOrRole() {
        require(isOwner() || hasCloneOfGen0(msg.sender, minterTokenRole), "Only owner or role can mint");
        _;
    }


}