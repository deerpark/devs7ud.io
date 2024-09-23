"use client";

import { motion } from "framer-motion";
import * as React from "react";

interface PathMotionProps {
  path: string; // Path 데이터 (ex: M10 10 L100 100 등)
}

const PathMotion: React.FC<PathMotionProps> = ({ path }) => {
  const [pathLength, setPathLength] = React.useState(0);
  const [motionPoint, setMotionPoint] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const svgPath = document.querySelector("path");
    if (svgPath) {
      const length = svgPath.getTotalLength();
      setPathLength(length);

      // 경로 상의 좌표를 매 프레임 업데이트
      const updatePoint = (progress: number) => {
        const point = svgPath.getPointAtLength(length * progress);
        setMotionPoint({ x: point.x, y: point.y });
      };

      let progress = 0;
      const animate = () => {
        progress += 0.01;
        if (progress > 1) progress = 0;
        updatePoint(progress);
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [path]);

  return (
    <svg width="800" height="400">
      <path d={path} fill="transparent" stroke="black" />
      <motion.circle cx={motionPoint.x} cy={motionPoint.y} r="5" fill="red" />
    </svg>
  );
};

export default PathMotion;
