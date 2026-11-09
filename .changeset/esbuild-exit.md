---
"@jackyzha0/quartz": patch
---

When a build stops on an error, Quartz stops esbuild before exiting. esbuild runs as a child process that writes to the same terminal; left running, it could print "fatal error: all goroutines are asleep - deadlock!" and a long goroutine dump after Quartz's error message.
