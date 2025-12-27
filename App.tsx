
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Send, 
  Sparkles, 
  Globe, 
  Scale, 
  BookOpen, 
  Stethoscope, 
  Eye, 
  BrainCircuit,
  MessageCircle,
  ArrowRight,
  Handshake,
  ShieldAlert,
  GraduationCap,
  RefreshCw,
  PenTool,
  Wind,
  Lock,
  Building2,
  Smile,
  Laptop,
  Phone,
  Mail,
  Instagram,
  Linkedin
} from 'lucide-react';
import { MoodType, MoodResponse, InquiryForm, Vertical } from './types';
import { getMoodAdvice, getInquiryResponse, getReframedThought, getJournalPrompt } from './services/geminiService';
import BreathingApp from './components/BreathingApp';

const App: React.FC = () => {
  const [mood, setMood] = useState<MoodType | null>(null);
  const [moodAdvice, setMoodAdvice] = useState<MoodResponse | null>(null);
  const [isMoodLoading, setIsMoodLoading] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryForm>({ name: '', email: '', type: 'professional', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAcknowledge, setAiAcknowledge] = useState<string | null>(null);

  // CBT Reframer State
  const [negativeThought, setNegativeThought] = useState('');
  const [reframedThought, setReframedThought] = useState('');
  const [isReframing, setIsReframing] = useState(false);

  // Journaling State
  const [journalTheme, setJournalTheme] = useState('Compassion Fatigue');
  const [journalPrompt, setJournalPrompt] = useState('');
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  // 5-4-3-2-1 Grounding State
  const [groundingStep, setGroundingStep] = useState(0);
  const groundingSteps = useMemo(() => [
    { label: "5 things you see", desc: "Look around and name 5 objects in your immediate environment." },
    { label: "4 things you can touch", desc: "Feel the texture of your clothes, a desk, or the air on your skin." },
    { label: "3 things you hear", desc: "Listen for distant traffic, a clock ticking, or your own breath." },
    { label: "2 things you smell", desc: "Notice any scents in the room or the smell of your coffee/tea." },
    { label: "1 thing you taste", desc: "Focus on the lingering taste in your mouth or a sip of water." }
  ], []);

  const verticals: Vertical[] = [
    { id: 1, title: "Professional Incubation", desc: "Supervision and peer-support framework for licensed practitioners.", list: ["Case Supervision", "Ethical Guidance", "Peer Networks"], icon: "Stethoscope", color: "teal" },
    { id: 2, title: "Student Sanctuary", desc: "Comprehensive mental health support and internships for future professionals.", list: ["Internship Hub", "Crisis Support", "Academic Mentorship"], icon: "GraduationCap", color: "blue" },
    { id: 3, title: "Corporate Wellness", desc: "Data-driven employee assistance programs for mindful organizations.", list: ["EAP 2.0", "Burnout Prevention", "Managerial Training"], icon: "Building2", color: "indigo" },
    { id: 4, title: "Community Care", desc: "Low-cost, accessible clinical care for underserved populations.", list: ["Support Groups", "Sliding Scale Therapy", "Awareness Drives"], icon: "Users", color: "orange" },
    { id: 5, title: "Tech Support & Digital Health", desc: "Specialized technical assistance for mental health digital transformation.", list: ["Digital Infrastructure", "Practice Management Tech", "AI Implementation Ethics"], icon: "Laptop", color: "green" }
  ];

  const handleMoodSelect = async (m: MoodType) => {
    setMood(m);
    setIsMoodLoading(true);
    const advice = await getMoodAdvice(m);
    setMoodAdvice(advice);
    setIsMoodLoading(false);
  };

  const handleReframe = async () => {
    if (!negativeThought.trim()) return;
    setIsReframing(true);
    const result = await getReframedThought(negativeThought);
    setReframedThought(result || '');
    setIsReframing(false);
  };

  const handleNewPrompt = async () => {
    setIsGeneratingPrompt(true);
    const result = await getJournalPrompt(journalTheme);
    setJournalPrompt(result || '');
    setIsGeneratingPrompt(false);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await getInquiryResponse(inquiry.name, inquiry.type, inquiry.message);
    setAiAcknowledge(response);
    setIsSubmitting(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!journalPrompt) handleNewPrompt();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-teal-100 selection:text-teal-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="logo.png" alt="Manovratha Logo" className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
            <div className="hidden flex items-center gap-2">
              <div className="bg-teal-700 p-1.5 rounded-lg">
                <Heart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Manovratha</span>
            </div>
          </div>
          <div className="hidden lg:flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <button onClick={() => scrollToSection('story')} className="hover:text-teal-600 transition">Our Story</button>
            <button onClick={() => scrollToSection('pillars')} className="hover:text-teal-600 transition">Pillars</button>
            <button onClick={() => scrollToSection('wellness')} className="hover:text-teal-600 transition">Wellness Lab</button>
            <button onClick={() => scrollToSection('b2b')} className="hover:text-teal-600 transition">B2B</button>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.open('https://wa.me/919701782182', '_blank')}
              className="hidden md:flex items-center gap-2 border border-teal-600 text-teal-700 px-5 py-2 rounded-full text-xs font-bold hover:bg-teal-50 transition"
            >
              <i className="fab fa-whatsapp text-lg"></i> Join Pro Network
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-teal-700 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-teal-900/10 hover:bg-teal-800 transition active:scale-95"
            >
              Join Sanctuary
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-orange-50/30"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100/50 text-teal-800 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex items-center gap-2"><Sparkles className="w-3 h-3" /> Redefining Mental Health Ecosystems</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-[0.95] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
            A Holistic Global <br /> <span className="text-teal-700">Sanctuary</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            A specialized ecosystem for mental health professionals and institutions. Where empathy meets intelligence to transform lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group bg-teal-700 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-teal-800 transition-all flex items-center gap-3"
            >
              Join the Community <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('wellness')}
              className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:border-teal-200 transition-all shadow-xl"
            >
              Practitioner Wellness Lab
            </button>
          </div>
        </div>
      </section>

      {/* Daily Resonance */}
      <section className="py-24 bg-white relative border-b border-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Daily Resonance</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                As practitioners, checking in with our own internal state is paramount. Our analyzer provides therapeutic resonance for your current mood.
              </p>
              <div className="flex items-center gap-4 p-4 bg-teal-50 border border-teal-100 rounded-2xl">
                <ShieldAlert className="text-teal-500 w-6 h-6 shrink-0" />
                <p className="text-sm text-teal-800 font-medium italic">"Self-care is not a luxury; it's a clinical necessity."</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-gray-50/50 rounded-[3rem] p-10 border border-gray-100 text-center">
                <div className="flex flex-wrap justify-center gap-5 mb-10">
                  {(['Struggling', 'Okay', 'Good', 'Great'] as MoodType[]).map((m) => (
                    <button 
                      key={m}
                      onClick={() => handleMoodSelect(m)}
                      className={`w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded-[2rem] transition-all duration-500 ${
                        mood === m ? 'bg-teal-700 text-white shadow-2xl scale-110 -translate-y-2' : 'bg-white text-gray-300 hover:text-teal-600 border border-gray-100 hover:shadow-xl'
                      }`}
                    >
                      <span className="text-4xl md:text-5xl mb-3">
                        {m === 'Struggling' && '😟'}
                        {m === 'Okay' && '😐'}
                        {m === 'Good' && '😊'}
                        {m === 'Great' && '🤩'}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{m}</span>
                    </button>
                  ))}
                </div>
                <div className="min-h-[100px] flex items-center justify-center">
                  {isMoodLoading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-teal-600" />
                      <span className="text-xs font-black uppercase text-teal-600 tracking-widest">Generating Insight...</span>
                    </div>
                  ) : moodAdvice ? (
                    <div className="animate-in fade-in zoom-in duration-500">
                      <p className="text-xl text-gray-800 font-serif italic mb-3 leading-relaxed">"{moodAdvice.message}"</p>
                      <p className="text-sm font-bold text-teal-600 bg-teal-50 inline-block px-4 py-1 rounded-full">{moodAdvice.advice}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic text-sm">Reflect on your resonance today.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Strategic Pillars */}
      <section id="pillars" className="py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <span className="text-teal-600 font-black uppercase text-xs tracking-widest mb-4 block">Our Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Five Pillars of Clinical Excellence</h2>
            <p className="text-gray-500 mt-6 text-lg">Manovratha operates across five distinct verticals, integrating clinical expertise with modern digital support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {verticals.map((v) => (
              <div key={v.id} className="group p-8 rounded-[2.5rem] bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-700 mb-8 group-hover:scale-110 transition-transform">
                  {v.icon === "Stethoscope" && <Stethoscope className="w-7 h-7" />}
                  {v.icon === "GraduationCap" && <GraduationCap className="w-7 h-7" />}
                  {v.icon === "Building2" && <Building2 className="w-7 h-7" />}
                  {v.icon === "Users" && <Users className="w-7 h-7" />}
                  {v.icon === "Laptop" && <Laptop className="w-7 h-7" />}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-grow">{v.desc}</p>
                <ul className="space-y-3">
                  {v.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Lab */}
      <section id="wellness" className="py-32 bg-gray-50 overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-teal-600 font-black uppercase text-xs tracking-widest mb-4 block">Professional Care Suite</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">The Practitioner's Wellness Lab</h2>
              <p className="text-gray-500 mt-4 text-lg">Utility tools designed to support your clinical well-being and professional growth.</p>
            </div>
            <div className="bg-teal-700/5 px-4 py-2 rounded-full border border-teal-700/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span className="text-[10px] font-black text-teal-800 uppercase tracking-widest">AI Roadmap Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Tool 1: Box Breathing */}
            <div className="lg:col-span-12 xl:col-span-8 bg-gray-900 rounded-[3.5rem] p-12 text-white shadow-2xl flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group min-h-[450px]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[120px] pointer-events-none"></div>
              <div className="shrink-0 scale-110">
                <BreathingApp />
              </div>
              <div className="space-y-6 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400"><Wind className="w-6 h-6" /></div>
                  <h3 className="text-3xl font-bold text-teal-400">Box Breathing</h3>
                </div>
                <p className="text-gray-400 italic font-serif">"Regulation of the breath is the key to mastering the mind."</p>
                <div className="space-y-4">
                  <div className="flex gap-3 text-sm text-gray-300"><Zap className="w-5 h-5 text-teal-500 shrink-0" /> Immediate vagus nerve stimulation for stress recovery.</div>
                  <div className="flex gap-3 text-sm text-gray-300"><Zap className="w-5 h-5 text-teal-500 shrink-0" /> Clinical protocol for between-session grounding.</div>
                  <div className="flex gap-3 text-sm text-gray-300"><Zap className="w-5 h-5 text-teal-500 shrink-0" /> Restores parasympathetic balance in under 2 minutes.</div>
                </div>
              </div>
            </div>

            {/* Tool 2: CBT Thought Reframer (COMING SOON) */}
            <div className="lg:col-span-6 xl:col-span-4 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all h-full relative group">
              <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[2px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                 <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                    <Lock className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Reframer: Coming Soon</span>
                 </div>
              </div>
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">Thought Reframer</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">CBT Clinical Tool</p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><RefreshCw className="w-6 h-6" /></div>
              </div>
              <div className="space-y-6">
                <textarea disabled placeholder="Input a negative thought..." className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm outline-none resize-none h-32 opacity-50" />
                <button disabled className="w-full bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.2em] py-4 rounded-xl shadow-lg opacity-50 flex items-center justify-center gap-2">
                  <BrainCircuit className="w-4 h-4" /> AI Reframing
                </button>
              </div>
            </div>

            {/* Tool 3: Socratic Journaling */}
            <div className="lg:col-span-6 xl:col-span-4 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">Socratic Catalyst</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Curated Prompts</p>
                </div>
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><PenTool className="w-6 h-6" /></div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[140px] p-6 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center relative group">
                  {isGeneratingPrompt ? (
                    <Loader2 className="animate-spin text-purple-600" />
                  ) : (
                    <p className="text-sm text-purple-900 font-medium text-center leading-relaxed">"{journalPrompt}"</p>
                  )}
                  <button onClick={handleNewPrompt} className="absolute bottom-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95">
                    <RefreshCw className="w-4 h-4 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tool 4: Sensory Grounding */}
            <div className="lg:col-span-6 xl:col-span-4 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">Sensory Shield</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Grounding Tool</p>
                </div>
                <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl"><Eye className="w-6 h-6" /></div>
              </div>
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 text-orange-600 rounded-full font-black text-xl mb-4 border border-orange-100 shadow-inner">
                    {groundingStep + 1}
                  </div>
                  <h5 className="font-bold text-gray-800 text-lg mb-2">{groundingSteps[groundingStep].label}</h5>
                  <p className="text-sm text-gray-500 leading-relaxed px-4">{groundingSteps[groundingStep].desc}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setGroundingStep((prev) => (prev - 1 + 5) % 5)} className="flex-1 py-4 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition">Back</button>
                  <button onClick={() => setGroundingStep((prev) => (prev + 1) % 5)} className="flex-[2] py-4 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-700 transition">Next</button>
                </div>
              </div>
            </div>

            {/* Tool 5: Meditation Catalyst */}
            <div className="lg:col-span-6 xl:col-span-4 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-gray-900">Meditation Script</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Focus & Visualization</p>
                  </div>
                  <div className="p-3 bg-teal-100 text-teal-600 rounded-2xl"><Sparkles className="w-6 h-6" /></div>
                </div>
                <div className="p-8 bg-teal-50/50 rounded-2xl border border-teal-100/50 italic text-sm text-teal-900 leading-relaxed">
                  "Visualize your professional space filled with a soft, warm light. With every breath, this light clears away the residual stress of the day..."
                </div>
              </div>
              <button className="mt-8 w-full py-4 border-2 border-teal-600 text-teal-700 font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-teal-50 transition">View Full Script</button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional B2B / Partnerships */}
      <section id="b2b" className="py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="bg-[#0F172A] rounded-[4rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 blur-[100px] pointer-events-none"></div>
            <div className="lg:w-1/2 space-y-8">
              <span className="text-teal-400 font-black uppercase text-xs tracking-[0.3em]">Institutional B2B</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ecosystem Partnerships for Mindful Organizations.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">We partner with universities, hospitals, and corporations to implement specialized mental health frameworks that prioritize sustainable clinical outcomes and human dignity.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">MHCA Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Data Sovereignty</span>
                </div>
              </div>
              <button onClick={() => scrollToSection('contact')} className="bg-teal-600 hover:bg-teal-500 text-white font-black uppercase text-[10px] tracking-[0.2em] px-10 py-5 rounded-full transition-all shadow-xl shadow-teal-900/40">Request Institutional Deck</button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-teal-500/20 transition-all">
                <Building2 className="w-10 h-10 text-teal-400 mb-4" />
                <h5 className="font-bold text-sm">Corporate EAP</h5>
              </div>
              <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-teal-500/20 transition-all">
                <GraduationCap className="w-10 h-10 text-teal-400 mb-4" />
                <h5 className="font-bold text-sm">Campus Support</h5>
              </div>
              <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-teal-500/20 transition-all">
                <Stethoscope className="w-10 h-10 text-teal-400 mb-4" />
                <h5 className="font-bold text-sm">Clinic Networks</h5>
              </div>
              <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-teal-500/20 transition-all">
                <Handshake className="w-10 h-10 text-teal-400 mb-4" />
                <h5 className="font-bold text-sm">NGO Alliances</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-32 bg-[#0F172A] text-white overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-teal-400 font-black uppercase text-xs tracking-[0.3em] mb-6 block">The Genesis</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Where mental health meets community.</h2>
              <div className="space-y-8 text-gray-400 text-lg leading-relaxed font-light">
                <p>Manovratha began with one powerful belief: mental health deserves the same innovation, precision, and accessibility as every modern industry. We saw a gap between the clinical world and the human experience.</p>
                <p>This belief brought together an uncommon team — <span className="text-white font-semibold">licensed mental health professionals and forward-thinking tech innovators</span>. Together, we are building more than an app; we are building a sanctuary.</p>
                <p>Our journey is rooted in empathy, guided by clinical rigor, and powered by the collective strength of our global community. We are here to support those who support others.</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-[4rem] border border-white/10 flex items-center justify-center p-12">
                 <div className="text-center space-y-6">
                    <Heart className="w-20 h-20 text-teal-400 mx-auto" />
                    <h3 className="text-3xl font-serif italic text-teal-100">"Empowering the supporters is the only way to heal the world."</h3>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section id="values" className="py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Ethical Framework</h2>
            <p className="text-gray-500 text-lg">Setting public good as the foundation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Users />, title: "Collective Ownership", text: "Every member is an equal steward of our legacy." },
              { icon: <Heart />, title: "Non-Stigmatization", text: "Stigma-free care is the non-negotiable core." },
              { icon: <ShieldCheck />, title: "Legal Stewardship", text: "Compliance with Indian Mental Healthcare Act 2017." },
              { icon: <Handshake />, title: "Strategic Partnerships", text: "Collaborations that amplify our mission." },
              { icon: <Scale />, title: "Transparency & Trust", text: "Ethical processes and responsible disclosure." },
              { icon: <GraduationCap />, title: "Gender Empowerment", text: "Fostering leadership for women professionals." }
            ].map((v, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 text-teal-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-700 group-hover:text-white transition-colors">{v.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{v.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gray-50 border-t border-gray-100 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-teal-700 p-12 md:p-16 text-white flex flex-col justify-between">
                <div><h2 className="text-4xl font-bold mb-8 font-serif leading-tight">Join the Sanctuary Hub.</h2></div>
                <button onClick={() => window.open('https://wa.me/919701782182', '_blank')} className="w-full bg-white text-teal-800 font-black uppercase text-xs tracking-widest py-5 rounded-2xl hover:bg-teal-50 transition flex items-center justify-center gap-3 shadow-xl active:scale-95">
                  <i className="fab fa-whatsapp text-xl"></i> Join Pro Network
                </button>
              </div>
              <div className="lg:col-span-7 p-12 md:p-16">
                {aiAcknowledge ? (
                  <div className="text-center py-20 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"><ShieldCheck className="w-10 h-10" /></div>
                    <p className="italic text-gray-600 mb-10 leading-relaxed">"{aiAcknowledge}"</p>
                    <button onClick={() => setAiAcknowledge(null)} className="text-teal-700 font-black uppercase text-xs tracking-widest hover:underline">New Submission →</button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Name</label>
                        <input required type="text" value={inquiry.name} onChange={(e) => setInquiry({...inquiry, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-teal-700 outline-none transition-all" placeholder="Your Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email</label>
                        <input required type="email" value={inquiry.email} onChange={(e) => setInquiry({...inquiry, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-teal-700 outline-none transition-all" placeholder="Email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Message</label>
                      <textarea required value={inquiry.message} onChange={(e) => setInquiry({...inquiry, message: e.target.value})} className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-teal-700 outline-none transition-all h-32" placeholder="How can we partner with you?" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white font-black uppercase text-xs tracking-[0.3em] py-5 rounded-2xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />} Submit Requirement
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-20 text-center flex flex-col items-center gap-10">
        <img src="logo.png" alt="Manovratha Logo" className="h-12 w-auto object-contain" />
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-full text-teal-700 mb-1"><Phone className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-gray-600">94928 34190 / 62817 89724</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-full text-teal-700 mb-1"><Mail className="w-4 h-4" /></div>
            <a href="mailto:wellbeing@manovratha.in" className="text-xs font-bold text-gray-600 hover:text-teal-700 transition underline underline-offset-4 decoration-teal-200">wellbeing@manovratha.in</a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-full text-teal-700 mb-1"><Instagram className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-gray-600">@manovratha</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-full text-teal-700 mb-1"><Linkedin className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-gray-600">manovratha</span>
          </div>
        </div>

        <div className="w-20 h-px bg-gray-100"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">&copy; 2025 Manovratha Private Limited. Empowering Minds.</p>
      </footer>
    </div>
  );
};

export default App;
