import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import appContext from '../context/appContext';

function Transactions() {
  const initialState = {
    reciever: "",
    amountEth: ""
  };

  const { State, setNavState } = useContext(appContext);
  const {
    WriteContract
  } = State;

  useEffect(() => {
    setNavState({
      dashboard: false,
      transaction: true,
      history: false
    })
  }, []);

  const [payment, setPayment] = useState(initialState);

  const handleTransfer = async (e) => {
    try {
      e.preventDefault();
      console.log("Please Wait...");
      const amountWei = ethers.utils.parseEther(payment.amountEth);
      const tx = await WriteContract.sendEthUser(payment.reciever, { value: amountWei });
      await tx.wait();
      console.log('Transaction completed successfully');
      setPayment(initialState);
    } catch (e) {
      console.error(e.message);
      console.log("Transaction Failed");
    }
  }

  return (
    <Fragment>
      <section className='page form_page'>
        <form onSubmit={(e) => handleTransfer(e)}>
          <input type="text" name="reciever" id="reciever" placeholder='Reciever Address' value={payment.reciever} onChange={(e) => {
            setPayment({ ...payment, [e.target.id]: e.target.value })
          }} />
          <input type="number" name="amountEth" id="amountEth" placeholder='Ether' value={payment.amountEth} onChange={(e) => {
            setPayment({ ...payment, [e.target.id]: e.target.value })
          }} />
          <input type="submit" value="Send" onClick={(e) => handleTransfer(e)} className='btn'/>
        </form>
      </section>
    </Fragment>
  )
}

export default Transactions