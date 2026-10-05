import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  Clock, 
  Send, 
  Car, 
  Sparkles, 
  ShieldAlert, 
  Filter, 
  UserCheck, 
  ArrowRight, 
  DollarSign, 
  Smartphone, 
  PhoneCall,
  Check,
  RotateCcw,
  Tag,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import CurtainSlider from './CurtainSlider';

export default function OperatorCommandCenter({
  scenario,
  onSwitchToUserView
}) {
  // Active selected incident
  const [selectedIncidentId, setSelectedIncidentId] = useState(
    scenario === 'D' ? 'INC-08' : 'INC-09'
  );

  // Dynamic Incident Queue State
  const [incidents, setIncidents] = useState({
    'INC-09': {
      id: 'INC-09',
      car: 'RDR-2015 · Toyota Prius c',
      location: '台北市民權調度站 B2-48 格 · 租客: 王*明',
      issue: 'AI 偵測: 右後保險桿擦傷 12cm (置信度 91.8%) · 歷史舊傷庫已排除',
      time: '12:02 (剛剛)',
      timer: '⏳ 下筆預約: 剩餘 43 分鐘',
      type: 'damage',
      status: scenario === 'C' ? 'pending' : 'discount', // 'pending' | 'discount' | 'maintenance' | 'available' | 'cleaning'
      resolved: scenario !== 'C'
    },
    'INC-08': {
      id: 'INC-08',
      car: 'BQX-1182 · Toyota Yaris',
      location: '台北車站地下室 A12 格 · 租客: 李*華',
      issue: 'AI 偵測: 後座飲料空紙杯與食物碎屑 (髒污等級 2)',
      time: '11:45',
      timer: '⏳ 下筆預約: 剩餘 28 分鐘',
      type: 'clean',
      status: scenario === 'D' ? 'pending' : 'cleaning', // 'pending' | 'cleaning' | 'available'
      resolved: scenario !== 'D'
    },
    'INC-07': {
      id: 'INC-07',
      car: 'KAZ-9901 · Corolla Altis',
      location: '內湖大潤發站 · 租客: 陳*豪',
      issue: '前後影像完全吻合 · 零新增損傷 · 免審直接放行',
      time: '11:10',
      timer: '✓ 車況接力已建檔',
      type: 'pass',
      status: 'available',
      resolved: true
    }
  });

  // Current active vehicle availability status based on selected incident
  const currentIncident = incidents[selectedIncidentId] || incidents['INC-09'];
  const vehicleStatus = currentIncident.status;

  // Dispatch & Mitigation state
  const [dispatchStatus, setDispatchStatus] = useState(scenario === 'D' ? 'idle' : 'dispatched'); // 'idle' | 'dispatched' | 'cleaned'
  const [nextReservationMitigation, setNextReservationMitigation] = useState('none'); // 'none' | 'reassigned' | 'compensated'
  const [triageDecision, setTriageDecision] = useState(
    scenario === 'C' ? null : 'discount'
  );
  const [toastMessage, setToastMessage] = useState(null);
  const [kpiDeltas, setKpiDeltas] = useState({}); // { discount: '+1', maintenance: '-1', etc. }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Compute dynamic Fleet KPI numbers based on current incident dispositions
  const fleetCounts = useMemo(() => {
    const total = 580;
    let available = 542;
    let cleaning = 18;
    let discount = 12;
    let maintenance = 8;

    // Apply INC-09 status (RDR-2015)
    const inc09Status = incidents['INC-09']?.status;
    if (inc09Status === 'discount') {
      discount += 1; // 12 -> 13
      available -= 1; // 542 -> 541
    } else if (inc09Status === 'maintenance') {
      maintenance += 1; // 8 -> 9
      available -= 1; // 542 -> 541
    } else if (inc09Status === 'cleaning') {
      cleaning += 1;
      available -= 1;
    } else if (inc09Status === 'available') {
      // stays standard available
    }

    // Apply INC-08 status (BQX-1182)
    const inc08Status = incidents['INC-08']?.status;
    if (inc08Status === 'available') {
      cleaning -= 1; // 18 -> 17
      available += 1; // 542 -> 543
    }

    return {
      total,
      available,
      cleaning,
      discount,
      maintenance,
      availablePct: ((available / total) * 100).toFixed(1),
      cleaningPct: ((cleaning / total) * 100).toFixed(1),
      discountPct: ((discount / total) * 100).toFixed(1),
      maintenancePct: ((maintenance / total) * 100).toFixed(1),
    };
  }, [incidents]);

  // Count pending incidents in queue
  const pendingCount = useMemo(() => {
    return Object.values(incidents).filter(inc => !inc.resolved).length;
  }, [incidents]);

  // Trigger dispatch decision for damaged vehicle (INC-09)
  const handleDispatchDamage = (targetStatus, label) => {
    const prevStatus = incidents['INC-09']?.status;
    if (prevStatus === targetStatus) {
      showToast(`ℹ️ 車輛目前已處於 [${label}] 狀態。`);
      return;
    }

    setIncidents(prev => ({
      ...prev,
      'INC-09': {
        ...prev['INC-09'],
        status: targetStatus,
        resolved: true
      }
    }));
    setTriageDecision(targetStatus);

    // Delta tags animation on dashboard cards
    const deltas = {};
    if (targetStatus === 'discount') {
      deltas.discount = '+1';
      if (prevStatus === 'maintenance') deltas.maintenance = '-1';
    } else if (targetStatus === 'maintenance') {
      deltas.maintenance = '+1';
      if (prevStatus === 'discount') deltas.discount = '-1';
    } else if (targetStatus === 'available') {
      deltas.available = '+1';
      if (prevStatus === 'discount') deltas.discount = '-1';
      if (prevStatus === 'maintenance') deltas.maintenance = '-1';
    }
    setKpiDeltas(deltas);
    setTimeout(() => setKpiDeltas({}), 2200);

    if (targetStatus === 'discount') {
      showToast('🚀 已將 RDR-2015 調派為 [🔵 微瑕特惠出租 (85折)]！儀表板特惠車數 12 ➔ 13 台，待處置佇列 -1！');
    } else if (targetStatus === 'maintenance') {
      showToast('🚨 已將 RDR-2015 鎖定並轉派為 [🔴 停權維修進廠]！儀表板維修車數 8 ➔ 9 台，待處置佇列 -1！');
    } else {
      showToast(`✅ RDR-2015 已判定並核准為 [${label}]！車輛重返正常可租，待處置佇列 -1！`);
    }
  };

  // Dispatch damage/availability change from Section 2 cards
  const handleStatusChange = (newStatus, label) => {
    const currentId = selectedIncidentId;
    const prevStatus = incidents[currentId]?.status;
    if (prevStatus === newStatus) return;

    setIncidents(prev => ({
      ...prev,
      [currentId]: {
        ...prev[currentId],
        status: newStatus,
        resolved: true
      }
    }));

    // Calculate deltas
    const deltas = {};
    if (newStatus === 'discount') {
      deltas.discount = '+1';
      if (prevStatus === 'maintenance') deltas.maintenance = '-1';
    } else if (newStatus === 'maintenance') {
      deltas.maintenance = '+1';
      if (prevStatus === 'discount') deltas.discount = '-1';
    } else if (newStatus === 'cleaning') {
      deltas.cleaning = '+1';
      if (prevStatus === 'discount') deltas.discount = '-1';
      if (prevStatus === 'maintenance') deltas.maintenance = '-1';
    } else if (newStatus === 'available') {
      deltas.available = '+1';
      if (prevStatus === 'discount') deltas.discount = '-1';
      if (prevStatus === 'maintenance') deltas.maintenance = '-1';
    }
    setKpiDeltas(deltas);
    setTimeout(() => setKpiDeltas({}), 2200);

    showToast(`✅ 車輛可用性已切換為 [${label}]！儀表板數據已同步更新！`);
  };

  const handleDispatchClerk = () => {
    setDispatchStatus('dispatched');
    setIncidents(prev => ({
      ...prev,
      'INC-08': {
        ...prev['INC-08'],
        status: 'cleaning',
        resolved: true
      }
    }));
    showToast('📲 已向 [民權站整備員-小陳] 發送數位清潔派工單！待處置佇列 -1！');
  };

  const handleClerkFinishClean = () => {
    setDispatchStatus('cleaned');
    setIncidents(prev => ({
      ...prev,
      'INC-08': {
        ...prev['INC-08'],
        status: 'available',
        resolved: true
      }
    }));
    setKpiDeltas({ cleaning: '-1', available: '+1' });
    setTimeout(() => setKpiDeltas({}), 2200);
    showToast('✨ 小陳已上傳清潔合格照片！整備車數 18 ➔ 17，正常可租 542 ➔ 543 (93.6%)！');
  };

  const handleReassignCar = () => {
    setNextReservationMitigation('reassigned');
    showToast('🚗 已自動將下位預約用戶 (林*宇) 無縫轉派至同站空閒車輛 [Altis BQX-1182]！');
  };

  const handleCompensateUser = () => {
    setNextReservationMitigation('compensated');
    showToast('🎁 已向林*宇發送 App 推播：贈送 $100 租車折抵券並請求延後 15 分鐘取車！');
  };

  return (
    <div className="operator-dashboard-container">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="operator-toast-banner">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* KPI Overview Bar with Real-time Dynamic Counters */}
      <div className="operator-kpi-bar">
        <div className="kpi-item">
          <div className="kpi-label">
            <span>全區車隊總數</span>
            <Building2 size={13} color="#94A3B8" />
          </div>
          <div className="kpi-val">
            {fleetCounts.total} <span style={{ fontSize: '13px', color: '#94A3B8' }}>台</span>
          </div>
        </div>

        <div className={`kpi-item ${kpiDeltas.available ? 'highlight-changed' : ''}`}>
          <div className="kpi-label">
            <span>🟢 正常在線可租</span>
            {kpiDeltas.available && (
              <span className={`kpi-delta-tag ${kpiDeltas.available.startsWith('+') ? 'up' : 'down'}`}>
                {kpiDeltas.available}
              </span>
            )}
          </div>
          <div className="kpi-val" style={{ color: '#00E599' }}>
            {fleetCounts.available} 
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>({fleetCounts.availablePct}%)</span>
          </div>
        </div>

        <div className={`kpi-item ${kpiDeltas.cleaning ? 'highlight-changed' : ''}`}>
          <div className="kpi-label">
            <span>🟡 整備清潔鎖定</span>
            {kpiDeltas.cleaning && (
              <span className={`kpi-delta-tag ${kpiDeltas.cleaning.startsWith('+') ? 'up' : 'down'}`}>
                {kpiDeltas.cleaning}
              </span>
            )}
          </div>
          <div className="kpi-val" style={{ color: '#FFB300' }}>
            {fleetCounts.cleaning} 
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>({fleetCounts.cleaningPct}%)</span>
          </div>
        </div>

        <div className={`kpi-item ${kpiDeltas.discount ? 'highlight-changed' : ''}`} style={fleetCounts.discount > 12 ? { borderColor: 'rgba(56, 189, 248, 0.6)', background: 'rgba(56, 189, 248, 0.08)' } : {}}>
          <div className="kpi-label">
            <span>🔵 微瑕特惠出租</span>
            {kpiDeltas.discount && (
              <span className={`kpi-delta-tag ${kpiDeltas.discount.startsWith('+') ? 'up' : 'down'}`}>
                {kpiDeltas.discount}
              </span>
            )}
          </div>
          <div className="kpi-val" style={{ color: '#38BDF8' }}>
            {fleetCounts.discount} 
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>({fleetCounts.discountPct}%)</span>
          </div>
        </div>

        <div className={`kpi-item ${kpiDeltas.maintenance ? 'highlight-changed' : ''}`} style={fleetCounts.maintenance > 8 ? { borderColor: 'rgba(255, 51, 75, 0.6)', background: 'rgba(255, 51, 75, 0.08)' } : {}}>
          <div className="kpi-label">
            <span>🔴 停權報修進廠</span>
            {kpiDeltas.maintenance && (
              <span className={`kpi-delta-tag ${kpiDeltas.maintenance.startsWith('+') ? 'up' : 'down'}`}>
                {kpiDeltas.maintenance}
              </span>
            )}
          </div>
          <div className="kpi-val" style={{ color: '#FF334B' }}>
            {fleetCounts.maintenance} 
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>({fleetCounts.maintenancePct}%)</span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Incidents List (Left) vs Adjudication & Ops (Right) */}
      <div className="operator-main-grid">
        {/* Left Column: Real-time Incident Feed */}
        <div className="incident-feed-col">
          <div className="section-title-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px' }}>
              <AlertTriangle size={18} color="#FFB300" />
              <span>即時異常事件佇列 (Incident Feed)</span>
            </div>
            <span className="badge-count" style={pendingCount === 0 ? { background: 'rgba(0, 229, 153, 0.2)', color: '#00E599', borderColor: 'rgba(0, 229, 153, 0.4)' } : {}}>
              {pendingCount > 0 ? `${pendingCount} 件待處置` : '✓ 全區處置完畢'}
            </span>
          </div>

          <div className="incident-card-list">
            {/* Incident 1: Scenario C Defect */}
            <div 
              className={`incident-card ${selectedIncidentId === 'INC-09' ? 'active' : ''}`}
              onClick={() => setSelectedIncidentId('INC-09')}
            >
              <div className="incident-header">
                {incidents['INC-09'].status === 'discount' ? (
                  <span className="incident-type-tag" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                    🔵 已調派微瑕特惠
                  </span>
                ) : incidents['INC-09'].status === 'maintenance' ? (
                  <span className="incident-type-tag damage">
                    🔴 已排定進廠報修
                  </span>
                ) : incidents['INC-09'].status === 'available' ? (
                  <span className="incident-type-tag pass">
                    🟢 已無損結案放行
                  </span>
                ) : (
                  <span className="incident-type-tag damage">
                    🔴 待快審 · 疑似新傷
                  </span>
                )}
                <span className="incident-time">{incidents['INC-09'].time}</span>
              </div>
              <div className="incident-title">{incidents['INC-09'].car}</div>
              <div className="incident-sub">{incidents['INC-09'].location}</div>
              <div className="incident-ai-summary">
                {incidents['INC-09'].issue}
              </div>
              <div className="incident-footer">
                <span style={{ color: '#EF4444', fontWeight: 700 }}>{incidents['INC-09'].timer}</span>
                <span className="action-hint">
                  {incidents['INC-09'].resolved ? '重新審核 ➔' : '立即快審 ➔'}
                </span>
              </div>
            </div>

            {/* Incident 2: Scenario D Messy Interior */}
            <div 
              className={`incident-card ${selectedIncidentId === 'INC-08' ? 'active' : ''}`}
              onClick={() => setSelectedIncidentId('INC-08')}
            >
              <div className="incident-header">
                {incidents['INC-08'].status === 'available' ? (
                  <span className="incident-type-tag pass">
                    ✨ 清潔合格已上架
                  </span>
                ) : incidents['INC-08'].status === 'cleaning' ? (
                  <span className="incident-type-tag clean">
                    🟡 整備員清潔中
                  </span>
                ) : (
                  <span className="incident-type-tag clean">
                    🟡 待派工 · 車內髒污
                  </span>
                )}
                <span className="incident-time">{incidents['INC-08'].time}</span>
              </div>
              <div className="incident-title">{incidents['INC-08'].car}</div>
              <div className="incident-sub">{incidents['INC-08'].location}</div>
              <div className="incident-ai-summary">
                {incidents['INC-08'].issue}
              </div>
              <div className="incident-footer">
                <span style={{ color: '#F59E0B', fontWeight: 700 }}>{incidents['INC-08'].timer}</span>
                <span className="action-hint">
                  {incidents['INC-08'].resolved ? '查看派工 ➔' : '點擊派工 ➔'}
                </span>
              </div>
            </div>

            {/* Incident 3: Scenario A Auto-Pass */}
            <div 
              className={`incident-card ${selectedIncidentId === 'INC-07' ? 'active' : ''}`}
              onClick={() => setSelectedIncidentId('INC-07')}
            >
              <div className="incident-header">
                <span className="incident-type-tag pass">🟢 零車損自動結案</span>
                <span className="incident-time">11:10</span>
              </div>
              <div className="incident-title">{incidents['INC-07'].car}</div>
              <div className="incident-sub">{incidents['INC-07'].location}</div>
              <div className="incident-ai-summary">
                {incidents['INC-07'].issue}
              </div>
              <div className="incident-footer">
                <span style={{ color: '#10B981', fontWeight: 700 }}>✓ 車況接力已建檔</span>
                <span className="action-hint">查看紀錄 ➔</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 30-Second Triage, Availability Switch & Clerk Dispatch */}
        <div className="operator-action-col">
          {/* Section 1: 30-Second Triage Desk */}
          <div className="op-panel">
            <div className="op-panel-header">
              <div className="op-title">
                <UserCheck size={18} color="#00E5FF" />
                <span>30 秒微差快審中心 (Human-in-the-Loop Triage)</span>
              </div>
              <span className="op-meta-tag">
                審核目標: {selectedIncidentId === 'INC-08' ? 'BQX-1182 (車內髒污)' : 'RDR-2015 (右後擦傷)'}
              </span>
            </div>

            {/* Visual Comparison */}
            {selectedIncidentId === 'INC-08' ? (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ width: '220px', height: '140px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src="/assets/interior_dirty.jpg" alt="Dirty Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#F59E0B' }}>
                    ⚠️ 車內整潔度異常：判定為「髒污等級 2」
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px', lineHeight: 1.5 }}>
                    多模態大模型標記：後座中央遺留一次性外帶咖啡杯 1 個、椅面零食碎屑分佈約 15%。無金錢證件遺留。
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn-op-action confirm"
                      onClick={() => {
                        handleStatusChange('cleaning', '整備鎖定');
                        handleDispatchClerk();
                      }}
                    >
                      <Check size={14} /> 確認髒污 · 鎖定車輛並派工
                    </button>
                    <button 
                      className="btn-op-action secondary"
                      onClick={() => {
                        handleStatusChange('available', '日常微塵放行');
                        showToast('已判定為輕微整潔問題，不予鎖定，列入日常巡檢紀錄。');
                      }}
                    >
                      微塵放行
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <CurtainSlider 
                  beforeImage="/assets/prius_rear_right.jpg"
                  afterImage="/assets/prius_rear_right_scratch.jpg"
                  showDefectBox={true}
                  defectTitle="右後保險桿局部擦傷 (12cm)"
                  confidence={91.8}
                />

                {/* 4 Quick Decision Buttons for Damaged Vehicle Dispatch */}
                <div className="triage-buttons-row">
                  <button 
                    className={`btn-triage discount ${incidents['INC-09'].status === 'discount' ? 'selected' : ''}`}
                    onClick={() => handleDispatchDamage('discount', '微瑕特惠出租 (85折)')}
                  >
                    🔵 確認新傷 · 調派微瑕特惠續租 (85折 · 儀表板特惠數 +1)
                  </button>

                  <button 
                    className={`btn-triage maintenance ${incidents['INC-09'].status === 'maintenance' ? 'selected' : ''}`}
                    onClick={() => handleDispatchDamage('maintenance', '停權報修進廠')}
                  >
                    🔴 嚴重新傷 · 停權安排進廠維修 (產生工單 · 儀表板報修數 +1)
                  </button>

                  <button 
                    className={`btn-triage wear ${triageDecision === 'wear' ? 'selected' : ''}`}
                    onClick={() => {
                      setTriageDecision('wear');
                      handleDispatchDamage('available', '日常耗損 (免除租客自負額)');
                    }}
                  >
                    ⚪ 判定為日常耗損 (免除自負額 · 正常營運)
                  </button>

                  <button 
                    className={`btn-triage pass ${triageDecision === 'false_alarm' ? 'selected' : ''}`}
                    onClick={() => {
                      setTriageDecision('false_alarm');
                      handleDispatchDamage('available', '光影誤判放行');
                    }}
                  >
                    🟢 判定光影誤判 (無損結案放行 · 正常營運)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Vehicle Availability & Pricing Strategy Switcher */}
          <div className="op-panel">
            <div className="op-panel-header">
              <div className="op-title">
                <Car size={18} color="#38BDF8" />
                <span>車輛租賃可用性動態調節 (Availability & Pricing)</span>
              </div>
              <span className="current-status-badge" style={{
                color: vehicleStatus === 'available' ? '#00E599' : vehicleStatus === 'discount' ? '#38BDF8' : vehicleStatus === 'cleaning' ? '#FFB300' : '#FF334B'
              }}>
                目前狀態: {vehicleStatus === 'available' ? '🟢 正常可租' : vehicleStatus === 'discount' ? '🔵 微瑕特惠出租 (85折)' : vehicleStatus === 'cleaning' ? '🟡 整備清潔鎖定' : '🔴 停權維修中'}
              </span>
            </div>

            <div className="availability-options-grid">
              <div 
                className={`avail-card ${vehicleStatus === 'available' ? 'active-green' : ''}`}
                onClick={() => handleStatusChange('available', '正常營運')}
              >
                <div className="avail-title">🟢 正常營運</div>
                <div className="avail-desc">前台正常預約，原價出租，車況健康度 100%。</div>
              </div>

              <div 
                className={`avail-card ${vehicleStatus === 'cleaning' ? 'active-amber' : ''}`}
                onClick={() => handleStatusChange('cleaning', '整備鎖定')}
              >
                <div className="avail-title">🟡 整備清潔鎖定</div>
                <div className="avail-desc">App 暫時反灰下架，待整備員清潔驗收後重啟。</div>
              </div>

              <div 
                className={`avail-card ${vehicleStatus === 'discount' ? 'active-blue' : ''}`}
                onClick={() => handleStatusChange('discount', '微瑕特惠出租')}
              >
                <div className="avail-title">🔵 微瑕特惠出租 (85折)</div>
                <div className="avail-desc">外觀微傷不影響安全，標註 85 折續租，儀表板特惠數自動 +1！</div>
              </div>

              <div 
                className={`avail-card ${vehicleStatus === 'maintenance' ? 'active-red' : ''}`}
                onClick={() => handleStatusChange('maintenance', '停權報修')}
              >
                <div className="avail-title">🔴 停權報修進廠</div>
                <div className="avail-desc">車門鎖死，產生保險出險單，儀表板報修數自動 +1！</div>
              </div>
            </div>
          </div>

          {/* Section 3: Clerk Dispatch & Next-Reservation Care */}
          <div className="op-panel">
            <div className="op-panel-header">
              <div className="op-title">
                <Wrench size={18} color="#F59E0B" />
                <span>外勤整備智慧派工與下筆預約防呆 (Dispatch & Relay)</span>
              </div>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                站點: 台北市民權調度站 B2
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Dispatch Action Card */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#F1F5F9', marginBottom: '8px' }}>
                  📲 外勤整備員指派
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                  就近值班整備員: <strong>小陳 (距離 150m)</strong>
                </div>

                {dispatchStatus === 'idle' && (
                  <button className="btn-dispatch" onClick={handleDispatchClerk}>
                    <Send size={14} /> 發送 LINE 數位派工單 (限時30分)
                  </button>
                )}

                {dispatchStatus === 'dispatched' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#00E599', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} /> 小陳已接單 · 清潔作業進行中...
                    </div>
                    <button 
                      className="btn-dispatch secondary"
                      onClick={handleClerkFinishClean}
                    >
                      📸 模擬小陳拍照驗收結案
                    </button>
                  </div>
                )}

                {dispatchStatus === 'cleaned' && (
                  <div style={{ fontSize: '12px', color: '#00E599', fontWeight: 700 }}>
                    ✨ 清潔已驗收完成 · 車輛已重啟上架！
                  </div>
                )}
              </div>

              {/* Next Reservation Mitigation */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#F1F5F9', marginBottom: '8px' }}>
                  🛡️ 下筆預約接力保護 (12:45 取車)
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                  預約租客: <strong>林*宇</strong> · 剩餘時間: <strong>43 分鐘</strong>
                </div>

                {nextReservationMitigation === 'none' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-mitigate" onClick={handleReassignCar}>
                      一鍵改派同站 Altis
                    </button>
                    <button className="btn-mitigate secondary" onClick={handleCompensateUser}>
                      贈 $100 補償券延後
                    </button>
                  </div>
                )}

                {nextReservationMitigation === 'reassigned' && (
                  <div style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 700 }}>
                    ✓ 已成功改派至 Altis (BQX-1182)，用戶滿意度不受影響！
                  </div>
                )}

                {nextReservationMitigation === 'compensated' && (
                  <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>
                    ✓ 補償券已入帳，租客已同意延後 15 分鐘取車。
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
