import { cn } from "@/lib/utils"

type ScratchProps = {
  children: string
  className?: string
  fontSize?: number
  backgroundColor: string
  foregroundColor: string
  width?: string | number
  height?: string | number
  gap?: number
  baseFrequency?: number
  scale?: number
  isDarkmode: boolean
}

export default function Scratch({
  children,
  className,
  fontSize = 60,
  foregroundColor,
  backgroundColor,
  width = "100%",
  height = "100%",
  gap = 2,
  baseFrequency = 0.001,
  scale = 1,
  isDarkmode,
}: ScratchProps) {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ transform: `scale(${scale})` }}
    >
      <defs>
        <filter id="filter">
          {/* <!-- COLOR --> */}
          <feFlood
            floodColor={foregroundColor}
            floodOpacity={isDarkmode ? 1 : 0.75}
            result="foregroundColor"
          ></feFlood>
          <feFlood
            floodColor={backgroundColor}
            floodOpacity={isDarkmode ? 1 : 0.4}
            result="backgroundColor"
          ></feFlood>
          {/* <!-- COLOR END --> */}
          {/* <!-- Texture --> */}
          <feTurbulence
            baseFrequency={`${baseFrequency} ${baseFrequency}`}
            type="fractalNoise"
            numOctaves="3"
            seed="0"
            result="Texture_10"
          ></feTurbulence>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 -2.1 1.1"
            in="Texture_10"
            result="Texture_20"
          ></feColorMatrix>
          <feColorMatrix
            result="Texture_30"
            type="matrix"
            values="0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 -1.7 1.8"
            in="Texture_10"
          ></feColorMatrix>
          {/* <!-- Texture --> */}
          {/* <!-- FILL --> */}
          <feOffset
            dx={-1 - gap}
            dy={2 + gap}
            in="SourceAlpha"
            result="FILL_10"
          ></feOffset>
          <feDisplacementMap
            scale="17"
            in="FILL_10"
            in2="Texture_10"
            result="FILL_20"
          ></feDisplacementMap>
          <feComposite
            operator="in"
            in="Texture_30"
            in2="FILL_20"
            result="FILL_40"
          ></feComposite>
          <feComposite
            operator="in"
            in="foregroundColor"
            in2="FILL_40"
            result="FILL_50"
          ></feComposite>
          {/* <!-- FILL END--> */}
          {/* <!-- OUTLINE --> */}
          <feMorphology
            operator="dilate"
            radius="3"
            in="SourceAlpha"
            result="OUTLINE_10"
          ></feMorphology>
          <feComposite
            operator="out"
            in="OUTLINE_10"
            in2="SourceAlpha"
            result="OUTLINE_20"
          ></feComposite>
          <feDisplacementMap
            scale="7"
            in="OUTLINE_20"
            in2="Texture_10"
            result="OUTLINE_30"
          ></feDisplacementMap>
          <feComposite
            operator="arithmetic"
            k2="-1"
            k3="1"
            in="Texture_20"
            in2="OUTLINE_30"
            result="OUTLINE_40"
          ></feComposite>
          {/* <!-- OUTLINE END--> */}
          {/* <!-- BEVEL OUTLINE --> */}
          <feConvolveMatrix
            order="8,8"
            divisor="1"
            kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 "
            in="SourceAlpha"
            result="BEVEL_10"
          ></feConvolveMatrix>
          <feMorphology
            operator="dilate"
            radius="2"
            in="BEVEL_10"
            result="BEVEL_20"
          ></feMorphology>
          <feComposite
            operator="out"
            in="BEVEL_20"
            in2="BEVEL_10"
            result="BEVEL_30"
          ></feComposite>
          <feDisplacementMap
            scale="7"
            in="BEVEL_30"
            in2="Texture_10"
            result="BEVEL_40"
          ></feDisplacementMap>
          <feComposite
            operator="arithmetic"
            k2="-1"
            k3="1"
            in="Texture_20"
            in2="BEVEL_40"
            result="BEVEL_50"
          ></feComposite>
          <feOffset
            dx={-5 - gap}
            dy={-5 - gap}
            in="BEVEL_50"
            result="BEVEL_60"
          ></feOffset>
          <feComposite
            operator="out"
            in="BEVEL_60"
            in2="OUTLINE_10"
            result="BEVEL_70"
          ></feComposite>
          {/* <!-- BEVEL OUTLINE END --> */}
          {/* <!-- BEVEL FILL --> */}
          <feOffset
            dx={-7 - gap}
            dy={-7 - gap}
            in="BEVEL_10"
            result="BEVEL-FILL_10"
          ></feOffset>
          <feComposite
            operator="out"
            in="BEVEL-FILL_10"
            in2="OUTLINE_10"
            result="BEVEL-FILL_20"
          ></feComposite>
          <feDisplacementMap
            scale="17"
            in="BEVEL-FILL_20"
            in2="Texture_10"
            result="BEVEL-FILL_30"
          ></feDisplacementMap>
          <feComposite
            operator="in"
            in="backgroundColor"
            in2="BEVEL-FILL_30"
            result="BEVEL-FILL_50"
          ></feComposite>{" "}
          {/* <!-- --> */}
          {/* <!-- BEVEL FILL END--> */}
          <feMerge result="merge2">
            <feMergeNode in="BEVEL-FILL_50"></feMergeNode>
            <feMergeNode in="BEVEL_70"></feMergeNode>
            <feMergeNode in="FILL_50"></feMergeNode>
            <feMergeNode in="OUTLINE_40"></feMergeNode>
          </feMerge>
        </filter>
      </defs>

      <text
        className={cn("font-heading", className)}
        style={{
          filter: "url(#filter)",
          fill: backgroundColor,
          color: backgroundColor,
          fontWeight: 900,
          fontSize,
        }}
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {children.slice(0, 6)}
      </text>
    </svg>
  )
}
