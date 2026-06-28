import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Metadata Sanitiser',
    description: 'A metadata sanitization tool that removes sensitive metadata from files for enhanced privacy and security.',
    features: ['Secure file processing', 'Metadata analysis', 'Privacy protection'],
    tech: ['Python', 'Security'],
    github: 'https://github.com/abhinavRajput1',
  },
  {
    title: 'Phishing Link Identifier',
    description: 'An HTML-based phishing URL detection tool that identifies and analyzes malicious links.',
    features: ['URL analysis', 'Phishing detection', 'Threat identification'],
    tech: ['HTML', 'JavaScript', 'Security'],
    github: 'https://github.com/abhinavRajput1',
  },
  {
    title: 'Cyber Game',
    description: 'An interactive cybersecurity awareness game that teaches users about cyber threats and security best practices.',
    features: ['Gamified learning', 'Security awareness', 'Interactive gameplay'],
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/abhinavRajput1',
  },
  {
    title: 'CrimeGPT',
    description: 'An AI-powered tool designed to assist in crime analysis, investigation support, and threat intelligence processing.',
    features: ['AI integration', 'Crime analysis', 'Threat intelligence'],
    tech: ['Python', 'AI/ML', 'Security'],
    github: 'https://github.com/abhinavRajput1/crimegpt.git',
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function ProjectCard({ project }) {
  return (
    <motion.div variants={cardVariants} className="base-card project-card">
      <div className="project-card-header">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      
      <div className="project-features">
        <ul>
          {project.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div className="project-tech">
        {project.tech.map((t, idx) => (
          <span key={idx} className="tech-badge">{t}</span>
        ))}
      </div>
      
      <div className="project-footer">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaGithub /> View Source
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A selection of my recent cybersecurity and development work.</p>
        </div>

        <motion.div
          ref={ref}
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
