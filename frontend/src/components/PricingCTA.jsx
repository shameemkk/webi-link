import React from 'react';
import {useNavigate } from 'react-router-dom';

const PricingCTA = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        'Host up to 3 events',
        'Up to 50 attendees per event',
        'Basic analytics',
        'Email support',
      ],
      buttonText: 'Start Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '29',
      description: 'For growing communities',
      features: [
        'Unlimited events',
        'Up to 500 attendees per event',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'Recording storage',
      ],
      buttonText: 'Go Pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '99',
      description: 'For large organizations',
      features: [
        'Unlimited everything',
        'Custom attendee limit',
        'Dedicated support',
        'API access',
        'SSO integration',
        'Custom solutions',
      ],
      buttonText: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Hosting?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${plan.highlighted ? 'transform scale-105' : ''} 
                bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                ${plan.highlighted ? 'border-2 border-blue-500' : ''}`}
            >
              <div className={`p-8 ${plan.highlighted ? 'bg-blue-50' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300
                    ${plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="px-8 pb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Contact our sales team
          </p>
          <button onClick={() => handleNavigation('/contact')} className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;