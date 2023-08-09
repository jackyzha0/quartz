__author__ = "Jet Hughes"
__organization__ = "COSC343/AIML402, University of Otago"
__email__ = "hugje043@student.otago.ac.nz"

import itertools
import math
import sys
from collections import Counter


def all_sum_rec(target, current_sum, start, output, result):
    if target == current_sum:
        output.append(result[:])
    for i in range(start, target):
        temp_sum = current_sum + i
        if temp_sum <= target:
            result.append(i)
            all_sum_rec(target, temp_sum, i, output, result)
            result.pop()
        else:
            return


def all_sum(target):
    output = [[target]]
    result = []
    all_sum_rec(target, 0, 1, output, result)
    return output


class MastermindAgent:
    """ A class that encapsulates the code dictating the behaviour of the agent playing the game of Mastermind.

     Attributes:
        code_length (int): the length of the code to guess
        colours (list of char): a list of colours represented as characters

     Methods:
        AgentFunction(percepts): Returns the next guess of the colours on the board
     """

    def __init__(self, code_length, colours, num_guesses):
        """Constructor for MastermindAgent

        Args:
            code_length (int): the length of the code to guess
            colours (list): list of letter representing colours used to play
            num_guesses (int): the max. number of guesses per game
        """
        self.code_length = code_length
        self.num_guesses = num_guesses
        self.colours = colours

        # Memoization variables
        self.cache_depth = 4
        self.eval_cache = {}  # Stores the result of evaluations between codes
        self.guess_cache = {}  # Cache the optimal second guess (Since there are only 20 possibilities)
        self.eval_cache_hits = 0  # Save the number of times we access the cache (for debugging)
        self.guess_cache_hits = 0
        self.guess_history = []

        # Calculate all possible codes
        self.all_codes = list(itertools.product(self.colours, repeat=self.code_length))
        self.remaining_codes = self.all_codes

        # Define a strategy to make the best guess
        self.strategy = self.expected_entropy

        # Since the first guess is always the same we can precalculate it here
        self.optimal_initial_guess = list(self.execute_strategy(self.unique_first_guesses()))
        # self.optimal_initial_guess = list(('B', 'B', 'R', 'G'))  # for most parts with 4
        # self.optimal_initial_guess = random.choice(self.remaining_codes)  # for the random simple agent

    def unique_first_guesses(self):
        guesses = []
        for code in all_sum(self.code_length):
            guess = []
            for i, count in enumerate(code):
                guess.extend([i] * count)
            guesses.append(self.convert_to_colours(guess))
        return guesses

    def convert_to_colours(self, code):
        return tuple([self.colours[i] for i in code])

    def execute_strategy(self, scope=None):
        if scope is None:
            action_b, score_b = self.execute_strategy(scope=self.remaining_codes)
            return action_b, score_b
            # action_a, score_a = self.execute_strategy(scope=self.all_codes)
            # if score_a > score_b:
            #     return action_a, score_a
            # return action_b, score_b
        else:
            return max([(code, self.strategy(code)) for code in scope], key=lambda v: v[1])

    def evaluate(self, guess, target):
        key = (guess, target)
        if key not in self.eval_cache:
            in_place = sum(c == g for c, g in zip(target, guess))
            in_colour = sum((Counter(target) & Counter(guess)).values()) - in_place
            self.eval_cache[key] = (in_place, in_colour)
        else:
            self.eval_cache_hits += 1
        return self.eval_cache[key]

    def worst_case(self, g) -> int:
        responses = [self.evaluate(g, c) for c in self.remaining_codes]
        return -max(Counter(responses).values())  # * -1 to minimize not maximize

    def expected_size(self, g) -> float:
        responses = [self.evaluate(g, c) for c in self.remaining_codes]
        result = 0
        for response_count in Counter(responses).values():
            result += response_count**2 / len(responses)
        return -result  # we want to minimize not maximize the expected size

    def most_parts(self, g) -> int:
        responses = [self.evaluate(g, c) for c in self.remaining_codes]
        return len(Counter(responses).values())

    def expected_entropy(self, g) -> float:
        responses = [self.evaluate(g, c) for c in self.remaining_codes]
        entropy = 0
        for response in Counter(responses).values():
            px = response / len(responses)
            entropy += px * math.log2(1 / px)
        return entropy

    def get_possible_solutions(self, last_guess, in_place, in_colour):
        """Evaluate the last guess against every remaining possible code.
        if the response from a code is the same as the response from the target then
        that code could be the solution. We keep only these codes and discard the rest
        """
        return [a for a in self.remaining_codes if self.evaluate(tuple(last_guess), a) == (in_place, in_colour)]

    def AgentFunction(self, percepts):
        """Returns the next board guess given state of the game in percepts

        Args:
            percepts (_type_): a tuple of four items: guess_counter, last_guess, in_place, in_colour, where
                guess_counter - integer indicating how many guesses have been made, starting with 0 for initial guess;
                last_guess - is a num_rows x num_cols structure with the copy of the previous guess
                in_place - is the number of character in the last guess of correct colour and position
                in_colour - is the number of chars in the last guess of correct colour but not in the correct position

        Returns:
            list: a list of code_length chars constituting the next guess
        """

        # extract percepts
        guess_counter, last_guess, in_place, in_colour = percepts

        # Remove impossible codes
        if guess_counter != 0:
            self.remaining_codes = self.get_possible_solutions(last_guess, in_place, in_colour)

        # Reset remaining codes and make the optimal first guess
        if guess_counter == 0:
            self.remaining_codes = self.all_codes
            self.guess_history = []
            action, score = self.optimal_initial_guess

        # If there is only one remaining code the decision is simple
        elif len(self.remaining_codes) == 1:
            action, score = list(self.remaining_codes[0]), None

        # Check the guess cache
        elif guess_counter <= self.cache_depth:
            key = (tuple(self.guess_history), in_place, in_colour)
            if key not in self.guess_cache:
                self.guess_cache[key] = self.execute_strategy()
            else:
                self.guess_cache_hits += 1
            action, score = self.guess_cache[key]

        # Finally, just execute the strategy
        else:
            action, score = self.execute_strategy()

        # debug
        print(f"{len(self.eval_cache)} {len(self.guess_cache)} | "
              f"{self.eval_cache_hits} {self.guess_cache_hits} | "
              f"{len(self.remaining_codes)} | "
              f"{in_place}{in_colour} |"
              f"{''.join(action)}-{score} | {sys.getsizeof(self.eval_cache)} {sys.getsizeof(self.guess_cache)}")

        self.guess_history.append((tuple(action), in_place, in_colour))
        return list(action)
