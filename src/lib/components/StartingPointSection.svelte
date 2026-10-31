<script lang="ts">
  import { Lock, LockOpen } from "@lucide/svelte";
  import type { StartPose } from "../../types";
  import { FIELD_SIZE } from "../../config";
  import { updateStartPoint } from "../../model/commands";
  import { useProject } from "../../state/project.svelte";
  import IconButton from "./ui/IconButton.svelte";
  import { fieldClass, labelClass } from "./ui/styles";
  import { cmValue, fromCm, LENGTH_UNIT } from "../../utils/units";

  const project = useProject();
  let startPoint = $derived(project.doc.startPoint);

  function update(patch: Partial<StartPose>, field?: string) {
    project.apply(updateStartPoint(patch), {
      coalesce: field && `start.${field}`,
    });
  }

  function numberFrom(input: HTMLInputElement): number | null {
    const value = parseFloat(input.value);
    return Number.isNaN(value) ? null : value;
  }
</script>

<div class="grid grid-cols-[1fr_1fr_auto] items-end gap-2 px-1">
  <label class="col-span-2 flex flex-col gap-1">
    <span class={labelClass}>Name</span>
    <input
      class={fieldClass}
      value={startPoint.name ?? ""}
      placeholder="start"
      disabled={startPoint.locked}
      oninput={(event) => update({ name: event.currentTarget.value }, "name")}
    />
  </label>
  <IconButton
    label={startPoint.locked ? "Unlock the start" : "Lock the start"}
    active={startPoint.locked}
    onclick={() => update({ locked: !startPoint.locked })}
  >
    {#if startPoint.locked}<Lock />{:else}<LockOpen />{/if}
  </IconButton>

  <label class="flex flex-col gap-1">
    <span class={labelClass}>X ({LENGTH_UNIT})</span>
    <input
      class={fieldClass}
      type="number"
      min="0"
      max={cmValue(FIELD_SIZE)}
      step="0.1"
      value={cmValue(startPoint.x)}
      disabled={startPoint.locked}
      oninput={(event) => {
        const x = numberFrom(event.currentTarget);
        if (x !== null) update({ x: fromCm(x) }, "x");
      }}
    />
  </label>
  <label class="flex flex-col gap-1">
    <span class={labelClass}>Y ({LENGTH_UNIT})</span>
    <input
      class={fieldClass}
      type="number"
      min="0"
      max={cmValue(FIELD_SIZE)}
      step="0.1"
      value={cmValue(startPoint.y)}
      disabled={startPoint.locked}
      oninput={(event) => {
        const y = numberFrom(event.currentTarget);
        if (y !== null) update({ y: fromCm(y) }, "y");
      }}
    />
  </label>
</div>
