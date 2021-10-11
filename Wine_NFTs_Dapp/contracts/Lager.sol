// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./WineNFTs.sol";
import "./Sensor.sol";

contract Lager{

    address admin = msg.sender;
    address adminNFTS;
    address adminSensor;

    constructor (address addNFT, address _sensor){
        adminNFTS = addNFT;
        adminSensor = _sensor;

    }

    struct Bottle { //bootle
        uint256 time;
        string Udi;
    }
    Bottle[] public bottles;

    uint256 counter = 0;


    struct LagerInfos {
        uint256 lagerId;
        string location;
    }

    LagerInfos[] public lager;





    mapping (uint256 => mapping(uint256 => Bottle)) public Data;
    mapping(uint256=>bool) setterLager;
    mapping(string=>bool) setterBottle;

    event checkInevent(uint256 date, uint256 _lagerId, string _Udi);
    event checkIOutevent(uint256 date, uint256 _lagerId, string _Udi);
    event newLagerEvent(uint256 date, uint256 _lagerId, string _location);

    function existStorage (uint256 _lagerId) internal view returns(uint256 r){
        r=0;
        for (uint256 i=0; i<bottles.length; i++){
            for(uint256 j=0; j<bottles.length; j++){
                if(Data[_lagerId][i].time == bottles[j].time && WineNFTs(adminNFTS).hashCompareWithLengthCheck(Data[_lagerId][i].Udi , bottles[j].Udi)){
                    r++ ;
                }
            }
        }
        return r;
    }

    function checkIn(uint256 _lagerId, string memory _Udi) public returns(bool r){
        require(setterLager[_lagerId] == true,"this lager did't exist");
        require(setterBottle[_Udi] == false,"This bottle is not found for checkin");
        require(WineNFTs(adminNFTS).alreadyExist(_Udi)==true,"a bottle with this Udi is not aviable");
        r = false;
        uint256 helper = existStorage(_lagerId);
        uint256 date = block.timestamp;
        bottles.push(Bottle(date, _Udi));
        Data[_lagerId][helper] = bottles[counter];
        counter++;
        setterBottle[_Udi] = true;
        r = true;
        emit checkInevent(date, _lagerId, _Udi);

        return r;

    }

    function checkOut(uint256 _lagerId, string memory _Udi) public returns(bool r){
        require(setterLager[_lagerId] == true,"we don't have a lager with this ID");
        require(setterBottle[_Udi] == true,"This bottle is not found for checkout");
        r = false;
        uint256 actuel;
        uint256 helper = 0;
        for(uint256 i=0; i<bottles.length; i++){
            if(WineNFTs(adminNFTS).hashCompareWithLengthCheck( bottles[i].Udi, _Udi)){
                helper = existStorage(_lagerId);
                //helper--;

                //debut delete in data[]
                for(uint256 e=0; e<helper; e++){
                    if(WineNFTs(adminNFTS).hashCompareWithLengthCheck(Data[_lagerId][e].Udi , bottles[i].Udi)){
                        // delete in data[]
                        actuel = (helper-1);
                        Data[_lagerId][helper]=Data[_lagerId][actuel];
                        Data[_lagerId][actuel]=Data[_lagerId][e];
                        Data[_lagerId][e]=Data[_lagerId][helper];
                        delete(Data[_lagerId][helper]);
                        delete(Data[_lagerId][actuel]);
                    }
                }

                //debut delete in bottles[]
                for (uint256 j=i; j<bottles.length-1; j++){
                    bottles[j]=bottles[j+1];
                }
                bottles.pop();
                setterBottle[_Udi] == false;
                emit checkIOutevent(block.timestamp, _lagerId, _Udi);

                //fin delete in bottles[]
                r = true;
            }
        }

        return r;

    }

    function newLager(uint256 _lagerId, string memory location) public returns(bool){
        require(setterLager[_lagerId] == false,"we already have a lager with this ID");
        lager.push(LagerInfos(_lagerId, location));
        setterLager[_lagerId] = true;
        emit newLagerEvent(block.timestamp, _lagerId, location);
        return setterLager[_lagerId];

    }

    function getBottles()public view returns(Bottle[] memory ){
        return (bottles);

    }

    function newSensor(uint256 _lagerId, uint256 _sensorId, string memory _name) public returns(bool r){
        require(setterLager[_lagerId] == true,"we don't have a lager with this name");
        Sensor(adminSensor).setSensor(_sensorId, _name);
        r = true;
        return r;

    }

    function save_sensor_data(string memory _date, string memory _hash, uint256 _sensorId)external returns(bytes32 r ){
        r = Sensor(adminSensor).setStorageData(_date, _hash, _sensorId);
        return r;
    }

    function get_sendor_data(string memory _date) external view returns(bytes32 r ){
        r = Sensor(adminSensor).getStorageData(_date);
        return r;
    }





    modifier onlyAdmin {
        require(msg.sender == admin, "you are not the manager of this action");
        _;
    }
}
