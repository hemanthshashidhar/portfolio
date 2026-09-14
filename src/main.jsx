import { useEffect, useRef, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, BrainCircuit, ChevronRight, GitFork, Layers3, Mail, Menu, Network, Sparkles, X } from 'lucide-react';
import './styles.css';
import aiCore from './assets/ai-core.png';

const projects = [
  {
    id: '01', name: 'KnowledgeFlow AI', type: 'RAG / DOCUMENT INTELLIGENCE', icon: Layers3,
    color: '#8d7aff', tags: ['FastAPI', 'ChromaDB', 'Gemini'],
    copy: 'A source-grounded document intelligence engine that turns dense PDFs into useful answers, summaries, notes, and interview prep.',
    detail: 'Semantic chunking · Sentence Transformers · Similarity ranking',
    href: 'https://github.com/hemanthshashidhar/KnowledgeFlow-AI'
  },
  {
    id: '02', name: 'ResearchOS AI', type: 'MULTI-AGENT RESEARCH', icon: Network,
    color: '#00d5bf', tags: ['LangGraph', 'LangChain', 'FastAPI'],
    copy: 'Five specialized agents collaborate from planning through research, GitHub analysis, review, and export-ready technical reports.',
    detail: 'Planner → Search → GitHub → Reviewer → Report', href: 'https://github.com/hemanthshashidhar/Research-AI'
  },
  {
    id: '03', name: 'VisionForge AI', type: 'COMPUTER VISION', icon: BrainCircuit,
    color: '#f6a84c', tags: ['PyTorch', 'Grad-CAM', 'ONNX'],
    copy: 'An end-to-end visual intelligence platform, from transfer-learning experiments to explainable production-ready inference.',
    detail: '88.37% accuracy · MobileNetV3 · ResNet50 · EfficientNet', href: 'https://github.com/hemanthshashidhar/VisionForge-AI'
  },
];

const securityProjects = [
  { id: '04', name: 'SENTINEL-GUARD', type: 'AI SCAM DEFENSE', icon: BrainCircuit, color: '#ff5b6e', tags: ['Whisper AI', 'OpenCV', 'ONNX'], copy: 'A multimodal defense system for digital-arrest and deepfake scams across voice, video, documents, caller ID, and evidence capture.', detail: 'Voice · Deepfake · OCR · NLP · panic response', href: 'https://github.com/hemanthshashidhar/SENTINEL-GUARD' },
  { id: '05', name: 'VulnWhisper', type: 'AI RECON AGENT', icon: Network, color: '#a5ff57', tags: ['ReAct', 'OpenRouter', 'Python'], copy: 'An AI-guided reconnaissance agent that reasons through authorized bug-bounty discovery and produces structured findings.', detail: 'Authorized targets only · guided + autonomous modes', href: 'https://github.com/hemanthshashidhar/vulnwhisper' },
  { id: '06', name: 'SecureScope', type: 'LIVE SECURITY MONITORING', icon: Layers3, color: '#58b5ff', tags: ['Streamlit', 'tshark', 'Python'], copy: 'A real-time Linux security dashboard unifying SSH signals, honeypot activity, host telemetry, packet anomalies, and attacker geolocation.', detail: 'SSH brute force · honeypot · port scans · SYN bursts', href: 'https://github.com/hemanthshashidhar/honeywell' },
  { id: '07', name: 'PacketPoet', type: 'NETWORK STORYTELLING', icon: Network, color: '#ff75dd', tags: ['Scapy', 'Wireshark', 'CLI'], copy: 'A PCAP and live-traffic analyzer that converts raw network flows into technical reports, cyberpunk logs, or spy-thriller narratives.', detail: 'Wireshark plugin · live capture · anomaly context', href: 'https://github.com/hemanthshashidhar/packetpoetcli' },
  { id: '08', name: 'TakeoverHunter', type: 'ATTACK SURFACE VALIDATION', icon: Layers3, color: '#ffc45b', tags: ['DNS', 'OSINT', 'Python'], copy: 'A focused workflow for finding and validating subdomain-takeover exposure, with structured vulnerability-report output.', detail: 'Authorized programs only · DNS → validation → report', href: 'https://github.com/hemanthshashidhar/subdomain-takeover' },
  { id: '09', name: 'Agent Prompt Scanner', type: 'AI SECURITY TOOLING', icon: BrainCircuit, color: '#8d7aff', tags: ['Typer', 'Pydantic', 'Rules'], copy: 'A typed CLI scanner architecture for discovering and reporting prompt-related risks across AI-agent project files.', detail: 'File discovery · rule engine · severity findings', href: 'https://github.com/hemanthshashidhar/agent-prompt-scanner' },
];

function Magnetic({ children, className = '' }) {
  const [style, setStyle] = useState({});
  return <div className={className} style={style} onMouseMove={e => { const r=e.currentTarget.getBoundingClientRect(); setStyle({transform:`translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`})}} onMouseLeave={() => setStyle({})}>{children}</div>;
}

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  const visual = index % 3;
  return <article className={`project-card card-${index}`} style={{'--accent': project.color}}>
    <div className="card-no">{project.id}</div><div className="card-glow" />
    <div className="card-top"><span className="project-type">{project.type}</span><Icon size={22}/></div>
    <div className="project-visual" aria-hidden="true">
      {visual === 0 && <><span className="doc d1"/><span className="doc d2"/><span className="doc d3"/><span className="scan"/></>}
      {visual === 1 && <><span className="node n1"/><span className="node n2"/><span className="node n3"/><span className="node n4"/><i className="link l1"/><i className="link l2"/><i className="link l3"/></>}
      {visual === 2 && <><span className="lens"/><span className="focus f1"/><span className="focus f2"/><span className="focus f3"/></>}
    </div>
    <div className="card-content"><h3>{project.name}</h3><p>{project.copy}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div>
    <a className="project-link" href={project.href} target="_blank" rel="noreferrer">Explore system <ArrowUpRight size={18}/></a>
    <div className="card-detail">{project.detail}</div>
  </article>
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const storyRef = useRef(null);

  useEffect(() => {
    let frame;
    const updateStory = () => {
      frame = undefined;
      const story = storyRef.current;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / distance));
      setStoryProgress(previous => Math.abs(previous - nextProgress) > 0.001 ? nextProgress : previous);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateStory);
    };
    updateStory();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <main>
    <div className="noise"/><div className="cursor-orb"/>
    <nav><a className="monogram" href="#top" aria-label="Home">HK<span>°</span></a><div className={`nav-links ${menu?'open':''}`}><a href="#work" onClick={()=>setMenu(false)}>Work</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></div><a className="nav-cta" href="mailto:hemanthkumarr018@gmail.com">Let’s talk <ArrowUpRight size={15}/></a><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></nav>
    <div className="scroll-story" ref={storyRef} style={{ '--story-progress': storyProgress }}>
      <div className="story-pin">
    <section className="hero" id="top">
      <div className="hero-grid"/><div className="eyebrow"><span className="pulse"/> Available for ML internships · 2026</div>
      <div className="hero-copy"><p className="hero-kicker">COMPUTER SCIENCE / AI ENGINEERING</p><h1>Building <em>intelligence</em><br/>that earns trust.</h1><p className="hero-intro">I’m Hemanth Kumar, a final-year engineer turning retrieval, agents, and vision models into reliable products.</p><div className="hero-actions"><Magnetic className="mag"><a className="button primary" href="#work">See selected work <ArrowDownRight size={18}/></a></Magnetic><Magnetic className="mag"><a className="button ghost" href="mailto:hemanthkumarr018@gmail.com">Start a conversation</a></Magnetic></div></div>
      <div className="hero-art"><img src={aiCore} alt="Abstract luminous AI data structure"/><div className="orbit orbit-1"/><div className="orbit orbit-2"/><span className="art-label a1">SYSTEMS<br/>THINKING</span><span className="art-label a2">APPLIED<br/>INTELLIGENCE</span></div>
      <div className="scroll-note">SCROLL TO ENTER <span>↓</span></div><div className="hero-index">01 — 04</div>
    </section>
    <section className="story-reveal" aria-label="Selected work">
      <div className="marquee"><div>RETRIEVAL SYSTEMS <i>✦</i> MULTI-AGENT WORKFLOWS <i>✦</i> COMPUTER VISION <i>✦</i> RELIABLE AI <i>✦</i> RETRIEVAL SYSTEMS <i>✦</i></div></div>
      <div className="work-intro"><p className="section-label">SELECTED SYSTEMS / 2025—26</p><h2>Built to be <em>used, not just seen.</em></h2><p>Three focused explorations in making complex AI feel useful, explainable, and ready for the real world.</p></div>
    </section>
      </div>
    </div>
    <section id="work" className="work section"><div className="projects">{projects.map((p,i)=><ProjectCard key={p.name} project={p} index={i}/>)}</div></section>
    <section className="cyber section"><div className="section-head"><div><p className="section-label">CYBERSECURITY / APPLIED DEFENSE</p><h2>Built for the<br/><em>adversarial edge.</em></h2></div><p className="section-side">Security systems that observe attack surfaces, make signals legible, and help people respond with confidence.</p></div><div className="projects security-projects">{securityProjects.map((p,i)=><ProjectCard key={p.name} project={p} index={i}/>)}</div></section>
    <section id="about" className="about section"><div className="about-stamp">HK<br/><span>2026</span></div><div className="about-main"><p className="section-label">THE OPERATOR</p><h2>I like the part where an idea becomes a <em>working system.</em></h2><p>My work sits at the intersection of machine learning, product thinking, and careful engineering—from the first messy dataset to an interface people can actually use.</p><div className="stats"><div><strong>3</strong><span>Production-style<br/>AI platforms</span></div><div><strong>88.37%</strong><span>Vision model<br/>accuracy</span></div><div><strong>5</strong><span>Agents in one<br/>research workflow</span></div></div></div><div className="stack"><p>TOOLKIT</p>{['Python','PyTorch','LangGraph','FastAPI','ChromaDB','OpenCV','SQL','Git'].map((s,i)=><span key={s} style={{'--i':i}}>{s}<ChevronRight size={15}/></span>)}</div></section>
    <section id="contact" className="contact"><div className="contact-spark"><Sparkles/></div><p className="section-label">HAVE A PROBLEM WORTH SOLVING?</p><h2>Let’s make it<br/><em>intelligent.</em></h2><a className="contact-email" href="mailto:hemanthkumarr018@gmail.com">hemanthkumarr018@gmail.com <ArrowUpRight/></a><div className="contact-bottom"><span>© 2026 HEMANTH KUMAR K S</span><div><a href="https://github.com/hemanthshashidhar" target="_blank" rel="noreferrer"><GitFork size={16}/> GitHub</a><a href="mailto:hemanthkumarr018@gmail.com"><Mail size={16}/> Email</a></div></div></section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />);
