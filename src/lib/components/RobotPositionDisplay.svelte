<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let robotXY: BasePoint;
  export let robotHeading: number;
  export let x: d3.ScaleLinear<number, number, number>;
  export let y: d3.ScaleLinear<number, number, number>;
  export let settings: Settings;

  const dispatch = createEventDispatcher();

  function handleDimInput() {
    dispatch("change");
  }
</script>

<div class="flex flex-col w-full justify-start items-start gap-1.5 text-sm">
  <div class="font-semibold">Current Robot Position</div>
  <div class="flex flex-row justify-start items-center gap-2">
    <div class="font-extralight">X:</div>
    <div class="w-16">{x.invert(robotXY.x).toFixed(3)}</div>
    <div class="font-extralight">Y:</div>
    <div class="w-16">{y.invert(robotXY.y).toFixed(3)}</div>
    <div class="font-extralight">Heading:</div>
    <div>
      {robotHeading.toFixed(0) === "-0" ? "0" : -robotHeading.toFixed(0)}&deg;
    </div>
  </div>

  <div class="font-semibold mt-1">Robot Size</div>
  <div class="flex flex-row justify-start items-center gap-2">
    <div class="font-extralight">W:</div>
    <input
      type="number"
      min="1"
      max="91"
      step="1"
      bind:value={settings.rWidth}
      on:input={handleDimInput}
      class="pl-1.5 rounded-md bg-neutral-100 border-[0.5px] focus:outline-none w-20 dark:bg-neutral-950 dark:border-neutral-700"
    />
    <div class="font-extralight">H:</div>
    <input
      type="number"
      min="1"
      max="91"
      step="1"
      bind:value={settings.rHeight}
      on:input={handleDimInput}
      class="pl-1.5 rounded-md bg-neutral-100 border-[0.5px] focus:outline-none w-20 dark:bg-neutral-950 dark:border-neutral-700"
    />
    <div class="font-extralight text-neutral-500">cm</div>
  </div>
</div>
