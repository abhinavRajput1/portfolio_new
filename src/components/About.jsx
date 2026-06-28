import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaShieldAlt, FaNetworkWired, FaCode, FaFlag } from 'react-icons/fa';
import './About.css';

const focusAreas = [
  {
    icon: <FaShieldAlt />,
    title: 'Penetration Testing & Ethical Hacking',
    description: 'Identifying vulnerabilities, exploiting weaknesses, and strengthening defenses through hands-on offensive security techniques.',
  },
  {
    icon: <FaNetworkWired />,
    title: 'Network Security & Digital Forensics',
    description: 'Analyzing network traffic, securing infrastructure, and conducting forensic investigations to trace digital threats.',
  },
  {
    icon: <FaCode />,
    title: 'Frontend Development & UI Design',
    description: 'Building sleek, responsive, and modern web interfaces with performance-first architecture and pixel-perfect design.',
  },
  {
    icon: <FaFlag />,
    title: 'CTF Competitions & Security Research',
    description: 'Competing in Capture The Flag events, researching zero-day exploits, and contributing to the security community.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function FocusCard({ item }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      className="base-card about-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="about-card-icon">
        {item.icon}
      </div>
      <div className="about-card-content">
        <h3 className="about-card-title">{item.title}</h3>
        <p className="about-card-desc">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [headingRef, headingInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">My journey and expertise</p>
        </motion.div>

        <div className="about-content">
          <div className="about-text-content">
            <p className="about-description">
              I'm <strong>Abhinav Singh</strong>, a passionate Cybersecurity Student and Frontend Developer with a deep interest in ethical hacking, penetration testing, and digital forensics. I specialize in identifying vulnerabilities, securing systems, and building sleek modern web interfaces. With experience in CTF competitions and hands-on security tools, I bridge the gap between offensive security and creative development.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-value">CTF</span>
                <span className="stat-label">Competitor</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Pentest</span>
                <span className="stat-label">Enthusiast</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Web</span>
                <span className="stat-label">Developer</span>
              </div>
            </div>
          </div>

          <motion.div
            className="about-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {focusAreas.map((item, index) => (
              <FocusCard key={index} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
