import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Fragment>
      <nav>
        <ul>
          <li><Link to={'/'}>home</Link></li>
          <li><Link to={'/transactions'}>Transactions</Link></li>
          <li><Link to={'/history'}>History</Link></li>
          <li><Link to={'/help'}>Help</Link></li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navbar