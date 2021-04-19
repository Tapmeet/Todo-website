/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import { apiGetUser } from './../../Utility/Utility';

const User = ({ match }) => {
  const [usersData, setUsersCreatedAt] = useState('')
  const [usersName, setUsersName] = useState('')
  const [usersEmail, setUsersEmail] = useState('')
  const [usersRole, setUsersRole] = useState('')
  const [usersPhone, setUsersPhone] = useState('')
  const [usersIsVerified, setUsersIsVerified] = useState(false)
  useEffect(() => {
    if (usersData === '') {
      axios.get(`${apiGetUser + match.params.id}`, {
      }).then(function (response) {
        console.log(response.data.user)
        setUsersCreatedAt(response.data.user.createdAt)
        setUsersEmail(response.data.user.email)
        setUsersRole(response.data.user.userRole)
        setUsersName(response.data.user.fullName)
        setUsersPhone(response.data.user.phone)
        setUsersIsVerified(response.data.user.isVerified)
      });
    }
  }, [match.params.id, usersData])
  return (
    <CRow>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>
            <h3>User Information</h3>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{usersName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{usersEmail}</td>
                </tr>
                <tr>
                  <td>Role:</td>
                  <td>{usersRole}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{usersPhone}</td>
                </tr>
                <tr>
                  <td>Email Verification:</td>
                  <td>{usersIsVerified ? 'True' : 'False' }</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{usersData}</td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
