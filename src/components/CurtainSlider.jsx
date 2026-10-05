import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CurtainSlider({
  beforeImage = '/assets/prius_rear_right.jpg',
  afterImage = '/assets/prius_rear_right_scratch.jpg',
  showDefectBox = true,
  defectTitle = "右後保險桿擦傷 (12cm)",
  confidence = 91.8
}) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let position = (x / width) * 100;
    if (position < 5) position = 5;
    if (position > 95) position = 95;
    setSliderPosition(position);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      className="curtain-slider-wrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        ref={containerRef}
        className="curtain-slider-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
      >
        {/* Layer 1: Background (After Image - Return inspection) */}
        <div className="curtain-image-before">
          <img src={afterImage} alt="還車照片 (Return Inspection)" />
          <div className="slider-label after">
            還車影像 (Return Photo)
          </div>

          {/* Bounding Box on Scratch (Visible when slider reveals this area) */}
          {showDefectBox && sliderPosition < 55 && (
            <div 
              className="defect-bbox"
              style={{
                top: '73.0%',
                left: '43.9%',
                width: '9.5%',
                height: '26.3%',
              }}
            >
              <div className="defect-badge">
                ⚠️ 疑似新車損 ({confidence}%)
              </div>
            </div>
          )}
        </div>

        {/* Layer 2: Foreground (Before Image - Baseline pickup) clipped to sliderPosition */}
        <div 
          className="curtain-image-after"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="取車照片 (Pickup Baseline)" 
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="slider-label before">
            取車基底 (Pickup Baseline)
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div 
          className="curtain-handle"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="handle-knob">
            <SlidersHorizontal size={16} />
          </div>
        </div>
      </div>

      {/* Helper caption and defect details */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', padding: '0 4px' }}>
        <span>◀ 拖曳中央拉桿左右滑動對比細節 ▶</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#00E599', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <CheckCircle2 size={12} /> 歷史 2 處舊傷已自動剔除
          </span>
          <span style={{ color: '#FF334B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <AlertCircle size={12} /> 本次行程新增傷痕
          </span>
        </div>
      </div>
    </div>
  );
}
