export const HEADER_CURRENCY_VALUES = {
  USDT: "USD Tether",
  BTC: "Bitcoin",
  ETH: "Ethereum",
  ADA: "Cardano",
  USD: "US Dollar",
  EUR: "Euro",
  XRP: "Ripple",
  BCH: "Bitcoin Cash",
  LTC: "Litecoin",
  DOGE: "Dogecoin"
};

export type CURRENCIES_ENUM = keyof typeof CURRENCY_VALUES;

export const CURRENCY_VALUES: { [keys: string]: string } = {
  GVT: "Genesis Vision Token",
  ...HEADER_CURRENCY_VALUES
};

export enum CURRENCY_VALUES_ENUM {
  USDT = "USD Tether",
  BTC = "Bitcoin",
  ETH = "Ethereum",
  ADA = "Cardano",
  USD = "US Dollar",
  EUR = "Euro",
  XRP = "Ripple",
  BCH = "Bitcoin Cash",
  LTC = "Litecoin",
  DOGE = "Dogecoin",
  GVT = "Genesis Vision Token"
}

export type CURRENCIES =
  | string
  | "Undefined"
  | "GVT"
  | "ETH"
  | "BTC"
  | "ADA"
  | "USDT"
  | "XRP"
  | "BCH"
  | "LTC"
  | "DOGE"
  | "BNB"
  | "USD"
  | "EUR";
