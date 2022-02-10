import "./css/PayTimer.css";
import {React, useState, useRef} from 'react';
import Input from "./Input.jsx";
import Display from "./Display";


function timerDisplayReadout(seconds) {
    let readout = "";
    let days, hours, minutes;
    days = Math.floor(seconds / 86400);
    seconds %= 86400;
    hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    minutes = Math.floor(seconds / 60);
    seconds %= 60;
    readout += days > 0 ? days + ":" : "";
    readout += hours > 9 ? hours + ":" : "0" + hours + ":";
    readout += minutes > 9 ? minutes + ":" : "0" + minutes + ":";
    readout += seconds > 9 ? seconds : "0" + seconds;
    return readout;
    }

function PayTimer() {
    const started = useRef(false);
    const earningsPerSecond = useRef(0);
    const intervalId = useRef(null);
    const [hourlyRate, updateHrlyRate] = useState(0);
    const [timer, setTimer] = useState("00:00:00");
    const [earnings, setEarnings] = useState((0).toFixed(2));
    const [btnText, setBtnText] = useState('"Clock In"');

    let startTime = Date.now();

    function hrlyUpdate(e) {
        updateHrlyRate(e.target.value);
    }

    function tick() {
        let delta = Math.floor((Date.now() - startTime) / 1000);

        setTimer(timerDisplayReadout(delta));
      setEarnings((delta * earningsPerSecond.current).toFixed(2));
    }

    function btnClick() {
        if (!started.current) {
            started.current = true;
            earningsPerSecond.current = hourlyRate / 3600;
            startTime = Date.now();
            intervalId.current = setInterval(tick, 1000);
            console.log("starting", earningsPerSecond.current);
            setBtnText('"Clock Out"');
        }
        else {
            console.log("stopping");
            started.current = false;
            clearInterval(intervalId.current);
            intervalId.current = null;
            setBtnText('"Clock In"');
        }
    }

    function resetBtn() {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
        setTimer("00:00:00");
        setEarnings(0);
        updateHrlyRate(0);
        started.current = false;
    }
    
    return (
        <div className="pay-timer">
            <p>Enter your hourly rate.</p>
            <Input labelText="$/hr" class="hrInput" inputType="number" onChangeFunc={hrlyUpdate} inputValue={hourlyRate}/>
            <button className="startStopBtn" onClick={btnClick}>{btnText}</button>
            <Display displayId="timeDisplay" displayText={timer}/>
            <Display displayId="earningsDisplay" displayText={"$" + earnings}/>
            <button className="resetBtn" onClick={resetBtn}>reset</button>
        </div>
    );
}

export default PayTimer;