"use client"
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';
import ErrorModal from '../components/ErrorModal';
import Link from 'next/link';


export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for error messages
  const [showErrorModal, setShowErrorModal] = useState(false); 

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    console.log('Recent Searches:', recentSearches);
}, [recentSearches]);

  // Function to add a city to the recent searches
  const addCityToRecentSearches = (cityName) => {
    setRecentSearches(prev => {
      const updatedSearches = [cityName, ...prev.filter(c => c !== cityName)];
      if (updatedSearches.length > 5) updatedSearches.length = 5; // Keep only the last five searches
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches)); // Update localStorage
      return updatedSearches;
    });
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true);
    setError('');
    setShowErrorModal(false); // Ensure the error modal is not shown before the API call
  
    axios.get(url)
      .then((response) => {
        setWeather(response.data);
        addCityToRecentSearches(city); // Update recent searches here
        setCity(''); // Clear the city input after successful fetch
      })
      .catch(error => {
        // If there's an error in the request, set the error message
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        setError(errorMessage);
        setShowErrorModal(true); // Show the error modal
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of request success or failure
      });
  };
  
  

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="relative h-screen">
        <Head>
          <title>Weather App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]' />
        {/* Background image */}
        <Image
          src='https://static.vecteezy.com/system/resources/previews/022/815/907/large_2x/realistic-gradient-color-bokeh-glass-effect-blurshop-background-image-free-photo.jpg'
          layout='fill'
          className='object-cover'
        />
        {/* Error Modal */}
      {showErrorModal && <ErrorModal message={error} onClose={() => setShowErrorModal(false)} />}
        {/* Search */}
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
          <form
            onSubmit={fetchWeather}
            className='flex justify-between items-center w-full p-3 bg-black/50 border border-gray-500 text-white rounded-2xl backdrop-filter backdrop-blur-md shadow-md'
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className='bg-transparent border-none text-white focus:outline-none text-xl'
                type='text'
                placeholder='Search city'
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        
        {/* Weather */}
        {weather.main && <Weather data={weather} />}

        {/* Recent Searches */}
        <div className="fixed bottom-4 left-4 z-10">
  {recentSearches.length > 0 ? (
    <div className="w-60 bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-4 text-white shadow-lg">
      <h2 className="text-lg font-bold mb-2">Recent Searches</h2>
      <ul className="list-none p-0 m-0">
        {recentSearches.map((search, index) => (
          <li key={index} className="py-1 truncate">{search}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="w-60 bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-4 text-white shadow-lg">
      <p className="text-lg font-bold mb-2">Recent Searches</p>
      <p>No recent searches.</p>
    </div>
  )}
</div>

      </div>
    );
  }
}