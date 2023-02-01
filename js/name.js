
let sendInfo=document.getElementById("sending");
let userName;

function summitInfo() {
   userName=document.getElementById("login_input").value;
   sessionStorage.setItem("playerName", `${userName}`);
}

sendInfo.addEventListener("click",summitInfo);



