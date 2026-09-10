"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneController, SceneKind } from "../lib/cyber-scenes";
import "./cyber-scene.css";

const labels = {
  lattice: "Elastic wire grid",
  finance: "Financial data towers",
  logistics: "Parcels in transit",
  commerce: "Digital storefront",
};
export default function CyberScene({
  kind,
  children,
}: {
  kind: SceneKind;
  children: React.ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null),
    surface = useRef<HTMLDivElement>(null),
    controller = useRef<SceneController | null>(null);
  const [ready, setReady] = useState(false),
    [paused, setPaused] = useState(false),
    [enabled, setEnabled] = useState(false),
    [failed, setFailed] = useState(false),
    [reduced, setReduced] = useState(false);
  const pausedRef = useRef(paused),
    enabledRef = useRef(enabled);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const hero = kind === "lattice";
  useEffect(() => {
    pausedRef.current = paused;
    window.dispatchEvent(new Event("cyber-state-change"));
  }, [paused]);
  useEffect(() => {
    enabledRef.current = enabled;
    window.dispatchEvent(new Event("cyber-state-change"));
  }, [enabled]);
  useEffect(() => {
    const target = host.current;
    if (!target || !surface.current) return;
    let stopped = false,
      inView = false,
      loading = false,
      loadTimer: ReturnType<typeof setTimeout> | undefined;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      clearTimeout(loadTimer);
      const visible =
        inView &&
        !document.hidden &&
        !document.querySelector(".story-dialog[open]");
      const allowed =
        enabledRef.current || (!motion.matches && !connection?.saveData);
      controller.current?.setState(
        visible,
        visible && !pausedRef.current && !motion.matches,
      );
      if (!visible || !allowed || controller.current || loading || stopped)
        return;
      loadTimer = setTimeout(async () => {
        loading = true;
        try {
          const { createScene } = await import("../lib/cyber-scenes");
          if (stopped) return;
          if (
            !inView ||
            document.hidden ||
            document.querySelector(".story-dialog[open]")
          ) {
            loading = false;
            return;
          }
          controller.current = createScene(target, kind, () => {
            controller.current?.dispose();
            controller.current = null;
            setReady(false);
            setFailed(true);
          });
          setReady(true);
          update();
        } catch {
          if (!stopped) {
            setFailed(true);
            setReady(false);
          }
        }
      }, 180);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        update();
      },
      { threshold: 0.08 },
    );
    observer.observe(surface.current);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("portfolio-intro-change", update);
    window.addEventListener("cyber-state-change", update);
    const onMotionChange = () => {
      setReduced(motion.matches);
      update();
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      stopped = true;
      clearTimeout(loadTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("portfolio-intro-change", update);
      window.removeEventListener("cyber-state-change", update);
      motion.removeEventListener("change", onMotionChange);
      controller.current?.dispose();
      controller.current = null;
    };
  }, [kind]);
  return (
    <div className={`cyber-scene cyber-${kind}`} data-ready={ready}>
      <div
        ref={surface}
        className={`cyber-surface ${hero && ready ? "can-drag" : ""}`}
        role={hero ? "group" : undefined}
        aria-label={labels[kind]}
        aria-describedby={hero ? "lattice-help" : undefined}
        tabIndex={hero && ready ? 0 : undefined}
        onPointerDown={(event) => {
          if (!hero || !ready || event.button !== 0) return;
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          controller.current?.setDragging(true);
        }}
        onPointerMove={(event) => {
          const prev = pointer.current;
          if (!prev || prev.id !== event.pointerId) return;
          controller.current?.drag(
            event.clientX - prev.x,
            event.clientY - prev.y,
          );
          pointer.current = { id: prev.id, x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          if (pointer.current?.id !== event.pointerId) return;
          pointer.current = null;
          controller.current?.setDragging(false);
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          pointer.current = null;
          controller.current?.setDragging(false);
        }}
        onLostPointerCapture={() => {
          pointer.current = null;
          controller.current?.setDragging(false);
        }}
        onKeyDown={(event) => {
          if (!hero || !ready) return;
          const moves: Record<string, [number, number]> = {
            ArrowLeft: [-12, 0],
            ArrowRight: [12, 0],
            ArrowUp: [0, -12],
            ArrowDown: [0, 12],
          };
          if (moves[event.key]) {
            event.preventDefault();
            controller.current?.drag(...moves[event.key]);
          }
          if (event.key === "Home") {
            event.preventDefault();
            controller.current?.reset();
          }
        }}
      >
        <div className="cyber-fallback" aria-hidden="true">
          {children}
        </div>
        <div className="cyber-canvas" ref={host} />
      </div>
      {hero && (
        <span className="lattice-hint" id="lattice-help">
          {ready
            ? "DRAG TO ROTATE · ARROW KEYS WORK TOO"
            : "A LITTLE ROOM TO EXPERIMENT"}
        </span>
      )}
      <div className="cyber-controls">
        {ready ? (
          <>
            {!reduced && (
              <button
                onClick={() => setPaused(!paused)}
                aria-label={`${paused ? "Play" : "Pause"} ${labels[kind]}`}
                aria-pressed={paused}
              >
                {paused ? "▷" : "Ⅱ"}
              </button>
            )}
            {hero && (
              <button
                onClick={() => controller.current?.reset()}
                aria-label="Reset grid rotation"
              >
                ↺
              </button>
            )}
          </>
        ) : (
          !failed && (
            <button onClick={() => setEnabled(true)} className="enable-scene">
              Explore 3D ↗
            </button>
          )
        )}
      </div>
      {!hero && (
        <span className="cyber-caption" aria-hidden="true">
          {kind === "finance"
            ? "FINANCE / SIGNAL FLOW"
            : kind === "logistics"
              ? "LOGISTICS / IN TRANSIT"
              : "COMMERCE / ALWAYS OPEN"}
        </span>
      )}
    </div>
  );
}
