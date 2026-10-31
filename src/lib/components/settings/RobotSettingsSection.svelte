<script lang="ts">
  import type { RobotConfig, Settings } from "../../../types";
  import NumberField from "../ui/NumberField.svelte";
  import RobotImagePicker from "./RobotImagePicker.svelte";
  import { clampNumberInput } from "../../settings/numericSetting";
  import { updateRobot } from "../../../model/commands";
  import { useProject } from "../../../state/project.svelte";
  import { cmValue, fromCm, LENGTH_UNIT } from "../../../utils/units";

  interface Props {
    /** Display preferences: the robot image. */
    settings: Settings;
  }

  let { settings = $bindable() }: Props = $props();

  const project = useProject();
  let robot = $derived(project.doc.robot);

  function setNumber(
    value: string,
    property: keyof RobotConfig,
    min?: number,
    max?: number,
  ) {
    project.apply(
      updateRobot({ [property]: clampNumberInput(value, min, max) }),
      { coalesce: `robot.${property}` },
    );
  }

  /** The fields take centimetres; the robot config stores inches. */
  function setLength(
    value: string,
    property: keyof RobotConfig,
    minCm: number,
    maxCm: number,
  ) {
    setNumber(
      String(fromCm(parseFloat(value))),
      property,
      fromCm(minCm),
      fromCm(maxCm),
    );
  }
</script>

<div class="flex flex-col gap-3 px-1">
  <div class="grid grid-cols-2 gap-2">
    <NumberField
      id="robot-length"
      label={`Length (${LENGTH_UNIT})`}
      value={cmValue(robot.rLength)}
      min={2.5}
      max={90}
      step={0.5}
      onInput={(v) => setLength(v, "rLength", 2.5, 90)}
    />
    <NumberField
      id="robot-width"
      label={`Width (${LENGTH_UNIT})`}
      value={cmValue(robot.rWidth)}
      min={2.5}
      max={90}
      step={0.5}
      onInput={(v) => setLength(v, "rWidth", 2.5, 90)}
    />
  </div>

  <NumberField
    id="safety-margin"
    label={`Safety margin (${LENGTH_UNIT})`}
    description="Buffer kept around obstacles."
    value={cmValue(robot.safetyMargin)}
    min={0}
    max={60}
    step={0.5}
    onInput={(v) => setLength(v, "safetyMargin", 0, 60)}
  />

  <RobotImagePicker bind:settings />
</div>
