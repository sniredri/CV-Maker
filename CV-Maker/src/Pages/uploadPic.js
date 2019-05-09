import React, { Component } from 'react'
import * as actionUploadPic from '../Store/action/UploadPicAction'
import { connect } from 'react-redux'
import axios from 'axios'
import '../CSS/uploadPic.css'
import { ClipLoader } from 'react-spinners'
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/snir/upload";
const CLOUDINARY_UPLOAD_PRESET = "inx30zpi";

const initState = {
    image: null,
    file: null,
    valid: false,
    error: false,
    imageLoaded:false,
}

export class uploadPic extends Component {
    state = { ...initState }

    componentDidMount() {
        if (this.props.picState.image) {
            this.setState(this.props.picState)
        }
    }

    componentWillUnmount() {
        this.props.savePicData(this.state)
    }

    dropHandler = (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        let file = event.dataTransfer.items[0].getAsFile();
        console.log(file)
        if (file) {
            if (file.type.includes("image")) {
                this.setState({ file: file, image: file.name }, () => {
                    var fromData = new FormData()
                    fromData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                    fromData.append("file", this.state.file)
                    axios({
                        url: CLOUDINARY_URL,
                        method: "post",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: fromData
                    }).then(res => {
                        this.setState({ image: res.data.url }, () => {
                            this.setState({ valid: true }, () => {
                                setTimeout(() => { this.setState({imageLoaded: true}, ()=>{
                                    this.props.savePicData(this.state)
                                }) }, 1250)
                            })
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                })
            }
            else {
                this.setState({ error: true }, () => {
                    setTimeout(() => { this.setState(initState) }, 1500)
                })
            }
        }
        else {
            console.log("err")
        }
    }

    dragOverHandler = (event) => {
        event.preventDefault();
    }

    onClickHandler = () => {
        this.setState(initState, () => {
            this.props.savePicData(this.state)
        })
    }

    render() {
        return (
            <div>
                <center>
                    <div style={{ display: this.state.valid ? "none" : "block" }}>
                        <p>Drag one picture to this zone to use it as a profile picture in the CV</p>
                        <div style={{ padding: "1%" }}></div>
                        <input readOnly className={this.state.error ? "drop_zone inputError" : "drop_zone"} onDrop={this.dropHandler} onDragOver={this.dragOverHandler} />
                        <div style={{ padding: "1%" }}></div>

                        <p className="errorText" style={{ display: this.state.error ? "block" : "none" }}><i className="fas fa-exclamation-triangle"></i> Invalid image type! <i className="fas fa-exclamation-triangle"></i></p>
                    </div>

                    <div style={{ display: this.state.valid ? "block" : "none" }}>
                        <p>Preview of the selected image:</p>
                        <div style={{ padding: "2%" }}></div>
                        <div>
                            <img 
                            className="pictureStyle" 
                            style={{ height: "35%", width: "35%", border: "2px solid black", display: this.state.imageLoaded? "block" : "none" }} 
                            src={this.state.image} 
                            />
                            <ClipLoader
                                sizeUnit={"px"}
                                size={350}
                                color={'black'}
                                loading={!this.state.imageLoaded}
                            />
                        </div>
                        <div style={{ padding: "2%" }}></div>
                        <span>Not happy with this picture as a profile picture?  </span>
                        <span className="changeBtn" onClick={() => { this.onClickHandler() }}><u> Click Here!</u></span>
                        <div style={{ padding: "2%" }}></div>
                    </div>
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isNotTouched: state.UploadPic.isNotTouched,
        picState: state.UploadPic
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savePicData: (data) => dispatch(actionUploadPic.savePicData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(uploadPic)
