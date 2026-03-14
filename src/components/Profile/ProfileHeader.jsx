import { Link } from "react-router-dom";

const ProfileHeader = ({ username }) => {
  return (
    <header className="profile-dashboard-header">
      <div className="brand">
        <span className="logo">GitDev360</span>
        <span className="page-title">
          Developer Analysis
        </span>
      </div>

      <nav className="dashboard-nav">
        <Link to="/">Search</Link>
        <Link to={`/compare/${username}`}>Compare</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default ProfileHeader;
