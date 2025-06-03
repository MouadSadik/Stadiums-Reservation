import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
    <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of players and stadium owners today!</p>
          <Link href="/login">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 transition-colors">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
  )
}

export default Footer