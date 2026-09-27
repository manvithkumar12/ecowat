import { exportDataType } from "@/src/context/useDashboardExport.context";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportReport = (data: exportDataType) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const colors: Record<string, [number, number, number]> = {
    slate900: [15, 23, 42],
    slate700: [51, 65, 85],
    slate600: [71, 85, 105],
    slate400: [148, 163, 184],
    emerald600: [5, 150, 105],
    emerald50: [240, 253, 250],
    borderLight: [226, 232, 240],
  };

  // Helper Formatters
  const formatPrice = (val?: number) =>
    val !== undefined ? `€${val.toFixed(4)}` : "N/A";
  const formatScore = (val?: number) => (val !== undefined ? `${val}%` : "N/A");
  const formatKwh = (val?: number) =>
    val !== undefined ? `${val.toFixed(2)} kWh` : "0.00 kWh";
  const formatCost = (val?: number) =>
    val !== undefined ? `€${val.toFixed(2)}` : "€0.00";

  const formatTimestampToHour = (timestamp: number) => {
    try {
      return new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(timestamp));
    } catch (e) {
      const d = new Date(timestamp);
      return `${String(d.getHours()).padStart(2, "0")}:00`;
    }
  };

  const formatHourOrTimestamp = (val: number) => {
    if (val < 24) {
      return `${String(val).padStart(2, "0")}:00`;
    }
    return formatTimestampToHour(val);
  };

  const formatRenewableHour = (hourVal: string | number) => {
    const numericHour = Number(hourVal);
    if (!isNaN(numericHour)) {
      const startHourStr = String(numericHour).padStart(2, "0");
      const endHourStr = String((numericHour + 1) % 24).padStart(2, "0");
      return `${startHourStr}:00 - ${endHourStr}:00`;
    }
    return String(hourVal);
  };

  // Footer printing function for page-break callbacks
  const drawPageFooter = (pageNumber: number) => {
    const pageHeight = doc.internal.pageSize.height || 297;
    doc.setFontSize(8);
    doc.setTextColor(
      colors.slate400[0],
      colors.slate400[1],
      colors.slate400[2],
    );
    doc.setFont("helvetica", "normal");
  };

  // ==========================================
  // PAGE 1: HEADER, OVERVIEW, & PRICE TABLE
  // ==========================================

  // 1. Top Banner Accent
  doc.setFillColor(colors.slate900[0], colors.slate900[1], colors.slate900[2]);
  doc.rect(0, 0, 210, 36, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("ECOWATT", 14, 16);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(194, 205, 217);
  doc.text("Household Energy Intelligence & Sustainability Report", 14, 22);

  // Date
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 29);

  // 2. Report Summary Overview Card
  doc.setTextColor(colors.slate900[0], colors.slate900[1], colors.slate900[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Energy Metrics Summary", 14, 46);

  // Underline divider
  doc.setDrawColor(
    colors.borderLight[0],
    colors.borderLight[1],
    colors.borderLight[2],
  );
  doc.setLineWidth(0.4);
  doc.line(14, 48, 196, 48);

  // Overview Summary Table
  autoTable(doc, {
    startY: 51,
    head: [["Metric Parameter", "Current Status / Calculated Value"]],
    body: [
      [
        "Current Electricity Price",
        `${formatPrice(data.exportData.price.Current_Price)} / ${data.exportData.price.Unit || "kWh"}`,
      ],
      [
        "Renewable Grid Score",
        `${formatScore(data.exportData.renewable.Current_Score)} (Clean Power Availability)`,
      ],
      [
        "Today's Cumulative Usage",
        formatKwh(data.exportData.consumptionData.Todays_Usage),
      ],
      [
        "Yesterday's Cumulative Usage",
        formatKwh(data.exportData.consumptionData.Yesterday_Usage),
      ],
      [
        "Estimated Cumulative Daily Cost",
        formatCost(data.exportData.consumptionData.Total_Amount),
      ],
    ],
    theme: "striped",
    headStyles: {
      fillColor: colors.slate900,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9.5,
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      lineColor: colors.borderLight,
      lineWidth: 0.1,
    },
  });

  const summaryTableY = (doc as any).lastAutoTable?.finalY || 95;

  // TABLE 1: Hourly Market Price List
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colors.slate900[0], colors.slate900[1], colors.slate900[2]);
  doc.text("1. Hourly Electricity Rates", 14, summaryTableY + 12);
  doc.line(14, summaryTableY + 14, 196, summaryTableY + 14);

  // Map Price Items
  const rawPriceList = data.exportData.price.Hourly_Prices || [];
  const priceTableBody = rawPriceList.map((item: any) => {
    const startTime = formatHourOrTimestamp(item.start);
    const endTime = formatHourOrTimestamp(item.end);
    return [`${startTime} - ${endTime}`, `${formatPrice(item.price)} / kWh`];
  });

  autoTable(doc, {
    startY: summaryTableY + 17,
    head: [["Time Window", "Market Rate"]],
    body: priceTableBody.length
      ? priceTableBody
      : [["No price prediction data available", "N/A"]],
    theme: "striped",
    headStyles: {
      fillColor: colors.emerald600,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9.5,
    },
    styles: {
      fontSize: 9,
      cellPadding: 3.5,
      lineColor: colors.borderLight,
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
  });

  drawPageFooter(1);

  // ==========================================
  // PAGE 2: RENEWABLE ENERGY AVAILABILITY
  // ==========================================
  doc.addPage();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colors.slate900[0], colors.slate900[1], colors.slate900[2]);
  doc.text("2. Hourly Grid Renewable Health", 14, 20);
  doc.line(14, 22, 196, 22);

  // Map Renewable Items
  const rawRenewableList = data.exportData.renewable.Hourly_Data || [];
  const renewableTableBody = rawRenewableList.map((item: any) => {
    const formattedHour = formatRenewableHour(item.hour);
    return [
      formattedHour,
      formatScore(item.renewableScore),
      formatScore(item.solarScore),
      formatScore(item.windScore),
      item.status || "N/A",
    ];
  });

  autoTable(doc, {
    startY: 25,
    head: [
      [
        "Time Window",
        "Clean Score",
        "Solar Share",
        "Wind Share",
        "Supply Level",
      ],
    ],
    body: renewableTableBody.length
      ? renewableTableBody
      : [["No grid renewable data available", "N/A", "N/A", "N/A", "N/A"]],
    theme: "striped",
    headStyles: {
      fillColor: colors.emerald600,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9.5,
    },
    styles: {
      fontSize: 9,
      cellPadding: 3.5,
      lineColor: colors.borderLight,
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
  });

  drawPageFooter(2);

  // ==========================================
  // PAGE 3: HOUSEHOLD CONSUMPTION LOG
  // ==========================================
  doc.addPage();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colors.slate900[0], colors.slate900[1], colors.slate900[2]);
  doc.text("3. Household Appliance Consumption Log", 14, 20);
  doc.line(14, 22, 196, 22);

  // Map Consumption Appliance list (Today)
  const rawApplianceList =
    data.exportData.consumptionData.Todays_Appliance || [];
  const applianceTableBody = rawApplianceList.map((item: any) => {
    const name = item.appliance?.name || "Unknown Appliance";
    const usage = `${item.usageHours || 0} hrs`;
    const kwh = formatKwh(item.kwh);
    const cost = formatCost(item.totalPrice);
    const rating = item.rating ? `★ ${item.rating}` : "N/A";
    return [name, usage, kwh, cost, rating];
  });

  autoTable(doc, {
    startY: 25,
    head: [
      [
        "Appliance Name",
        "Usage Hours",
        "Energy Used",
        "Total Cost",
        "Eco Rating",
      ],
    ],
    body: applianceTableBody.length
      ? applianceTableBody
      : [["No appliances logged today", "N/A", "N/A", "N/A", "N/A"]],
    theme: "striped",
    headStyles: {
      fillColor: colors.emerald600,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9.5,
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      lineColor: colors.borderLight,
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
  });

  drawPageFooter(3);

  // Save document
  doc.save(
    `EcoWatt-Intelligence-Report-${new Date().toISOString().split("T")[0]}.pdf`,
  );
};
