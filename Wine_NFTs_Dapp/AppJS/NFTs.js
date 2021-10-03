// connect to Moralis server
Moralis.initialize("U8pWrvTB4I6vpnKF24fyZxrD4YQue5wHnuaHtVPR");
Moralis.serverURL = "https://oyoj4lpcodao.moralishost.com:2053/server";
let web3;

const nft_user_address = "0xC451a31d586Fa8c91c382f4a7800ac318D966762"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const options = { chain: "mumbai", address: nft_user_address };

async function init() {
  web3 = await Moralis.Web3.enable();
}

init();
getNFTs = async () => {
  console.log("cool connected to nft fiel");
  let nfts = await Moralis.Web3API.account.getNFTs(options);
  //console.log(nfts);
  let tableOfNFTs = document.querySelector("#tableOfNFTs");

  if (nfts.result.length > 0) {
    nfts.result.forEach((n) => {
      console.log(JSON.parse(n.metadata));
      let metadata = JSON.parse(n.metadata);
      let content = `
      <div class="card col-md-3">
            <img scr= "${metadata.image}" class="card-img-top" width="200" height="250" >
            <div class="card-body">
                <h5 class="card-title" style="font-family:verdana">${metadata.name}</h5>
                <h1 class="card-title" style="font-family:verdana"> SN: ${metadata.serialnummer} </h1>
            </div>
        </div>
      `;
      tableOfNFTs.innerHTML += content;
    });
  }
};

/*fixURL = (url) => {
  if (url.startsWith("https://ipfs")) {
    return (
      "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)
    );
  } else {
    return url + "?format=json";
  }
};*/

getNFTs();
