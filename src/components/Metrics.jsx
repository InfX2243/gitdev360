import React from "react";

const Metrics = ({ repos, languages }) => {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    return (
        <div className="metrics">
            <p>Total Stars: {totalStars}</p>
            <p>Total Forks: {totalForks}</p>
            <p>Total Repos: {repos.length}</p>
            <p>Top Languages: {Object.keys(languages).slice(0, 3).join(', ')}</p>
        </div>
    );
};

export default Metrics;