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

document.querySelector("#btn-login").onclick = login;
