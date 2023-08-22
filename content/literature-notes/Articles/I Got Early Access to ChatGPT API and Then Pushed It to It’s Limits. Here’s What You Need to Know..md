---
author: [[Alistair Pullen]]
title: "I Got Early Access to ChatGPT API and Then Pushed It to It’s Limits. Here’s What You Need to Know."
tags: 
- articles
- literature-note
---
# I Got Early Access to ChatGPT API and Then Pushed It to It’s Limits. Here’s What You Need to Know.

![rw-book-cover](http://static1.squarespace.com/static/63dac39a0ea2353d0e132a36/63daf57772bc814cc05cac89/63ff9c5b6052bf01d9e5a57c/1677699006371/ChatGPT-Emblem.png?format=1500w)

## Metadata
- Author: [[Alistair Pullen]]
- Full Title: I Got Early Access to ChatGPT API and Then Pushed It to It’s Limits. Here’s What You Need to Know.
- Category: #articles
- URL: https://www.buildt.ai/blog/vm3qozd4qfrbbyzukqhynrwm9vb9tq

## Highlights
- This is, from my experience so far, the most important thing to get right with a chatbot. As I’ve mentioned already the system prompt is the bot’s ‘brief’ which defines its character, purpose and available actions. Different applications will require very different prompts, and some prompts will be far longer than others ([View Highlight](https://read.readwise.io/read/01gtfc01yrecbg6kvrh0ms1b0m))
- As you can see it’s just text, but it will never be included in the chat messages - your system prompt is sent with every request, so the tokens you use here are constant overhead. ([View Highlight](https://read.readwise.io/read/01gtfc11dcyf4acgqr6c61xtya))
- you’re briefing a salesperson before a call with a customer with actions like ‘If you see <X> kind of behaviour, then respond with <Y>’, ‘Respond as helpfully and concisely as possible, whilst always ensuring you stay on topic’, and then rounding off the prompt with ‘Ok, the user is about to ask you a question’. I can’t say for certain why, but this approach seems to have a small improvement on the bot’s ability to understand and act upon the user’s request. ([View Highlight](https://read.readwise.io/read/01gtfc1njm466q74zejc6vfvfe))
- One of the core things that’ll set your chatbot apart from vanilla ChatGPT is giving it the ability to ‘do’ things. Performing actions outside of its sandbox is a very exciting and compelling prospect, but it comes with its own challenges and potential risks. You should always be extremely careful when passing the output of these LLMs, which is untrusted, as an input into another servic ([View Highlight](https://read.readwise.io/read/01gtfc30124dqf9vj39fnwcyy1))
- Now this may look odd but there is method to the madness, the most important part of it is the closing tag `</|search_query|>` as this tag is a stop sequence, so in reality this tag will never actually appear in the output. The API tells us it’s termination reason, so we know when it’s stopped due to a stop-sequence, and with a bit of parsing it’s then trivial to see the request it’s created for our subroutine. ([View Highlight](https://read.readwise.io/read/01gtfca57560qkn3mqx94hgdy3))
- once we’ve identified and parsed the request (I use a combination of sub-string operations and regular expressions) you can then perform whatever subroutine you require, in our case we’ll pass the query off to our semantic codebase search engine. Once that subroutine is complete, we need to pass in the results into the context window, this is memory insertion – making the chatbot believe that it came up with these results, as it has no way of knowing once you make the next request ([View Highlight](https://read.readwise.io/read/01gtfcb0fexevj9ev9eak6qz0w))
- Once you’ve inserted your results you can either: end that turn there by inserting a `<|im_end|>` message, or you can just leave the conversation open-ended and let the bot continue outputting as if it had just come up with the results itself - this choice will depend on your usecase. ([View Highlight](https://read.readwise.io/read/01gtfcc3xk00vsfp90bhv5cd0y))
- This is the most approximate way I’ve found for getting equivalent functionality to “Let’s think step-by-step” in the ChatGPT prompting world. It forces the model to verbalise it’s reasoning and pre-medidate it’s acutal answer before delivering it. A final tip I’d give on this front: to ensure that the model always produces these pre-message tokens I start my assistant completions with <|user_intonation and let it continue from there, so it doesn’t ignore it or choose to omit that step. ([View Highlight](https://read.readwise.io/read/01gtfceacfz9scm3zz8m6xfkf1))
- I’d reiterate that having a strong function to strip out content that the user shouldn’t see from the chat messages is very important, we have tags we can wrap things in to ensure that entire blocks won’t render in the final chat messages, e.g if your query involves a search to make it happen, but isn’t itself inately a search query, then you shouldn’t show the search results in the returned message. ([View Highlight](https://read.readwise.io/read/01gtfcfyd9s8sv0k2c36agpaf1))
