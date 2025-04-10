'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit Indian phone number');
      return;
    }
    // In a real app, you would send the OTP here
    router.push(`/verify-otp?phone=${phoneNumber}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4937CE] mb-2">Welcome Back</h1>
          <p className="text-gray-600">Enter your phone number to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">+91</span>
              </div>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                maxLength={10}
                className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4937CE] focus:border-transparent outline-none transition-all"
                placeholder="Enter 10-digit number"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#4937CE] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#3a2ba3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4937CE] focus:ring-offset-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
} 