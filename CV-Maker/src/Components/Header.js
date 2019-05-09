import React, { Component } from 'react'
import "../CSS/Header.css"

export class Header extends Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="headerBackground">
                    <div className="headerTitle"><span>HEADER</span></div>
                </div>
            </div>
        )
    }
}

export default Header
