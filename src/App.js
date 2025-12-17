// eslint-disable-next-line

import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Star } from './images/Star'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FaCode, FaReact, FaTools, FaCloud, FaRobot, FaDatabase, FaDesktop, FaUniversalAccess, FaCrown, FaComments, FaChartLine, FaHandshake, FaPuzzlePiece, FaSeedling, FaMusic, FaPlane, FaPalette, FaCoffee } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import headshot from "./images/headshot.jpg"
import pic from "./images/pic1.jpg"
import testCV from "./images/testCV.pdf";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const helloRef = useRef(null);
  const welcomeRef = useRef(null);
  // const navRef = useRef(null); 
  const sectionRefs = useRef([]);
  const [navbarVisible, setNavbarVisible] = useState(false); // Track navbar visibility
  const [activeTab, setActiveTab] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const navRef = useRef(null);
  const navIndicatorRef = useRef(null);
  const [modalContent, setModalContent] = useState(null);
  const aboutCardRefs = useRef([]);
  const [expandedRole, setExpandedRole] = useState('director'); // Default to showing director role
  const [currentTrack, setCurrentTrack] = useState(null);
  const [expandedExperience, setExpandedExperience] = useState('gcsurplus'); // Default to showing GCsurplus
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  useEffect(() => {
    // typewriting animation for the intro
    gsap.to(helloRef.current, {
      duration: 2.5,
      text: "Hello, my name is Tara Denaud!",
      ease: "power1.inOut",
      delay: 0.5,
    });

    gsap.to(welcomeRef.current, {
      duration: 2.5,
      text: "Welcome to my portfolio",
      ease: "power1.inOut",
      delay: 3.5,
    });
    

    // section reveal animations (use each element as trigger)
    sectionRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 100, opacity: 0 }, // Initial position (down) and opacity
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 50%",
            scrub: false,
          },
        }
      );
    });

    // Animate about cards with stagger
    aboutCardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // active section highlighting using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.55,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Nav bar trigger (to show when the user scrolls to the "About me section")
    ScrollTrigger.create({
      trigger: "#about",
      start: "top center", // When "About Me" section reaches the center of the page
      onEnter: () => setNavbarVisible(true), // Show the navbar 
      onLeaveBack: () => setNavbarVisible(false), // Hide the navbar
    });

    return () => {
      // cleanup GSAP ScrollTriggers and observer
      ScrollTrigger.getAll().forEach((st) => st.kill());
      observer.disconnect();
    };
  }, []);

  // Update nav indicator position when activeSection changes or on resize (animate with GSAP)
  useEffect(() => {
    const update = () => {
      const nav = navRef.current;
      const indicator = navIndicatorRef.current;
      if (!nav || !indicator) return;
      const activeLi = nav.querySelector('li.active');
      if (activeLi) {
        const rect = activeLi.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const left = rect.left - navRect.left + nav.scrollLeft;
        const width = rect.width;
        gsap.to(indicator, {
          duration: 0.32,
          left: left + 'px',
          width: width + 'px',
          opacity: 1,
          ease: 'power3.out',
        });
      } else {
        gsap.to(indicator, { duration: 0.18, opacity: 0 });
      }
    };

    const updateIndicator = () => window.requestAnimationFrame(update);

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection, navbarVisible]);



  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navHeight = document.querySelector(".navbar").offsetHeight; // Get nav bar height
    const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 40; // Add extra space
  
    window.scrollTo({
      top,
      behavior: "smooth",

    });
    
    // Close mobile menu after clicking
    setMobileMenuOpen(false);
  };
  

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,      
    autoplaySpeed: 3000, 
    pauseOnHover: true,
  };

  const openModal = (type) => {
    const content = {
      description: {
        title: 'About Me',
        body: (
          <>
            <p>Hi! I'm Tara, a software engineer with a passion for building intuitive, impactful applications.</p>
            <p>I love blending creativity with problem-solving, whether it's designing user-friendly interfaces or tackling complex algorithms. My journey into tech began with curiosity and has evolved into a deep commitment to creating solutions that make a difference.</p>
            <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers in my community.</p>
            <p>I believe in the power of technology to transform lives and am constantly seeking new ways to learn, grow, and contribute to meaningful projects.</p>
          </>
        )
      },
      education: {
        title: 'Education',
        body: (
          <>
            <h3>University of Ottawa</h3>
            <p><strong>Honours Bachelor of Science (BSc) in Computer Science</strong></p>
            <p><strong>GPA: 7.25/10 (3.4/4.0)</strong></p>
            <p><strong>Expected Graduation: May 2026</strong></p>
            <br />
            <p>At the University of Ottawa, I've developed a strong foundation in software development, algorithms, and systems design. My coursework has equipped me with both technical expertise and problem-solving skills essential for creating efficient, scalable solutions.</p>
            <p>I've been actively involved in student organizations, hackathons, and collaborative projects that have honed my leadership and teamwork skills.</p>
          </>
        )
      },
      classes: {
        title: 'Relevant Coursework',
        body: (
          <>
            <ul style={{lineHeight: '1.8'}}>
              <li><strong>Data Structures & Algorithms:</strong> Advanced problem-solving and optimization techniques</li>
              <li><strong>Object-Oriented Programming:</strong> Design patterns and software architecture</li>
              <li><strong>Web Development:</strong> Full-stack development with modern frameworks</li>
              <li><strong>Database Systems:</strong> SQL/NoSQL, data modeling, and query optimization</li>
              <li><strong>Computer Architecture:</strong> Low-level systems and hardware-software interaction</li>
              <li><strong>Entrepreneurial Creativity:</strong> Product development and business strategy</li>
            </ul>
          </>
        )
      }
    };
    setModalContent(content[type]);
  };

  const closeModal = () => {
    setModalContent(null);
  };
  

  return (
    <div className="App">
      {/* Navbar */}
      <nav ref={navRef} className={`navbar ${navbarVisible ? "visible" : ""}`}>
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={mobileMenuOpen ? 'mobile-open' : ''}>
          <li className={`${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}> <b>About Me</b></li>
          <li className={`${activeSection === 'experience' ? 'active' : ''}`} onClick={() => scrollToSection('experience')}><b>Experience</b></li>
          <li className={`${activeSection === 'projects' ? 'active' : ''}`} onClick={() => scrollToSection('projects')}><b>Projects</b></li>
          <li className={`${activeSection === 'stack' ? 'active' : ''}`} onClick={() => scrollToSection('stack')}><b>Tech Stack</b></li>
          <li className={`${activeSection === 'community' ? 'active' : ''}`} onClick={() => scrollToSection('community')}><b>Community Involvement</b></li>
          <li className={`${activeSection === 'skills' ? 'active' : ''}`} onClick={() => scrollToSection('skills')}><b>Core Strengths</b></li>
          <li className={`${activeSection === 'interests' ? 'active' : ''}`} onClick={() => scrollToSection('interests')}><b>Beyond Code</b></li>
          <li className={`${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}><b>Contact Me</b></li>
        </ul>
        <div
          ref={navIndicatorRef}
          className="nav-indicator"
          style={{ left: 0, width: 0, opacity: 0 }}
        />
        <div className="navbar-icons">

          <a href={testCV} target="_blank" rel="noopener noreferrer"> 
            <FontAwesomeIcon icon={faFile} /> </a>
          <a href="https://github.com/taradenaud" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/taradenaud" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:taradenaud4@gmail.com"  target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </nav>

      <header className="App-header">
        <div className="welcome-container">
          <h1 ref={helloRef}></h1>
          <h2 ref={welcomeRef}></h2>
        </div>
        <Canvas className="star-canvas">
          <ambientLight intensity={1} />
          <directionalLight position={[2, 5, 0]} />
          <Star /> 
        </Canvas>
      </header>

      {/* About Me Section */}
      <section ref={(el) => (sectionRefs.current[0] = el)} id="about" className="section container">
        <div className="about-header">
          <h1>About Me, Tara!</h1>
          <p className="about-tagline">A developer building beautiful, user-centric digital experiences</p>
          <div className="about-badges">
            <span className="badge">Creative</span>
            <span className="badge">Team Player</span>
            <span className="badge">Leader</span>
            <span className="badge">World Learner</span>
          </div>
        </div>
        <div className="about-content">
          {/* Picture */}
          <div className="about-photo">
            <img src={headshot} alt="Tara Denaud" />
          </div>

          {/* About Cards */}
          <div className="about-cards">
            <div 
              className="about-card" 
              ref={el => aboutCardRefs.current[0] = el}
              onClick={() => openModal('description')}
            >
              <h2>Description</h2>
              <p>
              Hi! I'm Tara, a software engineer based in Ottawa. I love creating visually appealing solutions to complex problems and exploring new technologies. When I'm not coding, you'll find me volunteering in my community, practicing arts or working on side projects.
              </p>
              <span className="card-hint">Click to learn more →</span>
            </div>
            <div 
              className="about-card" 
              ref={el => aboutCardRefs.current[1] = el}
              onClick={() => openModal('education')}
            >
              <h2>Education</h2>
              <p>I'm pursuing an Honours Bachelor of Science in Computer Science at the University of Ottawa, graduating in May 2026.</p>
              <span className="card-hint">Click to learn more →</span>
            </div>
            <div 
              className="about-card" 
              ref={el => aboutCardRefs.current[2] = el}
              onClick={() => openModal('classes')}
            >
              <h2>Relevant Classes</h2>
              <p>Many Algorithms Courses, Artificial Intelligence, Computer Architecture and more.</p>
              <span className="card-hint">Click to learn more →</span>
            </div>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[1] = el)} id="experience" className="section container">
        <h2>Work Experience</h2>
        
        <div className="experience-timeline">
          {/* GCsurplus Experience */}
          <div className="collapsible-experience">
            <div 
              className={`experience-collapse-header ${expandedExperience === 'gcsurplus' ? 'expanded' : ''}`}
              onClick={() => setExpandedExperience(expandedExperience === 'gcsurplus' ? null : 'gcsurplus')}
            >
              <div className="experience-title-section">
                <div>
                  <h3>Software Developer</h3>
                  <h4>GCsurplus, Public Services and Procurement Canada</h4>
                </div>
                <span className="experience-date">June 2024 – December 2024</span>
              </div>
              <span className="expand-icon">{expandedExperience === 'gcsurplus' ? '▼' : '▶'}</span>
            </div>
            {expandedExperience === 'gcsurplus' && (
              <div className="experience-collapse-content">
                <ul className="experience-details">
                  <li>Enhanced key application modules using <strong>JavaScript</strong>, improving platform responsiveness and delivering a smoother experience for hundreds of daily users.</li>
                  <li>Designed and optimized <strong>SQL databases</strong> and architecture, improving data integrity, scalability, and response times for large-volume government datasets.</li>
                  <li>Drove quality assurance and release readiness for multiple deployments, collaborating with cross-functional teams to deliver secure, reliable, and user-centered digital services.</li>
                </ul>
              </div>
            )}
          </div>

          {/* CSSA Experience */}
          <div className="collapsible-experience">
            <div 
              className={`experience-collapse-header ${expandedExperience === 'cssa' ? 'expanded' : ''}`}
              onClick={() => setExpandedExperience(expandedExperience === 'cssa' ? null : 'cssa')}
            >
              <div className="experience-title-section">
                <div>
                  <h3>VP Communications & VP Social Affairs</h3>
                  <h4>Computer Science Student Association, University of Ottawa</h4>
                </div>
                <span className="experience-date">April 2024 – Present</span>
              </div>
              <span className="expand-icon">{expandedExperience === 'cssa' ? '▼' : '▶'}</span>
            </div>
            {expandedExperience === 'cssa' && (
              <div className="experience-collapse-content">
                <ul className="experience-details">
                  <li>Managed marketing and communications for the CS student body (<strong>1,200+ students</strong>), producing monthly newsletters and coordinating association-wide communication and content strategy.</li>
                  <li>Recruited and supervised two junior executives, providing direction on communications strategy and event promotion.</li>
                  <li>Organized Welcome Week for incoming students, overseeing event logistics, volunteer coordination, and merchandise operations totaling <strong>$10K+</strong>. Received the <strong>UOSU Executive Award</strong> for outstanding leadership and community impact.</li>
                  <li>Planned an out-of-province student trip for <strong>87 attendees</strong>, managing ticketing, travel logistics, partner coordination, and overall execution.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[2] = el)} id="projects" className="section container">
        <h2>Projects</h2>
        
        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card">
            <div className="project-image">
              <img src="" alt="Reinforcement Learning Research" className="placeholder-img" />
            </div>
            <div className="project-content">
              <h3>Reinforcement Learning Research</h3>
              <p className="project-type">Machine Learning Honours Project (qOttawa)</p>
              <p>Built a sparse reward framework using Gymnasium to design and executed 90-job hyperparameter sweeps on a compute cluster, analyzing task variance and pre-layer initialization across AntMaze, Hopper-v4, and Walker2d-v4.</p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">PyTorch</span>
                <span className="tech-tag">Gymnasium</span>
                <span className="tech-tag">AntMaze</span>
                <span className="tech-tag">Hopper-v4</span>
                <span className="tech-tag">Walker2d-v4</span>
              </div>
              <a href="https://github.com/fayy-lee/rl_training.git" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <div className="project-image">
              <img src="" alt="Personal Website" className="placeholder-img" />
            </div>
            <div className="project-content">
              <h3>Personal Website (You are here!)</h3>
              <p className="project-type">React.js Portfolio</p>
              <p>Built a responsive React.js portfolio using GSAP, @react-three/fiber, JavaScript, HTML, and CSS, with scroll-triggered animations for cross-device accessibility, optimized GSAP timelines for fast load times, and enhanced SEO.</p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">GSAP</span>
                <span className="tech-tag">Three.js</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
              </div>
              <a href="https://github.com/taradenaud/tara_portfolio.git" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card">
            <div className="project-image">
              <img src="" alt="WanderLens Photography" className="placeholder-img" />
            </div>
            <div className="project-content">
              <h3>WanderLens Photography Service Platform</h3>
              <p className="project-type">Full-Stack Web Application</p>
              <p>Developed a bilingual photography platform (EN/FR) with custom image-search features, optimized JavaScript, HTML, and CSS for fast load performance, improved SEO, and enhanced mobile responsiveness.</p>
              <div className="project-tech">
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
              </div>
              <a href="https://github.com/taradenaud/WanderLens-Phtotgraphy-Services.git" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-card">
            <div className="project-image">
              <img src="" alt="Software Salon Hub" className="placeholder-img" />
            </div>
            <div className="project-content">
              <h3>Software Salon Hub</h3>
              <p className="project-type">Web Application</p>
              <p>Engineered a responsive beauty salon website with HTML, CSS, JavaScript, and Bootstrap, integrating a dynamic carousel and booking modal while improving cross-device accessibility and reducing UI friction on mobile and desktop.</p>
              <div className="project-tech">
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">Bootstrap</span>
              </div>
              <a href="https://github.com/taradenaud/Software_Soft_Hair.git" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Project 5 */}
          <div className="project-card">
            <div className="project-image">
              <img src="" alt="Simulated Hotel Database" className="placeholder-img" />
            </div>
            <div className="project-content">
              <h3>Simulated Hotel Database</h3>
              <p className="project-type">Full-Stack Web Application</p>
              <p>Built a hotel booking system using SQL, JavaScript, HTML, and CSS, creating a searchable reservation interface with filters that dynamically query the database, improving user experience for guests and administrators.</p>
              <div className="project-tech">
                <span className="tech-tag">SQL</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
              </div>
              <a href="https://github.com/taradenaud/Hotel-Management-Project.git" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Project 6 */}
          <div className="project-card">
            <div className="project-image">
              <img src="" alt="Good Cycle" className="placeholder-img" />
            </div>
            <div className="project-content">
              <h3>Good Cycle</h3>
              <p className="project-type">Android Application</p>
              <p>Engineered a cycling app using Android Studio, Java, and Firebase, with multi-role functionality, catering to admins, club owners, and participants, to provide tailored user experiences and streamline cycling event management.</p>
              <div className="project-tech">
                <span className="tech-tag">Android Studio</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">Firebase</span>
              </div>
              <a href="https://github.com/taradenaud/GoodCycle.git" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[3] = el)} id="stack" className="section container">
        <h2>Tech Stack</h2>
        <p className="stack-subtitle">Technologies and tools I work(ed) with</p>
        
        <div className="tech-stack-container">
          {/* Programming Languages */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaCode className="category-icon" />
              Programming Languages
            </h3>
            <div className="tech-items">
              <div className="tech-item">Python</div>
              <div className="tech-item">Java</div>
              <div className="tech-item">JavaScript</div>
              <div className="tech-item">TypeScript</div>
              <div className="tech-item">C#</div>
              <div className="tech-item">SQL</div>
              <div className="tech-item">HTML</div>
              <div className="tech-item">CSS</div>
              <div className="tech-item">JSON</div>
              <div className="tech-item">ColdFusion</div>
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaReact className="category-icon" />
              Frameworks & Libraries
            </h3>
            <div className="tech-items">
              <div className="tech-item">React.js</div>
              <div className="tech-item">React Native</div>
              <div className="tech-item">AngularJS</div>
              <div className="tech-item">Bootstrap</div>
              <div className="tech-item">Three.js</div>
              <div className="tech-item">GSAP</div>
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaTools className="category-icon" />
              Tools & Platforms
            </h3>
            <div className="tech-items">
              <div className="tech-item">Git</div>
              <div className="tech-item">GitHub</div>
              <div className="tech-item">Figma</div>
              <div className="tech-item">Blender 3D</div>
              <div className="tech-item">Google Firebase</div>
              <div className="tech-item">Jira</div>
              <div className="tech-item">Microsoft Office</div>
              <div className="tech-item">SolidWorks</div>
            </div>
          </div>

          {/* Machine Learning & Data Science */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaRobot className="category-icon" />
              Machine Learning & Data Science
            </h3>
            <div className="tech-items">
              <div className="tech-item">PyTorch</div>
              <div className="tech-item">Gymnasium</div>
              <div className="tech-item">NumPy</div>
              <div className="tech-item">Pandas</div>
            </div>
          </div>

          {/* Databases */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaDatabase className="category-icon" />
              Databases
            </h3>
            <div className="tech-items">
              <div className="tech-item">PostgreSQL</div>
              <div className="tech-item">Firebase</div>
              <div className="tech-item">NoSQL</div>
            </div>
          </div>

          {/* Cloud & DevOps */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaCloud className="category-icon" />
              Cloud & DevOps
            </h3>
            <div className="tech-items">
              <div className="tech-item">AWS</div>
              <div className="tech-item">Docker</div>
              <div className="tech-item">Kubernetes</div>
              <div className="tech-item">RESTful APIs</div>
              <div className="tech-item">CI/CD Pipelines</div>
            </div>
          </div>

          {/* Development Environment */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaDesktop className="category-icon" />
              Development Environment
            </h3>
            <div className="tech-items">
              <div className="tech-item">Android Studio</div>
              <div className="tech-item">VS Code</div>
              <div className="tech-item">IntelliJ IDEA</div>
            </div>
          </div>

          {/* Accessibility & Standards */}
          <div className="tech-category">
            <h3 className="category-title">
              <FaUniversalAccess className="category-icon" />
              Accessibility & Standards
            </h3>
            <div className="tech-items">
              <div className="tech-item">WCAG</div>
            </div>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[4] = el)} id="community" className="section container">
        <h2>Community Involvement</h2>
        <div className="tab-bar">
          <div
            className={`tab tab1 ${activeTab === 0 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            CUSEC
          </div>
          <div
            className={`tab tab2 ${activeTab === 1 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            uOttaHack 7
          </div>
          <div
            className={`tab tab3 ${activeTab === 2 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Engineering Faculty Council
          </div>
        </div>

        {/* Content Box */}
        <div className="content-container">
          <div className={`content content1 ${activeTab === 0 ? "active-content" : ""}`}>
            <div className="community-header">
              <div>
                <h3>Canadian University Software Engineering Conference</h3>
                <p className="org-subtitle">Multiple leadership roles spanning 2024-2025</p>
              </div>
            </div>

            {/* Collapsible Role: Director of Speakers */}
            <div className="collapsible-role">
              <div 
                className={`role-header ${expandedRole === 'director' ? 'expanded' : ''}`}
                onClick={() => setExpandedRole(expandedRole === 'director' ? null : 'director')}
              >
                <div className="role-title-section">
                  <span className="role-badge">Director of Speakers</span>
                  <span className="role-year">2025</span>
                </div>
                <div className="role-metrics">
                  <span className="metric-badge-small">300+ Attendees</span>
                  <span className="metric-badge-small">15+ Speakers</span>
                </div>
                <span className="expand-icon">{expandedRole === 'director' ? '▼' : '▶'}</span>
              </div>
              {expandedRole === 'director' && (
                <div className="role-content">
                  <p>Leading the coordination of speaker programming for one of Canada's largest student-run tech conferences at <a href="https://2025.cusec.net" target="_blank" rel="noopener noreferrer" className="org-link">CUSEC</a>.</p>
                  <ul className="community-details">
                    <li>Curate and coordinate speaker lineup for a conference serving hundreds of students across Canada</li>
                    <li>Manage speaker outreach, negotiations, and logistics</li>
                    <li>Collaborate with conference organizing team to deliver high-quality educational content</li>
                  </ul>
                  <div className="community-images">
                    <img src="" alt="CUSEC 2025 Event" className="community-img placeholder-img" />
                    <img src="" alt="CUSEC Speakers" className="community-img placeholder-img" />
                  </div>
                  <a href="https://www.linkedin.com/posts/taradenaud_as-cusec-2025-cusec-canadian-university-activity-7286139058676723713-EnTX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6kp5ABv7LtaX6I914rUlrnXX1bWc7KaZo" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                    Check out my LinkedIn post about it here →
                  </a>
                </div>
              )}
            </div>

            {/* Collapsible Role: Head Delegate */}
            <div className="collapsible-role">
              <div 
                className={`role-header ${expandedRole === 'delegate' ? 'expanded' : ''}`}
                onClick={() => setExpandedRole(expandedRole === 'delegate' ? null : 'delegate')}
              >
                <div className="role-title-section">
                  <span className="role-badge">Head Delegate</span>
                  <span className="role-year">2024</span>
                </div>
                <div className="role-metrics">
                  <span className="metric-badge-small">Delegation Size: 41</span>
                </div>
                <span className="expand-icon">{expandedRole === 'delegate' ? '▼' : '▶'}</span>
              </div>
              {expandedRole === 'delegate' && (
                <div className="role-content">
                  <p>Led the University of Ottawa delegation to <a href="https://2024.cusec.net" target="_blank" rel="noopener noreferrer" className="org-link">CUSEC</a>, coordinating logistics and representing uOttawa students.</p>
                  <ul className="community-details">
                    <li>Organized and managed the 41-student uOttawa delegation attending the conference</li>
                    <li>Coordinated travel, accommodations, and event participation for delegation members</li>
                    <li>Facilitated networking opportunities and represented uOttawa at Canada's premier student tech conference</li>
                  </ul>
                  <div className="community-images">
                    <img src="" alt="CUSEC 2024 Delegation" className="community-img placeholder-img" />
                    <img src="" alt="uOttawa Team" className="community-img placeholder-img" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={`content content2 ${activeTab === 1 ? "active-content" : ""}`}>
            <div className="community-header">
              <div>
                <h3>uOttaHack 7</h3>
                <div className="role-timeline">
                  <div className="role-item">
                    <span className="role-badge">Marketing Coordinator</span>
                    <span className="role-year">2024-2025</span>
                  </div>
                </div>
              </div>
              <div className="community-metrics">
                <span className="metric-badge">800+ Participants</span>
              </div>
            </div>
            <p>Leading marketing efforts for the <a href="https://uottahack.ca" target="_blank" rel="noopener noreferrer" className="org-link">University of Ottawa's annual hackathon</a>, driving participant engagement and event awareness.</p>
            <ul className="community-details">
              <li>Develop and execute comprehensive marketing strategy to attract participants</li>
              <li>Create promotional content across social media platforms</li>
              <li>Coordinate with sponsorship and logistics teams to maximize event reach</li>
            </ul>
            <div className="community-images">
              <img src="" alt="uOttaHack Event" className="community-img placeholder-img" />
              <img src="" alt="uOttaHack Team" className="community-img placeholder-img" />
            </div>
          </div>
          <div className={`content content3 ${activeTab === 2 ? "active-content" : ""}`}>
            <div className="community-header">
              <div>
                <h3>Engineering Faculty Council</h3>
                <div className="role-timeline">
                  <div className="role-item">
                    <span className="role-badge">Council Member</span>
                    <span className="role-year">University of Ottawa</span>
                  </div>
                </div>
              </div>
            </div>
            <p>Contributing to the Engineering Faculty Council, representing student interests and working to improve the academic experience for engineering students.</p>
            <ul className="community-details">
              <li>Represent student perspectives on faculty-level decisions and initiatives</li>
              <li>Collaborate with faculty administration on curriculum and program improvements</li>
              <li>Organize and participate in events to enhance student engagement and community building</li>
            </ul>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[5] = el)} id="skills" className="section container">
        <h2>Core Strengths</h2>
        <p className="skills-subtitle">Combining my technical expertise with leadership and collaboration</p>
        
        <div className="skills-grid">
          {/* Leadership */}
          <div className="skill-card">
            <FaCrown className="skill-icon" />
            <h3>Leadership</h3>
            <p className="skill-description">Proven track record leading teams and organizations to achieve ambitious goals</p>
            <ul className="skill-examples">
              <li>VP Communications & Social Affairs - 1,200+ students</li>
              <li>Director of Speakers at CUSEC - National conference</li>
              <li>Head Delegate - 41-student delegation</li>
            </ul>
          </div>

          {/* Communication */}
          <div className="skill-card">
            <FaComments className="skill-icon" />
            <h3>Communication</h3>
            <p className="skill-description">Expert at translating complex technical concepts for diverse audiences</p>
            <ul className="skill-examples">
              <li>Monthly newsletters for CS student body</li>
              <li>Speaker coordination and negotiations</li>
              <li>Cross-functional team collaboration</li>
            </ul>
          </div>

          {/* Project Management */}
          <div className="skill-card">
            <FaChartLine className="skill-icon" />
            <h3>Project Management</h3>
            <p className="skill-description">Skilled at coordinating complex initiatives with multiple stakeholders</p>
            <ul className="skill-examples">
              <li>Welcome Week operations - $10K+ budget</li>
              <li>87-person trip coordination</li>
              <li>Multiple deployment releases at GCsurplus</li>
            </ul>
          </div>

          {/* Collaboration */}
          <div className="skill-card">
            <FaHandshake className="skill-icon" />
            <h3>Collaboration</h3>
            <p className="skill-description">Thrive in team environments and build strong working relationships</p>
            <ul className="skill-examples">
              <li>Cross-functional team coordination</li>
              <li>Conference organizing committee member</li>
              <li>Faculty council representation</li>
            </ul>
          </div>

          {/* Problem Solving */}
          <div className="skill-card">
            <FaPuzzlePiece className="skill-icon" />
            <h3>Problem Solving</h3>
            <p className="skill-description">Analytical approach to identifying and resolving technical challenges</p>
            <ul className="skill-examples">
              <li>SQL database optimization for scalability</li>
              <li>Hyperparameter tuning in ML research</li>
              <li>Quality assurance for government systems</li>
            </ul>
          </div>

          {/* Mentorship */}
          <div className="skill-card">
            <FaSeedling className="skill-icon" />
            <h3>Mentorship</h3>
            <p className="skill-description">Passionate about guiding and developing emerging talent</p>
            <ul className="skill-examples">
              <li>Supervised two junior executives</li>
              <li>Delegation leadership and support</li>
              <li>Student community engagement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Beyond Code - Personal Interests Section */}
      <section ref={(el) => (sectionRefs.current[6] = el)} id="interests" className="section container">
        <h2>Beyond Code</h2>
        <p className="interests-subtitle">Life outside the terminal - exploring passions and creativity</p>
        
        <div className="interests-content">
          {/* Personal Interests Grid */}
          <div className="interests-grid">
            <div className="interest-card">
              <FaMusic className="interest-icon" />
              <h3>Music Lover</h3>
              <p>From jazz to electronic beats, music fuels my coding sessions and creative thinking. I'm always discovering new artists and genres.</p>
            </div>

            <div className="interest-card">
              <FaPlane className="interest-icon" />
              <h3>Travel Enthusiast</h3>
              <p>Whether it's a weekend road trip or international adventures, I love experiencing the world, exploring new cultures and perspectives.</p>
            </div>

            <div className="interest-card">
              <FaPalette className="interest-icon" />
              <h3>Creative Expression</h3>
              <p>Photography, design, and visual storytelling. I believe great software is where technology meets art!</p>
            </div>

            <div className="interest-card">
              <FaCoffee className="interest-icon" />
              <h3>Coffee Connoisseur</h3>
              <p>Fueled by great coffee and meaningful conversations. Local coffee shops are my favorite remote work spots.</p>
            </div>
          </div>

          {/* Spotify Integration */}
          <div className="spotify-section">
            <h3 className="spotify-title">🎧 Currently Vibing To</h3>
            <div className="spotify-widget">
              {currentTrack ? (
                <div className="track-info">
                  <img src={currentTrack.albumArt} alt="Album art" className="album-art" />
                  <div className="track-details">
                    <h4>{currentTrack.name}</h4>
                    <p className="artist">{currentTrack.artist}</p>
                    <p className="album">{currentTrack.album}</p>
                  </div>
                </div>
              ) : (
                <div className="spotify-placeholder">
                  <p>🎵 Connect your Spotify to see what I'm listening to!</p>
                  <p className="spotify-note">Check out my coding playlists and discover new music</p>
                  {/* Embed a public Spotify playlist as placeholder */}
                  <div className="playlist-embed">
                    <iframe 
                      style={{borderRadius: '12px'}} 
                      src="https://open.spotify.com/playlist/5S95kfb39v4NxjwIo7vX6Q?si=h9I0MptmRRSQs9MS_qoGBg&pi=T_EoCV-5TAGZXmJH3U6Z0A" 
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen="" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      title="Spotify Playlist"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[7] = el)} id="contact" className="section container contact-section">
        <h2>Let's Connect</h2>
        <p className="contact-subtitle">I'm always excited to collaborate on new projects or discuss opportunities. Feel free to reach out!</p>
        
        <div className="contact-grid">
          {/* Email Card */}
          <a href="mailto:taradenaud4@gmail.com" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            </div>
            <h3>Email</h3>
            <p className="contact-value">taradenaud4@gmail.com</p>
            <p className="contact-action">Send me a message →</p>
          </a>

          {/* LinkedIn Card */}
          <a href="https://linkedin.com/in/taradenaud" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon-wrapper">
              <FontAwesomeIcon icon={faLinkedin} className="contact-icon" />
            </div>
            <h3>LinkedIn</h3>
            <p className="contact-value">linkedin.com/in/taradenaud</p>
            <p className="contact-action">Let's connect →</p>
          </a>

          {/* GitHub Card */}
          <a href="https://github.com/taradenaud" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon-wrapper">
              <FontAwesomeIcon icon={faGithub} className="contact-icon" />
            </div>
            <h3>GitHub</h3>
            <p className="contact-value">github.com/taradenaud</p>
            <p className="contact-action">Check out my code →</p>
          </a>

          {/* Resume Card */}
          <a href={testCV} className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon-wrapper">
              <FontAwesomeIcon icon={faFile} className="contact-icon" />
            </div>
            <h3>Resume</h3>
            <p className="contact-value">View my full experience</p>
            <p className="contact-action">Download PDF →</p>
          </a>
        </div>

        <div className="contact-footer">
          <p>Based in Ontario, Canada</p>
          <p className="availability">Currently seeking full-time opportunities</p>
        </div>
      </section>

      <Canvas
        className="webgl"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <Star />
      </Canvas>

      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h2>{modalContent.title}</h2>
            <div className="modal-body">{modalContent.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
