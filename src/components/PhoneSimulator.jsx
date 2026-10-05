import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  ChevronLeft, 
  Camera, 
  Zap, 
  Lock, 
  Unlock, 
  Volume2, 
  Compass, 
  Check, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Scan,
  MapPin,
  HelpCircle
} from 'lucide-react';
import GuardianShield from './GuardianShield';
import confetti from 'canvas-confetti';
import CarBlueprintSilhouette, { CarTopBlueprintRadar } from './CarBlueprintSilhouette';

export default function PhoneSimulator({
  currentStep,           // 1: booking, 2: pickup_cam, 3: driving, 4: return_cam, 5: settlement
  setCurrentStep,
  scenario,              // 'A' | 'B' | 'C' | 'D'
  isFlashOn: propIsFlashOn,
  setIsFlashOn: propSetIsFlashOn,
  onPhotoSnapped,
  telemetryData,
  onTelemetryUpdate
}) {
  // Camera state
  const [photoIndex, setPhotoIndex] = useState(0); // 0: Left-Front, 1: Right-Front, 2: Left-Rear, 3: Right-Rear, 4: Interior
  const [localFlashOn, setLocalFlashOn] = useState(false);
  const isFlashOn = propIsFlashOn !== undefined ? propIsFlashOn : localFlashOn;
  const setIsFlashOn = propSetIsFlashOn || setLocalFlashOn;

  const [isAligned, setIsAligned] = useState(false);
  const [isAutoSnapping, setIsAutoSnapping] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false
  });

  // Calculate if currently blocked by low-light darkness in Scenario B
  const isDarkBlocked = scenario === 'B' && !isFlashOn;

  // Calculate shield percentage
  const photoCount = Object.values(capturedPhotos).filter(Boolean).length;
  const shieldPercent = Math.min(100, photoCount * 25);

  // Return camera slot state
  const [returnPhotoIndex, setReturnPhotoIndex] = useState(
    scenario === 'C' ? 3 : scenario === 'D' ? 4 : 0
  );

  // Sync return slot when scenario changes
  useEffect(() => {
    if (scenario === 'C') {
      setReturnPhotoIndex(3);
    } else if (scenario === 'D') {
      setReturnPhotoIndex(4);
    }
  }, [scenario]);

  // Photo slots labels & assets for each shooting angle
  const stepsList = [
    { 
      id: 0, 
      label: '01.左前 45°', 
      name: '左前方 45°',
      compass: '↖ 左前',
      guide: '駕駛座側車頭與輪廓',
      imgPickup: '/assets/prius_front_left.jpg',
      imgReturnClean: '/assets/prius_front_left.jpg'
    },
    { 
      id: 1, 
      label: '02.右前 45°', 
      name: '右前方 45°',
      compass: '↗ 右前',
      guide: '副駕側車頭與輪廓',
      imgPickup: '/assets/prius_front_right.jpg',
      imgReturnClean: '/assets/prius_front_right.jpg'
    },
    { 
      id: 2, 
      label: '03.左後 45°', 
      name: '左後方 45°',
      compass: '↙ 左後',
      guide: '駕駛側車尾與油箱蓋',
      imgPickup: '/assets/prius_rear_left.jpg',
      imgReturnClean: '/assets/prius_rear_left.jpg'
    },
    { 
      id: 3, 
      label: '04.右後 45°', 
      name: '右後方 45°',
      compass: '↘ 右後',
      guide: '副駕側車尾與後保桿',
      imgPickup: '/assets/prius_rear_right.jpg',
      imgReturnClean: '/assets/prius_rear_right.jpg'
    },
    { 
      id: 4, 
      label: '10.後座內裝', 
      name: '後座整潔',
      compass: '⬡ 內裝',
      guide: '後座椅面與腳踏墊',
      imgPickup: '/assets/interior_clean.jpg',
      imgReturnClean: '/assets/interior_clean.jpg'
    },
  ];

  // Auto-snap simulation effect when entering camera screen
  useEffect(() => {
    if (currentStep === 2 || currentStep === 4) {
      setIsAligned(false);
      setIsAutoSnapping(false);

      // If in scenario B and flash is OFF, do NOT snap (stay in low-light warning state)
      if (scenario === 'B' && !isFlashOn) {
        return;
      }

      // Simulate AR magnet alignment after 1.0s
      const alignTimer = setTimeout(() => {
        setIsAligned(true);
        setIsAutoSnapping(true);
        const snapTimer = setTimeout(() => {
          triggerShutter(true);
          setIsAutoSnapping(false);
        }, 800);
        return () => clearTimeout(snapTimer);
      }, 1000);

      return () => clearTimeout(alignTimer);
    }
  }, [photoIndex, currentStep, scenario, isFlashOn]);

  // Shutter action
  const triggerShutter = (isAuto = false) => {
    // Record photo as captured
    setCapturedPhotos(prev => {
      const next = { ...prev, [photoIndex]: true };
      const newCount = Object.values(next).filter(Boolean).length;
      if (newCount === 4 && currentStep === 2) {
        confetti({
          particleCount: 60,
          spread: 55,
          origin: { y: 0.7 }
        });
      }
      return next;
    });

    if (onPhotoSnapped) {
      onPhotoSnapped(photoIndex, scenario);
    }
  };

  const handleNextPhotoSlot = () => {
    if (photoIndex < 4) {
      setPhotoIndex(photoIndex + 1);
    }
  };

  return (
    <div className="phone-col">
      <div className="phone-view-label">
        <span>📱 iRent 手機 App 視角</span>
        <span style={{ color: '#00E599', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ● Live Simulator
        </span>
      </div>

      <div className="phone-frame">
        {/* Dynamic Island */}
        <div className="dynamic-island">
          <div className="island-camera"></div>
          <div className="island-sensor"></div>
        </div>

        {/* Status Bar */}
        <div className={`phone-status-bar ${currentStep === 2 || currentStep === 4 ? 'dark-mode' : ''}`}>
          <span>12:00</span>
          <div className="status-icons">
            <Wifi size={14} />
            <span>5G</span>
            <Battery size={16} />
          </div>
        </div>

        {/* Screen 1: Booking Details & Ready to Pick Up (P-01 ~ P-06) */}
        {currentStep === 1 && (
          <div className="phone-content" style={{ background: '#F8FAFC' }}>
            {/* Nav Header */}
            <div className="irent-nav-header">
              <span className="irent-nav-title">
                <ChevronLeft size={18} /> 預約用車明細
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>同站租還</span>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Vehicle Card */}
              <div className="car-hero-card">
                <div className="car-hero-header">
                  <div>
                    <div className="car-model-name">PRIUS c 油電五人座</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>白 · 2022 年式</div>
                  </div>
                  <div className="car-plate-badge">RDR-2015</div>
                </div>

                <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '10px', margin: '8px 0' }}>
                  <img 
                    src="/assets/prius_front_clean.jpg" 
                    alt="Prius c" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
                  <span>📍 台北民權調度站 B2</span>
                  <span>⚡ 電量: 88% (油電)</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="timer-box" style={{ background: '#0F172A' }}>
                <div className="timer-label">取車保留倒數計時</div>
                <div className="timer-digits">00:58:24</div>
              </div>

              {/* Pre-existing Damage Exemption Alert (Addressing pain point) */}
              <div style={{ 
                background: '#ECFDF5', 
                border: '1.5px solid #A7F3D0', 
                borderRadius: '12px', 
                padding: '12px',
                fontSize: '12px',
                color: '#065F46'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                  <ShieldCheck size={16} color="#059669" />
                  <span>已登記 2 處歷史舊傷 (系統自動豁免)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#047857', lineHeight: 1.4 }}>
                  前保桿右下微擦傷、左後輪拱微痕已登記在案。取車拍照時無須重複提報，還車時自動免責！
                </div>
              </div>

              {/* Car Relay Badge */}
              <div style={{ 
                background: '#EFF6FF', 
                border: '1px solid #BFDBFE', 
                borderRadius: '10px', 
                padding: '10px',
                fontSize: '11px',
                color: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} color="#3B82F6" />
                <div>
                  <strong>車況接力認證：</strong>上一手用戶於昨晚 22:15 完成 AI 驗證，整潔度特優。
                </div>
              </div>

              {/* Actions */}
              <button 
                className="btn-irent-primary" 
                onClick={() => setCurrentStep(2)}
                style={{ marginTop: '8px' }}
              >
                <Camera size={18} />
                開始取車拍照 (啟動免責盾牌)
              </button>

              <button 
                className="btn-irent-secondary"
                onClick={() => {
                  alert("⚠️ 選擇略過拍照：系統將自動採用上一位用戶的還車驗證影像與數位車況履歷作為責任基準。");
                  setCurrentStep(3);
                }}
                style={{ fontSize: '12px', color: '#64748B' }}
              >
                已確認車況良好，快速信任略過拍照
              </button>
            </div>
          </div>
        )}

        {/* Screen 2: Pre-Trip Inspection Camera (P-07 ~ P-13) */}
        {currentStep === 2 && (
          <div className="phone-content camera-mode" style={{ background: '#000000' }}>
            {/* Nav Header */}
            <div className="irent-nav-header dark">
              <span className="irent-nav-title" onClick={() => setCurrentStep(1)}>
                <ChevronLeft size={18} /> 取車檢驗 (RDR-2015)
              </span>
              <span style={{ fontSize: '11px', color: '#00E599', fontWeight: 700 }}>
                {stepsList[photoIndex].name}
              </span>
            </div>

            {/* Guardian Shield Reassurance Banner */}
            <GuardianShield 
              percentage={shieldPercent} 
              status={isDarkBlocked ? 'warning' : 'active'}
              currentStep={photoIndex}
            />

            {/* Viewfinder Area */}
            <div className="camera-viewfinder">
              <img 
                key={`pickup-img-${photoIndex}`}
                src={stepsList[photoIndex].imgPickup} 
                alt={stepsList[photoIndex].name} 
                className={`viewfinder-image ${isDarkBlocked ? 'blurred dark-exposure' : ''}`}
              />

              {/* Flashlight Spotlight Glow when Flash is ON */}
              {isFlashOn && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 250, 220, 0.1) 50%, transparent 80%)',
                  zIndex: 8,
                  animation: 'flashBurst 0.6s ease-out'
                }} />
              )}

              {/* Floating Camera Telemetry Pills */}
              <div className="camera-top-telemetry">
                <div className={`cam-pill ${isDarkBlocked ? 'warn' : 'ok'}`}>
                  {isDarkBlocked ? (
                    <>
                      <AlertTriangle size={12} /> 手晃模糊 (38.2)
                    </>
                  ) : (
                    <>
                      <Check size={12} /> 清晰度 {isFlashOn && scenario === 'B' ? '194' : '184'} (優)
                    </>
                  )}
                </div>

                <div className={`cam-pill ${isDarkBlocked ? 'warn' : 'ok'}`}>
                  {isDarkBlocked ? (
                    <>
                      <AlertTriangle size={12} /> 光線過暗 (18 Lux)
                    </>
                  ) : isFlashOn && scenario === 'B' ? (
                    <>
                      <Zap size={12} fill="#00E599" /> 補光燈已生效 (82%)
                    </>
                  ) : (
                    '曝光適中 (78%)'
                  )}
                </div>

                <div className="cam-pill ok">
                  車牌: MATCH
                </div>
              </div>

              {/* Angle Position & Blueprint Guidance HUD */}
              <div style={{
                position: 'absolute',
                top: '44px',
                left: '12px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '5px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 229, 153, 0.4)',
                color: '#00E599',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 10
              }}>
                <Compass size={13} />
                <span>{stepsList[photoIndex].compass} · {stepsList[photoIndex].guide}</span>
              </div>

              {/* Top View Blueprint Radar HUD Indicator (from reference blueprint) */}
              <div style={{
                position: 'absolute',
                top: '44px',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px',
                borderRadius: '10px',
                border: '1.5px solid rgba(0, 229, 153, 0.4)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 15
              }}>
                <span style={{ fontSize: '8px', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.5px' }}>
                  車頂視角雷達
                </span>
                <CarTopBlueprintRadar activeIndex={photoIndex} />
                <span style={{ fontSize: '9px', color: isAligned && !isDarkBlocked ? '#00E599' : '#FFB300', fontWeight: 800 }}>
                  {isAligned && !isDarkBlocked ? '✓ 已鎖定' : '對準中...'}
                </span>
              </div>

              {/* Blueprint Mode Badge */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(6px)',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#E2E8F0',
                fontSize: '9px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 10
              }}>
                <span>📐 藍圖線稿引導輔助 (Blueprint Silhouette Assist)</span>
              </div>

              {/* Dynamic AR Automotive Blueprint Silhouette Overlay */}
              <div className="ar-ghost-overlay">
                <CarBlueprintSilhouette index={photoIndex} isAligned={isAligned && !isDarkBlocked} />

                {/* Auto Snap Trigger Radar */}
                {isAutoSnapping && (
                  <div className="auto-snap-radar">
                    <div className="snap-center-dot"></div>
                  </div>
                )}
              </div>

              {/* In Scenario B: Intelligent Low-Light Safeguard Notification */}
              {scenario === 'B' && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '14px',
                  right: '14px',
                  background: isDarkBlocked 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 100%)' 
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  color: isDarkBlocked ? '#1A1200' : '#FFFFFF',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  boxShadow: isDarkBlocked ? '0 6px 20px rgba(245, 158, 11, 0.5)' : '0 6px 20px rgba(16, 185, 129, 0.5)',
                  zIndex: 25,
                  transition: 'all 0.4s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '12px' }}>
                      {isDarkBlocked ? <AlertTriangle size={16} color="#78350F" /> : <Sparkles size={16} color="#FFFFFF" />}
                      <span>{isDarkBlocked ? '智慧微光防呆：環境過暗 (18 Lux)' : '微光增益已生效 · 照度充足'}</span>
                    </div>
                    <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.25)', fontWeight: 700, color: 'white' }}>
                      Edge AI 智慧防呆
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', marginTop: '4px', lineHeight: 1.35, opacity: 0.95 }}>
                    {isDarkBlocked 
                      ? '地下室微光易產生模糊與色差，可能影響免責判定。系統建議開啟相機補光燈！' 
                      : '補光燈已啟動，影像清晰度 194.8 達標！AR 磁吸自動抓拍已就緒。'}
                  </div>

                  {/* Interactive Button to Turn On / Off Flashlight inside notification */}
                  <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                    {isDarkBlocked ? (
                      <button
                        onClick={() => setIsFlashOn(true)}
                        style={{
                          background: '#0F172A',
                          color: '#FDE047',
                          border: '1.5px solid #FACC15',
                          borderRadius: '8px',
                          padding: '7px 14px',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          flex: 1,
                          justifyContent: 'center'
                        }}
                      >
                        <Zap size={14} fill="#FACC15" color="#FACC15" />
                        <span>⚡ 一鍵開啟補光燈 (解決昏暗問題)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsFlashOn(false)}
                        style={{
                          background: 'rgba(0,0,0,0.25)',
                          color: 'white',
                          border: '1px solid rgba(255,255,255,0.4)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '10px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        關閉補光燈 (模擬昏暗環境)
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls & Steps Strip */}
            <div className="camera-bottom-tray">
              {/* Photo Steps Strip */}
              <div className="photo-steps-strip">
                {stepsList.map((step, idx) => (
                  <div 
                    key={step.id}
                    className={`step-thumb-slot ${photoIndex === idx ? 'current' : ''} ${capturedPhotos[idx] ? 'completed' : ''}`}
                    onClick={() => setPhotoIndex(idx)}
                    style={{
                      backgroundImage: capturedPhotos[idx] ? `url(${step.imgPickup})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: capturedPhotos[idx] ? 'absolute' : 'relative',
                      inset: 0,
                      background: capturedPhotos[idx] ? 'rgba(0, 0, 0, 0.45)' : 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }}>
                      <span className="thumb-label" style={{ fontSize: '8.5px' }}>{step.label}</span>
                      <span className="thumb-indicator">
                        {capturedPhotos[idx] ? '✅' : photoIndex === idx ? '🎯' : '⚪'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shutter Bar */}
              <div className="shutter-controls-row">
                <button 
                  className={`cam-tool-btn ${isFlashOn ? 'active' : ''}`}
                  onClick={() => setIsFlashOn(!isFlashOn)}
                  title={isFlashOn ? "關閉補光燈" : "開啟補光燈"}
                  style={scenario === 'B' && !isFlashOn ? {
                    border: '2px solid #FACC15',
                    boxShadow: '0 0 14px rgba(250, 204, 21, 0.7)',
                    background: 'rgba(250, 204, 21, 0.25)',
                    animation: 'pulseSnap 1.2s infinite'
                  } : isFlashOn ? {
                    background: '#FACC15',
                    color: '#0F172A'
                  } : {}}
                >
                  <Zap size={18} fill={isFlashOn ? "#0F172A" : "none"} color={isFlashOn ? "#0F172A" : "white"} />
                </button>

                {/* Shutter Button */}
                <div 
                  className="shutter-outer-ring" 
                  onClick={() => triggerShutter(false)}
                >
                  <div className={`shutter-inner-button ${isAligned && !isDarkBlocked ? 'auto-locked' : ''}`}></div>
                </div>

                <button 
                  className="cam-tool-btn"
                  onClick={handleNextPhotoSlot}
                  title="下一張"
                >
                  <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>

              {/* Completion Action */}
              {shieldPercent >= 100 ? (
                <button 
                  className="btn-irent-primary"
                  onClick={() => setCurrentStep(3)}
                  style={{ background: '#00E599', color: '#042618', fontWeight: 800 }}
                >
                  <Sparkles size={18} /> 免責防護盾就緒 · 解鎖出發！
                </button>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748B' }}>
                  ⚡ AR 磁吸模式啟動中：對準車身輪廓將自動擊發快門
                </div>
              )}
            </div>
          </div>
        )}

        {/* Screen 3: In-Trip Driving Cockpit (R-01) */}
        {currentStep === 3 && (
          <div className="phone-content" style={{ background: '#F8FAFC' }}>
            <div className="irent-nav-header">
              <span className="irent-nav-title">
                🚗 用車中 · Prius c
              </span>
              <span style={{ fontSize: '11px', color: '#00A3A6', fontWeight: 700 }}>
                ● 藍牙連線中
              </span>
            </div>

            <div className="cockpit-view">
              {/* Trip Timer */}
              <div className="timer-box">
                <div className="timer-label">租賃行駛時間</div>
                <div className="timer-digits">01:42:18</div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                  本次行駛: 18.4 km · 預估金額: $235
                </div>
              </div>

              {/* Digital Shield Protection Card */}
              <div style={{ 
                background: 'linear-gradient(135deg, #ECFDF5 0%, #E6FBF4 100%)', 
                border: '1.5px solid #00E599', 
                borderRadius: '14px', 
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <ShieldCheck size={28} color="#059669" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#065F46' }}>
                    🛡️ 免責金鐘罩運行中
                  </div>
                  <div style={{ fontSize: '11px', color: '#047857' }}>
                    4 張合格影像存證中，歷史舊傷已全額豁免保障。
                  </div>
                </div>
              </div>

              {/* Keyless Remote Controls */}
              <div className="keyless-controls-grid">
                <button className="keyless-btn primary" onClick={() => alert("車門已開鎖")}>
                  <Unlock size={20} />
                  <span>開鎖車門</span>
                </button>
                <button className="keyless-btn" onClick={() => alert("車門已上鎖")}>
                  <Lock size={20} />
                  <span>上鎖車門</span>
                </button>
                <button className="keyless-btn" onClick={() => alert("車輛閃燈鳴笛")}>
                  <Volume2 size={20} />
                  <span>尋車鳴笛</span>
                </button>
                <button className="keyless-btn" onClick={() => alert("開啟客服通報")}>
                  <HelpCircle size={20} />
                  <span>行車通報</span>
                </button>
              </div>

              {/* Return Button */}
              <button 
                className="btn-irent-primary"
                onClick={() => setCurrentStep(4)}
                style={{ marginTop: '16px' }}
              >
                抵達還車地點 · 開始還車驗收
              </button>
            </div>
          </div>
        )}

        {/* Screen 4: Return Inspection Camera (R-03 ~ R-08) */}
        {currentStep === 4 && (
          <div className="phone-content camera-mode" style={{ background: '#000000' }}>
            <div className="irent-nav-header dark">
              <span className="irent-nav-title" onClick={() => setCurrentStep(3)}>
                <ChevronLeft size={18} /> 還車拍照 (RDR-2015)
              </span>
              <span style={{ fontSize: '11px', color: '#00E599', fontWeight: 700 }}>
                {stepsList[returnPhotoIndex].name}
              </span>
            </div>

            {/* Viewfinder Area */}
            <div className="camera-viewfinder">
              <img 
                key={`return-img-${returnPhotoIndex}`}
                src={
                  returnPhotoIndex === 3 && scenario === 'C'
                    ? '/assets/prius_rear_right_scratch.jpg'
                    : returnPhotoIndex === 4 && scenario === 'D'
                      ? '/assets/interior_dirty.jpg'
                      : stepsList[returnPhotoIndex].imgReturnClean
                } 
                alt="Return View" 
                className="viewfinder-image"
              />

              {/* Floating Camera Telemetry Pills */}
              <div className="camera-top-telemetry">
                <div className="cam-pill ok">
                  <Check size={12} /> 清晰度 186 (優)
                </div>
                <div className="cam-pill ok">
                  曝光良好 (76%)
                </div>
                <div className="cam-pill ok">
                  車牌: MATCH
                </div>
              </div>

              {/* Angle Position & Compass Guidance HUD */}
              <div style={{
                position: 'absolute',
                top: '44px',
                left: '12px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 10
              }}>
                <Compass size={13} color="#00E599" />
                <span>{stepsList[returnPhotoIndex].compass} · {stepsList[returnPhotoIndex].name}</span>
              </div>

              {/* Top View Blueprint Radar HUD Indicator in Return Camera */}
              <div style={{
                position: 'absolute',
                top: '44px',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px',
                borderRadius: '10px',
                border: '1.5px solid rgba(0, 229, 153, 0.4)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 15
              }}>
                <span style={{ fontSize: '8px', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.5px' }}>
                  車頂視角雷達
                </span>
                <CarTopBlueprintRadar activeIndex={returnPhotoIndex} />
                <span style={{ fontSize: '9px', color: '#00E599', fontWeight: 800 }}>
                  ✓ 比對鎖定
                </span>
              </div>

              {/* Scenario C: Micro-supplement Alert push banner (Crucial innovation in workflow.md) */}
              {scenario === 'C' && returnPhotoIndex === 3 && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: '74px',
                    left: '12px',
                    right: '12px',
                    background: 'rgba(230, 0, 18, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    lineHeight: 1.4,
                    boxShadow: '0 6px 16px rgba(230, 0, 18, 0.5)',
                    zIndex: 30
                  }}>
                    <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <AlertTriangle size={14} color="#FFF" />
                      <span>趁人還在車旁：偵測到右後保險桿疑似新擦傷 (12cm)</span>
                    </div>
                    <div>請在離車前對該處補拍近照，以利責任精確判定保障自身權益。</div>
                  </div>

                  {/* Visual BBox on Phone Screen Exactly on Scratch */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '60.0%',
                      left: '38.4%',
                      width: '18.8%',
                      height: '21.7%',
                      border: '3px solid #FF334B',
                      background: 'rgba(255, 51, 75, 0.25)',
                      borderRadius: '4px',
                      zIndex: 25,
                      boxShadow: '0 0 12px rgba(255, 51, 75, 0.6)',
                      pointerEvents: 'none'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-18px',
                      left: 0,
                      background: '#FF334B',
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '3px',
                      whiteSpace: 'nowrap'
                    }}>
                      ⚠️ 新擦傷 12cm
                    </div>
                  </div>
                </>
              )}

              {/* Scenario D: Interior Mess Alert banner */}
              {scenario === 'D' && returnPhotoIndex === 4 && (
                <div style={{
                  position: 'absolute',
                  top: '74px',
                  left: '12px',
                  right: '12px',
                  background: 'rgba(245, 158, 11, 0.95)',
                  backdropFilter: 'blur(8px)',
                  color: '#1C1917',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  lineHeight: 1.4,
                  boxShadow: '0 6px 16px rgba(245, 158, 11, 0.5)',
                  zIndex: 30
                }}>
                  <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <AlertTriangle size={14} color="#78350F" />
                    <span>偵測到車內有外帶杯與食物殘渣 (髒污等級 2)</span>
                  </div>
                  <div>提醒您隨手帶走隨身行李與垃圾，維護下一手租客用車環境。</div>
                </div>
              )}

              {/* Blueprint Mode Badge */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(6px)',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#E2E8F0',
                fontSize: '9px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 10
              }}>
                <span>📐 藍圖特徵對齊中 (Blueprint Diff Match)</span>
              </div>

              {/* Dynamic AR Automotive Blueprint Silhouette Overlay */}
              <div className="ar-ghost-overlay">
                <CarBlueprintSilhouette index={returnPhotoIndex} isAligned={true} />
              </div>
            </div>

            {/* Bottom Controls & Steps Strip for Return Camera */}
            <div className="camera-bottom-tray">
              {/* Photo Steps Strip */}
              <div className="photo-steps-strip">
                {stepsList.map((step, idx) => {
                  const isCurrent = returnPhotoIndex === idx;
                  const isScratchSlot = idx === 3 && scenario === 'C';
                  const isDirtySlot = idx === 4 && scenario === 'D';
                  const thumbImg = isScratchSlot
                    ? '/assets/prius_rear_right_scratch.jpg'
                    : isDirtySlot
                      ? '/assets/interior_dirty.jpg'
                      : step.imgReturnClean;

                  return (
                    <div 
                      key={step.id}
                      className={`step-thumb-slot ${isCurrent ? 'current' : ''}`}
                      onClick={() => setReturnPhotoIndex(idx)}
                      style={{
                        backgroundImage: `url(${thumbImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: isCurrent
                          ? (isScratchSlot 
                              ? '2px solid #FF334B' 
                              : isDirtySlot 
                                ? '2px solid #F59E0B' 
                                : '2px solid #00E599')
                          : (isScratchSlot 
                              ? '1.5px solid rgba(255, 51, 75, 0.7)' 
                              : isDirtySlot 
                                ? '1.5px solid rgba(245, 158, 11, 0.7)' 
                                : '1.5px solid rgba(255, 255, 255, 0.15)'),
                        boxShadow: isCurrent 
                          ? (isScratchSlot 
                              ? '0 0 10px rgba(255, 51, 75, 0.6)' 
                              : isDirtySlot 
                                ? '0 0 10px rgba(245, 158, 11, 0.6)' 
                                : '0 0 10px rgba(0, 229, 153, 0.5)')
                          : 'none'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: isCurrent 
                          ? (isScratchSlot ? 'rgba(230, 0, 18, 0.45)' : isDirtySlot ? 'rgba(217, 119, 6, 0.45)' : 'rgba(0, 229, 153, 0.35)') 
                          : 'rgba(0, 0, 0, 0.62)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px',
                        gap: '2px'
                      }}>
                        <span className="thumb-label" style={{ fontSize: '8.5px', color: '#fff', fontWeight: 800 }}>
                          {step.compass}
                        </span>
                        <span style={{ 
                          fontSize: '8.5px', 
                          fontWeight: 800,
                          padding: '1px 3px',
                          borderRadius: '3px',
                          lineHeight: 1.1,
                          background: isScratchSlot ? '#FF334B' : isDirtySlot ? '#F59E0B' : 'rgba(0, 229, 153, 0.3)',
                          color: '#FFFFFF'
                        }}>
                          {isScratchSlot ? '⚠️ 擦傷' : isDirtySlot ? '⚠️ 髒污' : '✓ 吻合'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Message */}
              <div style={{ 
                color: '#94A3B8', 
                fontSize: '11px', 
                textAlign: 'center', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                minHeight: '18px'
              }}>
                {scenario === 'C' && returnPhotoIndex === 3 ? (
                  <span style={{ color: '#FF4D6D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={13} /> 右後保桿偵測新刮痕 (12cm) · 需補拍近照
                  </span>
                ) : scenario === 'D' && returnPhotoIndex === 4 ? (
                  <span style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={13} /> 後座髒污等級 2 · 派發清潔工單
                  </span>
                ) : (
                  <span style={{ color: '#00E599', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> 前後特徵對比吻合無異常 · 免責通關
                  </span>
                )}
              </div>

              {/* Confirmation Action Button */}
              <button 
                className="btn-irent-primary"
                onClick={() => setCurrentStep(5)}
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(230, 0, 18, 0.4)'
                }}
              >
                確認還車照片 · 前往停車結算
              </button>
            </div>
          </div>
        )}

        {/* Screen 5: Parking Slot & Settlement (R-09 ~ R-11) */}
        {currentStep === 5 && (
          <div className="phone-content" style={{ background: '#F8FAFC' }}>
            <div className="irent-nav-header">
              <span className="irent-nav-title">
                🏁 還車結算明細
              </span>
              <span style={{ fontSize: '11px', color: '#00A3A6', fontWeight: 700 }}>
                #IR-20261005
              </span>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Inspection Verdict Banner */}
              {scenario === 'C' ? (
                <div style={{
                  background: '#FEF2F2',
                  border: '1.5px solid #FCA5A5',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#991B1B'
                }}>
                  <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> 疑似新車損核定中 (非既有舊傷)
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '4px', color: '#B91C1C' }}>
                    已進入 30 秒人工快審佇列。配合安心保險，預估免除自負額。
                  </div>
                </div>
              ) : scenario === 'D' ? (
                <div style={{
                  background: '#FFFBEB',
                  border: '1.5px solid #FCD34D',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#92400E'
                }}>
                  <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> 車內整潔待清理 (已派工)
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '4px', color: '#B45309' }}>
                    後座偵測到飲料紙杯，整備員將於下位用戶前完成清潔。
                  </div>
                </div>
              ) : (
                <div style={{
                  background: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#065F46'
                }}>
                  <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#059669" /> 車況無損 · 零爭議高信心自動結案
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '4px', color: '#047857' }}>
                    感謝您的愛護！本次用車符合優良駕駛標準，贈送 5 點 iRent 安心點數。
                  </div>
                </div>
              )}

              {/* Bill Details */}
              <div className="car-hero-card">
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  費用清單
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                  <span>時租費用 (1 小時 42 分)</span>
                  <span>$340</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                  <span>里程費 (18.4 km x $3.2)</span>
                  <span>$59</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                  <span>國道 eTag 通行費</span>
                  <span>$15</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#059669', marginBottom: '8px' }}>
                  <span>優良拍照品質獎勵折扣</span>
                  <span>-$10</span>
                </div>
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', color: '#0F172A' }}>
                  <span>應付總額</span>
                  <span style={{ color: '#E60012' }}>$404</span>
                </div>
              </div>

              {/* Final Lock & Complete */}
              <button 
                className="btn-irent-primary"
                onClick={() => {
                  alert("🎉 還車成功！車門已自動上鎖，合約結案，期待下次再為您服務！");
                  setCurrentStep(1);
                }}
              >
                <Lock size={18} /> 確認車門上鎖並完成扣款
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
