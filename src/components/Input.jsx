import React from 'react';

function Input(props) {
    return (
        <div className="input-container">
            <label className="input-label">{props.labelText}
                <input className={props.class} type={props.inputType} value={props.inputValue} onChange={props.onChangeFunc}></input>
            </label>
        </div>
    );
}

export default Input;