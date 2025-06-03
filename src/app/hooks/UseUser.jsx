"use client"

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";


export function useUser() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, type")
          .eq("id", user.id)
          .single();

        setUserName(profile?.name || "");
        setUserType(profile?.type || "");
      }
    }

    getUser();
  }, []);

  return { user, userName, userType };
}
