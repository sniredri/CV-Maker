import React from "react";
import "../CSS/checkBox.css"
const checkBox = React.forwardRef((props, ref) => (

    <div>
        <span>
            <input className="checkBox"
                type={props.type}
                value={props.value}
                name={props.name}
                checked={props.checked}
                onClick={props.click}
            />
        </span>
        <span className="titleBox">{props.name}</span>
    </div>
))

export default checkBox;