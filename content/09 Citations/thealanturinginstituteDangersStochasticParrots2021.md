---
zotero-key: HJHK4C97
zt-attachments:
  - "5743"
title: "On the dangers of stochastic parrots: Can language models be too big? 🦜"
citekey: thealanturinginstituteDangersStochasticParrots2021
aliases: 
dateadd: 2024-02-13T09:25:21.000Z
citetype: videoRecording
year: 2021
tags:
  - cost
type:
  - citation
status: open
project:
  - NA
priority: p5
created: 2024-02-13 10:33
modified: 2024-12-18 14:41
---
# On the dangers of stochastic parrots: Can language models be too big? 🦜
Read:: - [ ]  (2021) - On the dangers of stochastic parrots: Can language models be too big? 🦜 ➕2024-02-13 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/HJHK4C97)
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/TBU4AEAF/Bender%20-%20On%20the%20dangers%20of%20stochastic%20parrots%20Can%20language%20models%20be%20too%20big%20!.pdf>)
Reading Note::
Web Rip::
url:: https://www.youtube.com/watch?v=N5c2X8vhfBE
paper:: [[benderDangersStochasticParrots2021]]
```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "thealanturinginstituteDangersStochasticParrots2021" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> Keynote: Professor Emily M Bender
Panellists: Dr Anjali Mazumder, Dr Zachary Kenton and Professor Ann Copestake
Host: Dr Adrian Weller

Website: https://www.turing.ac.uk/events/dange...

About the event:      Professor Emily M. Bender will present her recent (co-authored) paper On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? 🦜

In this paper, Bender and her co-authors take stock of the recent trend towards ever larger language models (especially for English), which the field of natural language processing has been using to extend the state of the art on a wide array of tasks as measured by leaderboards on specific benchmarks. In the paper, they take a step back and ask: How big is too big? What are the possible risks associated with this technology and what paths are available for mitigating those risks?

The presentation was be followed by a panel discussion.
# Quick Reference

# Top Notes
See the original paper [[benderDangersStochasticParrots2021|Bender et al. (2021)]]
They speak a lot about including diversity, and avoiding hegemonic models

# Video
## [On the dangers of stochastic parrots: Can language models be too big? 🦜 - YouTube](https://www.youtube.com/watch?v=N5c2X8vhfBE)


<iframe title="On the dangers of stochastic parrots: Can language models be too big? 🦜" src="https://www.youtube.com/embed/N5c2X8vhfBE?feature=oembed" height="113" width="200" style="aspect-ratio: 1.76991 / 1; width: 100%; height: 100%;" allowfullscreen="" allow="fullscreen"></iframe>
```embed
title: "On the dangers of stochastic parrots: Can language models be too big? 🦜"
image: "https://img.youtube.com/vi/N5c2X8vhfBE/maxresdefault.jpg"
description: "Keynote: Professor Emily M Bender Panellists: Dr Anjali Mazumder, Dr Zachary Kenton and Professor Ann Copestake Host: Dr Adrian Weller Website: https://www.turing.ac.uk/events/dangers-stochastic-parrots About the event: Professor Emily M. Bender will present her recent (co-authored) paper On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? 🦜 In this paper, Bender and her co-authors take stock of the recent trend towards ever larger language models (especially for English), which the field of natural language processing has been using to extend the state of the art on a wide array of tasks as measured by leaderboards on specific benchmarks. In the paper, they take a step back and ask: How big is too big? What are the possible risks associated with this technology and what paths are available for mitigating those risks? The presentation was be followed by a panel discussion."
url: "https://www.youtube.com/watch?v=N5c2X8vhfBE"
```

## Notes on talk
Reporting training times and costs.
Ensuring publicly funded access to compute resources
Lack of diversity, “Those hegemony”


The push for generality, it supposed to be used for everything

# Slides
[Online Slides](https://faculty.washington.edu/ebender/papers/Bender-Turing-Institute-July-2021.pdf)
![[content/09 Citations/thealanturinginstituteDangersStochasticParrots2021_Amedia/Bender-Turing-Institute-July-2021.pdf]]

# Transcript
[00:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=16) hello everyone welcome uh we're really excited today to have a wonderful uh set of people to come and talk about a very important
[00:26](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=26) uh set of topics um i'll just briefly describe the format um to make sure everyone knows what's going on we're gonna open up with
[00:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=35) emily bender uh who has graciously uh joined us to talk about her paper uh that co-authored with that with several other people and i think she'll she'll talk
[00:45](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=45) about how it's actually written with with more than the people who are officially recognized on the paper and so that that topic she'll cover briefly
[00:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=53) and then she'll she'll tell us a bit about the content of the paper which is really interesting about the nature of language models and uh even though they're exciting why
[01:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=61) we need to be concerned about some of the limitations and potential risks that are involved in them so emily's going to speak for around 30
[01:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=68) minutes or so and then we have some very distinguished panelists who are going to respond just for a few minutes each uh we have zach kenton from deepmind and
[01:17](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=77) cope snake from cambridge university and we very much hope that angelina zamda will be able to join us she's the ai and human rights team lead at the turing institute
[01:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=87) so they'll respond then emily will have a chance to respond then we'll get into a kind of panel discussion around related topics and there will be time at the end for
[01:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=99) people to ask some questions um to enable that everyone has graciously said that they can continue until quarter past five uk time so we're going for about an hour
[01:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=109) and a quarter hope that's good for everyone everyone's also very kindly agreed to that we can record this so if you need to run off that you will be
[01:56](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=116) able to find a recording of this fairly soon and just so you know if you want to ask a question the way this this will work is
[02:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=123) is you should see q a at the bottom of zoom if you press that you can type a question in there or you can also look through the questions that are there already and you
[02:11](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=131) can upvote questions so we're likely to go with respectful questions please that are near the top of that of that table
[02:21](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=141) uh wonderful so uh let's let's uh let's get ready to start um so again delighted to have uh professor emily bender with us today she's professor
[02:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=151) uh of um language and natural language processing from university of washington and she's going to tell us about her her paper which has attracted some attention on
[02:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=162) the dangers of stochastic parrots thanks very much emily thank you so much for having me and i hope you don't mind that i have assistance here for my cat oiler
[02:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=170) um hopefully she will not be too disruptive welcome everyone i'm very glad to see the interest um in the content of this paper um and i want to let you know that this link for
[03:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=181) the slides will be on this slide the second slide and the final slide and the reason i put that up is so that you have the slides but also because there's some
[03:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=190) bibliographic information in the pdf there so as noted i am presenting on the dangers of stochastic parrots can language models be
[03:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=198) too big and that parrot emoji is officially part of the title this paper is joint work with many people so the listed authors on the final paper are
[03:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=208) timny gabriel angelina mcmillan major and margaret mitchell because um well it's a long story that i'm sure you've seen recovered in the press
[03:37](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=217) but the main thing that i want to say is that we also had the valuable assistance of actually margaret mitchell and vinay kumar prabrakaran mark diaz and ben hutchinson who are all
[03:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=228) um well the final three of them are still researchers in the ethical ai team at google and it is only because we had this group
[03:57](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=237) large group with diverse scholarly backgrounds that we were able to pull together this paper that drew on so many literatures and i think it's really unfortunate
[04:05](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=245) um that some of these researchers were required by their employer to remove their names from this paper um and therefore not get the recognition for their work and so i just wanted to
[04:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=253) take a moment and to promote a few papers um by these colleagues of mine and these are all listed now that is distracting oiler
[04:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=262) these are all listed in the bibliography and the slides that i mentioned so if you would like to see sort of more written from that same place of expertise as they've contributed to this
[04:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=272) paper i encourage you to go check out these other papers listed here um so in writing this paper we started from the position that uh we were observing the field both
[04:43](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=283) in academia but especially in industry in this like rush to ever larger language models um and um in discussions so the the initial discussion was between me
[04:54](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=294) and and to meet um sort of asked this is exciting there's interesting things happening here but what should we pause and consider um before we dive into this or continue to
[05:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=306) dive into this um and so the questions that we wanted to ask are is this track of ever larger language models inevitable or even necessary
[05:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=316) what are the costs associated with this research direction and what should we consider before pursuing it um in fact does the field of natural language processing or the public that
[05:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=325) it serves actually need larger language models if so how can we pursue this research direction while mitigating its associated risks
[05:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=332) and if not what do we need instead so these are the the guiding questions for this paper and we would like you to consider them as well what i'm going to do here is give a very
[05:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=341) brief history of language models and then talk some about the risks that we identified and some risk mitigation strategies that we also cover in the paper and the
[05:51](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=351) risks in particular fall into four categories and we talk about the environmental and financial costs of this path and we talk about what happens when
[05:58](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=358) you're dealing with unmanageably large trading data a brief comment on the impact on research trajectories and then some thoughts about what
[06:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=366) happens when you have synthetic language that is um strings put together by artificial agents that are recognized by humans as human
[06:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=374) language so the brief history um i and my co-authors define language model as a system trained to do string prediction um and
[06:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=384) this can be linear so what word comes and then that blank the system will be trained to fill in that blank um or in the masked language model setup
[06:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=392) what word mask here how do you fill in that masked token in the middle and this is not in the very broadest sense new technology it was actually proposed originally by claude shannon in
[06:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=402) 1949 and then implemented very importantly for speech recognition and machine translation in the early 1980s um so that's the
[06:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=412) earliest ones were engram language models then we start seeing different neural architectures up through the transformers and the big takeaways um that i would
[07:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=422) like you to take from this history is that uh there's this pattern of getting better scores on various benchmarks through larger data collections and
[07:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=433) bigger models and then you sort of max out what can be done with that particular approach and then move on to a new architecture and so on that's the recurring pattern
[07:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=442) we are now in a situation where not only are language models monolingual but in fact there's multilingual training setups where data from many languages are combined
[07:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=451) together people are working on how to reduce model size for example by distilling out smaller language models from the large ones and very importantly the growth of the
[07:45](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=465) models in terms of both the number of parameters um and the size of the training data has been proportionate to an extension in the
[07:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=475) range of the application of those models so originally it was just things like speech recognition and machine translation to do with re-ranking possible outputs from another component
[08:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=484) say well what looks like a plausible sentence in this language and now we see language models as components of just about any language processing task um
[08:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=494) so how big is big um this is a graph that is probably a little bit hard to see but i just want you to get the overall sense of the trajectory from um if you notice
[08:23](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=503) the time scale on the bottom this is late 2018 through early 2021 looking at the increase in size in orange of the data set measured
[08:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=516) in gigabytes and then the number of parameters those are the blue circles um and those are which is measured in parameters um and uh one thing that i want to
[08:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=528) mention about this is that this graph is certainly already out of date when we were producing the camera ready version of this paper in january of this year
[08:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=535) um it's angie who was working on this section and i said hey did you get that latest model from google she said yeah and i went and looked at the table and she had g shard
[09:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=543) i'm like no no the latest latest model from google which is switch c up here and so even in the space between when we submitted the paper in october and
[09:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=552) uh when it was uh finalized for camera ready in january there was already this enormous increase in size so this is this is a continuing trajectory
[09:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=562) all right so we are you know on this roller coaster um is it really scary well what are the risks the first um series of issues that we looked at
[09:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=572) are environmental costs and financial and accessibility and here we drew on a growing literature looking at and the environmental and financial costs of machine learning in
[09:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=582) general and language processing in particular including work like that by emma strubel where um they found so in comparison the average
[09:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=592) humans emissions um per year are five tons of uh carbon dioxide and that is averaged across the entire globe so those of us who live in industrialized societies are
[10:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=603) responsible for much more than that but five being the average for a human and in that context drew but i looked at um what the cost is of training particular different models so
[10:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=615) they said based on some estimates doing some of the training steps for a transformer model and then projecting that out to if
[10:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=622) you've done the full grid search using gpus that would be 284 tons they also looked back at some work that they had done on english to german machine translation
[10:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=634) where they gained a whole tenth of a blue score um and they found that that uh required about 150 000 worth of compute um and
[10:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=644) so this is a lot it's not you know catastrophically any one of these a lot but it's big enough that's worth paying attention and saying hey do we need this before flipping the
[10:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=653) switch and it's really valuable i think that folks like strubot all have sat down and done this work because when we work on computers it often feels
[11:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=660) like it only exists in the abstract world of math and doesn't have any physicality to it and that physicality is real and it's important and it's big enough to have an
[11:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=669) effect on things like the climate in aggregate um so strew but i'll say we can as a field do better about this by getting in the
[11:20](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=680) habit of doing things like reporting training time and sensitivity to hyper parameters um and making sure that these are that doing
[11:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=688) things efficiently is also something that is valued alongside just getting higher scores or lower scores depending on your metric um esther but also suggest more
[11:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=698) equitable access to compute clouds through government investment because alongside the environmental cost there's this question of who actually can have access and who can play in the
[11:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=708) space and who is left out and some of that is which researchers but also which languages um so current mitigation efforts um a
[11:58](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=718) lot of folks are laudably looking to renewable energy sources um to make sure that if they're going to be using a lot of electricity it is done
[12:05](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=725) um off of a renewable source that's great but even renewable sources do have environmental costs um here in washington state
[12:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=732) we are very smug to use a lot of hydroelectric power um which is great from a carbon footprint point of view um not so great for the salmon that need those rivers
[12:21](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=741) too and also up until the point where we actually have enough clean electricity to do everything we want to do
[12:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=749) anytime we're using electricity um even renewable electricity for something that is not a survival necessity we might stop and think hey is there somewhere else that this could be used
[12:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=759) better um another direction that i think is very promising um is there are efforts now towards prioritizing computationally efficient
[12:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=769) hardware and computationally efficient approaches and i'd like to point out the sustained nlp workshop which is happening again this year at
[12:56](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=776) emnop um and work like shorts at all 2020 that are talking about actually promoting efficiency as an evaluation metric and then finally there are existing
[13:07](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=787) emerging tools for documenting energy and carbon usage alongside other aspects that we report of our research so these are all worthwhile things to be
[13:17](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=797) looking into another angle that we think is really important to take when we are doing these risk benefit analyses is to think about who's actually getting
[13:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=805) the benefits and who's paying the costs and what we notice about large language models is that they are mostly for high resource languages because they require these enormous amounts of data
[13:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=815) and therefore they are going to benefit those who are speakers of those high resource languages and that is disproportionately people who already have the most in society
[13:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=824) on the flip side if we think about climate change and who's going to be impacted the most and the quickest that would be marginalized communities and so we picked a couple of examples
[13:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=832) here i'm sure there are more and the maldives are threatened by rising sea levels um recently 800 000 residents of sudan were affected by flooding
[14:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=840) um and to the extent that the work we're doing to build large language models more and more and more larger and larger language models for english these folks are not reaping the benefits
[14:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=849) and we aren't building large language models for devehi or sudanese arabic all right so that's the environmental and financial costs the next set of risks has to do with
[14:20](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=860) unmanageable training data now the internet is a large and diverse virtual space and so it's easy to imagine that very large data sets such as common crawl
[14:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=869) must therefore be broadly representative of the ways in which different people view the world however on closer examination we find that there are actually several factors
[14:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=878) which narrow that internet participation which narrow the discussions which will be included via the crawling methodology and finally which narrow the text likely to be contained
[14:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=888) after the crawl data are filtered and critically in all of these cases we find that it's the voices of people who are most likely to hue to a hegemonic viewpoint
[14:58](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=898) that are the ones that are most likely to be retained so in a bit more detail if you look first if you think okay well we're going to crawl the web that's the whole web that's a lot well who's
[15:05](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=905) actually on the web who has access to the internet and is contributing and that tends to be younger people and those from developed countries
[15:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=913) who's being subject to moderation so who's being pushed out even if they're on the web who's having a harder time contributing their voice and fighting for a place in the conversation
[15:21](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=921) there's some really interesting research by dr leslie k jones looking at how on twitter um accounts belonging to people who received death threats are actually more likely to be
[15:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=932) suspended in many cases than those issuing the threats and so we get marginalized voices disproportionately pushed out even if they've tried to participate in the
[15:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=939) first place and then we say okay well what parts of the internet are being scraped for a lot of these projects people are starting with reddit
[15:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=948) not the text of reddit but the web pages that are pointed to from reddit and uh in the us anyway um reddit users are 67 men and 64 of them are in the ages of
[16:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=960) 18 to 29. um similarly wikipedia is a strong um search but a survey of wikipedians found that only a small minority of them are
[16:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=969) women or girls and where people have gone to lengths from you know various less represented communities to create online spaces for themselves
[16:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=978) those sites are less well connected to these starting points for the scraping lazar at all do some interesting documentation of a community of bloggers of older folks looking at issues of
[16:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=988) ageism and aging and those kinds of blogs are not going to be as well connected and not as well represented in the crawls and then finally there's this filtering step
[16:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=998) which is done surprisingly starting with basically a list of keywords that initially came from someone's open source project that had to do with making sure you didn't get alarming
[16:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1010) things popping up as um search completion suggestions in like a music site or something um so it's this list of 400 or so words um
[17:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1020) that primarily have to do with words referencing sex but also included a bunch of things around lgbtq identity and so this filter then filters out a
[17:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1029) bunch of lgbtq online spaces and with thanks to willy agner for pointing this out you're therefore going to lose the text of people positively describing their own lgbtq
[17:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1039) identities which is only going to therefore magnify anti-lgbtq discourse that is still contained so why is this a problem the problem is
[17:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1051) that if we over represent hegemonic viewpoints um then we are over representing the language of people who consciously and not deliberately or not
[17:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1061) use their language in ways that are consistent with systems of oppression and express those systems of oppression and by that i mean things like racism misogyny ableism ages and
[17:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1069) transphobia and others another risk has to do with the fact that as we are working to push back against systems of oppression our language changes
[18:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1082) right so language models that are trained on old data run the risk of what we call value lock reifying older less inclusive understandings and an example for this um comes from
[18:11](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1091) tremendous work on the black lives matter movement where they found that in the wake of the blm movement there was an increased number of
[18:20](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1100) articles about shootings of black people on wikipedia and furthermore past events were documented and updated
[18:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1108) and all of that was done with less of a white gaze and so if you had your language model trained on stuff prior to the black lives matter movement you would not therefore have this
[18:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1118) updated more inclusive view of the world included in the language model it's worth noting in this case that um there's plenty of things that happen um that would be valuable to include in
[18:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1130) a better sort of viewpoint of the world but don't get covered in the media because they are less dramatic and so there's an additional bias that creeps in that way
[18:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1139) um so given that the data that language models are trained on over represents hegemonic views the language models are therefore going to
[19:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1148) encode those views um one possibility is to think about retraining or fine-tuning to try to mitigate that and there's a really interesting
[19:17](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1157) initial proof of concept that's come out from open ai by saliman and denison where they find that they can reduce although not eliminate um by doing some fine-tuning um with
[19:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1169) some very carefully carefully curated data um representing uh sort of the viewpoints they would like to see given a particular social context
[19:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1179) um i say it's a partial proof of concept um because they were able to show a reduction in toxicity and also some human evaluation
[19:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1188) found that the text was better in that sense but that evaluation wasn't grounded in what kind of harm would this be doing in the world and what we need to do to make it
[19:57](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1197) safe but definitely interesting proof of concept um and it absolutely turns on careful curation of that fine-tuning data
[20:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1204) and then finally this point about value lock and how language models reify older less inclusive understanding um is echoed in a recent wonderful paper by birhani at all looking at the values
[20:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1213) of machine learning research um where they note that machine learning applied as prediction is inherently conservative in the sense of reproducing existing prior patterns
[20:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1224) all right another set of risks has to do with bias so if you've got that overly hegemonic training data that is going to encode systems of oppression and biases
[20:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1235) um and sure enough we find that if you go looking for it in the lms it's there um so there's a wealth of examples now um i recommend blog.2020 for a critical overview
[20:46](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1246) of the work doing this probing i think they looked at like 149 papers examining um bias in language models and documentation of the problem is a really important first step but not in
[20:57](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1257) itself a solution and we note in our paper that the automated processing steps that are used as part of that biased documentation can themselves sometimes
[21:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1266) be unreliable and there's work by martin sapp and others who find that identity statements tend to come across as toxic if someone just says for
[21:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1276) example i am a black woman because there are so many uses of the phrase black woman in toxic context that simple identity statement itself gets rated by automatic
[21:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1285) processing systems as toxic and so this work has to be done very carefully furthermore if we're going to be probing for bias as a prerequisite for doing something about it
[21:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1294) um we have to know what biases we're looking for and what social categories um are the marginalized ones and that absolutely requires local input for the context of
[21:45](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1305) deployment of the technology and one of the interesting things about high resource languages is english in particular is that it is used across many many
[21:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1312) different societies in many social contexts and so one person trying to fine-tune a system um can't fine-tune it or one team in one
[22:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1320) location can't fine-tune it for all of the possible deployment contexts in english and salim and denison are very clear about that and i appreciate that um so one question that we frequently
[22:11](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1331) get asked given the title of this paper the subtitle is okay how big is too big why where should we stop um and the answer is not a specific number um
[22:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1339) but rather a question of documentation so our recommendation is at the beginning of a project where you are collecting a data set to budget for documentation
[22:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1347) and only collect as much data as can be documented because that documentation so this is along the lines of data sheets or model cards or data statements
[22:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1356) um can allow people to understand sources of bias and develop potential mitigating strategies and if there is no such documentation if we don't know what's in the data
[22:45](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1365) then we have the potential for harm without recourse and we refer to this as documentation debt which is the case where data sets are both undocumented and in fact too big to
[22:54](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1374) document post hoc you have this debt that you're carrying and there's risks embedded in there and you can't see very well what they are because you don't know what's in the
[23:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1382) data all right the next category of risks has to do with research trajectories um the last few years have been very exciting in some ways in nlp as we've
[23:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1392) seen you know the state-of-the-art scores on various leaderboards just routinely rapidly broken particularly in tasks that are meant
[23:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1399) to test for natural language understanding but there's also been work showing that when language models are doing really well in these tasks they're actually
[23:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1407) just picking up on spurious data set artifacts and furthermore i've argued elsewhere with alexander kohler that if you're going to train a system only on
[23:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1415) linguistic form the meaning is actually not in that training data and so if the language model can apparently win at some natural language
[23:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1424) understanding task it's not because it doesn't have access to meaning and so if we've done that if we've managed to basically bulldoze all these various nlu leaderboard tasks
[23:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1435) using language models are we actually learning something about machine language understanding or are we just going down a rabbit hole um so
[24:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1446) i will have more to say about research time as a valuable resource on the later slide that's what i was looking for um finally i want to talk about the potential harms of synthetic language
[24:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1458) in the sense that i introduced at the beginning and at this point i get to tell you what the phrase stochastic parrots actually means from linguistics and psychology we learn
[24:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1467) about how human human interaction is co-constructed so when i am speaking to you um i am doing my best to model your understanding of what's going on and
[24:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1476) craft what i'm saying to match that obviously quite difficult um in this context i can only see the size of the audience and make guesses as to who you are um
[24:45](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1485) but conversely you have your guesses as to who i am and what i'm trying to do here and so forth so therefore in that together we are starting to construct a shared model of
[24:54](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1494) the world obviously in face-to-face one-on-one conversation this happens in a much more tightly integrated seamless fashion in contrast
[25:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1501) a language model is a system for haphazardly stitching together linguistic forms from vast training data without any reference to meaning without any reference to communicative intent
[25:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1510) or co-constructing a model of the world and so we call it a stochastic parrot nonetheless as humans whenever we encounter speech or text or sign in a language
[25:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1522) that we are proficient in we can't help but make sense of it so when we encounter synthetic text stitched together by one of these stochastic parrots we still make sense
[25:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1531) of it in other words coherence is in the eye of the beholder so what follows from that well in the first place
[25:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1541) when you come across as a speaker let's say of english some hate speech or other more subtle denigration or stereotyping language in english you
[25:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1552) can't help but interpret it and if that denigration is integration of an identity category that you hold then you are going to have the emotional response to that perfectly naturally
[26:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1561) similarly if it is not hate speech about you um but it might reinforce ideas that you hold that raises the risk that you're going to enact harm on bystanders who
[26:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1570) hold that identity category so that's one potential harm to do with synthetic text another is the possibility that people can deliberately
[26:20](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1580) use these systems to create synthetic text to do harm in the world and then mcguffie and newhouse produced a study about how i think it was actually gpt2 could
[26:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1589) be used um to boost extremist recruiting maybe gpt3 anyway somewhere in there not the latest and greatest language models by now um but good enough to
[26:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1598) create text to populate message boards where people would feel less alone in starting to adopt extremist ideology another thing language models do is they
[26:47](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1607) make the output of something like machine translation sound more fluent and when it sounds more fluent um we are more likely to think that it's
[26:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1615) actually accurate and therefore we can attribute the wrong meaning to the initial human author in the other language so all of those harms have to do with
[27:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1626) humans encountering text generated by computer without commitment to its actual veracity or appropriateness in context and interpreting it as we do because
[27:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1635) we're humans and it's our language and there are other harms um so language models can be probed to replicate training data for personally identifiable information this was shown
[27:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1645) by carlini at all last year and language models can also function as hidden components influencing things like query expansion and results and so all of those biases
[27:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1655) that have been picked up by the language model can then be used um to be replicated for example under the hood in a search engine
[27:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1664) where this seemingly objective computer gives you back denigrating answers such as noble 2018 documented for google searches um in the last
[27:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1675) decade around identity categories so many different potential harms that are all worth thinking about so what do we do about this well some risk
[28:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1684) management strategies i mean here's where i said i would come back to this notion of um research time being valuable because our research time is valuable we
[28:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1692) should allocate it carefully and that means doing things like incorporating energy and compute efficiency and planning and model evaluation
[28:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1698) so that as we're spending our time choosing how to do our research we are doing it in ways that are also minimizing environment
[28:26](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1706) environmental impact and maybe actually maximizing our ability to do this work in an environmentally friendly way and we should select our data sets intentionally rather than just
[28:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1715) grabbing everything that's accessible and here we're very inspired by this quote from berhany and prabhu who are in turn inspired by ruha benjamin feeding ai systems on the world's beauty
[28:46](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1726) ugliness and cruelty but expecting them to reflect only the beauty is a fantasy and so what do we do instead of just grabbing everything we think about what we need
[28:54](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1734) for our use case and we build our data sets intentionally as we're doing that we should be documenting the process that we followed the data that we collected our
[29:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1742) motivations for doing so and thinking about potential users and other stakeholders so that we can then do informed analyses um
[29:11](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1751) along a variety of well-established practices so one is called pre-mortem analyses and that's where you consider what are some possible worst cases
[29:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1758) and how would that come about and then what can i do to head that off and there's a bunch of other techniques from the school of thought called value
[29:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1768) sensitive design that involves identifying stakeholders and thinking about what are their values and how does this technology
[29:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1775) interact with them hopefully to support their values in that light we um challenge ourselves to say okay we are asking people to make a change
[29:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1784) we're asking people to slow down and possibly back off from this large language model pathway are there risks of that change what about the benefits of large language
[29:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1792) models like for example improved auto captioning um which is certainly a useful thing in many contexts um so to that we ask are large language
[30:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1800) models in fact the only way to get these benefits and what about cases where you're working with a lower resource language or a time and processing constrained
[30:07](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1807) application and what i found looking briefly into the speech processing literature is that actually a lot of the work is looking at lower resource
[30:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1816) approaches precisely because you don't always have the time to do all the processing that the large setups would require um another question to ask is are there
[30:26](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1826) other ways that if we are going to use large language models that the risks have been medicated so that we could still use them and use them more safely and so for example things like
[30:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1834) watermarking synthetic text so that we are in a position of people to know when they are encountering something generated by a human rather than a generated by a human or
[30:43](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1843) generated by a machine and then finally i think it's worth being part of a policy discussion about how to do effective regulation in the development
[30:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1853) and use of large language models and i say being part of that discussion because effective policy requires people who understand the technology people who understand
[31:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1862) the ways in which communities are affected by that technology and people who understand how to write effective policy um and i certainly um am not a policy maker
[31:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1872) myself um and i think many people on this call might also not be if you are wonderful thank you welcome let's be in conversation
[31:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1879) so i'm going to end with the same set of questions i started with are ever larger language models inevitable or necessary what costs are associated with this
[31:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1887) research direction and what should we consider before pursuing it do the field of natural language processing or the public that it serves in fact
[31:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1894) need larger language models if so how can we pursue this research direction while mitigating his associated risks and if not what do we need instead and there
[31:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1904) is the link for the slides once again if you didn't get at the beginning and wish you had and um that is the end of this presentation thank you so much
[31:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1910) for listening fantastic thanks so much emily there was a great talk highlighting a lot of really important things for us to think about with
[32:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1920) respect to language models um so we're going to come back to emily soon but first we're going to give each of our distinguished panelists just uh two to three minutes
[32:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1929) to to give some quick thoughts on what we've heard and first up we have zach kenton who's a research scientist in ai safety at deepmind mainly
[32:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1938) interested in specification and alignment zach yeah thanks uh and and thanks about emily for the brilliant presentation um on your very important work um i
[32:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1948) really love the appearances of the parrots uh throughout and um i think the you had a very broad scope in your investigation which i really
[32:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1955) liked um yeah i wanted to echo your point um about selecting data sets intentionally um i think that's a really important point
[32:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1964) um and also you know something that appears in my work is um trying to have humans in the loop so that uh they're there to try and uh kind of sense check or be there as a
[32:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1975) safety guard throughout training um yeah i wanted to pick up on a couple of points um and try and like relate it to some of
[33:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1986) the work that i've been doing recently so um i think um i have a lot of kind of complimentary um views
[33:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=1994) to to to to to what you had in this paper and um i think in my most recent work i've been looking more at kind of the first order or like
[33:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2004) direct arms um rather than these kind of uh secondary effects you know such as environmental and financial costs and i do think those are
[33:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2012) really important but it hasn't like been the main focus of my work but um i think areas of overlap and things i'd love to discuss with you are
[33:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2022) things around kind of what we can do about trying to avoid harmful outputs such as bias and discrimination stereotypes but also some other bits like um how do
[33:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2032) we stop um these models from lying to us or deceiving us or manipulating us um and and so yeah i'm kind of interested in
[34:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2040) in those kind of threats and uh ways to detect them and to mitigate them um and you know i'm especially trying to come from this framing of
[34:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2050) you know it it's not like the designers of these systems are bad people or anything it's more that they kind of make mistakes or accidentally misspecify what
[34:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2058) they want from the system and then you know the resulting uh threats kind of happen um after that um yeah and uh i just wanted to pick up on
[34:30](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2070) on one point in terms of the title and and kind of thinking about is is bigger or always better and for me this this isn't necessarily the crux it's more about the
[34:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2079) competencies of the of the system rather than you know how many parameters or how large was the data set that it was trained on and
[34:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2088) with those competencies come different kinds of threats and we need to understand how competent our systems are and and whether those competencies are
[34:56](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2096) in line with what we want our systems to do and so yeah i'll i'll finish there and would love to discuss with you further on on lots of those points and any others that come up
[35:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2104) so thanks fantastic point zach i'm sure we'll get into important questions of how you can try to figure out competence and you know the issue of lying and manipulation is i
[35:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2115) think a super interesting one um so next we have anjali mazander who is the theme lead on ai and justice and human rights at the turing angelique we'd love to hear your
[35:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2124) thoughts thank you adrian um and thank you emily for a great presentation um and and zach for your um comments uh i guess i really wanted to echo and sort
[35:37](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2137) of um empathize on the um risk strategies from my own perspective and an approach that i have tried to take in my own work and in particular thinking about things from
[35:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2149) a pre-mortem perspective and how we can really sort of interrogate and ask questions beforehand to think about sort of downstream um consequences and also just understanding
[36:05](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2165) who's interacting with the system so what the data is based on and then who's interacting with the system which may not be the same
[36:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2175) group of people and i actually have more questions and probably answers and one of them is um i hadn't really thought about things
[36:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2188) from the uh financial or environmental perspective either um i've really thought about questions from an equality and human rights
[36:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2198) perspective and inclusion uh as part of that uh but one of the things that i think we face sometimes as researchers is that there's a push on
[36:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2208) sort of an out this output whatever however you want to define that um how would you sort of suggest we incentivize to consider um all of these questions
[37:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2222) and issues right at the forefront um and the other question probably comes at the more policy regulate regulatory perspective but
[37:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2235) the the other um area of work for me has been when um scientific evidence goes to court and the results of algorithms which we you know we've seen them in some
[37:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2248) instances they're increasingly probably going to happen so who's responsible for that um there's researchers who develop methods and models but
[37:40](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2260) they're then tools that are based on that research they're not necessarily the same people the data set in terms of who's curated it
[37:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2269) and these are all questions that i'm thinking about and just wondering um what your thoughts are on that thanks so much anjali really great questions and our final panelist
[38:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2283) is professor anne cope stake from university of cambridge and is the head of the computer science department and an expert on computational models of human language
[38:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2292) with i believe a particular interest in semantic competence and um so thank you so much for the well for the paper and um also for giving this talk of course
[38:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2304) there's so many things in the paper and there's so many angles that one could could go into i want to perhaps ask one question which is whether we should really
[38:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2318) be careful about distinguishing the uses that language models are being put to because i was looking at the closed captioning that the transcription that was going on
[38:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2328) and the way that that has improved over the years is absolutely fantastic um i mean the one place where i noticed switching it on and off but the one place i noticed it got it wrong
[38:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2339) was when you said hue to a hegemonic viewpoint um which it clearly hasn't heard very much of but i mean but this is a this is really a massive advance and
[39:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2348) massively helpful but that type of thing is very different in i think from claiming that the language models
[39:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2358) are capturing meaning and i think there's different ways we could draw some of these things out one is that actually it's really quite easy potentially
[39:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2369) to evaluate on transcription we can tell whether it said something that's right or not whereas with many of these so-called meaning-based tasks as
[39:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2379) people are discovering it's not at all easy the second thing is that i think that there's a set of tasks which are to do with genuine language understanding
[39:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2390) where actually much smaller language models will work very well and that's partly based on research that we're doing in my group which is
[39:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2399) what the um paper with well not my group actually um people that i'm associated with are doing some people in cambridge other people like orally
[40:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2410) who are not in cambridge anymore or at least in toronto and she's the main author of that paper that i put the link to and there's lots of things that we you
[40:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2419) know in that paper but one thing that i think is really important is that a much smaller language model trained on potentially very highly curated data
[40:30](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2430) could with more structure in it can actually be on some of these more these tasks facing more natural language understanding could actually do very well so i don't
[40:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2441) want us to end up as a field in the sort of situation where we go down the um stochastic parrot route for language understanding
[40:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2452) tasks partly because i don't think it will work very well um so i want to sort of you know raise the question it also relates to something that zach said
[41:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2461) about competency about whether we should be very careful about talking about the different tasks that language models are doing and distinguishing say from transcription
[41:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2469) which we can evaluate and which crucially people do not think that there's a human behind the transcription i assume i mean if you see this thick stuff
[41:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2478) coming up and it's almost perfect but the way it changes is very cool you don't think of that you don't model that as a human whereas when you've got something like
[41:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2488) alexa or siri or something then i think you are forced to model that as somewhat human-like and i think that that
[41:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2496) is very dangerous potentially for all sorts of reasons including all the ones you're bringing in with the language models so i wonder whether we should actually
[41:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2504) be talking about that and the differences between those types of tasks a bit more um yeah and there's huge numbers of other things i
[41:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2513) could survey but i do want to recommend that people read your um paper with alexander collar as well as the stochastic parrot paper because i found that very
[42:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2522) um enlightening and very amusing as well thanks brilliant lots of food for thought and emily you've been listening patiently to all that
[42:11](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2531) um are you happy to to respond to pick bits that you'd like to respond to yeah i mean i i would i would love to have hours to chat with this group of people because
[42:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2539) um i really appreciate these perspectives and there's a lot to say um but one sort of theme that i've noticed or that i that i want to pull out of this
[42:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2547) is is i'm building on what am just saying um specificity right so um zach talks about competencies um and anjali talks about um who's going
[42:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2558) to be interacting with the system and who's building it and ann talks about well let's think about particular tasks and i think that that is
[42:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2564) one of the problems with scale that we have seen with the large language models right so it's more parameters more processing time more energy more data
[42:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2573) but also this sort of push to generality that we're supposed to use it for everything and it's one size fits all and that makes it much harder to answer these questions
[43:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2581) right so how do we test what it's actually doing we need some specificity we need particular tasks that are understandable and where we can say
[43:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2589) you know if the system has done well on this we know why um or we at least you know we have reason to believe it it isn't just manipulating forms to get something that
[43:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2598) looks like the right answer um and um if we're talking about i mean if you're creating policy policy has to be general right but i think grounding these discussions
[43:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2609) of um who's responsible for what parts of the system in terms of um specific types of tasks and systems will help get us to a point
[43:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2619) where we can build general policy um and i um and then around this is i think anjali again talking about how do we incentivize research
[43:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2628) that engages with these issues rather than you know the current system which is you know if if you've um hit the state of the art on some
[43:58](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2638) leaderboard then there's a sort of sense that you deserve a publication out of that um which really does not make for very very many durable contributions right um something that i
[44:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2648) picked up somewhere and i wish i could find the credit for was um the pithy statement that um if you're worried about getting scooped you're probably not asking a
[44:17](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2657) very interesting question right if it's something that lots of other people could be doing at the same time why are you putting your work there right and so i encourage people that i'm
[44:26](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2666) working with to think about okay what perspective do i have what can i individually really contribute here um based on you know what expertise i bring based on the milieu that i find
[44:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2675) myself in um that is going to contribute to the conversation rather than just being part of that race to the to the top
[44:43](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2683) only to get you know passed over to the next time in the next lap around that race um so how do we incentivize that um i think a lot of that has to do
[44:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2692) academically in terms of our reviewing processes and sort of what we value as reviewers and i see a lot of people who speak as though they would like to see this
[45:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2704) change um and i see a lot of review forms that start asking these questions but there's still this really um difficult bass line to get around which
[45:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2713) is that well if soda then publish like then it deserves publication so i think we need to really raise the bar on what counts as publishable but that is not going to solve
[45:21](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2721) everything because this isn't just happening in an academic context and so we have you know all of the stuff where there is um corporate incentives
[45:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2732) um and to this i want to come around to zach's point about accidental misspecification um which i think comes from a place of saying it's not that researchers are
[45:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2742) trying to build evil things right um but framing it in terms of accidental misspecification i think takes some of the
[45:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2752) um the blame in effect away from the corporate profit incentives that are really driving a lot of this um and so when we're looking at things that end up misspecified
[46:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2763) first of all i think it really helps to get specific about the task you know what is it that we're that we are specifying in particular um and then look at
[46:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2770) what are the um what are the incentives that the person doing that specification had to answer to right and it isn't always just sort of this pure well i'm doing research and so
[46:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2779) i want to make an interesting thing it's oftentimes in the context of um you know what is valued by the corporation where the person works
[46:26](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2786) or the funder you know if the person's in academia they might still be influenced by their funding source and so looking at those systems levels
[46:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2794) issues i think is important too if we want to get to something that is overall safer and i feel like i have not begun to do justice to the interesting
[46:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2801) points that you all raised but i also think that it might be more interesting to switch over to a discussion mode where it's not just me talking so i think i'll end there for now
[46:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2810) i mean there was a there was a brilliant uh way to try to pull together a whole load of things that were brought up i just wonder if i can press on on the topic related to that last point
[46:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2819) so um as angely brought up and you were just discussing there's a there's a challenge in academia to try to motivate and incentivize people to produce
[47:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2828) certain kinds of work and not just try to be a top of the leaderboard and it's it's difficult enough to try to address that but let's suppose you even could address that
[47:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2836) even so you've got big tech firms that are deploying these models and um they're subject to different kinds of incentives where it's it's very tempting for them to
[47:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2847) build a big model they they feel that it's easier perhaps for them to to do interesting things with in some ways i wonder if anyone wants to respond to
[47:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2856) the the institutional factors that might lead a big company towards nevertheless going in this be well being pulled in this direction
[47:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2864) without any notion of ill will and how might we how might regulators or they genuinely try to monitor how dangerous that is and what
[47:56](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2876) could be done about it does anyone want to want to take that anjali anjali then zach um i'll start with um i don't have something
[48:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2893) coherent necessarily but i wonder whether or not it's drawing on um sort of the social corporate responsibility and the environmental sort of the esg's and if there's a way
[48:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2904) from that perspective um to pull on that thread of you know the investor um element to it uh just as as corporations are looking at
[48:40](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2920) you know how they how they do in terms of their esgs could be one way it's a good thought let's suppose would that were to happen who's going to measure and who's going
[48:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2929) to measure what good question zach did you want to suggest something uh yeah i just i think it's um it's a very interesting question about like where are these
[49:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2944) incentives coming from to to use these large language models i mean i think you know you might draw the line between
[49:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2952) say academia and industry but i think even within industry there's different kinds of companies that will have different uh use cases and motivations for
[49:21](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2961) building these systems so you might have uh one kind of company that's more interested in it kind of as a scientific artifact and trying to probe it and understand it and um you
[49:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2971) know certainly from from my work that's that's where i'm coming from with it to you know to have these things and to try and understand and
[49:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2979) make it better and make it safer on the other hand you might have some some companies that you know have a specific application of it in mind there'll be uh profit based incentives
[49:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=2990) um for doing that one thing on on that side is that then there's a bit of a tension between uh the kind of generality aspect um which uh which emily um was speaking
[50:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3001) about in terms of you know these language models are supposed to be the catch all they're supposed to be able to do everything um but that that might be like a
[50:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3010) double-edged sword and it may not actually be um the best uh technology for the specific use case that a company might have so it might actually be that
[50:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3019) these you know for for some uh kind of profit-based uh incentives this may not be the way to go um and so i think it's going to be interesting to see how this plays out
[50:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3028) um uh and that that tension in between the the generality and and the use case and a lot of the times that we see um kind of troubling outputs from these
[50:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3039) large language models is when uh we give it some kind of prompt which kind of hints to it that it it it should be kind of completing in a way that's
[50:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3049) uh that's that's not right so you know if you if you prompt one of these systems with something that sounds like something you might find on like a forum for like far-right
[50:58](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3058) um extremism or something then it will often respond in a similar way and so um the generality of these systems is that they they could potentially um
[51:10](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3070) respond in a wide variety of styles it's just that those that's a double-edged sword that's that may not be appropriate for what you want to do um so yeah i just wanted to pick up on
[51:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3078) that point um and i wonder how different um academia and research-based companies really are because um at least in the sort of mainstream
[51:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3095) of our field we've got into this situation of being so driven by these tasks um in a way you can actually sort of analyze that as though this is you know
[51:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3109) the profit motive in in academia getting your paper into acl or whatever and a lot of companies aren't actually even trying to make money they're trying to get bought out by somebody else
[52:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3120) and the way to do that is to get publicity so it's not so different perhaps in in in some cases and i think that sort of analysis is in a way if a company were really trying
[52:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3133) to do something profitable with some of these language models they might not be behaving in the in the way they are um i'm not sure that you know it's really sensible to be doing some of
[52:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3142) this stuff for some of the tasks uh as i say i think that you know much smaller data might actually turn out to
[52:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3151) in with a more detailed structure might turn out to be much better for natural language understanding but once you get caught in this loop which academia is caught in just this way
[52:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3161) same way as companies it's very hard to get out of here that's really interesting i wonder if we can think about that perhaps with regard to a particular very recent
[52:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3170) example here your thoughts about that which um i don't know if you've seen the paper that i think maybe come out today from open ai on codex
[52:57](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3177) did you did you see this i've seen a few nodes and i don't know if you saw it there's maybe emily and zach you did see it couldn't comment but i'll i'll give a
[53:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3184) very uh short high level summary which is that open ai took their big language model and then they um
[53:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3192) they fine-tuned it on the task of trying to turn what they call doc strings which i believe is meant to be a way to describe what you would like a program
[53:23](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3203) to do so they take a doctrine and they turn that into code and actually they also go back the other way which is an interesting thing but what they showed is that just taking
[53:32](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3212) the regular their regular pre-trained language model a little bit of fine-tuning and then with a few other little tweaks they come up with
[53:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3219) they did spectacularly well on this task and i'm just giving that potentially as an example to show that that it seems like maybe there indeed are real commercial pressures towards
[53:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3229) using these big language models because they seem to be able to do remarkable things with just little tweaks um emily zach what do you think about that
[53:57](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3237) so i want to jump in i actually have not read the paper i saw the paper came out today but you know it's only 9 a.m here so it hasn't been a lot of today yet um
[54:05](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3245) but there was a bunch of twitter chatter about copilot right which is the um sort of implementation of this in um i mean it's github right and
[54:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3256) apparently behind copilot they took all of the public data on github as training data and this raises really interesting questions about
[54:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3265) um the use of data in that way so this this practice of just grabbing data because it is accessible and not thinking about um norms and licenses and things like that and people
[54:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3276) are starting to raise a stink about the fact that a lot of that data sort a lot of that code was released under gpl um and so the question is what does that
[54:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3284) mean for further code that was written with the assistance of copilot if some of the things that get inserted come from gpl sources
[54:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3293) um and it's not that we it's new to be grabbing things sort of without thinking much about usage rights and licensing but it's a new
[55:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3302) set of impacted stakeholders who might be motivated to raise the stink in a way that hasn't happened in the past so i'm sort of curious to see how that unrolls in a policy perspective
[55:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3312) right in some ways arguably maybe to an intellectual property lawyer this is a bit like musicians who grab parts of people's
[55:18](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3318) songs and use them in different ways but in some ways it's quite different exactly do you want to want to comment yeah um similarly i haven't read the whole paper
[55:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3328) just had a quick skin through earlier today i wanted to highlight here that what i really like to see is there's a long extended section on the broader impacts and
[55:37](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3337) hazard analysis which i think is really great to see and it i think it sets a really good norm for um publication style and i would really
[55:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3344) like to to see others adopting that as well um and in particular you know so that you know they have this in the main paper and then they also have appendices
[55:54](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3354) um i haven't read them in full yet but um at least one of them is um around this this idea of misalignment um that i i mentioned a little bit earlier
[56:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3363) about like you know you kind of you have to tease out the the kind of continuations that you want to see from the model you have to kind of prompt it in the right way to
[56:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3373) get that and one of the things in this use case for for generating code um if they give it a prompt which maybe contains some buggy code then they'll get bugs
[56:23](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3383) out from the code that's generated i think that's really interesting to see um and actually this use case is actually quite a good one for trying to measure the misalignment because when
[56:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3394) it's just language it's hard to say oh well you know like this this bit of language is wrong language isn't usually wrong it may just be
[56:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3402) you know the perspective on it um we don't agree with it or something but actually for code when there's uh when there's a task that's specified in the docs string which is kind of
[56:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3412) uh how it's presented in this paper then you can you can say with some objectivity the the code here that's generated is wrong and i think that's really interesting
[57:01](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3421) the other thing that i think is cool here is um going back to this kind of uh notion of deception and how your model might lie to you um they do some
[57:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3432) experiments in their appendix here where um they show that the model does know the correct answer to the uh solution and yet it doesn't
[57:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3442) generate it unless you know they do some some extra things so this is maybe one of our first hints um that uh of a more general phenomenon
[57:33](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3453) that we might see where um a system has a competency and yet it doesn't choose to use it because it's it's it's uh motivation is not in line
[57:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3462) with ours um yeah so that that's kind of my my hot takes on it but i need to read the paper and some of what i said might be wrong so early days
[57:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3470) thanks zach and did you want to compare to that well since i've read the paper i don't want to talk about that but i just want to
[58:00](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3480) indicate worry about the use of the word know and choose here from zach i'm sorry i mean i shouldn't pick up on things like this i've done that i do this sort of stuff myself
[58:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3488) all the time but um i think it's problematic i mean we don't have that we don't have the vocabulary to describe behavior by non-human agents
[58:22](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3502) properly i think or non-um sapient agents probably but you know these models are not even by the standards of what we're doing in other parts of ai
[58:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3514) these models aren't aren't agentive um or do you think they are i mean i guess that's a that's a question but i mean i would say they're not agents
[58:45](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3525) can i push on that a little bit um i think that probably everyone in this panel is probably going to agree with that position and but but i think it's an interesting question for
[58:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3533) for many people the there's a emily explicitly i think said earlier on on this meeting that we're talking about models that are just looking at the form
[59:05](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3545) of language maybe andy you also said that and i guess that also contributes to this notion of that just being stochastic paris they're just taking strings of
[59:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3552) symbols and putting them together without really understanding what they mean but someone might say well maybe that's all humans are doing um on the other hand you could say well humans
[59:21](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3561) are also connecting it with other kinds of sensory input which these machines don't have but someone might say that it's possible that there's enough information in the
[59:30](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3570) huge corpus of language out there that maybe you can learn about real things from the language um and i wonder if anyone wants to take a position on that
[59:40](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3580) emily yes i have a definite position on that so first to the argument of well maybe that's just what humans are doing i find that argument actually very
[59:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3588) dehumanizing because no one's own internal lived experience is that that's all we're doing but if we assume other people are doing that we're basically saying well you're
[59:56](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3596) not as human as i am so i sort of have decided that i'm not going to enter in discussions with people who don't recognize my humanity which i think that that position
[01:00:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3604) does not which you didn't take but you said someone might take um and then in terms of well what if we had all the language ever um and this is what we get into in the
[01:00:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3612) paper alexander kohler and i the um it's called climbing towards nlu i mean that one is the octopus paper where we have something called the octopus test um and um did not put an emoji in the
[01:00:23](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3623) pedal um but in russia's facts should have um and the thought there is it's scale doesn't matter like you can you can do some things with skill that
[01:00:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3631) you can't do without it but you can't get to information that's not in the training data just because you have more and more and more of the
[01:00:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3639) training to do the information's not there it doesn't matter how much of it is there what you can get out of massive scale is really fine-grained modeling of
[01:00:46](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3646) co-occurrence patterns in language and then this harkens back to the notion that um is attributed to wittenstein that so you know a word by the company it keeps
[01:00:56](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3656) or meaning is in um use um but the point is that use isn't just textual distribution use is actually use in situated contextualized communicative intent
[01:01:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3666) and so as we use words and as they come to change meaning and i think ann's point about being careful about things like know and understand and intend
[01:01:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3675) is one of those i think that um there's a general sense of these words that have to do with modeling very closely what humans do and then sometimes people
[01:01:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3684) working on let's say language modeling for nlu or other tasks within ai um use them in a specific way to refer to states of machines that are not directly analogous to
[01:01:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3694) what's going on with people and when you have conversations where not all parties have agreed on what that other meaning is it can go off the rails pretty quickly
[01:01:42](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3702) and i think we have to be coming back around to this question of policy and incentives and things like that because our field is now so much in the limelight because
[01:01:51](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3711) the media likes to talk to us because people are interested we have to be careful to use language in a way that is legible outside of our technical context even when we think we might only
[01:01:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3719) be in a technical context thanks emily and i think i want to come back to um this idea that emily um mentioned and perhaps you know could
[01:02:16](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3736) have could have argued about more with this co-constructed meaning we um [Music]
[01:02:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3745) we really are in a way forced to think of these models as humanlike because they are generating language and i don't think people have fully understood the implications of this
[01:02:37](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3757) it's it's really very deep and it's us it's not the models so um i mean this this you know it i i really think this has has huge implications but
[01:02:50](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3770) coming back to um coming back to sort of some of these things that we're talking about i mean um if we
[01:03:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3783) i'm sorry i'm slightly i'm slightly i'm slightly losing my train of my ability to express this i apologize i mean i think i think it is really hard to talk about
[01:03:13](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3793) these things i mean turing started it by sort of saying mom i'm creating a brain you know i mean the the field has been doing this for many decades ever since
[01:03:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3804) the first computers were um were really being developed but i think i i honestly don't know what to do about it
[01:03:35](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3815) all right i mean i think that talking about these words like no and and so on it's incredibly difficult to avoid them but i honestly do not think i
[01:03:46](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3826) don't think that language models are in the least bit agenda because they're not wired up to be agentive right i think that some other types of
[01:03:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3835) ai model could be agentive i don't think that there's any possibility whatsoever that a language model can be learning everything it needs to learn about the world
[01:04:06](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3846) i mean they're not grounded even if you start relating them to vision and so on that still doesn't give you grounding there's a lot of
[01:04:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3854) discussion we could have about that the example i like to give with my students is to say okay you know i've got a pen on the desk i'm going to do with that what happens
[01:04:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3865) to the pen i mean that's what grounding is about now a dog understands that in some sense a dog is going to understand that if you go
[01:04:34](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3874) with its toy it's going to fall over there um there's there's something sort of there's a very very basic understanding of how the world is and so
[01:04:43](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3883) on there's absolutely nothing about that in language models i do want to say though that i think there may be some types of vocabulary where all there is really is
[01:04:53](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3893) the form um you know abstractions um if you're going to talk about some of these things including many of the things we're talking about right now i guess
[01:05:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3904) i think a language model might be able to learn them in the same way that a human does but those very very basic things there's very the fundamental underlying things
[01:05:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3912) which make us make us human they can't do that there's no there's absolutely no possibility of doing that and it's certainly not not what humans do
[01:05:20](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3920) i mean these sorry just to go say one more thing these language models are being trained on a billion times more data than we could ever possibly hear
[01:05:28](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3928) it's just not a comparable thing we are not training something which is human-like well a billion times more natural language data because we obviously take
[01:05:37](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3937) a lot of data in in other ways but um well you've raised lots of really great questions and we could talk about those for a long time which would be
[01:05:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3944) fascinating but i think we should try to uh ask some of the the great questions that the audience has asked in in the last 10 minutes or so so uh if we could look at some of those
[01:05:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3955) they think that the top the top question here is a question about the environmental cost of language models or even machine learning more generally should
[01:06:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3963) is it fair that we talk about this resource allocation issue with respect to language models um but not really about about other areas of machine learning
[01:06:12](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3972) um what do people think about that so just very briefly i think that um we need to think about environmental costs in everything we do and um to say you know if talking about
[01:06:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3985) it happens first in language models and it's slower in other areas of machine learning i actually don't think that's true i think that the green ai folks are
[01:06:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3991) actually looking across machine learning um doesn't mean that we shouldn't also be thinking about it and similarly if you look you know from machine learning compared
[01:06:38](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=3998) to other areas of science and industry um you know should we you know should we not stop because you know other people aren't stopping well no that doesn't you know
[01:06:47](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4007) we everyone loses that way agreed and there really it has been quite a bit of talk about large models in general not just language models yes anjali did you want to say something
[01:06:58](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4018) just echoing emily but i think if we're talking about risks and harms then we should be it shouldn't just be restricted to the bias and discrimination as we
[01:07:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4028) you know sort of defined um more clearly um and looking at all these other um downstream consequences whether they're director or indirect great good point so we have a question
[01:07:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4044) from uh from carolyn ascherst um thanks for the excellent talk and paper data set curation of language models uh seems extremely challenging is there
[01:07:33](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4053) a fundamental tension between the inclusion of sensitive topics for which we might not trust a stochastic parrot to deal with
[01:07:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4061) properly um and the harms of erasing those perspectives from the model and how should we think about dealing with that problem
[01:07:51](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4071) i guess i'll i'll give a first answer but i hope that my co-panelists have thoughts here um yes this is difficult it is not easy um and i think it's really important to
[01:07:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4079) think in terms of better not best um so it's not possible to create a completely bias-free model or data set um unless i guess if you shrink it down to
[01:08:09](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4089) my data set is about arithmetic problems described in english and i'm not going to use any word problems i think you might be able to construct very small toy worlds where you can say
[01:08:17](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4097) okay this is bias free um but at any any level of sort of interesting application you can't hope for bias free but you can work for less bias and you can say okay
[01:08:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4105) i want to include sensitive topics ideas and terms but i'm going to look for people who talk about them in a sensitive way and i'm going to work with a data scale
[01:08:33](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4113) where i can actually examine the data and pull out cases where i find that someone that i thought was going to be sensitive about this in fact isn't um and so there's there's
[01:08:40](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4120) sort of room to to build something um that is better thank you zach uh yeah i just wanted to uh i think echo that and i guess there's a
[01:08:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4132) parallel between how do we educate people to talk about sensitive topics um it's not like we exclude um all mention of that stuff from them so
[01:09:03](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4143) in a parallel kind of sense maybe uh you know uh we do want discussion of uh sensitive topics to be in our data set we just either need to have them appearing in a
[01:09:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4154) way that we would be happy with it reproducing if we're just going to be doing this kind of language modeling predict the next word
[01:09:20](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4160) or we need to come up with other training objectives or training methods that don't just you know predict the next word or something very simplistic like
[01:09:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4171) that but actually uh capture more what we actually want the the system to do so you know there's an example of this
[01:09:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4179) um where uh there was this kind of summarization paper where they they um it's from open ai as well they had um humans kind of uh
[01:09:49](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4189) rate different summarizations of text which was generated by a language model and then they kind of fine-tuned it using reinforcement learning
[01:09:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4199) so that it was not just predicting the next word given a prompt but it was actually doing something else which was to try and summarize that piece of text and i
[01:10:07](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4207) i don't mean to say that summarization is like the be all and end all or anything but that that kind of general technique um seems like it could be used for many
[01:10:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4215) different applications and one of them could be uh to try and uh reduce um the amount of like uh harmful material that's that's coming out of our models
[01:10:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4225) and that that doesn't mean that we have to eliminate that from the training data set although that would be ideal maybe instead there are these kind of uh
[01:10:33](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4233) post-hoc things we can do it they don't come with guarantees and and i think that that's important to recognize um but doing some empirical
[01:10:41](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4241) investigations of those from a scientific perspective seems like it would be valuable to me um even if that's not something that goes into production because it's you know
[01:10:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4248) still too unsafe um thanks eric anjali um so i just thought i'd um go back to a previous point but bring a context of one of the projects that i
[01:11:02](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4262) have which is looking at sexual exploitation online and so the the language that's used um on um online platforms um and the the the question
[01:11:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4274) or the issue there is is actually trying to determine whether or not um potentially language there is suggesting that um there is something coercive happening
[01:11:25](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4285) versus not uh and and so i should say my postdoc rosa lavelle hill is working on that and what we um find is that you know that this is a real challenging
[01:11:40](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4300) issue but drawing on the the idea of bringing in stakeholders um and community to help on that um understanding what features and and how they should be considered is
[01:11:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4315) part of that process but i think going back to this point around filtering and um potentially value targeted data sets that um
[01:12:07](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4327) open ai um spoke about in their blog too i guess one of the questions that i sort of sit with is well who is determining that value base and how do you
[01:12:19](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4339) you know is it a person is it group how is that brought together how do you know that you sort of brought a sufficient um diverse sort of group of stakeholders
[01:12:29](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4349) to inform on that yeah that's a wonderful question that i think we're going to have we're going to get we're getting close to be to be leaving on that note but let's
[01:12:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4359) give the last um the last minute or so to emily to address that as she likes maybe you can talk a bit more about value sensitive design that you touched
[01:12:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4368) on before if you think that links to this sure yeah so i thank you i am i wanted to actually respond to that because i think that
[01:12:55](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4375) it is a really good question of of how do we as we design these things get the input from people and give people a seat at the table or make sure that the tables
[01:13:04](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4384) you know has seats for people who represent values of the communities they're going to be affected and it's an interesting point because i hear it in two contexts i hear it in
[01:13:15](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4395) the context of how do we do this right and i hear it in the context of see this is impossible and i and i've heard you using the first version of it um and i think
[01:13:24](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4404) that one part of it there and this again comes back to value sensitive design where this idea of better not best and progress not perfection sort of is
[01:13:30](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4410) throughout there um and i think what you can do is you can say um as the open eye folks do this is who we are and this is the context in which we identify these
[01:13:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4419) values and so if you say this was the process by which we brought people together this is how we identified them this is how they identify themselves and that is the context for these values
[01:13:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4428) then by providing that perspective and that documentation you allow somebody else to come and choose to pick up the system or not and choose to deploy it or not or you
[01:13:57](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4437) know if they have it deployed on them they have something to push back against and say hey look this doesn't match our values here and so there's a lot to be gained from documentation
[01:14:07](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4447) um and then i guess sort of the brief thing to say about value sensitive design is that it's not one idea i mean there's this core idea of identifying stakeholders
[01:14:14](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4454) and identifying their values but then there's this just huge array of methodologies for well how do you interact with people to identify the
[01:14:23](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4463) values how do you use them to do some predictive work not just about what the good things are going to be um that comes out of your technology but
[01:14:31](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4471) also what the possible pitfalls are and on and on it's it's not a um it's not a plug and play like okay i've now i've now import value sensitive design okay on
[01:14:39](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4479) right but it's a series of practices um that can be picked up and are all very much grounded in interacting with people and i think this comes back around to a
[01:14:48](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4488) lot of what we've been talking about throughout is that we do better work when it is grounded in particulars and when we um if we're building something that
[01:14:59](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4499) people will interact with especially if it's language where as ann keeps pointing out we can't help as humans but imagine a sentient being on the
[01:15:08](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4508) other side of language because that's what language is for for us how um if we ground it in those specific contexts then we are better positioned to build something um that is understood
[01:15:17](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4517) and safe and deployable in a good way thank you that's i think it'll have to be a good point on which to end uh let's thank all of our speakers as thank thank emily
[01:15:27](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4527) fantastic talk and for raising these important issues along with uh timothy gebrew and meg mitchell and other authors thank you so much and uh thank you to anjali and anne and
[01:15:36](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4536) zach for a great discussion hope everyone enjoyed it thanks a lot for joining us uh i'll just say finally that for those who are interested next
[01:15:44](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4544) wednesday at 3 p.m uk time we're gonna have a talk from nicole turner lee who's going to come and talk about uh algorithmic bias and ai system so
[01:15:52](https://www.youtube.com/watch?v=N5c2X8vhfBE&t=4552) continuing on the same theme so please do join us then if you're interested and again thanks very much to everyone

# Tasks






















