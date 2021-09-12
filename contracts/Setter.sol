// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract Setter{
    string public name;

    constructor(){
        name = "Alex";
    }

    function getName () public view
    returns (string memory)
    {
        return name;
    }

    function setName (string memory _name) public
    returns (string memory)
    {
        name = _name;
        return name;
    }
}
