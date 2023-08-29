export enum ValidationValue {
  YES = "YES",
  NO = "NO",
  DONT_KNOW = "DONT_KNOW",
  PARTLY = "PARTLY"
}

export const ValidationValue2LabelMapping: Record<ValidationValue, string> = {
  [ValidationValue.YES]: "YES.translate",
  [ValidationValue.NO]: "NO.translate",
  [ValidationValue.DONT_KNOW]: "DONT_KNOW.translate",
  [ValidationValue.PARTLY]: "PARTLY.translate",
};
