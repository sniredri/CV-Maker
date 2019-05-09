import React from "react";
import '../CSS/radio.css'
const Radio = (props) => {
    return (
        <div>
            <span>
                <input className="radioBox"
                    type="radio"
                    name={props.name}
                    value={props.target}
                    checked={props.checked===props.target}
                    onClick={props.click}
                />
                <span className="radioTitleBox">{props.target}</span>
            </span>
        </div>
    );
}
export default Radio;