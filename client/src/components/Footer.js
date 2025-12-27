import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaTelegramPlane,
  FaDiscord,
} from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://facebook.com',
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com',
      color: 'hover:bg-sky-500',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500',
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com',
      color: 'hover:bg-red-600',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: 'https://linkedin.com',
      color: 'hover:bg-blue-700',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com',
      color: 'hover:bg-gray-700',
    },
    {
      name: 'Telegram',
      icon: FaTelegramPlane,
      url: 'https://telegram.org',
      color: 'hover:bg-blue-500',
    },
    {
      name: 'Discord',
      icon: FaDiscord,
      url: 'https://discord.com',
      color: 'hover:bg-indigo-600',
    },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart' },
    { name: 'About Us', path: '/about' },
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="footer bg-gradient-to-b from-black via-gray-900 to-black border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold space-font">
              <span className="text-orange-500">HowTo</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for cutting-edge technology products. Experience the future of shopping with Web3 integration.
            </p>
            {/* <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                <MdEmail size={18} />
                <span>support@HowTo.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                <MdPhone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                <MdLocationOn size={18} />
                <span>San Francisco, CA</span>
              </div>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Stay Connected</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Connect With Us</h3>
              <p className="text-gray-400 text-sm">Join our community on social media</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon group relative p-4 bg-gray-800 border-2 border-gray-700 rounded-xl ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl`}
                    aria-label={social.name}
                  >
                    <Icon className="text-white text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
                      {social.name}
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-orange-500"></span>
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-600"></div>
              <span>Follow us for updates & exclusive content</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-600"></div>
            </div>
          </div>
        </div>

        {/* Payment & Trust Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Secure Payment Methods
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-300">
                <span className="text-white font-semibold text-sm">💳 Visa</span>
              </div>
              <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-300">
                <span className="text-white font-semibold text-sm">💳 Mastercard</span>
              </div>
              <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-300">
                <span className="text-white font-semibold text-sm">💰 PayPal</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 border border-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                <span className="text-white font-semibold text-sm">🦊 MetaMask</span>
              </div>
              <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-300">
                <span className="text-white font-semibold text-sm">💎 Stripe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()}{' '}
              <span className="text-white font-semibold">
                <span className="text-orange-500">HowTo</span>
              </span>
              . All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Made with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span className="text-gray-400">by</span>
              <span className="gradient-text font-semibold">HowTo Team</span>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>Web3 Enabled</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-50"></div> */}
      </div>
    </footer>
  );
};

export default Footer;