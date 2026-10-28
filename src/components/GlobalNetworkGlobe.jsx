import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ROUTES_DATA, HUBS_DATA } from '../data/content';

const CONFIG = {
  globeRadius: 100,
  autoRotateSpeed: 0.06,
  arcAltitudeFactor: 0.32,
  iconTravelSeconds: { air: 3.5, sea: 9, road: 2.2 },
  colors: {
    air: 0xd8001d,
    sea: 0xffffff,
    road: 0xff2b34,
    hub: 0xf5f6f7,
  },
};

export default function GlobalNetworkGlobe({ onRequestQuoteForRoute }) {
  const containerRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const tooltipRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  // Animated stats
  const [statCountries, setStatCountries] = useState(0);
  const [statAssets, setStatAssets] = useState(0);
  const [statOnTime, setStatOnTime] = useState(0);

  useEffect(() => {
    // Stat count up
    let start = null;
    const duration = 1500;
    let animId;

    const step = (now) => {
      if (!start) start = now;

      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);

      setStatCountries(Math.round(54 * eased));
      setStatAssets(Math.round(6200 * eased));
      setStatOnTime(Math.round(98 * eased));

      if (p < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const canvasWrap = canvasWrapRef.current;
    const tooltip = tooltipRef.current;

    if (!canvasWrap) return;

    const isMobile = window.innerWidth <= 720;

    let width = canvasWrap.clientWidth || window.innerWidth;
    let height = canvasWrap.clientHeight || 650;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      3000
    );

    camera.position.set(0, 90, isMobile ? 420 : 320);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
    );

    renderer.setSize(width, height);
    canvasWrap.appendChild(renderer.domElement);

    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = isMobile ? 0.3 : 0.45;
    controls.zoomSpeed = isMobile ? 0.4 : 0.6;
    controls.minDistance = isMobile ? 180 : 140;
    controls.maxDistance = isMobile ? 650 : 600;
    controls.autoRotate = true;
    controls.autoRotateSpeed = CONFIG.autoRotateSpeed * 10;
    controls.enablePan = false;

    controls.addEventListener('start', () => {
      controls.autoRotate = false;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(-300, 120, 200);
    scene.add(sun);

    // Stars
    function buildStars(count, spread, size) {
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const r = spread * (0.6 + Math.random() * 0.4);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] =
          r * Math.sin(phi) * Math.cos(theta);

        positions[i * 3 + 1] =
          r * Math.sin(phi) * Math.sin(theta);

        positions[i * 3 + 2] =
          r * Math.cos(phi);
      }

      const geo = new THREE.BufferGeometry();

      geo.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );

      const mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      });

      return new THREE.Points(geo, mat);
    }

    scene.add(
      buildStars(
        isMobile ? 800 : 2000,
        1400,
        1.1
      )
    );

    const particles = buildStars(
      isMobile ? 0 : 250,
      240,
      0.6
    );

    scene.add(particles);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Earth textures
    const textureLoader = new THREE.TextureLoader();

    const dayTex = textureLoader.load(
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      () => {
        setLoading(false);
      },
      undefined,
      () => {
        setLoading(false);
      }
    );

    const nightTex = textureLoader.load(
      'https://unpkg.com/three-globe/example/img/earth-night.jpg'
    );

    const dayNightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayTex },
        nightTexture: { value: nightTex },
        sunDirection: {
          value: sun.position.clone().normalize(),
        },
      },

      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec3 sunDirection;

        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          float intensity =
            dot(vNormal, normalize(sunDirection));

          float mixAmt =
            smoothstep(-0.15, 0.25, intensity);

          vec4 dayColor =
            texture2D(dayTexture, vUv);

          vec4 nightColor =
            texture2D(nightTexture, vUv) *
            vec4(1.3, 1.1, 0.7, 1.0);

          gl_FragColor =
            mix(nightColor, dayColor, mixAmt);
        }
      `,
    });

    const globeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(
        CONFIG.globeRadius,
        isMobile ? 48 : 72,
        isMobile ? 48 : 72
      ),
      dayNightMaterial
    );

    globeGroup.add(globeMesh);

    // Atmospheric glow
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;

        void main() {
          vNormal = normalize(normalMatrix * normal);

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        varying vec3 vNormal;

        void main() {
          float intensity =
            pow(
              0.62 -
              dot(vNormal, vec3(0.0, 0.0, 1.0)),
              3.0
            );

          gl_FragColor =
            vec4(0.55, 0.72, 1.0, 1.0) *
            intensity;
        }
      `,

      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        CONFIG.globeRadius * 1.15,
        64,
        64
      ),
      atmoMat
    );

    globeGroup.add(atmosphere);

    // Helpers
    function latLngToVector3(lat, lng, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      return new THREE.Vector3(
        -radius *
          Math.sin(phi) *
          Math.cos(theta),

        radius * Math.cos(phi),

        radius *
          Math.sin(phi) *
          Math.sin(theta)
      );
    }

    function vector3ToScreen(vec3) {
      const v = vec3.clone().project(camera);

      return {
        x: (v.x * 0.5 + 0.5) * width,
        y: (-v.y * 0.5 + 0.5) * height,
        behind: v.z > 1,
      };
    }

    function makeIconSprite(emoji, color) {
      const size = 64;

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.font = `${size * 0.62}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;

        ctx.fillText(
          emoji,
          size / 2,
          size / 2 + 2
        );
      }

      const tex = new THREE.CanvasTexture(canvas);

      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: true,
      });

      const sprite = new THREE.Sprite(mat);

      sprite.scale.set(7, 7, 1);

      return sprite;
    }

    function makePulseRing(color) {
      const geo = new THREE.RingGeometry(
        1,
        1.4,
        32
      );

      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });

      return new THREE.Mesh(geo, mat);
    }

    // Build routes
    const routeGroup = new THREE.Group();
    globeGroup.add(routeGroup);

    const routeObjects = [];

    ROUTES_DATA.forEach((r) => {
      const color = CONFIG.colors[r.type];

      const start = latLngToVector3(
        r.lat1,
        r.lng1,
        CONFIG.globeRadius
      );

      const end = latLngToVector3(
        r.lat2,
        r.lng2,
        CONFIG.globeRadius
      );

      const dist = start.distanceTo(end);

      const altitude =
        r.type === 'road'
          ? dist * 0.08
          : dist * CONFIG.arcAltitudeFactor;

      const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(
          CONFIG.globeRadius + altitude
        );

      const curve =
        new THREE.QuadraticBezierCurve3(
          start,
          mid,
          end
        );

      const tubeGeo = new THREE.TubeGeometry(
        curve,
        isMobile ? 36 : 64,
        r.type === 'road' ? 0.35 : 0.55,
        6,
        false
      );

      const tubeMat =
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.55,
        });

      const tube = new THREE.Mesh(
        tubeGeo,
        tubeMat
      );

      tube.userData.routeId = r.id;
      routeGroup.add(tube);

      const hitGeo = new THREE.TubeGeometry(
        curve,
        isMobile ? 28 : 48,
        isMobile ? 4.5 : 2.6,
        6,
        false
      );

      const hitMat =
        new THREE.MeshBasicMaterial({
          visible: false,
        });

      const hitMesh = new THREE.Mesh(
        hitGeo,
        hitMat
      );

      hitMesh.userData.routeId = r.id;
      routeGroup.add(hitMesh);

      const ringA = makePulseRing(color);
      ringA.position.copy(start);
      ringA.lookAt(start.clone().multiplyScalar(2));

      const ringB = makePulseRing(color);
      ringB.position.copy(end);
      ringB.lookAt(end.clone().multiplyScalar(2));

      routeGroup.add(ringA, ringB);

      const emoji =
        r.type === 'air'
          ? '✈️'
          : r.type === 'sea'
          ? '🚢'
          : '🚛';

      const icon = makeIconSprite(
        emoji,
        `#${color.toString(16).padStart(6, '0')}`
      );

      routeGroup.add(icon);

      routeObjects.push({
        data: r,
        curve,
        tube,
        tubeMat,
        hitMesh,
        icon,
        ringA,
        ringB,
        duration:
          CONFIG.iconTravelSeconds[r.type],
        offset: Math.random(),
      });
    });

    // Hubs
    const hubGroup = new THREE.Group();
    globeGroup.add(hubGroup);

    const hubLabelEls = [];

    HUBS_DATA.forEach((h) => {
      const pos = latLngToVector3(
        h.lat,
        h.lng,
        CONFIG.globeRadius + 0.4
      );

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 12, 12),
        new THREE.MeshBasicMaterial({
          color: CONFIG.colors.hub,
        })
      );

      dot.position.copy(pos);

      const ring = makePulseRing(
        CONFIG.colors.hub
      );

      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));

      hubGroup.add(dot, ring);

      const label =
        document.createElement('div');

      label.className = 'gn-hub-label';
      label.textContent = h.name;

      canvasWrap.appendChild(label);

      hubLabelEls.push({
        el: label,
        pos,
      });
    });

    // Interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let hovered = null;
    let pointerDownPos = null;

    const DRAG_THRESHOLD = 6;

    function onPointerDown(e) {
      const p =
        'touches' in e
          ? e.touches[0]
          : e;

      pointerDownPos = {
        x: p.clientX,
        y: p.clientY,
      };
    }

    function wasDrag(e) {
      if (!pointerDownPos) return false;

      const p =
        'changedTouches' in e
          ? e.changedTouches[0]
          : e;

      const dx =
        p.clientX - pointerDownPos.x;

      const dy =
        p.clientY - pointerDownPos.y;

      return (
        Math.sqrt(dx * dx + dy * dy) >
        DRAG_THRESHOLD
      );
    }

    canvasWrap.addEventListener(
      'pointerdown',
      onPointerDown
    );

    function onPointerMove(e) {
      const rect =
        canvasWrap?.getBoundingClientRect();

      if (!rect) return;

      mouse.x =
        ((e.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      mouse.y =
        -(
          ((e.clientY - rect.top) /
            rect.height) *
            2 -
          1
        );

      raycaster.setFromCamera(
        mouse,
        camera
      );

      const hits =
        raycaster.intersectObjects(
          routeObjects.map(
            (r) => r.hitMesh
          )
        );

      if (hits.length) {
        const match = routeObjects.find(
          (r) =>
            r.hitMesh === hits[0].object
        );

        if (match) {
          if (hovered !== match) {
            if (hovered) {
              hovered.tubeMat.opacity = 0.55;
            }

            hovered = match;
            hovered.tubeMat.opacity = 1;
          }

          if (tooltip) {
            const r = match.data;

            const label =
              r.type === 'air'
                ? 'Air Freight'
                : r.type === 'sea'
                ? 'Sea Freight'
                : 'Road Transport';

            const color =
              `#${CONFIG.colors[r.type]
                .toString(16)
                .padStart(6, '0')}`;

            tooltip.innerHTML = `
              <div class="gn-tt-kicker" style="color:${color}">
                ${label}
              </div>

              <div class="gn-tt-route">
                ${r.from}
                <span style="color:${color}">&rarr;</span>
                ${r.to}
              </div>

              <div class="gn-tt-row">
                <span>Transit</span>
                <span>${r.time}</span>
              </div>

              <div class="gn-tt-row">
                <span>Frequency</span>
                <span>${r.frequency}</span>
              </div>

              <div class="gn-tt-row">
                <span>Cargo</span>
                <span>${r.cargo}</span>
              </div>
            `;

            tooltip.style.left =
              `${e.clientX - rect.left}px`;

            tooltip.style.top =
              `${e.clientY - rect.top}px`;

            tooltip.classList.add('visible');
          }
        }
      } else {
        if (hovered) {
          hovered.tubeMat.opacity = 0.55;
          hovered = null;
        }

        tooltip?.classList.remove(
          'visible'
        );
      }
    }

    function onClick(e) {
      if (wasDrag(e)) return;

      const rect =
        canvasWrap?.getBoundingClientRect();

      if (!rect) return;

      mouse.x =
        ((e.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      mouse.y =
        -(
          ((e.clientY - rect.top) /
            rect.height) *
            2 -
          1
        );

      raycaster.setFromCamera(
        mouse,
        camera
      );

      const hits =
        raycaster.intersectObjects(
          routeObjects.map(
            (r) => r.hitMesh
          )
        );

      if (hits.length) {
        const match = routeObjects.find(
          (r) =>
            r.hitMesh === hits[0].object
        );

        if (match) {
          setSelectedRoute(match.data);
        }
      }
    }

    canvasWrap.addEventListener(
      'mousemove',
      onPointerMove
    );

    canvasWrap.addEventListener(
      'click',
      onClick
    );

    // Filtering handler
    const updateVisibility = () => {
      const q =
        searchQuery.trim().toLowerCase();

      routeObjects.forEach((r) => {
        const typeMatch =
          activeFilter === 'all' ||
          r.data.type === activeFilter;

        const searchMatch =
          !q ||
          r.data.from
            .toLowerCase()
            .includes(q) ||
          r.data.to
            .toLowerCase()
            .includes(q);

        const visible =
          typeMatch && searchMatch;

        r.tubeMat.opacity =
          visible ? 0.55 : 0.04;

        r.icon.material.opacity =
          visible ? 1 : 0.05;

        r.ringA.material.opacity =
          visible ? 0.9 : 0.05;

        r.ringB.material.opacity =
          visible ? 0.9 : 0.05;

        r.hitMesh.visible = visible;
      });
    };

    updateVisibility();

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId =
        requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      controls.update();

      routeObjects.forEach((r) => {
        const p =
          (t / r.duration +
            r.offset) %
          1;

        const point =
          r.curve.getPointAt(p);

        r.icon.position.copy(point);

        const pulse =
          1 + Math.sin(t * 4) * 0.06;

        r.icon.scale.set(
          7 * pulse,
          7 * pulse,
          1
        );
      });

      const ringScale =
        1 +
        ((t * 0.9) % 1) *
          2.2;

      const ringOpacity =
        Math.max(
          0,
          1 - ((t * 0.9) % 1)
        );

      hubGroup.children.forEach(
        (child) => {
          if (
            'geometry' in child &&
            child.geometry.type ===
              'RingGeometry'
          ) {
            child.scale.set(
              ringScale,
              ringScale,
              ringScale
            );

            child.material.opacity =
              ringOpacity * 0.8;
          }
        }
      );

      routeObjects.forEach((r) => {
        const s =
          1 +
          (((t * 0.9 +
            r.offset) %
            1) *
            1.8);

        const o =
          Math.max(
            0,
            1 -
              ((t * 0.9 +
                r.offset) %
                1)
          );

        r.ringA.scale.set(s, s, s);
        r.ringB.scale.set(s, s, s);

        if (r.hitMesh.visible !== false) {
          r.ringA.material.opacity =
            o * 0.85;

          r.ringB.material.opacity =
            o * 0.85;
        }
      });

      particles.rotation.y +=
        0.0006;

      hubLabelEls.forEach(
        ({ el, pos }) => {
          const worldPos = pos
            .clone()
            .applyMatrix4(
              globeGroup.matrixWorld
            );

          const screen =
            vector3ToScreen(
              worldPos
            );

          el.style.left =
            `${screen.x}px`;

          el.style.top =
            `${screen.y}px`;

          el.style.display =
            screen.behind
              ? 'none'
              : 'block';
        }
      );

      renderer.render(
        scene,
        camera
      );
    }

    animate();

    function onResize() {
      if (!canvasWrap) return;

      width =
        canvasWrap.clientWidth;

      height =
        canvasWrap.clientHeight;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );
    }

    window.addEventListener(
      'resize',
      onResize
    );

    const safetyTimeout =
      setTimeout(() => {
        setLoading(false);
      }, 3000);

    return () => {
      clearTimeout(safetyTimeout);

      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        'resize',
        onResize
      );

      canvasWrap.removeEventListener(
        'pointerdown',
        onPointerDown
      );

      canvasWrap.removeEventListener(
        'mousemove',
        onPointerMove
      );

      canvasWrap.removeEventListener(
        'click',
        onClick
      );

      hubLabelEls.forEach(
        ({ el }) => el.remove()
      );

      if (
        renderer.domElement &&
        canvasWrap.contains(
          renderer.domElement
        )
      ) {
        canvasWrap.removeChild(
          renderer.domElement
        );
      }

      renderer.dispose();
    };
  }, [activeFilter, searchQuery]);

  const getRouteColor = (type) => {
    if (type === 'air') return '#d8001d';
    if (type === 'sea') return '#ffffff';

    return '#ff2b34';
  };

  return (
    <div
      id="global-network"
      ref={containerRef}
      className="relative w-full"
    >
      {loading && (
        <div id="gn-loading">
          <div className="gn-load-text">
            Establishing Network Link
          </div>

          <div className="gn-load-bar">
            <span></span>
          </div>
        </div>
      )}

      <div
        id="gn-canvas-wrap"
        ref={canvasWrapRef}
      ></div>

      <div className="gn-title">
        <p className="gn-eyebrow">
          Cruise Console Logistics
        </p>

        <h2>Global Network</h2>

        <p>
          Live routes moving high-value
          vehicles and specialized cargo
          across our air, sea and road
          network. Drag to explore, click
          any route for full detail.
        </p>
      </div>

      <div
        id="gn-search-wrap"
        className="gn-panel"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
          />

          <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
          />
        </svg>

        <input
          id="gn-search"
          type="text"
          placeholder="Search a city or hub…"
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(
              e.target.value
            )
          }
        />
      </div>

      <div
        id="gn-filters"
        className="gn-panel"
      >
        <div className="gn-panel-label">
          Filter Network
        </div>

        <button
          type="button"
          className={`gn-filter-btn ${
            activeFilter === 'all'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActiveFilter('all')
          }
        >
          <span
            className="gn-dot"
            style={{
              color: '#ffffff',
            }}
          ></span>
          All Routes
        </button>

        <button
          type="button"
          className={`gn-filter-btn ${
            activeFilter === 'air'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActiveFilter('air')
          }
        >
          <span
            className="gn-dot"
            style={{
              color: '#d8001d',
            }}
          ></span>
          Air Freight
        </button>

        <button
          type="button"
          className={`gn-filter-btn ${
            activeFilter === 'sea'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActiveFilter('sea')
          }
        >
          <span
            className="gn-dot"
            style={{
              color: '#ffffff',
            }}
          ></span>
          Ocean Freight
        </button>

        <button
          type="button"
          className={`gn-filter-btn ${
            activeFilter === 'road'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActiveFilter('road')
          }
        >
          <span
            className="gn-dot"
            style={{
              color: '#ff2b34',
            }}
          ></span>
          Road Transport
        </button>
      </div>

      <div
        id="gn-tooltip"
        ref={tooltipRef}
        className="gn-panel"
      ></div>

      {/* Side Panel for selected route */}
      <aside
        id="gn-side-panel"
        className={
          selectedRoute ? 'open' : ''
        }
      >
        {selectedRoute && (
          <>
            <button
              className="gn-close"
              aria-label="Close"
              onClick={() =>
                setSelectedRoute(null)
              }
            >
              &times;
            </button>

            <div
              className="gn-badge"
              style={{
                background: `${getRouteColor(
                  selectedRoute.type
                )}22`,
                color: getRouteColor(
                  selectedRoute.type
                ),
                border: `1px solid ${getRouteColor(
                  selectedRoute.type
                )}66`,
              }}
            >
              {selectedRoute.type === 'air'
                ? 'Air Freight'
                : selectedRoute.type === 'sea'
                ? 'Sea Freight'
                : 'Road Transport'}
            </div>

            <h3>
              {selectedRoute.from}{' '}
              <span className="gn-arrow">
                &rarr;
              </span>{' '}
              {selectedRoute.to}
            </h3>

            <div className="gn-sub">
              Route #
              {String(
                selectedRoute.id
              ).padStart(3, '0')}{' '}
              &middot; Cruise Console
              Network
            </div>

            <div className="gn-detail-grid">
              <div className="gn-detail-item">
                <div className="gn-di-label">
                  Transit Time
                </div>

                <div className="gn-di-value">
                  {selectedRoute.time}
                </div>
              </div>

              <div className="gn-detail-item">
                <div className="gn-di-label">
                  Frequency
                </div>

                <div className="gn-di-value">
                  {selectedRoute.frequency}
                </div>
              </div>

              <div className="gn-detail-item">
                <div className="gn-di-label">
                  Vehicle Type
                </div>

                <div className="gn-di-value">
                  {selectedRoute.vehicle}
                </div>
              </div>

              <div className="gn-detail-item">
                <div className="gn-di-label">
                  Typical Cargo
                </div>

                <div className="gn-di-value">
                  {selectedRoute.cargo}
                </div>
              </div>
            </div>

            <div className="gn-divider"></div>

            <div
              className="gn-di-label"
              style={{
                marginBottom: '10px',
              }}
            >
              Required Documents
            </div>

            <ul className="gn-list">
              {selectedRoute.documents.map(
                (d, i) => (
                  <li key={i}>{d}</li>
                )
              )}
            </ul>

            <div
              className="gn-di-label"
              style={{
                marginBottom: '10px',
              }}
            >
              Insurance
            </div>

            <ul className="gn-list">
              <li>
                {selectedRoute.insurance}
              </li>
            </ul>

            <div
              className="gn-di-label"
              style={{
                marginBottom: '10px',
              }}
            >
              Related Services
            </div>

            <ul className="gn-list">
              {selectedRoute.related.map(
                (s, i) => (
                  <li key={i}>{s}</li>
                )
              )}
            </ul>

            <div className="gn-divider"></div>

            <button
              type="button"
              className="gn-cta w-full text-center cursor-pointer"
              onClick={() => {
                if (
                  onRequestQuoteForRoute
                ) {
                  onRequestQuoteForRoute(
                    selectedRoute
                  );
                }

                setSelectedRoute(null);
              }}
            >
              Inquiries
            </button>
          </>
        )}
      </aside>

      {/* Stats Bar */}
      <div
        id="gn-stats"
        className="gn-panel"
      >
        <div className="gn-stat">
          <div className="gn-stat-num">
            {statCountries}+
          </div>

          <div className="gn-stat-label">
            Countries
          </div>
        </div>

        <div className="gn-stat">
          <div className="gn-stat-num">
            {statAssets.toLocaleString()}+
          </div>

          <div className="gn-stat-label">
            Assets
          </div>
        </div>

        <div className="gn-stat">
          <div className="gn-stat-num">
            {statOnTime}%
          </div>

          <div className="gn-stat-label">
            On-Time
          </div>
        </div>

        <div className="gn-stat">
          <div className="gn-stat-num">
            24/7
          </div>

          <div className="gn-stat-label">
            Operations
          </div>
        </div>
      </div>
    </div>
  );
}
