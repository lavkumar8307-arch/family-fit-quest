import React, { useState } from 'react';
import { Trophy, GitBranch, CheckCircle2, UserCheck, MessageSquare, AlertCircle, Sparkles, ExternalLink, ShieldAlert, Star } from 'lucide-react';
import { playSound } from '../services/audioSynthesizer';

export const SubmissionHubModal = () => {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  const amazonReviewers = [
    { name: 'Chris Traganos', handle: 'chris-trag', githubUrl: 'https://github.com/chris-trag' },
    { name: 'Kourtney Meiss', handle: 'knmeiss', githubUrl: 'https://github.com/knmeiss' },
    { name: 'Giovanni Laquidara', handle: 'giolaq', githubUrl: 'https://github.com/giolaq' },
    { name: 'Anisha Malde', handle: 'anishamalde', githubUrl: 'https://github.com/anishamalde' },
    { name: 'Moses Roth', handle: 'mosesroth', githubUrl: 'https://github.com/mosesroth' },
    { name: 'Emerson Sklar', handle: 'emersonsklar', githubUrl: 'https://github.com/emersonsklar' }
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Top Banner */}
      <div className="glass-panel-glow" style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #FF9900 0%, #FF007A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(255, 153, 0, 0.5)'
          }}>
            <Trophy size={36} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                Amazon Developer Hackathon Submission Hub
              </h2>
              <span className="badge-amazon">Fire TV Track</span>
            </div>
            <p style={{ color: '#94A3B8', marginTop: '6px', fontSize: '1rem' }}>
              Project: <strong>Family Fit Quest</strong> • Primary Track: Fire TV • Mini Challenges: AWS Builder & Open Source
            </p>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {[
          { id: 'overview', label: 'Project Description' },
          { id: 'collaborators', label: 'GitHub Collaborators Checklist' },
          { id: 'feedback', label: 'Amazon Product Feedback' },
          { id: 'friction', label: 'Friction Log (+10% Bonus)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('select');
              setActiveSubTab(tab.id);
            }}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className={`tv-focusable ${activeSubTab === tab.id ? 'is-focused' : ''}`}
            style={{
              padding: '12px 20px',
              borderRadius: '14px',
              background: activeSubTab === tab.id ? 'rgba(255, 153, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: activeSubTab === tab.id ? '#FF9900' : '#E2E8F0',
              fontWeight: '800',
              fontSize: '0.95rem',
              border: activeSubTab === tab.id ? '1px solid #FF9900' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Project Description */}
      {activeSubTab === 'overview' && (
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#FF9900', fontWeight: '800', margin: 0 }}>
            What Family Fit Quest Does & How It Works
          </h3>
          <p style={{ fontSize: '1rem', color: '#E2E8F0', lineHeight: '1.6' }}>
            <strong>Family Fit Quest</strong> is an interactive multi-player family fitness game built for Amazon Fire TV (10-foot UI experience). Up to 4 family members (kids and parents) play together on screen through exciting adventure quest modes (Jungle Dash, Cosmic Dance-Off, Lava Temple Escape, Superhero Academy).
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#00F0FF', margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>📺 10-Foot Spatial UI</h4>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '6px' }}>
                Full D-Pad focus mapping designed specifically for Fire TV remote controllers (Arrow Keys, Select, Esc/Back, Home).
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#FF9900', margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>🤖 AWS Bedrock AI Engine</h4>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '6px' }}>
                Generates kid-friendly post-workout stories, individual family member badges, and adaptive fitness advice via Claude 3.5 Sonnet & Amazon Nova.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#00FF87', margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>📱 Mobile Vision Pose Relay</h4>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '6px' }}>
                Uses an open-source library (@family-fit/pose-stream) to relay coffee-table phone camera pose vectors to Fire TV over WebSockets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Collaborators Checklist */}
      {activeSubTab === 'collaborators' && (
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#00F0FF', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={24} /> Amazon Developer Relations Collaborator Invites
            </h3>
            <p style={{ color: '#94A3B8', marginTop: '4px', fontSize: '0.9rem' }}>
              Ensure your private GitHub repository adds the following Amazon team members under Settings &gt; Collaborators:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {amazonReviewers.map((rev, idx) => (
              <div key={idx} style={{ background: '#121726', padding: '16px', borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1rem', fontWeight: '800' }}>{rev.name}</h4>
                  <code style={{ fontSize: '0.8rem', color: '#00F0FF', background: '#080A12' }}>@{rev.handle}</code>
                </div>
                <a
                  href={rev.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#FF9900', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: '700' }}
                >
                  Profile <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94A3B8', background: 'rgba(255,153,0,0.1)', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(255,153,0,0.3)' }}>
            ⚠️ Remember to also invite <strong>testing@devpost.com</strong> to your repository!
          </div>
        </div>
      )}

      {/* Tab Content: Amazon Product Feedback */}
      {activeSubTab === 'feedback' && (
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#FF9900', fontWeight: '800', margin: 0 }}>
            Required Product Feedback on Amazon Developer Tools
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: '#FF9900', margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>1. Fire TV Web App SDK & 10-Foot D-Pad Focus Engine</h4>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '6px' }}>
                <strong>What we used it for:</strong> Building the 10-foot television spatial UI navigation, remote key bindings (ArrowUp, ArrowDown, Enter, Esc), and multi-player game HUD.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#00FF87', marginTop: '4px' }}>
                <strong>What worked well:</strong> Web view performance on Fire OS is extremely smooth and handles WebGL/Canvas 60fps skeletal rendering gracefully.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#FF007A', marginTop: '4px' }}>
                <strong>What needs work:</strong> Native D-Pad focus ring styling APIs could be standard across Silk web views to simplify focus management.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: '#00F0FF', margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>2. AWS Bedrock Runtime API (Claude 3.5 Sonnet & Amazon Nova)</h4>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '6px' }}>
                <strong>What we used it for:</strong> AWS Builder Mini Challenge – Generating kid-friendly post-workout family recaps, form score analysis, and voice assistance.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#00FF87', marginTop: '4px' }}>
                <strong>What worked well:</strong> Claude 3.5 Sonnet on Bedrock delivered structured JSON responses under 500ms, making it ideal for live TV voice interactions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Friction Log (+10% Judging Bonus) */}
      {activeSubTab === 'friction' && (
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#FF007A', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={24} /> Amazon Developer Friction Log (+10% Judging Bonus)
            </h3>
            <span style={{ background: 'rgba(255,0,122,0.2)', color: '#FF007A', padding: '4px 12px', borderRadius: '12px', fontWeight: '800', fontSize: '0.8rem' }}>
              SEVERITY: MEDIUM (WORKAROUND DOCUMENTED)
            </span>
          </div>

          <div style={{ background: '#121726', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,0,122,0.3)', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
            <div>
              <strong style={{ color: '#FFFFFF' }}>Task Attempted:</strong> Relay real-time camera joint telemetry from a phone to Fire TV web app without requiring built-in TV camera.
            </div>
            <div>
              <strong style={{ color: '#FFFFFF' }}>Steps Taken:</strong> Evaluated Fire TV Web App SDK media devices API vs WebSocket relay.
            </div>
            <div>
              <strong style={{ color: '#FF007A' }}>Expected vs Actual:</strong> Expected built-in Fire TV Web App focus state helper; actually needed custom CSS spatial focus mapping.
            </div>
            <div>
              <strong style={{ color: '#00FF87' }}>Workaround Used:</strong> Built <code style={{ color: '#00FF87' }}>@family-fit/pose-stream</code> open source library to relay phone telemetry over WebSockets.
            </div>
            <div>
              <strong style={{ color: '#00F0FF' }}>Actionable Suggestion for Amazon:</strong> Provide a official Fire TV React Spatial Focus Hook in the Fire TV SDK.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
