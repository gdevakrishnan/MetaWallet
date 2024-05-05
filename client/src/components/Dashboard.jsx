import React, { Fragment, useContext, useEffect, useState } from 'react'
import appContext from '../context/appContext'

function Dashboard() {
  const { State, getStateParameters, setNavState } = useContext(appContext);
  const {
    WindowEthereum,
    WalletAddress,
    Balance
  } = State;

  useEffect(() => {
    setNavState({
      dashboard: true,
      transaction: false,
      history: false,
      help: false
    })
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    getStateParameters();
  }

  const Card = () => {
    return (
      <div className="card">
        <h1 className="title">Meta-Wallet</h1>
        {
          (WalletAddress) ? (
            <Fragment>
              <h1 className='accountAddress'>{`${WalletAddress.slice(0, 7)}...${WalletAddress.slice(-5)}`}</h1>
              <h1 className="balance_title">Balance:</h1>
              <h1 className="balance">{Balance}ETH</h1>
              {/* <h1 className="balance">{Math.round(Balance * 1e7) / 1e7}</h1> */}
            </Fragment>
          ) : <h1 className="accountAddress">XXXXXX...XXXX</h1>
        }
        {
          (!WalletAddress) ? (<button onClick={(e) => handleClick(e)} className='btn'>Connect</button>) : null
        }
      </div>
    );
  }

  return (
    <Fragment>
      <section className='page dashboard_page'>
        {
          (WindowEthereum) ? (
            <Card />
          ) : <h1>Install metamask to unlock more features</h1>
        }
      </section>
    </Fragment>
  )
}

export default Dashboard