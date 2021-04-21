import React, {useState, useEffect} from "react"
import Search from "./Search"
import { NavLink } from "react-router-dom"

function SideBar() {
    const [politiciansArray, setPoliticiansArray] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/politicians")
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticiansArray(politicianServerData)
            })
    }, [])

    return (
        <div className="sidebar" id="side-bar-sticky">
            <img src="https://i.imgur.com/mEwNslf.png" style={{ width : 225 }} alt="logo" />
            <Search politiciansArray={politiciansArray}/>
            <nav>
                <NavLink className="sidbar-btn" to="/">Watchlist</NavLink>
                <br/>
                <NavLink className="sidbar-btn" to="/politicians">Politicians</NavLink>
            </nav>
        </div>
    )
}

export default SideBar