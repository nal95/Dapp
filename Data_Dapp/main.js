// connect to Moralis server
Moralis.initialize("su0K7UAKXwapd9KFbGAUFrVE6TpcwOuWnnEumP8y");
Moralis.serverURL = "https://putptmsau7mw.moralishost.com:2053/server";

let homepage = "http://127.0.0.1:5500/Data_Dapp/index.html";

if (Moralis.User.current() == null && window.location.href != homepage) {
  document.querySelector("body").style.display = "none";
  window.location.href = "index.html";
}
const contract_lager = "0x249BdafAf4d458C0cA564666e274528e028166d6"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionsLager = { chain: "mumbai", address: contract_lager };

const contract_sensor = "0x3a41A45E9769a1c08E7E2509823115d4F548C551"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionsSager = { chain: "mumbai", address: contract_sensor };

login = async () => {
  var user = await Moralis.Web3.authenticate();
  if (user) {
    user.set("name", document.getElementById("user-username").value);
    user.set("email", document.getElementById("user-email").value);
    await user.save();
    window.location.href = "dashboard.html";
  } else {
    console.log("Login fails!!!, check user data please ");
  }
};

logout = async () => {
  await Moralis.User.logOut();
  console.log("used ausgelog");
  window.location.href = "index.html";
};

getTransactions = async () => {
  const options = {
    chain: "mumbai",
    address: "0x5d7b02ABF6F50266dC2f4816908D58e088DE4277",
  };
  const transactions = await Moralis.Web3API.account.getTransactions(options);
  console.log(transactions);
  if (transactions.total > 0) {
    let table = `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Transaction</th>
            <th scope="col">Block Number</th>
            <th scope="col">Age</th>
            <th scope="col">Type</th>
            <th scope="col">Fee</th>
            <th scope="col">Value</th>
        </tr>
    </thead>
    <tbody id="theTransactions">
    </tbody>
    </table>
    `;
    document.querySelector("#tableOfTransactions").innerHTML = table;

    await transactions.result.forEach((t) => {
      let content = `
      <tr>
          <td>${t.hash}</td>
          <td>${t.block_number}</td>
          <td>${t.block_timestamp}</td>
          <td>${
            t.from_address == Moralis.User.current().get("ethAddress")
              ? "Outgoing"
              : "Incoming"
          }</td>
          <td>${((t.gas * t.gas_price) / 1e18).toFixed(5)} MATIC</td>
          <td>${t.value / 1e18} MATIC</td>
      </tr>
      `;
      theTransactions.innerHTML += content;
    });
  }
};

storageWine = async () => {
  window.location.href = "storage.html";
};
async function registLager() {
  let lagerId = document.getElementById("lagerId-input").value;
  let name = document.getElementById("lager-name").value;
  if (lagerId != "" && name != "") {
    web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .setLager(lagerId, name)
      .send({ from: accounts[0], value: 0 });
    console.log(a);
  } else {
    alert("have the lager already be registered?");
  }
}

async function registSensor() {
  let sensorId = document.getElementById("sensorId-input").value;
  let name = document.getElementById("sensor-name").value;
  if (sensorId != "" && name != "") {
    web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(SensorAbi, contract_sensor);
    const a = await contractLager.methods
      .setSensor(sensorId, name)
      .send({ from: accounts[0], value: 0 });
    console.log(a);
  } else {
    alert("have the sensor already be registered?");
  }
}

if (document.querySelector("#btn-login") != null) {
  document.querySelector("#btn-login").onclick = login;
}
if (document.querySelector("#btn-logout") != null) {
  document.querySelector("#btn-logout").onclick = logout;
}

if (document.querySelector("#get-transactions-link")) {
  document.querySelector("#get-transactions-link").onclick = getTransactions;
}
if (document.querySelector("#get-nfts-link")) {
  document.querySelector("#get-nfts-link").onclick = storageWine;
}

if (document.querySelector("#get-balances-link")) {
  document.querySelector("#get-balances-link").onclick = getBalances;
}

//get-transactions-link
//get-balances-link
//get-nfts-link
