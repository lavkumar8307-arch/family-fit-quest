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
      <div style={{
        background: 'rgba(12, 17, 30, 0.9)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FF5500 0%, #FF007A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Trophy size={26} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
                Amazon Developer Hackathon Submission Hub
              </h2>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                background: 'rgba(255, 153, 0, 0.2)',
                color: '#FF9900',
                border: '1px solid rgba(255, 153, 0, 0.4)',
                fontWeight: '800',
                fontSize: '0.72rem',
                textTransform: 'uppercase'
              }}>
                FIRE TV TRACK
              </span>
            </div>
            <p style={{ color: '#94A3B8', marginTop: '4px', fontSize: '0.9rem' }}>
              Project: Family Fit Quest • Primary Track: Fire TV • Mini Challenges: AWS Builder & Open Source
            </p>
          </div>
        </div>

        <button style={{
          padding: '12px 24px',
          borderRadius: '16px',
          background: 'linear-gradient(90deg, #FF9900 0%, #FF007A 100%)',
          color: '#FFFFFF',
          fontWeight: '800',
          fontSize: '0.95rem',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(255, 153, 0, 0.4)'
        }}>
          Review submission ↗
        </button>
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
              padding: '10px 20px',
              borderRadius: '16px',
              background: activeSubTab === tab.id ? 'rgba(255, 153, 0, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              color: activeSubTab === tab.id ? '#FF9900' : '#E2E8F0',
              fontWeight: '800',
              fontSize: '0.9rem',
              border: activeSubTab === tab.id ? '1px solid #FF9900' : '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Project Description */}
      {activeSubTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Upper Grid (2 Column) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Left Card */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FF9900', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  ⚡ WHY FAMILY FIT QUEST EXISTS
                </span>
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
                Turn family screen time into shared movement.
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: '1.6', margin: 0 }}>
                Family Fit Quest is an interactive multi-player fitness game built for the Amazon Fire TV 10-foot UI experience. Up to four family members move together through exciting adventure quest modes — Jungle Dash, Cosmic Dance-Off, Lava Temple Escape, and Superhero Academy.
              </p>
            </div>

            {/* Right Card: Submission Snapshot */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', border: '1px solid #00F0FF', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>
                Submission snapshot
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 8px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFFFFF' }}>9</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Polished screens</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 8px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFFFFF' }}>4</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Quest modes</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 8px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFFFFF' }}>3</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>AWS services</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '10px', background: 'rgba(255,153,0,0.2)', color: '#FF9900', fontWeight: '800', fontSize: '0.65rem' }}>FIRE TV</span>
                <span style={{ padding: '4px 10px', borderRadius: '10px', background: 'rgba(157,0,255,0.2)', color: '#9D00FF', fontWeight: '800', fontSize: '0.65rem' }}>BEDROCK</span>
                <span style={{ padding: '4px 10px', borderRadius: '10px', background: 'rgba(0,240,255,0.2)', color: '#00F0FF', fontWeight: '800', fontSize: '0.65rem' }}>ALEXA</span>
              </div>
            </div>
          </div>

          {/* Middle Grid (3 Feature Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ color: '#00F0FF', margin: 0, fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ➕ Spatial UI
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                10-foot UI and remote-friendly D-pad focus states designed specifically for Fire TV controllers.
              </p>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 'auto' }}>
                Arrow keys • Select • Back • Strong focus memory
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ color: '#FF9900', margin: 0, fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🤖 AWS Bedrock AI Engine
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                Generates kid-friendly post-workout stories, adaptive difficulty, individual badges, and family recaps.
              </p>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 'auto' }}>
                Claude 3.5 Sonnet • Amazon Nova • Guardrails
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ color: '#00FF87', margin: 0, fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📱 Mobile Vision PoseStream
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                A lightweight companion camera sends pose landmarks over WebSockets for responsive multiplayer scoring.
              </p>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 'auto' }}>
                30 FPS • Adaptive smoothing • Multi-player tracking
              </div>
            </div>
          </div>

          {/* Bottom Process Flow Bar (4 connected steps) */}
          <div className="glass-panel" style={{ padding: '20px 28px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0,255,135,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📱</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFFFFF' }}>Mobile camera</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Pose landmarks</div>
              </div>
            </div>
            <span style={{ color: '#64748B', fontSize: '1.2rem' }}>→</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,153,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📺</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFFFFF' }}>Fire TV game</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>D-pad + co-play</div>
              </div>
            </div>
            <span style={{ color: '#64748B', fontSize: '1.2rem' }}>→</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(157,0,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>☁️</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFFFFF' }}>AWS Bedrock</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Adaptive recap</div>
              </div>
            </div>
            <span style={{ color: '#64748B', fontSize: '1.2rem' }}>→</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0,240,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎤</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFFFFF' }}>Alexa coach</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Voice commands</div>
              </div>
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
