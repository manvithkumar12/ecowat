import { Availableappliances, ConversationStep } from "../types";

export const BotSteps: Record<number, ConversationStep> = {
  1: {
    question:
      "Hello! I'm EcoBot. I can analyze your household energy usage and recommend ways to reduce costs and carbon emissions.",
    options: [
      { label: "Get Started", nextStep: 2 },
      { label: "Tell me about EcoWatt", nextStep: 100 },
      { label: "Exit", exit: true },
    ],
  },

  2: {
    question: "What should I call you?",
    inputType: "text",
    nextStep: 3,
  },

  3: {
    question: "hello ${name} How many people live in your household?",
    options: [
      { label: "1", nextStep: 5 },
      { label: "2", nextStep: 5 },
      { label: "3", nextStep: 5 },
      { label: "4", nextStep: 5 },
      { label: "5", nextStep: 5 },
      { label: "6", nextStep: 5 },
      { label: "7", nextStep: 5 },
      { label: "8", nextStep: 5 },
      { label: "9", nextStep: 5 },
      { label: "10", nextStep: 5 },
    ],
  },

  5: {
    question: "Do you have solar panels installed?",
    options: [
      { label: "Yes", nextStep: 6 },
      { label: "No", nextStep: 6 },
    ],
  },

  6: {
    question: "What is your approximate monthly electricity consumption?",
    options: [
      { label: "Less than 150 kWh", nextStep: 7 },
      { label: "150 - 300 kWh", nextStep: 7 },
      { label: "300 - 500 kWh", nextStep: 7 },
      { label: "More than 500 kWh", nextStep: 7 },
      { label: "I don't know", nextStep: 7 },
    ],
  },

  7: {
    Info: "Perfect! EcoWatt has enough information to analyze your household energy profile and generate personalized recommendations. please add aplliances in Appliances Section",
    options: [
      { label: "Generate Analysis", nextStep: 8 },
      { label: "Cancel", exit: true },
    ],
  },

  8: {
    Info: "Analyzing appliance usage, weather forecasts, renewable energy availability, and electricity pricing data...",
    options: [{ label: "View Dashboard", exit: true }],
    navUrl: "/dashboard",
  },
  9: {
    Info: "Fetching weather forecasts, electricity prices, and renewable energy availability...",
    options: [{ label: "View Dashboard", exit: true }],
    navUrl: "/dashboard",
  },

  100: {
    Info: "EcoWatt predicts household energy usage, estimates future costs and carbon emissions, and recommends the best times to run appliances based on renewable energy availability and electricity prices.",
    options: [
      { label: "Start Setup", nextStep: 2 },
      { label: "Exit", exit: true },
    ],
  },
  500: {
    Info: "SOMETHING_WRONG",
    options: [
      { label: "Try again later", exit: true },
      { label: "Continue without data", exit: true },
    ],
  },
};
