import {
  FiMail,
  FiMapPin,
  FiGlobe,
  FiHeart
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 border-t border-white/10"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiMail className="w-6 h-6 text-blue-400" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                <span className="sr-only">TempMailr</span>
                Temp<span className="text-blue-400">Mailr</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full ml-2 align-middle">PREMIUM</span>
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The most secure temporary email service with military-grade encryption and complete anonymity.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://twitter.com/tempmailr" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Twitter"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://github.com/tempmailr" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="View our GitHub repository"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/tempmailr" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Connect with us on LinkedIn"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <FiMail className="w-4 h-4 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:support@tempmailr.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  support@tempmailr.com
                </a>
              </li>
              <li className="flex items-start">
                <FiMapPin className="w-4 h-4 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-400">San Francisco, CA</span>
              </li>
              <li className="flex items-start">
                <FiGlobe className="w-4 h-4 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-400">English</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" aria-hidden="true"></div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-6">
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              aria-label="Privacy policy"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              aria-label="Terms of service"
            >
              Terms of Service
            </a>
            <a 
              href="/cookies" 
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              aria-label="Cookie policy"
            >
              Cookie Policy
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-500">
              © {currentYear} TempMailr Technologies, Inc. All rights reserved.
              <span className="block md:inline md:ml-2">
                Built with <FiHeart className="inline w-3 h-3 text-red-500" aria-hidden="true" /> for privacy.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}