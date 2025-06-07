import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your payment has been processed successfully. You're one step away from 
            getting your service listed in our directory.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Next Steps
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-primary-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Complete Your Intake Form</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Fill out our detailed intake form with your business information, 
                  services, and photos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-primary-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Quality Review</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Our team will review your submission within 2-3 business days 
                  to ensure quality standards.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-primary-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Go Live</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Once approved, your listing will be live and visible to families 
                  searching for services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://airtable.com/your-intake-form-link" // Replace with actual Airtable form link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-6"
          >
            Complete Intake Form
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          
          <p className="text-sm text-gray-600 mb-8">
            You should also receive an email with this link and further instructions.
          </p>
          
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Questions or Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help you through the process.
            </p>
            <a
              href="mailto:support@childactor101.com"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Contact Support
            </a>
          </div>
          
          <div className="mt-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}