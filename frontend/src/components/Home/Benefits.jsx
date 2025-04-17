import React from 'react';

const Benefits = () => {
  const benefits = {
    organizers: [
      {
        title: 'Easy Event Creation',
        description: 'Create and manage your events with our intuitive dashboard',
        icon: '🎯',
      },
      {
        title: 'Flexible Pricing',
        description: 'Set your own pricing strategy - free, paid, or subscription based',
        icon: '💰',
      },
      {
        title: 'Analytics & Insights',
        description: 'Track attendance, engagement, and revenue with detailed analytics',
        icon: '📊',
      },
    ],
    attendees: [
      {
        title: 'Diverse Content',
        description: 'Access a wide range of workshops, classes, and webinars',
        icon: '🎨',
      },
      {
        title: 'Interactive Learning',
        description: 'Engage with experts and peers in real-time discussions',
        icon: '💡',
      },
      {
        title: 'Flexible Access',
        description: 'Join events from anywhere, on any device',
        icon: '🌐',
      },
    ],
  };

  const BenefitCard = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose WebiLink?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The perfect platform for both event organizers and attendees
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Organizers Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-8 text-center md:text-left">
              For Organizers
            </h3>
            <div className="grid gap-6">
              {benefits.organizers.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>

          {/* Attendees Section */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-8 text-center md:text-left">
              For Attendees
            </h3>
            <div className="grid gap-6">
              {benefits.attendees.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;