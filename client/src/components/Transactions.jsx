import React, { Fragment, useContext, useState } from 'react'
import { ethers } from 'ethers'
import appContext from '../context/appContext';

function Transactions() {
  const initialState = {
    reciever: "",
    amountEth: ""
  };

  const { State } = useContext(appContext);
  const { 
    WriteContract
  } = State;

  const [payment, setPayment] = useState(initialState);

  const handleTransfer = async (e) => {
    try {
      e.preventDefault();
      console.log("Please Wait...");
      const amountWei = ethers.utils.parseEther(payment.amountEth);
      const tx = await WriteContract.sendEthUser(payment.reciever, { value: amountWei });
      await tx.wait();
      console.log('Transaction successful');
      setPayment(initialState);
    } catch (e) {
      console.error(e.message);
      console.log("Transaction Failed");
    }
  }

  return (
    <Fragment>
      <form onSubmit={(e) => handleTransfer(e)}>
        <input type="text" name="reciever" id="reciever" placeholder='Reciever Address' value={payment.reciever} onChange={(e) => {
          setPayment({ ...payment, [e.target.id]: e.target.value })
        }} />
        <input type="number" name="amountEth" id="amountEth" placeholder='Ether' value={payment.reciever} onChange={(e) => {
          setPayment({ ...payment, [e.target.id]: e.target.value })
        }} />
        <input type="submit" value="Transfer" onClick={(e) => handleTransfer(e)} />
      </form>
    </Fragment>
  )
}

export default Transactions