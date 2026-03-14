import React from "react";

const TopRepos = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  // Sort by stars, then recent update
  const topRepos = [...repos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 3);

  return (
    <div className="top-repos">
      <div className="top-repos-grid">
        {topRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="top-repo-card"
          >
            <div className="top-repo-header">
              <h4>{repo.name}</h4>
              <span className="badge">⭐ Top Project</span>
            </div>

            {repo.description && (
              <p className="description">{repo.description}</p>
            )}

            <div className="top-repo-meta">
              {repo.language && <span>{repo.language}</span>}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopRepos;
