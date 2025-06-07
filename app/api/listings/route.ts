import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let filterFormula = "AND({Status} = 'Approved')"
    
    if (featured === 'true') {
      filterFormula = "AND({Status} = 'Approved', {Featured} = TRUE())"
    }

    const records = await base('Listings').select({
      filterByFormula: filterFormula,
      sort: [
        { field: 'Featured', direction: 'desc' },
        { field: '101 Approved', direction: 'desc' },
        { field: 'Date Submitted', direction: 'desc' }
      ],
      maxRecords: limit ? parseInt(limit) : undefined
    }).all()

    const listings = records.map(record => ({
      id: record.id,
      fields: record.fields
    }))

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}