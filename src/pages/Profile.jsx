import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileCard from "../components/Profile/ProfileCard";
import Metrics from "../components/Profile/Metrics";
import RepoList from "../components/Profile/RepoList";
import LanguageChart from "../components/Profile/LanguageChart";
import ActivityGraph from "../components/Profile/ActivityGraph";
import Loader from "../components/Loader";
import Error from "../components/Error";
import TopRepos from "../components/Profile/TopRepos";

import { getUserProfile, getUserRepos, getRepoLanguages, getUserActivity } from "../services/githubAPI";
import { calculateGitDevScore } from "../services/utils";

// Import Mock JSON 
// import profileData from '../mock/profile.json';
// import reposData from '../mock/repos.json';
// import languagesData from '../mock/languages.json';
// import activityData from '../mock/activity.json';

const Profile = () => {
    const { username } = useParams(); // Extract GitHub username from URL
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [languages, setLanguages] = useState({});
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Do something about the rate limits for the public API like suggest cost for an action or show the total API rate limit available to the user at the beginning only
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // 1. Get user profile
            const profileRes = await getUserProfile(username);
            setProfile(profileRes.data);

            // 2. Get all repos
            // const reposRes = await getUserRepos(username);
            // setRepos(reposRes.data);
            setRepos([]);

            // 3. Aggregate languages across repos
            // const languageData = {};
            // await Promise.all(
            // reposRes.data.map(async (repo) => {
            //     const langRes = await getRepoLanguages(username, repo.name);
            //     Object.keys(langRes.data).forEach((lang) => {
            //     languageData[lang] = (languageData[lang] || 0) + langRes.data[lang];
            //     });
            // })
            // );
            // setLanguages(languageData);
            setLanguages({});

            // 4. Get recent activity
            // const activityRes = await getUserActivity(username);
            // setActivity(activityRes.data);
            setActivity([]);
        } 
        catch (err) {
            setError("Failed to fetch GitHub data. Check the username or rate limits.");
        }
        setLoading(false);
        };
        fetchData();
    }, [username]);


    // Mock JSON for testing purposes
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {
    //             setProfile(profileData);
    //             setRepos(reposData);
    //             setLanguages(languagesData);
    //             setActivity(activityData);
    //             console.log("True");
    //         } catch (err) {
    //         setError('Failed to fetch data.');
    //         }
    //         setLoading(false);
    //     };

    //     fetchData();
    // }, [username]);

    const gitDevScore = calculateGitDevScore(profile, repos, activity);

    // Handle loading and errors
    if (loading) return <Loader/>;
    if (error) return <Error message={error} />;

    // Render Profile Page components
    return (
        <>
            <ProfileHeader username={profile.login}/>
            <div className="profile-page">
                <h2 className="section-title section-title--primary">
                    Profile Overview
                </h2>
                <section className="profile-top">
                    <ProfileCard profile={profile} gitDevScore={gitDevScore} />
                    <Metrics
                        username={username}    // For API call
                        repos={repos}          // State for repos
                        setRepos={setRepos}    // Function to update repos
                        languages={languages}  // State for languages
                        setLanguages={setLanguages} // Function to update languages
                    />
                </section>

                <h3 className="section-title">Insights</h3>
                <section className="profile-middle">
                    <LanguageChart languages={languages} />
                    <ActivityGraph activity={activity} />
                </section>

                <h3 className="section-title">Top Repositories</h3>
                <section className="profile-middle">
                    <TopRepos repos={repos} />
                </section>
                
                <h3 className="section-title">Repositories</h3>
                <section className="profile-bottom">
                    <RepoList username={username}    // For API call
                        repos={repos}          // State for repos
                        setRepos={setRepos}    // Function to update repos
                        />
                </section>
            </div>
        </>
    );
};

export default Profile;