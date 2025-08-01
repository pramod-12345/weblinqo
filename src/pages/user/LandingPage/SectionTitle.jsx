import React from "react";

const SectionTitle = ({style, title, color }) => {
    return (
        <div className={`w-full flex items-center justify-center mb-10 mt-[4.5rem] ${style}`}>
            <h2 className={`m-0 text-size-32 md:text-size-40 lg:text-size-48 font-bold text-black text-center w-3/4 md:w-1/2 ${color}`}>{title}</h2>
        </div>
    )
}
export default SectionTitle;