'use client'

import { useState } from 'react'
import { Play, Link as LinkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function Create() {
    const [videoUrl, setVideoUrl] = useState('')
    const [currentVideo, setCurrentVideo] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Extract video ID from various YouTube URL formats
        const videoId: any = videoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/)
        // if (videoId) {
        //     setCurrentVideo(`https://www.youtube.com/embed/${videoId[1]}`)
        // }
        router.push(`/notes/${videoId[1]}`)

    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

            {/* Blur effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-[128px]" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/30 rounded-full blur-[128px]" />
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 py-6 mt-60">
                {/* URL Input */}
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-white/50" />
                            </div>
                            <input
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="Paste YouTube URL here..."
                                className="w-full bg-white/10 backdrop-blur-md rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-500 hover:bg-purple-600 rounded-lg px-6 py-3 flex items-center gap-2 transition-colors"
                        >
                            <Play className="h-5 w-5" />
                            <span>Add</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}