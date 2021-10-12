// connect to Moralis server
Moralis.initialize("YTjl1E3BA9GWdOOhrUpNUbWtWqh91kkBMCR8AHv1");
Moralis.serverURL = "https://jkhjbmnk50jf.grandmoralis.com:2053/server";

let web3;

const contract_lager = "0x9157d23dbb2CFcf86bD4cc39eDa7D0Cb42a93E7F";
const optionsLager = { chain: "mumbai", address: contract_lager };

const contract_wineNFTs = "0xD91d7FA166b709adF13e78Ed0Aa8Bd018177bFCe";
const optionswineNTFs = { chain: "mumbai", address: contract_wineNFTs };

async function init() {
  // fonction est a revoir car elle doit permettre a afficher les nfts bzws bouteilles eingecheck
  web3 = await Moralis.Web3.enable();
  //const accounts = await web3.eth.getAccounts();
  const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
  /* const contractwineNFTs = new web3.eth.Contract(
    wineNFTsABI,
    contract_wineNFTs
  );*/
  console.log(contractLager);
  getBottlesIn();
  //getBottlesOut();
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

async function getBottlesIn() {
  const query = new Moralis.Query("CheckInEvent");
  const findResult = await query.find();

  // console.log("in", findResult);
  let table = `
    <h5>Actuel bottles in the lager</h5>
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Lager_ID</th>
            <th scope="col">Bottle_Udi</th>
        </tr>
    </thead>
    <tbody id="theAttributes">
    </tbody>
    </table>
    `;
  document.querySelector("#tableOfCheckIn").innerHTML = table;

  if (findResult.length > 0) {
    await findResult.forEach((e) => {
      let bottles = e.attributes;
      let time = bottles.block_timestamp.toString().substr(0, 25);
      let content = `
          <tr>
            <td>${time}</td>
            <td>${bottles.lagerId}</td>
            <td>${bottles.Udi}</td>
          </tr>
      `;
      theAttributes.innerHTML += content;
    });
  } else {
    let content = `
          <tr>
            <td>NULL</td>
            <td>NULL</td>
            <td>NULL</td>
          </tr>
      `;
    theAttributes.innerHTML += content;
  }
}

async function getBottlesOut() {
  const query = new Moralis.Query("CheckOutEvent");
  const findResult = await query.find();
  // console.log("in", findResult);
  let table = `
    <h5>Actuel bottles out from lager</h5>
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Lager_ID</th>
            <th scope="col">Bottle_Udi</th>
        </tr>
    </thead>
    <tbody id="theAttributes">
    </tbody>
    </table>
    `;
  document.querySelector("#tableOfCheckOut").innerHTML = table;

  if (findResult.length > 0) {
    await findResult.forEach((e) => {
      let bottles = e.attributes;
      let time = bottles.block_timestamp.toString().substr(0, 25);
      let content = `
          <tr>
            <td>${time}</td>
            <td>${bottles.lagerId}</td>
            <td>${bottles.Udi}</td>
          </tr>
      `;
      theAttributes.innerHTML += content;
    });
  } else {
    let content = `
          <tr>
            <td>NULL</td>
            <td>NULL</td>
            <td>NULL</td>
          </tr>
      `;
    theAttributes.innerHTML += content;
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
      .checkOut(lagerid, Udi)
      .send({ from: accounts[0], Value: 0 });
    console.log(a);
  } else {
    alert("please give the information");
  }
}

async function setHash() {
  
}

//fetch('https://true.wine/storage/sensors/3/values.json')
// Get quote from API
/*async function getQuote() {
  fetch("https://true.wine/storage/sensors/3/values").then(function (res) {
    console.log(res.json());
  });
}*/
// On load
//getQuote();

init();
