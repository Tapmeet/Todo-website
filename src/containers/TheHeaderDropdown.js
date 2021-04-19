import React, { useState } from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
//import Cookies from 'universal-cookie';
import CIcon from '@coreui/icons-react'
import user from "./../assets/user.png";
const TheHeaderDropdown = () => {
  const [userToken, setUserToken] = React.useState('');
  // const cookies = new Cookies();
  const [userName, setUserName] = React.useState('');
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserToken(localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);
      setUserName(decoded.firstName)
    }
    else {
      console.log('here')
      setRedirect();
    }
  }, [userToken]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  function setRedirect() {
    setRedirectPath(true)
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to='/login' />
    }
  }
  /**
    * Logout Function 
    * @desc Remove user data from cookies
    * @returns na
    */
  function logOut() {
    localStorage.removeItem('token');
    setProcessing(true);
    setTimeout(function () {
      setProcessing(false);
      setRedirect();
      window.location.reload();
    }, 1000);

  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <img
            src={user}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem to="/profile">
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logOut}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
        Logout
        </CDropdownItem>
      </CDropdownMenu>
      {renderRedirect()}
    </CDropdown>
  )
}

export default TheHeaderDropdown
