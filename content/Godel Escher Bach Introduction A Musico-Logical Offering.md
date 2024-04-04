<- [[Godel Escher Bach An Eternal Golden Braid]]

## Godel, Escher, Bach Introduction A Musico-Logical Offering

[ ![[⚙️ Tools/📸 Images/481A7327-038F-40A0-A0D2-62E7A9A71A67.jpeg|150]] ](https://www.amazon.com/G%C3%B6del-Escher-Bach-Eternal-Golden/dp/0465026567/ref=sr_1_1?keywords=godel+escher+bach&qid=1691277402&sr=8-1)

Author: [[Douglas R. Hofstadter]]
Publisher: New York, NY: _Basic Books_.
Publish Date: 1979
Review Date:
Status: #💥/⌛️ 

___

### Annotations

[[Inbox scrap 46]]

___

10

The "Strange Loop" phenomenon occurs whenever, by moving upwards (or downwards) through the levels of some hierarchical system, we unexpectedly find ourselves right back where we started. (Here, the system is that of musical keys.)

11

Many of them have their origin in paradox, illusion, or double-meaning.

15

Implicit in the concept of Strange Loops is the concept of infinity, since what else is a loop but a way of representing an endless process in a finite way?

___

15

In the examples we have seen of Strange Loops by Bach and Escher, there is a conflict between the finite and the infinite, and hence a strong sense of paradox. Intuition senses that there is something mathematical involved here. And indeed in our own century a mathematical counterpart was discovered, with the most enormous repercussions. And, just as the Bach and Escher loops appeal to very simple and ancient intuitions—a musical scale, a staircase—so this discovery, by K. Godel, of a Stange Loop in mathematical systems has its origins in simple and ancient intuitions. In its absolutely barest form, Godel's discovery involves the translation of an ancient paradox in philosophy into mathematical terms. That paradox is the so-called Epimenides paradox, or liar paradox. Epimenides was a Cretan who made one immortal statement: "All Cretans are liars." A sharper version of the statement is simply "I am lying"; or, "This statement is false". It is that last version which I will usually mean when I speak of the Epimenides paradox. It is a statement which rudely violates the usually assumed dichotomy of statements into true and false, because if you tentatively think it is true, then it immediately backfires on you and makes you think it is false. But once you've decided it is false, a similar backfiring returns you to the idea that it must be true. Try it!

___

17

The Epimenides paradox is a one-step Strange Loop, like Escher's Print Gallery. But how does it have to do with mathematics? That is what Godel discovered. His idea was to use mathematical reasoning in exploring mathematical reasoning itself. This notion of making mathematics "introspective" proved to be enormously powerful, and perhaps its richest implication was the one Godel found: Godel's Incompleteness Theorem. What the Theorem states and how it is proved are two different things. We shall discuss both in quite some detail in this book. The Theorem can be likened to a pearl, and the method of proof to an oyster. The pearl is prized for its luster and simplicity; the oyster is a complex living beast whose innards give rise to this mysteriously simple gem.

17

Godel's Theorem appears as Proposition VI in his 1931 paper "On Formally Undecidable Propositions in Principia Mathematica and Related Systems I." It states: 

To every w-consistent recursive class K of _formulae_ there correspond recursive _class-signs r_, such that neither _v_ Gen _r_ nor Neg (_v_ Gen _r_) belongs to Fig (_k_) (where _v_ is the free variable of _r_). 

Actually, it was in German, and perhaps you feel that it might as well be in German anyway. So here is a paraphrase in more normal English: 

All consistent axiomatic formulations of number theory include undecidable propositions. 

17

In this pearl it is hard to see a Strange Loop. That is because the Strange Loop is buried in the oyster-the proof. The proof of Godel's Incompleteness Theorem hinges upon the writing of a self-referential mathematical statement, in the same way as the Epimenides paradox is a self-referential statement of language. But whereas it is very simple to talk about language in language, it is not at all easy to see how a statement about numbers can talk about itself. In fact, it took genius merely to connect the idea of self-referential statements with number theory. Once Godel had the intuition that such a statement could be created, he was over the major hurdle. The actual creation of the statement was the working out this beautiful spark of intuition.

___

18 ❗️

We shall examine the Godel construction quite carefully in Chapters to come, but so that you are not left completely in the dark, I will sketch here, in a few strokes, the core of the idea, hoping that what you see will trigger ideas in your mind. First of all, the difficulty should be made absolutely clear. Mathematical statements-let us concentrate on number-theoretical ones-are about properties of whole numbers. Whole numbers are not statements, nor are their properties. A statement of number theory is not about a statement of number theory; it just is a statement of number theory. This is the problem; but Godel realized that there was more here than meets the eye. Godel had the insight that a statement of number theory could be about a statement of number theory (possibly even itself), if only numbers could somehow stand for statements. The idea of a code, in other words, is at the heart of his construction. In the Godel Code, usually called "Godel-numbering", numbers are made to stand for symbols and sequences of symbols. That way, each statement of number theory, being a sequence of specialized symbols, acquires a Godel number, something like a telephone number or a license plate, by which it can be referred to. And this coding trick enables statements of number theory to be understood on two different levels: as statements of number theory, and also as statements about statements of number theory.

___

18 ❗️

Once Godel had invented this coding scheme, he had to work out in detail a way of transporting the Epimenides paradox into a numbertheoretical formalism. His final transplant of Epimenides did not say, "This statement of number theory is false", but rather, "This statement of number theory does  
not have any proof". A great deal of confusion can be caused by this, because people generally understand the notion of "proof" rather vaguely. In fact, Godel's work was just part of a long attempt by mathematicians to explicate for themselves what proofs are. The important thing to keep   
in mind is that proofs are demonstrations within fixed systems of propositions. In the case of Godel's work, the fixed system of number theoretical reasoning to which the word "proof" refers is that of Principia Mathematica (P.M.), a giant opus by Bertrand Russell and Alfred North Whitehead, published between 1910 and 1913. Therefore, the Godel sentence G should more properly be written in English as: This statement of number theory does not have any proof in the system of Principia Mathematica.

18

Incidentally, this Godel sentence G is not Godel's Theorem-no more than the Epimenides sentence is the observation that "The Epimenides sentence is a paradox." We can now state what the effect of discovering G is. Whereas the Epimenides statement creates a paradox since it is neither true nor false, the Godel sentence G is unprovable (inside P.M.) but true. The grand conclusion? That the system of Principia Mathematica is "incomplete"-there are true statements of number theory which its methods of proof are too weak to demonstrate.

___

19 ❗️

But if Principia Mathematica was the first victim of this stroke, it was certainly not the last! The phrase "and Related Systems" in the title of Godel's article is a telling one: for if Godel's result had merely pointed out a defect in the work of Russell and Whitehead, then  others could have been inspired to improve upon P.M. and to outwit Godel's Theorem. But this was not possible: Godel's proof pertained to any axiomatic system which purported to achieve the aims which Whitehead and Russell had set for themselves. And for each different system, one basic method did the trick. In short, Godel showed that provability is a weaker notion than truth, no matter what axiomatic system is involved.

19

Therefore Godel's Theorem had an electrifying effect upon logicians, mathematicians, and philosophers interested in the foundations of mathematics, for it showed that no fixed system, no matter how complicated, could represent the complexity of the whole numbers: 0, 1, 2, 3, ... Modern readers may not be as nonplussed by this as readers of 1931 were, since in the interim our culture has absorbed Godel's Theorem, along with the conceptual revolutions of relativity and quantum mechanics, and their philosophically   
disorienting messages have reached the public, even if cushioned by several layers of translation (and usually obfuscation). There is a general mood of expectation, these days, of "limitative" results-but back in 1931, this came as a bolt from the blue.

___

19

Mathematical Logic: A Synopsis

19

A proper appreciation of Godel's Theorem requires a setting of context. Therefore, I will now attempt to summarize in a short space the history of mathematical logic prior to 1931-an impossible task. (See DeLong, Kneebone, or Nagel and Newman, for good presentations of history.) It all began with the attempts to mechanize the thought processes of reasoning. Now our ability to reason has often been claimed to be what distinguishes us from other species; so it seems somewhat paradoxical, on first thought, to mechanize that which is most human. Yet even the ancient Greeks knew that reasoning is a patterned process, and is at least partially governed by statable laws. Aristotle codified syllogisms, and Euclid codified geometry; but thereafter, many centuries had to pass before progress in the study of axiomatic reasoning would take place again.

___

19

One of the significant discoveries of nineteenth-century mathematics was that there are different, and equally valid, geometries-where by "a geometry" is meant a theory of properties of abstract points and lines. It had long been assumed that geometry was what Euclid had codified, and that, although there might be small flaws in Euclid's presentation, they were unimportant and any real progress in geometry would be achieved by extending Euclid. This idea was shattered by the roughly simultaneous discovery of non-Euclidean geometry by several people-a discovery that shocked the mathematics community, because it deeply challenged the idea that mathematics studies the real world. How could there be many different kinds of "points" and "lines" in one single reality? Today, the solution to the dilemma may be apparent, even to some nonmathematicians-but at the time, the dilemma created havoc in mathematical circles.

___

20

Later in the nineteenth century, the English logicians George Boole and Augustus De Morgan went considerably further than Aristotle in codifying strictly deductive reasoning patterns. Boole even called his book "The Laws of Thought"-surely an exaggeration, but it was an important contribution. Lewis Carroll was fascinated by these mechanized reasoning methods, and invented many puzzles which could be solved with them. Gottlob Frege in Jena and Giuseppe Peano in Turin worked on combining formal reasoning with the study of sets and numbers. David Hilbert in Gottingen worked on stricter formalizations of geometry than Euclid's. All of these efforts were directed towards clarifying what one means by "proof".

20

In the meantime, interesting developments were taking place in classical mathematics. A theory of different types of infinities, known as the theory of sets, was developed by Georg Cantor in the 1880's. The theory was powerful and beautiful, but intuition-defying. Before long, a variety of set-theoretical paradoxes had been unearthed. The situation was very disturbing, because just as mathematics seemed to be recovering from one set of paradoxes-those related to the theory of limits, in the calculus-along came a whole new set, which looked much worse!

___

20

The most famous is Russell's paradox. Most sets, it would seem, are not members of themselves-for example, the set of walruses is not a walrus, the set containing only Joan of Arc is not Joan of Arc (a set is not a person)-and so on. In this respect, most sets are rather "run-of-the-mill". However, some "self-swallowing" sets do contain themselves as members, such as the set of all sets, or the set of all things except Joan of Arc, and so on. Clearly, every set is either run-of-the-mill or self-swallowing, and no set can be both. Now nothing prevents us from inventing R: the set of all run-of-the-mill sets. At first, R might seem a rather run-of-the-mill invention-but that opinion must be revised when you ask yourself, "Is R itself "a run-of-the-mill set or a self-swallowing set?" You will find that the answer is: "R is neither run-of-the-mill nor self-swallowing, for either choice leads to a paradox. Try it!

20

But if R is neither run-of-the-mill nor self-swallowing, then what is it? At the very least, pathological. But no one was satisfied with evasive answers of that sort. And so people began to dig more deeply into the foundations of set theory. The crucial questions seemed to be: "What is wrong with our intuitive concept of 'set'? Can we make a rigorous theory of sets which corresponds closely with our intuitions, but which skirts the paradoxes?" Here, as in number theory and geometry, the problem is in trying to line up intuition with formalized, or axiomatized, reasoning systems.

20

A startling variant of Russell's paradox, called "Grelling's paradox", can be made using adjectives instead of sets. Divide the adjectives in English into two categories: those which are self-descriptive, such as "pentasyllabic", "awkwardnessful", and "recherche", and as "edible", "incomplete", and "bisyllabic". Now if we admit "non-selfdescriptive" as an adjective, to which class does it belong? If it seems questionable to include hyphenated   
words, we can use two terms invented specially for this paradox: autological (= "self-descriptive"), and heterological (= "non-self-descriptive"). The question then becomes:  "Is 'heterological' heterological?" Try it!

___

21

There seems to be one common culprit in these paradoxes, namely self-reference, or "Strange Loopiness". So if the goal is to ban all paradoxes, why not try banning self-reference and anything that allows it to arise? This is not so easy as it might seem, because it can be hard to figure out just where self-reference is occurring. It may be spread out over a whole Strange Loop with several steps, as in this "expanded" version of Epimenides, reminiscent of Drawing Hands:  The following sentence is false. The preceding sentence is true. Taken together, these sentences have the same effect as the original Epimenides paradox: yet separately, they are harmless and even potentially useful sentences. The "blame" for this Strange Loop can't be pinned on either sentence-only on the way they "point" at each other. In the same way, each local region of Ascending and Descending is quite legitimate; it is only the way they are globally put together that creates an impossibility. Since there are indirect as well as direct ways of achieving self-reference, one must figure out how to ban both types at once-if one sees self-reference as the root of all evil

___

21

Banishing Strange Loops 

21

Russell and Whitehead did subscribe to this view, and accordingly, Principia Mathematica was a mammoth exercise in exorcising Strange Loops from logic, set theory, and number theory. The idea of their system was basically this. A set of the lowest "type" could contain only "objects" as members-not sets. A set of the next type up could only contain objects, or sets of the lowest type. In general, a set of a given type could only contain sets of lower type, or objects. Every set would belong to a specific type. Clearly, no set could contain itself because it would have to belong to a type higher than its own type. Only "run-of'-the-mill" sets exist in such a system; furthermore, old R-the set of all run-of-the-mill sets-no longer is considered a set at all, because it does not belong to any finite type. To all appearances, then, this theory of types, which we might also call the "theory of the abolition of Strange Loops", successfully rids set theory of its paradoxes, but only at the cost of introducing an artificial-seeming hierarchy, and of disallowing the formation of certain kinds of sets-such as the set of all run-of-the-mill sets. Intuitively, this is not the way we imagine sets.

___

21

The theory of types handled Russell's paradox, but it did nothing about the Epimenides paradox or Grelling's paradox. For people whose interest went no further than set theory, this was quite adequate-but for people interested in the elimination of paradoxes generally, some similar "hierarchization" seemed necessary, to forbid looping back inside language. At the bottom of such a hierarchy would be an object language. Here, reference could be made only to a specific domain-not to aspects of the object language itself (such as its grammatical rules, or specific sentences in it). For that purpose there would be a metalanguage. This experience of two linguistic levels is familiar to all learners of foreign languages. Then there would be a metametalanguage for discussing the metalanguage, and so on. It would be required that every sentence should belong to some precise level of the hierarchy. Therefore, if one could find no level in which a given utterance fit, then the utterance would be deemed meaningless, and forgotten. An analysis can be attempted on the two-step Epimenides loop given above. The first sentence, since it speaks of the second, must be on a higher level than the second. But by the same token, the second sentence must be on a higher level than the first. Since this is impossible, the two sentences are "meaningless". More precisely, such sentences simply cannot be formulated at all in a system based on a strict hierarchy of languages. This prevents all versions of the Epimenides paradox as well as Grelling's paradox. (To what language level could "heterological" belong?)

___

22

Now in set theory, which deals with abstractions that we don't use all the time, a stratification like the theory of types seems acceptable, even if a little strange-but when it comes to language, an all-pervading part of life, such stratification appears absurd. We don't think of ourselves as jumping up and down a hierarchy of languages when we speak about various things. A rather matter-of-fact sentence such as, "In this book, I criticize the theory of types" would be doubly forbidden in the system we are discussing. Firstly, it mentions "this book", which should only be mentionable in a "metabook"-and secondly, it mentions me-a person whom I should not be allowed to speak of at all! This example points out how silly the theory of types seems, when you import it into a familiar context. The remedy it adopts for paradoxes-total banishment of self-reference in any form-is a real case of overkill, branding many perfectly good constructions as meaningless. The adjective "meaningless", by the way, would have to apply to all discussions of the theory of linguistic types (such as that of this very paragraph) for they clearly could not occur on any of the levels-neither object language, nor metalanguage, nor metametalanguage, etc. So the very act of discussing the theory would be the most blatant possible violation of it!

___

22

Now one could defend such theories by saying that they were only intended to deal with formal languages-not with ordinary, informal language. This may be so, but then it shows that such theories are extremely academic and have little to say about paradoxes except when they crop up in special tailor-made systems. Besides, the drive to eliminate paradoxes at any cost, especially when it requires the creation of highly artificial formalisms, puts too much stress on bland consistency, and too little on the quirky and bizarre, which make life and mathematics interesting. It is of course important to try to maintain consistency, but when this effort forces you into a stupendously ugly theory, you know something is wrong.

___

23

These types of issues in the foundations of mathematics were responsible for the high interest in codifying human reasoning methods which was present in the early part of this century. Mathematicians and philosophers had begun to have serious doubts about whether even the most concrete of theories, such as the study of whole numbers (number theory), were built on solid foundations. If paradoxes could pop up so easily in set theory-a theory whose basic concept, that of a set, is surely very intuitively appealing-then might they not also exist in other branches of mathematics? Another related worry was that the paradoxes of logic, such as the Epimenides paradox, might turn out to be internal to mathematics, and thereby cast in doubt all of mathematics. This was especially worrisome to those-and there were a good number-who firmly believed that mathematics is simply a branch of logic (or conversely, that logic is simply a branch of mathematics). In fact, this very question-"Are mathematics and logic distinct, or separate?"-was the source of much controversy.

23

This study of mathematics itself became known as metamathematics-or occasionally, metalogic, since mathematics and logic are so intertwined. The most urgent priority of metamathematicians was to determine the true nature of mathematical reasoning. What is a legal method of procedure, and what is an illegal one? Since mathematical reasoning had always been done in "natural language" (e.g., French or Latin or some language for normal communication), there was always a lot of possible ambiguity. Words had different meanings to different people, conjured up different images, and so forth. It seemed reasonable and even important to establish a single uniform notation in which all mathematical work could be done, and with the aid of which any two mathematicians could resolve disputes over whether a suggested proof was valid or not. This would require a complete codification of the universally acceptable modes of human reasoning, at least as far as they applied to mathematics.

___

23

Consistency, Completeness, Hilbert's Program

23

This was the goal of Principia Mathematica, which purported to derive all of mathematics from logic, and, to be sure, without contradictions! It was widely admired, but no one was sure if (1) all of mathematics really was contained in the methods delineated by Russell and Whitehead, or (2) the methods given were even self-consistent. Was it absolutely clear that contradictory results could never be derived, by any mathematicians whatsoever, following the methods of Russell and Whitehead?

23

This question particularly bothered the distinguished German mathematician (and metamathematician) David Hilbert, who set before the world community of mathematicians (and metamathematicians) this challenge: to demonstrate rigorously-perhaps following the very methods outlined by Russell and Whitehead-that the system defined in Principia Mathematica was both consistent (contradiction-free), and complete (i.e., that every true statement of number theory could be derived within the framework drawn up in P.M.). This was a tall order, and one could criticize it on the grounds that it was somewhat circular: how can you justify your methods of reasoning on the basis of those same methods of reasoning? It is like lifting yourself up by your own bootstraps. (We just don't seem to be able to get away from it

24

Hilbert was fully aware of this dilemma, of course, and therefore expressed the hope that a demonstration of consistency or completeness could be found which depended only on "finitistic" modes of reasoning. "these were a small set of reasoning methods usually accepted by mathematicians. In this way, Hilbert hoped that mathematicians could partially lift themselves by their own bootstraps: the sum total of mathematical methods might be proved sound, by invoking only a smaller set of methods. This goal may sound rather esoteric, but it occupied the minds of many of the greatest mathematicians in the world during the first thirty years of this century.

___

24

In the thirty-first year, however, Godel published his paper, which in some ways utterly demolished Hilbert's program. This paper revealed not only that there were irreparable "holes" in the axiomatic system proposed by Russell and Whitehead, but more generally, that no axiomatic system whatsoever could produce all number-theoretical truths, unless it were an inconsistent system! And finally, the hope of proving the consistency of a system such as that presented in P.M. was shown to be vain: if such a proof could be found using only methods inside P.M., then-and this is one of the most mystifying consequences of Godel's work-P.M. itself would be inconsistent! The final irony of it all is that the proof of Godel's Incompleteness Theorem involved importing the Epimenides paradox right into the heart of Principia Mathematica, a bastion supposedly invulnerable to the attacks of Strange Loops! Although Godel's Strange Loop did not destroy Principia Mathematica, it made it far less interesting to mathematicians, for it showed that Russell and Whitehead's original aims were illusory.

---

24

Babbage, Computers, Artificial Intelligence . . .

24

When Godel's paper came out, the world was on the brink of developing electronic digital computers. Now the idea of mechanical calculating engines had been around for a while. In the seventeenth century, Pascal and Leibniz designed machines to perform fixed operations (addition and multiplication). These machines had no memory, however, and were not, in modern parlance, programmable.

25

The first human to conceive of the immense computing potential of machinery was the Londoner Charles Babbage (1792-1871). A character who could almost have stepped out of the pages of the _Pickwick Papers_. His first machine, the "Difference Engine", could generate mathematical tables of many kinds by the "method of differences". But before any model of the "D.E." had been built, Babbage became obsessed with a much more revolutionary idea: his"Analytical   
Engine". Rather immodestly, he wrote, "The course through which I arrived at it was the most entangled and perplexed which probably ever occupied the human mind."' Unlike any previously designed machine, the A.E. was to possess both a "store" (memory) and a "mill" (calculating and decision-making unit). These units were to be built of thousands of intricate geared cylinders interlocked in incredibly complex ways. Babbage had a vision of numbers swirling in and out of the mill tinder control of a program contained in punched cards-an idea inspired by the jacquard loom, a card-controlled loom that wove amazingly complex patterns. Babbage's brilliant but ill-fated Countess friend, Lady Ada Lovelace (daughter of Lord Byron), poetically commented that "the Analytical Engine weaves algebraic patterns just as the Jacquard-loom weaves flowers and leaves." Unfortunately, her use of the present tense was misleading, for no A.E. was ever built, and Babbage died a bitterly disappointed man.

25 ❗️

Lady Lovelace, no less than Babbage, was profoundly aware that with the invention of the Analytical Engine, mankind was flirting with mechanized intelligence-particularly if the Engine were capable of "eating its own tail" (the way Babbage described the Strange Loop created when a machine reaches in and alters its own stored program).

Note: Kind of like agrippa

---

25

In our century the time was ripe for computers-computers beyond the wildest dreams of Pascal, Leibniz, Babbage, or Lady Lovelace. In the 1930's and 1940's, the first "giant electronic brains" were designed and built. They catalyzed the convergence of three previously disparate areas: the theory of axiomatic reasoning, the study of mechanical computation, and the psychology of intelligence. These same years saw the theory of computers develop by leaps and bounds. This theory was tightly linked to metamathematics. In fact, Godel's Theorem has a counterpart in the theory of computation, discovered by Alan Turing, which reveals the existence of ineluctable "holes" in even the most powerful computer imaginable. Ironically, just as these somewhat eerie limits were being mapped out, real computers were being built whose powers seemed to grow and grow beyond their makers' power of prophecy

---

26

By the early 1950's, mechanized intelligence seemed a mere stone's throw away; and yet, for each barrier crossed, there always cropped up some new barrier to the actual creation of a genuine thinking machine. Was there some deep reason for this goal's mysterious recession? No one knows where the borderline between non-intelligent behavior and intelligent behavior lies; in fact, to suggest that a sharp borderline exists is probably silly. But essential abilities for intelligence are certainly: to respond to situations very flexibly; to take advantage of fortuitous circumstances; to make sense out of ambiguous or contradictory messages; to recognize the relative importance of different elements of a situation; to find similarities between situations despite differences which may separate them; to draw distinctions between situations despite similarities which may link them; to synthesize new concepts by taking old concepts and putting them together in new ways; to come up with ideas which are novel

26

Here one runs up against a seeming paradox. Computers by their very nature are the most inflexible, desireless, rule-following of beasts. Fast though they may be, they are nonetheless the epitome of unconsciousness. How, then, can intelligent behavior be programmed? Isn't this the most blatant of contradictions in terms? One of the major theses of this book is that it is not a contradiction at all. One of the major purposes of this book is to urge each reader to confront the apparent contradiction head on, to savor it, to turn it over, to take it apart, to wallow in it, so that in the end the reader might emerge with new insights into the seemingly unbreathable gulf between the formal and the informal, the animate and the inanimate, the flexible and the inflexible.

26 ❗️

This is what Artificial Intelligence (AI) research is all about. And the strange flavor of AI work is that people try to put together long sets of rules in strict formalisms which tell inflexible machines how to be flexible. What sorts of "rules" could possibly capture all of what we think of as intelligent behavior, however? Certainly there must be rules on all sorts of different tbh levels. There must be many "just plain" rules. There must be "metarules" to modify the "just plain" rules; then "metametarules" to modify the metarules, and so on. The flexibility of intelligence comes from the enormous number of different rules, and levels of rules. The reason that so many rules on so many different levels must exist is that in life, a creature is faced with millions of situations of completely different types. In some situations, there are stereotyped responses which require "just plain" rules. Some situations are mixtures of stereotyped situations-thus they require rules for deciding which of the 'just plain" rules to apply. Some situations cannot be classified-thus there must exist rules for inventing new rules ... and on and on. Without doubt, Strange Loops involving rules that change themselves, directly or indirectly, are at the core of intelligence. Sometimes the complexity of our minds seems so overwhelming that one feels that there can be no solution to the problem of understanding intelligence-that it is wrong to think that rules of any sort govern a creature's behavior, even if one takes "rule" in the multilevel sense described above.

---


27

. . . and Bach

27

In the year 1754, four years after the death of J. S. Bach, the Leipzig theologian Johann Michael Schmidt wrote, in a treatise on music and the soul, the following noteworthy passage: 

Not many years ago it was reported from France that a man had made a statue that could play various pieces on the Fleuttraversiere, placed the flute to its lips and took it down again, rolled its eyes, etc. But no one has yet invented an image that thinks, or wills, or composes, or even does anything at all similar. Let anyone who wishes to be convinced look carefully at the last fugal work of the above-praised Bach, which has appeared in copper engraving, but which was left unfinished because his blindness intervened, and let him observe the art that is contained therein; or what must strike him as even more wonderful, the Chorale which he dictated in his blindness to the pen of another: Wenn wir in hochsten Nothen seen. I am sure that he will soon need his soul if he wishes to observe all the beauties contained therein, let alone wishes to play it to himself or to form a judgment of the author. Everything that the champions of Materialism put forward must fall to the ground in view of this single example.6

27

Quite likely, the foremost of the "champions of Materialism" here alluded to was none other than Julien Offroy de la Mettrie-philosopher at the court of Frederick the Great, author of L'homme machine ("Man, the Machine"), and Materialist Par Excellence. It is now more than 200 years later, and the battle is still raging between those who agree with Johann Michael Schmidt, and those who agree with Julien Offroy de la Mettrie. I hope in this book to give some perspective on the battle.

---

27

"Godel, Escher, Bach"

27

The book is structured in an unusual way: as a counterpoint between Dialogues and Chapters. The purpose of this structure is to allow me to present new concepts twice: almost every new concept is first presented metaphorically   
in a Dialogue, yielding a set of concrete, visual images; then these serve, during the reading of the following Chapter, as an intuitive background for a more serious and abstract presentation of the same concept. In many of the Dialogues I appear to be talking about one idea on the surface, but in reality I am talking about some other idea, in a thinly disguised way.

28

Originally, the only characters in my Dialogues were Achilles and the Tortoise, who came to me from Zeno of Elea, by way of Lewis Carroll. Zeno of Elea, inventor of paradoxes, lived in the fifth century B.C. One of his paradoxes was an allegory, with Achilles and the Tortoise as protagonists. Zeno's invention of the happy pair is told in my first Dialogue, Three-Part Invention. In 1895, Lewis Carroll reincarnated Achilles and the Tortoise for the purpose of illustrating his own new paradox of infinity. Carroll's paradox, which deserves to be far better known than it is, plays a significant role in this book. Originally titled "What the Tortoise Said to Achilles", it is reprinted here as Two-Part Invention

---

28

When I began writing Dialogues, somehow I connected them up with musical forms. I don't remember the moment it happened; I just remember one day writing "Fugue" above an early Dialogue, and from then on the idea stuck. Eventually I decided to pattern each Dialogue in one way or another on a different piece by Bach. This was not so inappropriate. Old Bach himself used to remind his pupils that the separate parts in their compositions should behave like "persons who conversed together as if in a select company". I have taken that suggestion perhaps rather more literally than Bach intended it; nevertheless I hope the result is faithful to the meaning. I have been particularly inspired by aspects of Bach's compositions which have struck me over and over, and which are so well described by David and Mendel in The Bach Reader: His form in general was based on relations between separate sections. These relations ranged from complete identity of passages on the one hand to the return of a single principle of elaboration or a mere thematic allusion on the other. The resulting patterns were often symmetrical, but by no means necessarily so. Sometimes the relations between the various sections make up a maze of interwoven threads that only detailed analysis can unravel. Usually, however, a few dominant features afford proper orientation at first sight or hearing, and while in the course of study one may discover unending subtleties, one is never at a loss to grasp the unity that holds together every single creation by Bach.'

---

28

I have sought to weave an Eternal Golden Braid out of these three strands: Godel, Escher, Bach. I began, intending to write an essay at the core of which would be Godel's Theorem. I imagined it would be a mere pamphlet. But my ideas expanded like a sphere, and soon touched Bach and Escher. It took some time for me to think of making this connection explicit, instead of just letting it be a private motivating force. But finally I realized that to me, Godel and Escher and Bach were only shadows cast in different directions by some central solid essence. I tried to reconstruct the central object, and came up with this book.

___

15

In some of his drawings, one single theme can appear on different levels of reality. For instance, one level in a drawing might clearly be recognizable as representin fantasy or imagination; another level would be recognizable as reality. These two levels might be the only explicitly portrayed levels. But the mere presence of these two level invites the viewer to look upon himself as part of yet another level; and by taking that step, the viewer cannot help getting caught up in Escher's implied chain of levels, in which, for any one level, there is always another level above it of greater "reality", and likewise, there is always a level below, "more imaginary" than it is. This can be mind-boggling in itself. However, what happens if the chain of levels is not linear, but forms a loop? What is real, then, and what is fantasy? The genius of Escher was that he could not only concoct, but actually portray, dozens of half-real, half-mythical worlds, worlds filled with Strange Loops, which he seems to be inviting his viewers to enter.

___

18

There is one canon in the Musical Offering which is particularly unusual. Labeled simply "Canon per Tonos", it has three voices. The uppermost voice sings a variant of the Royal Theme, while underneath it, two voices provide a canonic harmonization based on a second theme. The lower of this pair sings its theme in C minor (which is the key of the canon as a whole), and the upper of the pair sings the same theme displaced upwards in pitch by an interval of a fifth. What makes this canon different from any other, however, is that when it concludes-or, rather, seems to conclude-it is no longer in the key of C minor, but now is in D minor. Somehow Bach has contrived to modulate (change keys) right under the listener's nose. And it is so constructed that this "ending" ties smoothly onto the beginning again; thus one can repeat the process and return in the key of E, only to join again to the beginning. These successive modulations lead the ear to increasingly remote provinces of tonality, so that after several of them, one would expect to be hopelessly far away from the starting key. And yet magically, after exactly six such   
modulations, the original key of C minor has been restored! All the voices are exactly one octave higher than they were at the beginning, and here the piece may be broken off in a musically agreeable way. Such, one imagines, was Bach's intention; but Bach indubitably also relished the implication that this process could go on ad infinitum, which is perhaps why he wrote in the margin "As the modulation rises, so may the King's Glory." To emphasize its potentially infinite aspect, I like to call this the "Endlessly Rising Canon"

___

14

FIGURE 3. The Royal Theme.

![[0B254268-EF67-4D83-9EEE-AFD4BD5DFE93.jpeg]]

___

### Notes

Amount: 1

- [[Intelligence]]

