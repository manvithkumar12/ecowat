export type ApplianceRule = {
  shiftable: boolean;
  preferredStartHour: number;
  preferredEndHour: number;
  avoidNightHours: boolean;
  renewablePriority: boolean;
  pricePriority: boolean;
  comfortPriority: boolean;
  recommendationEnabled: boolean;
};

export const ApplianceRules = {
  evcharger: {
    shiftable: true,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: false,
    recommendationEnabled: true,
  },

  washingmachine: {
    shiftable: true,
    preferredStartHour: 8,
    preferredEndHour: 21,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  dishwasher: {
    shiftable: true,
    preferredStartHour: 18,
    preferredEndHour: 23,
    avoidNightHours: false,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  tumbledryer: {
    shiftable: true,
    preferredStartHour: 9,
    preferredEndHour: 20,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  electricwaterheater: {
    shiftable: true,
    preferredStartHour: 5,
    preferredEndHour: 23,
    avoidNightHours: false,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  heatpump: {
    shiftable: false,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: false,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: false,
  },

  airconditioner: {
    shiftable: false,
    preferredStartHour: 10,
    preferredEndHour: 22,
    avoidNightHours: false,
    renewablePriority: false,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: false,
  },

  homebatterystorage: {
    shiftable: true,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: false,
    recommendationEnabled: true,
  },

  electricfloorheating: {
    shiftable: false,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: false,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: false,
  },

  chestfreezer: {
    shiftable: false,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: false,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: false,
  },

  poolpump: {
    shiftable: true,
    preferredStartHour: 10,
    preferredEndHour: 17,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: false,
    recommendationEnabled: true,
  },

  electricoven: {
    shiftable: true,
    preferredStartHour: 11,
    preferredEndHour: 20,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  clothesiron: {
    shiftable: true,
    preferredStartHour: 8,
    preferredEndHour: 20,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  dehumidifier: {
    shiftable: true,
    preferredStartHour: 9,
    preferredEndHour: 21,
    avoidNightHours: false,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: false,
    recommendationEnabled: true,
  },

  airpurifier: {
    shiftable: false,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: false,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: false,
  },

  saunaheater: {
    shiftable: true,
    preferredStartHour: 15,
    preferredEndHour: 22,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  spaceheater: {
    shiftable: false,
    preferredStartHour: 0,
    preferredEndHour: 24,
    avoidNightHours: false,
    renewablePriority: false,
    pricePriority: false,
    comfortPriority: true,
    recommendationEnabled: false,
  },

  electricboiler: {
    shiftable: true,
    preferredStartHour: 5,
    preferredEndHour: 23,
    avoidNightHours: false,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: true,
    recommendationEnabled: true,
  },

  waterpump: {
    shiftable: true,
    preferredStartHour: 8,
    preferredEndHour: 18,
    avoidNightHours: true,
    renewablePriority: true,
    pricePriority: true,
    comfortPriority: false,
    recommendationEnabled: true,
  },
};
