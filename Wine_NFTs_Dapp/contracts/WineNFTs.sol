
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WineNFTs is ERC721, Ownable {
    

    mapping (bytes32 => uint256)  id ; // to store Uid from sting / bytes32 to uint256
    mapping(uint256 => string) _tokenURIs; // to store nfts uri
    
    uint256 counter = 0;// for itterate nfts minting
    
    
   struct NFTs{
       string  Udi;
       string Uri;}
  
   //arrays of nfts present with this Smart contract ;
   NFTs[]  nfts;


    constructor() ERC721("Wine", "W") {}
    
    //User
    function setUid(string memory _x) internal pure returns(bytes32 ){
        return keccak256(abi.encodePacked(_x));
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }
  
  function hashCompareWithLengthCheck(string memory a, string memory b) public pure returns (bool) {
        if(bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
        }
   }
  
  function alreadyExist(string memory _Udi) internal view returns(bool ){
      bool setter  = false;
      for(uint256 i = 0; i< nfts.length; i++){
          string memory _str = nfts[i].Udi;
          if(hashCompareWithLengthCheck(_str,_Udi) ){
              setter = true;
          }
      }
      
      return setter;
    }

  function mintWineToken(string memory _Udi, string memory _Uri) public onlyOwner returns (uint256) {
        
        require(alreadyExist(_Udi) == false, "token alredy minted");
        bytes32 newSN = setUid(_Udi);
        id[newSN] = counter;
        _mint(msg.sender, id[newSN]);
        _setTokenURI(id[newSN], _Uri);
        nfts.push(NFTs(_Udi, _Uri));
        counter++;
        return id[newSN] ;
    }
    
  function getNFTs() external view  returns(NFTs[] memory){
        return (nfts);
    }
    
}