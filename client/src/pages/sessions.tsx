import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function Sessions() {
    useEffect(() => {
        console.log('Load session first time')
        socket = io("http://localhost:5000");
    }, []);

    return (
        <div>
            <h1>Session</h1>
        </div>
    );
}

export default Sessions;