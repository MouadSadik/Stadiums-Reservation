"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StadiumByRes({ ownerId }) {
    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReservationsForStadium(stadiumId) {
            const { data, error } = await supabase
                .from("reservations")
                .select("*")
                .eq("stadium_id", stadiumId)
                .order("date", { ascending: true });

            if (error) {
                console.error("Erreur lors du chargement des réservations:", error.message);
                return [];
            }

            return data;
        }

        async function fetchStadiums() {
            const { data, error } = await supabase
                .from("stadiums")
                .select("*")
                .eq("owner_id", ownerId)
                .order("id", { ascending: false });

            if (error) {
                console.error("Erreur lors du chargement des stades:", error.message);
                setStadiums([]);
                setLoading(false);
                return;
            }

            const stadiumsWithReservations = await Promise.all(
                data.map(async (stadium) => {
                    const reservations = await fetchReservationsForStadium(stadium.id);
                    return { ...stadium, reservations };
                })
            );

            setStadiums(stadiumsWithReservations);
            setLoading(false);
        }

        if (ownerId) {
            fetchStadiums();
        }
    }, [ownerId]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="space-y-2">
                        <Skeleton className="h-48 w-full rounded" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mes Stades & Réservations</h1>

            {stadiums.length === 0 ? (
                <p className="text-gray-600">Vous n'avez ajouté aucun stade.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {stadiums.map((stadium) => (
                        <Card key={stadium.id} className="overflow-hidden">
                            {/* Image */}
                            <div className="w-full h-48 overflow-hidden">
                                {stadium.image_url ? (
                                    <img
                                        src={stadium.image_url}
                                        alt={stadium.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                                        Aucune image
                                    </div>
                                )}
                            </div>

                            {/* Infos stade */}
                            <CardHeader>
                                <CardTitle>{stadium.name}</CardTitle>
                                <CardDescription className="text-sm text-gray-500">
                                    {stadium.location}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-gray-700">{stadium.description}</p>

                                <div className="mt-4">
                                    <h3 className="font-semibold text-sm">Réservations :</h3>
                                    {stadium.reservations.length === 0 ? (
                                        <p className="text-gray-400 text-sm">Aucune réservation.</p>
                                    ) : (
                                        <ul className="list-disc list-inside text-sm">
                                            {stadium.reservations.map((res) => (
                                                <li key={res.id}>
                                                    {res.date} – {res.user_name || "Utilisateur inconnu"}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
