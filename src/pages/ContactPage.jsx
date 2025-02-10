import React from "react";

const ContactPage = () => {
  return (
    <div>
      <div class="min-h-screen bg-gray-50 py-10 mt-[50px] px-4">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-800 mb-2">Get in Touch</h1>
            <p class="text-gray-600 text-lg">
              We'd love to hear from you! Fill out the form below or reach us at
              our office.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                Contact Us
              </h2>
              <form class="space-y-4">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Type your message here..."
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 20.487A17.926 17.926 0 0012 21c-5.523 0-10-4.477-10-10S6.477 1 12 1s10 4.477 10 10c0 1.86-.564 3.59-1.523 5.013"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold">Our Address</h4>
                  <p class="text-gray-600">
                    123 Main Street, Suite 100
                    <br />
                    Cityville, ST 12345
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold">Email Us</h4>
                  <p class="text-gray-600">contact@company.com</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 4h14a2 2 0 012 2v4M5 4v16a2 2 0 002 2h10a2 2 0 002-2V4M5 20l6-6"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold">Call Us</h4>
                  <p class="text-gray-600">(123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Find Us Here
            </h2>
            <div class="h-[300px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509151!2d144.95373531531683!3d-37.817209979751654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2s123%20Main%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1600846012330!5m2!1sen!2sus"
                width="100%"
                height="100%"
                allowfullscreen=""
                loading="lazy"
                class="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
