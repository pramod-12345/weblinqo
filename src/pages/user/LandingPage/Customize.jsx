import React from "react";
import customizeImg from '../../../assets/images/svg/customizeImg.svg'
import SectionTitle from "./SectionTitle";

const Customize = () => {
    return (
        <>
            <SectionTitle title={'Create and customize your Weblinqo in minutes'} />
            <section className='bg-white'>
                <div className='max-w-7xl mx-auto flex justify-between items-center'>
                    <div className='flex items-center justify-center'>
                        <p className='text-center font-normal text-gray-400 text-size-18 leading-8'>
                            "Design your Weblinqo. Customize in minutes." <br />(Concise and action-oriented)<br />
                            "Your Weblinqo, your way — ready in minutes."<br />(User-centric and friendly)<br />
                            "Launch your Weblinq o. Quick, easy, and fully customizable."<br />(Highlights speed + flexibility)<br />
                            "Build your perf ect Weblinqo — no coding, just  creating."<br />(Appeals to non-tech-savvy users)<br />
                        </p>
                    </div>
                    <div>
                        <img src={customizeImg} className='w-full aspect-square' />
                    </div>
                </div>
            </section></>
    )
}

export default Customize;