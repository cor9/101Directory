import { NextResponse } from 'next/server'
import Airtable from 'airtable'

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!)

export async function GET() {
  try {
    const records = await base('Categories').select({
      sort: [{ field: 'Category Name', direction: 'asc' }]
    }).all()

    const categories = records.map(record => ({
      id: record.id,
      fields: record.fields
    }))

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}