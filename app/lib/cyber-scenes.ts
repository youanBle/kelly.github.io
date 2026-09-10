import * as T from "three";

export type SceneKind = "lattice" | "finance" | "logistics" | "commerce";
export type SceneController = ReturnType<typeof createScene>;

// Imported only after the intro closes and the scene enters the viewport.
// All models are procedural: no textures, remote assets, shadows or post-processing.
export function createScene(
  host: HTMLElement,
  kind: SceneKind,
  onLost: () => void,
) {
  const hero = kind === "lattice";
  const mobile = matchMedia("(pointer: coarse)").matches;
  const renderer = new T.WebGLRenderer({
    alpha: true,
    antialias: !mobile,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.dataset.scene = kind;
  host.appendChild(renderer.domElement);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(hero ? 38 : 35, 1, 0.1, 60);
  camera.position.set(hero ? 0 : 3.1, hero ? 0.25 : 2.3, hero ? 5.7 : 4.7);
  camera.lookAt(0, hero ? 0 : 0.35, 0);
  const root = new T.Group();
  scene.add(root);
  scene.add(new T.HemisphereLight(0xd7fff0, 0x111820, 2.5));
  const light = new T.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 4);
  scene.add(light);
  const colors = {
    lattice: 0x9de8c5,
    finance: 0x8df1c2,
    logistics: 0xe7c785,
    commerce: 0xffa978,
  };
  const color = colors[kind];
  const lines = (opacity = 0.7, hex = color) =>
    new T.LineBasicMaterial({ color: hex, transparent: true, opacity });
  const solid = (hex = color) =>
    new T.MeshStandardMaterial({
      color: hex,
      roughness: 0.35,
      metalness: 0.4,
      emissive: hex,
      emissiveIntensity: 0.11,
    });
  function box(w: number, h: number, d: number, hex = color) {
    const group = new T.Group();
    const geo = new T.BoxGeometry(w, h, d);
    const mesh = new T.Mesh(
      geo,
      new T.MeshStandardMaterial({
        color: hex,
        transparent: true,
        opacity: 0.23,
        metalness: 0.4,
        roughness: 0.3,
        depthWrite: false,
      }),
    );
    group.add(
      mesh,
      new T.LineSegments(new T.EdgesGeometry(geo), lines(0.9, hex)),
    );
    return group;
  }
  function path(points: T.Vector3[], loop = false, opacity = 0.7, hex = color) {
    const geometry = new T.BufferGeometry().setFromPoints(points);
    return loop
      ? new T.LineLoop(geometry, lines(opacity, hex))
      : new T.Line(geometry, lines(opacity, hex));
  }
  function ring(radius: number, y: number, opacity = 0.35) {
    const obj = path(
      Array.from(
        { length: 80 },
        (_, i) =>
          new T.Vector3(
            Math.cos((i / 80) * Math.PI * 2) * radius,
            y,
            Math.sin((i / 80) * Math.PI * 2) * radius,
          ),
      ),
      true,
      opacity,
    );
    root.add(obj);
    return obj;
  }
  const update: Array<(time: number, energy: number) => void> = [];
  if (hero) {
    // Quad lattice: latitude rings and meridians, without triangulation diagonals.
    const vertices: number[] = [];
    const point = (theta: number, phi: number) => [
      Math.sin(theta) * Math.cos(phi),
      Math.cos(theta),
      Math.sin(theta) * Math.sin(phi),
    ];
    for (let lat = 1; lat < 19; lat++)
      for (let lon = 0; lon < 64; lon++)
        vertices.push(
          ...point((lat / 19) * Math.PI, (lon / 64) * Math.PI * 2),
          ...point((lat / 19) * Math.PI, ((lon + 1) / 64) * Math.PI * 2),
        );
    for (let lon = 0; lon < 32; lon++)
      for (let lat = 0; lat < 48; lat++)
        vertices.push(
          ...point((lat / 48) * Math.PI, (lon / 32) * Math.PI * 2),
          ...point(((lat + 1) / 48) * Math.PI, (lon / 32) * Math.PI * 2),
        );
    const base = new Float32Array(vertices);
    const geometry = new T.BufferGeometry();
    const positions = new T.BufferAttribute(new Float32Array(base.length), 3);
    positions.setUsage(T.DynamicDrawUsage);
    geometry.setAttribute("position", positions);
    const mesh = new T.LineSegments(geometry, lines(0.47));
    mesh.frustumCulled = false;
    root.add(mesh);
    const nodes = new T.Group();
    root.add(nodes);
    for (let i = 0; i < 18; i++) {
      const node = new T.Mesh(
        new T.SphereGeometry(0.019, 6, 4),
        new T.MeshBasicMaterial({ color: 0xc4ffe0 }),
      );
      const theta = Math.acos(1 - (2 * (i + 0.5)) / 18),
        phi = i * 2.39996;
      node.position.fromArray(point(theta, phi)).multiplyScalar(1.36);
      nodes.add(node);
    }
    const orbit = ring(1.72, 0, 0.25);
    orbit.rotation.x = 0.45;
    const orbit2 = ring(1.62, 0, 0.14);
    orbit2.rotation.z = 0.9;
    const core = new T.Mesh(
      new T.IcosahedronGeometry(0.16, 0),
      new T.MeshBasicMaterial({
        color: 0x92e5c0,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      }),
    );
    root.add(core);
    const grid = new T.GridHelper(4.2, 20, 0x375a48, 0x203c30);
    grid.position.y = -1.65;
    grid.material.transparent = true;
    grid.material.opacity = 0.45;
    scene.add(grid);
    update.push((time, energy) => {
      for (let i = 0; i < base.length; i += 3) {
        const x = base[i],
          y = base[i + 1],
          z = base[i + 2];
        const wave =
          Math.sin(y * 5 + time * 0.9) * Math.cos(x * 4 - time * 0.55) * 0.035;
        const ripple = Math.sin((x + z) * 7 - time * 3) * energy * 0.07;
        const radius = 1.34 * (1 + wave + ripple);
        positions.setXYZ(i / 3, x * radius, y * radius, z * radius);
      }
      positions.needsUpdate = true;
      nodes.rotation.y = Math.sin(time * 0.3) * 0.025;
      core.rotation.set(time * 0.17, time * 0.24, 0);
    });
  } else {
    const floor = new T.GridHelper(4.4, 16, 0x52695e, 0x2c3b34);
    floor.material.transparent = true;
    floor.material.opacity = 0.27;
    root.add(floor);
    ring(1.68, 0.02, 0.38);
    ring(1.85, 0.02, 0.13);
    if (kind === "finance") {
      const heights = [0.45, 0.8, 0.64, 1.28, 1.65];
      const bars = heights.map((h, i) => {
        const bar = box(0.34, h, 0.42);
        bar.position.set((i - 2) * 0.57, h / 2, 0.08);
        root.add(bar);
        return bar;
      });
      const chart = path(
        heights.map((h, i) => new T.Vector3((i - 2) * 0.57, h + 0.18, 0.39)),
        false,
        0.95,
      );
      root.add(chart);
      const marker = new T.Mesh(new T.OctahedronGeometry(0.095), solid());
      root.add(marker);
      update.push((time) => {
        bars.forEach((bar, i) => {
          bar.scale.y = 1 + Math.sin(time * 1.3 + i) * 0.07;
          bar.position.y = (heights[i] * bar.scale.y) / 2;
        });
        const attr = chart.geometry.getAttribute(
          "position",
        ) as T.BufferAttribute;
        bars.forEach((bar, i) => attr.setY(i, heights[i] * bar.scale.y + 0.18));
        attr.needsUpdate = true;
        const u = ((Math.sin(time * 0.5) + 1) / 2) * 4,
          i = Math.min(3, Math.floor(u)),
          f = u - i;
        marker.position.lerpVectors(
          new T.Vector3(
            (i - 2) * 0.57,
            heights[i] * bars[i].scale.y + 0.18,
            0.39,
          ),
          new T.Vector3(
            (i - 1) * 0.57,
            heights[i + 1] * bars[i + 1].scale.y + 0.18,
            0.39,
          ),
          f,
        );
        marker.rotation.y = time;
      });
    }
    if (kind === "logistics") {
      const track = path(
        Array.from({ length: 96 }, (_, i) => {
          const a = (i / 96) * Math.PI * 2;
          return new T.Vector3(Math.cos(a) * 1.4, 0.15, Math.sin(a) * 0.82);
        }),
        true,
        0.8,
      );
      root.add(track);
      const depot = box(0.68, 0.55, 0.55);
      depot.position.set(0, 0.32, 0);
      root.add(depot);
      const roof = path(
        [
          new T.Vector3(-0.45, 0.63, 0),
          new T.Vector3(0, 1, 0),
          new T.Vector3(0.45, 0.63, 0),
        ],
        false,
        0.9,
      );
      root.add(roof);
      const parcels = Array.from({ length: 3 }, () => {
        const parcel = box(0.32, 0.32, 0.32);
        const tape = new T.Mesh(
          new T.BoxGeometry(0.055, 0.325, 0.325),
          solid(0xb9f1dd),
        );
        parcel.add(tape);
        root.add(parcel);
        return parcel;
      });
      const scanner = path(
        [
          new T.Vector3(1.4, 0.16, -0.4),
          new T.Vector3(1.4, 0.9, -0.4),
          new T.Vector3(1.4, 0.9, 0.4),
          new T.Vector3(1.4, 0.16, 0.4),
        ],
        false,
        0.8,
        0x9ee8d3,
      );
      root.add(scanner);
      update.push((time) =>
        parcels.forEach((parcel, i) => {
          const angle = time * 0.45 + (i * Math.PI * 2) / 3;
          parcel.position.set(
            Math.cos(angle) * 1.4,
            0.36 + Math.sin(time * 2 + i) * 0.025,
            Math.sin(angle) * 0.82,
          );
          parcel.rotation.y = -angle;
        }),
      );
    }
    if (kind === "commerce") {
      const bag = new T.Group();
      const body = box(0.92, 1.0, 0.48, 0xff9469);
      body.position.y = 0.83;
      bag.add(body);
      const handle = path(
        Array.from({ length: 33 }, (_, i) => {
          const a = (i / 32) * Math.PI;
          return new T.Vector3(
            Math.cos(a) * 0.25,
            1.33 + Math.sin(a) * 0.3,
            0.05,
          );
        }),
        false,
        0.95,
      );
      bag.add(handle);
      const s = path(
        [
          [-0.14, 1.04],
          [0.13, 1.04],
          [-0.13, 0.83],
          [0.13, 0.64],
          [-0.14, 0.64],
        ].map(([x, y]) => new T.Vector3(x, y, 0.25)),
        false,
        0.95,
        0xffe5ce,
      );
      bag.add(s);
      root.add(bag);
      const parcels = Array.from({ length: 3 }, (_, i) => {
        const obj = box(0.26, 0.26, 0.26, i === 1 ? 0xb2f5ce : color);
        root.add(obj);
        return obj;
      });
      update.push((time) => {
        bag.position.y = Math.sin(time * 1.2) * 0.065;
        bag.rotation.y = Math.sin(time * 0.55) * 0.16;
        parcels.forEach((obj, i) => {
          const angle = time * 0.3 + (i * Math.PI * 2) / 3;
          obj.position.set(
            Math.cos(angle) * 1.25,
            0.35 + Math.sin(time * 1.5 + i) * 0.08,
            Math.sin(angle) * 0.75,
          );
          obj.rotation.y = time * 0.25 + i;
        });
      });
    }
  }
  let disposed = false,
    visible = false,
    animate = false,
    dragging = false,
    frame = 0,
    last = 0,
    time = 0,
    energy = 0;
  let yaw = hero ? -0.3 : 0,
    pitch = hero ? 0.15 : 0,
    targetYaw = yaw,
    targetPitch = pitch,
    velocity = 0;
  const fps = mobile ? 24 : 30;
  function draw(now: number) {
    frame = 0;
    if (disposed || !visible) return;
    if (last && now - last < 1000 / fps) {
      frame = requestAnimationFrame(draw);
      return;
    }
    const dt = last ? Math.min((now - last) / 1000, 0.065) : 1 / fps;
    last = now;
    if (animate) time += dt;
    if (hero && animate && !dragging) {
      targetYaw += dt * 0.085 + velocity;
      velocity *= 0.92;
    }
    if (!animate) {
      yaw = targetYaw;
      pitch = targetPitch;
    } else {
      yaw += (targetYaw - yaw) * 0.16;
      pitch += (targetPitch - pitch) * 0.16;
    }
    root.rotation.y = yaw;
    root.rotation.x = pitch;
    energy *= 0.95;
    update.forEach((fn) => fn(time, energy));
    renderer.render(scene, camera);
    if (animate || dragging || Math.abs(targetYaw - yaw) > 0.001)
      frame = requestAnimationFrame(draw);
  }
  const schedule = () => {
    if (visible && !disposed && !frame) frame = requestAnimationFrame(draw);
  };
  const resize = new ResizeObserver(() => {
    const width = host.clientWidth,
      height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    schedule();
  });
  resize.observe(host);
  const lost = (event: Event) => {
    event.preventDefault();
    onLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  return {
    setState(nextVisible: boolean, nextAnimate: boolean) {
      visible = nextVisible;
      animate = nextAnimate;
      host.dataset.sceneState = !visible
        ? "offscreen"
        : animate
          ? "running"
          : "paused";
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      } else schedule();
    },
    drag(dx: number, dy: number) {
      targetYaw += dx * 0.009;
      targetPitch = T.MathUtils.clamp(targetPitch + dy * 0.006, -0.8, 0.8);
      velocity = T.MathUtils.clamp(dx * 0.002, -0.045, 0.045);
      energy = 1;
      schedule();
    },
    setDragging(value: boolean) {
      dragging = value;
      if (value) velocity = 0;
      schedule();
    },
    reset() {
      targetYaw = hero ? -0.3 : 0;
      targetPitch = hero ? 0.15 : 0;
      velocity = 0;
      energy = 0.7;
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<T.BufferGeometry>(),
        materials = new Set<T.Material>();
      scene.traverse((obj) => {
        const drawable = obj as T.Mesh;
        if (drawable.geometry) geometries.add(drawable.geometry);
        if (drawable.material)
          (Array.isArray(drawable.material)
            ? drawable.material
            : [drawable.material]
          ).forEach((m) => materials.add(m));
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
