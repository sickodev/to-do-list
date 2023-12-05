import React from "react";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
    return (
        <nav>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl font-semibold'>To Do List</h1>
                <ModeToggle />
            </div>
            <hr className='my-1 opacity-50' />
        </nav>
    );
};

export default Navbar;
