import { runRenewableGeneration } from "@/app/api/model/createRenewable/runrenewable/runrenewable";

export const CreateRenewableData = async () => {
  return await runRenewableGeneration();
};
