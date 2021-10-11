const LagerAbi =[
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
        "name": "date",
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
    "name": "checkIOutevent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
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
    "name": "checkInevent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
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
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "newLagerEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Data",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "time",
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
    "name": "bottles",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "time",
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
    "name": "lager",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "location",
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
        "name": "_lagerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_Udi",
        "type": "string"
      }
    ],
    "name": "checkIn",
    "outputs": [
      {
        "internalType": "bool",
        "name": "r",
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
    "name": "checkOut",
    "outputs": [
      {
        "internalType": "bool",
        "name": "r",
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
        "name": "location",
        "type": "string"
      }
    ],
    "name": "newLager",
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
    "inputs": [],
    "name": "getBottles",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "Udi",
            "type": "string"
          }
        ],
        "internalType": "struct Lager.Bottle[]",
        "name": "",
        "type": "tuple[]"
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
        "internalType": "uint256",
        "name": "_sensorId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "newSensor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "r",
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
        "name": "_sensorId",
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
