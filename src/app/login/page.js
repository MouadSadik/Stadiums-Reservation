"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("player");

  const router = useRouter(); //  redirection

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignUp) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setErrorMsg(signUpError.message);
          return;
        }

        const user = signUpData.user;
        if (!user) {
          setErrorMsg("Utilisateur non cree.");
          return;
        }

        // Créer le profil
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          role,
        });

        if (profileError) {
          setErrorMsg("Erreur lors de la création du profil.");
          console.error(profileError);
          return;
        }

        alert("Inscription réussie !");
        
        if (profileData.role === "proprietaire") {
          router.push("/owner");
        } else {
          router.push("/player");
        }
        //router.push("/dashboard");
      } else {
        // Connexion
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) {
          setErrorMsg(loginError.message);
          return;
        }

        // Vérifie le rôle après connexion
        const user = loginData.user;
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error(profileError);
          setErrorMsg("Erreur lors de la récupération du profil.");
          return;
        }

        if (profileData.role === "proprietaire") {
          router.push("/owner");
        } else {
          router.push("/player");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">
          {isSignUp ? "Inscription" : "Connexion"}
        </h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
          {isSignUp && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="joueur">Joueur</option>
              <option value="proprietaire">Propriétaire</option>
            </select>
          )}
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            {loading ? "Chargement..." : isSignUp ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
        <p
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-center text-sm text-blue-600 cursor-pointer"
        >
          {isSignUp
            ? "Déjà un compte ? Se connecter"
            : "Pas encore de compte ? S'inscrire"}
        </p>
      </div>
    </div>
  );
}