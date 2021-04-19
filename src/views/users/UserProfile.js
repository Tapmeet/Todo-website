/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import { schema, schemaFname, schemaLname, schemaPhone, apiGetUser, apiUpdateUser } from '../../Utility/Utility';
const UserProfile = ({ match }) => {
  const [firstName, setFname] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [checkFname, setcheckFname] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [checkEmail, setcheckEmail] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState('customer');
  const [checkPhone, setCheckPhone] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [userToken, setUserToken] = React.useState('');
  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);

    console.log(decoded)
    if (email === '') {
      setEmail(decoded.email)
      setRole(decoded.userRole)
      setFname(decoded.fullName)
      setPhone(decoded.phone)
      setUserId(decoded._id)
    }
  }, [email])


  /**
   * Set First Name
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserFname(evt) {
    if (evt === "") {
      setcheckFname(true);
    } else {
      setcheckFname(false);
    }
    setFname(evt);
  }

  /**
   * Set Email 
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserEmail(evt) {
    if (evt === "") {
      setcheckEmail(true);
    } else {
      setcheckEmail(false);
    }
    setEmail(evt);
  }

  /**
   * Set Phone Number
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserPhone(evt) {
    if (evt === "") {
      setCheckPhone(true);
    } else {
      setCheckPhone(false);
    }
    setPhone(evt);

  }

  /**
   * Set Redirect after login 
   * @returns redirect url
   */
  function setRedirect() {
    setRedirectPath(true)
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to='/login' />
    }
  }
  /**
   * Submit handler 
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    console.log(role);
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    const resultFname = schemaFname.validate({ firstname: firstName });
    const resultEmail = schema.validate({ email: email });
    const resultphone = schemaPhone.validate({ phone: phone });

    if (resultFname.error) {
      setcheckFname(true);
      return false;
    }


    if (resultEmail.error) {
      setcheckEmail(true);
      return false;
    }
    if (resultphone.error) {
      setCheckPhone(true);
      return false;
    }

    setLoader(true);
    // API Call 
    axios.put(apiUpdateUser + userId, {
      fullName: firstName,
      phone: phone,
      userRole: role,
      id: userId
    }).then((response) => {
      setSuccessMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.userRole);
      setLoader(false);
      setTimeout(function () {
        window.location.reload();
      }, 2000);

    }).catch((error) => {
      console.log(error)
      setErrorMessage(error.response.data.message);
      setLoader(false);
    });
  }
  return (
    <div className="container">
      <h2>
        Your Profile
      </h2>
      <div className="col-sm-0 col-12">
        <form className="signup">
          <div className="row form-group first-row">
            <div className="col-12 col-sm-12">
              <input type="text" name="firstname" value={firstName} onChange={e => setUserFname(e.currentTarget.value)} className="form-control" placeholder="Full name" />
              <span className="error-message"> {checkFname === true ? '*Enter first name' : ''} </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-sm-12">
              <input type="email" name="email" readOnly value={email} onChange={e => setUserEmail(e.currentTarget.value)} className="form-control" placeholder="Email" />
              <span className="error-message"> {checkEmail === true ? '*Enter valid email' : ''} </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-sm-12">
              <input type="text" name="phone" value={phone} onChange={e => setUserPhone(e.currentTarget.value)} className="form-control" placeholder="Phone" />
              <span className="error-message"> {checkPhone === true ? '*Enter phone number' : ''} </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-sm-12">
              <label>Select Role</label>
              <select value={role} onChange={e => setRole(e.currentTarget.value)} className="form-control">
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="row form-group text-center btn-section">
            <div className="col-12 col-sm-12">
              <input type="submit" name="submit" onClick={handleSubmit} className="btn primary" value="Update User" />
              <br />
              {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}
              <br />
              {successMessage ? (<div className="alert alert-success alert-messages" role="alert">{successMessage}</div>) : null}
              {errorMessage ? (
                <div className="alert alert-danger alert-messages" role="alert">{errorMessage}</div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile
