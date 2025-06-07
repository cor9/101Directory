# Child Actor 101 Directory

A modern, responsive directory application for connecting families with trusted services for young performers in the entertainment industry.

## Features

- **Public Directory**: Browse approved listings with advanced filtering
- **Dynamic Categories**: Categories pulled from Airtable CMS
- **Responsive Design**: Mobile-first design with Child Actor 101 branding
- **Stripe Integration**: Secure payment processing for vendor plans
- **Airtable CMS**: Content management through Airtable
- **Featured Listings**: Highlight premium services
- **101 Approved Badge**: Quality verification system

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database/CMS**: Airtable
- **Payments**: Stripe Checkout
- **Deployment**: Render.com

## Getting Started

### Prerequisites

- Node.js 18+ 
- Airtable account with configured base
- Stripe account (for payment processing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables in `.env.local`:
   - `AIRTABLE_API_KEY`: Your Airtable API key
   - `AIRTABLE_BASE_ID`: Your Airtable base ID

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Airtable Setup

### Listings Table
Required fields:
- Business Name (Single line text)
- Email (Email)
- Phone (Phone)
- Website (URL)
- Category (Linked to Categories table)
- Description (Long text)
- Status (Single select: Pending/Approved/Rejected)
- Featured (Checkbox)
- 101 Approved (Checkbox)

### Categories Table
Required fields:
- Category Name (Single line text)
- Description (Long text, optional)

## Deployment

### Render.com Deployment

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a Web Service
4. Point your domain to the Render URL

### Environment Variables for Production

```
AIRTABLE_API_KEY=your_production_airtable_api_key
AIRTABLE_BASE_ID=your_production_airtable_base_id
NEXT_PUBLIC_SITE_URL=https://directory.childactor101.com
```

## Stripe Integration

Update the Stripe checkout links in `/app/pricing/page.tsx` with your actual Stripe payment links.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── directory/         # Directory page
│   ├── listing/           # Individual listing pages
│   ├── pricing/           # Pricing page
│   └── thank-you/         # Post-purchase page
├── components/            # Reusable components
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support, email support@childactor101.com or create an issue in this repository.