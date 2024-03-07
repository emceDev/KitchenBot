interface Container {
  number: string;
  type: "container";
  contents: {
    type: string;
    name: string;
    weight: Number;
  };
}
interface Stove {
  name: String;
  type: "stove";
  options: { name: string; value: number }[];
  position: Number;
  isIgnited: Boolean;
  ignitionTimes: Number[];
  isOccupied: Boolean;
  number: String;
}
interface Tool {
  name: String;
  type: "tool";
  options: { name: String; value: Number };
  position: Number;
  number: String;
}
interface Job {
  type: "add" | "mix" | "adjust" | "pause" | "use"; // Discriminated union property
  source?: Container | Tool;
  destination?: Stove;
  options?: MixOptions | PauseOptions;
}
type MixOptions = {
  speed: number;
  duration: number;
  textOption: string;
  [key: string]: number | string;
};
type PauseOptions = {
  duration: number;
  description: string;
};
type FlipOptions = {
  times: number;
};
type StoveSetter = (newValue: Stove | null) => void;
type AddJobFunction = (
  type: "add" | "adjust" | "pause" | "mix" | "use",
  destination?: Stove,
  options?: MixOptions | PauseOptions
) => void;
type SetSourceFunction = (source: Container) => void;
type SetDestiationFunction = (destination: Stove) => void;
export type {
  SetDestiationFunction,
  SetSourceFunction,
  StoveSetter,
  FlipOptions,
  PauseOptions,
  MixOptions,
  AddJobFunction,
  Container,
  Job,
  Stove,
  Tool,
};
