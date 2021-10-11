// connect to Moralis server
Moralis.initialize("kPwcZIIvHOrZsQAxVLtx1iLbF0ciRi6fCeLVeBff");
Moralis.serverURL = "https://qlbpnat4mi8a.moralishost.com:2053/server";

let web3;

const contract_lager = "0x40Ac0EA97d0f542Ec664d52AdaB26F9D5436A35E";
const optionsLager = { chain: "mumbai", address: contract_lager };

const contract_wineNFTs = "0xD91d7FA166b709adF13e78Ed0Aa8Bd018177bFCe";
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

  //console.log(contractLager);
  //console.log(contractwineNFTs);
  //console.log(accounts[0]);

  //console.log(a);
}

async function checkin() {
  let lagerid = document.getElementById("lagerId-input").value;
  let Udi = document.getElementById("Udi-input").value;
  document.querySelector("#lagerId-input").disabled = true;
  document.querySelector("#Udi-input").disabled = true;
  web3 = await Moralis.Web3.enable();
  if (lagerid != "" && Udi != "") {
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .checkIn(lagerid, Udi)
      .send({ from: accounts[0], Value: 0 });
    console.log(a);
  } else {
    alert("please give the information");
  }
}

async function checkout() {
  let lagerid = document.getElementById("lagerId-input").value;
  let Udi = document.getElementById("Udi-input").value;
  document.querySelector("#lagerId-input").disabled = true;
  document.querySelector("#Udi-input").disabled = true;
  web3 = await Moralis.Web3.enable();
  if (lagerid != "" && Udi != "") {
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .checkOut()
      .send({ from: accounts[0], Value: 0 });
    console.log(a);
  } else {
    alert("please give the information");
  }
}

init();
