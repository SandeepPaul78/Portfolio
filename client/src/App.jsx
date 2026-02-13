import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const RESUME_FILE = '/resume.pdf';
const PROFILE_IMAGE = '/assets/profile-sandeep.jpeg';

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
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioResponse, projectsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/portfolio`),
          axios.get(`${API_BASE_URL}/projects`)
        ]);

        setPortfolio(portfolioResponse.data.data);
        setProjects(projectsResponse.data.data);
      } catch (fetchError) {
        setError('Could not load portfolio data. Please start backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProjects = useMemo(() => projects.length, [projects]);

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus({ sending: true, message: '', type: '' });

    try {
      const { data } = await axios.post(`${API_BASE_URL}/contact`, contactForm);
      setContactStatus({
        sending: false,
        message: data.message,
        type: 'success'
      });
      setContactForm({ name: '', email: '', message: '' });
    } catch (submitError) {
      setContactStatus({
        sending: false,
        message: submitError.response?.data?.message || 'Unable to send message. Try again.',
        type: 'error'
      });
    }
  };

  if (loading) {
    return <div className="loading-screen">Preparing portfolio...</div>;
  }

  if (error || !portfolio) {
    return <div className="loading-screen error">{error || 'Portfolio data unavailable.'}</div>;
  }

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
                  <FaLocationDot /> Address: {portfolio.location.Address}
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
                {contactStatus.sending ? 'Sending...' : 'Send Message'}
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
          <p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
          <a href={portfolio.github} target="_blank" rel="noreferrer">
            <FaGithub /> github.com/sandeeppaul78
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
