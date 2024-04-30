import React from 'react'

const Contact = ({id,phone}) => {
  return (
    <>
    <div key={id} className="contact bg-white text-neutral p-2 m-2 rounded-xl">
    <span className='font-bold text-2xl'>{phone}</span>
    <button className="btn btn-sm float-end btn-neutral text-white">Delete</button>

    </div>
    </>
  )
}

export default Contact