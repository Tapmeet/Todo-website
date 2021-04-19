/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { schema, schemaFname, schemaLname, schemaPassword, schemaCpass, schemaPhone, apiRegister } from '../../Utility/Utility';
const AddUser = ({ match }) => {
  const [firstName, setFname] = React.useState('');
  const [checkFname, setcheckFname] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [checkEmail, setcheckEmail] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState('customer');
  const [checkPhone, setCheckPhone] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [checkPassword, setcheckPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [checkConfirmPassword, setcheckConfirmPassword] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState(false);

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
   * Set Password 
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserPassword(evt) {
    if (evt === "") {
      setcheckPassword(true);
    } else {
      setcheckPassword(false);
    }
    setPassword(evt);

  }
  /**
   * Set Confirm Password 
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserConfirmpassword(evt) {
    if (evt === "") {
      setcheckConfirmPassword(true);
    } else {
      setcheckConfirmPassword(false);
    }
    setConfirmPassword(evt);

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
    const resultpassword = schemaPassword.validate({ password: password });
    const resultconfirmpassword = schemaCpass.validate({ password: password, confirmpassword: confirmPassword });
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
    if (resultpassword.error) {
      setcheckPassword(true);
      return false;
    }
    if (resultconfirmpassword.error) {
      setcheckConfirmPassword(true);
      return false;
    }
    setLoader(true);
    // API Call 
    axios.post(apiRegister, {
      fullName: firstName,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      phone: phone,
      isVerified: true,
      userRole:role
    }).then((response) => {
      setSuccessMessage(response.data.message);
      setLoader(false);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setLoader(false);
    });
  }
  return (
    <div className="container">
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
              <input type="email" name="email" value={email} onChange={e => setUserEmail(e.currentTarget.value)} className="form-control" placeholder="Email" />
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
              <input type="password" name="password" value={password} onChange={e => setUserPassword(e.currentTarget.value)} className="form-control" placeholder="Password" />
              <span className="error-message"> {checkPassword ? '*Password must be at least 8 characters long' : ''} </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-sm-12">
              <input type="password" name="cpassword" value={confirmPassword} onChange={e => setUserConfirmpassword(e.currentTarget.value)} className="form-control" placeholder="Confirm Password" />
              <span className="error-message"> {checkConfirmPassword ? '*Password does not matched' : ''} </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-sm-12">
              <label>Select Role</label>
              <select defaultValue={role} onChange={e => setRole(e.currentTarget.value)} className="form-control">
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="row form-group text-center btn-section">
            <div className="col-12 col-sm-12">
              <input type="submit" name="submit" onClick={handleSubmit} className="btn primary" value="Create User" />
              {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}

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

export default AddUser
