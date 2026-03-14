import React from "react";

const LanguageChart = ({ languages }) => {
  const entries = Object.entries(languages);

  if (entries.length === 0) {
    return (
      <div className="language-chart">
        <h3>Skill Breakdown</h3>
        <p className="empty-state">This user has no public code contributions yet.</p>
      </div>
    );
  }

  const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

  const sortedLanguages = entries
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }))
    .sort((a, b) => b.bytes - a.bytes);

  const primary = sortedLanguages[0];

  return (
    <div className="language-chart">
      <h3>Skill Breakdown</h3>

      <p className="primary-skill">
        Primary Language: <strong>{primary.name}</strong> ({primary.percentage}
        %)
      </p>

      <div className="language-bars">
        {sortedLanguages.map((lang) => (
          <div key={lang.name} className="language-row">
            <div className="language-label">
              <span>{lang.name}</span>
              <span>{lang.percentage}%</span>
            </div>

            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: `${lang.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageChart;
