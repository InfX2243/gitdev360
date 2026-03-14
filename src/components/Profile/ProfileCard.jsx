import React from "react";

const ProfileCard = ({ profile, gitDevScore }) => {
  const joinYear = new Date(profile.created_at).getFullYear();
  const accountAge = new Date().getFullYear() - joinYear;

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 50) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src={profile.avatar_url}
          alt={`${profile.login} avatar`}
          className="avatar"
        />

        <div className="profile-info">
          <h2>{profile.name || profile.login}</h2>
          <p className="username">@{profile.login}</p>

          <p className="summary">
            {profile.public_repos} repos · {profile.followers} followers ·
            {accountAge}+ yrs on GitHub
          </p>

          {profile.bio && <p className="bio">“{profile.bio}”</p>}

          <div className="profile-meta">
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.blog && (
              <a href={profile.blog} target="_blank" rel="noreferrer">
                🔗 Website
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div>
          <strong>{profile.followers}</strong>
          <span>Followers</span>
        </div>
        <div>
          <strong>{profile.following}</strong>
          <span>Following</span>
        </div>
        <div>
          <strong>{profile.public_repos}</strong>
          <span>Public Repos</span>
        </div>
      </div>

      <div className="profile-score">
        <span>GitDev360 Score</span>
        {/* Optionally call the getScoreColor function to fetch score based color */}
        {/* <strong style={{color: getScoreColor(gitDevScore)}}>{gitDevScore || "N/A"}</strong> */}
        <strong>{gitDevScore || "N/A"}</strong>
      </div>
    </div>
  );
};

export default ProfileCard;