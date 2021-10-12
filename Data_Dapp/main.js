// connect to Moralis server
Moralis.initialize("YTjl1E3BA9GWdOOhrUpNUbWtWqh91kkBMCR8AHv1");
Moralis.serverURL = "https://jkhjbmnk50jf.grandmoralis.com:2053/server";

let homepage = "http://127.0.0.1:5500/Data_Dapp/index.html";

if (Moralis.User.current() == null && window.location.href != homepage) {
  document.querySelector("body").style.display = "none";
  window.location.href = "index.html";
}

let web3;

const contract_lager = "0x9157d23dbb2CFcf86bD4cc39eDa7D0Cb42a93E7F"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const optionsLager = { chain: "mumbai", address: contract_lager };

login = async () => {
  var user = await Moralis.Web3.authenticate();
  if (user) {
    console.log("logged in");
    user.set("name", document.getElementById("user-username").value);
    user.set("email", document.getElementById("user-email").value);
    await user.save();
    window.location.href = "dashboard.html";
  } else {
    console.log("login fails!!!");
  }
};

logout = async () => {
  await Moralis.User.logOut();
  console.log("used ausgelog");
  window.location.href = "index.html";
};

getTransactions = async () => {
  console.log("get transactions clicked");
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

getBalances = async () => {
  console.log("Get balances is connected");
  const mumbaiBalance = await Moralis.Web3API.account.getNativeBalance({
    chain: "mumbai",
  });
  console.log((mumbaiBalance.balance / 1e18).toFixed(5) + "MATIC");

  let content = (document.querySelector("#userBalances").innerHTML = `
  <table class="table">
  <thead>
      <tr>
          <th scope="col">Transaction</th>
      </tr>
  </thead>
  <tbody >
      <tr>
          <th>Mumbai<th>
          <td>${(mumbaiBalance.balance / 1e18).toFixed(5)} MATIC<td>
      </tr>
  </tbody>
  </table>
  
  `);
};

toStorageBottle = async () => {
  window.location.href = "storage.html";
};

async function fileUplaod(event) {
  var file = event.target.files[0];

  const fileReader = new FileReader();

  fileReader.addEventListener("loadend", (evt) => {
    if (evt.target.readyState == FileReader.DONE) {
      const hash = CryptoJS.SHA256(fileReader.result);
      console.log(hash.toString());
    }
  });
  fileReader.readAsText(file);
}
/*async function upload() {
  let file = document.querySelector("#file");

  // If there's no file, do nothing
  if (!file.value.length) return;

  // Create a new FileReader() object
  let reader = new FileReader();

  // Setup the callback event to run when the file is read
  reader.onload = logFile;
  console.log(reader.result);

  // Read the file
  //const data = await reader.readAsText(file.files[0]);

  document.getElementById("upload").setAttribute("disabled", null);
  document.getElementById("file").setAttribute("disabled", null);
  //const hash = CryptoJS.SHA256(data);
  //const fileHash = hash.update(data).digest("hex");
  //console.log(hash.toString());
}

function logFile(event) {
  let str = event.target.result;
  let json = JSON.parse(str);
  //console.log("string", str);
  //console.log("json", json);
  return json;
}*/
async function newlager() {
  web3 = await Moralis.Web3.enable();
  let lagerid = document.getElementById("lagerId-input").value;
  let location = document.getElementById("location-input").value;
  document.querySelector("#lagerId-input").disabled = true;
  document.querySelector("#location-input").disabled = true;
  if (lagerid != " " && location != " ") {
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = contractLager.methods
      .newLager(lagerid, location)
      .send({ from: accounts[0], Value: 0 });
    console.log("ok: lagerid:", lagerid, "location:", location);
    console.log(a);
  } else {
    alert("please give the information");
  }
}

async function newsensor() {
  let lagerID = document.getElementById("lager-input").value;
  let sensorId = document.getElementById("sensorId-input").value;
  let name = document.getElementById("name-input").value;
  document.querySelector("#lager-input").disabled = true;
  document.querySelector("#sensorId-input").disabled = true;
  document.querySelector("#name-input").disabled = true;
  web3 = await Moralis.Web3.enable();
  if (lagerID != "" && sensorId != "" && name != "") {
    const accounts = await web3.eth.getAccounts();
    const contractLager = new web3.eth.Contract(LagerAbi, contract_lager);
    const a = await contractLager.methods
      .newSensor(lagerID, sensorId, name)
      .send({ from: accounts[0], Value: 0 });
    console.log(a);
  } else {
    alert("please give the information");
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
  document.querySelector("#get-nfts-link").onclick = toStorageBottle;
}

if (document.querySelector("#get-balances-link")) {
  document.querySelector("#get-balances-link").onclick = getBalances;
}

if (document.querySelector("#upload")) {
  document.querySelector("#upload").onclick = upload;
}

//get-transactions-link
//get-balances-link
//get-nfts-link
