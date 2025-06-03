"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Stadiums() {
    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        async function fetchStadiums() {
            const { data, error } = await supabase.from("stadiums").select("*");

            if (error) {
                console.error(error);
                setErrorMsg("Erreur lors du chargement des stades.");
            } else {
                setStadiums(data);
            }
            setLoading(false);
        }

        fetchStadiums();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Bienvenue, Joueur !</h1>

            {loading && <p>Chargement des stades...</p>}
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stadiums.map((stadium) => (
                    <div
                        key={stadium.id}
                        className="border rounded p-4 shadow bg-white"
                    >
                        <img
                            src={stadium.image_url}
                            alt={stadium.name}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-lg font-semibold">{stadium.name}</h2>
                        <p className="text-sm text-gray-600">{stadium.location}</p>
                        <p className="text-sm">{stadium.description}</p>

                        <button
                            className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                            onClick={() => alert(`Réservation pour: ${stadium.name}`)}
                        >
                            Reserver
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
