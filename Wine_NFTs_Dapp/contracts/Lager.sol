// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

contract Lager{
    

    address admin = msg.sender;
    
    struct Check {
        string serialNummer;
        uint256 date;
    }
    
    Check[] public check;


    
    //definir les variables dont on a besoin:
    mapping (address => bytes32) public filehash;

    
    // event qui nous permettra d'obtenir nos Hash et le temps 
    event Store (uint date, bytes32 Hash);
    event checkIOEbvent(uint date, string);
    //la fonction qui sera appeler pour sauvegarder les Hash
    function storageData ( 
        string memory Hash
        )external onlyAdmin returns (bytes32 ){
        filehash[admin] = keccak256(abi.encodePacked(Hash));
        emit Store(block.timestamp, filehash[admin]);
        return filehash[admin];
    }
    
    function hashCompareWithLengthCheck(string memory a, string memory b) internal pure returns (bool) {
        if(bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
        }
    }
    
    function exist(string memory _str) internal view returns(bool ){
      bool setter  = false;
      for(uint256 i = 0; i< check.length; i++){
          string memory _SNN = check[i].serialNummer;
          if(hashCompareWithLengthCheck(_str,_SNN) ){
              setter = true;
          }
      }
      
      return setter;
    }
  
    
    function checkIn(string memory _str) public onlyAdmin returns (uint256){
        require( exist(_str) == false,"serialNummer allredy exist");
        check.push(Check(_str,block.timestamp));
        emit checkIOEbvent (block.timestamp, _str);
        return (block.timestamp); 
    }
    
    function checkOut(string memory _str) public onlyAdmin returns (uint256, bool){
        uint256 during = 0 ;
        bool helper = false;
        for(uint256 i=0; i<check.length; i++){
            if(hashCompareWithLengthCheck( check[i].serialNummer, _str )){
                during = block.timestamp - check[i].date;
                for (uint256 j=i; j<check.length-1; j++){
                    check[j]=check[j+1];
                }
                check.pop();
                helper = true;
            }
        }
        emit checkIOEbvent (during, _str);
        return (during , helper);
    }
          
    modifier onlyAdmin {
      require(msg.sender == admin, "you are not the manager of this action");
      _;
   }
}