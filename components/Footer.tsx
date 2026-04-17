"use client"
import React from 'react';
import { ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Helper for smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Accounting for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-[#F8FAFC] pt-16 pb-8 px-6 overflow-hidden">
      {/* --- BACKGROUND DECOR --- */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 60H0V0h60v60zM1 1v58h58V1H1z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} 
      />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                <ShieldCheck size={18} />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">Invoice Manager</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-6 text-sm">
              Streamlining Nigerian tax compliance through automated workflows and multi-role verification.
            </p>
            <div className="flex gap-3">
              <SocialLink icon={<Mail size={16} />} href="mailto:support@example.com" />
            </div>
          </div>

          {/* Links Columns - Updated to anchor tags */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Product</h4>
            <ul className="space-y-3">
              <FooterSectionLink onClick={(e) => scrollToSection(e, 'features')}>Features</FooterSectionLink>
              <FooterSectionLink onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</FooterSectionLink>
              <FooterSectionLink onClick={(e) => scrollToSection(e, 'process')}>Our Process</FooterSectionLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Support</h4>
            <ul className="space-y-3">
              <FooterSectionLink onClick={(e) => scrollToSection(e, 'faq')}>FAQs</FooterSectionLink>
              <FooterSectionLink onClick={(e) => scrollToSection(e, 'contact')}>Contact</FooterSectionLink>
              <FooterSectionLink onClick={(e) => scrollToSection(e, 'docs')}>Docs</FooterSectionLink>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-[1.5rem] bg-white border border-slate-200/60 shadow-sm shadow-slate-100">
              <h4 className="text-xs font-black text-slate-900 mb-1">Waitlist</h4>
              <p className="text-[10px] font-medium text-slate-400 mb-3">Get FIRS regulation alerts.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="email@company.com" 
                  className="w-full h-10 bg-slate-50 border border-slate-100 rounded-lg px-3 text-[11px] font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                <button className="absolute right-1 top-1 h-8 w-8 bg-slate-900 text-white rounded-md flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              &copy; {currentYear} Invoice Manager
            </span>
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.1em] text-emerald-600">
                System Active
              </span>
            </div>
          </div>
          
          <div className="flex gap-6">
            <button className="text-[9px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Privacy</button>
            <button className="text-[9px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSectionLink({ children, onClick }: { children: React.ReactNode, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <li>
      <a 
        href="#"
        onClick={onClick}
        className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-all hover:translate-x-1 inline-block"
      >
        {children}
      </a>
    </li>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all"
    >
      {icon}
    </a>
  );
}