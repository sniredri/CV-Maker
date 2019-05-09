import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GridLoader } from 'react-spinners'
import myPhoto from './picture.jpg'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../CSS/cv.css'

var skillsArr

const initState = {
    isLoaded: false
}

export class CV extends Component {
    state = { ...initState }

    componentDidMount() {
        setTimeout(() => { this.setState({ isLoaded: true }) }, 1500)
    }

    render() {
        if (this.props.UserData.checkBox) {
            skillsArr = this.props.UserData.checkBox.Boxes.map(index => {
                if (index.check) return (
                    <CircularProgressbar
                        //className="skillOn"
                        percentage={100}
                        text={index.name}
                        background={true}
                        backgroundPadding={"0"}
                        initialAnimation={true}
                    />
                )
                else return null
            })
        }


        return (
            <div>
                <div style={{ display: this.state.isLoaded ? "none" : "block" }}>
                    <center>
                        <div style={{ height: "7.5vh" }}></div>
                        <div>
                            <p className="loadingTitle"><b>Building your unique CV now, patience!</b></p>
                        </div>
                        <div style={{ padding: "15px" }}></div>
                        <GridLoader
                            sizeUnit={"px"}
                            size={100}
                            color={'#2C5364'}
                            loading={!this.state.isLoaded}
                        />
                    </center>
                </div>

                <div style={{ display: this.state.isLoaded ? "block" : "none" }}>

                    {/* first row - basic information */}
                    <div className="firstRow">
                        <span>
                            <img className="avatar" src={this.props.userPicture} />
                        </span>
                        <span className="basicInfoTitle">
                            <span>{this.props.UserData.user ? this.props.UserData.user.fullName.value : ""}</span>
                            <br />
                            <span style={{ fontSize: "35px" }}>
                                <i className="fas fa-map-marker-alt" /> {(this.props.userLocation.address ?  this.props.userLocation.address.city? this.props.userLocation.address.city+", "+this.props.userLocation.address.country : this.props.userLocation.address : "")}
                            </span>
                            <br />
                            <span style={{ fontSize: "30px" }}> {this.props.UserData.radio ? this.props.UserData.radio.value : ""}</span>
                        </span>
                    </div>

                    <hr className="firstHr" />

                    {/* Second row - user information */}
                    <div className="secondRow">
                        <div>
                            <div className=""><h2>Work skills:</h2></div>
                            <div className="skills">
                                {skillsArr}
                            </div>
                        </div>
                    </div>

                    <hr className="defaultHr" />

                    {/* Third row - contact information */}
                    <div className="thirdRow">
                        <span className=""><h2>Contact information:</h2></span>
                    </div>
                    <div className="defaultFont">
                        <div><i class="fas fa-envelope"></i> Email: {this.props.UserData.user ? this.props.UserData.user.email.value : ""}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    UserData: state.FormData.UserData,
    formIsLoaded: state.FormData.isLoaded,
    userPicture: state.UploadPic.image,
    userLocation: state.location,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CV)
