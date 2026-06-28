import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="contact-wrapper"
        >
          <motion.div variants={itemVariants} className="contact-info">
            <h2 className="section-title" style={{ textAlign: 'left' }}>Get In Touch</h2>
            <p className="contact-subtitle">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="social-links">
              <a href="https://github.com/abhinavRajput1" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/abhinav-singh-959603293" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:abhinavsingh14371@gmail.com" className="social-link" aria-label="Email">
                <FaEnvelope />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
