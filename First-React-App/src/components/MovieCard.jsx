import React from "react";

const MovieCard = ({movie : {title, vote_average, poster_path, release_date, original_language}}) => {

    return(
        <div className="p-5 rounded-2xl shadow-inner shadow-light-100/10">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : console.log("No Movie")} alt="" />
            <p className="text-white">{title} <br />
             <span>{release_date}</span></p>
            <p>{vote_average}</p>
        </div>
    )
}

export default MovieCard;