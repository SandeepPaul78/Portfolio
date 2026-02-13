import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFileArrowDown,
  FaGithub,
  FaLink,
  FaLaptopCode,
  FaLocationDot,
  FaRegCalendar,
  FaUserGraduate
} from 'react-icons/fa6';

const CONTACT_EMAIL = 'sandeeppaul8787@gmail.com';
const RESUME_FILE = '/resume.pdf';
const PROFILE_IMAGE = '/assets/profile-sandeep.jpeg';

const portfolio = {
  name: 'Sandeep Pal',
  role: 'UI Developer / Frontend Developer',
  company: 'FNP',
  dob: '2001-01-31',
  tagline:
    'Frontend-focused developer crafting responsive, conversion-oriented web interfaces with clean user experience.',
  about:
    'I build practical and polished web interfaces with React, JavaScript, and modern CSS. I focus on fast loading pages, clean layout systems, and clear user flows for real products.',
  github: 'https://github.com/sandeeppaul78',
  location: {
    permanent: 'Village Pacca Khera, District Karnal - 132036, Haryana',
    temporary: 'Sultanpur, New Delhi'
  },
  education: [
    {
      title: 'Full Stack Development Certificate',
      institute: 'Tech Stack Institute, Saket, New Delhi',
      duration: 'Feb 2025 - Feb 2026',
      score: 'Completed intensive 1-year program'
    },
    {
      title: 'B.Sc (Bachelor Degree)',
      institute: 'GJU, Hisar',
      duration: 'Graduated 2021',
      score: '86%'
    },
    {
      title: 'Class 12th',
      institute: 'Senior Secondary',
      duration: 'Batch 2018',
      score: ''
    }
  ],
  experience: [
    {
      title: 'UI Developer / Frontend Developer',
      company: 'FNP',
      duration: 'Feb 2025 - Present',
      highlights: [
        'Developing responsive landing pages and UI modules for campaigns and catalog experiences.',
        'Collaborating with design and business teams for faster delivery and better user engagement.',
        'Working with reusable components, JSON-driven sections, and conversion-focused UI updates.'
      ]
    },
    {
      title: 'Operations Executive',
      company: 'Study Consultant Field',
      duration: 'Approx. 1.6 years',
      highlights: [
        'Handled daily operations and support workflows with process discipline.',
        'Improved communication turnaround and documentation quality.'
      ]
    }
  ],
  skills: {
    frontend: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'UI Animation'],
    backend: ['Node.js', 'Express.js', 'REST APIs'],
    database: ['MongoDB'],
    tools: ['Git', 'GitHub', 'Vite', 'Postman', 'VS Code']
  }
};

const projects = [
  {
    id: 'project-1',
    title: 'FriendsTalk Web',
    category: 'Realtime Chat App',
    link: 'https://friendstalkweb.pages.dev',
    description:
      'WhatsApp-inspired web chat interface focused on clean messaging flow, contact list handling, and practical real-time style UX.',
    stack: ['React', 'Frontend UI', 'Web App']
  },
  {
    id: 'project-2',
    title: 'Music Player Clone',
    category: 'Frontend Project',
    link: 'https://music-player-1-p6eq.onrender.com',
    description:
      'Spotify-style music player clone with playlist layout, controls, and responsive media UI implementation.',
    stack: ['HTML', 'CSS', 'JavaScript', 'UI Clone']
  },
  {
    id: 'project-3',
    title: 'Expense Tracker',
    category: 'Full Stack Project',
    link: 'https://expense-tracker-api-9khz.onrender.com',
    description:
      'Expense tracking system with frontend + backend integration for managing records and financial entries.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB']
  },
  {
    id: 'project-4',
    title: 'Naam Jaap Counter',
    category: 'Practice Project',
    link: 'https://sandeeppaul78.github.io/naam-jaap-counter/',
    description: 'Early learning project built as a focused counter app for naam jaap tracking.',
    stack: ['JavaScript', 'DOM']
  },
  {
    id: 'project-5',
    title: 'Student Management System',
    category: 'Practice Project',
    link: 'https://sandeeppaul78.github.io/Student-Management-System/',
    description:
      'JavaScript-based student data management practice app for CRUD-style operations and table handling.',
    stack: ['JavaScript', 'HTML', 'CSS']
  }
];

const navItems = [
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#experience' },
  { label: 'Skills', target: '#skills' },
  { label: 'Projects', target: '#projects' },
  { label: 'Contact', target: '#contact' }
];

const fadeInUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.2 }
};

const getAge = (dob) => {
  const birthDate = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDifference = now.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

function App() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({
    sending: false,
    message: '',
    type: ''
  });

  const totalProjects = projects.length;

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setContactStatus({ sending: true, message: '', type: '' });

    const trimmedName = contactForm.name.trim();
    const trimmedEmail = contactForm.email.trim();
    const trimmedMessage = contactForm.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setContactStatus({
        sending: false,
        message: 'Please fill all fields before sending.',
        type: 'error'
      });
      return;
    }

    const subject = `Portfolio Contact from ${trimmedName}`;
    const body = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      '',
      'Message:',
      trimmedMessage
    ].join('\n');

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setContactStatus({
      sending: false,
      message: `Mail app opened. If it did not open, email directly at ${CONTACT_EMAIL}.`,
      type: 'success'
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#home" className="brand-mark">
            <img src="/sandeep-logo.svg" alt="SP logo" />
            <span>{portfolio.name}</span>
          </a>
          <nav className="nav-menu">
            {navItems.map((item) => (
              <a key={item.label} href={item.target}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="github-btn" href={portfolio.github} target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="container hero-grid">
            <motion.div {...fadeInUp} className="hero-content">
              <p className="eyebrow">UI Developer Portfolio</p>
              <h1>
                {portfolio.name}
                <span>{portfolio.role}</span>
              </h1>
              <p className="hero-copy">{portfolio.tagline}</p>
              <div className="hero-cta">
                <a href="#projects" className="btn-primary">
                  View Projects
                </a>
                <a href="#contact" className="btn-ghost">
                  Hire Me
                </a>
                <a className="btn-ghost btn-download" href={RESUME_FILE} download="Sandeep-Pal-Resume.pdf">
                  <FaFileArrowDown /> Download Resume
                </a>
              </div>
              <div className="chip-row">
                <span>
                  <FaRegCalendar /> DOB: 31 Jan 2001
                </span>
                <span>
                  <FaLocationDot /> New Delhi / Haryana
                </span>
              </div>
            </motion.div>

            <motion.aside {...fadeInUp} className="hero-panel">
              <div className="hero-photo-wrap">
                <img src={PROFILE_IMAGE} alt="Sandeep Pal portrait" className="hero-photo" />
              </div>
              <h3>Snapshot</h3>
              <div className="stat-grid">
                <article>
                  <strong>{getAge(portfolio.dob)}+</strong>
                  <p>Age</p>
                </article>
                <article>
                  <strong>{totalProjects}+</strong>
                  <p>Live Projects</p>
                </article>
                <article>
                  <strong>Feb 2025</strong>
                  <p>Started at FNP</p>
                </article>
                <article>
                  <strong>Full Stack</strong>
                  <p>Certificate 2026</p>
                </article>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="about" className="section-block container">
          <motion.div {...fadeInUp} className="section-head">
            <p className="section-label">About</p>
            <h2>Developer profile at a glance</h2>
          </motion.div>

          <div className="about-layout">
            <motion.article {...fadeInUp} className="card">
              <h3>Who I am</h3>
              <p>{portfolio.about}</p>
              <ul>
                <li>
                  <FaLaptopCode /> Currently working at <strong>{portfolio.company}</strong> as{' '}
                  <strong>{portfolio.role}</strong>
                </li>
                <li>
                  <FaLocationDot /> Permanent: {portfolio.location.permanent}
                </li>
                <li>
                  <FaLocationDot /> Temporary: {portfolio.location.temporary}
                </li>
              </ul>
            </motion.article>

            <motion.article {...fadeInUp} className="card">
              <h3>Education</h3>
              <div className="timeline compact">
                {portfolio.education.map((item) => (
                  <div className="timeline-item" key={item.title}>
                    <p className="meta-line">
                      <FaUserGraduate /> {item.duration}
                    </p>
                    <h4>{item.title}</h4>
                    <p>{item.institute}</p>
                    {item.score ? <small>{item.score}</small> : null}
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <section id="experience" className="section-block container">
          <motion.div {...fadeInUp} className="section-head">
            <p className="section-label">Experience</p>
            <h2>Professional journey</h2>
          </motion.div>

          <div className="timeline">
            {portfolio.experience.map((item) => (
              <motion.article {...fadeInUp} className="timeline-item card" key={`${item.title}-${item.company}`}>
                <p className="meta-line">{item.duration}</p>
                <h3>{item.title}</h3>
                <h4>{item.company}</h4>
                <ul>
                  {item.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-block container">
          <motion.div {...fadeInUp} className="section-head">
            <p className="section-label">Skills</p>
            <h2>Tools and technologies</h2>
          </motion.div>

          <div className="skills-layout">
            {Object.entries(portfolio.skills).map(([category, values]) => (
              <motion.article {...fadeInUp} className="skill-card card" key={category}>
                <h3>{category}</h3>
                <div className="skill-tags">
                  {values.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-block container">
          <motion.div {...fadeInUp} className="section-head">
            <p className="section-label">Projects</p>
            <h2>Work samples and practice builds</h2>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                {...fadeInUp}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                className="project-card card"
                key={project.id}
              >
                <div className="project-topline">
                  <p>{project.category}</p>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    <FaLink /> Live
                  </a>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block container">
          <motion.div {...fadeInUp} className="section-head">
            <p className="section-label">Contact</p>
            <h2>Let us build something strong together</h2>
          </motion.div>

          <div className="contact-layout">
            <motion.article {...fadeInUp} className="card contact-info">
              <h3>Open for UI / Frontend roles</h3>
              <p>
                I am currently working as a UI Developer and available for impactful frontend opportunities,
                freelance work, and product collaboration.
              </p>
              <p className="direct-mail">
                Direct email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
              <a className="btn-primary" href={portfolio.github} target="_blank" rel="noreferrer">
                <FaGithub /> Explore GitHub
              </a>
            </motion.article>

            <motion.form {...fadeInUp} className="card contact-form" onSubmit={handleContactSubmit}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your name"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="you@example.com"
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                rows="5"
                placeholder="Write your requirement"
                required
              />

              <button type="submit" className="btn-primary" disabled={contactStatus.sending}>
                {contactStatus.sending ? 'Opening Mail App...' : 'Send Message'}
              </button>

              {contactStatus.message ? (
                <p className={`form-message ${contactStatus.type}`}>{contactStatus.message}</p>
              ) : null}
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
          </p>
          <a href={portfolio.github} target="_blank" rel="noreferrer">
            <FaGithub /> github.com/sandeeppaul78
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
