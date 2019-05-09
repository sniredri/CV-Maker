import React, { Component } from 'react'
import * as actionPage from '../Store/action/PagePosAction'
import * as actionForm from '../Store/action/CvFormAction'
import "../CSS/Buttons.css"
import '../CSS/Maps.css'
import '../CSS/cv.css'
import Intro from "./Intro"
import Form from "./Form"
import { connect } from 'react-redux'
import "../CSS/landingPage.css"
import UploadPic from "./uploadPic"
import Maps from './Maps'
import CVmaker from './CV'
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Steps, { Step } from 'rc-steps';
const maxPages = 5;
export class landingPage extends Component {

    onClickHandler = (event) => {
        if (event.target.name === "next") {
            this.props.nextPage();
        }
        else if (event.target.name === "prev") {
            if (this.props.CurrentPage <= 0) {
                this.props.makePageIndexZero();
            } else {
                this.props.prevPage();
            }
        }
        else {
            console.log("Fuck");
        }
    }
    onDisableHandler = () => {
        if (!this.props.formIsLoaded && this.props.CurrentPage === 1) {
            return true;
        }
        else if (!this.props.picIsLoaded && this.props.CurrentPage === 2) {
            return true;
        }
        else if(!this.props.isTouched && this.props.CurrentPage === 3){
            return true;
        }
        else {
            return false;
        }
    }
    render() {
        var CurrentPageData;
        if (this.props.CurrentPage === 0) {
            CurrentPageData = <div><Intro /></div>
        }
        else if (this.props.CurrentPage === 1) {
            CurrentPageData = <div className="FormContainer"><Form /></div>
        }
        else if (this.props.CurrentPage === 2) {
            CurrentPageData = <div className="uploadPicContainer"><UploadPic /></div>
        }
        else if (this.props.CurrentPage === 3) {
            CurrentPageData = <div className="mapContainer"><Maps /></div>
        }
        else if (this.props.CurrentPage === 4) {
            CurrentPageData = <div className="cvContainer"><CVmaker /></div>
        }
        else {
            CurrentPageData = <div>KAKI</div>
        }
        return (
            <div>
                <div className={this.props.CurrentPage === 4? "currentPageCV" : "currentPageNotCV"}>
                    <Steps current={this.props.CurrentPage} style={{ marginTop: "20px" }}>
                        <Step title="Intro" />
                        <Step title="Form" />
                        <Step title="UploadPic" />
                        <Step title="Location" />
                    </Steps>
                </div>
                <div style={{ marginTop: "20px" }} />
                <div className="dataStyle">
                    <span style={{ width: "20%" }}>
                        <center style={{ marginTop: "80%" }} >
                            <button style={{ display: this.props.CurrentPage === 0 ? "none" : "block" }} className="buttonPrev" name="prev" onClick={(event) => this.onClickHandler(event)}> Prev </button>
                        </center>
                    </span>
                    <span style={{ width: "60%" }}>{CurrentPageData}</span>
                    <span style={{ width: "20%" }}>
                        <center style={{ marginTop: "80%" }} >
                            <button disabled={this.onDisableHandler()} style={{ display: this.props.CurrentPage >= maxPages ? "none" : "block" }} className="buttonNext" name="next" onClick={(event) => this.onClickHandler(event)}>Next</button>
                        </center>
                    </span>
                </div>
                <div style={{ padding: "15px" }}></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        CurrentPage: state.CurrentPage.CurrentPage,
        formIsLoaded: state.FormData.isLoaded,
        picIsLoaded: state.UploadPic.image,
        locationIsLoaded: state.location.address,
        isTouched: state.location.locSaved
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nextPage: () => dispatch(actionPage.nextPage()),
        prevPage: () => dispatch(actionPage.prevPage()),
        makePageIndexZero: () => dispatch(actionPage.makePageIndexZero()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingPage)
