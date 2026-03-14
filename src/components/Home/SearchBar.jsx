import {useState} from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if(username.trim() !== ''){
            // Redirect to profile page with username
            navigate(`/profile/${username.trim()}`);
        }
    };

    return (
        <div className="search-bar">
            <input 
                type="text"
                autoFocus
                placeholder="Enter GitHub username (e.g. torvalds)"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;