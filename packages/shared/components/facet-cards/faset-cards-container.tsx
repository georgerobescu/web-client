import { FundFacet, PlatformInfo, ProgramFacet } from "gv-api-web";
import * as React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { platformDataSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";

import { composeFacetUrlFunc } from "./facet-card";
import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

export const _FacetCardsContainer: React.FC<Props> = props => {
  const { title, composeFacetUrl } = props;
  const facets = useSelector((state: RootState) =>
    facetsSelector(state, props)
  );
  return (
    <FacetCards
      condition={!!facets.length}
      loader={<FacetCardsStub />}
      title={title}
      facets={facets}
      composeFacetUrl={composeFacetUrl}
    />
  );
};

const facetsSelector = createSelector<
  RootState,
  Props,
  PlatformInfo | undefined,
  ASSETS_FACETS,
  Array<ProgramFacet & FundFacet>
>(
  (state: RootState) => platformDataSelector(state),
  (state: RootState, props: Props) => props.assetsFacets,
  (data: PlatformInfo | undefined, assetsFacets: ASSETS_FACETS) =>
    (data ? data[assetsFacets] : []) as Array<ProgramFacet & FundFacet>
);

interface Props {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
}

export enum ASSETS_FACETS {
  FUNDS = "fundsFacets",
  PROGRAMS = "programsFacets"
}

const FacetCardsContainer = React.memo(_FacetCardsContainer);
export default FacetCardsContainer;
