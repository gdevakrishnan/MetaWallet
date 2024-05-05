import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import appContext from '../context/appContext'
import { FaHome, FaWallet, FaHistory } from "react-icons/fa";
import { MdHelp } from "react-icons/md";

function Navbar() {
  const { navState } = useContext(appContext);

  return (
    <Fragment>
      <nav>
        <ul>
          <li title='Dashboard' style={(navState.dashboard) ? { backgroundColor:'#70e000' } : { backgroundColor: 'transparent' } }>
            <Link to={'/'}>
              <FaHome style={(navState.dashboard) ? { color:'#212529' } : { color: '#e9ecef' } } />  
            </Link>
          </li>
          <li title='Transaction' style={(navState.transaction) ? { backgroundColor:'#70e000' } : { backgroundColor: 'transparent' } }>
            <Link to={'/transactions'}>
              <FaWallet style={(navState.transaction) ? { color:'#212529' } : { color: '#e9ecef' } }  />
            </Link>
          </li>
          <li title='History' style={(navState.history) ? { backgroundColor:'#70e000' } : { backgroundColor: 'transparent' } }>
            <Link to={'/history'}>
              <FaHistory style={(navState.history) ? { color:'#212529' } : { color: '#e9ecef' } } />
            </Link></li>
          <li title='Help' style={(navState.help) ? { backgroundColor:'#70e000' } : { backgroundColor: 'transparent' } }>
            <Link to={'/help'}>
              <MdHelp style={(navState.help) ? { color:'#212529' } : { color: '#e9ecef' } }  />
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navbar