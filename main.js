// connect to Moralis server
Moralis.initialize("ietXr271huKFW8nCKZMXg6pOM47el5PljGVsubaN");
Moralis.serverURL = "https://qzhpwlroh4gk.moralishost.com:2053/server";

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

if (document.querySelector("#btn-login") != null) {
  document.querySelector("#btn-login").onclick = login;
}
if (document.querySelector("#btn-logout")) {
  document.querySelector("#btn-logout").onclick = logout;
}
