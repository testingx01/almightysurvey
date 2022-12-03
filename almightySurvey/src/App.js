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
        setMsg("User Login");
        setAccnt(accounts[0]);
        const createSurvey = createRoot(document.getElementById("surveyCreatorContainer"));
        createSurvey.render(<SurveyCreatorComponent />);
      } else {
        alert("OOPS..\nSomething went wrong!!\nLogin failed");
      }
    } else {
      alert("MetaMask is not installed");
    }
  };
  return (
    <div className="App">
      <h1>Welcome! to Web3 survey</h1>
      <button className="ConnectBtn" onClick={cryptoButton}>
        Connect Wallet
      </button>
      <p>{msg}</p>
      {msg === "User Login" && <div>Account: {accnt}</div>}
    </div>
  );
}