import {
  ApplianceSchedule,
  CancelScheduling,
} from "./AgentReplys/ApplianceScheduling";
import { AgentAnswer, UserUsageReply } from "./AgentReplys/AgentReplys";
import {
  ApplianceAddQuery,
  DeleteAppliance,
  UpdateAppliance,
} from "./AgentReplys/ApplianceQuery";
import { UserAppliancesProvider } from "@/src/context/userAppliances";
import { LivePriceProvider } from "@/src/context/usePriceData";

interface ReplyTypesProps {
  messageId: string;
  role: "assistant" | "user" | "system";
  message: string;
  action: string;
  parameters?: any;
  isThinking: boolean;
}

const ReplyTypes = ({
  message,
  action,
  parameters,
  isThinking,
}: ReplyTypesProps) => {
  return (
    <>
      {action === "schedule_appliances_add" ? (
        <LivePriceProvider>
          <UserAppliancesProvider>
            <ApplianceSchedule
              parameters={parameters}
              isThinking={isThinking}
              text={message}
            />
          </UserAppliancesProvider>
        </LivePriceProvider>
      ) : action === "answer" || action === "unknown" ? (
        <AgentAnswer isThinking={isThinking} text={message} />
      ) : action === "schedule_appliances_delete" ? (
        <CancelScheduling
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
        />
      ) : action === "edit_saved_appliances" ? (
        <UserAppliancesProvider>
          <UpdateAppliance
            parameters={parameters as any}
            isThinking={isThinking}
            text={message}
          />
        </UserAppliancesProvider>
      ) : action === "delete_saved_appliances" ? (
        <UserAppliancesProvider>
          <DeleteAppliance
            text={message}
            isThinking={isThinking}
            parameters={parameters as any}
          />
        </UserAppliancesProvider>
      ) : action === "add_saved_appliances" ? (
        <UserAppliancesProvider>
          <ApplianceAddQuery
            message={message}
            isThinking={isThinking}
            data={{ parameters } as any}
          />
        </UserAppliancesProvider>
      ) : action === "renewable_data" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="renewable_data"
        />
      ) : action === "predicted_price" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="predicted_price"
        />
      ) : action === "allowed_appliances_info" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="allowed_appliances_info"
        />
      ) : action === "price_today" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="price_today"
        />
      ) : action === "user_schedules_info" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="user_schedules"
        />
      ) : action === "user_recommendations" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="user_recommendations"
        />
      ) : action === "used_ecowat" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="ecowat"
        />
      ) : action === "user_saved_appliances_info" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="saved_appliances_info"
        />
      ) : action === "user_usage_information" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="usage_info"
        />
      ) : action === "used_serp" ? (
        <UserUsageReply
          parameters={parameters as any}
          isThinking={isThinking}
          text={message}
          replyType="serp"
        />
      ) : (
        <AgentAnswer isThinking={isThinking} text={message} />
      )}
    </>
  );
};

export default ReplyTypes;
