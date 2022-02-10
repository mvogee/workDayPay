import "./css/Display.css";
import React from 'react';

function Display(props) {
    return (
        <div id={props.displayId} className="display-container">
            <label className="display-label">{props.labelText}
                <h2 className="display-area">{props.displayText}</h2>
            </label>
        </div>
    );
}

export default Display;