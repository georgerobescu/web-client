import "./facet-cards.scss";

import { FundFacet, ProgramFacet } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import withLoader from "shared/decorators/with-loader";

import FacetCard, { composeFacetUrlFunc } from "./facet-card";

const _FacetCards: React.FC<Props> = ({ facets, composeFacetUrl, title }) => {
  const scroll = useRef<HTMLDivElement>(null);
  const facetList = useRef<HTMLDivElement>(null);

  const updateClassList = () => {
    const node = scroll.current;
    const list = facetList.current;

    const scrollLeft = node ? node.scrollLeft : 0;
    const scrollWidth = node ? node.scrollWidth : 0;
    const { width = 0 } = node ? node.getBoundingClientRect() : {};

    if (scrollLeft > 0) {
      list && list.classList.add("facets__shadow--left");
    } else if (scrollLeft <= 0) {
      list && list.classList.remove("facets__shadow--left");
    }

    if (scrollWidth - scrollLeft > width) {
      list && list.classList.add("facets__shadow--right");
    } else if (scrollWidth - scrollLeft <= width) {
      list && list.classList.remove("facets__shadow--right");
    }
  };

  const handleScroll = useCallback(
    () => {
      updateClassList();
    },
    [scroll, facetList]
  );

  useEffect(
    () => {
      updateClassList();
    },
    [scroll, facetList]
  );

  return (
    <div className="facets__wrapper facets__shadow" ref={facetList}>
      <div className="facets" ref={scroll} onScroll={handleScroll}>
        <div className="facets__carousel">
          {facets.map(facet => (
            <FacetCard
              title={title}
              key={facet.id}
              facet={facet}
              composeFacetUrl={composeFacetUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Props {
  facets: Array<FundFacet & ProgramFacet>;
  composeFacetUrl: composeFacetUrlFunc;
  title: string;
}

const FacetCards = withLoader(React.memo(_FacetCards));
export default FacetCards;
