import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

function Sessions() {
    const params = useParams();
    const [welcomeMessage, setWelcomMessage] = useState('');

    useEffect(() => {
        console.log('Load session first time', process.env.REACT_APP_BACK_END_POINT )
        socket = io(process.env.REACT_APP_BACK_END_POINT  || "http://localhost:5000");
        socket.emit('join', {
            sessionId: params.sessionId,
            sessionName: params.sessionName,
            name: params.name,
        }, (error: string) => {
            if(error) {
                console.log(error)
            }
        })

        socket.on('welcome', ({
            text,
        }) => {
            setWelcomMessage(text);
        })
    }, []);

    return (
        <div>
            <h1>Session</h1>
            <p>{welcomeMessage}</p>
        </div>
    );
}

export default Sessions;