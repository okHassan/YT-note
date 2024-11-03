import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-gradient" />

            {/* Blur effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-[128px]" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/30 rounded-full blur-[128px]" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <header className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
                    <div className="w-40 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex justify-center items-center">
                        <h1 className="text-base">YT note</h1>
                    </div>
                    <Link href='/notes' className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white font-medium transition-all">
                        Create Note
                    </Link>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 backdrop-blur-sm">
                            Welcome to the Future of Notes
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto backdrop-blur-sm pb-14">
                            Make easy to create notes to complete your learnings.
                        </p>

                        <Link href='/notes' className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white font-medium transition-all">
                            Create Note
                        </Link>
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full mt-auto">
                    <div className="max-w-7xl mx-auto p-6">
                        <div className="w-full h-16 bg-white/5 backdrop-blur-sm rounded-lg flex justify-center items-center">
                            <p>Developer</p>
                            <a href="https://coderhassan.vercel.app/" className="ml-3 text-purple-400">@coderhassan</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}