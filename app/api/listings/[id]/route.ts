import { NextRequest, NextResponse } from 'next/server'

// Mock listings data (same as in route.ts)
const mockListings = [
  {
    id: 'listing1',
    fields: {
      'Business Name': 'Spotlight Acting Studio',
      'Email': 'info@spotlightacting.com',
      'Phone': '(555) 123-4567',
      'Website': 'https://spotlightacting.com',
      'Instagram': 'https://instagram.com/spotlightacting',
      'Category': ['Acting Coaches'],
      'Services Offered': 'Scene study, monologue coaching, audition preparation, on-camera technique, improvisation classes',
      'Description': 'Premier acting studio specializing in young performers with over 15 years of experience in the industry. Our experienced coaches have worked with hundreds of successful child actors.',
      'Location': 'Los Angeles, CA',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': true,
      'Virtual': true,
      'Age Range': ['6-10 years', '11-15 years'],
      'Pricing': 'Private lessons: $75/hour, Group classes: $45/hour, Package deals available',
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
      'Instagram': 'https://instagram.com/youngtalentphoto',
      'Category': ['Photographers'],
      'Services Offered': 'Headshots, portfolio photography, comp cards, family portraits, event photography',
      'Description': 'Professional headshot photography for child actors and performers. Specializing in natural, authentic portraits that capture personality and range.',
      'Location': 'New York, NY',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': false,
      'Virtual': false,
      'Age Range': ['0-5 years', '6-10 years', '11-15 years'],
      'Pricing': 'Headshot sessions start at $350, Portfolio packages from $750',
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
      'Services Offered': 'Voice lessons, piano instruction, music theory, performance coaching, recording sessions',
      'Description': 'Voice coaching and music lessons for aspiring young performers. Building confidence and technique through personalized instruction.',
      'Location': 'Nashville, TN',
      'Status': 'Approved',
      'Featured': false,
      '101 Approved': true,
      'Virtual': true,
      'Age Range': ['6-10 years', '11-15 years', '16-18 years'],
      'Pricing': 'Lessons from $60/hour, Virtual lessons $45/hour',
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
      'Services Offered': 'Drawing classes, painting workshops, sculpture, digital art, portfolio development',
      'Description': 'Art classes and creative workshops for young artists. Fostering creativity and artistic expression in a supportive environment.',
      'Location': 'Chicago, IL',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': false,
      'Virtual': false,
      'Age Range': ['0-5 years', '6-10 years'],
      'Pricing': 'Classes from $35/session, Monthly packages available',
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
      'Services Offered': 'Talent representation, casting submissions, career guidance, contract negotiation',
      'Description': 'Full-service talent agency representing child actors for film, television, and commercial work. Established relationships with top casting directors.',
      'Location': 'Los Angeles, CA',
      'Status': 'Approved',
      'Featured': false,
      '101 Approved': true,
      'Virtual': false,
      'Age Range': ['6-10 years', '11-15 years', '16-18 years'],
      'Pricing': 'Commission-based representation (10-20%)',
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
      'Services Offered': 'On-set tutoring, academic support, test preparation, homeschool assistance',
      'Description': 'On-set tutoring and educational support for child performers. Flexible scheduling around auditions and shoots with certified teachers.',
      'Location': 'Atlanta, GA',
      'Status': 'Approved',
      'Featured': true,
      '101 Approved': true,
      'Virtual': true,
      'Age Range': ['6-10 years', '11-15 years', '16-18 years'],
      'Pricing': 'Tutoring from $50/hour, On-set rates $75/hour',
      'Date Submitted': '2024-01-01'
    }
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listing = mockListings.find(listing => listing.id === params.id)
    
    if (!listing || listing.fields.Status !== 'Approved') {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(listing)
  } catch (error) {
    console.error('Error fetching listing:', error)
    return NextResponse.json(
      { error: 'Listing not found' },
      { status: 404 }
    )
  }
}