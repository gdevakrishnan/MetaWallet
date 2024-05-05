import React, { Fragment, useContext, useEffect } from 'react'
import appContext from '../context/appContext'

function Dashboard() {
  const { State, getStateParameters, setNavState } = useContext(appContext);
  const {
    WindowEthereum,
    WalletAddress,
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

  return (
    <Fragment>
      <section className='page'>
        {
          (WindowEthereum) ? (
            (WalletAddress) ? (<h1>{`${WalletAddress.slice(0, 7)}...${WalletAddress.slice(-5)}`}</h1>) : <button onClick={(e) => handleClick(e)}>Connect</button>
          ) : <h1>Install metamask to unlock more features</h1>
        }
      </section>
    </Fragment>
  )
}

export default Dashboard