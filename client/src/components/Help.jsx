import React, { useContext, useEffect } from 'react'
import appContext from '../context/appContext';

function Help() {
  const { setNavState } = useContext(appContext);
  
  useEffect(() => {
    setNavState({
      dashboard: false,
      transaction: false,
      history: false,
      help: true
    })
  }, []);

  return (
    <section className='page'>
      <h1>Help</h1>
    </section>
  )
}

export default Help