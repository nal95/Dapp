// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WineNFTs is ERC721, Ownable {
    mapping(bytes32 => uint256) id;
    mapping(uint256 => string) _tokenURIs;

    uint256 counter = 0;

    struct RenderToken {
        uint256 id;
        string uri;
    }
    struct Auth {
        uint256 ids;
        string _SN;
    }

    //RenderToken[] public RT;
    Auth[] public auths;

    address Admin_Address = msg.sender;

    constructor() ERC721("Wine", "W") {}

    //User
    function setID(string memory _x) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_x));
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId));
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function getAllTokens() public view returns (RenderToken[] memory) {
        uint256 lastestId = counter;
        uint256 Counter = 0;
        RenderToken[] memory res = new RenderToken[](lastestId);
        for (uint256 i = 0; i <= lastestId; i++) {
            if (_exists(Counter)) {
                string memory uri = tokenURI(Counter);
                res[Counter] = RenderToken(Counter, uri);
            }
            Counter++;
        }
        return res;
    }

    function hashCompareWithLengthCheck(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return
                keccak256(abi.encodePacked(a)) ==
                keccak256(abi.encodePacked(b));
        }
    }

    function exist(string memory _str) internal view returns (bool) {
        Auth[] memory A = getAuth();
        bool setter = false;
        for (uint256 i = 0; i < A.length; i++) {
            string memory _SNN = A[0]._SN;
            if (hashCompareWithLengthCheck(_str, _SNN)) {
                setter = true;
            }
        }

        return setter;
    }

    function mintWinesToken(string memory _SN, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        require(exist(_SN) == false, "token alredy minted");
        bytes32 newSN = setID(_SN);
        id[newSN] = counter;
        _mint(msg.sender, id[newSN]);
        _setTokenURI(id[newSN], uri);
        auths.push(Auth(counter, _SN));
        counter++;
        return id[newSN];
    }

    function getAuth() public view onlyOwner returns (Auth[] memory) {
        // uint256 size = auths.length;
        return (auths);
    }
}
