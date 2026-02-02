import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import LandingInfo from "../components/LandingInfo";
import Logo from "../components/Logo";

const Home = () => {
    return (
        <div className="home-container">
            <main className="home-content">
                <Header/>
                <HeroSection/>
                <SearchBar/>
                <p className="hint">
                    Try usernames like <span>torvalds</span>, <span>gaearon</span>, or <span>tj</span>
                </p>
            </main>
        </div>
    );
};

export default Home;