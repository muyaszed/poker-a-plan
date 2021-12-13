import { useState } from "react";
import { Link, useParams } from 'react-router-dom';

function SessionUser() {
    const [userName, setUserName] = useState('');
    // const location = useLocation();
    const params = useParams();

    return (
            <div>
                <h1>Please enter your name</h1>
                <input name="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Your name"/>
                {/* <Link to={`${location.pathname}/${userName}/false`}> */}
                <Link to={`/sessions/${params.sessionId}/${params.sessionName}/${userName}/false`}>

                <button>Enter</button>

                </Link>
            </div>

    );
}

export default SessionUser;