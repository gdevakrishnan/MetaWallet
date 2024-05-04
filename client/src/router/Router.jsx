import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import Transactions from '../components/Transactions'
import Help from '../components/Help'
import History from '../components/History'

function Router() {
  return (
    <Fragment>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' index element={<Dashboard />}/>
                <Route path='/transactions' element={<Transactions />}/>
                <Route path='/history' element={<History />}/>
                <Route path='/help' element={<Help />}/>
            </Routes>
            <Outlet />
        </BrowserRouter>
    </Fragment>
  )
}

export default Router