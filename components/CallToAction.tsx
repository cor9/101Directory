import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to List Your Service?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Join our trusted directory and connect with families looking for quality services 
          for their young performers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Pricing Plans
          </Link>
          <Link
            href="/directory"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </section>
  )
}