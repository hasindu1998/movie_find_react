import { use, useEffect, useState } from "react"
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

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
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  ;

  const fetchMovies = async() => {
    setisLoading(true);
    seterrorMessage('');

    try{
      const endPoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTION);

      if(!response.ok){
        throw new Error('Cannot Fetch Movie');
      }

      const data = await response.json();

      if(data.response == false){
        seterrorMessage(data.error || 'Failed to fetch');
        setmovieList([]);
        return;
      }

      setmovieList(data.results || []);

    }catch(error){
      console.log('Error Movies: ${error}');
      seterrorMessage('Movie has an error, Please try again');
    }finally{
      setisLoading(false);
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
          <h2 className="all-movies text-2xl font-semibold mt-8 mb-4">All Movies</h2>

          {isLoading? (
            <Spinner/>
          ): errorMessage? (
            <p className="text-red-600">{errorMessage}</p>
          ):(
            <div className="grid lg:grid-cols-4 sm:grid-cols-2" >
              {movieList.map((movie) =>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </div>
          )}
          
        </section>
      </div>
    </main>
  )
}

export default App
