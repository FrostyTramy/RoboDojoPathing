import type { Point, Line, Shape, Settings } from "../types";
import { getRandomColor } from "../utils";

/**
 * Default robot dimensions (cm)
 */
export const DEFAULT_ROBOT_WIDTH = 36;
export const DEFAULT_ROBOT_HEIGHT = 30;

/**
 * Default canvas drawing settings (cm)
 */
export const POINT_RADIUS = 2.921;
export const LINE_WIDTH = 1.45;
export const FIELD_SIZE = 359.41;

/**
 * Available field maps. fieldWidth/fieldHeight are in cm.
 */
export const AVAILABLE_FIELD_MAPS = [
  { value: "decode.webp", label: "DECODE Field (2025-2026)", fieldWidth: FIELD_SIZE, fieldHeight: FIELD_SIZE },
  { value: "intothedeep.webp", label: "Into The Deep Field (2024-2025)", fieldWidth: FIELD_SIZE, fieldHeight: FIELD_SIZE },
  { value: "centerstage.webp", label: "Centerstage (2023-2024)", fieldWidth: FIELD_SIZE, fieldHeight: FIELD_SIZE },
  { value: "orig2026.webp", label: "ORIG 2026 Field (2025-2026)", fieldWidth: 365.76, fieldHeight: 609.60 },
  { value: "custom", label: "Custom Field (Upload)", fieldWidth: FIELD_SIZE, fieldHeight: FIELD_SIZE },
];

export function getFieldDimensions(fieldMap: string): { fieldWidth: number; fieldHeight: number } {
  const entry = AVAILABLE_FIELD_MAPS.find((f) => f.value === fieldMap);
  return entry
    ? { fieldWidth: entry.fieldWidth, fieldHeight: entry.fieldHeight }
    : { fieldWidth: FIELD_SIZE, fieldHeight: FIELD_SIZE };
}

/**
 * Default settings (all units in cm and cm/s)
 */
export const DEFAULT_SETTINGS: Settings = {
  xVelocity: 190,
  yVelocity: 165,
  aVelocity: Math.PI,
  kFriction: 0.1,
  rWidth: DEFAULT_ROBOT_WIDTH,
  rHeight: DEFAULT_ROBOT_HEIGHT,
  safetyMargin: 2.54,
  maxVelocity: 102,
  maxAcceleration: 76,
  maxDeceleration: 76,
  fieldMap: "decode.webp",
  robotImage: "/robot.png",
  theme: "auto",
  showGhostPaths: false,
  showOnionLayers: false,
  onionLayerSpacing: 8,
  onionColor: "#dc2626",
  onionNextPointOnly: false,
  showHeadingArrow: false,
  headingArrowLength: 50,
  headingArrowColor: "#ffffff",
  headingArrowThickness: 2,
  pathOpacity: 1,
};

/**
 * Get default starting point
 */
export function getDefaultStartPoint(): Point {
  return {
    x: 142,
    y: 20,
    heading: "linear",
    startDeg: 90,
    endDeg: 180,
    locked: false,
  };
}

/**
 * Get default initial path lines
 */
export function getDefaultLines(): Line[] {
  return [
    {
      id: `line-${Math.random().toString(36).slice(2)}`,
      name: "Path 1",
      endPoint: { x: 142, y: 91, heading: "linear", startDeg: 90, endDeg: 180 },
      controlPoints: [],
      color: "#ffc516",
      locked: false,
      waitBeforeMs: 0,
      waitAfterMs: 0,
      waitBeforeName: "",
      waitAfterName: "",
    },
  ];
}

/**
 * Get default shapes (field obstacles)
 */
export function getDefaultShapes(): Shape[] {
  return [
    {
      id: "triangle-1",
      name: "Red Goal",
      vertices: [
        { x: 359.41, y: 177.8 },
        { x: 359.41, y: 359.41 },
        { x: 304.8, y: 359.41 },
        { x: 350.52, y: 302.26 },
        { x: 350.52, y: 177.8 },
      ],
      color: "#dc2626",
      fillColor: "#ff6b6b",
    },
    {
      id: "triangle-2",
      name: "Blue Goal",
      vertices: [
        { x: 15.24, y: 302.26 },
        { x: 63.5, y: 359.41 },
        { x: 0, y: 359.41 },
        { x: 0, y: 177.8 },
        { x: 15.24, y: 177.8 },
      ],
      color: "#2563eb",
      fillColor: "#60a5fa",
    },
  ];
}
