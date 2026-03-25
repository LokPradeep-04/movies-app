import { useState, useRef, useEffect } from "react"
import Cookies from "js-cookie"
import { Send, X, Bot, User, Sparkles, MessageSquare, Trash2 } from "lucide-react"
import API_BASE_URL from "../config/config"

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hi! I am your MoviesApp assistant. Ask me anything about the app or movies!",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const token = Cookies.get("accessToken")

    const suggestions = [
        { icon: <Sparkles size={14} />, text: "What's trending now?" },
        { icon: <MessageSquare size={14} />, text: "How to use the app?" },
        { icon: <Bot size={14} />, text: "Suggest a sci-fi movie" }
    ]

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
        }
    }, [isOpen])

    const sendMessage = async (overrideMessage) => {
        const userMessage = (overrideMessage || input).trim()
        if (!userMessage) return

        setInput("")
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        setMessages(prev => [...prev, { role: "user", text: userMessage, time }])
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
            const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            setMessages(prev => [
                ...prev,
                { role: "bot", text: data.reply || "I couldn't get a response. Try again later.", time: botTime }
            ])

        } catch {
            const errTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            setMessages(prev => [
                ...prev,
                { role: "bot", text: "Something went wrong. Please check your connection.", time: errTime }
            ])
        }

        setLoading(false)
    }

    const clearChat = () => {
        setMessages([
            {
                role: "bot",
                text: "Chat cleared! How can I help you now?",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ])
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            
            {isOpen && (
                <div className="mb-4 w-96 md:w-[420px] bg-[#121212]/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-white/10 transition-all duration-300 transform origin-bottom-right">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-700 to-red-600 px-5 py-4 flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                    <Bot className="text-white" size={22} />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-red-700 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-base leading-none">
                                    CineBot AI
                                </span>
                                <span className="text-red-100 text-[10px] font-medium mt-1 uppercase tracking-wider">
                                    Online Assistant
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={clearChat}
                                title="Clear conversation"
                                className="text-white/70 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/70 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex flex-col gap-4 p-5 h-[480px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {msg.role === "bot" && (
                                    <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0 mb-1">
                                        <Bot size={14} className="text-red-500" />
                                    </div>
                                )}
                                
                                <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm
                                            ${msg.role === "user"
                                                ? "bg-red-600 text-white rounded-br-none font-medium"
                                                : "bg-[#222222] text-gray-100 rounded-bl-none border border-white/5 shadow-inner"
                                            }`}
                                    >
                                        {msg.text.split("\n").map((line, i) => (
                                            <p key={i} className={`${line.startsWith("•") || line.startsWith("-") ? "pl-2 py-0.5" : "py-0.5"}`}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-1 px-1">
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Suggestions */}
                        {messages.length === 1 && (
                            <div className="flex flex-wrap gap-2 mt-4 ml-10">
                                {suggestions.map((s, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(s.text)}
                                        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 hover:border-red-600/50 border border-white/10 text-gray-300 text-[11px] px-3 py-1.5 rounded-full transition-all duration-200"
                                    >
                                        <span className="text-red-500">{s.icon}</span>
                                        {s.text}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Typing Indicator */}
                        {loading && (
                            <div className="flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2">
                                <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0 mb-1">
                                    <Bot size={14} className="text-red-500" />
                                </div>
                                <div className="bg-[#222222] px-4 py-3 rounded-2xl rounded-bl-none border border-white/5">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" style={{ animationDuration: '1s' }} />
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "150ms", animationDuration: '1s' }} />
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "300ms", animationDuration: '1s' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-[#1a1a1a] border-t border-white/5">
                        <div className="relative flex items-center bg-[#252525] rounded-2xl border border-white/5 p-1 px-2 focus-within:border-red-600/50 transition-all shadow-inner">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Message CineBot..."
                                className="flex-1 bg-transparent text-white text-[13.5px] px-3 py-2 focus:outline-none placeholder-gray-500"
                            />

                            <button
                                onClick={() => sendMessage()}
                                disabled={loading || !input.trim()}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                    input.trim() ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "text-gray-600"
                                }`}
                            >
                                <Send size={16} fill={input.trim() ? "currentColor" : "none"} />
                            </button>
                        </div>
                        <p className="text-[9px] text-center text-gray-600 mt-2 tracking-tight uppercase">
                            AI-Powered Movie Insights
                        </p>
                    </div>
                </div>
            )}

            {/* floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative group ${
                    isOpen ? "rotate-90" : "hover:scale-110 active:scale-95"
                } bg-gradient-to-br from-red-600 to-red-700 text-white w-14 h-14 rounded-2xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] flex items-center justify-center transition-all duration-300 ease-out z-50`}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <div className="relative">
                        <MessageSquare size={26} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-20"></span>
                    </div>
                )}
                
                {!isOpen && (
                   <span className="absolute right-16 scale-0 group-hover:scale-100 transition-transform bg-white text-black text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none origin-right">
                       Chat with CineBot AI
                   </span>
                )}
            </button>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}} />
        </div>
    )
}

export default Chatbot