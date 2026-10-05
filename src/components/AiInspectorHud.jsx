import React from 'react';
import { 
  Cpu, 
  Eye, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  Flame, 
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import CurtainSlider from './CurtainSlider';

export default function AiInspectorHud({
  currentStep,
  scenario,
  isFlashOn = false,
  telemetryData
}) {
  const isScenarioB = scenario === 'B';
  const isScenarioC = scenario === 'C';
  const isScenarioD = scenario === 'D';

  // In Scenario B, if flash is turned on, the darkness problem is resolved!
  const isDarkBlocked = isScenarioB && !isFlashOn;

  return (
    <div className="hud-col">
      {/* 1. Real-time Inference Telemetry Panel */}
      <div className="hud-panel">
        <div className="hud-panel-header">
          <div className="hud-title">
            <Cpu size={18} color="#00E5FF" />
            <span>端側 & 雲端雙核實時推論指標 (AI Telemetry)</span>
          </div>
          <span className={`hud-badge ${isDarkBlocked ? 'alert' : isScenarioB && isFlashOn ? 'live' : 'live'}`}>
            {isDarkBlocked ? '⚠️ 品質攔截中' : isScenarioB && isFlashOn ? '✨ 補光增益生效 (<30ms)' : '● EDGE PIPELINE ACTIVE (<30ms)'}
          </span>
        </div>

        {/* 4 Core Metrics */}
        <div className="telemetry-grid">
          {/* Metric 1: Sharpness */}
          <div className="metric-card">
            <div className="metric-label">清晰度 (Laplacian)</div>
            <div className="metric-value">
              {isDarkBlocked ? '38.2' : isScenarioB && isFlashOn ? '194.8' : '184.5'}
            </div>
            <div className={`metric-status ${isDarkBlocked ? 'fail' : 'pass'}`}>
              {isDarkBlocked ? (
                <>❌ 模糊 (閾值 &gt; 80)</>
              ) : (
                <>✓ 高解析清晰</>
              )}
            </div>
          </div>

          {/* Metric 2: Lighting & Lux */}
          <div className="metric-card">
            <div className="metric-label">環境照度與曝光</div>
            <div className="metric-value">
              {isDarkBlocked ? '18%' : isScenarioB && isFlashOn ? '82%' : '78%'}
            </div>
            <div className={`metric-status ${isDarkBlocked ? 'warn' : 'pass'}`}>
              {isDarkBlocked ? (
                <>⚠️ 欠曝 (地下室偏暗 18 Lux)</>
              ) : isScenarioB && isFlashOn ? (
                <>⚡ 補光燈已生效 (充足)</>
              ) : (
                <>✓ 採光良好</>
              )}
            </div>
          </div>

          {/* Metric 3: License Plate OCR */}
          <div className="metric-card">
            <div className="metric-label">PaddleOCR 車牌比對</div>
            <div className="metric-value" style={{ fontSize: '15px' }}>
              RDR-2015
            </div>
            <div className="metric-status pass">
              ✓ 100% 一致 (防拍錯車)
            </div>
          </div>

          {/* Metric 4: Part IoU */}
          <div className="metric-card">
            <div className="metric-label">YOLO-seg 部位吻合</div>
            <div className="metric-value">
              {isDarkBlocked ? '54.2%' : '92.4%'}
            </div>
            <div className={`metric-status ${isDarkBlocked ? 'warn' : 'pass'}`}>
              {isDarkBlocked ? '⚠️ 尚未鎖定' : '✓ 磁吸鎖定中'}
            </div>
          </div>
        </div>

        {/* Real-time Decision Log Bar */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: '#94A3B8',
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <span>
            {isDarkBlocked 
              ? '[微光防呆攔截] 地下室 18 Lux 欠曝 · 提示使用者開啟補光燈' 
              : isScenarioB && isFlashOn 
                ? '[微光增益生效] 補光燈已啟動 · 照度 82% 達標 · 解除攔截' 
                : '[MODEL] YOLOv8-nano + OpenCV Laplacian + PaddleOCR'}
          </span>
          <span style={{ color: '#00E599' }}>推理延遲: 22ms · 離線模式可行</span>
        </div>
      </div>

      {/* 2. Digital Twin Differential Defect Analyzer (Interactive Curtain Slider) */}
      <div className="hud-panel">
        <div className="hud-panel-header">
          <div className="hud-title">
            <ArrowRightLeft size={18} color="#FF334B" />
            <span>數位孿生微差車損比對器 (Digital Twin Diff)</span>
          </div>
          <span className={`hud-badge ${isScenarioC ? 'alert' : 'live'}`}>
            {isScenarioC ? '🔴 偵測到疑似新車損' : '🟢 前後特徵一致'}
          </span>
        </div>

        {/* Interactive Curtain Slider */}
        <CurtainSlider 
          beforeImage="/assets/prius_rear_right.jpg"
          afterImage={isScenarioC ? "/assets/prius_rear_right_scratch.jpg" : "/assets/prius_rear_right.jpg"}
          showDefectBox={isScenarioC}
          defectTitle="右後保險桿局部擦傷 (12cm)"
          confidence={91.8}
        />

        {/* Defect Analysis Breakdown */}
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', fontSize: '11px' }}>
              <span style={{ color: '#94A3B8' }}>部位定位：</span>
              <strong style={{ color: 'white' }}> 後保險桿右下角</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', fontSize: '11px' }}>
              <span style={{ color: '#94A3B8' }}>損傷類型：</span>
              <strong style={{ color: isScenarioC ? '#FF334B' : '#00E599' }}>
                {isScenarioC ? '表面金油層刮傷' : '無'}
              </strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', fontSize: '11px' }}>
              <span style={{ color: '#94A3B8' }}>責任歸屬：</span>
              <strong style={{ color: isScenarioC ? '#FFB300' : '#00E599' }}>
                {isScenarioC ? '本次行程新增 (非舊傷)' : '完好無損'}
              </strong>
            </div>
          </div>

          {/* Policy / Dispute Mitigation Notice */}
          <div style={{
            fontSize: '11px',
            color: '#64748B',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '8px 12px',
            borderRadius: '6px',
            lineHeight: 1.4
          }}>
            🛡️ <strong>爭議防護機制：</strong>歷史案底庫已登記舊傷 2 處（前保桿與左後輪拱），系統在比對時已自動濾除，僅將本次新增的右後特徵中斷列為「中風險需確認」，不直接扣款。
          </div>
        </div>
      </div>

      {/* 3. Interior Cleanliness & Fleet Operations Dispatch */}
      <div className="fleet-ops-grid">
        {/* Interior Cleanliness Card */}
        <div className="ops-card">
          <div className="ops-card-title">
            <Sparkles size={16} color="#38BDF8" />
            <span>車內整潔度多模態評估</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '90px', height: '65px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
              <img 
                src={isScenarioD ? '/assets/interior_dirty.jpg' : '/assets/interior_clean.jpg'} 
                alt="Interior" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: isScenarioD ? '#F59E0B' : '#00E599' }}>
                {isScenarioD ? '⚠️ 髒污待清潔 (等級 2)' : '🟢 潔淨特優 (等級 0)'}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                {isScenarioD ? '偵測到後座遺留空紙杯與零食碎屑' : '無任何垃圾或遺留物'}
              </div>
            </div>
          </div>

          {isScenarioD && (
            <div className="work-order-clean">
              <strong>🧹 自動觸發整備流程：</strong>地圖標記為待清潔，下一位用戶預約前完成清理。
            </div>
          )}
        </div>

        {/* Fleet Operations & Station Dispatch */}
        <div className="ops-card">
          <div className="ops-card-title">
            <Wrench size={16} color="#F59E0B" />
            <span>營運看板與車況接力 (Fleet Ops)</span>
          </div>

          {/* Mini Station Map */}
          <div className="station-mini-map">
            <div className="map-grid-bg"></div>
            <div className="car-station-pin pin-current">
              <span>RDR-2015 (Prius c)</span>
            </div>
            <div className="car-station-pin pin-other-1">
              <span>BQX-1182 (Altis)</span>
            </div>
            <div className="car-station-pin pin-other-2">
              <span>KAZ-9901 (Yaris)</span>
            </div>
          </div>

          {/* Auto Work Order / Relay Mitigation */}
          {isScenarioD ? (
            <div style={{ fontSize: '11px', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
              🎁 <strong>下位用戶補償：</strong>自動發放 $50 折抵券，並提供免費換車選項。
            </div>
          ) : isScenarioC ? (
            <div style={{ fontSize: '11px', color: '#FF334B', background: 'rgba(255, 51, 75, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
              📋 <strong>30秒人工複核：</strong>已推送至營運人員小螢幕，免用戶在車旁久候。
            </div>
          ) : (
            <div style={{ fontSize: '11px', color: '#00E599', background: 'rgba(0, 229, 153, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
              🔄 <strong>車況接力完成：</strong>合格相片已同步寫入數位履歷，為下一位租客基準。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
