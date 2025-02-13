import { FundBalanceChart, FundProfitChart } from "gv-api-web";

export type FundDetailsStatistic = {
  investors: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  creationDate: Date;
  calmarRatio: number;
  profitChangePercent: number;
  rebalances: number;
  balance: number;
};

export type FundStatisticResult = {
  statistic: FundDetailsStatistic;
  profitChart: FundProfitChart;
  balanceChart: FundBalanceChart;
};
