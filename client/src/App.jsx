import React, { Fragment, useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI from "./contractJson/MetaWallet.json";

function App() {
  useEffect(() => {
    getStateParameters();
  }, []);

  const initialState = {
    "ContractAddress": "0x7303c63a2230f87268C20B94628E7c6FFBdc15e7",
    "ContractAbi": ABI.abi,
    "WalletAddress": "",
    "Provider": null,
    "Signer": null,
    "ReadContract": null,
    "WriteContract": null
  };
  const [State, setState] = useState(initialState);

  const getStateParameters = async () => {
    if (window.ethereum) {
      console.log("Metamask Found");
      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      await Provider.send("eth_requestAccounts", []);
      const Signer = await Provider.getSigner();
      const WalletAddress = await Signer.getAddress();
      console.log(WalletAddress);
      setState({ ...State, WalletAddress, Provider, Signer });

      const ReadContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        State.Provider
      );
      const WriteContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        State.Signer
      );
      setState({ ...State, ReadContract, WriteContract });
    } else {
      console.log("Metamask Not Found");
    }
  }

  return (
    <Fragment>
      <h1>MetaWallet</h1>

      {
        (window.ethereum) ? (
          <Fragment>
            {
              (State.WalletAddress) ? 
                (<h1>{State.WalletAddress}</h1>):
                (<button onClick={(e) => {
                  console.log(State.WalletAddress);
                  getStateParameters(e)}
                }>Connect</button>)
            }
          </Fragment>
        ) : (<h1>Please Intall MetaMask To Unlock More Features</h1>)
      }
    </Fragment>
  )
}

export default App