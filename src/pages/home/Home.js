import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../services/slicer/AuthSlicer'
import AdminDashboard from './AdminDashboard'
import CenterDashboard from './CenterDashboard'
import './home.scss'
function Home() {
    const currentRole = useSelector(selectUserRole)
  return (
    <>
        {
            currentRole === 2 ? 
            <CenterDashboard />
            :
            currentRole === 1 ?
            <AdminDashboard />
            :
            <></>
        }
    </>
  )
}

export default Home