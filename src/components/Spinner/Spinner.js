import React from "react";
import spinner from "../../assets/images/spinner.gif"
function Spinner() {
    return (
        <div className="container">
            <img className="loading mx-auto d-block" src={spinner} alt=""/>
        </div>
    )
}
export default Spinner;