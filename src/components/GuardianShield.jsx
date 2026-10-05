import React from 'react';
import { Shield, ShieldCheck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function GuardianShield({ 
  percentage = 0, 
  status = 'active', // 'active' | 'warning' | 'completed' 
  currentStep = 1,
  preExistingDamages = 2,
  isExempted = true
}) {
  // Determine color theme based on status and percentage
  const isFull = percentage >= 100;
  const isWarning = status === 'warning';

  const shieldColor = isWarning 
    ? '#FFB300' 
    : isFull 
      ? '#00E599' 
      : '#00A3A6';

  return (
    <div className="shield-widget-container">
      {/* Visual Shield Graphic with 4 Animated Quadrants */}
      <div className="shield-graphic">
        <svg 
          viewBox="0 0 100 120" 
          className="shield-svg"
          style={{
            filter: isFull 
              ? 'drop-shadow(0 0 10px rgba(0, 229, 153, 0.6))' 
              : isWarning
                ? 'drop-shadow(0 0 8px rgba(255, 179, 0, 0.5))'
                : 'drop-shadow(0 2px 6px rgba(0, 163, 166, 0.3))'
          }}
        >
          {/* Base Shield Outline */}
          <path 
            d="M 50 10 L 85 24 C 85 68 50 108 50 108 C 50 108 15 68 15 24 Z" 
            fill={isFull ? 'rgba(0, 229, 153, 0.15)' : 'rgba(15, 23, 42, 0.8)'}
            stroke={isWarning ? '#FFB300' : isFull ? '#00E599' : '#334155'}
            strokeWidth="3"
          />

          {/* Quadrant 1: Top-Left (Left-Front) */}
          <path
            d="M 50 14 L 20 26 C 20 54 36 78 50 90 L 50 14 Z"
            fill={percentage >= 25 ? (isWarning ? '#FFB300' : '#00A3A6') : 'transparent'}
            opacity={percentage >= 25 ? '0.75' : '0.1'}
            stroke="#1E293B"
            strokeWidth="1"
            style={{ transition: 'all 0.4s ease' }}
          />

          {/* Quadrant 2: Top-Right (Right-Front) */}
          <path
            d="M 50 14 L 80 26 C 80 54 64 78 50 90 L 50 14 Z"
            fill={percentage >= 50 ? (isWarning ? '#FFB300' : '#00A3A6') : 'transparent'}
            opacity={percentage >= 50 ? '0.75' : '0.1'}
            stroke="#1E293B"
            strokeWidth="1"
            style={{ transition: 'all 0.4s ease' }}
          />

          {/* Quadrant 3: Bottom-Left (Left-Rear) */}
          <path
            d="M 50 50 L 25 50 C 30 75 50 102 50 102 L 50 50 Z"
            fill={percentage >= 75 ? (isWarning ? '#FFB300' : '#00E599') : 'transparent'}
            opacity={percentage >= 75 ? '0.85' : '0.1'}
            stroke="#1E293B"
            strokeWidth="1"
            style={{ transition: 'all 0.4s ease' }}
          />

          {/* Quadrant 4: Bottom-Right (Right-Rear) */}
          <path
            d="M 50 50 L 75 50 C 70 75 50 102 50 102 L 50 50 Z"
            fill={percentage >= 100 ? '#00E599' : 'transparent'}
            opacity={percentage >= 100 ? '0.95' : '0.1'}
            stroke="#1E293B"
            strokeWidth="1"
            style={{ transition: 'all 0.4s ease' }}
          />

          {/* Central Emblem */}
          {isFull && (
            <circle cx="50" cy="55" r="14" fill="#00E599" />
          )}
        </svg>

        <span className="shield-percentage" style={{ color: isFull ? '#042618' : 'white' }}>
          {percentage}%
        </span>
      </div>

      {/* Description & Psychological Reassurance */}
      <div className="shield-info">
        <div className="shield-title-row">
          <div className="shield-title">
            {isFull ? (
              <>
                <ShieldCheck size={16} color="#00E599" />
                <span>免責防護盾 100% 就緒</span>
              </>
            ) : isWarning ? (
              <>
                <ShieldAlert size={16} color="#FFB300" />
                <span>右後方防護盾未完全成型</span>
              </>
            ) : (
              <>
                <Shield size={16} color="#00A3A6" />
                <span>智馭免責金鐘罩 ({percentage}%)</span>
              </>
            )}
          </div>
          <span className="shield-badge-tag">
            {isFull ? '零爭議保障' : isWarning ? '建議補全' : '鑄造中'}
          </span>
        </div>

        <div className="shield-desc">
          {isFull ? (
            <span style={{ color: '#00A3A6', fontWeight: 600 }}>
              ✨ 全車 4 方位影像已存證！歷史 {preExistingDamages} 處舊傷已全數納入免責保護。
            </span>
          ) : isWarning ? (
            <span style={{ color: '#D97706', fontWeight: 600 }}>
              ⚠️ 光線不足或手晃，請開閃光燈重拍以確保您的責任豁免權。
            </span>
          ) : (
            <span>
              拍照是為了保護您不被冤枉：每完成 1 個方位，即鎖定該部位免責保障。
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
