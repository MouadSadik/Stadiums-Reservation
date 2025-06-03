"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js 13 App Router
import { Button } from "@/components/ui/button";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "../hooks/useUser";

const NavBar = () => {
  const router = useRouter();
  const { user, userType, userName } = useUser();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login"); // Redirige vers /login après déconnexion
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
            StadiumRes
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/stadiums" className="text-gray-700 hover:text-green-600 transition-colors">
              Browse Stadiums
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-600">
                  Welcome, {userName} ({userType})
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
