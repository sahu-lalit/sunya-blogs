'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaMapMarkerAlt,
  FaTelegram,
  FaInstagram,
  FaUserShield,
  FaFileContract,
  FaBriefcase,
  FaUndoAlt,
} from "react-icons/fa";

import { sendSubscriptionEnquiry, fetchCoachingCenters } from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import { CoachingCenter } from "../../types/blog";

function SubscriptionEnquiryForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', mobileNumber: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await sendSubscriptionEnquiry(form);
      showToast(res.message || "Submitted successfully. Our team will contact you soon.", "success");
      setForm({ name: '', email: '', mobileNumber: '' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="px-5 py-2 w-full rounded-full bg-white border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800 placeholder-gray-400 text-sm shadow-sm"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="px-5 py-2 w-full rounded-full bg-white border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800 placeholder-gray-400 text-sm shadow-sm"
        required
      />
      <input
        type="tel"
        name="mobileNumber"
        placeholder="Your Mobile Number"
        value={form.mobileNumber}
        onChange={handleChange}
        className="px-5 py-2 w-full rounded-full bg-white border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800 placeholder-gray-400 text-sm shadow-sm"
        pattern="[0-9]{10}"
        maxLength={10}
        required
      />
      <button
        type="submit"
        className="bg-pink-600 text-white hover:bg-white hover:text-pink-600 px-5 py-2 font-medium rounded-full w-full transition-all duration-200 disabled:opacity-60 shadow-md border border-pink-600"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function Footer() {
  const { showToast } = useToast();
  const [coachingCenters, setCoachingCenters] = useState<CoachingCenter[]>([]);
  const [loadingCenters, setLoadingCenters] = useState(true);

  useEffect(() => {
    const loadCoachingCenters = async () => {
      try {
        setLoadingCenters(true);
        const response = await fetchCoachingCenters();
        if (response.status === 200) {
          setCoachingCenters(response.coachingCenters.filter(center => center.is_active === 1));
        }
      } catch (error) {
        console.error('Failed to load coaching centers:', error);
        // Try to get fallback data from the API function
        try {
          const fallbackResponse = await fetchCoachingCenters();
          if (fallbackResponse.status === 200) {
            setCoachingCenters(fallbackResponse.coachingCenters.filter(center => center.is_active === 1));
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          showToast('Unable to load coaching center information.', 'error');
        }
      } finally {
        setLoadingCenters(false);
      }
    };

    loadCoachingCenters();
  }, []);

  return (
    <footer className="bg-pink-700 text-white">
      {/* Top Section */}
      <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Contact */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* <img
                src="/images/logo.svg"
                alt="Sunya IAS Logo"
                className="h-10 w-auto"
              /> */}
              <span className="text-xl font-bold">Sunya IAS</span>
            </div>
            <p className="mb-6 text-pink-100 leading-relaxed">
              Empowering aspirants with quality education and comprehensive guidance
              for competitive exams.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaPhone className="mt-1 text-pink-200" />
                <div>
                  <p className="text-pink-100 text-sm">Got Questions? Call us</p>
                  <p className="text-lg font-bold">+91 8595352083</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-pink-200" />
                <p>sunyahindicare@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-pink-600">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Notes", path: "https://www.sunyaiashindi.com/notes" },
                { name: "Prelims Tests", path: "https://www.sunyaiashindi.com/prelims-tests" },
                { name: "Mains Tests", path: "https://www.sunyaiashindi.com/mains-tests" },
                { name: "Video Courses", path: "https://www.sunyaiashindi.com/video-courses" },
                { name: "Optionals", path: "https://www.sunyaiashindi.com/optionals" },
                { name: "PCS", path: "https://www.sunyaiashindi.com/pcs" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-pink-100 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-pink-600">About Us</h3>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', path: 'https://www.sunyaiashindi.com/privacy-policy', icon: <FaUserShield /> },
                { name: 'Terms & Conditions', path: 'https://www.sunyaiashindi.com/terms-conditions', icon: <FaFileContract /> },
                { name: 'Careers', path: 'https://forms.gle/SYVkyDJW9rMo4pRw7', icon: <FaBriefcase /> },
                { name: 'Refund Policy', path: 'https://www.sunyaiashindi.com/refund-policy', icon: <FaUndoAlt /> },
              ].map((item) => (
                <li key={item.name} className="flex items-start gap-2">
                  <span className="mt-1 text-pink-200 flex-shrink-0">{item.icon}</span>
                  {item.path.startsWith('/') ? (
                    <Link href={item.path} className="text-pink-100 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      className="text-pink-100 hover:text-white transition-colors"
                      target={item.path.startsWith('http') ? '_blank' : '_self'}
                      rel={item.path.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Speak to our admission team */}
          <div>
            {/* <h3 className="text-lg font-bold mb-6 pb-2 border-b border-pink-600">Speak to our admission team</h3>
            <p className="mb-4 text-pink-100">
              Please submit your details and our admission team will contact you soon.
            </p> */}
            {/* Subscription Enquiry Form */}
            {/* <SubscriptionEnquiryForm /> */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-pink-200">FOLLOW US</h4>
              <div className="flex gap-4">
                {[
                  { icon: <FaTelegram />, url: 'https://t.me/sunyanotes50', color: 'hover:text-blue-400' },
                  { icon: <FaFacebookF />, url: 'https://www.facebook.com/people/Sunyaias/100078948572008/', color: 'hover:text-blue-600' },
                  { icon: <FaInstagram />, url: 'https://www.instagram.com/sunya_ias/', color: 'hover:text-pink-500' },
                  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/company/sunya-ias-upsc-preparation/', color: 'hover:text-blue-700' },
                  { icon: <FaYoutube />, url: 'https://www.youtube.com/channel/UC7874t7eam9uWOacxOQDMiw', color: 'hover:text-red-600' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xl p-2 rounded-full bg-pink-600 hover:bg-white ${social.color} transition-all`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Us Section */}
      <div className="bg-pink-700 py-10 px-6 sm:px-8 lg:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Visit Our Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingCenters ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-pink-800 p-5 rounded-lg shadow-sm animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-pink-700 px-3 py-1 rounded-full h-6 w-20"></div>
                  </div>
                  <div className="bg-pink-700 h-4 rounded mb-3"></div>
                  <div className="bg-pink-700 h-4 rounded mb-3 w-3/4"></div>
                  <div className="bg-pink-700 h-4 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              coachingCenters.map((center) => (
                <div key={center.id} className="bg-pink-800 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                      #{center.city}
                    </span>
                  </div>
                  <p className="text-pink-100 mb-3">{center.address}</p>
                  <p className="font-medium mb-3">Contact: {center.mobileNo}</p>
                  <a
                    href={center.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:text-yellow-200 text-sm font-medium flex items-center gap-1"
                  >
                    <FaMapMarkerAlt /> View Location
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-gray-900 text-center text-gray-300 py-5 text-sm">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Sunya Notes Private limited. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="https://www.sunyaiashindi.com/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="https://www.sunyaiashindi.com/terms-conditions" className="hover:text-white">Terms & Conditions</Link>
            <Link href="https://www.sunyaiashindi.com/refund-policy" className="hover:text-white">Refund Policy</Link>
          </div>
          {/* <p className="mt-2 text-xs text-gray-500">Registered Brand Name "Sunya IAS" and Company name "Sunya Notes Private Limited"</p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;