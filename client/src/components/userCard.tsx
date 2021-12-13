import { User } from "../pages/sessions";

export interface UserCardProps {
    user: User;
    showResult: boolean;
}

function UserCard({ user, showResult }: UserCardProps) {
    console.log(user.id)
    return (
        <div className="user-card" key={user.id}>
            {user.selection && <div>( Done )</div>}
            <div>{user.name}</div>
            {showResult && <div className="user-selection">{user.selection}</div>}
        </div>
    );
}

export default UserCard;