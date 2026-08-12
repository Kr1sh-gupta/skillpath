'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Copy, Check, ExternalLink, Code2, Globe, Sparkles, FileText, Send } from 'lucide-react';

export const SubmissionSection: React.FC = () => {
  const [copiedNote, setCopiedNote] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const noteText = `With two more days, I would implement persistent client-side caching (SWR/TanStack Query) to gracefully cache valid course responses during API outages, add an interactive cart/checkout modal with currency toggling, and introduce unit tests with MSW (Mock Service Worker) to mock the flaky API. 

Where I spent time was handling partial failures—specifically when the country endpoint fails while course data succeeds—ensuring the UI gracefully defaults to INR or USD with a visual notification rather than crashing. I am very satisfied with the bluish glassmorphism aesthetic, responsive 3-column grid, skeleton loaders, and property controls.`;

  const emailTemplate = `Hi Team,

Here is my submission for the Junior Developer role at Skillpath:

1. Published Vercel Link: https://YOUR-VERCEL-DEPLOYMENT.vercel.app
2. GitHub Repository: https://github.com/YOUR-USERNAME/skillpath
3. Short Note (<200 words):
${noteText}

4. AI Used: Gemini 3.6 Flash / Antigravity AI Pair Programming Agent.
5. Shared AI Conversation Link: [Insert Shared Chat Link Here]

Looking forward to your feedback and the screen-share call!

Best regards,
[Your Name]`;

  const handleCopyNote = () => {
    navigator.clipboard.writeText(noteText);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <section id="submission-info" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-blue-500/30 relative overflow-hidden shadow-2xl shadow-blue-950/50">
        
        {/* Ambient Glow */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-cyan-500/20 mb-2">
              <Send className="w-3.5 h-3.5" />
              <span>Assignment Submission Instructions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Where & What To Send (Hosted on Vercel)
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Reply to the assignment email with the 5 required items below.
            </p>
          </div>

          <button
            onClick={handleCopyTemplate}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            {copiedTemplate ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copiedTemplate ? 'Email Copying Done!' : 'Copy Email Response Template'}</span>
          </button>
        </div>

        {/* 5 Required Submission Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>The 5 Required Email Items</span>
            </h3>
            
            <ol className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span><strong>Published Vercel Link</strong> (replaces Framer link)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span><strong>GitHub Repository URL</strong> (Public repo with code)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span><strong>Short Note (&lt;200 words)</strong> (Prepared below)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">4.</span>
                <span><strong>AI Disclosure Statement</strong> ("Gemini 3.6 Flash / Antigravity")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">5.</span>
                <span><strong>Shared AI Conversation Link</strong></span>
              </li>
            </ol>
          </div>

          {/* Vercel & GitHub Guide */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>How To Host On Vercel & GitHub</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Push Code to GitHub:
                </div>
                <code className="text-[11px] text-cyan-300 block font-mono">
                  git init && git add . && git commit -m "Skillpath initial commit"<br />
                  gh repo create skillpath --public --source=. --push
                </code>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Deploy to Vercel:
                </div>
                <p className="text-[11px] text-slate-300">
                  Import repo on <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com/new</a> or run <code className="text-cyan-300 font-mono">npx vercel</code> in terminal.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Prepared 200-Word Candidate Note */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Prepared Candidate Note (&lt;200 words)</span>
            </h3>

            <button
              onClick={handleCopyNote}
              className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-cyan-300 border border-blue-500/30 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              {copiedNote ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNote ? 'Copied Note' : 'Copy Note'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/70 p-4 rounded-xl border border-white/5">
            "{noteText}"
          </p>
        </div>

      </div>
    </section>
  );
};
