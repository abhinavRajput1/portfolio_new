import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaShieldAlt, FaTools, FaCode, FaDesktop, FaNetworkWired,
  FaPython, FaReact, FaLinux, FaTerminal, FaLock, FaBug,
  FaServer, FaDatabase, FaWifi, FaUserSecret, FaSearch, FaKey,
  FaWindows, FaFileCode
} from 'react-icons/fa';
import { SiJavascript, SiWireshark, SiKalilinux } from 'react-icons/si';
import './Skills.css';

const allSkills = [
  { name: 'Penetration Testing', icon: <FaUserSecret /> },
  { name: 'Ethical Hacking', icon: <FaBug /> },
  { name: 'Digital Forensics', icon: <FaSearch /> },
  { name: 'Network Security', icon: <FaNetworkWired /> },
  { name: 'Malware Analysis', icon: <FaShieldAlt /> },
  { name: 'Wireshark', icon: <SiWireshark /> },
  { name: 'Nmap', icon: <FaNetworkWired /> },
  { name: 'Metasploit', icon: <FaLock /> },
  { name: 'Burp Suite', icon: <FaBug /> },
  { name: 'Splunk', icon: <FaDatabase /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'Bash', icon: <FaTerminal /> },
  { name: 'PowerShell', icon: <FaTerminal /> },
  { name: 'Linux', icon: <FaLinux /> },
  { name: 'Kali Linux', icon: <SiKalilinux /> },
  { name: 'Windows', icon: <FaWindows /> },
  { name: 'TCP/IP', icon: <FaServer /> },
  { name: 'Firewalls', icon: <FaShieldAlt /> },
  { name: 'VPN', icon: <FaKey /> },
  { name: 'Protocols', icon: <FaWifi /> },
];

// Split skills into 3 rows
const row1 = allSkills.slice(0, 8);
const row2 = allSkills.slice(8, 16);
const row3 = allSkills.slice(16);

function MarqueeRow({ skills, direction = 'left', speed = 30 }) {
  // Duplicate items for seamless loop
  const duplicated = [...skills, ...skills, ...skills, ...skills];
  const isLeft = direction === 'left';

  return (
    <div className="marquee-row">
      <motion.div
        className="marquee-track"
        animate={{ x: isLeft ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((skill, idx) => (
          <div className="skill-circle-wrapper" key={`${skill.name}-${idx}`}>
            <div className="skill-circle">
              <div className="skill-circle-icon">{skill.icon}</div>
            </div>
            <span className="skill-circle-label">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            The tools and technologies I use to secure and build.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="marquee-container"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <MarqueeRow skills={row1} direction="left" speed={60} />
        <MarqueeRow skills={row2} direction="right" speed={60} />
        <MarqueeRow skills={row3} direction="left" speed={60} />
      </motion.div>
    </section>
  );
}
