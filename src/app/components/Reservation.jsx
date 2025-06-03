"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Reservation() {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [reservationDate, setReservationDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

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

  async function handleReservation(stadiumId) {
    if (!reservationDate || !timeSlot) {
      alert("Merci de remplir la date et le créneau horaire !");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const playerId = userData?.user?.id;

    if (!playerId) {
      alert("Non connecté !");
      return;
    }

    const { error } = await supabase.from("reservations").insert({
      stadium_id: stadiumId,
      player_id: playerId,
      reservation_date: reservationDate,
      time_slot: timeSlot,
    });

    if (error) {
      alert("Erreur lors de la réservation : " + error.message);
    } else {
      alert("Réservation réussie !");
      // Reset
      setReservationDate("");
      setTimeSlot("");
      setSelectedStadium(null);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenue, Joueur !</h1>

      {loading && <p>Chargement des stades...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stadiums.map((stadium) => (
          <div key={stadium.id} className="border rounded p-4 shadow bg-white">
            <img
              src={stadium.image_url}
              alt={stadium.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{stadium.name}</h2>
            <p className="text-sm text-gray-600">{stadium.location}</p>
            <p className="text-sm">{stadium.description}</p>

            {selectedStadium === stadium.id && (
              <div className="mt-2 space-y-2">
                <input
                  type="date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Créneau horaire (ex: 10:00-12:00)"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <button
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 w-full"
                  onClick={() => handleReservation(stadium.id)}
                >
                  Confirmer la réservation
                </button>
              </div>
            )}

            <button
              className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 w-full"
              onClick={() => setSelectedStadium(stadium.id)}
            >
              Réserver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
