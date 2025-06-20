import React from "react";

const Search = ({searchTerm, setsearchTerm}) =>{
    return(
        <div className="search flex justify-center mt-10">
            <input
             type="text" 
             placeholder="Search a movie" 
             className="bg-gray-600 pl-2 pt-1 pb-1 rounded-2xl w-68" 
             value={searchTerm}
             onChange={(e) => setsearchTerm(e.target.value)}
            />
        </div>
    )
}

export default Search;