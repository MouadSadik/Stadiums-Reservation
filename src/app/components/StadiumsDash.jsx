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
import { Button } from "@/components/ui/button";

export default function StadiumList() {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStadiums() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Erreur utilisateur :", userError?.message);
        setStadiums([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("stadiums")
        .select("*")
        .eq("owner_id", user.id) // Filtrage des stades par propriétaire
        .order("id", { ascending: false });

      if (error) {
        console.error("Erreur lors du chargement des stades:", error.message);
        setStadiums([]);
      } else {
        setStadiums(data);
      }

      setLoading(false);
    }

    fetchStadiums();
  }, []);

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
      <h1 className="text-2xl font-bold mb-4">Mes Stades </h1>


      {stadiums.length === 0 ? (
        <p className="text-gray-600">Vous n'avez ajouté aucun stade.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stadiums.map((stadium) => (
            <Card key={stadium.id} className="overflow-hidden">
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

              <CardHeader>
                <CardTitle>{stadium.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {stadium.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700">{stadium.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}


    </div>
  );
}
