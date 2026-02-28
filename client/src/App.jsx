import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  FaFileArrowDown,
  FaGithub,
  FaLaptopCode,
  FaLink,
  FaLocationDot,
  FaRegCalendar,
  FaUserGraduate,
  FaXmark
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
    title: 'Counter',
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
  { label: 'Home', target: '#home', meta: 'Intro & highlights' },
  { label: 'About', target: '#about', meta: 'Profile & education' },
  { label: 'Experience', target: '#experience', meta: 'Professional journey' },
  { label: 'Skills', target: '#skills', meta: 'Core stack' },
  { label: 'Projects', target: '#projects', meta: 'Live work samples' },
  { label: 'Contact', target: '#contact', meta: 'Direct reach out' }
];

const heroFocusWords = [
  'UI Engineering',
  'Frontend Systems',
  'Motion-driven Interfaces',
  'Performance-first UX'
];

const themeLabelMap = {
  home: 'Hero',
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  contact: 'Contact'
};

const themePalette = {
  home: {
    ink: [17, 17, 17],
    inkSoft: [95, 86, 74],
    line: [17, 17, 17, 0.2],
    surface: [239, 231, 219],
    surfaceAlt: [228, 216, 200],
    accent: [17, 17, 17],
    accentContrast: [243, 236, 226],
    glassBg: [255, 255, 255, 0.3],
    glassStroke: [255, 255, 255, 0.44],
    glassHighlight: [255, 255, 255, 0.56],
    particle: [17, 17, 17],
    bgX: 12,
    bgY: 10
  },
  about: {
    ink: [243, 236, 226],
    inkSoft: [213, 204, 191],
    line: [243, 236, 226, 0.24],
    surface: [13, 13, 13],
    surfaceAlt: [24, 24, 24],
    accent: [243, 236, 226],
    accentContrast: [17, 17, 17],
    glassBg: [18, 18, 18, 0.54],
    glassStroke: [243, 236, 226, 0.24],
    glassHighlight: [243, 236, 226, 0.16],
    particle: [243, 236, 226],
    bgX: 84,
    bgY: 14
  },
  experience: {
    ink: [17, 17, 17],
    inkSoft: [95, 86, 74],
    line: [17, 17, 17, 0.2],
    surface: [232, 221, 208],
    surfaceAlt: [220, 207, 191],
    accent: [17, 17, 17],
    accentContrast: [243, 236, 226],
    glassBg: [255, 255, 255, 0.3],
    glassStroke: [255, 255, 255, 0.4],
    glassHighlight: [255, 255, 255, 0.52],
    particle: [17, 17, 17],
    bgX: 18,
    bgY: 42
  },
  skills: {
    ink: [243, 236, 226],
    inkSoft: [215, 206, 195],
    line: [243, 236, 226, 0.22],
    surface: [17, 17, 17],
    surfaceAlt: [31, 31, 31],
    accent: [243, 236, 226],
    accentContrast: [19, 19, 19],
    glassBg: [20, 20, 20, 0.56],
    glassStroke: [243, 236, 226, 0.22],
    glassHighlight: [243, 236, 226, 0.14],
    particle: [243, 236, 226],
    bgX: 82,
    bgY: 46
  },
  projects: {
    ink: [17, 17, 17],
    inkSoft: [95, 86, 74],
    line: [17, 17, 17, 0.2],
    surface: [223, 210, 194],
    surfaceAlt: [209, 196, 178],
    accent: [17, 17, 17],
    accentContrast: [243, 236, 226],
    glassBg: [255, 255, 255, 0.28],
    glassStroke: [255, 255, 255, 0.36],
    glassHighlight: [255, 255, 255, 0.5],
    particle: [17, 17, 17],
    bgX: 20,
    bgY: 78
  },
  contact: {
    ink: [243, 236, 226],
    inkSoft: [221, 212, 200],
    line: [243, 236, 226, 0.24],
    surface: [9, 9, 9],
    surfaceAlt: [24, 24, 24],
    accent: [243, 236, 226],
    accentContrast: [17, 17, 17],
    glassBg: [17, 17, 17, 0.56],
    glassStroke: [243, 236, 226, 0.24],
    glassHighlight: [243, 236, 226, 0.15],
    particle: [243, 236, 226],
    bgX: 78,
    bgY: 82
  }
};

const textTonePalette = {
  dark: {
    ink: [17, 17, 17],
    inkSoft: [92, 84, 72],
    line: [17, 17, 17, 0.24],
    accent: [17, 17, 17],
    accentContrast: [243, 236, 226],
    particle: [17, 17, 17]
  },
  light: {
    ink: [243, 236, 226],
    inkSoft: [221, 212, 200],
    line: [243, 236, 226, 0.24],
    accent: [243, 236, 226],
    accentContrast: [17, 17, 17],
    particle: [243, 236, 226]
  }
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, progress) => start + (end - start) * progress;
const easeThemeProgress = (value) => value * value * (3 - 2 * value);
const resolveTheme = (themeKey) => themePalette[themeKey] || themePalette.home;
const blendRgbArray = (from, to, progress) => [
  lerp(from[0], to[0], progress),
  lerp(from[1], to[1], progress),
  lerp(from[2], to[2], progress)
];

const srgbToLinear = (channel) => {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
};

const getRelativeLuminance = ([red, green, blue]) =>
  0.2126 * srgbToLinear(red) + 0.7152 * srgbToLinear(green) + 0.0722 * srgbToLinear(blue);

const getTextToneMix = (surfaceRgb, surfaceAltRgb) => {
  const averageSurface = [
    (surfaceRgb[0] + surfaceAltRgb[0]) * 0.5,
    (surfaceRgb[1] + surfaceAltRgb[1]) * 0.5,
    (surfaceRgb[2] + surfaceAltRgb[2]) * 0.5
  ];
  const luminance = getRelativeLuminance(averageSurface);
  const lightTextMix = clamp((0.2 - luminance) / 0.08, 0, 1);
  return easeThemeProgress(lightTextMix);
};

const mixRgb = (from, to, progress) =>
  `rgb(${Math.round(lerp(from[0], to[0], progress))}, ${Math.round(lerp(from[1], to[1], progress))}, ${Math.round(
    lerp(from[2], to[2], progress)
  )})`;

const mixRgba = (from, to, progress) =>
  `rgba(${Math.round(lerp(from[0], to[0], progress))}, ${Math.round(lerp(from[1], to[1], progress))}, ${Math.round(
    lerp(from[2], to[2], progress)
  )}, ${lerp(from[3], to[3], progress).toFixed(3)})`;

const mixParticle = (from, to, progress) =>
  `${Math.round(lerp(from[0], to[0], progress))}, ${Math.round(lerp(from[1], to[1], progress))}, ${Math.round(
    lerp(from[2], to[2], progress)
  )}`;

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 }
};

const buildTypeFrames = (value) => {
  const safeText = value || '';
  if (!safeText) return [''];

  const frames = [''];
  for (let index = 1; index <= safeText.length; index += 1) {
    frames.push(safeText.slice(0, index));
  }

  return frames;
};

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const textRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const playTyping = useCallback(() => {
    const safeText = text || '';
    clearTimers();

    if (!safeText) {
      setDisplayText('');
      setIsScrambling(false);
      return;
    }

    const frames = buildTypeFrames(safeText);
    setIsScrambling(true);

    frames.forEach((frame, index) => {
      const timer = window.setTimeout(() => {
        setDisplayText(frame);
        if (index === frames.length - 1) {
          setDisplayText(safeText);
          setIsScrambling(false);
        }
      }, index * 62);

      timersRef.current.push(timer);
    });
  }, [clearTimers, text]);

  useEffect(() => {
    setDisplayText(text || '');
    return () => clearTimers();
  }, [clearTimers, text]);

  useEffect(() => {
    const element = textRef.current;
    const parent = element?.closest('.hover-loop');
    if (!parent) return undefined;

    const resetText = () => {
      clearTimers();
      setDisplayText(text || '');
      setIsScrambling(false);
    };

    parent.addEventListener('mouseenter', playTyping);
    parent.addEventListener('focusin', playTyping);
    parent.addEventListener('mouseleave', resetText);
    parent.addEventListener('focusout', resetText);

    return () => {
      parent.removeEventListener('mouseenter', playTyping);
      parent.removeEventListener('focusin', playTyping);
      parent.removeEventListener('mouseleave', resetText);
      parent.removeEventListener('focusout', resetText);
    };
  }, [clearTimers, playTyping, text]);

  return (
    <span
      ref={textRef}
      className={`scramble-text ${isScrambling ? 'is-scrambling' : ''}`}
      aria-label={text}
    >
      <span className="scramble-text-sizer" aria-hidden="true">
        {text || '\u00A0'}
      </span>
      <span className="scramble-text-live" aria-hidden="true">
        {displayText || '\u00A0'}
      </span>
    </span>
  );
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

const LazySectionContent = ({ sectionId, placeholderHeight = 520, children }) => {
  const [isLoaded, setIsLoaded] = useState(sectionId === 'home');
  const shellRef = useRef(null);
  const sectionControls = useAnimation();
  const hasMountedInViewRef = useRef(false);

  const replaySectionEntry = useCallback(() => {
    sectionControls.set({ opacity: 0, y: 44, filter: 'blur(6px)' });
    sectionControls.start({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.86, ease: [0.16, 1, 0.3, 1] }
    });
  }, [sectionControls]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isLoaded) {
              setIsLoaded(true);
            } else {
              replaySectionEntry();
            }
            hasMountedInViewRef.current = true;
          } else if (hasMountedInViewRef.current) {
            sectionControls.set({ opacity: 0.02, y: 24, filter: 'blur(4px)' });
          }
        });
      },
      { threshold: 0.22, rootMargin: '-4% 0px -18% 0px' }
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, [isLoaded, replaySectionEntry, sectionControls]);

  useEffect(() => {
    if (!isLoaded) return;
    replaySectionEntry();
  }, [isLoaded, replaySectionEntry]);

  return (
    <div
      ref={shellRef}
      className={`lazy-section-shell ${isLoaded ? 'is-loaded' : ''}`}
      aria-busy={!isLoaded}
      data-section-ready={isLoaded ? 'true' : 'false'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoaded ? (
          <motion.div
            key={`${sectionId}-content`}
            className="lazy-section-content"
            initial={false}
            animate={sectionControls}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key={`${sectionId}-placeholder`}
            className="lazy-section-placeholder"
            style={{ minHeight: `${placeholderHeight}px` }}
            initial={{ opacity: 0.6, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          >
            <span className="lazy-placeholder-line" />
            <span className="lazy-placeholder-line short" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [themeBlend, setThemeBlend] = useState({ from: 'home', to: 'home', progress: 0 });
  const [focusWordIndex, setFocusWordIndex] = useState(0);

  const appShellRef = useRef(null);
  const bubbleCanvasRef = useRef(null);
  const totalProjects = useMemo(() => projects.length, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[data-theme]'));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTheme(entry.target.dataset.theme || 'home');
          }
        });
      },
      { threshold: 0.45, rootMargin: '-18% 0px -35% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 760) setIsMenuOpen(false);
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[data-theme]'));
    if (!sections.length) return undefined;

    const readAnchors = () =>
      sections.map((section) => {
        const height = Math.max(section.offsetHeight, window.innerHeight * 0.55);
        return {
          theme: section.dataset.theme || 'home',
          center: section.offsetTop + height * 0.5
        };
      });

    let sectionAnchors = readAnchors();

    const getThemeBlend = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.5;
      const first = sectionAnchors[0];
      const last = sectionAnchors[sectionAnchors.length - 1];

      if (sectionAnchors.length === 1 || viewportCenter <= first.center) {
        return { from: first.theme, to: first.theme, progress: 0 };
      }

      if (viewportCenter >= last.center) {
        return { from: last.theme, to: last.theme, progress: 0 };
      }

      for (let index = 0; index < sectionAnchors.length - 1; index += 1) {
        const current = sectionAnchors[index];
        const next = sectionAnchors[index + 1];

        if (viewportCenter <= next.center) {
          const distance = Math.max(next.center - current.center, 1);
          const rawProgress = clamp((viewportCenter - current.center) / distance, 0, 1);
          return {
            from: current.theme,
            to: next.theme,
            progress: easeThemeProgress(rawProgress)
          };
        }
      }

      return { from: last.theme, to: last.theme, progress: 0 };
    };

    const setProgress = () => {
      const scrolled = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = scrollHeight > 0 ? Math.min(scrolled / scrollHeight, 1) : 0;
      setScrollProgress((previous) => (Math.abs(previous - value) < 0.001 ? previous : value));

      const nextBlend = getThemeBlend();
      setThemeBlend((previous) => {
        const sameTheme = previous.from === nextBlend.from && previous.to === nextBlend.to;
        const closeProgress = Math.abs(previous.progress - nextBlend.progress) < 0.01;
        return sameTheme && closeProgress ? previous : nextBlend;
      });
    };

    const handleResize = () => {
      sectionAnchors = readAnchors();
      setProgress();
    };

    setProgress();
    window.addEventListener('scroll', setProgress, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', setProgress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFocusWordIndex((previous) => (previous + 1) % heroFocusWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = bubbleCanvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;
    const shellStyles = appShellRef.current ? getComputedStyle(appShellRef.current) : null;
    const particleRgb = shellStyles?.getPropertyValue('--particle-rgb').trim() || '17, 17, 17';

    const pointer = { x: 0, y: 0, active: false };
    const particles = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      driftX: (Math.random() - 0.5) * 0.06,
      driftY: (Math.random() - 0.5) * 0.06,
      size: 0.7 + Math.random() * 1.4,
      alpha: 0.08 + Math.random() * 0.16
    });

    const setup = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      const count = Math.min(130, Math.max(54, Math.floor((width * height) / 19500)));
      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle());
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 170 && distance > 0.001) {
            const force = (170 - distance) / 170;
            particle.vx += (dx / distance) * force * 0.07;
            particle.vy += (dy / distance) * force * 0.07;
          }
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;
        particle.x += particle.vx + particle.driftX;
        particle.y += particle.vy + particle.driftY;

        if (particle.x < -14) particle.x = width + 14;
        if (particle.x > width + 14) particle.x = -14;
        if (particle.y < -14) particle.y = height + 14;
        if (particle.y > height + 14) particle.y = -14;

        const pointerDistance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
        const nearby = pointer.active ? Math.max(0, 1 - pointerDistance / 185) : 0;
        const radius = particle.size + nearby * 1.8;
        const alpha = Math.min(0.58, particle.alpha + nearby * 0.4);

        context.beginPath();
        context.fillStyle = `rgba(${particleRgb}, ${alpha.toFixed(3)})`;
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
      });

      frameId = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    setup();
    pointer.x = width * 0.5;
    pointer.y = height * 0.34;
    draw();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', setup);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', setup);
    };
  }, [activeTheme]);

  const smoothThemeStyle = useMemo(() => {
    const { from, to, progress } = themeBlend;
    const startTheme = resolveTheme(from);
    const endTheme = resolveTheme(to);
    const surfaceBlend = blendRgbArray(startTheme.surface, endTheme.surface, progress);
    const surfaceAltBlend = blendRgbArray(startTheme.surfaceAlt, endTheme.surfaceAlt, progress);
    const textToneMix = getTextToneMix(surfaceBlend, surfaceAltBlend);
    const darkTone = textTonePalette.dark;
    const lightTone = textTonePalette.light;

    return {
      '--scroll-angle': `${30 + scrollProgress * 280}deg`,
      '--ink': mixRgb(darkTone.ink, lightTone.ink, textToneMix),
      '--ink-soft': mixRgb(darkTone.inkSoft, lightTone.inkSoft, textToneMix),
      '--line': mixRgba(darkTone.line, lightTone.line, textToneMix),
      '--surface': mixRgb(startTheme.surface, endTheme.surface, progress),
      '--surface-alt': mixRgb(startTheme.surfaceAlt, endTheme.surfaceAlt, progress),
      '--accent': mixRgb(darkTone.accent, lightTone.accent, textToneMix),
      '--accent-contrast': mixRgb(darkTone.accentContrast, lightTone.accentContrast, textToneMix),
      '--glass-bg': mixRgba(startTheme.glassBg, endTheme.glassBg, progress),
      '--glass-stroke': mixRgba(startTheme.glassStroke, endTheme.glassStroke, progress),
      '--glass-highlight': mixRgba(startTheme.glassHighlight, endTheme.glassHighlight, progress),
      '--particle-rgb': mixParticle(darkTone.particle, lightTone.particle, textToneMix),
      '--bg-x': `${lerp(startTheme.bgX, endTheme.bgX, progress).toFixed(2)}%`,
      '--bg-y': `${lerp(startTheme.bgY, endTheme.bgY, progress).toFixed(2)}%`
    };
  }, [scrollProgress, themeBlend]);

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
    const body = [`Name: ${trimmedName}`, `Email: ${trimmedEmail}`, '', 'Message:', trimmedMessage].join(
      '\n'
    );

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setContactStatus({
      sending: false,
      message: `Mail app opened. If it did not open, email directly at ${CONTACT_EMAIL}.`,
      type: 'success'
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const isActiveNav = (target) => activeTheme === target.replace('#', '');

  return (
    <div ref={appShellRef} className="app-shell" data-theme={activeTheme} style={smoothThemeStyle}>
      <div className="scroll-progress-wrap" aria-hidden="true">
        <motion.span className="scroll-progress" style={{ scaleX: scrollProgress }} />
      </div>
      <canvas ref={bubbleCanvasRef} className="bubble-canvas" aria-hidden="true" />

      <header className="topbar">
        <div className="topbar-glow" aria-hidden="true" />
        <div className="container topbar-inner">
          <a href="#home" className="brand-mark" onClick={() => setIsMenuOpen(false)}>
            <img src="/sandeep-logo.svg" alt="SP logo" />
            <span>{portfolio.name}</span>
          </a>

          <nav className="nav-menu desktop-nav">
            {navItems.map((item) => (
              <a key={item.label} href={item.target} className={`hover-loop ${isActiveNav(item.target) ? 'active' : ''}`}>
                <ScrambleText text={item.label} />
              </a>
            ))}
          </nav>

          <div className="top-actions">
            <span className="theme-pill">Now viewing: {themeLabelMap[activeTheme]}</span>

            <a className="github-btn hover-loop" href={portfolio.github} target="_blank" rel="noreferrer">
              <FaGithub /> <ScrambleText text="GitHub" />
            </a>

            <button
              type="button"
              className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.aside
              className="mobile-menu-panel"
              initial={{ scale: 0.42, opacity: 0, y: -24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.65, opacity: 0, y: -20 }}
              transition={{ duration: 0.34, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <h3>Quick Nav</h3>
                <button
                  type="button"
                  className="mobile-close-btn"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaXmark />
                </button>
              </div>

              <div className="mobile-menu-links">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.target}
                  className={`mobile-link hover-loop ${isActiveNav(item.target) ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * (index + 1), duration: 0.22 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="mobile-link-copy">
                    <ScrambleText text={item.label} />
                    <small>{item.meta}</small>
                  </div>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </motion.a>
              ))}

              <a className="mobile-github hover-loop" href={portfolio.github} target="_blank" rel="noreferrer">
                <FaGithub /> <ScrambleText text="GitHub" />
              </a>
            </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero-section themed-section theme-home" data-theme="home">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="container hero-grid">
            <motion.div {...fadeInUp} className="hero-content">
              <p className="eyebrow">UI Developer Portfolio</p>

              <h1 className="hero-title">
                <span className="name-loop-wrap" aria-label={portfolio.name}>
                  <span className="name-loop-track">
                    {portfolio.name} • {portfolio.name} • {portfolio.name} • {portfolio.name} •
                  </span>
                </span>
                <span className="hero-role">
                  Crafting{' '}
                  <span className="hero-role-word-wrap" aria-live="polite">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroFocusWords[focusWordIndex]}
                        className="hero-role-word"
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.32, ease: 'easeOut' }}
                      >
                        {heroFocusWords[focusWordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </h1>

              <p className="hero-copy">{portfolio.tagline}</p>

              <div className="hero-cta">
                <motion.a
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  href="#projects"
                  className="btn-primary hover-loop"
                >
                  <ScrambleText text="View Projects" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="btn-ghost hover-loop"
                >
                  <ScrambleText text="Hire Me" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-ghost btn-download hover-loop"
                  href={RESUME_FILE}
                  download="Sandeep-Pal-Resume.pdf"
                >
                  <FaFileArrowDown /> <ScrambleText text="Download Resume" />
                </motion.a>
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

        <section id="about" className="section-block themed-section theme-about" data-theme="about">
          <LazySectionContent sectionId="about" placeholderHeight={560}>
            <div className="container">
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
            </div>
          </LazySectionContent>
        </section>

        <section
          id="experience"
          className="section-block themed-section theme-experience"
          data-theme="experience"
        >
          <LazySectionContent sectionId="experience" placeholderHeight={520}>
            <div className="container">
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
            </div>
          </LazySectionContent>
        </section>

        <section id="skills" className="section-block themed-section theme-skills" data-theme="skills">
          <LazySectionContent sectionId="skills" placeholderHeight={500}>
            <div className="container">
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
            </div>
          </LazySectionContent>
        </section>

        <section id="projects" className="section-block themed-section theme-projects" data-theme="projects">
          <LazySectionContent sectionId="projects" placeholderHeight={660}>
            <div className="container">
              <motion.div {...fadeInUp} className="section-head">
                <p className="section-label">Projects</p>
                <h2>Work samples and practice builds</h2>
              </motion.div>

              <div className="projects-grid">
                {projects.map((project, index) => (
                  <motion.article
                    {...fadeInUp}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
                    className="project-card card"
                    key={project.id}
                  >
                    <div className="project-topline">
                      <p>{project.category}</p>
                      <a href={project.link} target="_blank" rel="noreferrer" className="hover-loop">
                        <FaLink /> <ScrambleText text="Live" />
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
            </div>
          </LazySectionContent>
        </section>

        <section id="contact" className="section-block themed-section theme-contact" data-theme="contact">
          <LazySectionContent sectionId="contact" placeholderHeight={580}>
            <div className="container">
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
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary hover-loop"
                    href={portfolio.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub /> <ScrambleText text="Explore GitHub" />
                  </motion.a>
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

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary hover-loop"
                    disabled={contactStatus.sending}
                  >
                    {contactStatus.sending ? (
                      <ScrambleText text="Opening Mail App..." />
                    ) : (
                      <ScrambleText text="Send Message" />
                    )}
                  </motion.button>

                  {contactStatus.message ? (
                    <p className={`form-message ${contactStatus.type}`}>{contactStatus.message}</p>
                  ) : null}
                </motion.form>
              </div>
            </div>
          </LazySectionContent>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
          </p>
          <a href={portfolio.github} target="_blank" rel="noreferrer">
            <FaGithub /> <ScrambleText text="github.com/sandeeppaul78" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
