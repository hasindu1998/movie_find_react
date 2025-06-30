import { useEffect, useState } from "react"
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { fetchMovies, searchMovies } from "./service/api";

const App = () => {

  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () =>{
       try{
        const popularMovies = await fetchMovies();
        setmovieList(popularMovies);
       }catch(error){
        console.log(error);
        seterrorMessage("Failed to load movies");

       }finally{
          setisLoading(false);
       }
    }

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchTerm.trim()) return;
    if(isLoading) return;

    setisLoading(true);
    try {
      const searchResults = await searchMovies(searchTerm);
      setmovieList(searchResults);
      seterrorMessage(null);
    } catch (error) {
      console.log(error);
      seterrorMessage("Failed to search the movie");
    }finally{
      setisLoading(false);
    }

    setsearchTerm("");
  }


  return (
    <main className="flex justify-center">
      <div className="pattern" />

      <div className="wrapper">
        <header className="mt-20">
          <h1 className="text-7xl font-bold text-center wrapper">
            Find  
            <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent mt-20"> Movies</span>
          </h1>
          
          <div className="flex justify-center items-center mt-10">
            <input
             type="text" 
             placeholder="Search a movie" 
             className="bg-gray-600 pl-2 pt-1 pb-1 rounded-2xl w-68" 
             value={searchTerm}
             onChange={(e) => setsearchTerm(e.target.value)}
            />
            <button 
            className="bg-purple-500 text-white font-semibold pt-1 pb-1 pr-3 pl-3 rounded-md ml-6 cursor-pointer"
            type="submit"
            onClick={handleSearch}
            >Search</button>
          </div>

        </header>

        <section>
          <h2 className="all-movies text-4xl font-semibold mt-8 mb-4 text-left ml-20">All Movies</h2>

          {isLoading? (
            <Spinner/>
          ): errorMessage? (
            <p className="text-red-600">{errorMessage}</p>
          ):(
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 p-8" >
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
