import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTiktok,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import Header from "../components/sharedComponents/Header";
import Footer from "../components/sharedComponents/Footer";
import FadeIn from "../util/FadeInTag";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (name) =>
    `w-full bg-transparent border-b py-3 text-sm outline-none transition-all duration-300 placeholder-stone-400 ${
      focused === name
        ? "border-stone-800 text-stone-900"
        : "border-stone-300 text-stone-700"
    }`;

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Header />
      <FadeIn>
        <div className="pt-16 pb-10 px-6 max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-3">
            Fwde Jewels
          </p>
          <h1 className="text-5xl font-light text-stone-800 tracking-tight">
            Contact Us
          </h1>
          <div className="mt-4 w-12 h-px bg-stone-400"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label className="block text-xs tracking-widest text-stone-400 uppercase mb-4">
                    ΟΝΟΜΑΤΕΠΩΝΥΜΟ <span className="text-rose-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="όνομα"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocused("firstName")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("firstName")}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Επίθετο"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocused("lastName")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("lastName")}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest text-stone-400 uppercase mb-4">
                    Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={inputClass("email")}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest text-stone-400 uppercase mb-4">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Πως μπορώ να σας βοηθήσω;"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className=" cursor-pointer group relative overflow-hidden bg-stone-800 text-white text-xs tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 hover:bg-stone-700"
                >
                  <span className="relative z-10">ΣΤΕΙΛΕ ΜΗΝΥΜΑ</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-start justify-center h-64">
                <div className="w-10 h-px bg-stone-400 mb-6"></div>
                <p className="text-2xl font-light text-stone-700 mb-2">
                  Thank you ✦
                </p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  We received your message and will get back to you shortly.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 lg:pt-1">
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-1">
                Get in touch
              </p>
              <div className="w-6 h-px bg-stone-300 mt-3"></div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-stone-400 w-4 h-4"
                />
                <p className="text-xs tracking-widest text-stone-400 uppercase">
                  Location
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Κομνηνών 17, Κέντρο
                  <br />
                  Θεσσαλονίκης, 7ος
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-stone-400 w-4 h-4"
                />
                <p className="text-xs tracking-widest text-stone-400 uppercase">
                  Hours
                </p>
                <p className="text-sm text-stone-500 italic mb-1">
                  Τσέκαρε τις ώρες στο Google
                </p>
                <p className="text-sm text-stone-700">
                  Κυριακή με Τρίτη: Κλειστά
                </p>
                <p className="text-sm text-stone-700">
                  Τετάρτη – Σάββατο: 12:00 – 18:00
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  (εξαιρούνται οι αργίες)
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-stone-400 w-4 h-4"
                />
                <p className="text-xs tracking-widest text-stone-400 uppercase">
                  Email
                </p>
                <a
                  href="mailto:fwdejewels@yahoo.com"
                  className="text-sm text-stone-700 hover:text-stone-900 transition-colors underline underline-offset-4 decoration-stone-300"
                >
                  fwdejewels@yahoo.com
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-stone-400 w-4 h-4"
                />
                <p className="text-xs tracking-widest text-stone-400 uppercase">
                  Phone
                </p>
                <p className="text-sm text-stone-700 hover:text-stone-900 transition-colors underline underline-offset-4 decoration-stone-300 font-sans">
                  6949220551
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs tracking-widest text-stone-400 uppercase">
                  Social
                </p>
                <div className="space-y-3 mt-1">
                  <a href="#" className="flex items-center gap-3 group">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-[#E1306C] w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      Instagram
                    </span>
                  </a>
                  <a href="#" className="flex items-center gap-3 group">
                    <FontAwesomeIcon
                      icon={faTiktok}
                      className="text-stone-800 w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      TikTok
                    </span>
                  </a>
                  <a href="#" className="flex items-center gap-3 group">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-[#1877F2] w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      Facebook
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </FadeIn>
    </div>
  );
}
