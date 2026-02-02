import React from "react";

const ProfileCard = ({ profile }) => {
    return (
        <div className="profile-card">
            <img src={profile.avatar_url} alt={`${profile.login} avatar`} />
            <h2>{profile.name || profile.login}</h2>
            <p className="username">@{profile.login}</p>
            {profile.bio && <p className="bio">{profile.bio}</p>}
            <div className="profile-stats">
                <p>Followers: {profile.followers}</p>
                <p>Following: {profile.following}</p>
                <p>Repos: {profile.public_repos}</p>
            </div>
            {profile.location && <p>📍 {profile.location}</p>}
            {profile.blog && <p>🔗 <a href={profile.blog} target="_blank">{profile.blog}</a></p>}
        </div>
    );
};

export default ProfileCard;