import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProfileCard from "../components/ProfileCard";
import Metrics from "../components/Metrics";
import RepoList from "../components/RepoList";
import LanguageChart from "../components/LanguageChart";
import ActivityGraph from "../components/ActivityGraph";
import Loader from "../components/Loader";
import Error from "../components/Error";


// Import Mock JSON 
import profileData from '../mock/profile.json';
import reposData from '../mock/repos.json';
import languagesData from '../mock/languages.json';
import activityData from '../mock/activity.json';

const Profile = () => {
    const { username } = useParams(); // Extract GitHub username from URL
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [languages, setLanguages] = useState({});
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Do something about the rate limits for the public API like suggest cost for an action or show the total API rate limit available to the user at the beginning only
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try{
    //             // Fetch user profile
    //             const profileRes = await axios.get(`https://api.github.com/users/${username}`);
    //             setProfile(profileRes.data);

    //             // Fetch repositories
    //             const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
    //             setRepos(reposRes.data);

    //             // Aggregate languages
    //             const languageData = {};
    //             await Promise.all(
    //                 reposRes.data.map(async (repo) => {
    //                     const langRes = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/languages`);
    //                     Object.keys(langRes.data).forEach((lang) => {
    //                         languageData[lang] = (languageData[lang] || 0) + langRes.data[lang];
    //                     });
    //                 })
    //             );
    //             setLanguages(languageData);

    //             // Fetch recent activity
    //             const activityRes = await axios.get(`https://api.github.com/users/${username}/events/public`);
    //             setActivity(activityRes.data);
    //         }
    //         catch (err) {
    //             setError('Failed to fetch GitHub data. Please check the username or try again later.');
    //         }
    //         setLoading(false);
    //     };
    //     fetchData();
    // }, [username]);


    // Mock JSON for testing purposes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                setProfile(profileData);
                setRepos(reposData);
                setLanguages(languagesData);
                setActivity(activityData);
                console.log("True");
            } catch (err) {
            setError('Failed to fetch data.');
            }
            setLoading(false);
        };

        fetchData();
    }, [username]);

    // Handle loading and errors
    if (loading) return <Loader/>;
    if (error) return <Error message={error} />;

    // Render Profile Page components
    return (
        <div className="profile-page">
            <ProfileCard profile={profile}/>
            <Metrics repos={repos} languages={languages}/>
            <LanguageChart languages={languages}/>
            <ActivityGraph activity={activity}/>
            <RepoList repos={repos}/>
        </div>
    );
};

export default Profile;