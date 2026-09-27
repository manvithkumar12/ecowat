import { Availableappliances } from "@ecowat/shared";

export const getApplianceName = (dbName: string) => {
  const AvailableName = Availableappliances.find(
    (a) => a.dbName === dbName,
  )?.name;
  return AvailableName ?? "Appliance";
};

export const getArrayApplianceName = (dbName?: string | string[]) => {
  if (!dbName) return "";
  if (Array.isArray(dbName)) {
    return dbName.map((name) => getApplianceName(name) || name).join(", ");
  }
  return getApplianceName(dbName) || dbName;
};

export const getApplianceTypeDbName = (dbName?: string) => {
  const AvailableCategory = Availableappliances.find(
    (a) => a.dbName === dbName,
  )?.applianceType;

  return AvailableCategory;
};
export const getApplianceTypeAppName = (applianceName?: string) => {
  const AvailableCategory = Availableappliances.find(
    (a) => a.name === applianceName,
  )?.applianceType;

  return AvailableCategory;
};
