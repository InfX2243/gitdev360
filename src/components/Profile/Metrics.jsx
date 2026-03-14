import React, { useState } from "react";
import { getUserRepos } from "../../services/githubAPI";
import Loader from "../Loader";

const Metrics = ({ username, repos, setRepos, languages, setLanguages }) => {
  const [loading, setLoading] = useState(false);
  const [metricsLoaded, setMetricsLoaded] = useState(repos.length > 0);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      // Fetch repos
      const res = await getUserRepos(username);
      const fetchedRepos = res.data;
      setRepos(fetchedRepos);

      // Optional: aggregate languages from repos
      const languageData = {};
      fetchedRepos.forEach((repo) => {
        if (repo.language) {
          languageData[repo.language] = (languageData[repo.language] || 0) + 1;
        }
      });
      setLanguages(languageData);

      setMetricsLoaded(true);
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
      alert("Could not load metrics (API limit?).");
    } finally {
      setLoading(false);
    }
  };

  // Compute metrics from fetched repos
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const totalIssues = repos.reduce((sum, r) => sum + r.open_issues_count, 0);

  const repoCount = repos.length;
  const languageCount = Object.keys(languages).length;

  const activityLevel =
    repoCount > 30 ? "Highly Active" :
    repoCount > 10 ? "Moderately Active" :
    "Low Activity";

  const popularity =
    totalStars > 500 ? "Well Known" :
    totalStars > 100 ? "Growing" :
    "Low Visibility";

  const codeHealth =
    totalIssues < 20 ? "Well Maintained" :
    totalIssues < 60 ? "Needs Attention" :
    "High Issue Load";

  return (
    <div className="metrics metrics-wrapper">
      <div className={`metrics-blur ${!metricsLoaded ? "blurred" : ""}`}>
        {/* YOUR ORIGINAL CONTENT — UNCHANGED */}
        <div className="metric-card">
          ⭐
          <strong>{totalStars}</strong>
          <span>Stars</span>
          <p className="metric-insight">{popularity}</p>
        </div>

        <div className="metric-card">
          🍴
          <strong>{totalForks}</strong>
          <span>Forks</span>
          <p className="metric-insight">Community Interest</p>
        </div>

        <div className="metric-card">
          📦
          <strong>{repoCount}</strong>
          <span>Repositories</span>
          <p className="metric-insight">{activityLevel}</p>
        </div>

        <div className="metric-card">
          🧠
          <strong>{languageCount}</strong>
          <span>Languages</span>
          <p className="metric-insight">Skill Diversity</p>
        </div>

        <p className="metrics-subtitle">
          Insights based on public GitHub repositories
        </p>
      </div>

      {!metricsLoaded && (
        <div className="metrics-overlay">
          <button onClick={fetchMetrics} disabled={loading}>
            {loading ? <Loader /> : "Load Metrics & Repos (1 API call)"}
          </button>
        </div>
      )}
    </div>

  );
};

export default Metrics;
