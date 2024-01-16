import React from 'react'
import "./css/finca.registro.css";
import undraw from "../../images/undraw_dog.svg"



const Registro = () => {
    return (
        <div className='pt-20 pl-5 pr-5'>
            <section>
                <article className='finca-article-registro'>
                    <h2 className='finca-article-registro-title-form pt-5 pb-5'>REGISTRO DE BOVINO</h2>
                    <figure className='finca-figure-registro'>
                        <img src={undraw} alt="" />

                    </figure>
                    <form className='finca-registro-form'>

                        <div className='flex w-12-12  mt-10' >
                            <span className='w-6/12 mr-2  border-2 pl-3' >
                                <label className='pl-1' htmlFor="">Lorem, ipsum.</label>
                                <input placeholder='placeholder' className='finca-registro-form-input w-full pl-2 ' type="text" />

                            </span>
                            <span className='w-6/12 border-2 pr-3' >
                                <label className='pl-1' htmlFor="">Lorem, ipsum.</label>
                                <input placeholder='placeholder' className='finca-registro-form-input w-full pl-2' type="text" />

                            </span>
                        </div>
                        <span className='w-12/12 border-2 pr-3 pl-3' >
                            <label className='pl-1' htmlFor="">Lorem, ipsum.</label>
                            <input placeholder='placeholder' className='finca-registro-form-input w-full pl-2' type="text" />
                        </span>

                        <div className='flex w-12-12  mt-5' >
                            <span className='w-6/12 mr-2  border-2 pl-3' >
                                <label className='pl-1' htmlFor="">Lorem, ipsum.</label>
                                <input placeholder='placeholder' className='finca-registro-form-input w-full pl-2' type="text" />

                            </span>
                            <span className='w-6/12 border-2 pr-3' >
                                <label className='pl-1' htmlFor="">Lorem, ipsum.</label>
                                <input placeholder='placeholder' className='finca-registro-form-input w-full pl-2' type="text" />

                            </span>
                        </div>
                        <span className='w-12/12 border-2 pr-3 pl-3' >
                            <label className='pl-1' htmlFor="">Lorem, ipsum.</label>
                            <input placeholder='placeholder' className='finca-registro-form-input w-full pl-2' type="text" />
                        </span>
                        

                        
                    </form>
                </article>
            </section>
        </div>
    )
}

export default Registro