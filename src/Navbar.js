
export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/">2048</a>
            <ul>
                <li>
                    <a href="/leaderboard">Leaderboard</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </nav>
    )
}