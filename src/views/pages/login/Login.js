/* eslint-disable eqeqeq */
import React from 'react'
import { Link } from 'react-router-dom'
//import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { schema, schemaPassword, apiLogin } from './../../../Utility/Utility';
import {
  CButton,
  CCard,
  CCardBody, 
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [checkEmail, setcheckEmail] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [checkPassword, setcheckPassword] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [checkRole, setCheckRole] = React.useState(false);
  /**
   * Set Email 
   * @param {string} evt get the value of the field.
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
   * @param  {string} evt get the value of the field.
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
    * Set Redirect after login 
    * @returns redirect url
    */
  function setRedirect() {
    setRedirectPath(true)
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to='/dashboard' />
    }
  }

  /**
   * Submit handler 
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    setCheckRole(false)
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    const resultEmail = schema.validate({ email: email });
    const resultpassword = schemaPassword.validate({ password: password });

    if (resultEmail.error) {
      setcheckEmail(true);
      return false;
    }

    if (resultpassword.error) {
      setcheckPassword(true);
      return false;
    }
    setLoader(true);
    // API Call 
    axios.post(apiLogin, {
      email: email,
      password: password,
    }).then((response) => {
      setSuccessMessage(response.data.message);
      if (response.data.user.userRole != 'admin') {
        setCheckRole('true')
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.userRole);
        setLoader(false);
        setRedirect();
        window.location.reload();
      }

    }).catch((error) => {
      console.log(error)
      setErrorMessage(error.response.data.message);
      setLoader(false);
    });
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" value={email} onChange={e => setUserEmail(e.currentTarget.value)} placeholder="Email" autoComplete="email" />
                      <span className="error-message"> {checkEmail === true ? '*Enter valid email' : ''} </span>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" value={password} onChange={e => setUserPassword(e.currentTarget.value)} placeholder="Password" autoComplete="current-password" />
                      <span className="error-message"> {checkPassword ? '*Enter password / must be 8 character long' : ''} </span>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={handleSubmit} className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                      {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}

                      {successMessage ? (<div className="alert alert-success alert-messages" role="alert">{successMessage}</div>) : null}
                      {errorMessage ? (
                        <div className="alert alert-danger alert-messages" role="alert">{errorMessage}</div>
                      ) : null}
                      {renderRedirect()}
                      {checkRole ?  <div className="alert alert-danger alert-messages" role="alert">You are not authorized member to view this area.</div> : null}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>CC Admin</h2>
                    <p> Conscientiousness refers to the ability to organize yourself to achieve your goals and make change in your world.</p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3 red" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
