import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../CSS/Intro.css"

export class Intro extends Component {


    render() {
        return (
            <div>
                <div className="introContainer">
                    <div className="introTitle">
                        <b><u>Welcome to CV maker</u></b>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
