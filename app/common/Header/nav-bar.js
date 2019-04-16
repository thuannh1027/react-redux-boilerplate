import React from "react"
import { Link } from 'react-router-dom'

import RouteMap from "../../app.routes"

class NavBar extends React.Component {
    constructor(props) {
        super(props)

        this._curLocation = this.getCurrentPagePath(window.location.href);
    }

    getCurrentPagePath(href) {
        if (!href) return "/"
        const breakArr = href.split("/")
        if (breakArr.length > 3) return `/${breakArr[3].toLowerCase()}`
        return "/"
    }

    shouldComponentUpdate() {
        const currentPath = this.getCurrentPagePath(window.location.href)
        if (this._curLocation === currentPath) return false;
        this._curLocation = currentPath
        return true
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                <div className="container">
                    <a className="navbar-brand" href="#">React.js x Bootstrap</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            {RouteMap && RouteMap.map((route, index) => <Link key={index} className={`nav-link ${this._curLocation === route.path ? "active" : ""}`} to={route.path}>{route.title || "Unknown"}</Link>)}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar