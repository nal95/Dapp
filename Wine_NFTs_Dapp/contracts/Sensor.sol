// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;


contract Sensor{
    address admin = msg.sender;
    
    struct SensorInfos{
        uint256 sensorId;
        string name;
    }
    SensorInfos[] sensor;
    
    mapping (string => bytes32) public filehash;
    mapping(uint256 => bool) public existance;
    
    event storageEvent (string date, bytes32 Hash);
    
    function setStorageData (string memory _date, string memory _hash, uint256 _sendorId) external onlyAdmin returns (bytes32 ){
        require(existance[_sendorId ] == true, "The sendor did't exist please call the setSensor function");
        filehash[_date] = keccak256(abi.encodePacked(_hash));
        emit storageEvent(_date, filehash[_date]);
        return filehash[_date];
        //0x0000000000000000000000000000000000000000000000000000000000000000
    }
    
    function getStorageData (string memory _date)external view onlyAdmin returns (bytes32 ){
        return filehash[_date];
    }
    
    function setSensor(uint256 sensorId, string memory name)public onlyAdmin returns(bool){//
        sensor.push(SensorInfos(sensorId,name));
        existance[sensorId] = true;
        return existance[sensorId];
    }
    
    modifier onlyAdmin {
      require(msg.sender == admin, "you are not the manager of this action");
      _;
    }
    
}