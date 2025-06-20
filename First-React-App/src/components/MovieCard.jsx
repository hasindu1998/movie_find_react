import React from "react";

const MovieCard = ({movie : {title, vote_average, poster_path, release_date, original_language}}) => {

    return(
        <div className="p-3 rounded-2xl shadow-inner shadow-light-100/10 bg-indigo-950 m-4">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : console.log("No Movie")} alt="{title}" />

            <p className="text-white text-lg mt-3">{title}</p>
            <p className="text-sm">{vote_average.toFixed(1)}
                <span className="">  &#183;</span>
                <span className="text-sm text-gray-500"> {original_language}</span>
                <span className="">   &#183;</span>
                <span className="text-sm"> {release_date.split('-')[0]}</span>
            </p>
        </div>
    )
}

export default MovieCard;