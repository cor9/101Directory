import Link from 'next/link'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '$12',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      'Basic listing in directory',
      'Contact information display',
      'Category placement',
      'Mobile-friendly listing page'
    ],
    stripeLink: '#', // Replace with actual Stripe link
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Most popular choice',
    features: [
      'Everything in Basic',
      'Enhanced listing with logo',
      'Photo gallery (up to 5 images)',
      'Detailed service descriptions',
      'Priority in search results'
    ],
    stripeLink: '#', // Replace with actual Stripe link
    popular: true
  },
  {
    name: 'Premium',
    price: '$59',
    period: '/month',
    description: 'Maximum visibility',
    features: [
      'Everything in Pro',
      'Featured listing badge',
      'Homepage featured section',
      'Unlimited photo gallery',
      'Social media links',
      'Priority customer support'
    ],
    stripeLink: '#', // Replace with actual Stripe link
    popular: false
  },
  {
    name: '101 Add-On',
    price: '$35',
    period: '/month',
    description: 'Child Actor 101 Approved',
    features: [
      'Add to any existing plan',
      '101 Approved verification badge',
      'Enhanced trust and credibility',
      'Special placement in results',
      'Quality assurance seal'
    ],
    stripeLink: '#', // Replace with actual Stripe link
    popular: false,
    addon: true
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            List Your Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our trusted directory and connect with families looking for quality services 
            for their young performers. Choose the plan that's right for your business.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg shadow-sm border-2 transition-all hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary-500 ring-2 ring-primary-200' 
                  : plan.addon
                  ? 'border-yellow-400'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              {plan.addon && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Add-On
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                  {plan.addon && (
                    <p className="text-sm text-yellow-600 mt-1">
                      Launch price - add to any plan
                    </p>
                  )}
                  {!plan.addon && (
                    <p className="text-sm text-green-600 mt-1">
                      Launch price
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.stripeLink}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : plan.addon
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What happens after purchase?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="text-primary-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Complete Payment</h3>
                <p className="text-gray-600 text-sm">
                  Secure checkout through Stripe with your chosen plan
                </p>
              </div>
              <div>
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="text-primary-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fill Intake Form</h3>
                <p className="text-gray-600 text-sm">
                  Complete our detailed intake form with your business information
                </p>
              </div>
              <div>
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="text-primary-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Go Live</h3>
                <p className="text-gray-600 text-sm">
                  Your listing goes live after our quality review process
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does it take for my listing to go live?
              </h3>
              <p className="text-gray-600">
                After completing your intake form, our team reviews all submissions within 2-3 business days. 
                You'll receive an email confirmation once your listing is approved and live.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I upgrade my plan later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade your plan at any time. Contact our support team and we'll help you 
                transition to a higher tier plan.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                What is the 101 Add-On?
              </h3>
              <p className="text-gray-600">
                The 101 Add-On provides additional verification and a special "101 Approved" badge that 
                shows families you meet our enhanced quality standards. This can be added to any base plan.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Have questions? We're here to help.
          </p>
          <a
            href="mailto:support@childactor101.com"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  )
}