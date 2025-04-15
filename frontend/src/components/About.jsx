import React from 'react';

const About = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About WebiLink
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting people through meaningful virtual events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At WebiLink, we believe in the power of connection. Our mission is to create a platform
              where knowledge sharing becomes seamless, engaging, and accessible to everyone.
            </p>
            <p className="text-lg text-gray-600">
              We strive to break down geographical barriers and bring together experts, learners,
              and enthusiasts from around the world through high-quality virtual events.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-xl text-white text-center">
            <div className="text-6xl mb-4">🌐</div>
            <p className="text-xl font-semibold">Global Community</p>
            <p>Connecting people across borders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              Leveraging cutting-edge technology to deliver seamless virtual experiences
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">
              Building meaningful connections through shared interests and learning
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600">
              Ensuring high-quality content and experiences in every event
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Join Our Journey</h2>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;