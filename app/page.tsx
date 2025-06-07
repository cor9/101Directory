import Hero from '@/components/Hero'
import FeaturedListings from '@/components/FeaturedListings'
import FeaturedCategories from '@/components/FeaturedCategories'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedListings />
      <CallToAction />
    </>
  )
}