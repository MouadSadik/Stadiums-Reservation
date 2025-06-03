"use client";

import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export default function PlayerForm({ userId }) {
    const [fullName, setFullName] = useState("");
    const [imageFile, setImageFile] = useState(null); // imageFile sera utilisé
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleUpload(file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from("stadium-images")
            .upload(fileName, file);

        if (error) {
            throw new Error("Erreur lors de l'upload: " + error.message);
        }

        // get URL
        const { data: publicUrlData } = await supabase.storage
            .from("stadium-images")
            .getPublicUrl(fileName);

        if (!publicUrlData?.publicUrl) {
            throw new Error("Impossible de recuperer l'URL publique.");
        }

        return publicUrlData.publicUrl;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        let avatarUrl = "";

        // Si un fichier image a été sélectionné, upload
        if (imageFile) {
            try {
                avatarUrl = await handleUpload(imageFile);
            } catch (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }
        }

        // Update profil dans Supabase
        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: fullName,
                avatar_url: avatarUrl || null, // si pas d'image, garde la valeur null
            })
            .eq("id", userId);

        if (error) {
            setErrorMsg("Erreur lors de la mise a jour du profil !");
            console.log(error);
        } else {
            setSuccessMsg("Profil joueur mis a jour !");
            setFullName("");
            setImageFile(null);
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow space-y-4 max-w-md"
        >
            <h2 className="text-lg font-bold mb-2">Modifier votre profil</h2>

            <input
                type="text"
                placeholder="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
            />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
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
