"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import StadiumForm from "../components/StadForm";
import StadiumByRes from "../components/StadiumByRes";
import { Button } from "@/components/ui/button";

export default function OwnerPage() {
  const [ownerId, setOwnerId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    async function fetchOwnerId() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setOwnerId(user.id);
      }
    }

    fetchOwnerId();
  }, []);



  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Propriétaire</h1>

      {ownerId && (
        <div className="space-y-8 p-4">
          <Button className="bg-red-600 text-white" onClick={handleToggleForm} variant="outline">
            {showForm ? "Fermer le formulaire" : "Ajouter un stade"}
          </Button>

          {showForm && <StadiumForm />}

        </div>
      )}

      {ownerId && <StadiumByRes ownerId={ownerId} />}
    </div>
  );
}
