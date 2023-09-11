import React from 'react';
import {useNavigate} from 'react-router-dom'
import hero from '../../hero-img.png';
import ButtonLg from '../../components/ButtonLg';
import Regions from '../../components/Regions';
import { useSelector } from 'react-redux';

const Landing = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    console.log(token)
    const handleSignInClick = () => {
      navigate('/auth', { state: { showSignUp: true } });
    }
  return (
    <>
        <div className=' mx-auto max-w-screen-xl flex my-12 justify-between'>
            <img src={hero} alt="Logo" className="max-w-sm" />
            <div className='flex flex-col justify-between items-start max-w-3xl'>
                <div className='w-36 h-2 bg-gradient-to-r from-primary to-black'>
                </div>
                 <h1 className=' font-semibold text-4xl mb-1'>
                     Lebanon RealEstate Insights {token}
                </h1>
                <p className='mb-10 text-xl font-medium text-justify leading-8 text-gray-500'>
                        Your gateway to the Lebanese real estate market. Whether you're looking to buy your dream property, sell your current one, 
                        or gain valuable insights into the market trends, we've got you covered. Our group offers a vast selection of properties, 
                        expert guidance, and a secure environment. Join our community of satisfied users and explore the endless possibilities 
                        that the Lebanese real estate market has to offer. Get started now and embark on your real estate journey through the  
                        boundless opportunities with limitless confidence. 
                </p>
                <ButtonLg buttonText='Sign Up' onClick={handleSignInClick}/>
            </div>
        </div>
        <div className=' mx-auto max-w-screen-xl flex mb-24 mt-40 justify-between items-center'>
            <div className='w-3/12'>
                 <h1 className=' font-semibold text-4xl mb-4'>
                    Explore best properties all over Lebanon 
                </h1>
                <div className='w-36 h-2 bg-gradient-to-r from-primary to-black mb-7'>
                </div>
                <p className='text-xl font-medium text-justify leading-8 text-gray-500'>
                    Lebanese Properties holds a wide range of great properties available for sale across all major areas in almost all Lebanese areas. 
                </p>
            </div>
            <div className='w-8/12'>
                <Regions />
            </div>
        </div>
    </>
  )
}

export default Landing