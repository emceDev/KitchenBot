interface ContainerFormProps {
  container: Container;
  onSubmit: (container: Container) => void;
}
interface Machine {
  name: String;
  password: String;
  number: String;
  receipes?: Receipe[];
  registeredContainers?: Container[];
  tools?: Tool[];
}
interface Receipe {
  _id?: string;
  name: string;
  status: string;
  jobs: Job[];
  stoves: Stove[];
  containers: Container[];
}
interface ContainerListItemProps {
  container: Container;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}
interface Container {
  number: string;
  type: "container";
  contents: {
    contentsType: string;
    name: string;
    weight: Number;
  };
  _id?: string;
}
interface Stove {
  name: String;
  type: "stove";
  options: StoveOptions;
  position: Number;
  isIgnited: Boolean;
  ignitionTimes: Number[];
  isOccupied: Boolean;
  number: String;
}
interface Tool {
  name: String;
  type: "tool";
  jobType: "add" | "mix" | "adjust" | "pause" | "use";
  options: { name: String; value: Number };
  position: Number;
  number: String;
}
interface Job {
  jobType: "add" | "mix" | "adjust" | "pause" | "use"; //union
  container?: Container;
  stove?: Stove;
  options?: MixOptions | PauseOptions | StoveOptions;
  tool?: Tool;
}
type MixOptions = {
  speed: number;
  duration: number;
  textOption: string;
  [key: string]: number | string;
};
type StoveOptions = {
  power: number;
  test: "test";
  [key: string]: number | string;
};
type PauseOptions = {
  duration: number;
  description: string;
  [key: string]: number | string;
};
type FlipOptions = {
  times: number;
};
type StoveSetter = (newValue: Stove | null) => void;
type AddJobAdd = {
  jobType: "add";
  stove: Stove;
  container: Container;
};
type AddJobFunction = (
  jobType: "add" | "adjust" | "pause" | "mix" | "use",
  stove?: Stove,
  container?: Container,
  options?: MixOptions | PauseOptions | Stove["options"]
) => void;

type AddJobAddFunction = (
  jobType: "add",
  stove: Stove,
  container: Container
) => void;
type AddJobMixFunction = (
  jobType: "mix",
  stove: Stove,
  options: MixOptions
) => void;

type AddJobAdjustFunction = (
  jobType: "adjust",
  stove: Stove,
  options: Stove["options"]
) => void;
type AddJobPauseFunction = (jobType: "pause", options: PauseOptions) => void;

type SetSourceFunction = (source: Container) => void;
type SetStoveFunction = (
  destination: Stove,
  options?: Stove["options"]
) => void;
type handleAdjustStoveFunction = (
  stove: Stove,
  options: Stove["options"]
) => void;
type MachineCreateData = {
  name: string;
  password: string;
  number: string;
};
// first one is used by lower (jobEditforms and requires only job from them) components, second is used to asses index of job.
type handleJobEditFunction = (jobData: Job) => void;
type handleEditJobFunction = (i: number, job: Job) => void;
export type {
  handleJobEditFunction,
  handleEditJobFunction,
  Machine,
  handleAdjustStoveFunction,
  MachineCreateData,
  Receipe,
  SetStoveFunction,
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
  ContainerFormProps,
  ContainerListItemProps,
  AddJobAddFunction,
  AddJobMixFunction,
  AddJobPauseFunction,
  AddJobAdd,
  AddJobAdjustFunction,
};
