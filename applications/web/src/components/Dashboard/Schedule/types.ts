export type RescheduledApplicationItem = {
  id: number;
  applianceId: number;
  appliance: {
    name: string;
  };
  startHour: string;
  endHour: string;
  powerConsumed: number;
  rating: number;
};

export type FindUserRescheduleResponse = {
  data: RescheduledApplicationItem[];
  totalHours: number;
};

export type RescheduleSuggestion = {
  startHour: number;
  endHour: number;
  cost: number;
  renewableScore: number;
};
