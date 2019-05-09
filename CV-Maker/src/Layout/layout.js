import React, { Component } from 'react'
import "../CSS/Layout.css"
import Footer from "../Components/Footer"
import Header from "../Components/Header"


export class layout extends Component {
  render() {
    return (
      <div className="backgroundLayout">
        <div><Header /></div>
        <main className="posMain">{this.props.children}</main>
        <div className="footerPos"><Footer /></div>
      </div>
    )
  }
}

export default layout