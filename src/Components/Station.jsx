import React from 'react'

const Station = ({ name, id, phone,address,distance, lat , long }) => {
    return (
        <>
            <div key={id} className="contact bg-white text-neutral p-2 m-2 rounded-xl">
                <span className='font-semibold'>{name}</span>
                <br />
                <span className='font-bold text-2xl'>{phone}</span>
                <br />
                <span className='text-lg'>{address}</span>
<br/>
<a href={`  https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=driving `}>Locate On Map</a>

                <div className="span float-end font-semibold">{distance} Km</div>
            </div>
        </>
    )
}

export default Station