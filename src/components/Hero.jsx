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

function DockCard({ card, mouseX, index, setHoveredIndex, isMobile }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return val - center;
  });

  // Base sizes (static but responsive)
  const size = isMobile ? 64 : 110;
  const iconSize = isMobile ? 24 : 44;
  const yOffset = 0;

  const glowOpacity = useSpring(
    useTransform(distance, [-200, -80, 0, 80, 200], [0, 0.3, 0.8, 0.3, 0]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  const borderOpacity = useSpring(
    useTransform(distance, [-150, -60, 0, 60, 150], [0.15, 0.4, 1, 0.4, 0.15]),
    { mass: 0.1, stiffness: 200, damping: 15 }
  );

  // 3D Parallax Tilt state
  const rotateX = useSpring(useMotionValue(0), { mass: 0.1, stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { mass: 0.1, stiffness: 150, damping: 15 });

  const handleCardMouseMove = (e) => {
    setHoveredIndex(index);
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.set((y / (rect.height / 2)) * -15);
    rotateY.set((x / (rect.width / 2)) * 15);
  };

  const handleCardMouseLeave = () => {
    setHoveredIndex(null);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="dock-card"
      style={{
        width: size,
        height: size,
        y: yOffset,
      }}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
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
          rotateX,
          rotateY,
          transformPerspective: 800,
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
  const auroraX = useSpring(useMotionValue(0), { mass: 0.1, stiffness: 100, damping: 20 });
  const auroraY = useSpring(useMotionValue(0), { mass: 0.1, stiffness: 100, damping: 20 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
    const container = dockRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      auroraX.set(e.clientX - rect.left);
      auroraY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    setHoveredIndex(null);
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
        {/* Ambient Aurora Glow */}
        <motion.div
          className="dock-ambient-glow"
          style={{
            left: auroraX,
            top: auroraY,
            backgroundColor: hoveredIndex !== null ? techCards[hoveredIndex].color : 'transparent',
            opacity: hoveredIndex !== null ? 0.35 : 0,
          }}
        />

        <div className="dock-bar">
          {techCards.map((card, index) => (
            <DockCard
              key={card.name}
              card={card}
              mouseX={mouseX}
              index={index}
              setHoveredIndex={setHoveredIndex}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
