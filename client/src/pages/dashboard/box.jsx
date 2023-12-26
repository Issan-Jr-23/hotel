import React from 'react'
import "./styleDashboard.css"
import Forbidden from "../../images/forbidden.png"
import Eye from "../../images/eye.png"
import Crown from "../../images/crown.png"

const box = () => {
  return (
    <div>
        <section className='box-box mb-5' > 
          {/* <span className='box-span-img'>
            <img className='img-box' src={Crown} alt="" />
          </span> */}
            <span className='box-box-content'>
                <h3 className='mb-2 text-white uppercase'>Finalizado</h3>
                <p className=' text-white'>20</p>
            </span>
            <span className='box-span-img2'>
              <img className='img-box2' src={Crown} alt="" />
            </span>
        </section>
        <section className='box-box2 mb-5' >
          {/* <span className='box-span-img'>
            <img className='img-box' src={Crown} alt="" />
          </span> */}
            <span className='box-box-content'>
                <h3 className='mb-2 text-white uppercase'>Pendiente</h3>
                <p className=' text-white'>12</p>
            </span>
            <span className='box-span-img2'>
              <img className='img-box2' src={Eye} alt="" />
            </span>
        </section>
        <section className='box-box3 mb-2' >
          {/* <span className='box-span-img'>
            <img className='img-box' src={Crown} alt="" />
          </span> */}
            <span className='box-box-content'>
                <h3 className='mb-2 text-white uppercase'>Cancelado</h3>
                <p className=' text-white'>5</p>
            </span>
            <span className='box-span-img2'>
              <img className='img-box2' src={Forbidden} alt="" />
            </span>
        </section>
    </div>
  )
}

export default box