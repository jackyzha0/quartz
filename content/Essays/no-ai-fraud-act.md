---
title: The Media is Wrong about the No AI FRAUD Act
tags:
  - essay
  - legal
  - ai
date: 2024-01-24
draft: false
lastmod: 2024-01-30
---
Here's an AI skeptic's legal take on the bill.

The [No AI FRAUD Act](https://files.constantcontact.com/1849eea4801/695cfd71-1d24-4146-a453-3dab7d49babd.pdf) is a bipartisan House bill introduced by Florida Rep. Salazar and Pennsylvania Rep. Dean that's making waves. Both the [EFF](https://www.eff.org/deeplinks/2024/01/no-ai-fraud-act-creates-way-more-problems-it-solves) and [Techdirt](https://www.techdirt.com/2024/01/23/was-the-no-ai-fraud-act-written-by-a-fraudulent-ai-because-whoever-wrote-it-is-hallucinating/) have published pieces slamming the bill for stepping on the toes of the First Amendment and Section 230. Their pieces only properly address one problematic component of the bill, and completely ignore the positives of its current draft. Could its provisions be worded better? **Absolutely.** But that asks too much of our legislature, and most of the bill would be fine as-is. 

> [!warning]
> CW: uspol, AI
## Summary of the Bill
Please read the [full text](https://files.constantcontact.com/1849eea4801/695cfd71-1d24-4146-a453-3dab7d49babd.pdf) yourself! This summary restructures the text and omits several legal concepts in favor of simplicity. The most important points are bolded. In effect, the bill:
- Establishes a transferable federal publicity right in one's voice and likeness that extends beyond death that **steps past a website's Section 230 immunity** from most suits concerning user content
- Creates a private cause of action against:
	- Proprietors of "personalized cloning services": software with the primary purpose of producing digital voice replicas/depictions
	- Anyone who releases an unauthorized digital voice replica/depiction
	- For both of the above, a disclaimer saying that the person depicted/replicated is not affiliated is not a defense
- Establishes statutory damages for all of the above
- Outlines **a** First Amendment defense 
	- Specifies that this does not affect any judicial First Amendment applications
- Creates a defense of negligible harm and specifies how to determine if harm is negligible
	- But if the replica/depiction is CSAM or sexually explicit, it's harmful in and of itself (and the defense is not available)
## What the Media Ignores
The context that this bill was passed in is helpfully provided as Section 2. The claims in the Findings section check out:
- AI songs and advertisements are rampant.
- [AI has been used to undress high schoolers without consent](https://www.cbsnews.com/newyork/news/westfield-high-school-ai-pornographic-images-students/).
- Nothing is being done about the tidal wave of AI porn of nonconsenting adult women, notably creators and influencers.
	- Twitter's currently being made fun of for its stance against T-Swift deepfake porn, which is ridiculous.

Outside of the Act at hand:
- Current law is not extensive enough to properly regulate AI misuse.
- And overall, there's [mounting concern](https://www.schneier.com/blog/archives/2023/10/ai-and-us-election-rules.html) about how accessible the potential for abuse of AI is.

If we were to evaluate the bill for how well it addresses these problems, I think we'd reach a much different result (not advocating for blindly following this approach without heed to doctrinal side effects though). Instead, the articles choose to sensationalize the faults that *every* bill has regardless of subject matter. The reality is that senators are not perfect (far from it), and cannot anticipate every scenario with a bill. Thus:
#### "Rules are more like guidelines, really."
This analysis looks at the bill by first accepting the proposition that all enacted laws are put through a judicial sniff test, and stretched a little according to the mores of the judge being asked to apply it. This approach is common to all legal critiques on this site.
- Sidebar: there's also a somewhat pressing meta-problem I have with the articles that they outline that they are concerned about *something*, but don't follow the concern to its logical conclusion of spelling out "here's what effect that would have on the everyday citizen," or "here's the historical context that would justify our concern." People who are familiar with this body of law can keep up, but it could be indecipherable to others. I'm going to try to provide that context where necessary. Let me know if it feels like I stop short at any point here.
---
## Audio + Visual
First, let's talk about something the articles properly draw attention to. 

The headline item in the bill is its federal right of publicity in one's voice and image. The primary adverse effect of the bill that pundits (and myself) are watching for is **if it enables new legal arguments/rights outside of AI**, which means that effect would not be in line with the Act's purpose. Making the right of publicity so broad definitely has this effect. However, there is an argument that senators included limiting language elsewhere, which was enough to cabin this right. I disagree with that view, and I think that the causes of action outlined later in the bill text are only one application of this new right. Here are some other possible arguments that could be made to fit under the right-of-publicity umbrella:

For one, this could be used as a statutory justification to federally try state right-of-publicity causes of action. These are typically kept out of federal court, as there are policy reasons for letting the states try the actions they recognize (federalism, juries' attitudes toward parties, perceived legitimacy of the resulting decision, etc). Perhaps more importantly, ***Erie* doctrine** all but abolishes federal common (unwritten/judge-made) law and relegates those causes of action to the states exclusively. If we're asking judges to incorporate what is often state common law into a federal statute, this could be in direct violation of that doctrine.

Another (more out-there) alternative: given that this is specifically labeled as an IP right, courts could read this to preempt state publicity law. Thankfully Congress anticipated this (definitely unfavorable) outcome and included a no-preemption clause; I'll be watching to make sure that makes its way through the amendments as the bill goes through the process.

Even without addressing the duration/transferability of the right, it's definitely too broad. The rest of the bill though, being one application under that right, is not.
## Breadth
**Bottom line up front:** To use a hypothetical, I don't think a judge would interpret this bill to haul Fox into court because Family Guy made fun of Tom Cruise, and Sean Kenin just so happened to record the lines in a modern studio. 

Again, the concern implicit in the articles is that this bill might have adverse effects outside of AI. In a situation like the hypo above: on top of being a plainly unconstitutional application (I'll talk about that more in the First Amendment section), the statute would probably not textually apply at all. 

The arguments made by EFF and the Techdirt article seem to only apply to the replication/depiction offenses and not the cloning service part(since the "primary purpose" language is very hard to satisfy outside of the statute's intent). For those replication offenses, the act defines the key terms as:
- "digital voice replica": audio created or altered in whole or part by computer software; that contains a replica, imitation, or approximation of an individual that was not actually performed by that person.
	- Awkwardly worded for sure.
- "digital depiction": a replica, imitation, or approximation of someone's likeness created or altered using computer software.

> There’s not much that wouldn’t fall into that category—from pictures of your kid, to recordings of political events, to docudramas, parodies, political cartoons, and more. If it involved recording or portraying a human, it’s probably covered.
>
> \- EFF

I disagree. I don't think anything would lead a judge to read "recorded" into "created," especially given the context of the bill. 

First, this would clearly be against Congressional intent. The bill was introduced to combat AI abuse. The sort of "creation" that those offenses entail is when you input/select a prompt/person and the AI creates a voice/likeness in response to the input. Likewise, an alteration by an AI would be the input of a base video and a likeness you wish to "alter" the base video by.

On the other hand, when you sing into a microphone to make a song in Ableton, the computer software isn't what's creating the audio; **you** are creating the sound. I do think that the alteration with computer software argument is easier to make because of things like picture filters and voice post-processing, but judges are typically hesitant to dictate an "even a scintilla of \<insert quantifiable statutory element\>" approach for any statute. That kind of logic lends itself too easily to frivolous or Congressionally-unsanctioned (!!) lawsuits that could toe the line of SLAPP. The EFF's position argues that the only interpretation of this statute is one that would probably be considered **unworkable** by most judges.
- Speaking of credit to judges, I actually think the often-lacking tech literacy of judges makes the no-creation argument easier to make, and easier to push the human-AI divide in who's actually creating. Obviously if a human creates the sound, then it's not created with digital software. And the human element means that you can tell a story and answer an important question: "why?"
## Perfectly Balanced\[?\]
This was a weird one to analyze for me, because the EFF kind of just...Didn't read the balancing test properly? They conflate it with a lot of the broader First Amendment commentary around the bill, which feels distinct from the balance-of-the-harms section (despite its inclusion as a balancing factor). I do agree that **the balance is effectively mini-copyright fair use**. However, it's not precisely fair use for an important reason. Let's go through the exclusive (as opposed to illustrative like in copyright fair use) factors one by one. 
#### Relevance to primary expressive purpose
If this section feels less grounded than the rest, that's because it is. Factors are inherently squishy to analyze, absent lots of time for the doctrine to dig a trench. I think that's what the drafters were trying to leapfrog by lifting from established doctrine, but I question their choice of principle.

This is one of the two fair use factors in this statute's balance. And of the two, relevance feels more at-home when talking about AI use. If you're just throwing an unauthorized AI-generated picture of Prince into your work because it looked good (was that a Warhol reference?), is it really a choice worth protecting? This factor will ensure that if you're risking the harms of making someone say/appear on something they didn't approve, you've at least got a good reason for it. If taken to the extreme, it could require the use of AI to be strictly necessary to the message of your replica. I doubt that extreme would happen, but if it did, then the EFF's treatment of this section as a First Amendment issue would make more sense, since that would absolutely guarantee the AI use in that specific case's status as protected expression. However, factors like this are almost never interpreted to their limits, as courts would rather balance everything than cabin one factor and label it dispositive. Again, factors are squishy. 

If I had been asked to adapt fair use to publicity rights, I would have probably also brought in unfair-competition law by including the market effect factor. There are a lot of cases in competition that cover parties whose content doesn't fit traditional utility-or-authorship models (like the news as news), and the mature  principles there would be some less shaky ground for interpretation compared to the rest of this bill. If that were the case, this balance might be considered the primary part of this bill as opposed to the offenses (like how fair use is the headline issue in copyright actions).

I definitely wouldn't have included the second fair use factor, though.
#### Transformative nature
What place does an analysis of transformation have in generative AI? In my opinion, none. The fact that these works are not a perfect reflection of their subject is the whole danger: that dissonance can cause a . Given this premise, I think the *lack* of transformative nature and instead identically tracking the subject, *i.e.*, closely comporting with something the subject has actually said/done/would endorse/has previously endorsed, would be a better factor.
#### Constitutionally protected expression
This is a First Amendment concern, and it's probably mandatory to interpret it as dispositive as a result. First Amendment defenses are implicit in EVERY statute, so saying it out loud isn't really required. More on this in the [[#The First Amendment Defense|First Amendment]] section.
#### Final Thoughts
I will say, this setup where the two ends of the spectrum are protected but not the middle of the road is very foreign to me. The Act exempts negligible harm on one end, and First Amendment protection for criticism/comment, despite its potential for great harm, is Constitutionally mandated on the other. I'm not aware of other areas of law that have a similarly shaped spectrum. The interesting thing is that with speech, you can make both of these arguments at the same time depending on the content.
## 00230: Incentive to Kill
The background of the Communications Decency Act is important to remember when discussing its applicability to AI. 

The story of Section 230 is damn near close to "and then the Fire Nation attacked." In the internet's early history, websites were frequently sued for the content posted on them by their users. These lawsuits would quite often yield massive returns for plaintiffs despite the websites' best efforts to moderate their content, as courts happily applied our then-antiquated law to find them liable anyway. Section 230 created what's nicknamed the "good Samaritan" provision, where websites that try to moderate objectionable content on their sites cannot be held liable for that content under most federal causes of action (notably with **exceptions for IP law**, criminal law, and specific sexual abuse statutes). 

As an IP right, the Act in its current form is Congressionally excepted from Section 230. Unlike enforcement of many traditional causes of action against websites, and despite what the current journalism around the Act suggests, this creates several incentives for websites that would advance the purposes of the Act, and does not present the same "problematic" scenarios that other proposed carve-outs to Section 230 have in the past.

Most of the arguments against the Act's Section 230 exception assume that the Act is indeed too broad. To proponents of that view, this means websites would now be subject to that broad liability. As explained above, the bill isn't as broad as made out to be. Let's analyze the incentives present in an application of the Act consistent with its purposes.

**Hypothetical:** Under the Act, Elon Musk has a cause of action against YouTube, because many hacked YouTube channels end up hosting 24-hour livestreams of his AI-generated voice and likeness pushing cryptocurrency scams and the like. YouTube tries to moderate harmful content wholesale, so would likely be immune from suit if Section 230 applied.

**Answer**: in such a scenario, the interests probably weigh in favor of a Section 230 exception which would allow Elon to file suit.
- YouTube has no strong financial incentive to remove content:
	- Content allows ad placement.
	- Content drives user engagement for collection of advertising data.
	- Content may alienate users from the platform, but an individual video has made money for YouTube if that user has clicked on it.
- Enforcement against platforms for misleading conduct (which is more likely to be considered harmful under the statute) is beneficial to users of the platform, because they will no longer be targets of that misleading conduct if the platform is forced to disallow it.

And the final nail in the coffin for immunity is precisely that lack of action in the absence of either a partial sword or partial shield. Again looking at YouTube, take a look at their [statement on AI](https://blog.youtube/inside-youtube/our-approach-to-responsible-ai-innovation/) from November. <img src="/Attachments/yt-label.png" alt="Screenshot of a YouTube Short's description with a badge reading: 'Altered or synthetic content.' Credit to YouTube." style="float:left;height: 25em; padding: 0em 2em"> 

They claim a label will be applied by creators to AI videos. Yet it's been two months, and no such label appears on very recent videos like [US Presidents SURVIVE An ALIEN ATTACK In GTA 5](https://www.youtube.com/watch?v=LgG7BnXzkAU). Their mentioned dispute tools are also absent, though we have no way of knowing whether those are truly implemented.

Now look at Apple, who [*still* has no AI policy for the App Store](https://developer.apple.com/app-store/review/guidelines/). Or Google, whose solution is [user labor](https://techcrunch.com/2023/10/25/google-plays-policy-update-cracks-down-on-offensive-ai-apps-disruptive-notifications/).

The simple truth is that a platform will not enforce any standard if not compelled to. Section 230 was ultimately a net positive because it was a nice carrot to goad platforms into enforcing some ground rules, with a tantalizing shield from liability if they did so. The (rightful) fear then was that if held liable regardless of moderation policy, then platforms would not spend a dime on moderation because if just one post slipped through the lawsuit would hit just as hard. The articles fail to mention this important historical fact when they raise the specter of Section 230, despite the credibility it would lend to their arguments. Yet it does not apply to AI.
- And in fact, having zero involvement actually enables websites to make an argument (albeit weakly) that they have *no* control over their users' content. Any moderation at all obviously defeats this argument. This underscored the historical need for an incentive, but now that argument is no longer applicable because of the previous sentence. We can guarantee that platforms will comply with the stick.

Here, we have platforms that publicly state that they can fight the AI onslaught, but with no motivation behind it. Couple that with investor pressure to stay trendy and it's an environment ripe for stagnation. But we're in no danger of platforms abandoning moderation altogether. So when a carrot is no longer enough, it's time for a stick.
### Detour: There is an alternative!
There's an old saying about the evolution of tech:  over the years, you keep what works and chuck what doesn't. With the Act's status as an IP right, we can lift a page from another common IP enforcement mechanism that gets around Section 230: the DMCA. If protecting platforms is truly a concern, why not compel platforms to implement and exercise a takedown tool? This way, they'll have two "strikes" (terrible pun) before being subject to damages. Not expressing any opinion on the merit of the DMCA itself though, I'd need an entire essay to unpack the mess its scheme creates.

This would have the added benefit of resolving some disputes without a court's involvement, which federal district judges will certainly be very thankful for. However, the bill also recognizes that when a case does arise, judges want to do things their way.
## The First Amendment Defense
The final outcry about this section is that it supposedly outlines *one* First Amendment defense, and that:

> It’s actually designed to really limit the 1st Amendment defenses.
>
> \- Techdirt

Notwithstanding the impossibility of a Congressional act canning the First Amendment (thanks *Marbury v. Madison*!), Techdirt's article neglects to mention that subsection 3(i) makes special mention of other First Amendment defenses as a sort of Congressional CYA. That section states:

>Nothing in this Act shall alter the *application by a court* of First Amendment protections in the event such a defense is asserted to \[a claim of unauthorized performance of a digital depiction\].

(emphasis added). This clause is basically just stating the obvious to try and not get the Act struck down, yet the articles still fail to mention it.
- Sidebar: Severability clauses like the one in the Act at §§ 3(h) get followed by the Supreme Court when they concern ancillary clauses like this one. If they hate this defense, it doesn't affect anything else in the statute's merit. I'm just hesitant to use this as a legitimate argument because a bad statute will still have an effect in the background while a case percolates.

With respect to arguments (not seriously advanced by the articles in issue here) that the statute as a whole is an unconstitutional, note that this is not a legal justification essay. If I was going to evaluate the scrutiny arguments and precedent for whether this specific statute would be constitutional facially or as-applied to specific AI and non-AI examples, I'd submit it as a student note to law journals. I will point out, though, that many other categories of speech are given lesser or no protection just by nature of their effect or content (slander because it harms the subject, non-artistic obscenity, etc). My point is that such a hypothetical challenge would be a close case.

Finally, if the content of someone's AI-generated image/audio/whatever is truly for a 1st amendment protected purpose, nothing stops them from just...making their criticism/opinion without digital depictions. For example, I don't think there's some expressive meaning to making Biden say "I'm senile" that just stating your opinion yourself wouldn't convey (unlike images on a t-shirt, which were integral to the point that the student was trying to make in [*Guiles v. Marineau*](https://caselaw.findlaw.com/court/us-2nd-circuit/1101375.html) \[[shirt in question](https://www.thenation.com/wp-content/uploads/2016/02/Scott_Censorship_AP_crop_img-680x430.jpg)\]). Nonetheless, I think reasonable minds could differ on this point, so feel free to let me know your take.
### Detour: Chill, bro
Since the articles focus so intently on the Act's purported cabining of protected speech directly, they don't address the possibility of a chilling effect on speech. I actually think this point has more merit than the complaints about 1a defenses being limited, or an argument that the whole statute is impermissible because of its restrictions themselves rather than their broader effect. In fact, this point would be where the other arguments about the statute being vague/broad would have the most powerful effect.
## Conclusion
Hopefully I've convinced you that there's more to the No AI FRAUD Act than meets the eye. Unlike the Act, I did have to cabin this essay heavily, because the IP nerd in me wants to revive my old RA position and just dive right back into the literature on rights of publicity, privacy, and appropriation. If I did that, I'd end up with a second essay on [[Essays/ai-infringement|AI infringement of IP rights (coming soon)]] and nobody wants that, haha. I definitely have more to say on Section 230, but outright analyses of that statute are kind of stale. If I find something else that it dovetails with, I'll explore it and devote too much of that future essay to it as usual.

I'll be sure to update this page as the bill trudges through the [process](https://www.youtube.com/watch?v=SZ8psP4S6BQ). It'll be interesting to see what provisions that raised concerns for the media and I do get amended or stricken.
## Further Reading
Some excellent reporting on another Section 230 AI Bill™ by the same guy who wrote the discussed misguided article, haha. *This* one wants to strip immunity from ANY AI-related claim from it. That's stupid for the reasons outlined above: there needs to be at least some secondary analysis to fill the gap (which the No AI FRAUD Act does quite nicely—[[#00230: Incentive to Kill]]). [Techdirt - Even If You Hate Both AI And Section 230...](https://www.techdirt.com/2023/12/06/even-if-you-hate-both-ai-and-section-230-you-should-be-concerned-about-the-hawley-blumenthal-bill-to-remove-230-protections-from-ai/)