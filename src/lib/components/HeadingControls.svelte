<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let endPoint: any;
  export let locked: boolean = false;
  const dispatch = createEventDispatcher();

  let useRadians = false;

  const toDisplay = (deg: number) =>
    useRadians ? parseFloat((deg * Math.PI / 180).toFixed(4)) : deg;

  const fromDisplay = (val: number) =>
    useRadians ? val * 180 / Math.PI : val;
</script>

<div class="flex items-center gap-1 flex-wrap">
  <select
    bind:value={endPoint.heading}
    on:change={() => {
      if (endPoint.heading === "constant" && endPoint.degrees === undefined) endPoint.degrees = 0;
      else if (endPoint.heading === "linear") {
        if (endPoint.startDeg === undefined) endPoint.startDeg = 0;
        if (endPoint.endDeg === undefined) endPoint.endDeg = 0;
      } else if (endPoint.heading === "tangential") {
        if (endPoint.reverse === undefined) endPoint.reverse = false;
      }
      dispatch("change");
    }}
    class="rounded-md bg-neutral-100 dark:bg-neutral-950 dark:border-neutral-700 border-[0.5px] focus:outline-none w-28 text-sm"
    disabled={locked}
  >
    <option value="constant">Constant</option>
    <option value="linear">Linear</option>
    <option value="tangential">Tangential</option>
  </select>

  <!-- deg/rad toggle (hidden for tangential) -->
  {#if endPoint.heading !== "tangential"}
    <button
      on:click={() => (useRadians = !useRadians)}
      class="px-1.5 py-0.5 text-xs rounded border font-mono
             {useRadians
               ? 'bg-blue-500 text-white border-blue-600'
               : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300'}"
      title="Switch between degrees and radians"
    >
      {useRadians ? "rad" : "deg"}
    </button>
  {/if}

  {#if endPoint.heading === "linear"}
    <div class="flex items-center gap-1 mt-1 w-full">
      <span class="text-xs text-neutral-600 dark:text-neutral-400">Start:</span>
      <input
        class="pl-1.5 rounded-md bg-neutral-100 dark:bg-neutral-950 dark:border-neutral-700 border-[0.5px] focus:outline-none w-16"
        step={useRadians ? 0.01 : 1}
        type="number"
        value={toDisplay(endPoint.startDeg ?? 0)}
        on:input={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) { endPoint.startDeg = fromDisplay(v); dispatch("change"); }
        }}
        on:blur={() => dispatch("commit")}
        title="Start heading ({useRadians ? 'rad' : 'deg'})"
        disabled={locked}
      />
      <span class="text-xs text-neutral-600 dark:text-neutral-400">End:</span>
      <input
        class="pl-1.5 rounded-md bg-neutral-100 dark:bg-neutral-950 dark:border-neutral-700 border-[0.5px] focus:outline-none w-16"
        step={useRadians ? 0.01 : 1}
        type="number"
        value={toDisplay(endPoint.endDeg ?? 0)}
        on:input={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) { endPoint.endDeg = fromDisplay(v); dispatch("change"); }
        }}
        on:blur={() => dispatch("commit")}
        title="End heading ({useRadians ? 'rad' : 'deg'})"
        disabled={locked}
      />
    </div>
  {:else if endPoint.heading === "constant"}
    <div class="flex items-center gap-1 mt-1 w-full">
      <span class="text-xs text-neutral-600 dark:text-neutral-400">{useRadians ? "Rad:" : "Deg:"}</span>
      <input
        class="pl-1.5 rounded-md bg-neutral-100 dark:bg-neutral-950 dark:border-neutral-700 border-[0.5px] focus:outline-none w-16"
        step={useRadians ? 0.01 : 1}
        type="number"
        value={toDisplay(endPoint.degrees ?? 0)}
        on:input={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) { endPoint.degrees = fromDisplay(v); dispatch("change"); }
          else { endPoint.degrees = 0; dispatch("change"); }
        }}
        on:blur={() => dispatch("commit")}
        title="Heading ({useRadians ? 'rad' : 'deg'})"
        disabled={locked}
      />
    </div>
  {:else if endPoint.heading === "tangential"}
    <p class="text-sm font-extralight">Reverse:</p>
    <input
      type="checkbox"
      bind:checked={endPoint.reverse}
      on:change={() => dispatch("change")}
      on:blur={() => dispatch("commit")}
      disabled={locked}
    />
  {/if}
</div>
