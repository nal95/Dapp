// connect to Moralis server
Moralis.initialize("o7fbfCUvlzln18HbwVW3qLSuiKESUKVKNg3nQW1K");
Moralis.serverURL = "https://ykbeoaiyrra6.moralishost.com:2053/server";

let homepage = "http://127.0.0.1:5500/Data_Dapp/index.html";

if (Moralis.User.current() == null && window.location.href != homepage) {
  document.querySelector("body").style.display = "none";
  window.location.href = "index.html";
}

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
    address: "0x6666Ce97fe2D28746559220Ecec9D784054c360A",
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
storageWine = async () => {
  window.location.href = "storage.html";
};
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
