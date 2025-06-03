import React from 'react'
import NavBar from './NavBar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Hero = () => {
    return (
        <div className="">
            <section className="bg-gradient-to-br from-red-500 via-blue-500 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Book Your Perfect Stadium
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Connect stadium owners with players. Find the perfect field for your next game or rent out your stadium to earn extra income.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/stadiums">
                            <Button
                                size="lg"
                                className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 transition-all transform hover:scale-105"
                            >
                                Browse Stadiums
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-red-600 hover:bg-white hover:text-red-700 transition-all transform hover:scale-105"
                            >
                                Join Platform
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero