import React, { useState, useEffect } from "react";
import { getUserRepos } from "../../services/githubAPI";
import Loader from "../Loader";

const RepoList = ({ username, repos, setRepos }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposLoaded, setReposLoaded] = useState(repos.length > 0);

  const reposPerPage = 5;

  useEffect(() => {
    if (repos.length > 0) setReposLoaded(true);
  }, [repos]);


  const fetchRepos = async () => {
    if (repos && repos.length) return;

    setLoading(true);
    try {
      const res = await getUserRepos(username);
      setRepos(res.data);
      setReposLoaded(true);

    } catch (err) {
      console.error("Failed to fetch repos", err);
      alert("Could not load repositories (API limit?).");
    } finally {
      setLoading(false);
    }
  };

  // Pagination calculations
  const indexOfLast = currentPage * reposPerPage;
  const indexOfFirst = indexOfLast - reposPerPage;
  const currentRepos = reposLoaded ? repos.slice(indexOfFirst, indexOfLast) : [];

  const totalPages = Math.ceil(repos.length / reposPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="repo-list-container">
      <div className={`repo-list-blur ${!reposLoaded ? "blurred" : ""}`}>
        {currentRepos.length > 0 &&
          currentRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="repo-card"
            >
              <div className="repo-header">
                <h4>{repo.name}</h4>
                {repo.language && <span className="repo-language">{repo.language}</span>}
              </div>

              {repo.description && <p className="repo-description">{repo.description}</p>}

              <div className="repo-stats">
                ⭐ {repo.stargazers_count} · 🍴 {repo.forks_count}
              </div>
            </a>
          ))}
      </div>

      {!reposLoaded && (
        <div className="repo-overlay">
          <div className="repo-card placeholder">
            <p>Repositories are optional. Click below to load.</p>
            <button className="load-btn" onClick={fetchRepos} disabled={loading}>
              {loading ? <Loader /> : "Load Repositories (1 API call)"}
            </button>
          </div>
        </div>
      )}

      {reposLoaded && repos.length > reposPerPage && (
        <div className="pagination">
          <button className="pagination-btn" onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RepoList;
