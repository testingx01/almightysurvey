import "./index.css";
import { useState } from "react";
import { ethers } from "ethers";
import { createRoot } from 'react-dom/client';
import SurveyCreatorComponent from './SurveyCreatorComponent';

const randomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default function App() {
  //var flag = 0;
  const [msg, setMsg] = useState();
  const [accnt, setAccnt] = useState();

  const cryptoButton = async () => {
    const { ethereum } = window;
    if (ethereum.isMetaMask) {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const message = randomString(16);
      const signature = await signer.signMessage(message);

      const signAddress = await ethers.utils.verifyMessage(message, signature);
      if (signAddress.toLowerCase() === accounts[0].toLowerCase()) {
        //flag = 1;
        setMsg(msg);
        setAccnt(accounts[0]);
        const accAdd = String(accounts[0]).substring(1,9);
        const createSurvey = await createRoot(document.getElementById("surveyCreatorContainer"));
        await createSurvey.render(<SurveyCreatorComponent />);
        document.getElementById("accUser").innerHTML=`
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
  `+accAdd+`<span class="glyphicon glyphicon-circle-arrow-down"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="#">`+signAddress+`</a></li>
          </ul>
        </li>
      </ul>
    </div>`;
      } else {
        alert("OOPS..\nSomething went wrong!!\nLogin failed");
      }
    } else {
      alert("MetaMask is not installed");
    }
  };
  return (
    <div>
    <div className="App navbar navbar-light bg-light container-fluid">
      <h1>Web3Form</h1>
      <button className="ConnectBtn btn btn-outline-success" onClick={cryptoButton} id="accUser">
        Connect Wallet
      </button>
    </div>
    <div class="card text-center">
    <div class="card-header">
      <h2>ETHIndia 2022</h2>
    </div>
    <div class="card-body">
      <h3 class="card-title">Team: Almighty</h3>
        <p class="card-text">Idea is to take Survey Form from web2 to web3 using Worldcoin Proof of People.</p>
    </div>
  </div>
  </div>
  );
}