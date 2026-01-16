import { useRef, useEffect, useState } from "react";

export default function CanvasIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(true)

  useEffect(() => {
    const innerWidth = window.innerWidth
    if(innerWidth < 768) {
      setShow(false)
      return
    }
    const canvas = canvasRef.current;
    if(canvas === null) return
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 2
    }));

    let running = true;

    function animate() {
      if (!running || !canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  if(!show) return null
  return (
    <canvas
      ref={canvasRef}
      style={{
        zIndex: -1,
      }}
    />
  );
}
