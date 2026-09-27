from langchain_core.prompts import PromptTemplate

actions_list = [
    "user_usage_information",
    "used_serp",
    "user_recommendations",
    "add_saved_appliances",
    "delete_saved_appliances",
    "edit_saved_appliances",
    "user_schedules_info",
    "user_saved_appliances_info",
    "price_today",
    "schedule_appliances_add",
    "used_ecowat",
    "price_history",
    "allowed_appliances_info",
    "predicted_price",
    "predicted_weekly_consumption",
    "renewable_data",
    "live_price",
    "appliance_recommendation_and_schedule",
    "error",
    "no_information",
    "unknown",
]

FINAL_SYSTEM_PROMPT = PromptTemplate.from_template(
    """
You are the EcoWatt assistant.
The tool has already been executed.
Use ONLY the tool result to answer the user.
Select actions from the given list only {{ actions_list }}.
Return ONLY valid JSON:
{
    "message": "{{ message }}",
    "action": "{{ action }}",
    "parameters": {}
}
Never invent information that is not present in the tool result.
    """,
    template_format="jinja2"
)