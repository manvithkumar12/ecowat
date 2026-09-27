from ecky.knowledge.EcowatApi.MyUsage import useUserUsage
from ecky.knowledge.EcowatApi.userWeeklyconsumptionPredicted import userWeeklyconsumptionPredicted
from ecky.knowledge.EcowatApi.weeklyRenewable import useRenewableData
from ecky.knowledge.EcowatApi.MySchedule import (
    userScheduledAppliances,
    isScheduled,
    addScheduleAppliance,
)
from ecky.knowledge.EcowatApi.MyAppliances import (
    userSavedAppliances,
    isSavedAppliance,
    addSavedAppliance,
    deleteSavedAppliance,
    editSavedAppliance,
)
from ecky.knowledge.EcowatApi.MyRecommendations import useRecommendations
from ecky.knowledge.EcowatApi.priceApi import PriceDataToday, useLivePrice
from ecky.knowledge.EcowatApi.useAllowedAppliances import useAllowedAppliances, isApplianceAllowed, isApplianceReplacable
from ecky.knowledge.EcowatApi.usePredictedPrice import usePredictedPrice
from ecky.knowledge.EcowatApi.useEcowat import useEcowat
from ecky.knowledge.externalApi.ExternalApi import UseSerp
from ecky.knowledge.externalApi.usePriceHistory import usePriceHistory

TOOLS_MAP = {
    "useUserUsage": useUserUsage,
    "UseSerp": UseSerp,
    "useEcowatt": useEcowat,
    "useEcowat": useEcowat,
    "userSavedAppliances": userSavedAppliances,
    "isSavedAppliance": isSavedAppliance,
    "addSavedAppliance": addSavedAppliance,
    "deleteSavedAppliance": deleteSavedAppliance,
    "editSavedAppliance": editSavedAppliance,
    "useRecommendations": useRecommendations,
    "userScheduledAppliances": userScheduledAppliances,
    "isScheduled": isScheduled,
    "addScheduleAppliance": addScheduleAppliance,
    "PriceDataToday": PriceDataToday,
    "useLivePrice": useLivePrice,
    "useAllowedAppliances": useAllowedAppliances,
    "isApplianceAllowed": isApplianceAllowed,
    "isApplianceReplacable": isApplianceReplacable,
    "usePredictedPrice": usePredictedPrice,
    "userWeeklyconsumptionPredicted": userWeeklyconsumptionPredicted,
    "useRenewableData": useRenewableData,
    "usePriceHistory": usePriceHistory,
}


def call_tool(tool_obj, tool_args):
    if hasattr(tool_obj, "func") and callable(tool_obj.func):
        return tool_obj.func(**tool_args)
    elif hasattr(tool_obj, "invoke"):
        return tool_obj.invoke(tool_args)
    elif callable(tool_obj):
        return tool_obj(**tool_args)
    raise TypeError(f"Tool {tool_obj} is not callable")


def use_allowed_tools(tool_name, tool_args):
    try:
        tool_obj = TOOLS_MAP.get(tool_name)
        if not tool_obj:
            # Case-insensitive fallback
            for key, val in TOOLS_MAP.items():
                if key.lower() == str(tool_name).lower():
                    tool_obj = val
                    break

        if not tool_obj:
            return {"error": f"Tool {tool_name} not implemented"}

        return call_tool(tool_obj, tool_args or {})
    except Exception as e:
        return {"error": f"Tool {tool_name} failed: {str(e)}"}