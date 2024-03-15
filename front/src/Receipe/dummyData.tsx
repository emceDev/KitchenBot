import { Stove, Container, Receipe, Job } from "../types/ReceipeTypes";
export const dummyStoves: Stove[] = [
  {
    name: "palnik1",
    number: "S01",
    type: "stove",
    options: { power: 4, test: "test_string" },
    position: 4,
    isIgnited: false,
    ignitionTimes: [],
    isOccupied: false,
  },
  {
    name: "palnik2",
    number: "S02",
    type: "stove",
    options: { power: 2, test: "test_string2" },
    position: 3,
    isIgnited: false,
    ignitionTimes: [],
    isOccupied: false,
  },
];
export const dummyJobs: Job[] = [
  {
    type: "add",
    destination: {
      name: "palnik1",
      number: "S01",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 4,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    source: {
      type: "container",
      contents: {
        type: "solid",
        name: "Makaron",
        weight: 222,
      },
      number: "P01",
    },
  },
  {
    type: "add",
    destination: {
      name: "palnik2",
      number: "S02",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 3,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    source: {
      type: "container",
      contents: {
        type: "Solid",
        name: "Mięso",
        weight: 500,
      },
      number: "P02",
    },
  },
  {
    type: "add",
    destination: {
      name: "palnik1",
      number: "S01",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 4,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    source: {
      type: "container",
      contents: {
        type: "Fluid",
        name: "Sos",
        weight: 600,
      },
      number: "P03",
    },
  },
  {
    type: "adjust",
    destination: {
      name: "palnik2",
      number: "S02",
      type: "stove",
      options: [
        {
          name: "power",
          value: 41,
        },
      ],
      position: 3,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
  },
  {
    type: "add",
    destination: {
      name: "palnik2",
      number: "S02",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 3,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    source: {
      type: "container",
      contents: {
        type: "Solid",
        name: "Przyprawy",
        weight: 1,
      },
      number: "P04",
    },
  },
  {
    type: "mix",
    destination: {
      name: "palnik1",
      number: "S01",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 4,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    options: {
      speed: 2,
      duration: 20,
      textOption: "some text",
    },
  },
  {
    type: "pause",
    options: {
      duration: 2,
    },
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
      type: "solid",
      name: "Siano",
      weight: 222,
    },
    number: "P012",
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
const dummyReceipe2: Receipe = {
  containers: [
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
    {
      type: "container",
      contents: {
        type: "solid",
        name: "Dodany",
        weight: 12,
      },
      number: "P100",
    },
    {
      type: "container",
      contents: {
        type: "fluid",
        name: "Dodany2",
        weight: 12,
      },
      number: "1001",
    },
  ],
  stoves: [
    {
      name: "palnik1",
      number: "S01",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 4,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    {
      name: "palnik2",
      number: "S02",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 3,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
  ],
  name: "Dodany",
  id: "Przepis1",
  jobs: [
    {
      type: "pause",
      options: {
        duration: 2,
      },
    },
    {
      type: "add",
      destination: {
        name: "palnik2",
        number: "S02",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 3,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      source: {
        type: "container",
        contents: {
          type: "solid",
          name: "Dodany",
          weight: 12,
        },
        number: "P100",
      },
    },
    {
      type: "add",
      destination: {
        name: "palnik1",
        number: "S01",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 4,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      source: {
        type: "container",
        contents: {
          type: "fluid",
          name: "Dodany2",
          weight: 12,
        },
        number: "1001",
      },
    },
    {
      type: "pause",
      options: {
        duration: 12,
      },
    },
    {
      type: "pause",
      options: {
        duration: 12,
      },
    },
  ],
  status: "created",
};
const dummyReceipe1: Receipe = {
  containers: [
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
  ],
  stoves: [
    {
      name: "palnik1",
      number: "S01",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 4,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
    {
      name: "palnik2",
      number: "S02",
      type: "stove",
      options: [
        {
          name: "power",
          value: 4,
        },
      ],
      position: 3,
      isIgnited: false,
      ignitionTimes: [],
      isOccupied: false,
    },
  ],
  name: "Spagetti",
  id: "S01",
  jobs: [
    {
      type: "add",
      destination: {
        name: "palnik1",
        number: "S01",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 4,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      source: {
        type: "container",
        contents: {
          type: "solid",
          name: "Makaron",
          weight: 222,
        },
        number: "P01",
      },
    },
    {
      type: "adjust",
      destination: {
        name: "palnik1",
        number: "S01",
        type: "stove",
        options: [
          {
            name: "power",
            value: 41,
          },
        ],
        position: 4,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
    },
    {
      type: "add",
      destination: {
        name: "palnik2",
        number: "S02",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 3,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      source: {
        type: "container",
        contents: {
          type: "Fluid",
          name: "Sos",
          weight: 600,
        },
        number: "P03",
      },
    },
    {
      type: "add",
      destination: {
        name: "palnik2",
        number: "S02",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 3,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      source: {
        type: "container",
        contents: {
          type: "Solid",
          name: "Przyprawy",
          weight: 1,
        },
        number: "P04",
      },
    },
    {
      type: "mix",
      destination: {
        name: "palnik2",
        number: "S02",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 3,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      options: {
        speed: 2,
        duration: 20,
        textOption: "some text",
      },
    },
    {
      type: "pause",
      options: {
        duration: 10,
      },
    },
    {
      type: "mix",
      destination: {
        name: "palnik2",
        number: "S02",
        type: "stove",
        options: [
          {
            name: "power",
            value: 4,
          },
        ],
        position: 3,
        isIgnited: false,
        ignitionTimes: [],
        isOccupied: false,
      },
      options: {
        speed: 2,
        duration: "201",
        textOption: "some text",
      },
    },
  ],
  status: "created",
};
export const dummyReceipes: Receipe[] = [dummyReceipe1, dummyReceipe2];
