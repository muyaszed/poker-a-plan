import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import io, {Socket} from 'socket.io-client';
import UserCard from '../components/userCard';

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
    const [admin, setAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(params.admin === 'true') {
            setAdmin(true);
        }
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

    function getSharedURL() {
        let url = window.location.href.split('/');
        url.splice(6);

        return url.join('/');
    }

    return (
        <div>
            <h1>{params.sessionName}</h1>
            <p>{welcomeMessage}</p>
            <div className="main-group-container">
                {users.map(user => <UserCard key={user.id} userName={user.name} userId={user.id} />)}
            </div>
            {admin && <button>Show result</button>}
            <div className="selection-list-container">
                {[0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'].map(selection => (
                    <div className="selection-card">{selection}</div>
                ))}
            </div>
            {admin && <div>
                <div>Invite people with this url</div>   
                <input className="invite-url" readOnly name="invite-url" value={getSharedURL()} type="text"/>
            </div>}
        </div>
    );
}

export default Sessions;