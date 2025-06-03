"use client"

import { supabase } from "../lib/supabaseClient"
import { useState } from "react";

export default function PlayerForm({ userId }) {

    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setErrorMsg("")
        setSuccessMsg("")

        const { error } = await supabase.from("profiles").update({
            full_name: fullName,
            avatar_url: avatarUrl,
        }).eq("id", userId);

        if (error) {
            setErrorMsg("Erreur lors de la mise a jour du profil !")
            console.log(error)
        }
        else {
            setSuccessMsg("Profil joueur mis a jour")
            setFullName("")
            setAvatarUrl("")
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md">
            <h2 className="text-lg font-bold mb-2">Completer votre profil</h2>

            <input
                type="text"
                placeholder="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
            />

            <input
                type="url"
                placeholder="URL de l'avatar"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded"
            />

            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {successMsg && <p className="text-green-500">{successMsg}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
                {loading ? "Chargement..." : "Enregistrer"}
            </button>
        </form>
    );
}