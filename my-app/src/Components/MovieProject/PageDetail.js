import React from 'react'
import "./PageDetail.css"
import Youtube from 'react-youtube'
import YouTube from 'react-youtube';


function PageDetail({ movie, movies, setdetailPageMovie, trailer, selectedMovie }) {

    const [showTrailer, setShowTrailer] = React.useState(false)
    const [count, setCount] = React.useState(0)
    console.log(count)


    const { backdrop_path, poster_path, id, original_language,
        title, overview, popularity, release_date,
        vote_average, vote_count, adult } = movie;

    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

    const clickMovie = (movie) => {
        setdetailPageMovie(movie)
    }

    const slideRight = () => {

        if (count < 200) {
            setCount(count + 15)
        } else if (count >= 210) {
            setCount(210)
        }
        console.log("right click")
        console.log(count)
    }

    const slideLeft = () => {
        if (count > 0) {
            setCount(count - 15)
        } else if (count <= 0) {
            setCount(0)
        }
        console.log("left click")
        console.log(count)
    }



    return (
        <div
            className='PageDetail_container'
            style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${!showTrailer && BACKDROP_PATH}${backdrop_path})` }} >

            <div className='video_trailer_container'>
                {showTrailer && <div> <YouTube
                    videoId={trailer?.key}
                    className={"youtube"}
                    opts={
                        {
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 1,
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
                    <button className='close_trailer' onClick={() => setShowTrailer(false)}>X</button>
                </div>}


                <div className='containt_container'>
                    <h1>{title} </h1>
                    <p>{overview} </p>
                    <div>
                        {!showTrailer ? <button onClick={() => setShowTrailer(true)} className='play_button'><i class="bi bi-play-fill"></i> PLay</button> :
                            showTrailer && <button onClick={() => setShowTrailer(false)} className='close_trailer_pc'><i class="bi bi-x-lg"></i></button>}
                    </div>
                </div>
            </div>



            <div className='movies_suggestion_container1'>
                <button class="bi bi-chevron-left left" onClick={() => { slideLeft() }}></button>
                <button className='bi bi-chevron-right right' onClick={() => { slideRight() }}></button>

                <div style={{ transform: `translateX(-${count}rem)` }} className='movies_suggestion_container'>
                    {movies?.map((movie) => {
                        const { backdrop_path, poster_path, id, original_language,
                            title, overview, popularity, release_date,
                            vote_average, vote_count, adult } = movie;
                        return <div onClick={() => { clickMovie(movie); selectedMovie(movie); setShowTrailer(false) }} className='single_suggestion'>
                            <img src={`${IMAGE_PATH}${poster_path}`} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default PageDetail