import React, { useState, useEffect, useRef } from "react";
import { Mail, Smartphone, MapPin, Linkedin } from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-slate-950 py-24 px-6 overflow-hidden transition-colors duration-500"
    >
      {}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div
        className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
              Touch.
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Reach out
            and say hi!
          </p>
        </div>

        <div className="grid grid-cols-1 items-center">
          {}
          <div className="space-y-6">
            <ContactInfoItem
              icon={<Mail className="text-indigo-600 dark:text-indigo-400" />}
              label="Email"
              value="gauravpatel41234@gmail.com"
              href="mailto:gauravpatel41234@gmail.com"
            />
            <ContactInfoItem
              icon={<Smartphone className="text-pink-600 dark:text-pink-400" />}
              label="Phone"
              value="6268694191"
              href="tel:+916268694191"
            />
            <ContactInfoItem
              icon={
                <MapPin className="text-emerald-600 dark:text-emerald-400" />
              }
              label="Location"
              value="Indore, Madhya Pradesh"
            />

            <div className="pt-8">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 ml-1">
                Follow Me
              </p>
              <div className="flex gap-4 ml-6">
                <SocialLink
                  href="https://www.linkedin.com/in/gaurav-patel-sde"
                  icon={<Linkedin />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, label, value, href }) => (
  <div className="group flex items-center p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl shadow-sm flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-slate-900 dark:text-white font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-slate-900 dark:text-white font-semibold">{value}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
  >
    {React.cloneElement(icon, { size: 20 })}
  </a>
);

export default Contact;
