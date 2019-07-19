import { push } from "connected-react-router";
import { ProgramTag, ProgramsList } from "gv-api-web";
import { Location } from "history";
import programs from "investor-web-portal/pages/programs";
import { useRouter } from "next/router";
import qs from "qs";
import * as React from "react";
import { useContext } from "react";
import { MergeProps, connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Dispatch, bindActionCreators, compose } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import { LevelFilterType } from "shared/components/table/components/filtering/level-filter/level-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TagFilter from "shared/components/table/components/filtering/tag-filter/tag-filter";
import { TAG_FILTER_NAME } from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { useTranslation } from "shared/i18n";
import { ToggleFavoriteDispatchableType } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";
import { programsDataSelector } from "shared/modules/programs-table/reducers/programs-table.reducers";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import {
  programCurrenciesSelector,
  programTagsSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

import { DispatchProps } from "../../../../components/asset-status/asset-status-requests";
import { platformContext } from "../../../../context/platform";
import isAuthenticated from "../../../../decorators/is-authenticated";
import * as programsService from "../../services/programs-table.service";
import { composeCurrencyFilter } from "./program-table.helpers";
import ProgramsTable from "./programs-table";
import { CURRENCY_FILTER_NAME, LEVEL_FILTER_NAME } from "./programs.constants";

interface OwnProps {
  showSwitchView: boolean;
  title: string;
  defaultFilters?: any;
  data: ProgramsList;
}

// interface MergeProps {
//   isLocationChanged: (location: Location) => boolean;
//   filters: { [keys: string]: any };
// }

// interface StateProps {
//   isAuthenticated: boolean;
//   currencies: string[];
//   programTags: ProgramTag[];
//   data?: ProgramsList;
// }

// interface DispatchProps {
//   service: {
//     toggleFavoriteProgram: ToggleFavoriteDispatchableType;
//     redirectToLogin(): void;
//     getPrograms(filters: Object): void;
//     fetchPrograms(filters: { [keys: string]: any }): Promise<ProgramsList>;
//     getProgramsFilters(): (dispatch: any, getState: any) => Object;
//     programsChangePage(
//       nextPage: number
//     ): (dispatch: any, getState: any) => void;
//     programsChangeSorting(
//       sorting: string
//     ): (dispatch: any, getState: any) => void;
//     programsChangeFilter(
//       filter: TFilter<any>
//     ): (dispatch: any, getState: any) => void;
//   };
// }

interface Props extends OwnProps {}

const ProgramsTableSSR: React.FC<Props> = ({ title, data, showSwitchView }) => {
  // componentDidMount() {
  //   const { service, defaultFilters } = this.props;
  //   service.getPrograms(defaultFilters);
  // }

  // componentDidUpdate(prevProps: Props) {
  //   const { service, isLocationChanged, defaultFilters } = this.props;
  //   if (isLocationChanged(prevProps.location)) {
  //     service.getPrograms(defaultFilters);
  //   }
  // }

  const { t } = useTranslation();
  const context = useContext(platformContext);
  if (!context) return null;

  const { asPath, pathname } = useRouter();

  console.info(asPath, pathname, asPath.slice(pathname.length + 1));
  console.info(qs.parse(asPath.slice(pathname.length + 1)));

  return (
    <ProgramsTable
      showSwitchView={showSwitchView}
      title={title}
      data={data.programs}
      // sorting={filters.sorting}
      // updateSorting={service.programsChangeSorting}
      // filtering={{
      //   ...filters.filtering
      // }}
      // updateFilter={service.programsChangeFilter}
      renderFilters={(updateFilter, filtering: FilteringType) => (
        <>
          <TagFilter
            name={TAG_FILTER_NAME}
            value={filtering[TAG_FILTER_NAME] as string[]}
            values={context.enums.program.programTags}
            onChange={updateFilter}
          />
          <LevelFilter
            name={LEVEL_FILTER_NAME}
            value={filtering[LEVEL_FILTER_NAME] as LevelFilterType} //TODO fix filtering types
            onChange={updateFilter}
          />
          <SelectFilter
            name={CURRENCY_FILTER_NAME}
            label="Currency"
            value={filtering[CURRENCY_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={composeCurrencyFilter(context.programCurrencies)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </>
      )}
      paging={{
        totalPages: 19,
        currentPage: 1,
        itemsOnPage: 12,
        totalItems: data.total
      }}
      updatePaging={() => {}}
      toggleFavorite={() => {}}
      // redirectToLogin={service.redirectToLogin}
      isAuthenticated={false}
      currencies={context.programCurrencies}
    />
  );
};

// const mapStateToProps = (state: RootState): StateProps => ({
//   isAuthenticated: isAuthenticatedSelector(state),
//   data: programsDataSelector(state),
//   currencies: programCurrenciesSelector(state),
//   programTags: programTagsSelector(state)
// });

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//   service: bindActionCreators(
//     {
//       ...programsService,
//       toggleFavoriteProgram: toggleFavoriteProgramDispatchable,
//       redirectToLogin: () => push(LOGIN_ROUTE)
//     },
//     dispatch
//   )
// });

// const mergeProps = (
//   stateProps: StateProps,
//   dispatchProps: DispatchProps,
//   ownProps: RouteComponentProps
// ): StateProps & DispatchProps & RouteComponentProps & MergeProps => {
//   const { location } = ownProps;
//   const isLocationChanged = (prevLocation: Location) => {
//     return location.key !== prevLocation.key;
//   };
//   const filters = dispatchProps.service.getProgramsFilters();
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     ...ownProps,
//     filters,
//     isLocationChanged
//   };
// };

// const ProgramsTableContainer = compose<React.FC<OwnProps>>(
//   withRouter,
//   connect(
//     mapStateToProps,
//     mapDispatchToProps,
//     mergeProps
//   )
// )(_ProgramsTableContainer);
export default ProgramsTableSSR;
