import React, { Fragment, useContext } from 'react'
import appContext from '../context/appContext'

function Dashboard() {
  const { State, getStateParameters } = useContext(appContext);
  const { 
    WindowEthereum, 
    WalletAddress, 
  } = State;

  const handleClick = (e) => {
    e.preventDefault();
    getStateParameters();
  }

  return (
    <Fragment>
      {
        (WindowEthereum) ? (
          (WalletAddress) ? (<h1>{`${WalletAddress.slice(0, 7)}...${WalletAddress.slice(-5)}`}</h1>) : <button onClick={(e) => handleClick(e)}>Connect</button>
        ) : <h1>Install metamask to unlock more features</h1>
      }
    </Fragment>
  )
}

export default Dashboard