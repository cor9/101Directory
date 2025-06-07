import { NextRequest, NextResponse } from 'next/server'

// Mock listings data
const mockListings = [
  {
    id: 'listing1',
    fields: {
      'Business Name': 'Spotlight Acting Studio',
      'Email': 'info@spotlightacting.com',
      'Phone': '(555) 123-4567',
      'Website': 'https://spotlightacting.com',
      'Category': ['Acting Coaches'],
      'Description': 'Premier acting studio specializing in young performers with over 15 years of experience in the industry.',
      'Location': 'Los Angeles, CA',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': true,
      'Virtual': true,
      'Age Range': ['6-10 years', '11-15 years'],
      'Date Submitted': '2024-01-15'
    }
  },
  {
    id: 'listing2',
    fields: {
      'Business Name': 'Young Talent Photography',
      'Email': 'hello@youngtalentphoto.com',
      'Phone': '(555) 234-5678',
      'Website': 'https://youngtalentphoto.com',
      'Category': ['Photographers'],
      'Description': 'Professional headshot photography for child actors and performers. Specializing in natural, authentic portraits.',
      'Location': 'New York, NY',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': false,
      'Virtual': false,
      'Age Range': ['0-5 years', '6-10 years', '11-15 years'],
      'Date Submitted': '2024-01-10'
    }
  },
  {
    id: 'listing3',
    fields: {
      'Business Name': 'Harmony Voice Academy',
      'Email': 'contact@harmonyvoice.com',
      'Phone': '(555) 345-6789',
      'Website': 'https://harmonyvoice.com',
      'Category': ['Music Lessons'],
      'Description': 'Voice coaching and music lessons for aspiring young performers. Building confidence and technique.',
      'Location': 'Nashville, TN',
      'Status': 'Approved',
      'Featured': false,
      '101 Approved': true,
      'Virtual': true,
      'Age Range': ['6-10 years', '11-15 years', '16-18 years'],
      'Date Submitted': '2024-01-08'
    }
  },
  {
    id: 'listing4',
    fields: {
      'Business Name': 'Creative Kids Art Studio',
      'Email': 'info@creativekidsart.com',
      'Phone': '(555) 456-7890',
      'Website': 'https://creativekidsart.com',
      'Category': ['Art Classes'],
      'Description': 'Art classes and creative workshops for young artists. Fostering creativity and artistic expression.',
      'Location': 'Chicago, IL',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': false,
      'Virtual': false,
      'Age Range': ['0-5 years', '6-10 years'],
      'Date Submitted': '2024-01-05'
    }
  },
  {
    id: 'listing5',
    fields: {
      'Business Name': 'Star Talent Agency',
      'Email': 'casting@startalent.com',
      'Phone': '(555) 567-8901',
      'Website': 'https://startalent.com',
      'Category': ['Talent Agencies'],
      'Description': 'Full-service talent agency representing child actors for film, television, and commercial work.',
      'Location': 'Los Angeles, CA',
      'Status': 'Approved',
      'Featured': false,
      '101 Approved': true,
      'Virtual': false,
      'Age Range': ['6-10 years', '11-15 years', '16-18 years'],
      'Date Submitted': '2024-01-03'
    }
  },
  {
    id: 'listing6',
    fields: {
      'Business Name': 'Bright Minds Tutoring',
      'Email': 'learn@brightminds.com',
      'Phone': '(555) 678-9012',
      'Website': 'https://brightminds.com',
      'Category': ['Educational Services'],
      'Description': 'On-set tutoring and educational support for child performers. Flexible scheduling around auditions and shoots.',
      'Location': 'Atlanta, GA',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': true,
      'Virtual': true,
      'Age Range': ['6-10 years', '11-15 years', '16-18 years'],
      'Date Submitted': '2024-01-01'
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let filteredListings = mockListings.filter(listing => listing.fields.Status === 'Approved')
    
    if (featured === 'true') {
      filteredListings = filteredListings.filter(listing => listing.fields.Featured === true)
    }

    // Sort by featured first, then by 101 Approved, then by date
    filteredListings.sort((a, b) => {
      if (a.fields.Featured !== b.fields.Featured) {
        return b.fields.Featured ? 1 : -1
      }
      if (a.fields['101 Approved'] !== b.fields['101 Approved']) {
        return b.fields['101 Approved'] ? 1 : -1
      }
      return new Date(b.fields['Date Submitted']).getTime() - new Date(a.fields['Date Submitted']).getTime()
    })

    if (limit) {
      filteredListings = filteredListings.slice(0, parseInt(limit))
    }

    return NextResponse.json(filteredListings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}