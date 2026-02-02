import React from "react";

const LanguageChart = ({ languages }) => {
    // languages is an object 
    const data = Object.entries(languages).map(([lang, bytes]) => ({
        name: lang,
        value: bytes,
    }));

    return (
        <div className="language-chart">
            <h3>Top Languages</h3>
            <ul>
                {data.map((lang) => (
                    <li key={lang.name}>{lang.name}: {lang.value}</li>
                ))}
            </ul>
            {/* Later replace with a proper chart using ChartJS */}
        </div>
    );
};

export default LanguageChart;