// connect to Moralis server
Moralis.initialize("kPwcZIIvHOrZsQAxVLtx1iLbF0ciRi6fCeLVeBff");
Moralis.serverURL = "https://qlbpnat4mi8a.moralishost.com:2053/server";

let web3;

async function init() {
  web3 = await Moralis.Web3.enable();
}

init();

const nft_contract_address = "0xD91d7FA166b709adF13e78Ed0Aa8Bd018177bFCe"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const options = { chain: "mumbai", address: nft_contract_address };

login = async () => {
  await Moralis.Web3.authenticate().then(async function (user) {
    console.log("logged in !!");
    user.set("name", document.getElementById("user-username").value);
    user.set("email", document.getElementById("user-email").value);
    await user.save();

    window.location.href = "mint.html";
  });
};

async function mint() {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractAbi, nft_contract_address);
  //console.log(SN, accounts[0]);
  let SN = document.getElementById("SerialNummer").value;

  document.querySelector("#SerialNummer").disabled = true;
  document.querySelector("#name").disabled = true;
  const metadata = {
    name: document.getElementById("name").value,
    date: Date(),
    serialnummer: SN,
  };
  const metadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await metadataFile.saveIPFS();
  const metadataURI = metadataFile.ipfs();

  contract.methods
    .mintWineToken(SN, metadataURI)
    .send({ from: accounts[0], value: 0 });
}

getNFTs = async () => {
  web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractAbi, nft_contract_address);
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
};

getNFTs();

logout = async () => {
  await Moralis.User.logOut();
  window.location.href = "index.html";
};

if (document.querySelector("#btn-login") != null) {
  document.querySelector("#btn-login").onclick = login;
}
if (document.querySelector("#btn-logout") != null) {
  document.querySelector("#btn-logout").onclick = logout;
}
/*if (document.querySelector("#get-nfts-link") != null) {
  document.querySelector("#get-nfts-link").onclick = getNFTs;
}*/
