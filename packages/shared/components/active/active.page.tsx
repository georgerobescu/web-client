import "./active.scss";

import React from "react";
import Page from "shared/components/page/page";

import Active from "./active";
import { getActiveLoaderData } from "./service/active.service";

const _ActivePage: React.FC<Props> = ({ data }) => {
  return (
    <Page title={data.name}>
      <div className="active-page">
        <Active loaderData={getActiveLoaderData} data={data} />
      </div>
    </Page>
  );
};

interface Props {
  data: any;
}

const ActivePage = React.memo(_ActivePage);
export default ActivePage;