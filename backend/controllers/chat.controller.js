const { GoogleGenerativeAI } = require("@google/generative-ai")
const Movie = require("../models/movie.model")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// In-memory store: { userId: [ {role, parts}, ... ] }
const conversationHistory = {}

const chat = async (req, res) => {
    const { message } = req.body
    const userId = req.user.id // from your AuthMiddleware

    if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Message is required" })
    }

    try {
        // 1. Fetch movies from DB
        const movies = await Movie.find().lean()

        const trendingMovies = movies.filter(m => m.category === "trending").map(m => m.title)
        const popularMovies = movies.filter(m => m.category === "popular").map(m => m.title)
        const originalsMovies = movies.filter(m => m.category === "originals").map(m => m.title)

        const movieList = movies.map(m => ({
            title: m.title,
            category: m.category,
            overview: m.overview,
            release_date: m.release_date,
            runtime: m.runtime
        }))

        // 2. System prompt (same as before)
        const systemPrompt = `You are a friendly and helpful assistant for a Netflix-style movies app called "MoviesApp".

APP OVERVIEW:
MoviesApp is a movie streaming app where users can browse, search and save movies.

PAGES:
- Home → shows Trending and Originals carousels
- Popular → shows all popular movies
- Movie Details → shows movie info, trailer, overview, runtime, release date
- Search → search for any movie by name
- Watchlist → shows movies the user has saved
- Account → shows user profile info

FEATURES:
- Browse trending, popular and originals movies
- Search for movies by name
- Add movies to watchlist
- Watch trailers
- View detailed movie info

NAVIGATION:
- Navbar → Home, Popular, Watchlist links
- Click avatar icon → goes to Account page
- Click search icon → goes to Search page
- Admin users see a Dashboard link in navbar

HOW TO USE THE APP:
- To search → click the search icon in navbar → type movie name
- To add to watchlist → open any movie → click "Add to Watchlist" button
- To watch trailer → open any movie → click "Play" button
- To view account → click avatar icon in navbar
- To logout → go to Account page

ADMIN PANEL:
- Admin login → /admin/login
- Admin can add, edit, delete movies
- Admin can view all registered users
- Admin dashboard shows total movies, users, trending, popular, originals count

MOVIES AVAILABLE:
Total movies: ${movies.length}
Trending (${trendingMovies.length}): ${trendingMovies.join(", ")}
Popular (${popularMovies.length}): ${popularMovies.join(", ")}
Originals (${originalsMovies.length}): ${originalsMovies.join(", ")}

FULL MOVIE DETAILS:
${JSON.stringify(movieList, null, 2)}

RESPONSE RULES:
- Only answer questions related to this movies app
- Always recommend movies from the MOVIES AVAILABLE list only — never suggest outside movies
- Match movie suggestions to user mood or genre by reading the overview field
- For step by step questions format response as: 1. 2. 3.
- For listing multiple items format response as: • item
- Keep responses short, friendly and to the point
- Never use markdown like ** or ## in responses
- If user greets you respond warmly and ask how you can help
- If user asks something unrelated politely say you can only help with MoviesApp related questions
- Use simple conversational language`

        // 3. Initialize history for this user if first message
        if (!conversationHistory[userId]) {
            conversationHistory[userId] = []
        }

        // 4. Add the new user message to their history
        conversationHistory[userId].push({
            role: "user",
            parts: [{ text: message.trim() }]
        })

        // 5. Start Gemini chat with full history
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt
        })

        const chatSession = model.startChat({
            history: conversationHistory[userId].slice(0, -1) // all except the latest
        })

        // 6. Send the latest message
        const result = await chatSession.sendMessage(message.trim())
        const reply = result.response.text()

        // 7. Save assistant reply to history
        conversationHistory[userId].push({
            role: "model",
            parts: [{ text: reply }]
        })

        // 8. Optional: cap history to last 20 messages to avoid token bloat
        if (conversationHistory[userId].length > 20) {
            conversationHistory[userId] = conversationHistory[userId].slice(-20)
        }

        res.status(200).json({ reply })

    } catch (error) {
        console.log("Chat error:", error)
        res.status(500).json({ error: "Something went wrong. Please try again." })
    }
}



module.exports = { chat }