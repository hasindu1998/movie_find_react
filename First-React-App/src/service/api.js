const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a84d5f8ffb2f53ab535ae6a6d8e3b63c';

export const fetchMovies = async () =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}


export const searchMovies = async (query) =>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}