import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Poke A Plan</h1>
            <Link to={`/sessions/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`}>
            <button >New session</button>
            </Link>
        </div>
    );
}

export default Home;