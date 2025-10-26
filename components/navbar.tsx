import Link from "next/link";

export function Navbar() {
    return <header>
        <ul>
            <li>
                <Link href="/todos">Todos</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
        </ul>
    </header>;
}