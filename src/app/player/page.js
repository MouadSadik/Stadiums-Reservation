"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import PlayerForm from "../components/PlayerForm"

export default function Home() {
    const [user, setUser] = useState("")


    useEffect(() => {
        const sessionUser = supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])

    if (!user) return <p>Chargement...</p>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Bienvenue Joueur !</h1>
            <PlayerForm userId={user.id} />
        </div>
    )
}