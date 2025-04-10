'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OTPVerificationForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phone');

  useEffect(() => {
    if (!phoneNumber) {
      router.push('/login');
    }
  }, [phoneNumber, router]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    // In a real app, you would verify the OTP here
    router.push('/dashboard'); // Replace with your success route
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      setTimer(30);
      // In a real app, you would resend the OTP here
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#4937CE] mb-2">Verify OTP</h1>
        <p className="text-gray-600">
          Enter the 6-digit code sent to +91 {phoneNumber}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-[#4937CE] focus:ring-2 focus:ring-[#4937CE] outline-none transition-all"
            />
          ))}
        </div>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={timer > 0}
            className={`text-sm ${
              timer > 0
                ? 'text-gray-400'
                : 'text-[#4937CE] hover:text-[#3a2ba3]'
            }`}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#4937CE] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#3a2ba3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4937CE] focus:ring-offset-2"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50">
      <Suspense fallback={
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4937CE] mb-2">Loading...</h1>
          </div>
        </div>
      }>
        <OTPVerificationForm />
      </Suspense>
    </div>
  );
} 