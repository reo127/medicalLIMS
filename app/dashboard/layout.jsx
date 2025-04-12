import React from 'react'
import Sidebar from '../_components/Sidebar'

const layout = ({ children }) => {
  return (
    <div>
      <Sidebar children={children} />
    </div>
  )
}

export default layout