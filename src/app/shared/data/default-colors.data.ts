export interface ColorType {
  name: string;
}

export const colors = new Map<string, ColorType>([
  ["gray", {name: "Gray"}],
  ["pink", {name: "Pink"}],
  ["t-red", {name: "Fire engine red"}],
  ["t-orange", {name: "Orange"}],
  ["t-yellow", {name: "Xanthous"}],
  ["t-green", {name: "Cambridge Green"}],
  ["cyan", {name: "Cyan"}],
  ["blue", {name: "Blue"}],
  ["indigo", {name: "Indigo"}],
  ["purple", {name: "Purple"}],
  ["t-blue", {name: "Prussian blue"}],
  ["green", {name: "Green"}],
]);

export const timeSlotColors = new Map<string, ColorType>([
  ["morning-dawn", {name: "Morning dawn"}],
  ["morning", {name: "Morning"}],
  ["noon", {name: "Noon"}],
  ["afternoon", {name: "Afternoon"}],
  ["evening", {name: "Evening"}],
  ["night", {name: "Night"}]
])


export function badgeCSSClass(color: string): string {
  return `badge badge-colored-${color}`;
}


export function dotCSSClass(color: string): string {
  return `dot dot-colored-${color}`;
}


export function tooltipCSSClass(color: string): string {
  return `tooltip-colored-${color}`;
}


export function bgCSSClass(color: string): string {
  return `bg-${color}`;
}

export function fgCSSClass(color: string): string {
  return `text-${color}`;
}
