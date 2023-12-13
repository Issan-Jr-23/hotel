import React from 'react'
import NavMenu from '../components/NavMenu.jsx'

const HomeSu = () => {
  return (
    <div className='bg-white min-h-screen'>
        <NavMenu/>
        <div style={{marginLeft:"250px", marginRight:"20px", paddingTop:"60px" ,  fontSize:"black"}} >
          <section className=' flex justify-between' >
           <div className='border-2 border-red-500 rounded-3xl mr-5' style={{width:"60%", height:"250px"}}></div>
           <div className='border-2 border-blue-500 ml-5 rounded-2xl' style={{width:"35%", height:"250px"}} >

           </div>

          </section>

        </div>
    </div>
  )
}

export default HomeSu