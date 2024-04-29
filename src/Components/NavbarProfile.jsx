import React from 'react'

const NavbarProfile = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content rounded-md mt-2">

            <div className="navbar-start">
                <a className="btn btn-ghost text-xl text-white font-bold">SURAKSHA</a>
            </div>

            <div className="navbar-end mr-5">
                <div className="avatar">
                    <div className=" w-12 rounded-full">
                        <img src="https://ui-avatars.com/api/?&name=Ekuspreet+Singh&background=000&color=fff" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarProfile