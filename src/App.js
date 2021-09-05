import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages";
import Vote from "./pages/vote";
import { useWeb3 } from "@openzeppelin/network/react";
import {
  getContract,
  getProposalHashes,
  getProposalInfo,
  getAllProposals,
  getVotesForOption,
  initialiseUser,
  createProposal,
  setProposalStatus,
  vote,
} from "./components/api/Api";
const { projectId } = require("./secrets.json");

function App() {
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
  const { lib: web3, networkId, accounts, providerName } = web3Context;

  const requestAuth = (web3Context) => web3Context.requestAuth();
  const requestAccess = useCallback(() => requestAuth(web3Context), []);

  return (
    <div>
      {
        // <button
        //   onClick={async () => {
        //     console.log(
        //       await createProposal(
        //         getContract(web3),
        //         accounts[0],
        //         "testing1",
        //         5,
        //         0,
        //         false,
        //         false
        //       )
        //     );
        //   }}
        // >
        //   TestButton
        // </button>
        // <button
        //   onClick={async () => {
        //     console.log(
        //       await vote(getContract(web3), accounts[0], "testing1", 2, 2)
        //     );
        //   }}
        // >
        //   TestButton1
        // </button>
        // <button
        //   onClick={async () => {
        //     console.log(await getProposalInfo(getContract(web3), "testing1"));
        //   }}
        // >
        //   TestButton2
        // </button>
      }
      {accounts && accounts.length ? (
        <div>
          <div>{networkId === 3 ? accounts[0] : "Get on Ropsten Testnet"}</div>
        </div>
      ) : !!networkId && providerName !== "infura" ? (
        <button onClick={requestAccess}>Login</button>
      ) : (
        <div>Please install Ethereum Compatible wallet</div>
      )}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vote" component={Vote} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
