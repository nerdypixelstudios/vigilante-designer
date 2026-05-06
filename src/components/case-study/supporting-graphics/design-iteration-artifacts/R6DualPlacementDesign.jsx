/**
 * R6: Remedial Notice - Reusable Component
 * 
 * Supporting portfolio graphic only. This preserves the shared design-iteration artifact
 * and is not the production LMS component.
 *
 * Used in two places:
 * 1. Inside the grade block (top of results)
 * 2. Standalone before checklist (bottom of results)
 */

import React, { useState } from 'react';

// Icons
const RemedialIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 14l-4-4 4-4" />
    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
  </svg>
);

const WarningIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ClipboardIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
  </svg>
);

const ClockIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ============================================
// REM Badge Component
// ============================================
const RemBadge = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 10px',
    background: '#dc2626',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 700,
    color: 'white',
    flexShrink: 0,
  }}>
    <span style={{
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      background: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }}>
      <RemedialIcon size={10} />
    </span>
    REM.
  </span>
);

// ============================================
// R6 NOTICE COMPONENT (Reusable)
// ============================================
const RemedialNotice = ({ 
  mistakeCount = 2,
  activityName = "Linear Equations Practice",
  questionCount = 4,
  timeMinutes = 8,
  onStartRemedial 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        background: isHovered ? '#f8fafc' : 'white',
        borderRadius: '12px',
        padding: '14px 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: `1.5px solid ${isHovered ? '#e2e8f0' : '#f1f5f9'}`,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onStartRemedial}
    >
      {/* Message */}
      <p style={{
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#64748b',
      }}>
        Based on your <span style={{ color: '#dc2626', fontWeight: 600 }}>{mistakeCount} mistake{mistakeCount !== 1 ? 's' : ''}</span>, we've prepared a targeted practice.
      </p>
      
      {/* Remedial Row - Grey Background */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        background: '#f8fafc',
        borderRadius: '10px',
      }}>
        {/* REM Badge */}
        <RemBadge />
        
        {/* Activity Name */}
        <span style={{
          flex: 1,
          fontSize: '14px',
          fontWeight: 500,
          color: '#1e293b',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {activityName}
        </span>
        
        {/* Metadata Chips */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexShrink: 0,
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            fontSize: '12px',
            fontWeight: 500,
            color: '#64748b',
          }}>
            <ClipboardIcon size={11} />
            {questionCount} Qs
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            fontSize: '12px',
            fontWeight: 500,
            color: '#64748b',
          }}>
            <ClockIcon size={11} />
            {timeMinutes} min
          </span>
        </div>
        
        {/* Action Arrow */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: isHovered ? '#ef4444' : '#fee2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isHovered ? 'white' : '#ef4444',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}>
          <ArrowRightIcon size={16} />
        </div>
      </div>
    </div>
  );
};

// ============================================
// Grade Medal Component
// ============================================
const GradeMedal = ({ grade }) => (
  <div style={{
    position: 'relative',
    width: '72px',
    height: '88px',
    flexShrink: 0,
  }}>
    <div style={{
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)',
    }}>
      <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em' }}>GRADE</span>
      <span style={{ fontSize: '32px', fontWeight: 700, color: 'white', lineHeight: 1 }}>{grade}</span>
    </div>
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '28px',
      height: '20px',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '14px',
        height: '24px',
        background: '#e11d48',
        position: 'absolute',
        left: '0',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
      }} />
      <div style={{
        width: '14px',
        height: '24px',
        background: '#be123c',
        position: 'absolute',
        right: '0',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
      }} />
    </div>
  </div>
);

// ============================================
// Mock Page Sections
// ============================================
const MockSection = ({ title, height = 120 }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
  }}>
    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>{title}</h3>
    <div style={{
      height: `${height}px`,
      background: '#f8fafc',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8',
      fontSize: '13px',
    }}>
      [ Content Area ]
    </div>
  </div>
);

const ChecklistSection = () => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
  }}>
    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>Before You Move On</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        'I have reviewed every question I got wrong',
        'I understand why each correct answer is correct',
        'I understand where my thinking went wrong'
      ].map((text, i) => (
        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            border: '2px solid #d1d5db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} />
          <span style={{ fontSize: '14px', color: '#64748b' }}>{text}</span>
        </label>
      ))}
    </div>
  </div>
);

// ============================================
// Full Page Demo
// ============================================
const R6ReusableDemo = () => {
  const handleStartRemedial = () => alert('Start Remedial!');
  
  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '48px',
      background: '#f1f5f9',
      minHeight: '100vh',
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
        R6: Remedial Notice — Dual Placement
      </h1>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '40px', maxWidth: '600px' }}>
        Same component used twice: inside grade block (top) and standalone (before checklist).
      </p>
      
      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ========== PLACEMENT 1: Inside Grade Block ========== */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '-120px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#dbeafe',
            color: '#1e40af',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            PLACEMENT 1
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
          }}>
            <GradeMedal grade="C" />
            
            <div style={{ flex: 1, paddingTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <WarningIcon size={16} style={{ color: '#e11d48' }} />
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                  67% correct. Still in the bottom 50%.
                </span>
              </div>
              
              <p style={{
                margin: '0 0 16px 0',
                fontSize: '14px',
                color: '#64748b',
                lineHeight: 1.6,
              }}>
                At the concept level, even one mistake means there's a gap.{' '}
                <span style={{ color: '#0f172a', fontWeight: 500 }}>This is fixable—but only if you fix it now.</span>
              </p>
              
              {/* R6 Notice - Inside grade block */}
              <RemedialNotice 
                mistakeCount={2}
                activityName="Linear Equations Practice"
                questionCount={4}
                timeMinutes={8}
                onStartRemedial={handleStartRemedial}
              />
            </div>
            
            <div style={{
              padding: '6px 12px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #fecaca',
              fontSize: '12px',
              fontWeight: 500,
              color: '#e11d48',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              alignSelf: 'flex-start',
            }}>
              <span style={{ fontSize: '14px' }}>↘</span>
              bottom 50%
            </div>
          </div>
        </div>
        
        {/* ========== Middle Content (Collapsed) ========== */}
        <MockSection title="Question Breakdown" height={80} />
        <MockSection title="Your Time Progression" height={80} />
        
        {/* ========== PLACEMENT 2: Standalone with Heading ========== */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '-120px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#dbeafe',
            color: '#1e40af',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            PLACEMENT 2
          </div>
          
          {/* Section heading */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '14px',
          }}>
            Fix your gaps before you move forward
          </h3>
          
          {/* R6 Notice - Standalone */}
          <RemedialNotice 
            mistakeCount={2}
            activityName="Linear Equations Practice"
            questionCount={4}
            timeMinutes={8}
            onStartRemedial={handleStartRemedial}
          />
        </div>
        
        {/* ========== Checklist ========== */}
        <ChecklistSection />
        
        {/* ========== Bottom CTAs ========== */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1,
            padding: '14px 20px',
            background: '#e11d48',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}>
            Review Complete Quiz →
          </button>
          <button style={{
            flex: 1,
            padding: '14px 20px',
            background: '#f1f5f9',
            color: '#64748b',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}>
            Next concept
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default R6ReusableDemo;
