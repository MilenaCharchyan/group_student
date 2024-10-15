import React from 'react'
import { Menu } from '../../component/Menu'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Menu></Menu>
        <Outlet></Outlet>
    </div>
  )
}
