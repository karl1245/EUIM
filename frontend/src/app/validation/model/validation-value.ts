export enum ValidationValue {
  YES = "YES",
  NO = "NO",
  DONT_KNOW = "DONT_KNOW",
  PARTLY = "PARTLY"
}

export const ValidationValue2LabelMapping: Record<ValidationValue, string> = {
  [ValidationValue.YES]: "yes",
  [ValidationValue.NO]: "no",
  [ValidationValue.DONT_KNOW]: "dontKnow",
  [ValidationValue.PARTLY]: "partly",
};
