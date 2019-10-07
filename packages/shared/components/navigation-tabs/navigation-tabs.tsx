import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import replaceParams from "shared/utils/replace-params";

const _NavigationTabs: React.FC<Props> = ({
  exploreTabName,
  tabRoute,
  favoritesTabName,
  tab = exploreTabName
}) => {
  const [t] = useTranslation();
  return (
    <div className="facets-tabs">
      <GVTabs value={tab}>
        <GVTab
          value={exploreTabName}
          label={
            <Link
              to={replaceParams(tabRoute, {
                ":tab": exploreTabName
              })}
            >
              {t("funds-page.tabs.explore")}
            </Link>
          }
        />
        <GVTab
          value={favoritesTabName}
          label={
            <Link
              to={replaceParams(tabRoute, {
                ":tab": favoritesTabName
              })}
            >
              {t("funds-page.tabs.favorites")}
            </Link>
          }
        />
      </GVTabs>
    </div>
  );
};

interface Props {
  exploreTabName: string;
  tabRoute: string;
  favoritesTabName: string;
  tab: string;
}

const NavigationTabs = React.memo(_NavigationTabs);
export default NavigationTabs;
