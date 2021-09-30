// connect to Moralis server
Moralis.initialize("U8pWrvTB4I6vpnKF24fyZxrD4YQue5wHnuaHtVPR");
Moralis.serverURL = "https://oyoj4lpcodao.moralishost.com:2053/server";
let web3;

const nft_contract_address = "0x65225C37E80b95DBD98Fb8db4A7520Cf01284A63"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const options = { chain: "mumbai", address: nft_contract_address };

async function init() {
  web3 = await Moralis.Web3.enable();
}

init();
//<img class="Image--image" src="https://lh3.googleusercontent.com/YUZyEEBzMggZQ5dTTLi9IEj4krkdlK3ZO4Ew7pi9fT9jgn4JfHn9rYYgmf4JRpPOe9nWDxzE-1Ef7pxOv94cwMXm4aQKpJkZc0Jv_A=w280" style="object-fit: contain; width: auto; height: auto; border-radius: 5px; max-width: 100%; max-height: 100%;"></img>
getNFTs = async () => {
  console.log("cool connected to nft fiel");
  let nfts = await Moralis.Web3API.account.getNFTs({ chain: "mumbai" });
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
                <p class="card-text">${metadata.description}</p>
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
/*

*/
