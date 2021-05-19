import React from "react";
import CustomTimeline from "./CustomTimeline/CustomTimeline";

const TransportComponent = (props) => {
  const {
    tripId,
    stopId,
    stopName,
    when,
    plannedWhen,
    lineName,
    product,
    symbol,
    color,
    direction,
  } = props;

  return (
    <div>
      <CustomTimeline
        tripId={tripId}
        stopId={stopId}
        title={stopName}
        lineName={lineName}
        when={when}
        plannedWhen={plannedWhen}
        product={product}
        symbol={symbol}
        color={color}
        direction={direction}
        end={false}
      />
      <CustomTimeline title={direction} end={true} />
    </div>
  );
};

export default TransportComponent;
