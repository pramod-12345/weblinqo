import React from "react";

const SectionTitle = ({ title }) => {
    return (
        <div className='w-full flex items-center justify-center mb-10 mt-[4.5rem]'>
            <h2 className='m-0 text-size-48 font-bold text-center w-1/2'>{title}</h2>
        </div>
    )
}
export default SectionTitle;