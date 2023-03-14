import React from 'react'
import { Link } from 'react-router-dom';
import "./SingleMovie.css"

function NewMovie({ movies, setdetailPageMovie, selectedMovie }) {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
    // const [selectedMovie, setSelectedMovie] = React.useState()

    const clickMovie = (movie) => {
        setdetailPageMovie(movie);
    }

    return (
        <div className='NewMovie_container'>
            {movies.map((movie) => {
                const { backdrop_path, poster_path, id, original_language,
                    title, overview, popularity, release_date,
                    vote_average, vote_count, adult } = movie;
                return <Link onClick={() => { clickMovie(movie); selectedMovie(movie) }} to="/PageDetail" className='single_movie Link' key={id}>
                    <div className='img_container'><img className='img-fluid' src={IMAGE_PATH + poster_path} alt={title} /></div>
                    <p className='rate'>{vote_average}/ 10</p>
                    <p className='title'>{title}</p>
                    <p>Language : {original_language}</p>
                    <p>release : {release_date}</p>
                </Link>

            })}
        </div>
    )
}

export default NewMovie






