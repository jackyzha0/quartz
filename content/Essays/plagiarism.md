---
title: Plagiarism IS Bad, Actually
tags:
  - seedling
  - essay
  - ai
  - legal
  - copyright
date: 2024-01-13
draft: false
---
Expect this page to expand. I plan on fleshing it out it in tandem with a full argument on why AI training and output are both copyright infringement when the model was trained on copyrighted data, because copyright and plagiarism are inextricably linked.

Some arguments in this paper specifically surrounding AI are related more to legal concerns than ethical ones, and are instead housed in the [[Essays/ai-infringement|🤖 essay on copyright infringement by generative AI]]. Those links will be denoted with 🤖.

> [!warning]
> CW: discussions of systemic/societal implicit bias and inequity in the AI section. Emotional accounts of exploited work product elsewhere.
## My Position
I think all works published that hold themselves out as informative or authoritative should properly inform the reader what they used to draw their conclusions.

To comport with my own beliefs, on this website, I:
- Provide links to webpages for programs/projects I discuss, including documentation as needed.
	- See all of the [[Programs I Like/home|Programs I Like]]
- Write blurbs about the sources I found the most helpful or persuasive (with links), and often hyperlink less argumentative statements of fact with a supporting reference. This is more common if I think that a source speaks for itself, or if I can't add much to the discussion and have chosen to adopt someone else's view without comment.
	- See [[Essays/law-school|Law School is Broken]]

And when using my work, I request:
- That you link to the page you mention/quote/paraphrase.
- That you **never** use my work to train an LLM because its output is then plagiarizing my work (and post-hoc attribution will not remedy that use in this specific case)

However, note that much of the entries here are my personal perspective on the subject matter, so much of this website falls under "my source is I made it up" and needs no attribution.

Others have much more elaborate views on creative or entertaining works, so I will touch on the artist's perspective, but that side of plagiarism is outside of my personal knowledge.
## Where My Views Originate
There are two institutions in my life that have most certainly contributed to my broader position on attribution.

Coming from academia, my culture is very much "show your work." It was always beneficial to me personally to be able to point to someone much more decorated than myself and go "see? They share my conclusion." I'm not commenting on whether the academy's meritocracy is a good system (as I'm very much not qualified to do so), but following the rules of the institution and citing my sources allowed me to reach a broader audience without much effort on my part beyond what was necessary to create work product.

The legal field is even more source-mandatory due to the system of precedent, that judges *must* follow the rules set by prior decisions binding on their court. The onus is almost entirely on the advocates to inform the judge what they must do (while arguing what they *should* do). The profession places very little value on original statements as a result. The expression inherent in how you arrange the statements of others, combined with your ability to find favorable statements, is what determines your skill level as an attorney.

As mentioned above, there's definitely a gap in my knowlege/views that broadens the more creative or traditionally-considered-artistic the subject matter gets. Copyright absolutely extends to the arts, but what place does attribution have when the purpose is to entertain? One can hardly document one's creative experience when working on a novel, a script, a painting, in the same way a legal brief can be. I do believe in the necessity of personal attribution for those who directly contributed to an artistic work (think the credits section of a movie) for professional reasons, but beyond that, I'm uncertain.
## Digital Gardening and Plagiarism
For digital gardening in particular, attribution is integral to the concept. [[Misc/what-is-a-garden|A digital garden]] is a network, and the culture of the digital garden is to provide paths out of the current webpage to others on the same site or even to other websites. These associations between webpages make up a comprehensive experience that differs from modern web use (Google search, click, close the tab) and looks more like Wikipedia spelunking. 

Thus, the true value of attribution in a digital garden is mostly in the link itself rather than the substance of the current page or the linked page. This does not discount the importance of linking to those resources, though.

## AI shouldn't disregard the need for attribution
Attribution in the field of AI consists of two things: making public just what an AI was trained on, and then designing that AI to supplement its prompts with what parts of its training data it relied on for the facts of its answer.

### #1: Revealing what's behind the curtain
First, AI holds itself out as authoritative. Wrongfully so, due to incessant "hallucination" (when an AI model, due to their status as glorified autocorrect, makes up some fact or source and insists that it is accurate). This subjects it to the same kind of concerns as any authoritative work under my views.

Second and perhaps most importantly, because of the actual issue of AI bias, transparency in what an AI was trained on is paramount. As a society, the ability to question the source of some facts presented to us is already beneficial (as discussed elsewhere in this essay). But for AI, we need to ensure that the generated statements are not only correct, but not disregarding other positions categorically because they were made by sources that the AI incorrectly considers non-authoritative. An AI model could look at two positions, one with many more datapoints supporting it, and thus completely ignore the second position in its answer to a prompt. Now imagine that the former is a white man's perspective, and the second a black woman's. It's not inconceivable that an AI could enshrine systemic bias. Attribution allows people who've made careers in this field to critically examine a dataset and look for this sort of gap. In that way, it makes a **better** AI model (assuming the goal of AI is to be accurate) because of more community oversight, not just one that's more ethically trained.
- Sidebar: huh, turns out that this argument parallels the open-source philosophy.
### #2: \[citation needed\] for responses to prompts
Not to be confused with Molly White's [excellent newsletter](https://citationneeded.news/). This requirement is a more fine-grained mitigation for the transparency issues present in the dataset at large. It also provides evidence for potential copyright infringement lawsuits if the AI has also copied the expression of the paper it sourced. Note that this isn't the be-all, end-all solution to the problem of copyright infringement by AI. Read more of my take on that [[Essays/ai-infringement|🤖 here]].
## To-be-written
I want to address piece-by-piece [an argument by Brian Frye](https://www.techdirt.com/2024/01/09/plagiarism-is-fine/) supporting plagiarism in general. He's a prolific IP scholar, so I'll probably look through his academic works as well (*Against Creativity*, 11 N.Y.U. J.L. & Liberty 426 (2017), looks pretty interesting). To be clear, I don't want to get into the absolute witch hunt that inspired the linked article, but in the article he reiterates his greater conclusions about attribution to say that ALL plagiarism accusations are silly, which are what I want to respond to.
- Planned topics: granularity, necessity, nature of the work/merit, nature of the work/type of content.

I also want to discuss disrespect of creators’ intent for their works and what to label that practice. This applies both to my AI essay and plagiarism talking points. 

Anyone who identifies as a "proud plagiarist," this is your notice that I may respond to your opinions, and I will properly attribute you when doing so.
- Readers: **Don't harass anyone I cite, please**. We disagree on the topic, and since all it really bears on is respect and authoritative nature until it goes into copyright infringement territory, there aren't any high stakes.

I'm dying to dig into enterprise software engineering and attribution/licensing as well. "The StackOverflow problem" is something that the industry has been struggling with for years, and there are some pretty strong counter arguments to my position that come out of critique of softeng and originality. Given the existence of Copilot (and StackOverflow's ai stance), this ties into AI as well.
## Further Reading
This paper spells out what we should be thinking about relative to information authority, trust, and societal need when talking about generative AI. **Sections 4 and 5 are very good**; section 6 jumps the shark by immediately forgetting that it's about modern generative AI and ranting about historical Google bugs instead (which the paper would actually classify as a discriminative IA system, good under its arguments). [Bender & Shah (unpublished)](https://faculty.washington.edu/ebender/papers/Envisioning_IAS_preprint.pdf)