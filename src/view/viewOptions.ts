import { get } from "svelte/store";
import { fromCm } from "../utils/units";
import {
  gridSize,
  protractorLockToRobot,
  showGrid,
  showProtractor,
  showRuler,
  snapToGrid,
} from "../stores";

/** Grid spacings in inches (round centimetres), in the order the grid button steps through them. */
export const GRID_SIZES = [5, 10, 20, 30].map(fromCm);

/** Step to the next grid size; after the largest, hide the grid. */
export function cycleGrid() {
  if (!get(showGrid)) {
    gridSize.set(GRID_SIZES[0]);
    showGrid.set(true);
    return;
  }
  const next = GRID_SIZES[GRID_SIZES.indexOf(get(gridSize)) + 1];
  if (next) gridSize.set(next);
  else showGrid.set(false);
}

export const toggleSnap = () => snapToGrid.update((on) => !on);
export const toggleRuler = () => showRuler.update((on) => !on);
export const toggleProtractor = () => showProtractor.update((on) => !on);
export const toggleProtractorLock = () =>
  protractorLockToRobot.update((on) => !on);
