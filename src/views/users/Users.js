/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";
import {  apiGetUsers } from './../../Utility/Utility';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

//import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [usersData, setUsersData] = useState([])
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    axios.get(`${apiGetUsers}`, {
    }).then(function (response) {
        console.log(response.data.users)
        setUsersData(response.data.users)
    });
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            <h2>Conscientiousness Members</h2>
          </CCardHeader>
          <CCardBody>
          <CDataTable
          header={false}
            items={usersData}
            fields={[
              { key: 'fullName', _classes: 'font-weight-bold' },
              'email', 'userRole', 'isVerified'
            ]}
            hover
            striped
            itemsPerPage={20}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item._id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.isVerified}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={1}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
