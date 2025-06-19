import { useEffect, useState } from "react"
import Search from "./components/Search";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


const App = () => {

  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState('');

  const fetchMovies = async() => {
    try{
      const endPoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTION);

      if(!response.ok){
        throw new Error('Cannot Fetch Movie');
      }

      const data = await response.json();

      console.log(data);

    }catch(error){
      console.log('Error Movies: ${error}');
      seterrorMessage('Movie has an error, Please try again');
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <main className="flex justify-center">
      <div className="pattern" />

      <div className="wrapper">
        <header className="mt-20">
          <h1 className="text-7xl font-bold text-center wrapper">
            Find  
            <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent mt-20"> Movies</span>
          </h1>
          
          <Search searchTerm = {searchTerm} setsearchTerm = {setsearchTerm} />
        </header>

        <section>
          <h2>All Movies</h2>


          {errorMessage && <p className="text-red-800">{errorMessage}</p>}
        </section>
        
        
      </div>
    </main>
  )
}

export default App
