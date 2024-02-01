---
title: "Generative AI: Copyright Infringement's New Trench Coat"
tags:
  - essay
  - ai
  - legal
  - copyright
date: 2023-11-04
draft: true
lastmod: 2024-01-28
---
One ticket to the original, authorized, or in the alternative, properly licensed audiovisual work, please!

*A film roll clatters to the ground from underneath a suspiciously camera-shaped bulge in the figure's oversized trench coat.*

> [!info] I’m looking for discourse!
> Critique my points and make your own arguments. That’s what the comments section is for. 

> [!warning]
> CW: US law and politics; memes
> 
> **This site contains my own opinion in a personal capacity, and is not legal advice, nor is it representative of anyone else's opinion.**
> - Also a reminder that I won’t permit inputting my work in whole or part into an LLM. 

I've seen a few news articles and opinion pieces recently that support training generative AI and LLMs (such as ChatGPT/GPT-4, LLaMa, and Midjourney) on the broader internet as well as more traditional copyrighted works, without respect to the copyright holders for all of the above. For now, this will be less of a response to any one article and more of a collection of points of consideration that tie together common threads in public perception. I intend for this to become comprehensive over time.

My opinion here boils down to three main points:
- Training a generative AI model on copyrightable subject matter without authorization is copyright infringement (and the proprietors of the model should be responsible);
- Using a generative AI to generate something where the weights used to determine what the AI outputs are based on copyrightable subject matter which was trained on without authorization is copyright infringement (and the proprietors and users of the model should be jointly responsible); and
- Fair use is not a defense to either of the above infringements.

I also discuss policy later in the essay. Certain policy points are instead made in my [[Essays/plagiarism|🅿️ essay on plagiarism]], and links to that entry will be labeled with 🅿️.
## Prologue: why these arguments are popping up
<img src="/Attachments/but-he-can.jpg" alt="'I know, but he can' meme, with the RIAA defeating AI art for independent illustrators" style="height: 30em;margin: 0% 25%" loading="lazy">

In short, there's a growing sentiment against copyright in general. Copyright can enable centralization of rights when paired with a capitalist economy, which is what we've been historically experiencing with the advent of record labels/publishing companies. It's even statutorily enshrined as the "work-for-hire" doctrine. AI has the potential to be an end-run around these massive copyright repositories' rights, which many people see as beneficial.

However, this argument forgets that intangible rights are not *yet* so centralized that independent rights-holders have ceased to exist. While AI will indeed harm central rights-holders, it will also affect individual creators and the bargaining power of creators that choose to work with the central institutions. For those against copyright as a whole, this is a neutral factor to the disestablishment of copyright. Due to my roots in the indie and open-source communities, I'd much rather keep their/our/**your** rights intact.

Reconciling the two views, I'm sympathetic to arguments against specific parts of the US's copyright regime as enforced by the courts, such as the way fair use is statutorily worded. We as a voting population have the power to compel our representatives to enact reforms that take the threat of ultimate centralization into account, and can even work to break down what's already here. But I don't think that AI should be the impetus for arguments against the system as a whole.
## The Legal Argument
Fair warning, this section is going to be the most law-heavy, and probably pretty tech-heavy too. Feel free to skip [[#The First Amendment and the "Right to Read"|-> straight to the policy debates.]] The field is notoriously paywalled, but I'll try to link to publicly available versions of my sources whenever possible.

Please don't criticize my sources in this section unless a case has been overruled or a statute has been repealed/amended (ie, I **can't** rely on it). This is my interpretation of what's here (also again not legal advice or a professional opinion). Whether a case is binding on you personally doesn't weigh in on whether its holding is the nationally accepted view.

For all of the below analysis, assume that the hypothetical model in question has been trained on some work which has a US copyright registered with the original author.

The core tenet of copyright is that the doctrine protects original expression (of which regulation is authorized by the Constitution as "works of authorship"), meaning **you can't copyright facts**. There are two ends to the spectrum of arguments made by authors (seeking protection) and defendants (arguing that enforcement is unnecessary in their case). For example, you can't be sued for using the formula you read in a math textbook, but if you scan that math textbook into a PDF, you might be found liable for infringement. 

One common legal argument against training as infringement is that the AI extracts facts, not the author's creativity, from a work. But that position assumes that the AI is capable of first differentiating facts and art, and further separating them in a way analogous to the human mind's.
### Training

<img src="/Attachments/common_crap.svg" alt="Common Crawl logo edited to say 'common crap' instead" style="padding:0% 5%">

Everything AI starts with a dataset. And most AI models will start with the easiest, most freely available resource: the internet. Hundreds of different scrapers exist with the goal of collecting as much of the internet as possible to train modern AI (or previously, machine learners, neural networks, or even just classifiers/cluster models).

Acquiring data for training is an unethical mess. **In human terms**, scrapers like Common Crawl will take what they want, without asking (unless you know the magic word to make it go away, or just [[Projects/Obsidian/digital-garden#Block the bot traffic!|block it from the get-go]]), and without providing immediately useful service in return like a search engine. For more information on the ethics of AI datasets, read my tidbit on [[Essays/plagiarism#AI shouldn't disregard the need for attribution|🅿️ the need for AI attribution]], and have a look at the work of [Dr. Damien Williams](https://scholar.google.com/citations?user=riv547sAAAAJ&hl=en) ([Mastodon](https://ourislandgeorgia.net/@Wolven)).
- Sidebar: and acquiring this data is copyright infringement too, as unlicensed copying. The case is tremendously stupid: [*MAI Systems v. Peak Computer*](https://casetext.com/case/mai-systems-corp-v-peak-computer-inc) holds that RAM copying (ie, moving a file from somewhere to a computer's memory) is an unlicensed copy. As of today, it's still good law, for some reason. Note that every single file you open in Word, a PDF reader, or your browser is moved to your memory before it gets displayed on the screen. Bring it up at trivia night, just using your computer is copyright infringement!

But then a company actually has to train an AI on that data. What copyright issues does that entail? First, let's talk about The Chinese Room.

[The Chinese Room](https://plato.stanford.edu/entries/chinese-room/) is a philosophical exercise authored by John Searle where the (in context, American) subject is locked in a room and receives symbols in Chinese slipped under the door. A computer program tells the subject what Chinese outputs to send back out under the door based on patterns and combinations of the input. The subject does not understand Chinese. Yet, it **appears** as if whoever is inside it has a firm understanding of the language to an observer of Searle's room.

Searle's exercise was at the time an extension of the Turing test designed to refute the theory of "Strong AI." At the time that theory was well-named, but today the AI it was talking about is not even considered AI by most. Strong AI was the theory that a computer could be programmed to  However, it can be easily applied to many other programming fields—notably compiler design—with the most pertinent here being natural language processing. The hypothetical Strong AI was a computer program capable of understanding its inputs and outputs, and importantly *why* it took each action. A Weak AI, on the other hand, was just the Chinese Room. Searle reasoned that the "understanding" of a Strong AI was inherently biological, thus one could not presently exist.
- Note that some computer science sources like [IBM](https://www.ibm.com/topics/strong-ai) have taken to using Strong AI to denote AGI, which was only a sufficient, not necessary, quality of a philosophical "intelligent" intelligence.



- The idea and expression being the same may give rise to some claims of merger doctrine; that is, the idea merges with the expression, so it is not copyrightable. That would not be a correct reading of merger doctrine. [*Ets-Hokin v. Skyy Spirits, Inc.*](https://casetext.com/case/ets-hokin-v-skyy-spirits-inc) makes it clear that the doctrine is more about disregarding the types of works that are low-expressivity by default, and that this "merge" is just a nice name to remember the actual test by. Confusing name, easy doctrine.
### Generation

### Fair Use
#### Detour: actual harm caused by specific uses of AI models
My bet for a strong factor when courts start applying fair use tests to AI output is that the use in the instant case causes or does not cause harm. Here's a quick list of uses that probably do cause harm.
- Election fraud, including even **more** corporate influence on US elections ([not hypothetical](https://www.washingtonpost.com/elections/2024/01/18/ai-tech-biden/) [in the slightest](https://openai.com/careers/elections-program-manager), [and knowingly unethical](https://www.npr.org/2024/01/19/1225573883/politicians-lobbyists-are-banned-from-using-chatgpt-for-official-campaign-busine))
- Other fraud, like telemarketing/robocalls, phishing, etc
- Competition with actual artists and authors (I am VERY excited to see where trademark law evolves around trademarking one's art or literary style). 
- Obsoletes human online workforces in tech support, translation, etc
- [[plagiarism##1 Revealing what's behind the curtain|🅿️ Reinforces systemic bias]]
### Where do we go from here?
Well, getting to evaluation of the above by courts would be a start. Right now, courts are ducking AI issues left and right on standing and pleading grounds. ==say more right now==
# Policy
## The First Amendment and the "Right to Read"
WIP
## Putting your work "out there" on the internet
Artist's will, don't exploit
### Detour: plagiarism
There's also the problem of correctly sourcing information used in forming an opinion.

One proposed "solution" to AI use of copyrighted works is interestingly to attribute that those works were used in the first place.
## The enforcement problem
WIP
## Why is piracy ethical, but not AI training?

## Mini-arguments
A list of little statements that would cast doubt on the general legitimacy of the AI boom that I found compelling. Most are spread across the fediverse; others are blog posts/articles. 

- [Cartoonist Dorothy’s emotional story re: midjourney and exploitation against author intent](https://socel.net/@catandgirl/111766715711043428)
- [Misinformation worries](https://mas.to/@gminks/111768883732550499)

==TODO analyze and applaud https://www.techdirt.com/2023/11/29/lets-not-flip-sides-on-ip-maximalism-because-of-ai/ ==