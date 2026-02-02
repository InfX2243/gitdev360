import React from "react";

const RepoList = ({ repos }) => {
    return (
        <div className="repo-list">
            <h3>Repositories</h3>
            {repos.map((repo) => (
                <div className="repo-item" key={repo.id}>
                    <a href={repo.html_url} target="_blank">{repo.name}</a>
                    {repo.description && <p>{repo.description}</p>}
                    <p>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count} | 📝 {repo.language}</p>
                </div>
            ))}
        </div>
    );
};

export default RepoList;