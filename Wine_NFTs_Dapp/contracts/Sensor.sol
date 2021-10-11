// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Sensor {
    address admin = msg.sender;

    struct SensorInfos {
        uint256 sensorId;
        string name;
    }
    SensorInfos[] sensor;

    mapping(string => bytes32) public filehash;
    mapping(uint256 => bool) public existance;

    event storageEvent(string date, bytes32 Hash);

    event newSensorEvent(uint256 sendorId, string name);

    function setStorageData(
        string memory _date,
        string memory _hash,
        uint256 _sendorId
    ) external returns (bytes32) {
        require(
            existance[_sendorId] == true,
            "The sendor did't exist please call the setSensor function"
        );
        filehash[_date] = keccak256(abi.encodePacked(_hash));
        emit storageEvent(_date, filehash[_date]);
        return filehash[_date];
    }

    function getStorageData(string memory _date)
        external
        view
        returns (bytes32)
    {
        return filehash[_date];
    }

    function setSensor(uint256 _sensorId, string memory name)
        public
        returns (bool)
    {
        require(existance[_sensorId] == false, "this sensor already esxist");
        sensor.push(SensorInfos(_sensorId, name));
        existance[_sensorId] = true;
        emit newSensorEvent(_sensorId, name);
        return existance[_sensorId];
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "you are not the manager of this action");
        _;
    }
}
