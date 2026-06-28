import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaFlag, FaStar, FaAws } from 'react-icons/fa';
import './Achievements.css';

// Import images
import jaipur1 from '../assets/jaipur/1770644486160.jpg';
import jaipur2 from '../assets/jaipur/1770644532441.jpg';
import jaipur3 from '../assets/jaipur/1770644547755.jpg';

import maker1 from '../assets/makerfest/1768801659051.jpg';
import maker2 from '../assets/makerfest/1768801664581.jpg';
import maker3 from '../assets/makerfest/1768801666852.jpg';
import maker4 from '../assets/makerfest/1768801669006.jpg';

import techexpo1 from '../assets/teckexpo/1770217132375.jpg';
import techexpo2 from '../assets/teckexpo/1770217136101.jpg';
import techexpo3 from '../assets/teckexpo/1770217144377.jpg';
import techexpo4 from '../assets/teckexpo/1770217144706.jpg';

import aws1 from '../assets/aws/1757850392664.jpg';
import aws2 from '../assets/aws/1757850396274.jpg';
import aws3 from '../assets/aws/1757850398598.jpg';
import aws4 from '../assets/aws/1757850402043.jpg';
import aws5 from '../assets/aws/1757850407300.jpg';

const achievements = [
  {
    title: 'AWS User Groups Vadodara Community Day 2025',
    type: (
      <>
        Attended the AWS User Groups Vadodara Community Day 2025, an immersive event dedicated to exploring the latest innovations in Cloud Computing, Generative AI, DevOps, and Software Development Lifecycle. The day was filled with deep technical sessions, inspiring talks, and networking opportunities with industry leaders and AWS experts.
      </>
    ),
    icon: <FaAws />,
    date: '2025',
    photos: [aws1, aws2, aws3, aws4, aws5],
  },
  {
    title: 'Participated in MakerFest Vadodara',
    type: "Gujarat's largest open platform for innovation and collaboration, bringing together startups, innovators, educators, and tech enthusiasts from across the country",
    icon: <FaFlag />,
    date: '2026',
    photos: [maker1, maker2, maker3, maker4],
  },
  {
    title: 'Participated in TechExpo 2026',
    type: 'Successfully presented our project EduCatch at TechExpo 2026, Parul University. This experience gave us the opportunity to showcase our innovation, collaborate effectively, and gain valuable industry exposure. Proud of our teamwork and the learning journey we shared. Looking forward to building more innovative solutions together!',
    icon: <FaStar />,
    date: '2026',
    photos: [techexpo1, techexpo2, techexpo3, techexpo4],
  },
  {
    title: 'Top 15 Finish – Cyberthon Hackathon at Aestr Alpha AI Summit 2026',
    type: 'Successfully completed the Cyberthon Hackathon at Suresh Gyan Vihar University, Jaipur. Secured a Top 15 position among many talented innovators in the Innovation, AI & Cybersecurity Challenge. Collaborated with an outstanding team — Sagar Chhetri, Omprakash Meher, and Mansi Jaiswar.',
    icon: <FaTrophy />,
    date: 'February 2026',
    photos: [jaipur1, jaipur2, jaipur3],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// Rotation & offset presets for the scattered fan look
const cardTransforms = [
  { rotate: -12, x: -20, y: 8 },
  { rotate: -5, x: -8, y: -4 },
  { rotate: 3, x: 10, y: 6 },
  { rotate: 10, x: 22, y: -2 },
];

function PhotoGallery({ photos }) {
  const [topIndex, setTopIndex] = useState(photos.length - 1);

  if (!photos || photos.length === 0) return null;

  const showNext = () => {
    setTopIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="achievement-gallery">
      <div className="scattered-stack">
        {photos.map((photo, i) => {
          const transform = cardTransforms[i % cardTransforms.length];
          const isTop = i === topIndex;
          const zIndex = isTop ? 10 : i;

          return (
            <motion.div
              key={i}
              className={`scattered-card ${isTop ? 'is-top' : ''}`}
              onClick={isTop ? showNext : undefined}
              style={{ zIndex, cursor: isTop ? 'pointer' : 'default' }}
              animate={{
                rotate: isTop ? 0 : transform.rotate,
                x: isTop ? 0 : transform.x,
                y: isTop ? -4 : transform.y,
                scale: isTop ? 1.05 : 0.92,
              }}
              whileHover={{
                scale: isTop ? 1.07 : 0.97,
                y: isTop ? -8 : transform.y - 6,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img
                src={photo}
                alt={`Event photo ${i + 1}`}
                className="scattered-card-img"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AchievementItem({ item }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="achievement-item"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="achievement-icon-container">
        {item.icon}
      </div>
      <div className="base-card achievement-card">
        <span className="achievement-date">{item.date}</span>
        <h3 className="achievement-title">{item.title}</h3>
        <div className="achievement-type">{item.type}</div>
        <PhotoGallery photos={item.photos} />
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <div className="achievements-header">
          <h2 className="section-title">Events and Hackathons</h2>
          <p className="section-subtitle">Milestones in my cybersecurity journey.</p>
        </div>

        <motion.div
          className="timeline-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="timeline-line"></div>
          {achievements.map((item, index) => (
            <AchievementItem key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
