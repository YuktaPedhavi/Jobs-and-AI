import React, { useEffect, useRef } from 'react';

interface GenerativeCircuitWaveProps {
  className?: string;
  mousePos?: { x: number; y: number };
}

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
  ring: boolean;
}

interface DataPacket {
  waveIndex: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export const GenerativeCircuitWave: React.FC<GenerativeCircuitWaveProps> = ({
  className = '',
  mousePos = { x: 0, y: 0 }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Nodes distributed across the wave crests
    const nodes: CircuitNode[] = [];
    const packets: DataPacket[] = [];

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed nodes along wave trajectories
      nodes.length = 0;
      const nodeCount = Math.floor(width / 38);
      for (let i = 0; i < nodeCount; i++) {
        const u = i / (nodeCount - 1);
        nodes.push({
          x: width * (0.15 + u * 0.8),
          y: height * (0.28 + Math.sin(u * Math.PI * 1.5) * 0.22 + (Math.random() - 0.5) * 0.15),
          radius: Math.random() > 0.7 ? 3.5 : 2,
          color: Math.random() > 0.4 ? '#22D3EE' : Math.random() > 0.5 ? '#38BDF8' : '#F59E0B',
          pulseSpeed: 1.2 + Math.random() * 2.5,
          pulsePhase: Math.random() * Math.PI * 2,
          ring: Math.random() > 0.45
        });
      }

      // Re-seed data packets
      packets.length = 0;
      for (let p = 0; p < 18; p++) {
        packets.push({
          waveIndex: Math.floor(Math.random() * 5),
          progress: Math.random(),
          speed: 0.0012 + Math.random() * 0.0024,
          color: Math.random() > 0.35 ? '#22D3EE' : '#F59E0B',
          size: 2.2 + Math.random() * 1.8
        });
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Number of circuit wave tiers
    const waveCount = 7;

    const render = () => {
      if (!prefersReducedMotion) {
        time += 0.016;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle mouse influence
      const mx = (mousePos.x || 0) * 0.012;
      const my = (mousePos.y || 0) * 0.012;

      // 1. Draw Under-Wave Filled Silhouettes (Hokusai-inspired layered PCB blocks)
      for (let w = 0; w < 3; w++) {
        const baseOffset = height * (0.52 + w * 0.1);
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 16) {
          const nx = x / width;
          // Crest profile: rising as it goes right, curling near x: 0.65 - 0.85
          const crestShape = Math.sin(nx * Math.PI * 1.3 - 0.3) * 80;
          const ripple = Math.sin(nx * 14 + time * 0.8 + w + mx) * 12;
          const y = baseOffset - crestShape + ripple + my * 20;

          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Dark layered PCB tones
        if (w === 0) ctx.fillStyle = 'rgba(14, 28, 44, 0.45)';
        else if (w === 1) ctx.fillStyle = 'rgba(10, 22, 35, 0.65)';
        else ctx.fillStyle = 'rgba(8, 16, 26, 0.85)';
        ctx.fill();
      }

      // 2. Draw Circuit Wave Contours (Parallel Motherboard Tracks & Stepped Busses)
      for (let w = 0; w < waveCount; w++) {
        const tier = w / (waveCount - 1);
        const yBase = height * (0.32 + tier * 0.48);
        const amplitude = 65 + tier * 35;
        const freq = 1.1 + tier * 0.4;
        const speed = 0.5 + tier * 0.4;

        ctx.beginPath();
        let first = true;

        for (let x = -20; x <= width + 20; x += 8) {
          const nx = x / width;

          // Wave equation creating the steep curling wave crest
          const mainRise = Math.pow(Math.sin(Math.max(0, Math.min(1, nx * 1.15)) * Math.PI * 0.85), 2.2) * amplitude;
          const secondaryHarmonic = Math.sin(nx * 8 * freq + time * speed + w * 1.1 + mx) * 14;
          const microJitter = Math.cos(nx * 24 + time * 1.4) * 3;

          const y = yBase - mainRise + secondaryHarmonic + microJitter;

          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Stepped circuit styling
        if (w % 2 === 0) {
          ctx.strokeStyle = w === 2 ? 'rgba(34, 211, 238, 0.65)' : 'rgba(34, 211, 238, 0.35)';
          ctx.lineWidth = w === 2 ? 2.2 : 1.4;
          ctx.setLineDash([8, 12]);
        } else if (w === 3) {
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([4, 8]);
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([]);
        }

        ctx.stroke();
      }

      ctx.setLineDash([]);

      // 3. Draw Orthogonal PCB Traces (45° and 90° PCB angle extensions across the wave)
      const busLines = [
        { startX: 0.15, startY: 0.72, endX: 0.38, endY: 0.58, color: 'rgba(34, 211, 238, 0.5)', width: 1.5 },
        { startX: 0.32, startY: 0.58, endX: 0.62, endY: 0.42, color: 'rgba(56, 189, 248, 0.4)', width: 1.2 },
        { startX: 0.52, startY: 0.46, endX: 0.78, endY: 0.32, color: 'rgba(245, 158, 11, 0.5)', width: 1.4 },
        { startX: 0.68, startY: 0.34, endX: 0.88, endY: 0.22, color: 'rgba(34, 211, 238, 0.6)', width: 1.8 },
        { startX: 0.42, startY: 0.8, endX: 0.72, endY: 0.64, color: 'rgba(34, 211, 238, 0.35)', width: 1.2 },
        { startX: 0.58, startY: 0.66, endX: 0.92, endY: 0.5, color: 'rgba(249, 115, 22, 0.4)', width: 1.2 }
      ];

      for (const line of busLines) {
        const x1 = width * line.startX;
        const y1 = height * line.startY;
        const x2 = width * line.endX;
        const y2 = height * line.endY;

        // Draw PCB dog-leg (horizontal then 45-degree)
        const midX = x1 + (x2 - x1) * 0.45;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(midX, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.stroke();

        // Terminal solder pad
        ctx.beginPath();
        ctx.arc(x2, y2, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#0C1016';
        ctx.fill();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 4. Data Packets Racing Along the Circuit Waves
      for (const pkt of packets) {
        if (!prefersReducedMotion) {
          pkt.progress = (pkt.progress + pkt.speed) % 1;
        }

        const nx = pkt.progress;
        const waveTier = pkt.waveIndex / (waveCount - 1);
        const yBase = height * (0.32 + waveTier * 0.48);
        const amplitude = 65 + waveTier * 35;
        const freq = 1.1 + waveTier * 0.4;
        const speed = 0.5 + waveTier * 0.4;

        const mainRise = Math.pow(Math.sin(Math.max(0, Math.min(1, nx * 1.15)) * Math.PI * 0.85), 2.2) * amplitude;
        const secondaryHarmonic = Math.sin(nx * 8 * freq + time * speed + pkt.waveIndex * 1.1 + mx) * 14;
        const px = nx * width;
        const py = yBase - mainRise + secondaryHarmonic;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Pulsing Solder Nodes & Component Pads
      for (const node of nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
        const r = node.radius + pulse * 1.2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.65 + pulse * 0.35;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.ring ? 10 : 4;
        ctx.fill();

        if (node.ring) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      // 6. Luminous Wave Crest Focal Flare (The Great Wave breaking tip)
      const crestX = width * 0.72;
      const crestY = height * 0.32;
      const flareRadius = 48 + Math.sin(time * 2) * 6;

      const flareGrad = ctx.createRadialGradient(crestX, crestY, 0, crestX, crestY, flareRadius);
      flareGrad.addColorStop(0, 'rgba(34, 211, 238, 0.7)');
      flareGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.35)');
      flareGrad.addColorStop(0.7, 'rgba(34, 211, 238, 0.08)');
      flareGrad.addColorStop(1, 'rgba(12, 16, 22, 0)');

      ctx.beginPath();
      ctx.arc(crestX, crestY, flareRadius, 0, Math.PI * 2);
      ctx.fillStyle = flareGrad;
      ctx.fill();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        /* 
          MANDATORY RADIAL GRADIENT MASK:
          Seamlessly blends all outer edges into #0C1016 with no visible rectangular boundaries
        */
        maskImage:
          'radial-gradient(ellipse 85% 78% at 65% 48%, black 25%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.2) 78%, transparent 95%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 85% 78% at 65% 48%, black 25%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.2) 78%, transparent 95%)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          /* Natural blending against #0C1016 background */
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};
