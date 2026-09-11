---
title: "AI-Generated Code Should Be Judged by Its Blast Radius"
date: 2026-09-11T03:00:00+00:00
slug: ai-generated-code-should-be-judged-by-its-blast-radius
tags: ["ai-assisted-coding", "software-engineering", "agents", "code-review", "production-systems"]
description: "The right standard for generated code depends on how long it will live, how widely it can fail, and how difficult that failure will be to reverse."
---

I can write a script, run it once, inspect the output, and delete it before lunch. I can also write a service that handles customer data, sits behind an Application Programming Interface (API), and remains in production for five years.

Calling both of these "code" hides the engineering question that matters most. How much damage can this code cause if it is wrong?

That question has become more important as coding agents have improved. Generating an implementation is becoming cheap. Evaluating whether that implementation belongs in a real system often remains expensive.

Boris Cherny recently described a useful distinction in a discussion about LLM-assisted coding. There is room for black-box generation when the work is temporary and the consequences are small. A prototype may only need to show that an idea works. A throw-away script may need one correct output. Spending hours polishing code that will disappear tomorrow usually adds little value.

Production software changes the calculation.

Once generated code enters a system that people depend on, passing a few tests is no longer enough. The code has to survive new requirements, unexpected inputs, dependency updates, incidents, and engineers who did not write it. Readability starts to matter. So do security, observability, failure recovery, and the quality of the surrounding tests.

## The standard should follow the blast radius

I find **blast radius** more useful than a blanket rule about generated code. It asks how far a failure can travel and what sits in its path.

A bug in a local data-cleaning script may waste an afternoon. A bug in a migration may corrupt a production database. A bug in a clinical system may influence a decision about a patient. The source of the code does not change those consequences, but the speed and volume of generated code can make weak review practices more costly.

The expected lifetime matters too. Temporary code has fewer opportunities to meet a condition its author did not anticipate. Long-lived code accumulates integrations, assumptions, users, and operational history. Each connection creates another path through which a local mistake can become a system problem.

| Code type | Appropriate standard |
| --- | --- |
| Experiment or throw-away script | Validate the result and keep review proportional to the risk |
| Internal prototype | Check important assumptions, interfaces, data handling, and likely failure modes |
| Production application | Require readable code, meaningful tests, security checks, review, and a clear maintenance path |
| Safety-critical or business-critical system | Add stronger verification, traceability, controlled change, and explicit human accountability |

These categories are not determined by repository names or deployment labels. An "internal" script that changes payroll records can have a larger blast radius than a public page with no sensitive data. A prototype connected to a live database is no longer low risk simply because the team calls it a prototype.

So I would judge the required verification along four dimensions:

| Dimension | Question |
| --- | --- |
| Impact | What happens to users, data, money, or safety if the code is wrong? |
| Exposure | How many people, systems, and workflows can reach the failure? |
| Reversibility | Can the effect be detected and undone quickly? |
| Lifetime | How long will the code remain in use, and how often will it change? |

High impact, broad exposure, poor reversibility, and a long lifetime should produce a much higher quality bar. That remains true whether the implementation came from a senior engineer, a new graduate, or a coding agent.

## Code generation is cheap, but judgment isn't

An agent can produce 1,000 lines that satisfy a written specification. An engineer who understands the surrounding system may recognize that a 100-line design solves the same problem with fewer dependencies and fewer failure paths.

The larger implementation may pass every test the agent was given. It can still be the wrong solution.

Specifications rarely contain all the knowledge needed to make a sound engineering decision. They often omit historical constraints, operational habits, compatibility promises, and the reasons an earlier design was rejected. Some of that knowledge lives in documentation. Much of it lives in people and in the shape of the existing codebase.

As generation gets faster, I expect the bottleneck to shift toward evaluation. Engineers will spend less time translating a known design into syntax and more time deciding whether the design is appropriate. That requires defining the problem carefully, constraining the agent, inspecting interfaces, establishing tests, and challenging assumptions before generated code becomes part of the system.

And code volume deserves suspicion. More code means more states to reason about, more paths to test, and more places for behavior to diverge from intent. An agent's ability to generate a large patch quickly does not make a large patch cheap to own.

## Passing tests is evidence, not permission

Tests tell us that the implementation behaved as expected under the cases we selected. They do not tell us that we selected the right cases.

For disposable code, output validation may be sufficient. If I can inspect the result, rerun the script, and discard everything afterward, line-by-line understanding may add little. The low blast radius supports a lighter process.

For production code, tests are one layer in a larger argument. Static analysis can catch certain defects. Linters can enforce consistency. Security scans can identify known patterns. Fuzzing can search input spaces that humans are unlikely to enumerate. Automated review can compare a change against local conventions. None of these checks proves that the architecture is sensible, but together they can make weak assumptions easier to expose.

LLM-assisted development should increase the use of these checks rather than weaken it. If we can generate code in minutes, we can also ask for more tests, run broader analysis, compare alternative designs, and refactor before the implementation becomes difficult to remove.

Automation changes the economics of quality. Checks that once felt too expensive for a small change may now be cheap enough to run routinely. But accountability does not transfer to the tool. A human still decides which evidence is sufficient for the blast radius involved.

## Two rules that fail

I would not require every generated line to be understood equally. That rule wastes time on disposable work and encourages ceremonial review, where someone reads code without improving confidence in the result.

I would also reject the idea that passing tests makes the implementation irrelevant. Tests are bounded by the assumptions of the people and systems that created them. A clean test run can coexist with unnecessary complexity, insecure defaults, weak error handling, or a design that will be painful to maintain.

The standard I use is simpler:

> **The amount of verification should follow the blast radius and expected lifetime of the code.**

For disposable work, move quickly and validate the result.

For production systems, inspect the design and demand evidence. For systems tied to safety, money, sensitive data, or irreversible decisions, require traceability and clear human ownership.

Coding agents do not remove engineering discipline. They make discipline more important because they increase how quickly weak decisions can become large implementations. The opportunity is that the same tools can help us challenge those implementations through testing, analysis, review, and refactoring.

We are automating code generation. We are also beginning to automate parts of the process used to question that code. The engineer's responsibility is to decide how much questioning the system deserves before anyone has to live with the answer.
