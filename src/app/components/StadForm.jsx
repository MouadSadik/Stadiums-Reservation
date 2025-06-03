"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function StadiumForm({ ownerId }) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    async function uploadImage(file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from("stadium-images")
            .upload(fileName, file);

        if (error) {
            throw new Error("Erreur lors de l'upload: " + error.message);
        }

        // Obtenir l'URL publique
        const { data: publicUrlData } = await supabase.storage
            .from("stadium-images")
            .getPublicUrl(fileName);

        if (!publicUrlData?.publicUrl) {
            throw new Error("Impossible de récupérer l'URL publique.");
        }

        return publicUrlData.publicUrl;
    }

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

        if (!imageFile) {
            setErrorMsg("Veuillez choisir une image.");
            setLoading(false);
            return;
        }

        try {
            const imageUrl = await uploadImage(imageFile);

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
                setImageFile(null);
            }
        } catch (err) {
            setErrorMsg(err.message);
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <Input
                type="text"
                placeholder="Nom du stade"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                type="text"
                placeholder="Emplacement"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            <div>
                <Label>Image du stade</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                />
            </div>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Ajout..." : "Ajouter le stade"}
            </Button>
        </form>
    );
}
