import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ArrowRight, Brain } from 'lucide-react';
import './css/Welcome.css';

function Welcome() {
  const brainRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const history = useHistory();

  useEffect(() => {
    if (!brainRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    brainRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      wireframe: true,
    });
    const brain = new THREE.Mesh(geometry, material);
    scene.add(brain);

    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    const animate = () => {
      requestAnimationFrame(animate);
      brain.rotation.x += 0.01;
      brain.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (brainRef.current) {
        brainRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div 
        className="customCursor" 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      <header className="header">
        <div className="logo">
          <Brain className="brainIcon" />
          <div className="logoText">
            <span className="glitchText">GEN AI</span>
            <span className="innovations">INNOVATIONS</span>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="heroSection">
          <div className="glassCard">
            <div className="sparkle"></div>
            <h1 className="title">Pioneering the Future</h1>
            <p className="description">
              Embark on a journey through the cutting-edge world of Generative AI. This project, developed
              and deployed by <span className="highlight">MOKSHITH</span>, showcases the latest advancements that are reshaping
              our digital landscape.
            </p>
          </div>

          <div className="innovationHub">
            <div className="hubContent">
              <h2 className="hubTitle">Explore the Innovation Hub</h2>
              <p className="hubDescription">
                Dive into a realm where AI pushes the boundaries of possibility.
              </p>
              <button className="enterButton" onClick={handleLogin}>
                Enter
                <ArrowRight className="arrow" />
              </button>
            </div>
            <div className="brainModel" ref={brainRef}></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Mokshith</p>
      </footer>
    </div>
  );
}

export default Welcome;