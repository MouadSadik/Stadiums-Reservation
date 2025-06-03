"use client";

import StadiumForm from "../components/StadForm";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";


export default function OwnerPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionUser = supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Proprietaire</h1>
      <StadiumForm ownerId={user.id} />
    </div>
  );
}
