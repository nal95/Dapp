// connect to Moralis server
Moralis.initialize("U8pWrvTB4I6vpnKF24fyZxrD4YQue5wHnuaHtVPR");
Moralis.serverURL = "https://oyoj4lpcodao.moralishost.com:2053/server";
let web3;

async function init() {
  web3 = await Moralis.Web3.enable();
}

init();

const nft_contract_address = "0x65225C37E80b95DBD98Fb8db4A7520Cf01284A63"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.

login = async () => {
  await Moralis.Web3.authenticate().then(async function (user) {
    console.log("logged in !!");
    user.set("name", document.getElementById("user-username").value);
    user.set("email", document.getElementById("user-email").value);
    await user.save();

    window.location.href = "mint.html";
  });
};

async function upload() {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractAbi, nft_contract_address);
  //console.log(SN, accounts[0]);
  const fileInput = document.getElementById("file");
  let SN = document.getElementById("SerialNummer").value;
  const data = fileInput.files[0];
  const imageFile = new Moralis.File(data.name, data);

  document.querySelector("#SerialNummer").disabled = true;
  document.querySelector("#upload").disabled = true;
  document.querySelector("#file").disabled = true;
  document.querySelector("#name").disabled = true;
  document.querySelector("#description").disabled = true;

  await imageFile.saveIPFS();
  const imageURI = imageFile.ipfs();
  const metadata = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    image: imageURI,
  };
  const metadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await metadataFile.saveIPFS();
  const metadataURI = metadataFile.ipfs();

  contract.methods
    .mintWinesToken(SN, metadataURI)
    .send({ from: accounts[0], value: 0 });
  console.log("succes");
}

/*async function upload() {
  const fileInput = document.getElementById("file");
  const data = fileInput.files[0];
  const imageFile = new Moralis.File(data.name, data);

  document.querySelector("#SN").disabled = true;
  document.querySelector("#upload").disabled = true;
  document.querySelector("#file").disabled = true;
  document.querySelector("#name").disabled = true;
  document.querySelector("#description").disabled = true;
  await imageFile.saveIPFS();
  const imageURI = imageFile.ipfs();
  const metadata = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    image: imageURI,
  };
  let _SN = document.getElementById("SN").value;
  const metadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await metadataFile.saveIPFS();
  const metadataURI = metadataFile.ipfs();
  return mintToken(document.getElementById("SN").value, metadataURI).then(
    notify
  );
}*/

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
