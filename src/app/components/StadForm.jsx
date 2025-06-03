"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function StadiumForm({ ownerId }) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        if (!ownerId) {
            setErrorMsg("Identifiant propriétaire manquant.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("stadiums").insert({
            name,
            location,
            description,
            image_url: imageUrl,
            owner_id: ownerId, 
        });

        if (error) {
            setErrorMsg("Erreur: " + error.message);
        } else {
            setSuccessMsg("Stade ajouté avec succès !");
            setName("");
            setLocation("");
            setDescription("");
            setImageUrl("");
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                type="text"
                placeholder="Nom du stade"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Emplacement"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />
            <input
                type="url"
                placeholder="URL de l'image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
                {loading ? "Ajout..." : "Ajouter le stade"}
            </button>
        </form>
    );
}
