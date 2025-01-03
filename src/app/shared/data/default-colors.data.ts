export interface ColorType {
  name: string;
  bg: string;
  fg: string;
}

export const colors = new Map<string, ColorType>([
  ["gray", { name: "Gray", bg: "bg-gray", fg: "text-gray"}],
  ["pink", { name: "Pink", bg: "bg-pink", fg: "text-pink"}],
  ["t-red", {name: "Fire engine red", bg: "bg-t-red", fg: "text-t-red"}],
  ["t-orange", {name: "Orange", bg: "bg-t-orange", fg: "text-t-orange"}],
  ["t-yellow", {name: "Xanthous", bg: "bg-t-yellow", fg: "text-t-yellow"}],
  ["t-green", {name: "Cambridge Green", bg: "bg-t-green", fg: "text-t-green"}],
  ["cyan", { name: "Cyan", bg: "bg-cyan", fg: "text-cyan"}],
  ["blue", { name: "Blue", bg: "bg-blue", fg: "text-blue"}],
  ["indigo", { name: "Indigo", bg: "bg-indigo", fg: "text-indigo"}],
  ["purple", { name: "Purple", bg: "bg-purple", fg: "text-purple"}],
  ["t-blue", { name: "Prussian blue", bg: "bg-t-blue", fg: "text-t-blue"}],
  ["green", { name: "Green", bg: "bg-green", fg: "text-green"}],
]);


export function badgeCSSClass(color: string): string {
  return `badge badge-colored-${color}`;
}


export function dotCSSClass(color: string): string {
  return `dot dot-colored-${color}`;
}


export function bgCSSClass(color: string): string {
  return `bg-${color}`;
}

export function fgCSSClass(color: string): string {
  return `text-${color}`;
}
