import React from 'react'
import TableF from './finca/tableF'
// import Navbars from '../components/Navbars'

const FincaVisualizacion = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        {/* <Navbars/> */}
        <div className='m-5 overflow-x-auto overflow-y-hidden'>

        <TableF/>
        </div>
    </div>
  )
}

export default FincaVisualizacion