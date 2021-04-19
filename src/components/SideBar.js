import Search from "./Search"
import { NavLink } from "react-router-dom"

function SideBar() {
    return (
        <div className="sidebar">
            <h1>App Name</h1>
            <Search />
            <nav>
                <NavLink className="sidbar-btn" to="/">Watchlist</NavLink>
                <br/>
                <NavLink className="sidbar-btn" to="/politicians">Politicians</NavLink>
            </nav>
        </div>
    )
}

export default SideBar