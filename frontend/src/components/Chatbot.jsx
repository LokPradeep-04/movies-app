import { useState, useRef, useEffect } from "react"
import Cookies from "js-cookie"
import API_BASE_URL from "../config/config"

const Chatbot = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hi! I am your MoviesApp assistant. Ask me anything about the app or movies!"
        }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const token = Cookies.get("accessToken")

    const suggestions = [
        { icon: "🎬", text: "What's trending?" },
        { icon: "➕", text: "How to add to watchlist?" },
        { icon: "🎭", text: "Suggest me a movie" }
    ]

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])

    const sendMessage = async (overrideMessage) => {

        const userMessage = (overrideMessage || input).trim()
        if (!userMessage) return

        setInput("")
        setMessages(prev => [...prev, { role: "user", text: userMessage }])
        setLoading(true)

        try {
            const res = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message: userMessage })
            })

            const data = await res.json()

            setMessages(prev => [
                ...prev,
                { role: "bot", text: data.reply }
            ])

        } catch {
            setMessages(prev => [
                ...prev,
                { role: "bot", text: "Something went wrong. Please try again." }
            ])
        }

        setLoading(false)
    }

    const handleSuggestion = (text) => {
        sendMessage(text)
    }

    const onEnter = (e) => {
        if (e.key === "Enter") sendMessage()
    }

    return (
        <div className="fixed bottom-8 right-5 z-50 flex flex-col items-end">

            {isOpen && (
                <div className="mb-3 w-[420px] bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-800">

                    
                    <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-white font-medium text-sm">
                                MoviesApp Assistant
                            </span>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </div>

                    
                    <div className="flex flex-col gap-3 p-4 h-[450px] overflow-y-auto scrollbar-hide">

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] leading-5
                                                   ${msg.role === "user"
                                            ? "bg-red-600 text-white rounded-br-none"
                                            : "bg-[#2a2a2a] text-gray-200 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text.split("\n").map((line, i) => (
                                        <p key={i} className={line.startsWith("•") ? "ml-2" : ""}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                       
                        {messages.length === 1 && (
                            <div className="flex flex-col gap-2 mt-2">
                                {suggestions.map((s, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestion(s.text)}
                                        className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333333] text-gray-200 text-sm px-3 py-2 rounded-xl text-left transition"
                                    >
                                        <span>{s.icon}</span>
                                        <span>{s.text}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#2a2a2a] px-4 py-3 rounded-2xl rounded-bl-none">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                   
                    <div className="px-3 py-3 border-t border-gray-800 flex items-center gap-2">

                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onEnter}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-[#2a2a2a] text-white text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-500"
                        />

                        <button
                            onClick={() => sendMessage()}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                            </svg>
                        </button>

                    </div>

                </div>
            )}

            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition"
            >
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                )}
            </button>

        </div>
    )
}

export default Chatbot