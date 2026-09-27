TOOLS = [
    {
        "name": "UseSerp",
        "info": "Retrieves information about electricity, Germany's electricity market, renewable energy, electricity news, history, regulations, and other electricity-related topics.",
        "Arguments": {"query": "string"}
    },
    {
        "name": "useAllowedAppliances",
        "info": "used to find all allowed and supported appliances in EcoWat",
        "Arguments": {}
    },
    {
        "name": "isApplianceAllowed",
        "info": "used to check if specific appliances are allowed or supported in EcoWat",
        "Arguments": {"FindName": ["string"]}
    },
    {
        "name": "isApplianceReplacable",
        "info": "used to check if specific appliances can be replaced or rescheduled to optimal hours in EcoWat",
        "Arguments": {"FindName": ["string"]}
    },
    {
        "name": "useLivePrice",
        "info": "used to find the current live electricity price and summary for today",
        "Arguments": {}
    },
    {
        "name": "PriceDataToday",
        "info": "used to find today's electricity price data and the cheapest time slot",
        "Arguments": {}
    },
    {
        "name": "usePriceHistory",
        "info": "used to get historical Germany electricity prices from aWATTar",
        "Arguments": {"date": {"fromDate": "YYYY-MM-DD", "toDate": "YYYY-MM-DD"}}
    },
    {
        "name": "useUserUsage",
        "info": "used to find user electricity CONSUMPTION (kWh used, cost, hours), NOT schedules. Use this for: 'my usage', 'how much did I use', 'electricity bill', 'consumption this week'.",
        "Arguments": {
            "date": {"fromDate": "YYYY-MM-DD", "toDate": "YYYY-MM-DD"},
            "applianceName": ["string"]
        }
    },
    {
        "name": "userSavedAppliances",
        "info": "used to fetch the list or details of appliances registered/saved by the user",
        "Arguments": {"applianceNames": ["string"]}
    },
    {
        "name": "isSavedAppliance",
        "info": "used ONLY to check if appliances are saved/registered in the user's inventory. Do NOT use for scheduled appliances.",
        "Arguments": {"applianceName": ["string"]}
    },
    {
        "name": "addSavedAppliance",
        "info": "used when the user asks to add or register an appliance to their saved list. Validates if the appliance is allowed in EcoWat and checks if it is not already saved before proceeding.",
        "Arguments": {
            "applianceName": "string",
            "power": "number (optional)",
            "usageHours": "number (optional)"
        }
    },
    {
        "name": "deleteSavedAppliance",
        "info": "used when the user asks to delete or remove appliances from their saved appliances list. Validates if the appliances exist in the user's saved list before proceeding.",
        "Arguments": {
            "applianceName": ["string"]
        }
    },
    {
        "name": "editSavedAppliance",
        "info": "used when the user asks to edit, update, or modify appliances in their saved appliances list. Validates if the appliances exist in the user's saved list before proceeding.",
        "Arguments": {
            "applianceName": ["string"],
            "power": "number (optional)",
            "usageHours": "number (optional)",
            "status": "boolean or string (optional - e.g. on/off/active/inactive)"
        }
    },
    {
        "name": "useRecommendations",
        "info": "used to fetch recommended appliance schedules and best time slots for cost savings",
        "Arguments": {"ApplianceName": ["string"]}
    },
    {
        "name": "userScheduledAppliances",
        "info": "used to check if appliances (or 'it') are in the user's scheduled appliances list today, or to fetch today's active schedule. Use whenever the user asks about scheduled appliances or schedule status.",
        "Arguments": {
            "timeRange": {"startHour": "HH:MM", "endHour": "HH:MM"},
            "applianceName": ["string"]
        }
    },
    {
        "name": "isScheduled",
        "info": "used to check if an appliance is scheduled within a specific time range today",
        "Arguments": {
            "timeRange": {"startHour": "HH:MM", "endHour": "HH:MM"},
            "applianceName": ["string"]
        }
    },
    {
        "name": "addScheduleAppliance",
        "info": "used when the user asks to schedule, run, or set a run-time for appliances. Validates if the appliances are already saved in the user's saved appliances list before allowing scheduling.",
        "Arguments": {
            "applianceNames": ["string"],
            "timeRange": {"startHour": "HH:MM", "endHour": "HH:MM"},
            "startTime": "HH:MM (optional)",
            "endTime": "HH:MM (optional)",
            "power": "number (optional)",
            "usageHours": "number (optional)"
        }
    },
    {
        "name": "usePredictedPrice",
        "info": "used to fetch predicted electricity prices for future days or a specific date range",
        "Arguments": {"date": {"fromDate": "YYYY-MM-DD", "toDate": "YYYY-MM-DD"}}
    },
    {
        "name": "userWeeklyconsumptionPredicted",
        "info": "used to fetch the user's predicted weekly electricity consumption",
        "Arguments": {"date": {"fromDate": "YYYY-MM-DD", "toDate": "YYYY-MM-DD"}}
    },
    {
        "name": "useRenewableData",
        "info": "used to fetch renewable energy generation data (solar, wind, renewable score) for upcoming days or date range",
        "Arguments": {"date": {"fromDate": "YYYY-MM-DD", "toDate": "YYYY-MM-DD"}}
    },
    {
        "name": "useEcowat",
        "info": "used to search general knowledge and information about EcoWat and energy saving tips",
        "Arguments": {"query": "string"}
    }
]
