import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, CheckCircle, Globe } from 'lucide-react'

interface Listing {
  id: string
  fields: {
    'Business Name': string
    Description?: string
    Location?: string
    Category?: string[]
    Logo?: Array<{ url: string }>
    Featured?: boolean
    '101 Approved'?: boolean
    Virtual?: boolean
    'Age Range'?: string[]
  }
}

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow card-hover"
    >
      <div className="relative h-48 bg-gray-100">
        {listing.fields.Logo && listing.fields.Logo[0] ? (
          <Image
            src={listing.fields.Logo[0].url}
            alt={listing.fields['Business Name']}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-100 to-primary-200">
            <span className="text-2xl font-bold text-primary-600">
              {listing.fields['Business Name'].charAt(0)}
            </span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {listing.fields.Featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
          {listing.fields['101 Approved'] && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              101 Approved
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {listing.fields['Business Name']}
        </h3>
        
        {listing.fields.Description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {listing.fields.Description.length > 120 
              ? `${listing.fields.Description.substring(0, 120)}...`
              : listing.fields.Description
            }
          </p>
        )}
        
        <div className="space-y-2 mb-4">
          {listing.fields.Location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.fields.Location}
            </div>
          )}
          
          {listing.fields.Virtual && (
            <div className="flex items-center text-sm text-blue-600">
              <Globe className="w-4 h-4 mr-1" />
              Virtual services available
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {listing.fields.Category && listing.fields.Category.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
            >
              {category}
            </span>
          ))}
          
          {listing.fields['Age Range'] && listing.fields['Age Range'].slice(0, 2).map((age, index) => (
            <span
              key={index}
              className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs"
            >
              {age}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}