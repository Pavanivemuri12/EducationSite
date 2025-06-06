import { useState } from 'react';
import { Mail, User, Building, Hash, MessageSquare, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    collegeName: '',
    issue: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, rollNumber, collegeName, issue } = formData;

    const subject = encodeURIComponent(`Issue Report from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nRoll Number: ${rollNumber}\nCollege Name: ${collegeName}\n\nIssue:\n${issue}`
    );

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=dorabujji427@gmail.com&su=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank');

    // Optional: Reset the form after opening Gmail
    setFormData({
      name: '',
      email: '',
      rollNumber: '',
      collegeName: '',
      issue: ''
    });
  };

  const isFormValid = formData.name && formData.email && formData.rollNumber && 
                      formData.collegeName && formData.issue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r  from-yellow-500 to-orange-600 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Have a question or issue? We&apos;re here to help! Fill out the form below and it will open Gmail to send us your issue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">

            <div className="group">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="rollNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Roll Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  placeholder="Enter your roll number"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="collegeName" className="block text-sm font-semibold text-gray-700 mb-2">
                College Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  placeholder="Enter your college name"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="issue" className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 resize-none"
                  placeholder="Describe your issue or question in detail..."
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isFormValid
                    ? 'bg-gradient-to-r  from-yellow-500 to-orange-600 hover:from-yellow-500 hover:to-orange-600 hover:scale-105 shadow-lg'
                    : 'bg-yellow-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5 mr-2" />
                Send 
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">You can also email us directly at:</p>
              <a
                href="mailto:dorabujji427@gmail.com"
                className="text-yellow-500 hover:text-orange-600 font-medium"
              >
                dorabujji427@gmail.com
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
