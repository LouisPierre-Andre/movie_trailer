import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar({ setsearchKey, fetchMovies }) {
    const [responsive_input, setresponsive_input] = React.useState(false);



    return (
        <div className={`${responsive_input && "navbar_container active"} navbar_container`}>
            <div className='left_part'>
                <div className='logo_container'>
                    <Link style={{ textDecoration: "none" }} to="/"><h3 className='logo Link'>TRAILER</h3></Link>
                </div>
                <div className='link_container'>
                    <Link className='Link' to="/"><p>Home</p></Link>
                    <p>Tv Show</p>
                    <p>Movies</p>
                    <p>Recent</p>
                    <p>My list</p>
                </div>
            </div>
            <div className='middle_input_section'>
                <form className="form" onSubmit={fetchMovies}>
                    <input onClick={() => { setresponsive_input(true) }} className="search" placeholder='Search...' type="text" id="search"
                        onInput={(event) => setsearchKey(event.target.value)} />
                    <button onClick={() => { setresponsive_input(false) }} className="submit-search" type="submit"> <i class="bi bi-search"></i></button>
                </form>
            </div>
            <div className='right_part'>
                {/* <i class="bi bi-search"></i> */}
                <i class="bi bi-bell-fill"></i>
                <button>Sing In</button>
            </div>
        </div>
    )
}

export default Navbar