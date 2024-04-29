import React from 'react'

const Login = () => {
    return (
        <div className='text-primary px-4 py-4 bg-opacity-20 bg-primary rounded-xl my-3 max-w-[30em] m-auto mt-5 '>
            <form action="" className='flex flex-col gap-2 mb-5'>
                <label className='text-3xl font-bold text-center'>Login</label>
                <div className="divider">Enter Details</div>
            <label className="input input-bordered flex items-center gap-2">
                Phone
                <input required type="number" className="grow" placeholder="8887776665" />
            </label>
            <button className='btn  btn-neutral text-neutral-content mt-2'>Send OTP</button>
            
            <div className="divider">Enter OTP</div>
            
            <label className="input input-bordered flex items-center gap-2">
                OTP
                <input required type="number" className="grow" placeholder="123456" min={0} />
            </label>

            <input type="submit" className='btn btn-neutral text-neutral-content mt-2' value={"Log In"} />
            <a href="" className='text-center link link-primary'>First Time? Register Here.</a>

            </form>


        </div>


    )
}

export default Login