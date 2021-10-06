Moralis.initialize("o7fbfCUvlzln18HbwVW3qLSuiKESUKVKNg3nQW1K");
Moralis.serverURL = "https://ykbeoaiyrra6.moralishost.com:2053/server";
let web3;
let _SN = [];
let link = [];

const nft_contract_lager = "0x864fE4acEE7Da3f76C84d8EFf42785F76436Fe46"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionsLager = { chain: "mumbai", address: nft_contract_lager };
const nft_contract_wineNFTs = "0xBBc9E02f74ce08ef8Fc07207F47b1489fE09479b"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionswineNTFs = { chain: "mumbai", address: nft_contract_wineNFTs };

async function saving() {
  let SN = document.getElementById("wine-serial-nummer").value;
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contractLager = new web3.eth.Contract(LagerAbi, nft_contract_lager);
  const contractwineNFTs = new web3.eth.Contract(
    wineNFTsABI,
    nft_contract_wineNFTs
  );
  const a = await contractwineNFTs.methods
    .getAuth()
    .call({ from: accounts[0] });

  const b = await contractwineNFTs.methods
    .getAllTokens()
    .call({ from: accounts[0] });
  for (i = 0; i < a.length; i++) {
    //_SN.push([a[i][1], b[i][1]]);
    console.log(a[i][1], b[i][1]);
  }
  //console.log(a, b);
  /* for (i = 0; i < a.length; i++) {
    //_SN.push([a[i][1], b[i][1]]);
    console.log(_SN);
  }
  if (SN != "") {
    const checkIn = await contractLager.methods
      .checkIn(SN)
      .send({ from: accounts[0], value: 0 });
    if (checkIn) {
      link.push(SN);
    }
    console.log(link);
  } else {
    console.log("please insert a Uid!!");
  }

  for (i = 0; i < a.length; i++) {
    if (_SN[i][0] == link[i]) {
      fetch(_SN[i][1])
        .then((response) => response.json())
        .then((data) => {
          let currentDiv = document.querySelector("#content");
          content = `
              <div>
                <p>${data.name}</p>
                <p>${data.serialnummer}</p>
                <p>${data.uri}</p>
              </div>
              `;
          currentDiv.innerHTML += content;
        });
    }
  }*/
}
