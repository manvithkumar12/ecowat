export const generateSimulatedResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (
    q.includes("ac") ||
    q.includes("air conditioner") ||
    q.includes("cooling")
  ) {
    return `### 🌡️ AC Energy Optimization recommendations:

To optimize your air conditioning usage and lower your EcoWatt peak charges, follow these actionable tips:

1. **Leverage Pre-Cooling**: Cool your home slightly below your target temperature during **cheap tariff periods** (typically early morning or mid-afternoon if you have solar).
2. **Increase the Thermostat by 1-2°C**: Setting your AC to **24°C** instead of 21°C can reduce cooling energy usage by up to **15-20%**.
3. **Clean or Replace Filters**: Dirty filters block airflow, forcing your compressor to work harder. Clean them monthly to save **5-15%** on cooling costs.
4. **Utilize Ceiling Fans**: Running ceiling fans alongside AC allows you to raise the thermostat setting by 2°C with the same perceived comfort level.
5. **Close Shades & Drapes**: Prevent direct solar heat gain through windows, especially on south and west-facing walls.

*Tip: Set a smart automation in your EcoWatt app to auto-throttle the AC during grid peak hours.*`;
  }

  if (
    q.includes("grid") ||
    q.includes("tariff") ||
    q.includes("cheap") ||
    q.includes("price")
  ) {
    return `### ⚡ Current Grid Tariff Status:

Based on the current real-time energy price data:

- **Grid Status**: **Grid is Cheap / Normal** (Green zone).
- **Current Tariff**: **$0.12 / kWh** (Under the average peak threshold of $0.24 / kWh).
- **Forecast Recommendation**: The current price window is expected to remain stable for the next **2.5 hours**.
- **Action Plan**: 
  - Feel free to run high-load appliances like **dryers**, **washing machines**, and charging electric vehicles now.
  - Plan to wind down heavy loads by **7:00 PM** when the evening grid peak begins.

*You can view the real-time tracker page to monitor live price spikes and historical metrics.*`;
  }

  if (
    q.includes("cost") ||
    q.includes("bill") ||
    q.includes("weekly") ||
    q.includes("analyze")
  ) {
    return `### 📉 Weekly Energy Cost & Savings Summary:

Here is the analysis of your energy profile for the past 7 days:

- **Total Consumption**: **84.5 kWh**
- **Total Cost**: **$16.90**
- **Avoided Costs**: Saved **$4.20** by shifting load to off-peak slots.
- **Top Consuming Appliances**:
  1. **Air Conditioner**: 42% ($7.10)
  2. **Electric Vehicle Charger**: 28% ($4.73)
  3. **Washing Machine & Dryer**: 15% ($2.54)
  4. **Base Loads (Fridges, Standby)**: 15% ($2.53)

**Recommendations**:
- Shifting your EV charger to automatically start after **11:00 PM** would save an additional **$1.80** weekly.
- Check the **Scheduler Tab** to link your smart appliances for automatic off-peak operation.`;
  }

  if (
    q.includes("schedule") ||
    q.includes("washing machine") ||
    q.includes("run") ||
    q.includes("best time")
  ) {
    return `### ⏰ Smart Appliance Schedule Recommendations:

The best windows to run high-energy appliances today, sorted by grid cost and solar production availability:

1. **Optimal Window 1 (Highly Recommended)**:
   - **Time**: **1:00 PM - 3:30 PM**
   - **Reason**: Solar energy output is peak, grid tariff is at its lowest rate (**$0.09 / kWh**).
   
2. **Optimal Window 2 (Overnight)**:
   - **Time**: **12:00 AM - 5:00 AM**
   - **Reason**: Grid demand is low, base off-peak pricing applies (**$0.11 / kWh**).

**Wash Settings Tip**:
- Set your washing machine cycle to **30°C / Eco mode**. This saves up to **90%** of the electricity consumed compared to hot cycles, as heating the water represents the bulk of the power consumption.
- Activate the delay-start function to auto-run during the afternoon grid dip.`;
  }

  return `### 👋 Hello! I'm Ecky, your EcoWatt AI assistant.

I am configured to help you monitor, analyze, and optimize your household's energy footprint.

Here are some things you can ask me:
- "How can I reduce my AC consumption?"
- "Is the grid cheap right now?"
- "Analyze my energy cost this week"
- "When is the best time to run my washing machine?"

I support text queries to help you save energy, reduce carbon emissions, and lower your monthly bills. Let me know what you would like to analyze!`;
};
