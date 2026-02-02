import React from "react";
import logosvg from '../assets/react.svg';

const Logo = () => {
    return (
        <div className="logo">
            <img src={logosvg} alt="GitDev360 Logo" />
        </div>
    );
};

export default Logo;