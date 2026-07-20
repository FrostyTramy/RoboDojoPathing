<script lang="ts">
  import type { Line } from "../../types";

  export let lines: Line[];

  let useRadians = false;

  // The visual heading at start comes from lines[0].endPoint.startDeg
  $: currentDeg = lines?.[0]?.endPoint?.startDeg ?? 0;

  $: displayValue = useRadians
    ? parseFloat((currentDeg * Math.PI / 180).toFixed(4))
    : currentDeg;

  function setFacing(val: number) {
    if (!lines?.[0]) return;
    const deg = useRadians ? val * 180 / Math.PI : val;
    lines[0].endPoint = { ...lines[0].endPoint, startDeg: deg };
    lines = [...lines];
  }
</script>

<div class="flex flex-row items-center gap-2">
  <span class="font-extralight">Facing:</span>
  <input
    type="number"
    value={displayValue}
    step={useRadians ? 0.01 : 1}
    on:input={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v)) setFacing(v); }}
    class="pl-1.5 rounded-md bg-neutral-100 border-[0.5px] focus:outline-none w-24 dark:bg-neutral-950 dark:border-neutral-700"
  />
  <button
    on:click={() => (useRadians = !useRadians)}
    class="px-1.5 py-0.5 text-xs rounded border font-mono
           {useRadians
             ? 'bg-blue-500 text-white border-blue-600'
             : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300'}"
  >
    {useRadians ? "rad" : "deg"}
  </button>
</div>
