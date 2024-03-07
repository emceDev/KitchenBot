import { Stove, Container } from "../types/ReceipeTypes";
export const dummyStoves: Stove[] = [
  {
    name: "palnik1",
    number: "S01",
    type: "stove",
    options: [{ name: "power", value: 4 }],
    position: 4,
    isIgnited: false,
    ignitionTimes: [],
    isOccupied: false,
  },
  {
    name: "palnik2",
    number: "S02",
    type: "stove",
    options: [{ name: "power", value: 4 }],
    position: 3,
    isIgnited: false,
    ignitionTimes: [],
    isOccupied: false,
  },
];

export const dummyContainers: Container[] = [
  {
    type: "container",
    contents: {
      type: "solid",
      name: "Makaron",
      weight: 222,
    },
    number: "P01",
  },
  {
    type: "container",
    contents: {
      type: "Solid",
      name: "Mięso",
      weight: 500,
    },
    number: "P02",
  },
  {
    type: "container",
    contents: {
      type: "Fluid",
      name: "Sos",
      weight: 600,
    },
    number: "P03",
  },
  {
    type: "container",
    contents: {
      type: "Solid",
      name: "Przyprawy",
      weight: 1,
    },
    number: "P04",
  },
];
