'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Todo {
    id: number
    text: string
    completed: boolean
}

export default function Note() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState('')
    const [param, setParam] = useState('')

    const params: any = useParams()
    const router = useRouter()

    useEffect(() => {
        setParam(params.note)
    }, [params])

    useEffect(() => {
        if (param) {
            const savedTodos = localStorage.getItem(param)
            if (savedTodos) {
                setTodos(JSON.parse(savedTodos))
            }
        }
    }, [param])

    useEffect(() => {
        if (param) {
            localStorage.setItem(param, JSON.stringify(todos))
        }
    }, [todos, param])

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTodo.trim()) {
            setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }])
            setNewTodo('')
        }
    }

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

            {/* Blur effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-[128px]" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/30 rounded-full blur-[128px]" />
            </div>

            {/* Content */}
            <div className="relative flex-grow flex overflow-hidden p-6">
                <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Video Section */}
                    <div className="lg:w-[70%] bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col">
                        <Link 
                            href={'/notes'}
                            className="mb-4 flex items-center text-white/80 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Notes
                        </Link>
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${param}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Todo List Section */}
                    <div className="lg:w-[30%] flex flex-col space-y-6">
                        {/* Add Todo Form */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4">Note List</h2>
                            <form onSubmit={addTodo} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    placeholder="Add a new Notes..."
                                    className="flex-grow bg-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-purple-500 hover:bg-purple-600 rounded-lg p-2 transition-colors"
                                    aria-label="Add todo"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </form>
                        </div>

                        {/* Todo Items - Line by Line */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex-grow flex flex-col">
                            {todos.length === 0 ? (
                                <p className="text-white/50 text-center py-4">No todos yet. Add one above!</p>
                            ) : (
                                <ul className="space-y-4">
                                    {todos.map((todo) => (
                                        <li
                                            key={todo.id}
                                            className="flex items-center gap-2 group"
                                        >
                                            <button
                                                onClick={() => toggleTodo(todo.id)}
                                                className={`w-5 h-5 rounded-full border ${todo.completed ? 'bg-purple-500 border-purple-500' : 'border-white'
                                                    } flex items-center justify-center`}
                                                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                                            >
                                                {todo.completed && <Check className="h-4 w-4 text-white" />}
                                            </button>
                                            <span className={`break-words hello ${todo.completed ? 'line-through text-white/50' : ''}`}>
                                                {todo.text}
                                            </span>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50 hover:text-white"
                                                aria-label="Delete todo"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
