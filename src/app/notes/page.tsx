'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Todo {
    id: number
    text: string
    completed: boolean
}

interface NoteData {
    title: string
    todos: Todo[]
}

export default function Notes() {
    const [allTodos, setAllTodos] = useState<{ [key: string]: NoteData }>({})

    const getInfo = async (id: string) => {
        const apiKey = 'AIzaSyCjaLYtAn8IVpCbArQWRGPhUdPnGAmHaXY' // replace with your API key
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet`
        )
        const data = await res.json()
        const title = data.items[0]?.snippet?.title || 'Video not found'
        return title
    }

    useEffect(() => {
        const keys = Object.keys(localStorage)
        const todosData: { [key: string]: NoteData } = {}

        // Fetch todos for each key in localStorage and get video titles
        keys.forEach(async (key) => {
            const todos = localStorage.getItem(key)
            if (todos) {
                try {
                    const parsedTodos: Todo[] = JSON.parse(todos)
                    if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
                        const title = await getInfo(key) // fetch video title
                        todosData[key] = { title, todos: parsedTodos } // store title with todos
                        setAllTodos((prev) => ({ ...prev, [key]: { title, todos: parsedTodos } }))
                    }
                } catch (error) {
                    console.error(`Error parsing todos for key ${key}:`, error)
                }
            }
        })
    }, [])

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
            <div className="relative max-w-7xl mx-auto px-4 py-6">
                {/* Top navigation */}
                <div className="flex justify-between items-center mb-8">
                    <div className="w-40 h-8 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center">
                        <Link href={'/'} className="text-sm font-medium cursor-pointer">Back to Home</Link>
                    </div>
                    <div className="w-40 h-8 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center">
                        <Link href='/create' className="text-sm font-medium cursor-pointer">Add note</Link>
                    </div>
                </div>

                {/* Search or title section */}
                <div className="w-full max-w-[500px] h-12 mx-auto mb-12 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center">
                    <span className="text-lg font-semibold">All Notes</span>
                </div>

                {/* Main content sections */}
                <div className="space-y-8">
                    {/* Displaying todos for each note */}
                    {Object.keys(allTodos).map((noteId) => (
                        allTodos[noteId].todos.length > 0 && (
                            <div key={noteId} className="w-full bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors p-6">
                                <Link href={`/notes/${noteId}`}>
                                    <h2 className="text-xl font-bold mb-2 cursor-pointer">
                                        {allTodos[noteId].title} {/* Display video title */}
                                    </h2>
                                </Link>
                                <ul className="list-disc list-inside">
                                    {allTodos[noteId].todos.slice(0, 3).map(todo => (
                                        <li key={todo.id} className={`text-white/80 ${todo.completed ? 'line-through' : ''}`}>
                                            {todo.text}
                                        </li>
                                    ))}
                                    {allTodos[noteId].todos.length > 3 && (
                                        <li className="text-purple-400">...and more</li>
                                    )}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}
