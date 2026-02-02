import React from "react";

const Error = ({ message }) => {
    return (
        <div className="error-message">
            <p>{message}</p>
        </div>
    );
};

export default Error;