import React from 'react'

const Contact = ({id,name,phone}) => {
  return (
    <>
    <div key={id} className="contact bg-white text-neutral p-2 m-2 rounded-xl">
    <span className='font-semibold'>{name}</span>
    <br />
    <span className='font-bold text-2xl'>{phone}</span>
    <button className="btn btn-sm float-end btn-neutral text-white">Delete</button>

    </div>
    </>
  )
}

export default Contact