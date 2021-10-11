// connect to Moralis server
Moralis.initialize("kPwcZIIvHOrZsQAxVLtx1iLbF0ciRi6fCeLVeBff");
Moralis.serverURL = "https://qlbpnat4mi8a.moralishost.com:2053/server";

let web3;

const contract_lager = "0x2B9af3935F73c0ddC5A38eb907b9dD52E9dDd6BE";
const optionsLager = { chain: "mumbai", address: contract_lager };

const contract_wineNFTs = "0x4F6D60e662a3180f9fBa537eAC1d18a1BfA17D82";
const optionswineNTFs = { chain: "mumbai", address: contract_wineNFTs };

async function init() {
  // fonction est a revoir car elle doit permettre a afficher les nfts bzws bouteilles eingecheck
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

async function checkin() {
  let lagerid = document.getElementById("lagerId-input").Value();
  let Udi = document.getElementById("Udi-input").Value();
  web3 = await Moralis.Web3.enable();
  if (lagerid != "" && Udi != "") {
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .checkOutBottle(lagerid, Udi)
      .send({ from: accounts[0], Value: 0 });
    console.log(a);
  } else {
    alert("please give the information");
  }
}

async function checkout() {
  let lagerid = document.getElementById("lagerId-input").Value();
  let Udi = document.getElementById("Udi-input").Value();
  web3 = await Moralis.Web3.enable();
  if (lagerid != "" && Udi != "") {
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .checkOutBottle()
      .send({ from: accounts[0], Value: 0 });
    console.log(a);
  } else {
    alert("please give the information");
  }
}

init();
