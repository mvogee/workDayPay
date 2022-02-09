import React from 'react';

function Display(props) {
    return (
        <div id={props.displayId} className="display-container">
            <h2 className="display-area">{props.displayText}</h2>
        </div>
    );
}

export default Display;