import * as React from "react";
import { XAxis } from "recharts";
import GVColors from "shared/components/gv-styles/gv-colors";

import { composeTicks, dateTickFormatter } from "./chart-components.helpers";

const chartXAxis = (start: Date, end: Date): JSX.Element => (
  <XAxis
    dataKey="date"
    domain={["dataMin", "dataMax"]}
    type="number"
    tick={{
      fill: GVColors.$labelColor,
      fontSize: "12",
      transform: "translate(0, 8)"
    }}
    tickFormatter={dateTickFormatter(start, end)}
    allowDuplicatedCategory={false}
    axisLine={false}
    ticks={composeTicks(start, end)}
  />
);

export default chartXAxis;
