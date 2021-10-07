// connect to Moralis server
Moralis.initialize("su0K7UAKXwapd9KFbGAUFrVE6TpcwOuWnnEumP8y");
Moralis.serverURL = "https://putptmsau7mw.moralishost.com:2053/server";
let web3;

const nft_admin_address = "0x5d7b02ABF6F50266dC2f4816908D58e088DE4277"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const options = { chain: "mumbai", address: nft_admin_address };

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
