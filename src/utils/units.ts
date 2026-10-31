/**
 * The model, simulation and code export all work in inches, which is what Pedro
 * Pathing expects. The interface shows and accepts centimetres, converting here.
 */
export const CM_PER_INCH = 2.54;

export const LENGTH_UNIT = "cm";
export const SPEED_UNIT = "cm/s";
export const ACCELERATION_UNIT = "cm/s²";

export const toCm = (inches: number) => inches * CM_PER_INCH;
export const fromCm = (cm: number) => cm / CM_PER_INCH;

/** Inches as a rounded centimetre number, so 18" reads 45.72 and not 45.720000000000006. */
export const cmValue = (inches: number, digits = 2) =>
  Number(toCm(inches).toFixed(digits));
