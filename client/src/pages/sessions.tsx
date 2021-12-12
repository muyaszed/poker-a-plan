import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

function Sessions() {
    const params = useParams();
    const [welcomeMessage, setWelcomMessage] = useState('');

    useEffect(() => {
        console.log('Load session first time', process.env.NODE_ENV )
        socket = io(process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://poker-a-plan.herokuapp.com/");
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