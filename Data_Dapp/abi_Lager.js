const LagerAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_sensor",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_lagerId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_Udi",
        "type": "string"
      }
    ],
    "name": "checkInEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_lagerId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_Udi",
        "type": "string"
      }
    ],
    "name": "checkOutEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bottles",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "Udi",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lagerId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "sensor",
    "outputs": [
      {
        "internalType": "contract Sensor",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setLager",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_Udi",
        "type": "string"
      }
    ],
    "name": "checkInBottle",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lagerId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "Udi",
            "type": "string"
          }
        ],
        "internalType": "struct Lager.Bottle[]",
        "name": "r",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_Udi",
        "type": "string"
      }
    ],
    "name": "checkOutBottle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_sendorId",
        "type": "uint256"
      }
    ],
    "name": "save_sensor_data",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_date",
        "type": "string"
      }
    ],
    "name": "get_sendor_data",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
