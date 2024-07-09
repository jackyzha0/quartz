---
title: "Hong, Ruixin and Zhang, Hongming and Pan, Xiaoman and Yu, Dong and Zhang, Changshui :: Abstraction-of-Thought Makes Language Models Better Reasoners"
author: ["Justin"]
date: 2024-07-08T09:29:00-04:00
lastmod: 2024-07-08T16:15:51-04:00
tags: ["machine-learning", "prompting"]
draft: false
---

<div class="outline-1 jvc">

## Paper {#paper}

Abstraction-of-Thought (AoT) is a novel structured reasoning format designed to
enhance language models' abstract reasoning capabilities. Unlike the
step-by-step Chain-of-Thought (CoT) method, AoT requires models to consider
problems at varying levels of abstraction before delving into concrete details.

</div>

<div class="outline-1 jvc">

## Implementation {#implementation}

These are various implementations I've created or wandered into.

<details>
<summary>Python</summary>
<div class="details">

The python one I created myself, was pondering using it for some of my projects.

```python

import openai

client = openai.OpenAI()

def abstraction_of_thought(problem):
    # Step 1: High-level planning
    high_level_prompt = f"""Problem: {problem}

    Let's think logically and provide an abstract higher-order plan on how to
    solve this kind of problem. Don't dive into small details, only provide
    a high-level plan."""

    high_level_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": high_level_prompt}]
    )
    high_level_plan = high_level_response.choices[0].message.content

    # Step 2: Detailed planning
    detailed_prompt = f"""High-level plan: {high_level_plan}

    Provide a more detailed plan. What specific steps should we take? On
    what details should we pay attention?"""

    detailed_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": detailed_prompt}]
    )
    detailed_plan = detailed_response.choices[0].message.content

    # Step 3: Problem-solving
    solve_prompt = f"""Problem: {problem}
    High-level plan: {high_level_plan}
    Detailed plan: {detailed_plan}

    Now, apply this plan to solve the problem and provide the final solution."""

    solve_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": solve_prompt}]
    )
    solution = solve_response.choices[0].message.content

    # Step 4: Summarizing
    summary_prompt = f"""Solution: {solution}

    Provide a short, concise final answer based on this solution."""

    summary_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": summary_prompt}]
    )
    final_answer = summary_response.choices[0].message.content

    return {
        "high_level_plan": high_level_plan,
        "detailed_plan": detailed_plan,
        "solution": solution,
        "final_answer": final_answer
    }

# Example usage
problem = """I have an orange, five raspberries, two books,
             three plums, a pencil, and a grape. How many fruits do I have?"""
result = abstraction_of_thought(problem)

print("High-level plan:", result["high_level_plan"])
print("\nDetailed plan:", result["detailed_plan"])
print("\nSolution:", result["solution"])
print("\nFinal answer:", result["final_answer"])
```
</div>
</details>

<details>
<summary>Elisp</summary>
<div class="details">

This elisp implementation is in the
[GitHub - s-kostyaev/ellama](https://github.com/s-kostyaev/ellama) package.

```elisp
This is an elisp implementation of abstraction of thought

(defun ellama-solve-reasoning-problem (problem)
  "Solve reasoning PROBLEM with absctraction of thought.
Problem will be solved with the chain of questions to LLM."
  (interactive "sProblem: ")
  (ellama-chain
   problem
   '((:chat t
        :transform (lambda (problem _)
             (format "Problem:
%s

Let's think logically and provide abstract higher order plan how to solve this
kind of problems. Don't dive into small details only provide high-level plan."
                     problem)))
     (:chat t
        :transform (lambda ( )
             "Provide more detailed plan. On what details should we pay attention?"))
     (:chat t
        :transform (lambda ( )
             "Now revise the plan and provide the final solution."))
     (:chat t
        :transform (lambda ( )
             "Provide short final answer based on final solution.")))))
```
</div>
</details>

</div>
