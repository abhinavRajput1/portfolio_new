import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaReact, FaPython, FaLinux } from 'react-icons/fa';
import { SiJavascript, SiKalilinux } from 'react-icons/si';
import './Hero.css';

const techCards = [
  { name: 'Python', icon: <FaPython />, color: '#3776AB' },
  { name: 'Linux', icon: <FaLinux />, color: '#FCC624' },
  { name: 'Security', icon: <SiKalilinux />, color: '#557C94' },
  { name: 'React', icon: <FaReact className="spin-slow" />, color: '#61DAFB' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
];

function DockCard({ card, mouseX, index }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return val - center;
  });

  // Magnification: closer to cursor = bigger
  const size = useSpring(
    useTransform(distance, [-250, -100, 0, 100, 250], [110, 140, 190, 140, 110]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  const iconSize = useSpring(
    useTransform(distance, [-250, -100, 0, 100, 250], [44, 56, 84, 56, 44]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  const yOffset = useSpring(
    useTransform(distance, [-250, -100, 0, 100, 250], [0, -12, -36, -12, 0]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  const glowOpacity = useSpring(
    useTransform(distance, [-200, -80, 0, 80, 200], [0, 0.3, 0.8, 0.3, 0]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  const borderOpacity = useSpring(
    useTransform(distance, [-150, -60, 0, 60, 150], [0.15, 0.4, 1, 0.4, 0.15]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  return (
    <motion.div
      ref={ref}
      className="dock-card"
      style={{
        width: size,
        height: size,
        y: yOffset,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Glow ring */}
      <motion.div
        className="dock-card-glow"
        style={{
          opacity: glowOpacity,
          boxShadow: `0 0 30px ${card.color}40, 0 0 60px ${card.color}20`,
          borderColor: card.color,
        }}
      />
      {/* Card body */}
      <motion.div
        className="dock-card-inner"
        style={{
          borderColor: useTransform(
            borderOpacity,
            (o) => `${card.color}${Math.round(o * 255).toString(16).padStart(2, '0')}`
          ),
        }}
      >
        <motion.div
          className="dock-card-icon"
          style={{
            fontSize: iconSize,
            color: card.color,
          }}
        >
          {card.icon}
        </motion.div>
      </motion.div>
      {/* Label with tooltip style */}
      <motion.span
        className="dock-card-label"
        style={{
          opacity: useTransform(distance, [-100, -40, 0, 40, 100], [0, 0.8, 1, 0.8, 0]),
          y: useTransform(distance, [-100, 0, 100], [5, 0, 5]),
          color: card.color,
        }}
      >
        {card.name}
      </motion.span>
      {/* Reflection dot */}
      <motion.div
        className="dock-card-dot"
        style={{
          backgroundColor: card.color,
          opacity: glowOpacity,
        }}
      />
    </motion.div>
  );
}

function Hero() {
  const mouseX = useMotionValue(-1000);
  const [isMobile, setIsMobile] = useState(false);
  const dockRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
  };

  return (
    <section id="hero" className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-top-info"
      >
        <div className="info-item">
          <span>Cybersecurity Student</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="hero-main-title"
      >
        <h1 className="name-title">
          <div>Abhinav</div>
          <div>Singh</div>
        </h1>
        <p className="subtitle">
          Bridging the gap between offensive security and creative development.
        </p>
      </motion.div>

      <div
        className="dock-container"
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="dock-bar">
          {techCards.map((card, index) => (
            <DockCard
              key={card.name}
              card={card}
              mouseX={mouseX}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
