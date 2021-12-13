export interface UserCardProps {
    userId: string;
    userName: string;
}

function UserCard({ userId, userName }: UserCardProps) {
    console.log(userId)
    return (
        <div className="user-card" key={userId}>
            {userName}
        </div>
    );
}

export default UserCard;