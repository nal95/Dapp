// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Lager{

    
    address admin = msg.sender;


    
    //definir les variables dont on a besoin:
    mapping (address => bytes32) public filehash;

    
    // event qui nous permettra d'obtenir nos Hash et le temps 
    event Store (uint date, bytes32 Hash);
    event checkInEvent(uint date,string _SN, string tokenURI);
    event checkOutEvent(uint date, string SN);
    
    //la fonction qui sera appeler pour sauvegarder les Hash
    function storageData ( 
        string memory _timestamp,
        string memory _temperature,
        string memory _humidity) external onlyAdmin returns (bytes32 ){
        filehash[admin] = keccak256(abi.encodePacked(_timestamp,_temperature,_humidity));
        emit Store(block.timestamp, filehash[admin]);
        return filehash[admin];
    }
    
            
    modifier onlyAdmin {
      require(msg.sender == admin);
      _;
   }


}