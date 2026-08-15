const LANGUAGE_HINTS: Array<{ language: string; tests: RegExp[] }> = [
  {
    language: 'TypeScript',
    tests: [
      /\binterface\s+\w+/,
      /\btype\s+\w+\s*=/,
      /:\s*(string|number|boolean|void)\b/,
    ],
  },
  {
    language: 'JavaScript',
    tests: [/\b(const|let|var)\s+\w+/, /\bfunction\s+\w+\s*\(/, /\bconsole\.log\b/],
  },
  {
    language: 'Java',
    tests: [/\bpublic\s+(class|static)\b/, /\bSystem\.out\.println\b/, /\bimport\s+java\./],
  },
  {
    language: 'C++',
    tests: [/\bstd::/, /\bcout\s*<</, /#include\s*<iostream>/],
  },
  {
    language: 'C',
    tests: [/#include\s*<stdio\.h>/, /\bprintf\s*\(/, /\bint\s+main\s*\(/],
  },
  {
    language: 'Python',
    tests: [/\bdef\s+\w+\s*\(/, /\bfor\s+\w+\s+in\s+range\s*\(/, /\belif\b/],
  },
]

const EXT_MAP: Record<string, string> = {
  py: 'Python',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
  cc: 'C++',
  h: 'C',
  hpp: 'C++',
  js: 'JavaScript',
  mjs: 'JavaScript',
  ts: 'TypeScript',
}

export function detectLanguage(code: string, filename?: string): string {
  if (filename) {
    const ext = filename.split('.').pop()?.toLowerCase()
    if (ext && EXT_MAP[ext]) return EXT_MAP[ext]
  }

  for (const item of LANGUAGE_HINTS) {
    if (item.tests.some((re) => re.test(code))) return item.language
  }

  return 'Python'
}
