import HourlyPrice from "@/src/components/Dashboard/CardComponents/dashboard/Popups/HourlyPrice";
import StatError from "@/src/components/statsElements/StatError";
import StatLoading from "@/src/components/statsElements/StatLoading";
import { LivePriceContext } from "@/src/context/usePriceData";
import React, { useContext, useState } from "react";

const LivePrice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useContext(LivePriceContext);
  const isPriceLoading = context?.isPriceLoading;
  const PriceData = context?.PriceData;
  const priceError = context?.priceError;
  const PriceRefetch = context?.refetch;
  if (isPriceLoading || (!PriceData && !priceError)) {
    return <StatLoading />;
  }

  if (priceError) {
    return <StatError refetch={PriceRefetch} />;
  }

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-2 mt-4 py-1.5 bg-green-800 font-semibold rounded-md text-white"
      >
        View Price Data
      </button>
      {isModalOpen && (
        <HourlyPrice PriceData={PriceData} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default LivePrice;
