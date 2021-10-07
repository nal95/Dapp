// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

import "./WineNFTs.sol";
import "./Sensor.sol";

contract Lager{
    
    address admin = msg.sender;
    address adminNFTS;
    address adminSensor;
    
    struct Bottle { //bootle
        uint256 time;
        uint256 lagerId;
        string Udi;
    }
    Bottle[] public bottles;
    
    struct LagerInfos { 
        uint256 lagerId;
        string name;
    }
    LagerInfos[] public lagerId;
    mapping(uint256 => bool) existance;
    
    Sensor public sensor;
    
    
   constructor (address addNFT, address _sensor){
        adminNFTS = addNFT;
        adminSensor = _sensor;
        
    }

    event checkInEvent(uint time, uint256 _lagerId, string _Udi);
    event checkOutEvent(uint time, uint256 _lagerId, string _Udi);
 
    function alreadycheckIn(string memory _Udi) internal view returns(bool ){
      bool setter  = false;
          for(uint256 i = 0; i< bottles.length; i++){
              string memory _sn = bottles[i].Udi;
              if(WineNFTs(adminNFTS).hashCompareWithLengthCheck(_Udi,_sn) ){
                  setter = true;
              }
          }
        return setter;
    } // kann mit mapping besser gemacht werden 
    
    function setLager(uint256 _lagerId, string memory name)public onlyAdmin returns(bool){
        require(existance[_lagerId] == false,"lager already exist");
        lagerId.push(LagerInfos(_lagerId,name));
        existance[_lagerId] = true;
        return existance[_lagerId];
    }
    
    function checkInBottle(uint256 _lagerId, string memory _Udi) public returns (Bottle[] memory r ){
        require( alreadycheckIn(_Udi) == false,"bottle with this Udi already exist in this Lager");
        require( existance[_lagerId] == true,"Lager Id is not definiert if it is a new Lager please call setLager function ");
        WineNFTs.NFTs[] memory nfts = WineNFTs(adminNFTS).getNFTs(); 
        for(uint256 i=0; i < nfts.length; i++){
          if(WineNFTs(adminNFTS).hashCompareWithLengthCheck(nfts[i].Udi,_Udi) ){
            bottles.push(Bottle(block.timestamp, _lagerId, _Udi));
            r = bottles;
          }  
        }

        emit checkInEvent(block.timestamp, _lagerId, _Udi);
        return r;
    }
    
    function checkOutBottle(uint256 _lagerId, string memory _Udi) public returns (uint256, bool){
        require( alreadycheckIn(_Udi) == true,"bottle with this Udi don't exist in this lager");
        bool helper = false;
        for(uint256 i=0; i<bottles.length; i++){
            if(WineNFTs(adminNFTS).hashCompareWithLengthCheck( bottles[i].Udi, _Udi) && bottles[i].lagerId == _lagerId){
    
                for (uint256 j=i; j<bottles.length-1; j++){
                    bottles[j]=bottles[j+1];
                }
                bottles.pop();
                helper = true;
            }
        }
        emit checkOutEvent(block.timestamp, _lagerId, _Udi);
        return (block.timestamp, helper);
    }
    
    function save_sensor_data(string memory _date, string memory _hash, uint256 _sendorId)external returns(bytes32 r ){
       r = Sensor(adminSensor).setStorageData(_date, _hash, _sendorId); 
       //r = sensor.setStorageData(_date, _hash, _sendorId); 
       return r;
    }
    
    function get_sendor_data(string memory _date) external view returns(bytes32 r ){
       r = Sensor(adminSensor).getStorageData(_date);
       //r = sensor.getStorageData(_date);
       return r;
    }
    
    modifier onlyAdmin {
      require(msg.sender == admin, "you are not the manager of this action");
      _;
    }
}