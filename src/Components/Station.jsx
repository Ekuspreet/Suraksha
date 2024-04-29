import React from 'react'

const Station = ({ name, id, phone,address }) => {
    return (
        <>
            <div key={id} className="contact bg-white text-neutral p-2 m-2 rounded-xl">
                <span className='font-semibold'>{name}</span>
                <br />
                <span className='font-bold text-2xl'>{phone}</span>
                <br />
                <span className='text-lg'>{address}</span>

            </div>
        </>
    )
}

export default Station