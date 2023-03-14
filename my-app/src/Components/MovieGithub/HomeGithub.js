import { useEffect, useState } from "react"
import './HomeGithub.css'
import axios from 'axios'
import Movie from "./Movie.js"
import Youtube from 'react-youtube'

function HomeGithub() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "fa99fa272803ba0750b3bcbcd427e77d"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({ title: "Loading Movies" })




    useEffect(() => {
        fetchMovies()
    }, [])

     
    //   This function is use to fetch movie info
    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        // console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

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

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    return (
        <div className="App">
            <header className="center-max-size header">
                <span className={"brand"}>Movie Trailer App</span>
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" type="text" id="search"
                        onInput={(event) => setSearchKey(event.target.value)} />
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </header>
            {movies.length ?
                <main>
                    {movie ?
                        <div className="poster"
                            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube amru"}
                                        containerClassName={"youtube-container amru"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => setPlaying(false)} className={"button close-video"}>Close
                                    </button>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                        {trailer ?
                                            <button className={"button play-video"} onClick={() => setPlaying(true)}
                                                type="button">Play
                                                Trailer</button>
                                            : 'Sorry, no trailer available'}
                                        <h1 className="hero_text">{movie.title}</h1>
                                        <p className="hero_text">{movie.overview}</p>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className={"center-max-size container"}>
                        {renderMovies()}
                    </div>
                </main>
                : 'Sorry, no movies found'}
        </div>
    );
}

export default HomeGithub;






































// import './App.css';
// import React from 'react';
// import axios from "axios"
// import YouTube from "react-youtube"

// function App() {
//   React.useEffect(() => {
//     fetchMovie()
//     fetchMovie2()
//   })


//   const fetchMovie = async () => {
//     const options = {
//       method: 'GET',
//       url: 'https://api.themoviedb.org/3/discover/movie?api_key=fa99fa272803ba0750b3bcbcd427e77d',
//     };

//     const dataPage = await axios.request(options).then(function (response) {
//       console.log(response.data.results);
//     }).catch(function (error) {
//       console.error(error);
//     });

//     console.log("11111111111", dataPage)
//   }

//   const fetchMovie2 = async () => {
//     const options = {
//       method: 'GET',
//       url: 'https://api.themoviedb.org/3/discover/movie?api_key=fa99fa272803ba0750b3bcbcd427e77d&append_to_respons=videos',
//     };

//     const dataPage = await axios.request(options).then(function (response) {
//       console.log(response.data.results);
//     }).catch(function (error) {
//       console.error(error);
//     });

//     console.log("222222222222", dataPage)
//   }










//   return (
//     <div className="App">
//       <h1>Welcome to a new project</h1>
//       <YouTube />
//     </div>
//   );
// }

// export default App;
