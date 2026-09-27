export interface ConversationStep {
  question?: string;
  inputType?: string;
  Info?: string;
  options?: Option[];
  values?: string[];
  nextStep?: number;
  multiSelect?: boolean;
  navUrl?:string
}

export interface Option {
  label: string;
  nextStep?: number;
  exit?: boolean;
}
