import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="#problem">Pourquoi nous ?</Link></li>
                        <li><Link href="#how-it-works">Comment ça marche</Link></li>
                        <li><Link href="#mentors">Nos Mentors</Link></li>
                        <li><Link href="#faq">FAQ</Link></li>
                    </ul>
                </div>
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-20 w-auto object-contain py-2" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-2">
                    <li><Link href="#problem">Pourquoi nous ?</Link></li>
                    <li><Link href="#how-it-works">Comment ça marche</Link></li>
                    <li><Link href="#mentors">Nos Mentors</Link></li>
                    <li><Link href="#faq">FAQ</Link></li>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <Link href="/login" className="btn btn-ghost btn-sm hidden md:flex">Connexion</Link>
                <Link href="/signup" className="btn btn-primary btn-sm rounded-full px-6">S'inscrire</Link>
            </div>
        </div>
    );
}
