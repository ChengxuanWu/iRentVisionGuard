import React, { useState } from 'react';
import PhoneSimulator from './components/PhoneSimulator';
import AiInspectorHud from './components/AiInspectorHud';
import OperatorCommandCenter from './components/OperatorCommandCenter';
import { 
  Sparkles, 
  AlertTriangle, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Car, 
  Play,
  RotateCcw,
  Smartphone,
  Building2
} from 'lucide-react';

export default function App() {
  // Role view mode: 'user' (Phone + AI HUD) | 'operator' (Fleet Command Center)
  const [viewMode, setViewMode] = useState('user');

  // Step in the user rental lifecycle:
  // 1: Booking / Ready (P-01 ~ P-06)
  // 2: Pre-trip Inspection Camera & Guardian Shield (P-07 ~ P-13)
  // 3: In-trip Driving Cockpit (R-01)
  // 4: Return Inspection Camera & Diff (R-03 ~ R-08)
  // 5: Parking & Settlement (R-09 ~ R-11)
  const [currentStep, setCurrentStep] = useState(2);

  // Scenario toggle:
  // 'A': Happy Path (Clean, perfectly aligned, pass)
  // 'B': Edge Guard (Blurry / Dark exposure intercept)
  // 'C': New Defect Diff (12cm bumper scratch)
  // 'D': Cleanliness Relay (Messy back seat, work order dispatch)
  const [scenario, setScenario] = useState('A');
  const [isFlashOn, setIsFlashOn] = useState(false);

  const stepsMeta = [
    { id: 1, label: '01. 車輛預約' },
    { id: 2, label: '02. 取車護盾' },
    { id: 3, label: '03. 租賃行駛' },
    { id: 4, label: '04. 還車比對' },
    { id: 5, label: '05. 結算派工' },
  ];

  const handleScenarioChange = (sc) => {
    setScenario(sc);
    setIsFlashOn(false);
    if (sc === 'B') {
      setCurrentStep(2); // Jump to pre-trip camera to show blur/dark warning
    } else if (sc === 'C') {
      setCurrentStep(4); // Jump to return camera to show defect alert
    } else if (sc === 'D') {
      setCurrentStep(4); // Jump to return camera to show interior trash
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <div className="app-root">
      {/* Top Application Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo-badge">
            <span className="irent-logo-box">iRent</span>
            <div className="brand-title">
              <span>智馭車況管家</span>
              <span style={{ fontSize: '12px', color: '#00E599', fontWeight: 700 }}>Guardian v2.0</span>
            </div>
          </div>
          <span className="hackathon-tag">
            2026 和泰 AI 黑客松
          </span>
        </div>

        {/* Role View Mode Switcher (User App vs Operator Fleet Command) */}
        <div className="role-toggle-group">
          <button 
            className={`role-btn ${viewMode === 'user' ? 'active' : ''}`}
            onClick={() => setViewMode('user')}
          >
            <Smartphone size={15} />
            <span>📱 用戶租還車視角</span>
          </button>

          <button 
            className={`role-btn ${viewMode === 'operator' ? 'active' : ''}`}
            onClick={() => setViewMode('operator')}
            style={{ position: 'relative' }}
          >
            <Building2 size={15} />
            <span>🏢 營運調度控制台</span>
            {(scenario === 'C' || scenario === 'D') && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FF334B',
                boxShadow: '0 0 6px #FF334B'
              }}></span>
            )}
          </button>
        </div>

        {/* 4 Demo Scenario Quick Switchers */}
        <div className="scenario-selector">
          <button 
            className={`scenario-pill ${scenario === 'A' ? 'active' : ''}`}
            onClick={() => handleScenarioChange('A')}
            title="體驗 AR 磁吸自動抓拍與 100% 免責金盾"
          >
            <Sparkles size={14} color={scenario === 'A' ? '#00A3A6' : '#94A3B8'} />
            <span>情境 A：完美放行</span>
          </button>

          <button 
            className={`scenario-pill scenario-b ${scenario === 'B' ? 'active' : ''}`}
            onClick={() => handleScenarioChange('B')}
            title="地下室昏暗手晃模糊即時攔截"
          >
            <AlertTriangle size={14} color={scenario === 'B' ? '#1A1200' : '#FFB300'} />
            <span>情境 B：端側防呆攔截</span>
          </button>

          <button 
            className={`scenario-pill scenario-c ${scenario === 'C' ? 'active' : ''}`}
            onClick={() => handleScenarioChange('C')}
            title="右後保桿新刮傷微差對比與微補拍"
          >
            <Search size={14} color={scenario === 'C' ? '#FFFFFF' : '#FF334B'} />
            <span>情境 C：新車損微差比對</span>
          </button>

          <button 
            className={`scenario-pill scenario-d ${scenario === 'D' ? 'active' : ''}`}
            onClick={() => handleScenarioChange('D')}
            title="後座髒污識別、自動派工清潔與下一手接力"
          >
            <Trash2 size={14} color={scenario === 'D' ? '#FFFFFF' : '#3B82F6'} />
            <span>情境 D：車內整潔與接力</span>
          </button>
        </div>

        {/* Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--hud-card-border)',
              color: '#F1F5F9',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onClick={() => {
              setScenario('A');
              setCurrentStep(1);
              setViewMode('user');
            }}
          >
            <RotateCcw size={14} />
            <span>重置流程</span>
          </button>
        </div>
      </header>

      {/* Process Stepper Bar (Only shown in User View Mode) */}
      {viewMode === 'user' && (
        <div className="stepper-bar">
          {stepsMeta.map((step) => (
            <div 
              key={step.id}
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              onClick={() => setCurrentStep(step.id)}
            >
              <span className="step-num">
                {currentStep > step.id ? '✓' : step.id}
              </span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Viewport Content */}
      {viewMode === 'user' ? (
        <main className="dual-container">
          {/* Left Column: Phone Simulator (User Experience) */}
          <PhoneSimulator 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            scenario={scenario}
            isFlashOn={isFlashOn}
            setIsFlashOn={setIsFlashOn}
          />

          {/* Right Column: AI Vision & Operations HUD (Technical Brain) */}
          <AiInspectorHud 
            currentStep={currentStep}
            scenario={scenario}
            isFlashOn={isFlashOn}
          />
        </main>
      ) : (
        /* Operator Fleet Command Center View */
        <main>
          <OperatorCommandCenter 
            scenario={scenario}
            onSwitchToUserView={() => setViewMode('user')}
          />
        </main>
      )}
    </div>
  );
}
