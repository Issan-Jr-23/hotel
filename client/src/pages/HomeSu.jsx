import React from 'react'
import NavMenu from '../components/NavMenu.jsx'
import {Button} from "@nextui-org/react"
import mockup from "../images/proyecto.png"
import hm from "../images/cover_1.jpeg"
import users from "../images/usuario.png"
import cabana from "../images/beach-cabana-st.png"

const HomeSu = () => {
  return (
    <div className='bg-white min-h-screen'>
        <NavMenu/>
        <div style={{marginLeft:"250px", marginRight:"20px", paddingTop:"60px" ,  fontSize:"black"}} >
          <section className=' flex justify-between flex-wrap' >
           <div className=' rounded-3xl mr-5 flex' style={{width:"60%", height:"280px", backgroundColor:"#d5f4e7", border:" 5px solid #d5f4e7"}}>
            <article className=' w-2/4 pl-8 pt-8 pr-4' style={{borderRadius:" 20px 0px 0px 20px"}} >
              <h1 style={{fontSize:"22px", fontWeight:"700", color:"#004b50"}} >Welcome back 👋 <br /> user name</h1>
              <p style={{fontSize:"14.2px", color:"#58918e"}} className='pt-2' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus molestiae illo natus.</p>
              <Button className='mt-5 text-white' style={{fontWeight:"700", backgroundColor:"#00a76f"}}>
                Go now
              </Button>
            </article>
            <article className='cont-cover1 w-2/4' style={{borderRadius:" 0px 20px 20px 0px"}} >
            <img className='h-full' src={mockup} alt="" style={{borderRadius:"0px 20px 20px 0px"}} />
            </article>
           </div>
           <div className='cover1 ml-5 rounded-3xl' style={{width:"35%", height:"280px"}} >
             <h2 className=' text-cover'>Title</h2>
             <p className=' text-cover1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe delectus voluptate aliquam et eos molestias nisi amet ut ipsam iure...</p>
           </div>

          </section>
          <section className=' pt-2 mt-5 pb-2 flex justify-between'>
          <article className=' vista-cantidades  border-1 pl-5 flex'>
            <span className='w-1/2 justify-around flex flex-col'>
              <h3 style={{fontWeight:"600"}} >Total Pasadia</h3>
              <p style={{fontWeight:"600"}} >$9,000 COP</p>
              <p className='text-3xl flex' style={{fontWeight:"600"}}> <img className='w-8' src={users} alt="" />  1.546.000</p>

              </span>
              <article className='w-1/2 h-full flex items-center justify-center' >
                <span className='flex items-end'>
                <span className='barrag'></span>
                <span className='barrag1'></span>
                <span className='barrag2'></span>
                <span className='barrag3'></span>
                <span className='barrag4'></span>
                <span className='barrag5'></span>
                <span className='barrag6'></span>
                <span className='barrag7'></span>

                </span>
                
              </article>
            </article>
            <article className=' separadores vista-cantidades  border-1 pl-5 flex'>
            <span className='w-1/2 justify-around flex flex-col'>
              <h3 style={{fontWeight:"600"}} >Total Cabañas</h3>
              <p style={{fontWeight:"600"}} > $200,000 COP</p>
              <p className='text-3xl flex' style={{fontWeight:"600"}}> <img className='w-8' src={users} alt="" /> 332.000</p>

              </span>
              <article className='w-1/2 h-full flex items-center justify-center' >
                <span className='flex items-end'>
                <span className='barragf'></span>
                <span className='barragf1'></span>
                <span className='barragf2'></span>
                <span className='barragf3'></span>
                <span className='barragf4'></span>
                <span className='barragf5'></span>
                <span className='barragf6'></span>
                <span className='barragf7'></span>

                </span>
                
              </article>
            </article>
            <article className=' separadores vista-cantidades  border-1 pl-5 flex'>
            <span className='w-1/2 justify-around flex flex-col'>
              <h3 style={{fontWeight:"600"}} >Total Habitaciones</h3>
              <p style={{fontWeight:"600"}} >$723,000 COP</p>
              <p className='text-3xl flex' style={{fontWeight:"600"}}> <img className='w-8' src={users} alt="" />  700.120</p>

              </span>
              <article className='w-1/2 h-full flex items-center justify-center' >
                <span className='flex items-end'>
                <span className='barra'></span>
                <span className='barra1'></span>
                <span className='barra2'></span>
                <span className='barra3'></span>
                <span className='barra4'></span>
                <span className='barra5'></span>
                <span className='barra6'></span>
                <span className='barra7'></span>

                </span>
                
              </article>
            </article>
          </section>

        </div>
    </div>
  )
}

export default HomeSu