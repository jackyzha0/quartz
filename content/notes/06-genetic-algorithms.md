---
title: "06-genetic-algorithms"
tags: 
---


stochastic search
- don't search everything

biological evolution
- variation of genes within species of a population
- mutations occur
- reproduction combines genes of individuals

natural selection - the fitness function
- state space is genetic variation within population
- selecting the best state is implemented by the world → fitter individuals are more likely to reproduce
- find neighbouring states by reproduction



| GA                                                                    | Natural selection equiv |
| --------------------------------------------------------------------- | ----------------------- |
| chromosome (representation of state)                                  | DNA sequence            |
| fitness function $f$   that scores $s$ with respect to some objective | survival of the fittest |
| number of states K to evaluate                                        | size of population      |


method for selecting parents

| name                      | method                                      | about                                                           |
| ------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| roulette wheel (RW)       | random ish                                  | preserves diversity. rarely picks very unfit agents             |
| tournament selection (TS) | choose the two highest from a random subset | slightly less diverse discards always discard very unfit agents |


> [!INFO] doesn't need to be only two parents

mixing chromosomes using crossover
- we want a method where the child is as fit or fitter than the parent

| name         | method                                | desc |
| ------------ | ------------------------------------- | ---- |
| single point | "cut" the chromosomes between parents |      |
| k-point      | many cuts                             |      |
| uniform      | slice everywhere and mix randomly     |      |

