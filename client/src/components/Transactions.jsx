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
  const [msg, setMsg] = useState("");

  const handleTransfer = async (e) => {
    try {
      e.preventDefault();
      setMsg("Please Wait...");
      const amountWei = ethers.utils.parseEther(payment.amountEth);
      const tx = await WriteContract.sendEthUser(payment.reciever, { value: amountWei });
      await tx.wait();
      setMsg('Transaction Successful');
      setPayment(initialState);
      setTimeout(() => {
        setMsg("");
      }, 5000);
    } catch (e) {
      console.error(e.message);
      setMsg("Transaction Failed");
      setTimeout(() => {
        setMsg("");
      }, 5000);
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
          <input type="submit" value="Send" onClick={(e) => handleTransfer(e)} className='btn' />
        </form>
        {
          (msg.trim() !== "") ? (
            <div className="msg_container">
              <h1 className="msg">{msg}</h1>
            </div>
          ) : null
        }
      </section>
    </Fragment>
  )
}

export default Transactions