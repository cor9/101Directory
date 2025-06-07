import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Trusted Services for Young Performers
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Connect with vetted professionals who understand the unique needs 
              of child actors and their families in the entertainment industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/directory"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Browse Directory
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
              >
                List Your Service
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
              alt="Young performers"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}