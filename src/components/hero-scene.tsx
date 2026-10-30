"use client";

import { useEffect, useRef } from "react";

/* 3D simplex noise (Ashima Arts, MIT) used to morph the particle sphere */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uIntensity;
uniform float uFreq;
attribute float aRandom;
varying float vNoise;
varying float vDepth;
${NOISE}
void main(){
  vec3 dir = normalize(position);
  float n = snoise(dir * uFreq + vec3(uTime * 0.16, uTime * 0.11, 0.0));
  float detail = snoise(dir * uFreq * 2.6 - vec3(0.0, uTime * 0.24, 0.0)) * 0.3;
  vec3 p = position + dir * (n + detail) * uIntensity;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.55 + aRandom * 0.9) / -mv.z;
  vNoise = n * 0.5 + 0.5;
  vDepth = clamp((mv.z + 8.0) / 4.5, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying float vNoise;
varying float vDepth;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;
  float soft = smoothstep(0.5, 0.1, r);
  vec3 col = mix(uColorA, uColorB, smoothstep(0.25, 0.8, vNoise));
  col = mix(col, uColorC, smoothstep(0.8, 1.0, vNoise) * 0.7);
  gl_FragColor = vec4(col, soft * uOpacity * (0.18 + 0.82 * vDepth));
}
`;

function fibonacciSphere(count: number, radius: number) {
  const pos = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pos[i * 3] = Math.cos(theta) * r * radius;
    pos[i * 3 + 1] = y * radius;
    pos[i * 3 + 2] = Math.sin(theta) * r * radius;
    rnd[i] = Math.random();
  }
  return { pos, rnd };
}

function ring(count: number, radius: number, spread: number) {
  const pos = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * spread;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.25;
    pos[i * 3 + 2] = Math.sin(a) * r;
    rnd[i] = Math.random();
  }
  return { pos, rnd };
}

const readRGB = (name: string): [number, number, number] => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return [v[0] / 255, v[1] / 255, v[2] / 255];
};

/**
 * WebGL hero background: a breathing particle sphere with an orbiting dust ring.
 * Follows the mouse, pauses when off-screen, and picks up theme colors.
 */
export function HeroScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // WebGL unavailable: the CSS gradients behind still look fine
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      const makeMaterial = (intensity: number, freq: number, size: number, opacity: number) =>
        new THREE.ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader: FRAGMENT,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uSize: { value: size * dpr },
            uIntensity: { value: intensity },
            uFreq: { value: freq },
            uOpacity: { value: opacity },
            uColorA: { value: new THREE.Color() },
            uColorB: { value: new THREE.Color() },
            uColorC: { value: new THREE.Color() },
          },
        });

      const group = new THREE.Group();
      scene.add(group);

      // Sphere
      const s = fibonacciSphere(small ? 4200 : 8000, 1.6);
      const sphereGeo = new THREE.BufferGeometry();
      sphereGeo.setAttribute("position", new THREE.BufferAttribute(s.pos, 3));
      sphereGeo.setAttribute("aRandom", new THREE.BufferAttribute(s.rnd, 1));
      const sphereMat = makeMaterial(0.32, 1.5, 22, 0.95);
      const sphere = new THREE.Points(sphereGeo, sphereMat);
      group.add(sphere);

      // Inner core (denser, smaller)
      const c = fibonacciSphere(small ? 1200 : 2200, 0.85);
      const coreGeo = new THREE.BufferGeometry();
      coreGeo.setAttribute("position", new THREE.BufferAttribute(c.pos, 3));
      coreGeo.setAttribute("aRandom", new THREE.BufferAttribute(c.rnd, 1));
      const coreMat = makeMaterial(0.18, 2.2, 16, 0.55);
      group.add(new THREE.Points(coreGeo, coreMat));

      // Orbiting dust ring
      const rg = ring(small ? 900 : 1600, 2.55, 0.35);
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute("position", new THREE.BufferAttribute(rg.pos, 3));
      ringGeo.setAttribute("aRandom", new THREE.BufferAttribute(rg.rnd, 1));
      const ringMat = makeMaterial(0.06, 3.0, 18, 0.8);
      const ringPts = new THREE.Points(ringGeo, ringMat);
      const ringPivot = new THREE.Group();
      ringPivot.rotation.set(1.2, 0, 0.35);
      ringPivot.add(ringPts);
      group.add(ringPivot);

      const materials = [sphereMat, coreMat, ringMat];
      const applyColors = () => {
        const a = readRGB("--accent");
        const b = readRGB("--accent-2");
        const w = readRGB("--warm");
        materials.forEach((m) => {
          (m.uniforms.uColorA.value as InstanceType<typeof THREE.Color>).setRGB(a[0], a[1], a[2]);
          (m.uniforms.uColorB.value as InstanceType<typeof THREE.Color>).setRGB(b[0], b[1], b[2]);
          (m.uniforms.uColorC.value as InstanceType<typeof THREE.Color>).setRGB(w[0], w[1], w[2]);
        });
      };
      applyColors();
      const themeObserver = new MutationObserver(applyColors);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      // Mouse parallax
      const mouse = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame && !reduce) frame = requestAnimationFrame(loop);
      });
      io.observe(host);

      const clock = new THREE.Clock();
      let frame = 0;
      let t = 0;
      const render = () => renderer.render(scene, camera);

      function loop() {
        frame = 0;
        if (!visible || document.hidden) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        t += dt;
        smooth.x += (mouse.x - smooth.x) * 0.04;
        smooth.y += (mouse.y - smooth.y) * 0.04;
        materials.forEach((m) => (m.uniforms.uTime.value = t));
        group.rotation.y += dt * 0.12;
        group.rotation.x = smooth.y * 0.25;
        group.position.x = smooth.x * 0.15;
        ringPts.rotation.y -= dt * 0.25;
        sphereMat.uniforms.uIntensity.value = 0.3 + Math.hypot(smooth.x, smooth.y) * 0.12;
        render();
        frame = requestAnimationFrame(loop);
      }

      const onVis = () => {
        if (!document.hidden && !frame && !reduce) {
          clock.getDelta();
          frame = requestAnimationFrame(loop);
        }
      };
      document.addEventListener("visibilitychange", onVis);

      if (reduce) {
        materials.forEach((m) => (m.uniforms.uTime.value = 2));
        render();
      } else frame = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(frame);
        themeObserver.disconnect();
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        [sphereGeo, coreGeo, ringGeo].forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className={className} />;
}
