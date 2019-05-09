import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionForm from '../Store/action/CvFormAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Input from '../Components/Input'
import CheckBox from '../Components/checkBox'
import Radio from '../Components/radio'
import '../CSS/Form.css'

library.add(faTimes)

const initState = {
    user: {
        fullName: {
            value: "",
            placeholder: "  Enter your full name",
            name: "Full Name",
            label: "fullName",
            type: "text",
            errMsg: ""
        },
        email: {
            value: "",
            placeholder: "  Enter your email",
            name: "email",
            label: "email",
            type: "email",
            errMsg: ""
        },
    },
    checkBox: {
        errMsg: "",
        Boxes: [
            {
                value: "optA",
                name: "ReactJS",
                type: "checkbox",
                check: false
            },
            {
                value: "optB",
                name: "PHP",
                type: "checkbox",
                check: false
            },
            {
                value: "optC",
                name: "Angular",
                type: "checkbox",
                check: false
            },
            {
                value: "optD",
                name: "jQuery",
                type: "checkbox",
                check: false
            },
            {
                value: "optE",
                name: "vueJS",
                type: "checkbox",
                check: false
            }
        ]
    },
    radio: {
        value: "",
        checked: false,
        gender: {
            type: "radio",
            errMsg: "",
            name: "gender",
            target: ["Male", "Female", "Alexa", "Queer"]
        }
    },
    textArea: {
        value: "",
        errMsg: "",
    }
}

export class Form extends Component {
    state = { ...initState }

    resetFields = () => {
        this.setState(initState)
    }

    componentWillUnmount() {
        this.props.saveCvData(this.state)
    }

    componentDidMount() {
        if (this.props.isLoaded) {
            this.setState(this.props.UserData)
        }
    }

    inputManager = (value, name, type) => {
        if (type === "checkbox") {
            this.onCheckBoxHandler(value)
        }
        else if (type === "text" || type === "email") {
            this.onChangeHandler(value, name);
        }
        else if (type === "radio") {
            this.onRadioHandler(value);
        }
        else if (type === "textArea") {
            this.onTextAreaHandler(value)
        }
        else {
            console.log("ERROR TYPE NOT FOUND")
        }
    }

    onTextAreaHandler = (textValue) => {
        this.setState({ textArea: { value: textValue, errMsg: "" } }, () => {
            this.onCheckTextArea()
            this.onCheckHandler();
        })

    }

    onRadioHandler = (value) => {
        let copyState = JSON.parse(JSON.stringify(this.state.radio));
        copyState.value = value
        this.setState({ radio: copyState }, () => {
            this.onCheckRadio()
            this.onCheckHandler();
        })


    }

    onCheckBoxHandler = (value) => {
        let copyState = JSON.parse(JSON.stringify(this.state.checkBox));
        copyState.Boxes.forEach(index => {
            if (index.value === value) {
                index.check = !index.check;
            }
        });
        this.setState({ checkBox: copyState }, () => {
            this.onCheckCheckBox()
            this.onCheckHandler();
        })

    }

    onChangeHandler = (value, name) => {
        let copyState = JSON.parse(JSON.stringify(this.state.user));
        if (name === "fullName") {
            copyState.fullName.value = value;
        }
        else if (name === "email") {
            copyState.email.value = value;
        }
        this.setState({ user: copyState }, () => {
            this.onCheckInputs()
            this.onCheckHandler();
        })
    }


    onCheckHandler = () => {

        if (!this.onCheckTextArea()) {
            console.log("onCheckTextArea")
            this.formBox.scroll(0, this.textArea.offsetTop - 35)
            this.props.isLoadedToggle(false);
        }
        else if (!this.onCheckRadio()) {
            this.formBox.scroll(0, this.radios.offsetTop - 35)
            this.props.isLoadedToggle(false);
            console.log("onCheckRadio")
        }

        else if (!this.onCheckCheckBox()) {
            this.formBox.scroll(0, this.checkBoxes.offsetTop - 35)
            this.props.isLoadedToggle(false);
            console.log("onCheckCheckBox")
        }

        else if (!this.onCheckInputs()) {
            this.formBox.scroll(0, this.basicInfo.offsetTop - 30)
            this.props.isLoadedToggle(false);
            console.log("onCheckInputs")
        } else {
            this.props.isLoadedToggle(true);
            console.log("OK!")
        }
    }

    onCheckTextArea = () => {
        let copyState = JSON.parse(JSON.stringify(this.state.textArea));
        let isTrue = true;
        if (copyState.value === "") {
            copyState.errMsg = "Please write about yourself a few words"
            isTrue = false;
        } else {
            copyState.errMsg = ""
        }
        this.setState({ textArea: copyState })
        return isTrue;
    }

    onCheckRadio = () => {
        let copyState = JSON.parse(JSON.stringify(this.state.radio));
        let isTrue = true;
        if (copyState.value === "") {
            copyState.gender.errMsg = "Please choose your gender"
            isTrue = false;
        }
        else {
            copyState.gender.errMsg = "";
        }
        this.setState({ radio: copyState })
        return isTrue;
    }

    onCheckCheckBox = () => {
        let copyState = JSON.parse(JSON.stringify(this.state.checkBox));
        let isTrue = true;
        let checkCounter = 0;
        copyState.Boxes.forEach(index => {
            if (index.check === true) {
                checkCounter++
            }
        });
        if (checkCounter < 2) {
            copyState.errMsg = "Please choose boxes (at least 2)";
            isTrue = false;
        }
        else if (checkCounter >= 2) {
            copyState.errMsg = ""
            isTrue = true;
        }
        this.setState({ checkBox: copyState })
        return isTrue;
    }

    onCheckInputs = () => {
        let isTrue = true;
        let copyState = JSON.parse(JSON.stringify(this.state.user));

        if (!this.state.user.fullName.value.includes(" ") && this.state.user.fullName.value) {
            copyState.fullName.errMsg = "enter your full name"
            isTrue = false;
        }
        else if (!this.state.user.fullName.value) {
            copyState.fullName.errMsg = "Please enter your full name"
            isTrue = false;
        } else {
            copyState.fullName.errMsg = ""
            isTrue = true;
        }
        if (!(this.state.user.email.value.includes("@") && this.state.user.email.value.includes(".")) && this.state.user.email.value) {
            copyState.email.errMsg = "invalid email adress"
            isTrue = false;
        }
        else if (!this.state.user.email.value) {
            copyState.email.errMsg = "Please enter your email"
            isTrue = false;
        } else {
            copyState.email.errMsg = ""
            isTrue = true;
        }
        this.setState({ user: copyState })
        return isTrue;
    }

    render() {

        let inputArr = []
        for (let key in this.state.user) {
            inputArr.push({
                key: this.state.user[key].name,
                value: this.state.user[key].value,
                type: this.state.user[key].type,
                placeholder: this.state.user[key].placeholder,
                name: this.state.user[key].name,
                errMsg: this.state.user[key].errMsg,
                label: this.state.user[key].label
            })
        }

        let myInput = inputArr.map(index => {
            return (
                <div key={index.name}>
                    <Input
                        ref={index.label}
                        name={index.name}
                        type={index.type}
                        value={index.value}
                        placeholder={index.placeholder}
                        errMsg={index.errMsg}
                        label={index.label}
                        change={(event) => { this.inputManager(event.target.value, index.label, index.type) }}
                    />
                    <br />
                </div>
            )
        })

        let checkBoxes = this.state.checkBox.Boxes.map(index => {
            return (
                <CheckBox
                    key={index.name}
                    name={index.name}
                    type={index.type}
                    value={index.value}
                    checked={index.check}
                    click={(event) => { this.inputManager(event.target.value, index.name, index.type) }}
                />
            )
        })

        let genderObj = [];
        for (let key in this.state.radio.gender.target) {
            genderObj.push({
                target: this.state.radio.gender.target[key],
                name: this.state.radio.gender.name,
                type: this.state.radio.gender.type,
                checked: this.state.radio.value,
            });
        }

        let genderArr = genderObj.map(index => {
            return (
                <Radio
                    type={index.type}
                    target={index.target}
                    key={index.target}
                    name={index.name}
                    value={index.target}
                    checked={index.checked}
                    click={(event) => this.inputManager(index.target, index.name, index.type)}
                />
            );
        });
        return (
            <div>
                <div style={{ padding: "15px" }}></div>

                <center>
                    {/*form*/}
                    <div className="App" ref={x => this.formBox = x}>
                        <div style={{ padding: "15px" }}>
                            <button className="resetBtn" onClick={() => { this.resetFields() }}>Reset</button>
                        </div>

                        <p className="formTitle"><u>Please fill this form</u></p>
                        <form style={{ margin: "10px" }}>

                            {/*Input fields*/}
                            <div ref={x => this.basicInfo = x}>
                                {myInput}
                            </div>

                            {/*CheckBoxes*/}
                            <div ref={x => this.checkBoxes = x} >
                                <p className="formSubject">Please choose boxes (at least 2):</p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    {checkBoxes}
                                </div>
                                {this.state.checkBox.errMsg ? <p className="blink"><FontAwesomeIcon icon="times" />    {this.state.checkBox.errMsg}   <FontAwesomeIcon icon="times" /></p> : null}
                            </div>

                            <div style={{ padding: "15px" }}></div>

                            {/*Radio*/}
                            <div ref={x => this.radios = x}>
                                <p className="formSubject">Please choose your gender:</p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    {genderArr}
                                </div>
                                {this.state.radio.gender.errMsg ? <p className="blink"><FontAwesomeIcon icon="times" />    {this.state.radio.gender.errMsg}   <FontAwesomeIcon icon="times" /></p> : null}
                            </div>

                            <div style={{ padding: "15px" }}></div>

                            {/*TextArea*/}
                            <div ref={x => this.textArea = x}>
                                <p className="formSubject">Please write about yourself a few words:</p>
                                <textarea value={this.state.textArea.value} ref={x => this.textArea2 = x} placeholder="123Aa..." onChange={(event) => this.inputManager(event.target.value, event.target.name, "textArea")}></textarea>
                                {this.state.textArea.errMsg ? <p className="blink"><FontAwesomeIcon icon="times" />    {this.state.textArea.errMsg}   <FontAwesomeIcon icon="times" /></p> : null}

                            </div>
                        </form>
                    </div>

                </center>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        UserData: state.FormData.UserData,
        isLoaded: state.FormData.isLoaded,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCvData: (data) => dispatch(actionForm.saveCvData(data)),
        isLoadedToggle: (boolean) => dispatch(actionForm.isLoadedToggle(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form)
