// https://github.com/type-challenges/type-challenges/blob/main/scripts/readme.ts

export const DifficultyRank = ["warm", "easy", "medium", "hard", "extreme"] as const;
export const DifficultyColors: Record<string, string> = {
  warm: 'teal',
  easy: '7aad0c',
  medium: 'd9901a',
  hard: 'de3d37',
  extreme: 'b11b8d',
}

export function toBadgeURL(label: string, text: string, color: string, args = '') {
  return `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, '--'))}-${encodeURIComponent(text.replace(/-/g, '--'))}-${color}${args}`
}

export function toBadge(label: string, text: string, color: string, args = '') {
  return `<img src="${toBadgeURL(label, text, color, args)}" alt="${text}"/>`
}

export function toBadgeLink(url: string, label: string, text: string, color: string, args = '') {
  return `<a href="${url}" target="_blank">${toBadge(label, text, color, args)}</a> `
}