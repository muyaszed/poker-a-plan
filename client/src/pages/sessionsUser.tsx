import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function SessionUser() {
    const [userName, setUserName] = useState('');
    const location = useLocation();

    return (
            <div>
                <h1>Please enter your name</h1>
                <input name="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Your name"/>
                <Link to={`${location.pathname}/${userName}/false`}>
                <button>Enter</button>

                </Link>
            </div>

    );
}

export default SessionUser;