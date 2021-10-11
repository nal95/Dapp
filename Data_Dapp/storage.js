// connect to Moralis server
Moralis.initialize("su0K7UAKXwapd9KFbGAUFrVE6TpcwOuWnnEumP8y");
Moralis.serverURL = "https://putptmsau7mw.moralishost.com:2053/server";

let web3;

const contract_lager = "0x249BdafAf4d458C0cA564666e274528e028166d6"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionsLager = { chain: "mumbai", address: contract_lager };

const contract_sensor = "0x3a41A45E9769a1c08E7E2509823115d4F548C551"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionsSager = { chain: "mumbai", address: contract_sensor };

const contract_wineNFTs = "0x5480f725EC86A1A4a0416bf79A9fFeDa0701c596"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionswineNTFs = { chain: "mumbai", address: contract_wineNFTs };

async function init() {
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
  const contractwineNFTs = new web3.eth.Contract(
    wineNFTsABI,
    contract_wineNFTs
  );
  const a = await contractLager.methods
    .bottles[0];

  console.log(contractLager);
  console.log(contractwineNFTs);
  console.log(accounts[0]);

  console.log(a);
}


async function checkin() {
  let lagerId = document.getElementById("lagerId-input").value;
  let Udi = document.getElementById("Udi-input").value;
  if(lagerId!="" && Udi!=""){
    web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .checkInBottle(lagerId, Udi)
      .send({ from: accounts[0], value: 0 });
    console.log(a);
  }else{
    alert("have the bottle and the lager already been registered?");
  }
}
async function checkout() {
  let lagerId = document.getElementById("lagerId-input").value;
  let Udi = document.getElementById("Udi-input").value;
  if(lagerId!="" && Udi!=""){
    web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .checkOutBottle(lagerId, Udi)
      .send({ from: accounts[0], value: 0 });
    console.log(a);
  }else{
    alert("have the bottle and the lager already been registered?");
  }

}

/*printBottleinLager = async () => {
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(LagerAbi, contract_lager);
  const get = await contract.methods.getNFTs().call({ from: accounts[0] });

  if (get.length > 0) {
    let table = `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Udi</th>
        </tr>
    </thead>
    <tbody id="theTransactions">
    </tbody>
    </table>
    `;
    document.querySelector("#tableOfNFTs").innerHTML = table;
    await get.forEach((n) => {
      //console.log(JSON.parse(n.metadata));
      let metadata = n.Uri;
      fetch(metadata)
        .then((response) => response.json())
        .then((data) => {
          let content = `
        <tr>
            <td class="card-title" style="font-family:verdana">${data.date}</td>
            <td class="card-title" style="font-family:verdana">${data.name}</td>
            <td class="card-title" style="font-family:verdana">${data.serialnummer} </td>
        </tr>
        `;
          theTransactions.innerHTML += content;
        });
    });
  }
};*/

/*async function init() {
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
  const contractwineNFTs = new web3.eth.Contract(
    wineNFTsABI,
    contract_wineNFTs
  );
  const a = await contractwineNFTs.methods
    .getNFTs()
    .call({ from: accounts[0] });

  console.log(contractLager);
  console.log(contractwineNFTs);
  console.log(accounts[0]);

  console.log(a);
}
async function init() {
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
  const contractwineNFTs = new web3.eth.Contract(
    wineNFTsABI,
    contract_wineNFTs
  );
  const a = await contractwineNFTs.methods
    .getNFTs()
    .call({ from: accounts[0] });

  console.log(contractLager);
  console.log(contractwineNFTs);
  console.log(accounts[0]);

  console.log(a);
}
*/





/*async function saving() {
  let SN = document.getElementById("wine-serial-nummer").value;
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
  const contractwineNFTs = new web3.eth.Contract(
    wineNFTsABI,
    contract_wineNFTs
  );
  const a = await contractwineNFTs.methods
    .getNFTs()
    .call({ from: accounts[0] });

  console.log(contractLager);
  console.log(contractwineNFTs);
  console.log(accounts[0]);

  console.log(a);
}*/

init();
