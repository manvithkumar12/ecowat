import { useMutation } from "@tanstack/react-query";
import { postToEcky } from "../../Apiservices/ecky/postEcky";
import { EckyModelResponse } from "../../types/models/eckymodelRes";

export const useEckyModel = (baseUrl?: string) => {
  return useMutation<EckyModelResponse, Error, string>({
    mutationFn: (question) => postToEcky(question, baseUrl),
  });
};
