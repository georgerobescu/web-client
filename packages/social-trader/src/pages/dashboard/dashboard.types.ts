import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "shared/utils/types";

export interface TDashboardTotal {
  day: TDashboardTotalField;
  week: TDashboardTotalField;
  month: TDashboardTotalField;
}

export interface TDashboardTotalField {
  value: number;
  profit: number;
}

export interface TDashboardStatistic {
  total: TDashboardTotal;
  events: TDashboardEvent[];
}

export interface TDashboardProgramsStatistic extends TDashboardStatistic {
  equity: number;
  AUM: number;
}

export interface TDashboardInvestingStatistic extends TDashboardStatistic {
  balance: number;
  programs: number;
  funds: number;
}

export interface TDashboardEvent {
  data: Date;
  description: string;
  amount: number;
}

export interface TRecommendation {
  type: ASSET;
  currency: CurrencyEnum;
  id: string;
  url: string;
  title: string;
  levelProgress: number;
  logo: string;
  level: number;
  color: string;
  manager: { url: string; username: string };
  profit: number;
  profitPercent: number;
  value: number;
  chart: any;
}

export type TPortfolio = {
  name: "programs";
  percent: number;
}[];

export type TAssets = { name: string; percent: number }[];