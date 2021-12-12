import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, {Socket} from 'socket.io-client';

export interface User {
    id: string;
    name: string;
    room: string;
}

let socket: Socket;

function Sessions() {
    const params = useParams();
    const [welcomeMessage, setWelcomMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        console.log(params)
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

        
    }, []);

    useEffect(() => {
        socket.on('welcome', ({
            text,
        }) => {
            setWelcomMessage(text);
        });
        socket.on('all-users', ({
            users
        }) => {
            setUsers(users)
        })
    }, []);


    return (
        <div>
            <h1>Session</h1>
            <p>{welcomeMessage}</p>
            <div className="main-group-container">
                {users.map(user => <div key={user.id}>{user.name}</div>)}
            </div>
        </div>
    );
}

export default Sessions;