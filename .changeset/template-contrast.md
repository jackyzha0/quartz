---
"@jackyzha0/quartz": patch
---

The templates' colours meet WCAG AA contrast (4.5:1) on their backgrounds. Light `gray` goes from #b8b8b8 to #727272 (was 1.9:1), dark `gray` from #646464 to #7f7f7f (was 3.1:1), and light `tertiary`, the link hover colour, from #84a59d to #587971 (was 2.5:1). Text selection mixes 40% of `tertiary` instead of 60%, so text stays readable on it in both modes. Existing sites keep the colours in their own `quartz.config.yaml`.
