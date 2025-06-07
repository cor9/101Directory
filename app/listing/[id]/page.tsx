'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, Star, CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react'

interface Listing {
  id: string
  fields: {
    'Business Name': string
    Email?: string
    Phone?: string
    Website?: string
    Instagram?: string
    Category?: string[]
    'Services Offered'?: string
    Description?: string
    Logo?: Array<{ url: string }>
    Gallery?: Array<{ url: string }>
    Location?: string
    Virtual?: boolean
    'Age Range'?: string[]
    Pricing?: string
    Featured?: boolean
    '101 Approved'?: boolean
  }
}

export default function ListingDetailPage() {
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchListing(params.id as string)
    }
  }, [params.id])

  const fetchListing = async (id: string) => {
    try {
      const response = await fetch(`/api/listings/${id}`)
      if (!response.ok) {
        throw new Error('Listing not found')
      }
      const data = await response.json()
      setListing(data)
    } catch (error) {
      console.error('Error fetching listing:', error)
      setError('Listing not found')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-8">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/directory"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
            <p className="text-gray-600 mb-8">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/directory"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse All Listings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/directory"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Image */}
          <div className="relative h-64 bg-gray-100">
            {listing.fields.Logo && listing.fields.Logo[0] ? (
              <Image
                src={listing.fields.Logo[0].url}
                alt={listing.fields['Business Name']}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-100 to-primary-200">
                <span className="text-4xl font-bold text-primary-600">
                  {listing.fields['Business Name'].charAt(0)}
                </span>
              </div>
            )}
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {listing.fields.Featured && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Featured
                </span>
              )}
              {listing.fields['101 Approved'] && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  101 Approved
                </span>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Business Name and Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {listing.fields['Business Name']}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {listing.fields.Location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.fields.Location}
                  </div>
                )}
                
                {listing.fields.Virtual && (
                  <div className="flex items-center text-blue-600">
                    <Globe className="w-4 h-4 mr-1" />
                    Virtual services available
                  </div>
                )}
              </div>

              {/* Categories and Age Range */}
              <div className="flex flex-wrap gap-2 mb-6">
                {listing.fields.Category && listing.fields.Category.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
                
                {listing.fields['Age Range'] && listing.fields['Age Range'].map((age, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {age}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            {listing.fields.Description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.fields.Description}
                </p>
              </div>
            )}

            {/* Services Offered */}
            {listing.fields['Services Offered'] && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Services Offered</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.fields['Services Offered']}
                </p>
              </div>
            )}

            {/* Pricing */}
            {listing.fields.Pricing && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Pricing</h2>
                <p className="text-gray-700 leading-relaxed">
                  {listing.fields.Pricing}
                </p>
              </div>
            )}

            {/* Gallery */}
            {listing.fields.Gallery && listing.fields.Gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listing.fields.Gallery.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={`${listing.fields['Business Name']} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.fields.Email && (
                  <a
                    href={`mailto:${listing.fields.Email}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-900">{listing.fields.Email}</span>
                  </a>
                )}
                
                {listing.fields.Phone && (
                  <a
                    href={`tel:${listing.fields.Phone}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-900">{listing.fields.Phone}</span>
                  </a>
                )}
                
                {listing.fields.Website && (
                  <a
                    href={listing.fields.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-900">Visit Website</span>
                  </a>
                )}
                
                {listing.fields.Instagram && (
                  <a
                    href={listing.fields.Instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-900">Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}