'use client';

import React, { useState } from "react";
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

import { sendSubscriptionEnquiry } from "../../utils/api";
import { useToast } from "../../context/ToastContext";

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
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-pink-600">Speak to our admission team</h3>
            <p className="mb-4 text-pink-100">
              Please submit your details and our admission team will contact you soon.
            </p>
            {/* Subscription Enquiry Form */}
            <SubscriptionEnquiryForm />
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
            {[
              {
                city: 'Delhi',
                address: '56/3, Bada Bazar, Old Rajinder Nagar, New Delhi – 110060',
                contact: '8279688595',
                mapUrl: 'https://goo.gl/maps/g2Zzpw9zGTUXfueU8'
              },
              {
                city: 'Bengaluru',
                address: '80 Feet Rd. above bank of Baroda, behind Chandragiri Palace, 2nd Block, Nagarbhavi 1st Stage. Chandra Layout, circle, Bengaluru, Karnataka 560040',
                contact: '9611212771',
                mapUrl: 'https://maps.app.goo.gl/8hNNY3cSUPrkotrF8'
              },
              {
                city: 'Pune',
                address: 'Adjacent to SVC cooperative Bank, Limaye wadi, Sadashiv Peth, Pune 411030',
                contact: '9205553486',
                mapUrl: 'https://www.google.com/maps/place/SUNYA+IAS/@18.5102477,73.8470972,15z/data=!4m6!3m5!1s0x3bc2c1caddd2e041:0x1c20e35694aed25b!8m2!3d18.5102477!4d73.8470972!16s%2Fg%2F11jsxy8rw5?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D'
              },
              {
                city: 'Ahmedabad',
                address: '112, A Ratna Business Center. Opp HK College, Ashram Road, Ahmedabad -380009',
                contact: '9925986994',
                mapUrl: 'https://www.google.com/maps/place/Sunya+IAS+Academy+-+Best+IAS+Coaching+in+Ahmedabad+UPSC+%26+GPSC+Coaching+Class+in+Ahmedabad+GPSC+English+medium%2F%E0%AA%97%E0%AB%81%E0%AA%9C%E0%AA%B0%E0%AA%BE%E0%AA%A4%E0%AB%80+%E0%AA%AE%E0%AA%BE%E0%AA%A7%E0%AB%8D%E0%AA%AF%E0%AA%AE/@23.0335784,72.5585274,15z/data=!4m6!3m5!1s0x395e8588b7a22fe7:0x54100a268092e168!8m2!3d23.0297117!4d72.5698482!16s%2Fg%2F11t_j12t_n?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D'
              },
              {
                city: 'Jammu',
                address: '48 C/C, Greenbelt Park Gandhinagar Jammu, J&K 180004',
                contact: '9205553481',
                mapUrl: 'https://www.google.com/maps/place/WING+EK+UDAAN/@32.7075468,74.864534,15z/data=!4m6!3m5!1s0x391e85d438fa33d9:0x447d5e5355456a1b!8m2!3d32.7075468!4d74.864534!16s%2Fg%2F11qy681dtt?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D'
              },
            ].map((location, index) => (
              <div key={index} className="bg-pink-800 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                    #{location.city}
                  </span>
                </div>
                <p className="text-pink-100 mb-3">{location.address}</p>
                <p className="font-medium mb-3">Contact: {location.contact}</p>
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-medium flex items-center gap-1"
                >
                  <FaMapMarkerAlt /> View Location
                </a>
              </div>
            ))}
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