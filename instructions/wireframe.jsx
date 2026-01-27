import React, { useState } from 'react';

export default function PortfolioWireframe() {
  const [activeSection, setActiveSection] = useState('overview');
  
  const sections = [
    { id: 'overview', label: 'Full Page Overview' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'work', label: 'Work Experience' },
    { id: 'projects', label: 'Projects (Horizontal)' },
    { id: 'readwrite', label: 'Read / Write' },
    { id: 'skills', label: 'Skills Marquee' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: '#e0e0e0'
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 100
      }}>
        <h1 style={{ 
          fontSize: '14px', 
          fontWeight: 600,
          letterSpacing: '0.5px',
          color: '#fff'
        }}>
          ALLAN FERNANDES — PORTFOLIO WIREFRAME
        </h1>
        <span style={{ 
          fontSize: '12px', 
          color: '#888',
          background: 'rgba(255,255,255,0.05)',
          padding: '6px 12px',
          borderRadius: '20px'
        }}>
          Senior UI Specialist Concept
        </span>
      </header>

      {/* Tab Navigation */}
      <nav style={{
        display: 'flex',
        gap: '8px',
        padding: '20px 40px',
        overflowX: 'auto',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '24px',
              border: 'none',
              background: activeSection === section.id 
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
                : 'rgba(255,255,255,0.05)',
              color: activeSection === section.id ? '#fff' : '#999',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              boxShadow: activeSection === section.id 
                ? '0 4px 20px rgba(99, 102, 241, 0.3)' 
                : 'none'
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main style={{ padding: '40px' }}>
        
        {/* Full Page Overview */}
        {activeSection === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <h2 style={{ 
                fontSize: '28px', 
                marginBottom: '16px',
                background: 'linear-gradient(90deg, #fff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Key Design Changes
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { title: '🖥️ Wider Container', desc: 'Edge-to-edge design on desktop (max-width: 1400px → 1600px or fluid). Full-bleed sections.' },
                  { title: '↔️ Horizontal Scrolls', desc: 'Projects, Testimonials, and Skills use horizontal carousels to reduce vertical scrolling.' },
                  { title: '📖 Read/Write Section', desc: 'Magazine-style layout with "What I Read" + "What I Write" side-by-side cards.' },
                  { title: '🎭 Bolder Typography', desc: 'Large display headlines (80-120px) with personality. Current site is too safe.' },
                  { title: '🌊 Fluid Animations', desc: 'Scroll-triggered reveals, hover video previews on projects, marquee skills.' },
                  { title: '🎨 Refined Palette', desc: 'Deeper contrast, accent colors with purpose, glassmorphism cards.' }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#fff' }}>{item.title}</h3>
                    <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Page Wireframe */}
            <div style={{
              background: '#0d0d12',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden'
            }}>
              <h3 style={{ fontSize: '12px', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Full Page Structure
              </h3>
              
              {/* Mini wireframe representation */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                background: '#18181f',
                borderRadius: '12px',
                padding: '20px',
                maxHeight: '500px',
                overflow: 'auto'
              }}>
                {/* Nav wireframe */}
                <div style={{ 
                  height: '40px', 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ width: '80px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ width: '40px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    ))}
                  </div>
                </div>

                {/* Hero */}
                <div style={{ 
                  height: '180px', 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))', 
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '300px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px' }} />
                    <div style={{ width: '400px', height: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    <div style={{ width: '250px', height: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                </div>

                {/* Company logos marquee */}
                <div style={{ 
                  height: '50px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '0 16px'
                }}>
                  <span style={{ fontSize: '10px', color: '#666' }}>Worked with:</span>
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} style={{ width: '60px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                  ))}
                </div>

                {/* Work Experience - Horizontal */}
                <div style={{ padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ width: '120px', height: '16px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
                    <span style={{ fontSize: '10px', color: '#6366f1' }}>← Scroll →</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{ 
                        minWidth: '280px', 
                        height: '160px', 
                        background: 'rgba(255,255,255,0.03)', 
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(99,102,241,0.2)', marginBottom: '12px' }} />
                        <div style={{ width: '100px', height: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', marginBottom: '8px' }} />
                        <div style={{ width: '80px', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects - Horizontal Featured */}
                <div style={{ padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ width: '100px', height: '16px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
                    <span style={{ fontSize: '10px', color: '#6366f1' }}>← Drag to explore →</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ 
                        minWidth: '320px', 
                        height: '220px', 
                        background: i === 1 
                          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15))' 
                          : 'rgba(255,255,255,0.03)', 
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                      }}>
                        {i === 1 && <span style={{ fontSize: '9px', color: '#a78bfa', marginBottom: '8px' }}>★ FEATURED</span>}
                        <div style={{ width: '180px', height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '8px' }} />
                        <div style={{ width: '120px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read/Write Section */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '16px',
                  padding: '16px 0'
                }}>
                  <div style={{ 
                    background: 'rgba(34, 197, 94, 0.08)', 
                    borderRadius: '16px', 
                    padding: '20px',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                  }}>
                    <span style={{ fontSize: '10px', color: '#22c55e' }}>📚 WHAT I READ</span>
                    <div style={{ width: '100px', height: '14px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', marginTop: '12px' }} />
                  </div>
                  <div style={{ 
                    background: 'rgba(249, 115, 22, 0.08)', 
                    borderRadius: '16px', 
                    padding: '20px',
                    border: '1px solid rgba(249, 115, 22, 0.15)'
                  }}>
                    <span style={{ fontSize: '10px', color: '#f97316' }}>✍️ WHAT I WRITE</span>
                    <div style={{ width: '100px', height: '14px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', marginTop: '12px' }} />
                  </div>
                </div>

                {/* Skills Marquee */}
                <div style={{ 
                  height: '60px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '0 16px',
                  overflow: 'hidden'
                }}>
                  {['React', 'TypeScript', 'Next.js', 'AWS', 'Node', 'Docker', 'Firebase'].map((skill, i) => (
                    <span key={i} style={{ 
                      padding: '6px 14px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '20px',
                      fontSize: '11px',
                      color: '#888',
                      whiteSpace: 'nowrap'
                    }}>
                      {skill}
                    </span>
                  ))}
                  <span style={{ fontSize: '10px', color: '#555' }}>→ auto-scrolling marquee</span>
                </div>

                {/* Footer */}
                <div style={{ 
                  height: '80px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '11px', color: '#555' }}>Contact + Social Links</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section Detail */}
        {activeSection === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Hero Section — Design Notes</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', color: '#a78bfa', marginBottom: '12px' }}>Current Issues</h3>
                  <ul style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, paddingLeft: '16px' }}>
                    <li>Container too narrow (~800px), feels cramped</li>
                    <li>Typography lacks hierarchy — headline isn't bold enough</li>
                    <li>Avatar placement is standard, not memorable</li>
                    <li>Animations exist but feel safe/generic</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', color: '#22c55e', marginBottom: '12px' }}>Proposed Changes</h3>
                  <ul style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, paddingLeft: '16px' }}>
                    <li>Full-width hero (1400px+ or edge-to-edge)</li>
                    <li>MASSIVE headline: "Software Engineer" at 80-100px</li>
                    <li>Asymmetric layout — text left, avatar overlapping edge</li>
                    <li>Animated "0→1" counter like Aalhad's site</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hero Wireframe */}
            <div style={{
              background: 'linear-gradient(180deg, #0d0d12 0%, #12121a 100%)',
              borderRadius: '20px',
              padding: '60px 48px',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ maxWidth: '60%' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6366f1', 
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(99,102,241,0.15)',
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      <span style={{ fontSize: '20px' }}>0</span>
                      <span style={{ color: '#888' }}>→</span>
                      <span style={{ fontSize: '20px' }}>1</span>
                    </span>
                    <span style={{ color: '#888' }}>builder</span>
                  </p>
                  
                  <h1 style={{ 
                    fontSize: '72px', 
                    fontWeight: 800, 
                    lineHeight: 1.05,
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Software<br />Engineer
                  </h1>
                  
                  <p style={{ 
                    fontSize: '18px', 
                    color: '#888', 
                    lineHeight: 1.6,
                    marginBottom: '32px'
                  }}>
                    Building cool things on the internet while caring<br />
                    deeply about accessibility and user experience.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: 500
                    }}>
                      View Projects
                    </div>
                    <div style={{
                      padding: '12px 24px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '30px',
                      fontSize: '14px',
                      color: '#888',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Read Blog
                    </div>
                  </div>
                </div>
                
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.1)'
                  }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Avatar Photo</span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#18181f',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#22c55e',
                    border: '1px solid rgba(34,197,94,0.3)'
                  }}>
                    🟢 Available for work
                  </div>
                </div>
              </div>
              
              {/* Scrolling company logos */}
              <div style={{ 
                marginTop: '60px', 
                paddingTop: '32px', 
                borderTop: '1px solid rgba(255,255,255,0.05)'
              }}>
                <p style={{ fontSize: '12px', color: '#555', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Currently at Royal London • Previously
                </p>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                  {['Royal London', 'NTSU', 'Company 3'].map((company, i) => (
                    <div key={i} style={{
                      padding: '8px 20px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#666'
                    }}>
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {activeSection === 'work' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Work Experience — Horizontal Cards</h2>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
                Instead of stacking vertically, experiences scroll horizontally. Each card expands on hover to reveal more details + a link.
              </p>
            </div>

            {/* Work Cards Wireframe */}
            <div style={{
              background: '#0d0d12',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '24px' 
              }}>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #fff, #888)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Work Experience
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent',
                    color: '#fff',
                    cursor: 'pointer'
                  }}>←</button>
                  <button style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(99,102,241,0.2)',
                    color: '#fff',
                    cursor: 'pointer'
                  }}>→</button>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                overflowX: 'auto',
                paddingBottom: '16px'
              }}>
                {[
                  { company: 'Royal London Equity Release', role: 'Software Engineer', period: 'Sep 2023 - Present', highlight: '+47% efficiency', color: '#6366f1' },
                  { company: 'Nottingham Trent SU', role: 'Software Engineer', period: 'Sep 2022 - Aug 2023', highlight: 'Full-stack dev', color: '#22c55e' },
                  { company: 'Previous Role', role: 'Developer', period: '2020 - 2022', highlight: 'Placeholder', color: '#f97316' }
                ].map((job, i) => (
                  <div key={i} style={{
                    minWidth: '340px',
                    background: `linear-gradient(135deg, ${job.color}15, transparent)`,
                    borderRadius: '20px',
                    padding: '28px',
                    border: `1px solid ${job.color}30`,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: `${job.color}25`,
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: job.color
                    }}>
                      LOGO
                    </div>
                    <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>
                      {job.company}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '16px' }}>
                      {job.role} • {job.period}
                    </p>
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      background: `${job.color}20`,
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: job.color,
                      fontWeight: 500
                    }}>
                      {job.highlight}
                    </div>
                  </div>
                ))}
              </div>
              
              <p style={{ 
                fontSize: '12px', 
                color: '#555', 
                marginTop: '20px',
                textAlign: 'center'
              }}>
                ↔ Drag to scroll • Click card to expand details
              </p>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Projects — Horizontal Showcase</h2>
              <p style={{ fontSize: '14px', color: '#888' }}>
                Large project cards with video-on-hover (like Aalhad's). First project can be "featured" with a larger card. 
                Tech stack pills + impact metrics visible at a glance.
              </p>
            </div>

            {/* Projects Wireframe */}
            <div style={{
              background: '#0d0d12',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ 
                fontSize: '40px', 
                fontWeight: 700,
                marginBottom: '32px',
                background: 'linear-gradient(90deg, #fff, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Selected Work
              </h3>
              
              <div style={{ 
                display: 'flex', 
                gap: '24px', 
                overflowX: 'auto',
                paddingBottom: '16px'
              }}>
                {/* Featured Project */}
                <div style={{
                  minWidth: '480px',
                  height: '360px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid rgba(99,102,241,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: 'rgba(99,102,241,0.3)',
                      borderRadius: '20px',
                      fontSize: '11px',
                      color: '#a78bfa',
                      marginBottom: '16px'
                    }}>
                      ★ FEATURED PROJECT
                    </span>
                    <h4 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                      Royal London Broker Portal
                    </h4>
                    <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>
                      Custom portal for equity release advisors. Case management, quotes, KFI generation.
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      {['React', 'Playwright', 'SCSS', 'AWS'].map(tech => (
                        <span key={tech} style={{
                          padding: '4px 10px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          fontSize: '11px',
                          color: '#888'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{ fontSize: '14px', color: '#6366f1' }}>View Project →</span>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '24px',
                    transform: 'translateY(-50%)',
                    width: '180px',
                    height: '180px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#555'
                  }}>
                    Video/Screenshot
                  </div>
                </div>

                {/* Other Projects */}
                {[
                  { title: 'Daily Stoic Reminders', desc: 'Daily stoic quotes web app', tech: ['React', 'Firebase'], color: '#22c55e' },
                  { title: 'Equity Release Site', desc: 'Royal London brand revamp', tech: ['Twig', 'PHP'], color: '#f97316' },
                  { title: "What's Wrong with Jaron", desc: 'Educational platform', tech: ['WordPress', 'JS'], color: '#ec4899' }
                ].map((project, i) => (
                  <div key={i} style={{
                    minWidth: '320px',
                    height: '360px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{
                        width: '100%',
                        height: '160px',
                        background: `linear-gradient(135deg, ${project.color}15, transparent)`,
                        borderRadius: '12px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#555'
                      }}>
                        Hover for video
                      </div>
                      <h4 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                        {project.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#666' }}>{project.desc}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {project.tech.map(t => (
                        <span key={t} style={{
                          padding: '4px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: '12px',
                          fontSize: '11px',
                          color: '#666'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Read/Write Section */}
        {activeSection === 'readwrite' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Read / Write — Magazine Layout</h2>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
                Inspired by Aalhad's editorial approach. Two-column layout: "What I Read" (books, newsletters, resources) 
                and "What I Write" (blog articles). Visual hierarchy with featured content.
              </p>
              <div style={{
                background: 'rgba(255,193,7,0.1)',
                border: '1px solid rgba(255,193,7,0.2)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '13px',
                color: '#ffc107'
              }}>
                💡 This replaces your current simple "Blog" section with a richer content showcase that positions you as a thought leader.
              </div>
            </div>

            {/* Read/Write Wireframe */}
            <div style={{
              background: '#0d0d12',
              borderRadius: '20px',
              padding: '48px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ 
                fontSize: '40px', 
                fontWeight: 700,
                marginBottom: '12px',
                color: '#fff'
              }}>
                I also read and write
              </h3>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px', maxWidth: '600px' }}>
                Continuous learning and sharing knowledge are core to my growth as an engineer.
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '32px'
              }}>
                {/* What I Read */}
                <div style={{
                  background: 'linear-gradient(180deg, rgba(34,197,94,0.08), transparent)',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid rgba(34,197,94,0.15)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '32px' }}>📚</span>
                    <div>
                      <h4 style={{ fontSize: '24px', fontWeight: 600, color: '#fff' }}>What I Read</h4>
                      <p style={{ fontSize: '13px', color: '#22c55e' }}>Books, newsletters, resources</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { title: 'Atomic Habits', author: 'James Clear', type: 'Book' },
                      { title: 'bytes.dev', author: 'Newsletter', type: 'Newsletter' },
                      { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', type: 'Book' }
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '64px',
                          background: 'rgba(34,197,94,0.15)',
                          borderRadius: '8px'
                        }} />
                        <div>
                          <h5 style={{ fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{item.title}</h5>
                          <p style={{ fontSize: '12px', color: '#666' }}>{item.author}</p>
                        </div>
                        <span style={{
                          marginLeft: 'auto',
                          padding: '4px 10px',
                          background: 'rgba(34,197,94,0.15)',
                          borderRadius: '12px',
                          fontSize: '10px',
                          color: '#22c55e'
                        }}>
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: 'rgba(34,197,94,0.1)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', color: '#888' }}>
                      Currently reading <span style={{ color: '#22c55e' }}>3 books</span> this quarter
                    </p>
                  </div>
                </div>

                {/* What I Write */}
                <div style={{
                  background: 'linear-gradient(180deg, rgba(249,115,22,0.08), transparent)',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid rgba(249,115,22,0.15)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '32px' }}>✍️</span>
                    <div>
                      <h4 style={{ fontSize: '24px', fontWeight: 600, color: '#fff' }}>What I Write</h4>
                      <p style={{ fontSize: '13px', color: '#f97316' }}>Blog articles & tutorials</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { title: 'Code quality using Github Actions', date: 'Aug 3, 2025', tags: ['code', 'tools'] },
                      { title: 'How AI helped save a prod disaster', date: 'May 18, 2025', tags: ['code', 'life'] },
                      { title: 'Enforcing code quality on FE repos', date: 'Aug 2, 2025', tags: ['code', 'tools'] }
                    ].map((post, i) => (
                      <div key={i} style={{
                        padding: '20px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer'
                      }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          {post.tags.map(tag => (
                            <span key={tag} style={{
                              padding: '2px 8px',
                              background: 'rgba(249,115,22,0.15)',
                              borderRadius: '8px',
                              fontSize: '10px',
                              color: '#f97316'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h5 style={{ fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{post.title}</h5>
                        <p style={{ fontSize: '12px', color: '#666' }}>{post.date}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '13px', color: '#888' }}>
                      <span style={{ color: '#f97316', fontWeight: 600 }}>12</span> articles published
                    </span>
                    <span style={{ fontSize: '13px', color: '#f97316', cursor: 'pointer' }}>
                      View all →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Marquee Section */}
        {activeSection === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Skills — Auto-Scrolling Marquee</h2>
              <p style={{ fontSize: '14px', color: '#888' }}>
                Replace the static grid with an infinite horizontal marquee (like Aalhad's company logos). 
                Skills scroll automatically, creating visual interest without taking vertical space.
              </p>
            </div>

            {/* Skills Wireframe */}
            <div style={{
              background: '#0d0d12',
              borderRadius: '20px',
              padding: '48px 0',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden'
            }}>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: 700,
                marginBottom: '32px',
                paddingLeft: '48px',
                color: '#fff'
              }}>
                Tech Stack
              </h3>
              
              {/* Marquee Row 1 */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '16px',
                animation: 'marquee 20s linear infinite'
              }}>
                {['React', 'TypeScript', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Firebase', 'PostgreSQL', 'MongoDB', 'Redux', 'Tailwind', 'Jest'].map((skill, i) => (
                  <div key={i} style={{
                    padding: '16px 28px',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
                    borderRadius: '40px',
                    border: '1px solid rgba(99,102,241,0.2)',
                    fontSize: '15px',
                    color: '#a78bfa',
                    whiteSpace: 'nowrap',
                    fontWeight: 500
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
              
              {/* Marquee Row 2 (reverse) */}
              <div style={{
                display: 'flex',
                gap: '16px',
                animation: 'marquee-reverse 25s linear infinite'
              }}>
                {['Playwright', 'Gatsby', 'Vercel', 'Sentry', 'Sass', 'GraphQL', 'Prisma', 'Tanstack Query', 'Twig', 'PHP'].map((skill, i) => (
                  <div key={i} style={{
                    padding: '16px 28px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '40px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '15px',
                    color: '#888',
                    whiteSpace: 'nowrap',
                    fontWeight: 500
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
              
              <p style={{ 
                fontSize: '12px', 
                color: '#555', 
                marginTop: '32px',
                textAlign: 'center'
              }}>
                ↔ Auto-scrolling • Hover to pause
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Implementation Notes */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '40px'
      }}>
        <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '20px' }}>Implementation Notes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Container Width', note: 'Use max-width: 1600px or fluid width with 48-64px padding on desktop' },
            { title: 'Horizontal Scroll', note: 'Use CSS scroll-snap for smooth drag behavior. Consider Embla Carousel or Swiper for advanced features' },
            { title: 'Animations', note: 'Framer Motion for React. Use CSS keyframes for marquee. IntersectionObserver for scroll reveals' },
            { title: 'Video on Hover', note: 'Preload videos as <video> elements with poster images. Play on mouseenter, pause on mouseleave' },
            { title: 'Typography', note: 'Consider: Space Grotesk, Outfit, or Satoshi for headlines. System fonts or Inter for body' },
            { title: 'Dark Theme', note: 'Current site supports dark mode. Ensure new design works in both themes with proper contrast' }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <h4 style={{ fontSize: '14px', color: '#6366f1', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
