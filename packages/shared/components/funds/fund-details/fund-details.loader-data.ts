import faker from "faker";
import {
  FundAssetPartWithIcon,
  FundAssetPercent,
  FundDetailsFull,
  FundDetailsListStatistic,
  FundProfitChart,
  FundStatistic,
  PersonalFundDetailsFull,
  ProgramDetailsListStatistic
} from "gv-api-web";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import {
  amountWithCurrencyLoaderData,
  managerLoaderData,
  mockDate
} from "shared/components/details/details.loader-data";
import { getRandomInteger } from "shared/utils/helpers";

import { IFundStatisticData } from "./fund-details-statistics-section/fund-details-statistics/fund-details-statistics-elements";

const assetLoaderDataCreator = (): FundAssetPartWithIcon => ({
  color: faker.internet.color(),
  asset: "GVT",
  name: faker.lorem.word(),
  percent: getRandomInteger(0, 100),
  icon: ""
});
export const assetsLoaderDataCreator = (): FundAssetPartWithIcon[] =>
  new Array(getRandomInteger(1, 5))
    .fill("")
    .map(() => assetLoaderDataCreator());

export const fundChartLoaderData: FundProfitChart = {
  creationDate: new Date("2019-08-08T14:59:16.3828400+00:00"),
  profitPercent: 17.94,
  equityChart: [],
  balance: 115.621828125,
  investors: 0,
  profitChangePercent: 18.84,
  sharpeRatio: 3.1150228132957595669491859326,
  sortinoRatio: 3.6275830131317053579413109728,
  calmarRatio: 1.3037790697674418604651162791,
  maxDrawdown: -10.44798785117691723614274867,
  rate: 1.0
};

export const fundChartDataLoaderData: ProfitChartDataType = [
  fundChartLoaderData
];

export const fundStatisticLoaderData: FundProfitChart = {
  creationDate: mockDate,
  profitPercent: getRandomInteger(0, 100),
  equityChart: [],
  balance: getRandomInteger(0, 100),
  investors: getRandomInteger(0, 100),
  profitChangePercent: getRandomInteger(0, 100),
  sharpeRatio: getRandomInteger(0, 100),
  sortinoRatio: getRandomInteger(0, 100),
  calmarRatio: getRandomInteger(0, 100),
  maxDrawdown: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
};

export const fundStatisticDataLoaderData: IFundStatisticData = {
  statistic: fundStatisticLoaderData,
  statisticCurrency: "GVT"
};

export const personalFundDetailsFull: PersonalFundDetailsFull = {
  withdrawPercent: getRandomInteger(0, 100),
  canReallocate: false,
  availableReallocationPercents: getRandomInteger(0, 100),
  nextReallocationPercents: mockDate,
  exitFeePersonal: getRandomInteger(0, 100),
  isFavorite: false,
  isInvested: false,
  isOwnProgram: false,
  canCloseAsset: false,
  isFinishing: false,
  canInvest: false,
  canWithdraw: false,
  canClosePeriod: false,
  hasNotifications: false,
  value: getRandomInteger(0, 100),
  profit: getRandomInteger(0, 100),
  invested: getRandomInteger(0, 100),
  pendingInput: getRandomInteger(0, 100),
  pendingOutput: getRandomInteger(0, 100),
  pendingOutputIsWithdrawAll: false,
  status: "Pending"
};

const statisticLoaderData: FundStatistic = {
  balance: amountWithCurrencyLoaderData,
  profitPercent: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 100),
  startDate: mockDate,
  startBalance: getRandomInteger(0, 100),
  investedAmount: getRandomInteger(0, 100),
  rebalancingCount: getRandomInteger(0, 100)
};

export const statisticListLoaderData: FundDetailsListStatistic = {
  balance: amountWithCurrencyLoaderData,
  profitPercent: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 100)
};

export const fundDetailsLoaderData: FundDetailsFull = {
  entryFee: getRandomInteger(0, 100),
  exitFee: getRandomInteger(0, 100),
  managementFee: getRandomInteger(0, 100),
  currentAssets: assetsLoaderDataCreator(),
  statistic: statisticLoaderData,
  personalFundDetails: personalFundDetailsFull,
  id: "",
  logo: "",
  url: "",
  color: "#fff",
  description: faker.lorem.sentences(3),
  title: faker.lorem.word(),
  ipfsHash: "",
  creationDate: mockDate,
  status: "None",
  manager: managerLoaderData
};
