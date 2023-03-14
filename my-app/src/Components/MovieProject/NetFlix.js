import axios from 'axios';
import React from 'react'
import Navbar from './Navbar';
import NewMovie from './NewMovie';
import { Routes, Route } from "react-router-dom"
import PageDetail from './PageDetail';

function NetFlix() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "fa99fa272803ba0750b3bcbcd427e77d"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"


    const [movies, setMovies] = React.useState([]);
    const [detailPageMovie, setdetailPageMovie] = React.useState({});
    const [trailer, setTrailer] = React.useState(null)
    const [searchKey, setsearchKey] = React.useState('')




    React.useEffect(() => {
        FetchMovies()
    }, [])

    const FetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }
        const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
            }
        })
        setMovies(data.results)
        setdetailPageMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

        // this funtion is use to fetch video trailer
        const fetchMovie = async (id) => {
            const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    append_to_response: "videos"
                }
            })
    
            if (data.videos && data.videos.results) {
                const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
                setTrailer(trailer ? trailer : data.videos.results[0])
            }

            console.log("data",data)
    
            setdetailPageMovie(data)
        }
        // console.log(trailer)
    
    const selectedMovie = (movie) => {
        fetchMovie(movie.id)
       }




    return (
        <div>
            <Navbar setsearchKey={setsearchKey} fetchMovies={ FetchMovies} />
            <Routes >
                <Route exact path='/' element={<NewMovie selectedMovie={selectedMovie}  movies={movies}  setdetailPageMovie= {setdetailPageMovie} />} />
                <Route path='/PageDetail' element={<PageDetail selectedMovie={selectedMovie} movie={detailPageMovie} movies={movies} setdetailPageMovie= {setdetailPageMovie} trailer={trailer} />}  />
            </Routes>



        </div>
    )
}

export default NetFlix;