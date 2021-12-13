import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [sessionInfo, setSessionInfo] = useState({
        sessionName: '',
        adminName: '',
    });

    function handleSessionIfoChange(event: ChangeEvent<HTMLInputElement>): void {        
        if(event.target.name === 'session-name') {
            setSessionInfo({
                ...sessionInfo,
                sessionName: event.target.value,
            })
        }

        if(event.target.name === 'admin-name') {
            setSessionInfo({
                ...sessionInfo,
                adminName: event.target.value,
            })
        }

    }

    return (
        <div>
            <h1>Poker A Plan</h1>
            <input name="session-name" value={sessionInfo.sessionName} onChange={handleSessionIfoChange} type="text" placeholder="Session name"/>
            <Link to={`/sessionsAdmin/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}/${sessionInfo.sessionName}/`}>
                <button >New session</button>
            </Link>
        </div>
    );
}

export default Home;