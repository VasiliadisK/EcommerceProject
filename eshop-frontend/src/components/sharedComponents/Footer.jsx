import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import cardImg from "../../assets/images/common/cards.png";

const usefulLinks = [
  { label: "Contact", to: "/contact" },
  { label: "About Us", to: "/about" },
  { label: "Privacy Policies", to: "/privacy" },
  { label: "Terms and Conditions", to: "/terms" },
  { label: "Πολιτική επιστροφών και αλλαγών", to: "/returns" },
  { label: "Μεταφορικά και παρακολούθηση παραγγελίας", to: "/shipping" },
];

const socials = [
  { icon: faFacebook, href: "https://facebook.com/fwdejewels" },
  { icon: faInstagram, href: "https://instagram.com/fwdejewels" },
  { icon: faTiktok, href: "https://tiktok.com/@fwdejewels" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-bold mb-6">Χρήσιμοι Σύνδεσμοι</h3>
          <ul className="space-y-3">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-white/80 hover:text-white transition text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">FOLLOW US</h3>

          <div className="flex gap-3 mb-8">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand hover:bg-white/90 transition"
              >
                <FontAwesomeIcon icon={s.icon} className="text-lg" />
              </a>
            ))}
          </div>

          <h4 className="font-bold mb-1">SUBSCRIBE TO OUR NEWSLETTER</h4>
          <p className="text-white/80 text-sm mb-4">για προσφορές και νέα!</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <input
              type="email"
              placeholder="Type your email..."
              className="px-7 py-2.5 rounded-sm w-95 outline-none text-gray-800 bg-white"
            />
            <button className="bg-amber-900 text-white px-4 py-2.5 rounded-sm font-semibold hover:bg-amber-950 transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/80">
            Copyright © {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <img
            src={cardImg}
            alt="Accepted payment methods"
            className="h-7 object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
