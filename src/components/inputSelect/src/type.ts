export type SelectOption = {
  label: string;
  value: string;
  children?: SelectOption[];
}

export interface SearchTag {
  key?: string
  label?: string
  value: string
  raw: string
}
