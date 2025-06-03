import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

const Features = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Why Choose StadiumBook?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚽</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">For Players</h3>
                            <p className="text-gray-600">
                                Find and book available stadiums near you. Filter by sport type, location, and time slots.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏟️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">For Stadium Owners</h3>
                            <p className="text-gray-600">
                                List your stadium and manage bookings easily. Set your availability and pricing.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Easy Payments</h3>
                            <p className="text-gray-600">
                                Secure booking system with instant confirmations and transparent pricing.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

    )
}

export default Features