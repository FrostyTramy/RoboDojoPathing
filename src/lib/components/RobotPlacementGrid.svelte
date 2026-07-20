<script lang="ts">
  import type { Point, Settings, Line } from "../../types";

  export let startPoint: Point;
  export let settings: Settings;
  export let lines: Line[] = [];

  const FIELD_SIZE = 359.41;

  const positions = [
    { label: "↖", col: 0, row: 0 },
    { label: "↑", col: 1, row: 0 },
    { label: "↗", col: 2, row: 0 },
    { label: "←", col: 0, row: 1 },
    { label: "·", col: 1, row: 1 },
    { label: "→", col: 2, row: 1 },
    { label: "↙", col: 0, row: 2 },
    { label: "↓", col: 1, row: 2 },
    { label: "↘", col: 2, row: 2 },
  ];

  // Use the actual rendered heading from lines[0].endPoint.startDeg
  $: headingDeg = lines?.[0]?.endPoint?.startDeg ?? 0;

  $: boundingHalfX = (() => {
    const θ = (headingDeg * Math.PI) / 180;
    return (Math.abs(settings.rWidth * Math.cos(θ)) + Math.abs(settings.rHeight * Math.sin(θ))) / 2;
  })();

  $: boundingHalfY = (() => {
    const θ = (headingDeg * Math.PI) / 180;
    return (Math.abs(settings.rWidth * Math.sin(θ)) + Math.abs(settings.rHeight * Math.cos(θ))) / 2;
  })();

  function place(col: number, row: number) {
    const hx = Math.round(boundingHalfX * 10) / 10;
    const hy = Math.round(boundingHalfY * 10) / 10;

    const xs = [hx, FIELD_SIZE / 2, FIELD_SIZE - hx];
    const ys = [FIELD_SIZE - hy, FIELD_SIZE / 2, hy];

    startPoint = {
      ...startPoint,
      x: Math.round(xs[col] * 10) / 10,
      y: Math.round(ys[row] * 10) / 10,
    };
  }
</script>

<div class="flex flex-col w-full gap-1">
  <div class="flex items-center justify-between">
    <div class="font-semibold text-sm">Place Robot</div>
    <div class="text-xs text-neutral-400">
      {headingDeg}° → ±{Math.round(boundingHalfX * 10) / 10} × ±{Math.round(boundingHalfY * 10) / 10} cm
    </div>
  </div>
  <div class="grid grid-cols-3 gap-1 w-fit">
    {#each positions as { label, col, row }}
      <button
        on:click={() => place(col, row)}
        class="w-9 h-9 flex items-center justify-center rounded-md text-base font-bold
               bg-neutral-200 dark:bg-neutral-700
               hover:bg-blue-500 hover:text-white
               transition-colors duration-150"
        title="Place robot {label}"
      >
        {label}
      </button>
    {/each}
  </div>
</div>
