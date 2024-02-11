import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Weather = ({ data }) => {
  // State to keep track of the temperature unit, default is 'fahrenheit' since data is in Fahrenheit
  const [unit, setUnit] = useState('fahrenheit');

  // Function to convert temperature from Fahrenheit to Celsius
  const toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  // Function to toggle the temperature unit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'fahrenheit' ? 'celsius' : 'fahrenheit'));
  };

  // Display temperature in current unit
  const displayTemp = (temp) => {
    return unit === 'celsius' ? toCelsius(temp).toFixed(0) : temp.toFixed(0);
  };
  
  

  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10'>
      {/* Toggle Button */}
      <button onClick={toggleUnit} className='text-xl py-2 px-4 rounded-full bg-gray-500 bg-opacity-50'>
        Switch to {unit === 'fahrenheit' ? 'Celsius' : 'Fahrenheit'}
      </button>

      {/* Top */}
      <div className='relative flex justify-between pt-12'>
        <div className='flex flex-col items-center'>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt='/'
            width='100'
            height='100'
          />
          <p className='text-2xl'>{data.weather[0].main}</p>
        </div>
        <p className='text-9xl'>{displayTemp(data.main.temp)}&#176;{unit.charAt(0).toUpperCase()}</p>
      </div>

      {/* Bottom */}
      <div className='bg-black/50 relative p-8 rounded-md'>
        <p className='text-2xl text-center pb-6'>Weather in {data.name}</p>
        <div className='flex justify-between text-center'>
          <div>
            <p className='font-bold text-2xl'>{displayTemp(data.main.feels_like)}&#176;{unit.charAt(0).toUpperCase()}</p>
            <p className='text-xl'>Feels Like</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{data.main.humidity}%</p>
            <p className='text-xl'>Humidity</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)} MPH</p>
            <p className='text-xl'>Winds</p>
          </div>
         
        </div>
      </div>
     
    </div>
  );
};

export default Weather;
