// connect to Moralis server
Moralis.initialize("WtIouaRR03pa2oPYIJxisLd1VFPiLNBLsLxVD0io");
Moralis.serverURL = "https://ezmfxliqvfeo.moralishost.com:2053/server";



const nft_contract_address = "0xbFEf1ADC73Ed3Ed9EDa674FB7E0A9503E7Ff5354"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.



login = async () => {
  await Moralis.Web3.authenticate().then(async function (user) {
    console.log("logged in !!");
    user.set("name", document.getElementById("user-username").value);
    user.set("email", document.getElementById("user-email").value);
    await user.save();
    window.location.href = "mint.html";
  });
};

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