import React, { Fragment, useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import Transactions from '../components/Transactions'
import Help from '../components/Help'
import History from '../components/History'
import appContext from '../context/appContext'

function Router() {
  const { State } = useContext(appContext);
  const {
    WalletAddress
  } = State;

  return (
    <Fragment>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' index element={<Dashboard />}/>
                <Route path='/transactions' element={(WalletAddress) ? <Transactions /> : <Dashboard />}/>
                <Route path='/history' element={(WalletAddress) ? <History /> : <Dashboard />}/>
                <Route path='/help' element={<Help />}/>
            </Routes>
            <Outlet />
        </BrowserRouter>
    </Fragment>
  )
}

export default Router