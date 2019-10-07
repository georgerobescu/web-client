import * as React from "react";
import { useTranslation } from "react-i18next";
import FacetCardsContainer, { ASSETS_FACETS } from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import ProgramsTableContainer from "shared/modules/programs-table/components/programs-table/programs-table-container";
import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "shared/routes/programs.routes";
import { composeProgramFacetUrl } from "shared/utils/compose-url";

const _ProgramsPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("programs-page.title");
  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={PROGRAMS_EXPLORE_TAB_NAME}
        tabRoute={PROGRAMS_TAB_ROUTE}
        favoritesTabName={PROGRAMS_FAVORITES_TAB_NAME}
      />

      <FacetCardsContainer
        title={title}
        assetsFacets={ASSETS_FACETS.PROGRAMS}
        composeFacetUrl={composeProgramFacetUrl}
      />
      <Surface className="programs-table-container">
        <ProgramsTableContainer
          showSwitchView
          title={t("programs-page.programs-table")}
        />
      </Surface>
    </Page>
  );
};

const ProgramsPage = React.memo(_ProgramsPage);
export default ProgramsPage;
