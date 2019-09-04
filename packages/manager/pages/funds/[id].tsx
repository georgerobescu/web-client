import React from "react";
import { compose } from "redux";
import {
  dispatchFundDescription,
  dispatchFundId
} from "shared/components/funds/fund-details/services/fund-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

import FundDetailsPage from "../../src/pages/funds/fund-details/fund-details.page";

const FundDetails: NextPageWithRedux<void> = () => {
  return <FundDetailsPage />;
};

FundDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx))
  ]);
};

export default compose(withDefaultLayout)(FundDetails);