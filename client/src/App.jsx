import React, { Fragment, useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI from "./contractJson/MetaWallet.json";
import Router from './router/Router'
import appContext from './context/appContext'

function App() {
  const navInitialState = {
    dashboard: true,
    transaction: false,
    history: false,
    help: false
  };

  const initialState = {
    WindowEthereum: false,
    ContractAddress: "0x7303c63a2230f87268C20B94628E7c6FFBdc15e7",
    WalletAddress: null,
    ContractAbi: ABI.abi,
    Provider: null,
    Signer: null,
    ReadContract: null,
    WriteContract: null,
  };
  const [State, setState] = useState(initialState);
  const [navState, setNavState] = useState(navInitialState);

  useEffect(() => {
    getStateParameters();
  }, []);


  const getStateParameters = async () => {
    if (window.ethereum) {
      setState(prevState => ({
        ...prevState,
        WindowEthereum: true
      }));

      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      await Provider.send("eth_requestAccounts", []);
      const Signer = await Provider.getSigner();
      const WalletAddress = await Signer.getAddress();

      setState(prevState => ({
        ...prevState,
        WalletAddress,
        Provider,
        Signer
      }));

      const ReadContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        Provider
      );
      const WriteContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        Signer
      );

      setState(prevState => ({
        ...prevState,
        ReadContract,
        WriteContract
      }));
    } else {
      console.log("Metamask Not Found");
    }
  };

  const context = {
    State,
    setState,
    getStateParameters,
    navState,
    setNavState
  }

  return (
    <Fragment>
      <appContext.Provider value={context}>
        <Router />
      </appContext.Provider>
    </Fragment>
  )
}

export default App