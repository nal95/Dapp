// connect to Moralis server
Moralis.initialize("WtIouaRR03pa2oPYIJxisLd1VFPiLNBLsLxVD0io");
Moralis.serverURL = "https://ezmfxliqvfeo.moralishost.com:2053/server";

/*let homepage = "http://127.0.0.1:5500/index.html";

if (Moralis.User.current() == null && window.location.href != homepage) {
  document.querySelector("body").style.display = "none";
  window.location.href = "index.html";
}*/

login = async () => {
  await Moralis.Web3.authenticate().then(function (user) {
    console.log("logged in !!");
    console.log(Moralis.User.current());
  });
};

if (document.querySelector("#btn-login") != null) {
  document.querySelector("#btn-login").onclick = login;
}
//get-transactions-link
//get-balances-link
//get-nfts-link