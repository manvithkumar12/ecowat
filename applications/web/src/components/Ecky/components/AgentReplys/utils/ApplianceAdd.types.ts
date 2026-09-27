export type SavingParameters = {
  parameters:
    | {
        name: string | string[];
        id?: number | number[];
        power?: number | number[] | string | string[];
        powerUnit?: string | string[];
        usageHours?: number | number[] | string | string[];
      }
    | Array<{
        name: string;
        id?: number;
        power?: number | string;
        powerUnit?: string;
        usageHours?: number | string;
      }>;
};

export interface ApplianceAddQueryProps {
  message: string;
  isThinking?: boolean;
  data?: SavingParameters | null;
}
export interface ApplianceNotFoundProps {
  message: string;
  isThinking?: boolean;
}

export interface ApplianceItemState {
  id: string;
  rawName: string;
  displayName: string;
  category: string;
  power: number;
  powerUnit: string;
  usageHours: number;
  isAdded: boolean;
  isPending: boolean;
}
