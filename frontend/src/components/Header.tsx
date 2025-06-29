
import Link from 'next/link';

const Header = () => {
    return (
        <header className="w-full bg-gray-100 px-6 py-4 shadow-sm mb-6">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">
                    Quickly Home
                </Link>
                <div>[my order]</div>
                <div>[personal]</div>
                <div>[login]</div>
            </div>
        </header>
    );
};

export default Header;