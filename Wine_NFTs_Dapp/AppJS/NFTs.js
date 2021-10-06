// connect to Moralis server
Moralis.initialize("o7fbfCUvlzln18HbwVW3qLSuiKESUKVKNg3nQW1K");
Moralis.serverURL = "https://ykbeoaiyrra6.moralishost.com:2053/server";
let web3;

const nft_user_address = "0x6666Ce97fe2D28746559220Ecec9D784054c360A"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const options = { chain: "mumbai", address: nft_user_address };

async function init() {
  web3 = await Moralis.Web3.enable();
}

init();

getNFTs = async () => {
  //console.log("cool connected to nft fiel");
  const nfts = await Moralis.Web3API.account.getNFTs(options);
  //console.log(nfts);
  // let tableOfNFTs = document.querySelector("#tableOfNFTs");
  if (nfts.result.length > 0) {
    nfts.result.forEach((n) => {
      //console.log(JSON.parse(n.metadata));
      let metadata = JSON.parse(n.metadata);
      let content = `
      <div class="card col-md-3">
            <img scr= "${metadata.image}" class="card-img-top" width="200" height="250" >
            <div class="card-body">
                <h5 class="card-title" style="font-family:verdana">${metadata.name}</h5>
                <h5 class="card-title" style="font-family:verdana"> SN: ${metadata.serialnummer} </h5>
            </div>
        </div>
      `;
      tableOfNFTs.innerHTML += content;
    });
  }
};

getNFTs();
