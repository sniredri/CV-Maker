import React from "react";
import "../CSS/input.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Input = React.forwardRef((props, ref) => (

    <div>
        <p className="formSubject"><b></b>{props.name}:</p>
        <br />
        <input className="inputField"
            type={props.type}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.change}
            style={{ border: props.errMsg ? "solid red 4px" : "solid gray 2px" }}
        />
        {props.errMsg ? <p className="blink"><FontAwesomeIcon icon="times" />    {props.errMsg}   <FontAwesomeIcon icon="times" /></p> : null}

    </div>
))

export default Input;