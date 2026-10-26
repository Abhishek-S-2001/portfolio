"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

export interface AvatarCharacterProps {
  currentSection: string;
  scrollProgress: number;
  triggerGesture?: string | null;
  onGestureComplete?: () => void;
  mousePosRef: React.RefObject<{ x: number; y: number }>;
}

export default function AvatarCharacter({
  currentSection,
  scrollProgress,
  triggerGesture,
  onGestureComplete,
  mousePosRef,
}: AvatarCharacterProps) {
  const group = useRef<THREE.Group>(null);
  const headBone = useRef<THREE.Bone | null>(null);
  const projPos = useMemo(() => new THREE.Vector3(), []);

  // Load the rigged low-poly robot model
  const { scene, animations } = useGLTF("/models/robot.glb");

  // Filter out Head rotation tracks from all clips so the animation mixer
  // never fights our Inverse Kinematics cursor tracking!
  const filteredAnimations = useMemo(() => {
    return animations.map((clip) => {
      const cloned = clip.clone();
      cloned.tracks = cloned.tracks.filter(
        (track) =>
          !track.name.toLowerCase().includes("head.quaternion") &&
          !track.name.toLowerCase().includes("head.rotation")
      );
      return cloned;
    });
  }, [animations]);

  const { actions } = useAnimations(filteredAnimations, group);

  const [activeAction, setActiveAction] = useState<string>("Idle");

  // Apply premium gradient texture with metallic clearcoat & neon glow
  useEffect(() => {
    // Generate vibrant linear gradient texture (Cyan to Violet to Indigo)
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#4f46e5");   // Deep Indigo
      grad.addColorStop(0.3, "#7c3aed"); // Vivid Violet
      grad.addColorStop(0.65, "#a855f7"); // Neon Purple
      grad.addColorStop(1, "#06b6d4");   // Electric Cyan
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
    }
    const gradientTexture = new THREE.CanvasTexture(canvas);
    gradientTexture.wrapS = THREE.RepeatWrapping;
    gradientTexture.wrapT = THREE.RepeatWrapping;

    const gradientMaterial = new THREE.MeshPhysicalMaterial({
      map: gradientTexture,
      roughness: 0.18,
      metalness: 0.72,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      emissive: new THREE.Color("#6366f1"),
      emissiveIntensity: 0.25,
      emissiveMap: gradientTexture,
    });

    const eyeGlowMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#06b6d4"),
      emissive: new THREE.Color("#22d3ee"),
      emissiveIntensity: 3.5,
      roughness: 0.15,
      metalness: 0.4,
    });

    const jointAccentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1e1b4b"),
      roughness: 0.35,
      metalness: 0.85,
      emissive: new THREE.Color("#4338ca"),
      emissiveIntensity: 0.35,
    });

    scene.traverse((child) => {
      if (child instanceof THREE.Bone && child.name === "Head") {
        headBone.current = child;
      }
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const mat = child.material;
        const matName = Array.isArray(mat) ? mat[0]?.name : mat?.name;

        if (matName === "Main") {
          child.material = gradientMaterial;
        } else if (matName === "Black") {
          // Eyes glow neon electric cyan
          child.material = eyeGlowMaterial;
        } else if (matName === "Grey") {
          // Metallic joints & screws
          child.material = jointAccentMaterial;
        }
      }
    });
  }, [scene]);

  // Initial greeting wave on mount
  useEffect(() => {
    if (actions["Wave"]) {
      actions["Wave"].reset().setLoop(THREE.LoopOnce, 1).play();
      actions["Wave"].clampWhenFinished = true;
      const timer = setTimeout(() => {
        if (actions["Idle"]) {
          actions["Wave"]?.fadeOut(0.4);
          actions["Idle"].reset().fadeIn(0.4).play();
          setActiveAction("Idle");
        }
      }, 2400);
      return () => clearTimeout(timer);
    } else if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.4).play();
      setActiveAction("Idle");
    }
  }, [actions]);

  // Handle triggered gestures (e.g. from UI buttons)
  useEffect(() => {
    if (!triggerGesture || !actions[triggerGesture]) return;

    const newAction = actions[triggerGesture];
    const prevAction = actions[activeAction];

    prevAction?.fadeOut(0.3);
    newAction.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.3).play();
    newAction.clampWhenFinished = true;

    const timer = setTimeout(() => {
      newAction.fadeOut(0.4);
      actions["Idle"]?.reset().fadeIn(0.4).play();
      setActiveAction("Idle");
      if (onGestureComplete) onGestureComplete();
    }, 2400);

    return () => clearTimeout(timer);
  }, [triggerGesture, actions, activeAction, onGestureComplete]);

  // Handle section change reactions (e.g., cheer when entering projects)
  useEffect(() => {
    if (currentSection === "projects" && actions["ThumbsUp"]) {
      actions[activeAction]?.fadeOut(0.3);
      actions["ThumbsUp"].reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.3).play();
      actions["ThumbsUp"].clampWhenFinished = true;
      setTimeout(() => {
        actions["ThumbsUp"]?.fadeOut(0.4);
        actions["Idle"]?.reset().fadeIn(0.4).play();
        setActiveAction("Idle");
      }, 2000);
    }
  }, [currentSection, actions, activeAction]);

  // useFrame: Scroll-driven 3D navigation & relative gaze IK
  useFrame((state, delta) => {
    if (!group.current) return;

    // --- 1. Scroll-Driven 3D Path Navigation ---
    // Calculate character 3D target coordinates based on scrollProgress [0, 1]
    const p = scrollProgress;
    let targetX = 2.4;
    let targetY = -0.35;
    let targetZ = 0;
    let baseFacing = -0.25;

    // Viewport-aware responsive horizontal bounds
    const isMobile = state.viewport.width < 6.5;
    const sideOffset = isMobile ? 1.4 : 2.95;

    if (p < 0.16) {
      // Hero: Upper-right companion
      targetX = sideOffset;
      targetY = -0.3;
      baseFacing = -0.35;
    } else if (p < 0.36) {
      // About: Left side, presenting Core Engineering
      targetX = -sideOffset;
      targetY = -0.35;
      baseFacing = 0.35;
    } else if (p < 0.56) {
      // Experience: Right side of timeline
      targetX = sideOffset;
      targetY = -0.4;
      baseFacing = -0.3;
    } else if (p < 0.76) {
      // Projects: Left side, highlighting Anomaly Detection
      targetX = -sideOffset;
      targetY = -0.35;
      baseFacing = 0.35;
    } else if (p < 0.90) {
      // Skills & Education: Right side
      targetX = sideOffset;
      targetY = -0.45;
      baseFacing = -0.25;
    } else {
      // Contact: Ready to collaborate
      targetX = isMobile ? 0 : 2.0;
      targetY = -0.55;
      baseFacing = isMobile ? 0 : -0.2;
    }

    // Natural breathing float
    const floatY = Math.sin(state.clock.elapsedTime * 1.8) * 0.04;

    // Smoothly glide position along the scroll path
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 2.5, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY + floatY, 2.5, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 2.5, delta);

    // --- 2. Accurate Relative Cursor Look-At & IK Tracking ---
    // Project the 3D character world position to 2D NDC [-1, 1]
    group.current.getWorldPosition(projPos);
    projPos.project(state.camera);

    // Normalized mouse coordinates
    const mx = mousePosRef?.current?.x ?? 0;
    const my = mousePosRef?.current?.y ?? 0;

    // Relative vector from character's center to cursor
    const relX = mx - projPos.x;
    const relY = my - projPos.y;

    // Correct non-inverted gaze: when relX > 0 (cursor to right), turn right (+); when relX < 0, turn left (-)
    const targetHeadY = THREE.MathUtils.clamp(relX * 0.65, -0.75, 0.75);
    const targetHeadX = THREE.MathUtils.clamp(-relY * 0.45, -0.35, 0.35);

    if (headBone.current) {
      headBone.current.rotation.y = THREE.MathUtils.damp(
        headBone.current.rotation.y,
        targetHeadY,
        6,
        delta
      );
      headBone.current.rotation.x = THREE.MathUtils.damp(
        headBone.current.rotation.x,
        targetHeadX,
        6,
        delta
      );
    }

    // Smooth body yaw: blends base section orientation with cursor direction
    const targetBodyRotY = THREE.MathUtils.clamp(baseFacing + relX * 0.25, -0.75, 0.75);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetBodyRotY,
      4,
      delta
    );
  });

  return (
    <group ref={group} dispose={null} scale={0.16} position={[2.4, -0.35, 0]}>
      {/* Dynamic aura lights illuminating the robot */}
      <pointLight color="#06b6d4" intensity={2.8} distance={2.5} position={[0, 1.2, 1.2]} />
      <pointLight color="#a855f7" intensity={2.4} distance={2.5} position={[-0.8, -0.5, -0.8]} />
      <primitive object={scene} />
    </group>
  );
}

// Preload the model asset
useGLTF.preload("/models/robot.glb");
