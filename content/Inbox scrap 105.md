449

C HAPTER X  
IIIBlooP and FlooP and GlooP

449

Self-Awareness and Chao  

449

BLooP, FLooP, AND GLooP are not trolls, talking ducks, or the s  
ounds made by a sinking ship-they are three computer languages , each one w  
ith its own special purpose. These languages were invented specially for t  
his Chapter. They will be of use in explaining some new senses of the w  
ord "recursive"-in particular, the notions of primitive recursivity and g  
eneralrecursivity. They will prove very helpful in clarifying the machinery o  
f self-reference in T  
N

449

We seem to be making a rather abrupt transition from brains and   
minds to technicalities of mathematics and computer science. Though the   
transition is abrupt in some ways, it makes some sense. We just saw how a  
certain kind of self-awareness seems to be at the crux of consciou  
sness. Now we are going to scrutinize "self-awareness" in more formal s  
ettings, such as TNT. The gulf between TNT and a mind is wide, but some of t  
he ideas will be most illuminating, and perhaps metaphorically t  
ransportable back to our thoughts about consciou  
snes

449

One of the amazing things about TNT's self-awareness is that it i  
s intimately connected to questions about order versus chaos among t  
he natural numbers. In particular, we shall see that an orderly system o  
f sufficient complexity that it can mirror itself cannot be totally orderly-  
it must contain some strange, chaotic features. For readers who have s  
ome Achilles in them, this will be hard to take. However, there is a "ma  
gical" compensation: there is a kind of order to the disorder, which is now its o  
wn field of study, called "recursive function theory". Unfortunately, we will n  
ot be able to do much more than hint at the fascination of this subj  
ec

449

Representability and Refriger  
ator

449

Phrases such as "sufficiently complex", "sufficiently powerful" and the l  
ike have cropped up quite often earlier. Just what do they mean? Let us g  
o back to the battle of the Crab and Tortoise, and ask, "What q  
ualifies something as a record player?" The Crab might claim that his r  
efrigerator is a "Perfect" record player. Then to prove it, he could set any r  
ecord whatsoever atop it, and say, "You see--it's playing it!" The Tortoise, if h  
e wanted to counter this Zen-like act, would have to reply, "No-your refrigerator is too low-fidelity to be counted as a phonograph: it cannot   
reproduce sounds ·at all (let alone it� self-breaking sound)." The T  
ortois

450

can only make a record called "I Cannot Be Played on Record Player X  
" provided that Record Player X is really a record player! The T  
ortoise's method is quite insidious, as it plays on the strength, rather than on t  
he weakness, of the system. And therefore he requires "sufficiently h  
i-fi" record p

450

Ditto for formal versions of number theory. The reason that TNT is a  
formalization of N'is that its symbols act the right way: that is, its t  
heorems are not silent like a refrigerator-they speak actual truths of N. Of c  
ourse, so do the theorems of the pq-system. Does it, too, count as "a f  
ormalization of number theory", or is it more like a refrigerator? Well, it is a little b  
etter than a refrigerator, but it is still pretty weak. The pq-system does n  
ot include enough of the core truths of N to count as "a number t  
heor

450

What, then, are these "core truths" of N? They are the primitive recursive truths; that means they involve only predictably terminating c  
alculations. These core truths serve for N as Euclid's first four postulates served f  
or geometry: they allow you to throw out certain candidates before the g  
ame begins, on the grounds of "insufficient power". From here on out, t  
he representability of all primitive recursive truths will be the criterion for calling a  
system "sufficiently powerful".

450

Ganto's Ax in Metamathem  
atic

450

The significance of the notion is shown by the following key fact: If y  
ou have a sufficiently powerful formalization of number theory, then Godel's   
method is applicable, and consequently your system is incomplete. If, on t  
he other hand, your system is not sufficiently powerful (i.e., not all p  
rimitive recursive truths are theorems), then your system is, precisely by virtue o  
f that lack, incomplete. Here we have a reformulation of "Ganto's Ax" in   
metamathematics: whatever the system does, Godel's Ax will chop its h  
ead offt Notice also how this completely parallels the high-fidelity-versus-lowfidelity battle in the Contracrostipu  
nctu

450

Actually, it turns out that much weaker systems are still vulnerable t  
o the Godel method; the criterion that all primitive recursive truths need b  
e represented as theorems is far too stringent. It is a little like a thief who will   
only rob "sufficiently rich" people, and whose criterion is that the p  
otential victim should be carrying at least a million dollars in cash. In the case o  
f TNT, luckily, we will be able to act in our capacity as thieves, for the m  
illion in cash is there-which is to say, TNT does indeed contain all p  
rimitive recursive truths as theorems.

450

Now before we plunge into a detailed discussion of primitive r  
ecursive functions and predicates, I would like to tie the themes of this Chapter t  
o themes from earlier Chapters, so as to provide a bit better m  
otivatio

450

Finding Order by Choosing the Right F  
ilte

450

We saw at a very early stage that formal systems can be difficult and u  
nruly beasts because they have lengthening and shortening rules, which c  
a

451

p ossibly lead to never-ending searches among strings. The discovery o  
f Godel-numbering showed that any search for a string having a s  
pecial typographical property has an arithmetical cousin: an isomorphic s  
earch for an integer with a corresponding special arithmetical property. Consequently, the quest for decision procedures for formal systems involves  
solving the mystery of unpredictably long s earches-chaos-among t  
he integers. Now in the Aria with Diverse Variations, I gave perhaps too m  
uch weight to apparent manifestations of chaos in problems about integers. A  
s a matter of fact, people have tamed wilder examples of apparent c  
haos than the "wondrousness" problem, finding them to be quite gentle b  
easts after all. Achilles' powerful faith in the regularity and predictability o  
f numbers should therefore be accorded quite a bit of respect-especially a  
s it reflects the beliefs of n early all mathematicians up till the l 930's. To s  
how why order versus chaos is such a subtle and significant issue, and to tie it i  
n with questions about the location and revelation of meaning, I would like t  
o quote a beautiful and memorable passage from Are Quanta Real?-a Galilean Dialogue by the late J. M. J

451

SALVIATI Suppose I give you two sequences of numbers, such a  
s 7 85 398 163 39 7 448 309615 66 084 .  
..a  
nd 1, -1/3 , +1/5, -1/7, +1/9, -1/11, +1/13, -1/15, .  
..If I asked you, Simplicio, what the next number of the first sequence is, wha  
t would you s  
ay? SIMPLICIO I could not tell you. I think it is a random sequence and t  
hat there is no law in i  
t. SALVIATI And for the second s  
equence? SIMPLICIO That would be easy. It must be +1/  
17. SALVIATI Right. But what would you say if I told you that the f  
irst sequence is also constructed by a law and this law is in fact identical with t  
he one you have just discovered for the ,-econd s  
equence? SIMPLICI0 This does not seem probable to m  
e. SALVIATI But it is indeed so, since the first sequence is simply the beginning of the decimal fraction [expansion] of the sum of the second. Its value i  
s 1r  
/4. SIMPLICI0 You are full of such mathematical tricks, but I do not see wha  
t this has to do with abstraction and reality  
. SALVIATI The relationship with abstraction is easy to see. The first sequence looks random unless one has developed through a process of abstraction a kind of filter which sees a simple structure behind the a  
pparent r  
andomness. It is exactly in this manner that laws of nature are discovered. N  
ature presents us with a host of phenomena which appear mostly as chaotic randomness until we select some significant events, and abstract from their   
particular, irrelevant circumstances so that they become idealized. Only t  
hen can they exhibit their true structure in full splendor.   
SAGREDO This is a marvelous idea! It suggests that when we try to understand nature, we should look at the phenomena as if they were messages to b  

452

understood. Except that each message appears to be random until we establish a code to read it. This code takes the form of an abstraction, that is, we   
choose to ignore certain things as irrelevant and we thus partially select t  
he content of the message by a free choice. These irrelevant signals form t  
he "background noise," which will limit the accuracy of our m  
essage. But since the code is not absolute there may be several messages in t  
hesame raw material of the data, so changing the code will result in a message o  
fequally deep significance in something that was merely noise before, a  
nd conversely: In a new code a former message may be devoid of m  
eaning. Thus a code presupposes a free choice among different, c  
omplementary aspects, each of which has equal claim to reality, if I may use this d  
ubious w  
ord. Some of these aspects may be completely unknown to us now but they m  
ay reveal themselves to an observer with a different system of a  
bstractions. But tell me, Salviati, how can we then still claim that we discover s  
omething out there in the objective real world? Does this not mean that we are m  
erelycreating things according to our own images and that reality is only w  
ithino  
urselves? SALVIATI I don't think that this is necessarily so, but it is a question w  
hich requires deeper reflection

452

Jauch is here dealing with messages that come not from a "  
sentient being" but from nature itself. The questions that we raised in Chapter V  
I on the relation of meaning to messages can be raised equally well w  
ith messages from nature. Is nature chaotic, or is nature patterned? And what   
is the role of intelligence in determining the answer to this q  
uestio

452

To back off from the philosophy, however, we can consider the point   
about the deep regularity of an apparently random sequence. Might t  
he function Q( n) from Chapter V have a simple, nonrecursive e  
xplanation, too? Can every problem, like an orchard, be seen from such an angle t  
hat its secret is revealed? Or are there some problems in number theory w  
hich, no matter what angle they are seen from, remain m  
ysteries? With this prologue, I feel it is time to move ahead to define the p  
recise meaning of the term "predictably long search". This will be a  
ccomplished in terms of the language B

452

Primordial Steps of the Language B  
loo

452

Our topic will be searches for natural numbers which have various properties. In order to talk about the length of any search, we shall have to d  
efine some primordial steps, out of which all searches are built, so that length can   
be measured in terms of number of steps. Some steps which we m  
ight consider primordial a  
re: adding any two natural n  
umbers; multiplying any two natural numbers;  
determining if two numbers are e qual;  
determining the larger (smaller) of two n

453

Loops and Upper Boun  
d

453

If we try to formulate a test for, say, primality in terms of such steps, w  
e shall soon see that we have to include a control structure-that is, descriptions   
of the order to do things in, when to branch back and try something a  
gain, when to skip over a set of steps, when to stop, and similar matters.

453

It is typical of any algorithm-that is, a specific delineation of how t  
o carry out a task-that it includes a mixture of (1) specific operations to b  
e performed, and (2) control statements. Therefore, as we develop o  
ur language for expressing predictably long calculations, we shall have t  
o incorporate primordial control structures also. In fact, the hallmark o  
f BlooP is its limited set of control structures. It does not allow you to b  
ranch to arbitrary steps, or to repeat groups of steps without limit; in B  
looP, essentially the only control structure is the bounded loop: a set of i  
nstructions which can be executed over and over again, up to a predefined m  
aximum number of times, called the upper bound, or ceiling, of the loop. If the c  
eiling were 300, then the loop might be executed 0, 7, or 300 times-but not 3  
0

453

Now the exact values of all the upper bounds in a program n  
eed not be put in numerically by the programmer-indeed, they may not be   
known in advance. Instead, any upper bound may be determined b  
y calculations carried out before its loop is entered. For instance, if y  
ou wanted to calculate the value of 2  
3  
", there would be two loops. F  
irst, you evaluate 3  
n  
, which involves n multiplications. Then, you put 2 t  
o that power, which involves 3  
n multiplications. Thus, the upper b  
ound for the second loop is the result of the calculation of the first l

453

Here is how you would expres.� this in a BlooP p  
rogram: DEFINE PROCEDURE "TWO-TO-THE-THREE-TO-THE" [  
N]:BLOCK 0: B  
EGINCELL( 0) ¢: t  
;LOOP N TIMES:  
BLOCK t: B  
EGINCELL(0) ¢: 3 x C  
ELL(0);BLOCK 1: END  
;CELL( t ) ¢: t ;  
LOOP CELL( 0) T  
IMES:BLOCK 2: B  
EGINCELL( t ) ¢: 2 x CELL( t );  
BLOCK 2: END  
;O UTPUT¢: CELL( t )  
;BLOCK 0: E

453

Conventions of B  
loo

453

Now it is an acquired skill to be able to look at an algorithm written in a  
computer language, and figure out what it is doing. However, I hope that   
this algorithm is simple enough that it makes sense without too m  
uc

454

scrutiny. A procedure is defined, having one input parameter, N; its output i  
s the desired v  
alu

454

This procedure definition has what is called block structure, w  
hich means that certain portions of it are to be considered as units, or blocks. A  
ll the statements in a block get executed as a unit. Each block has a n  
umber (the outermost being BLOCK 0), and is delimited by a BEGIN and an E  
ND.In our example, BLOCK t and BLOCK 2 contain just one statement eachbut shortly you will see longer blocks. A LOOP statement always means t  
oexecute the block immediately under it repeatedly. As can be seen a  
bove, blocks can be n

454

The strategy of the above algorithm is as described earlier. You b  
egin by taking an auxiliary variable, called CELL(0); you set it initially to 1, a  
ndthen, in a loop, you multiply it repeatedly by 3 until you've done so e  
xactly N times. Next, you do the analogous thing for CELL( 1 )-set it to 1, m  
ultiplyby 2 exactly CELL(0) times, then quit. F inally, you set OUTPUT to the v  
alueof CELL( 1 ). This is the value returned to the outside world-the o  
nlyexternally visible behavior of the p  
rocedur

454

A number of points about the notation should be made here. First, t  
he meaning of the left-arrow '¢:' is this:  
Evaluate the expression to its right, then take the result and set t  
he CELL (or OUTPUT) on its left to that v  
alue.So the meaning of a command such as CELL( t) ¢: 3 X CELL( 1) is to t  
riplethe value stored in CELL( 1 ). You may think of each CELL as being a separ  
ateword in the memory of some computer. The only difference between a  
CELL and a true word is that the latter can o nly hold integers up to s  
omefinite limit, whereas we allow a CELL to hold any natural number, no m  
atterhow b

454

Every procedure in BlooP, when called, yields a value-namely t  
he value of the variable called OUTPUT. At the beginning of execution of a  
nyprocedure, it is assumed as a default option that OUTPUT has the value 0  
.That way, even if the procedure never resets OUTPUT at all, OUTPUT has a  
well-defined value at all t  
ime

454

IF-Statements and B  
ranchin

454

Now let us look at another procedure which will show us somo o  
ther features of BlooP which give it more generality. How do you find o  
ut, knowing only how to add, what the value of M -N is? The trick is to a  
ddvarious numbers onto N until you find the one which yields M. H  
owever,what happens if Mis smaller than N? What if we are trying to take 5 f  
rom 2? In the domain of natural numbers, there is no answer. But we would like  
our BlooP procedure to give an answer anyway-let's say 0. Here, then, is a  
BlooP procedure which does s  
ubtractio

455

DEFINE PROCEDURE "MINUS " [M,N]  
: BLOCK 0: B  
EGIN IF M < N, THEN:   
QUIT BLOCK O  
; LOOP AT MOST M + t TIMES:  
BLOCK t: B  
EGIN IF OUTPUT + N = M, THE  
N: ABORT LOOP t  
; OUTPUT ¢: OUTPUT + t  
; BLOCK t: END;   
BLOCK 0: END

455

Here we are making use of the implicit feature that OUTPUT begins a  
t 0 .If M is less than N, then the subtraction is impossible, and we s  
implyjump to the bottom of BLOCK O right away, and the answer is 0. That i  
swhat is meant by the line QUIT BLOCK 0. But if Mis not less than N, t  
henwe skip over that QUIT-statement, and carry out the next command i  
nsequence (here, a LOOP-statement). That is how IF-statements always w  
orkin B  
loo

455

So we enter LOOP 1, so called because the block which it tells us t  
o repeat is BLOCK t. We try adding Oto N, then 1, 2, etc., until we find a  
number that gives M. At that point, we ABORT the loop we are in, meaning   
we jump to the statement immediately following the END which marks t  
he bottom of the loop's block. In this case, that jump brings us just b  
elow BLOCK 1: END, which is to say, to the last statement of the algorithm, a  
nd we are done. OUTPUT now contains the correct answer.

455

Notice that there are two distinct instructions for jumping d  
ownwards: QUIT, and ABORT. The former pertains to blocks, the latter to loops. Q  
UIT BLOCK n means to jump to the last line of BLOCK n, whereas ABORT LOOP n  
means to jump just below the last line of BLOCK n. This distinction o  
nly matters when you are inside a loop and want to continue looping but to q  
uit the block this time around. Then you can say QUIT and the proper t  
hing will h  
appen. Also notice that the words AT MOST now precede the upper bound o  
f the loop, which is a warning that the loop may be aborted before the u  
pper bound is r  
eache

455

Automatic Chunki  
n

455

Now there are two last features of BlooP to explain, both of them v  
ery important. The first is that, once a procedure has been defined, it may b  
e called inside later procedure definitions. The effect of this is that once a  
n operation has been defined in a procedure, it is considered as simple as a p  
rimordial step. Thus, BlooP features automatic chunking. You might compare it t  
o the way a good ice skater acquires new motions: not by defining them a  
s long sequences of primordial muscle-actions, but in terms of p  
reviously learned motions, which were themselves learned as compounds of e  
arlie

456

learned motions, etc.-and the nestedness, or chunkedness, can go back   
many layers until you hit primordial muscle-actions. And thus, the repertoire of BlooP programs, like the repertoire of a skater's tricks, grows, q  
uite literally, by loops and b

456

BlooP T  
est

456

The other feature of BlooP is that certain procedures can have YES or N  
O as their output, instead of an integer value. Such procedures are te  
sts,rather than functions. To indicate the difference, the name of a test m  
ust terminate in a question mark. Also, in a test, the default option for O  
UTPUT is not 0, of course, but N  

456

Let us see an example of these last two features of BlooP in a  
n algorithm which tests its argument for primality:   
DEFINE PROCEDURE "PRIME?" [  
N]: BLOCK 0: B  
EGIN IF N = 0, T  
HEN: QUIT BLOCK 0  
; CELL(0) ¢: 2  
; LOOP AT MOST MINUS [N,2] T  
IMES: BLOCK t: B  
EGIN IF REMAINDER [N,CELL(0)] = 0, THE  
N: QUIT BLOCK 0  
; CELL( 0) ¢: CELL( 0) + t ;   
BLOCK t: E  
ND; OUT PUT¢: Y  
ES; BLOCK 0: E

456

Notice that I have called two procedures inside this algorithm: MINUS a  
nd REMAINDER. (The latter is presumed to have been previously defined, a  
nd you may work out its definition yourself.) Now this test for primality w  
orks by trying out potential factors of N one by one, starting at 2 and i  
ncreasing to a maximum of N - 1. In case any of them divides N exactly (i.e., g  
ives remainder 0) , then we jump down to the bottom, and since OUTPUT s  
till has its default value at this stage, the answer is NO. Only if N has no exact   
divisors will it survive the entirety of LOOP 1; then we will emerge s  
moothly at the statement OUTPUT ¢: YES, which will get executed, and then t  
he procedure is o  
ve

456

BlooP Programs Contain Chains of Procedure  

456

We have seen how to define procedures in BlooP; however, a p  
rocedure definition is only a part of a program. A program consists of a chain o  
f procedure definitions (each only calling previously defined procedures), optionally followed by one or more calls on the procedures defined. Thus, a  

457

example of a full BlooP program would be the definition of the procedure   
TWO-TO-THE-THREE-TO-THE, followed by the c  
allTWO-TO-THE-TH REE-TO-THE [ 2  
] which wou.ld yield an answer of 512.

457

If you have only a chain of procedure definitions, then nothing e  
ver gets executed; they are all just waiting for some call, with specific numeri  
cal values, to set them in motion. It is like a meat grinder waiting for s  
ome meat to grind-or rather, a chain of meat grinders all linked together, each   
of which is fed from earlier ones ... In the case of meat grinders, the i  
mage is perhaps not so savory; however, in the case of BlooP programs, such a  
construct is quite important, and we will call it a "call-less program". T  
his notion is illustrated in Figure 7

457

Now BlooP is our language for defining predictably t  
erminating calculations. The standard name for functions which are Blo  
oP-computable is primitive recursive functions; and the standard name for p  
ropertieswhich can be detected by BlooP-tests is primitive recursive p  
redicates.Thus, the function 2  
3  
11 is a primitive recursive function; and the statement "n is a prime number" is a primitive recursive p  
redicat

457

It is clear intuitively that the Goldbach property is primitive recursive  
, and to make that quite explicit, here is a procedure definition in B  
looP, showing how to test for its presence or a  
bsence: DEFINE PROCEDURE "GOLDBACH?" [  
N]: BLOCK 0: B  
EGIN CELL( 0) ¢: 2  
; LOOP AT MOST N T  
IMES: BLOCK t: B  
EGIN IF {PRIME? [CELL(0  
)] AND PRIME? [MINUS [N,CELL(0) ]]},  
TH EN:   
BLOCK 2: B  
EGIN OUT PUT¢: Y  
ES; QUIT BLOCK 0  
; BLOCK 2: END  
CELL(0) ¢: CELL(0) + 1  
; BLOCK t: END;   
BLOCK 0: END  
. As usual, we assume NO until proven YES, and we do a brute force search   
among pairs of numbers which sum up to N. If both are prime, we quit t  
he outermost block; otherwise we just go back and try again, until all possibilities are e  
xhausted. (Warning: The fact that the Goldbach property is primitive recursive   
does not make !he question "Do all numbers have the Goldbach property  
?" a simple question-far from i  

458

FIGURE 72. The structure of a c  
all-lRss BlooP program. For this program to b  
e self-contained, each procedure d  
efinition may only call procedures de.fined above i

458

Suggested Ex  
ercise

458

Can you write a similar BlooP procedure which tests for the presence o  
r absence of the Tortoise property ( or the Achilles property)? If so, do it. If   
not, is it merely because you are ignorant about upper bounds, or could i  
t be that there is a fundamental obstacle preventing the formulation of s  
uch an algorithm in BlooP? And what about the same questions, with respect t  
o the property of wondrousness, defined in the Dialogue?

458

Below, I list some functions and properties, and you ought to take t  
he time to determine whether you believe they are primitive r  
ecursive (BlooP-programmable) or not. This means that you must carefully c  
onsider what kinds of operations will be involved in the calculations which t  
hey require, and whether ceilings can be given for all the loops i  
nvolved. FACTORIAL [N] = NI (the factorial of N  
) (e.g., FACTORIAL [4] = 2  
4) REMAINDER [M,N] = the remainder upon dividing M by N  
(e.g., REMAINDER [24,7] = 3  
) Pl-DIGIT [N] = the Nth digit of 1r, after the decimal point   
(e.g., Pl-DIGIT [1] = 1  
,Pl-DIGIT [2] = 4  
, Pl-DIGIT [ 1000000] = 1

459

FIBO [N] = the Nth Fibonacci n  
umber (e.g., FIBO [9] = 3  
4) PRIME-BEYOND [N] = the lowest prime beyond N  
(e.g., PRIME-BEYOND [33] = 3  
7) PERFECT [N] = the Nth "perfect" number (a number such as 28 w  
hose divisors sum up to itself: 28 = 1 + 2 + 4 + 7 + 14)  
(e.g., PERFECT [2] = 2  
8) PRIME? [N] = YES if N is prime, otherwise N  
O. PERFECT? [N] = YES if N is perfect, otherwise N  
O. TRIVIAL? [A,B,C,N] = YES if A  
N+ BN = C  
N is correct; otherwise N  
O. (e.g., TRIVIAL? [3,4,5,2] = YES,  
TRIVIAL? [3,4,5,3] = N  
O) PIERRE? [A,B,C] = YES if A  
N +BN =, C  
N IS satisfiable for some value  
of N greater than 1, otherwise N  
O. (e.g., PIERRE? [3,4,5] = YES,  
PIERRE? [ 1,2,3] = N  
O) FERMAT? [ N] = YES if A  
N + BN = C  
N IS satisfied by some p  
ositive values of A, B, C; otherwise N  
O. (e.g., FERMAT? [2] = Y  
ES) TORTOISE-PAIR? [M,N] = YES if both Mand M + N are prime, o  
therwise N  
O. (e.g., TORTOISE-PAIR [5, 17 42] = Y  
ES, TORTOISE-PAIR [ 5,1 00] = N  
O) TORTOISE? [N] = YES if N is the difference of two primes, otherwise N  
O. (e.g., TORTOISE [ 1742] = Y  
ES, TORTOISE [7] = N  
O) MIU-WELL-FORMED? [N] = YES if N, when seen as a string of the MIUsystem, is well-formed; otherwise N  
O. (e.g., MIU-WELL-FORMED? [ 31 O] = YES,  
MIU-WELL-FORMED? [ 415] = N  
O) MIU-PROOF-PAIR? [M,N] = YES if M, as seen as a sequence of strings o  
f the MIU-system, is a derivation of N, as seen as a string of the MIU-syste  
m; otherwise N  
O. (e.g., MIU-PROOF-PAIR? [ 3131131 1 1130 1,3 01] = Y  
ES, MIU-PROOF-PAIR? [3 1 1 130,30] = N  
O) MIU-THEOREM? [N] = YES if N, seen as a MIU-system string, is a t  
heorem; otherwise N  
O. (e.g., MIU-THEOREM? [ 31 1] = YES,  
MIU-THEOREM? [30] = N  
O, MIU-THEOREM? [70 1] = N  
O) TNT-THEOREM? [N] = YES if N, seen as a TNT-string, is a theorem  
. (e.g., TNT-THEOREM? [666 11 1666] = Y  
ES, TNT-THEOREM? [ 123666 11 1666] = N  
O, TNT-THEOREM? [ 7014] = N

460

FALSE? [N] = YES if N, seen as a TNT-string, 1s a false statement o  
f number theory; otherwise N  
O. (e.g., FALSE? [666 11 1666] = N  
O, FALSE? [223666 11 1666] = YES,  
FALSE? [ 7014] = N  
O) The last seven examples are particularly relevant to our future  
metamathematical explorations, so they highly merit your s  
crutin

460

Expressibility and Representability

460

Now before we go on to some interesting questions about BlooP and are l  
ed to its relative, FlooP, let us return to the reason for introducing BlooP i  
n the first place, and connect it to TNT. Earlier, I stated that the critical m  
ass for Godel's method to be applicable to a formal system is attained when a  
ll primitive recursive notions are representable in that system. Exactly wha  
t does this mean? First of all, we must distinguish between the notions o  
f representability and expressibility. Expressing a predicate is a mere m  
atter of translation from English into a strict formalism. It has nothing to do w  
ith theoremhood. For a predicate to be represented, on the other hand, is a  
much stronger notion. It means t  
hat (1) All true instances of the predicate are theorems;  
( 2)All false instances are n

460

By "instance", I mean the string produced when you replace all f  
ree variables by numerals. For example, the predicate m + n = k is r  
epresented in the pq-system, because each true instance of the predicate is a t  
heorem, each false instance is a nontheorem. Thus any specific addition, w  
hether true or false, translates into a decidable string of the pq-system. However, t  
he pq-system is unable to express-let alone represent-any other p  
roperties of natural numbers. Therefore it would be a weak candidate indeed in a  
competition of systems which can do number t  
heor

460

Now TNT has the virtue of being able to express virtually any numbertheoretical predicate; for example, it is easy to write a TNT-string whi  
ch expresses the predicate "b has the Tortoise property". Thus, in terms o  
f expressive power, TNT is all we w  
ant. However, the question "Which properties are represented in TNT?" i  
s precisely the question "How powerful an axiomatic system is TNT?" Are a  
ll possible predicates represented in TNT? If so, then TNT can answer a  
ny question of number theory; it is c

460

Primitive Recursive Predicates Are Represented in T  
N

460

Now although completeness will turn out to be a chimera, TNT is at l  
east complete with respect to primitive recursive predicates. In other words, any   
statement of number theory whose truth or falsity can be decided by a

461

computer within a predictable length of time is also decidable inside T  
NT. Or, one final restatement of the same t  
hing: If a BlooP test can be written for some property of n  
atural numbers, then that property is represented in T  
N

461

Are There Functions Which Are Not Primitive Recurs

461

Now the kinds of properties which can be detected by BlooP tests are   
widely varied, including whether a number is prime or perfect, has t  
he Goldbach property, is a power of 2, and so on and so forth. It would not b  
e crazy to wonder whether every property of numbers can be detected b  
y some suitable BlooP program. The fact that, as of the present moment, w  
e have no way of testing whether a number is wondrous or not need n  
ot disturb us too much, for it might merely mean that we are ignorant about   
wondrousness, and that with more digging around, we could discover a  
universal formula for the upper bound to the loop involved. Then a B  
looP test for wondrousness could be written on the spot. Similar remarks c  
ould be made about the Tortoise p  
ropert

461

So the question really is, "Can upper bounds always be given for the   
length of calculations-or, is there an inherent kind of jumbliness to t  
he natural number system, which sometimes prevents calculation lengths f  
rom being predictable in advance?" The striking thing is that the latter is t  
he case, and we are about to see why. It is the sort of thing that would h  
ave driven Pythagoras, who first proved that the square root of 2 is irrational,   
out of his mind. In our demonstration, we will use the celebrated diagona  
lmethod, discovered by Georg Cantor, the founder of set t  
heor

461

Pool B, Index Numbers, and Blue P  
rogram

461

We shall begin by imagining a curiom. notion: the pool of all possible B  
looP programs. Needless to say, this pool--"Pool B"-is an infinite one. We w  
ant to consider a subpool of Pool B, obtained by three successive fi  
ltering operations. The first filter will retain for us only call-less programs. F  
rom this subpool we then eliminate all tests, leaving only functions. (By the way, i  
n call-less programs, the last procedure in the chain determines whether t  
he program as a whole is considered a test, or a function.) The third filter w  
ill retain only functions which have exactly one input parameter. (Again r  
eferring to the final procedure in the chain.) What is l  
eft? A complete pool of all call-less BlooP programs which c  
alculate functions of exactly one input p  
arameter. Let us call these special BlooP programs Blue Programs.

461

What we would like to do now is to assign an unambiguous i  
ndexnumber to each Blue Program. How can this be done? The easiest way-  
we shall use it-is to list them in order of length: the shortest possible B  
lu

462

Program b eing# 1, the second shortest being #2, etc. Of course, there w  
ill be many programs tied for each length. To break such ties, we use alphabetical order. Here, "alphabetical order" is taken in an extended s  
ense, where the alphabet includes all the special characters of BlooP, in s  
ome arbitrary order, such as the followi  
ng: ABCDE F GH I J K L  
MNO PQ RSTUV W XY  
Z+x0 t 2 3 4 5 6 7 8 9 ¢: = < >   
( )(  
]{} ' ?:  
;, -and at the end comes the lowly blank! Altogether, fifty-six characters. F  
orconvenience's sake, we can put all Blue Programs of length 1 in Volume 1  
, programs of 2 characters in Volume 2, etc. Needless to say, the first f  
ew volumes will be totally empty, while later volumes will have many, m  
any entries (though each volume will only have a finite number). The very fi  
rst Blue Program would be this o  
ne: DEFINE PROCEDURE "A" (  
B]: BLOCK 0: B  
EGIN BLOCK 0: END  
. This rather silly meat grinder returns a value of Ono matter what its i  
nput is. It occurs in Volume 56, since it has 56 characters (counting n  
ecessary blanks, including blanks separating successive l

462

Soon after Volume 56, the volumes will get extremely fat, b  
ecause there are just so many millions of ways of combining symbols to make B  
lue BlooP programs. But no matter-we are not going to try to print out t  
his infinite catalogue. All that we care about is that, in the abstract, it i  
s well-defined, and that each Blue BlooP program therefore has a uniq  
ue and definite index number. This is the crucial idea.

462

Let us designate the function calculated by the kth Blue Program t  
his w  
ay: Blueprogra m{# k} (  
N]Here, k is the index number of the program, and N is the single i  
nput parameter. For instance, Blue Program #12 might return a value twice t  
he size of its input:  
Blueprogram{# l2} (N] = 2 X N   
The meaning of the equation above is that the program named on the   
left-hand side returns the same value as a human would calculate from t  
he ordinary algebraic expression on the right-hand side. As another e  
xample, perhaps the 5000th Blue Program calculates the cube of its input paramet  
er: Blueprogram{#5000} (N] = N3

463

The Diagonal M  
etho

463

Very well-now we apply the "twist": Cantor's diagonal method. We s  
hall take this catalogue of Blue Programs and use it to define a new function o  
f one varia ble-Bluediag [NJ-which will turn out not to be anywhere in the   
list (which is why its name is in italics). Yet Bluediag will clearly be a  
well-defined, calculable function of one variable, and so we will have t  
o conclude that functions exist which simply are not programmable in B  
looP. Here is the definition of Bluediag [  
N]:Equation (1) ... Bluediag [N] = 1 + Blueprogram{#N} [  
N]The strategy is: feed each meat grinder with its own index number, th  
en add 1 to the output. To illustrate, let us find Bluediag [ 12 ]. We saw t  
hat Blueprogram {# l2} is the function 2N; therefore ,Bluediag [12] must h  
ave the value 1 + 2 X 12, or 25. Likewis e,Bluediag [5000] would have the v  
alue 125,000,000,001, since that is 1 more than the cube of 5000. Similarly, you   
can find Bluediag of any particular argument you w  
is

463

The peculiar thing about Bluediag [N] is that it is not represented i  
n the catalogue of Blue Programs. It cannot be. The reason is this. To be a   
Blue Program, it would have to have an index number-say it were B  
lue Program # X. This assumption is expressed by w  
riting Equation (2) ... Bluediag [N] = Blueprogram{# X} [  
N]But there is an inconsistency between the equations (1) and (2). It b  
ecomes apparent at the moment we try to calculate the value of Bluediag [ X ], fo  
r we can do so by letting N take the value of X in either of the two e  
quations. If we substitute into equation (1), we g  
et: Bluediag [ X] = 1 + Blueprogram{ # X} [ X  
] But if we substitute into equation (2) instead, we g  
et: Bluediag [ X] = Blueprogram{# X} [ X  
] Now Bluediag [ X] cannot be equal to a number and also to the successor o  
f that number. But that is what the two equations say. So we will have to g  
o back and erase some assumption on which the inconsistency is based. T  
he only possible candidate for erasure is the assumption expressed by Equation (2): that the function Bluediag [N] is able to be coded up as a B  
lue BlooP program. And that is the proof that Bluediag lies outside the realm o  
f primitive recursive functions. Thus, we have achieved our aim of d  
estroying Achilles' cherished but na"ive notion that every number-theoretical f  
unction must be calculable within a predictable number of s  
tep

463

There are some subtle things going on here. You might ponder t  
his, for instance: the number of steps involved in the calculation o  
f Bluediag [N], for each specific value of N, is predictable-but the diffe  
rent methods of prediction cannot all be united into a general recipe for pr

464

ing the length of calculation of B luediag [ N]. This is an "infinite conspiracy", related to the Tortoise's notion of "infinite coincidences", and also t  
o w-incompleteness. But we shall not trace out the relations in d  
etai

464

Cantor's Original Diagonal Arg  
umen

464

Why is this called a diagonal argument? The terminology comes f  
rom Cantor's original diagonal argument, upon which many other a  
rguments (such as ours) have subsequently been based. To explain Cantor's o  
riginal argument will take us a little off course, but it is worthwhile to do s  
o. Cantor, too, was concerned with showing that some item is not in a c  
ertain list. Specifically, what Cantor wanted to show was that if a "directory" o  
f real numbers were made, it would inevitably leave some real n  
umbers out-so that actually, the notion of a complete directory of real numbers is a  
contradiction in t

464

It must be understood that this pertains not just to directories of fini  
te size, but also to directories of infinite size. It is a much deeper result than t  
he statement "the number of reals is infinite, so of course they cannot be l  
isted in a finite directory". The essence of Cantor's result is that there are (  
at least) two distinct types of infinity: one kind of infinity describes how m  
any entries there can be in an infinite directory or table, and another d  
escribes how many real numbers there are (i.e., how many points there are on a l  
ine, or line segment)-and this latter is "bigger", in the sense that the r  
eal numbers cannot be squeezed into a table whose length is described by t  
he former kind of infinity. So let us see how Cantor's argument involves t  
he notion of diagonal, in a literal s

464

Let us consider just real numbers between O and 1. Assume, for the   
sake of argument, that an infinite list could be given, in which each p  
ositive integer N is matched up with a real number r(N) between O and 1, and i  
n which each real number between O and 1 occurs somewhere down the l  
ine. Since real numbers are given by infinite decimals, we can imagine that t  
he beginning of the table might look as f  
ollows: r( 1 ): . I4 1 5 9 2 6 5 3  
r(2): .3 3 3 3 3 3 3 3 3   
r(3): . 71 8 2 8 1 8 2 8  
r(4): . 41 4 2 1 3 5 6 2  
r(5): .5 0 0 0 0 0 0 0 0   
The digits that run down the diagonal are in boldface: 1, 3, 8, 2, 0, ... N  
ow those diagonal digits are going to be used in making a special real n  
umber d, which is between O and 1 but which, we will see, is not in the list. T  
o make d, you take the diagonal digits in order, and change each one of t  
hem to some other digit. When you prefix this sequence of digits by a d  
ecimal point, you have d. There are of course many ways of changing a digit t  
o some other digit, and correspondingly many different d's. Suppose, f  
o

465

example, that we subtract 1 from the diagonal digits (with the convention that 1  
taken from O is 9). Then our number d will b  
e: .0 2 7 1 9   
Now, because of the way we constructed it,  
H  
ence, d 's 1st digit is not the same as the 1st digit of r(l);  
d's 2nd digit is not the same as the 2nd digit of r(2  
); d's 3rd digit is not the same as the 3rd digit of r(3  
); ... and so o  
n. d is different from r(l);  
d is different from r(2  
); d is different from r(3  
); ... and so o  
n. In other words, d is not in the lis

465

What Does a Diagonal Argument P

465

Now comes the crucial difference between Cantor's proof and our proofit is in the matter of what assumption to go back and undo. In Canto  
r's argument, the shaky assumption was that such a table could be drawn u  
p. Therefore, the conclusion warranted by the construction of d is that n  
o exhaustive table of reals can be drawn up after all-which amounts t  
o saying that the set of integers is just not big enough to index the set of reals.  
On the other hand, in our proof, we know that the directory of Blue B  
looP programs can be drawn up-the set of integers is big enough to index the   
set of Blue BlooP programs. So, we have to go back and retract s  
ome shakier idea which we used. And that idea is that Bluediag [N] is c  
alculable by some program in BlooP. This is a subtle difference in the application o  
f the diagonal metho

465

It may become clearer if we apply it to the alleged "List of All Gre  
at Mathematicians" in the Dialogue-a more concrete example. The diag  
onal itself is "Dboups". If we perform the desired diagonal-subtraction, we wil  
l get "Cantor". Now two conclusions are possible. If you have an unshaka  
ble belief that the list is complete, then you must conclude that Cantor is not a  
Great Mathematician, for his name differs from all those on the list. On t  
he other hand, if you have an unshakable belief that Cantor is a Gre  
at Mathematician, then you must conclude that the List of All Gre  
at Mathematicians is incomplete, for Cantor's name is not on the list! (Woe t  
o those who have unshakable beliefs on both sides!) The former case corresponds to our proof that Bluediag [N] is not primitive recursive; the l  
atter case corresponds to Cantor's proof that the list of reals is incomplet

466

Cantor's proof uses a diagonal in the literal sense of the word. Other   
"diagonal" proofs are based on a more general notion, which is a  
bstracted from the geometric sense of the word. The essence of the diagonal method   
is the fact of using one integer in two different ways-or, one could s  
ay, using one integer on two different levels-thanks to which one can construct a  
n item which is outside of some predetermined list. One time, the int  
eger serves as a vertical index, the other time as a horizontal index. In Canto  
r's construction this is very clear. As for the function Bluediag [N], it inv  
olves using one integer on two different levels-first, as a Blue Program i  
ndex number; and second, as an input p

466

The Insidious Repeatability of the Diagonal A  
rgumen

466

At first, the Cantor argument may seem less than fully convincing. I  
sn't there some way to get around it? Perhaps by throwing in the d  
iagonally constructed number d, one might obtain an exhaustive list. If you c  
onsider this idea, you will see it helps not a bit to throw in the number d, for as s  
oon as you assign it a specific place in the table, the diagonal method b  
ecomes applicable to the new table, and a new missing number d' can be constructed, which is not in the new table. No matter how many times y  
ou repeat the operation of constructing a number by the diagonal method a  
nd then throwing it in to make a "more complete" table, you still are caught on   
the ineradicable hook of Cantor's method. You might even try to build a  
table of reals which tries to outwit the Cantor diagonal method by t  
akin

467

the whole trick, lock, stock, and barrel, including its insidious repeatability  
, into account somehow. It is an interesting exercise. But if you tackle it, y  
ou will see that no matter how you twist and turn trying to avoid the C  
antor "hook", you are still caught on it. One might say that any self-procl  
aimed "table of all reals" is hoist by its own petard.

467

The repeatability of Cantor's diagonal method is similar to the repeatability of the Tortoise's diabolic method for breaking the Cra  
b's phonographs, one by one, as they got more and more "hi-fi" and-at l  
east so the Crab hoped-more "Perfect". This method involves constructing,  
for each phonograph, a particular song which that phonograph c  
annot reproduce. It is not a coincidence that Cantor's trick and the Tortoise's  
trick share this curious repeatability; indeed, the Contrncrostipunctus m  
ight well have been named "Cantorcrostipunctus" instead. Moreover, as t  
he Tortoise subtly hinted to the innocent Achilles, the events in the Contracrostipunctus are a paraphrase of the construction which Godel used in p  
roving his Incompleteness Theorem; it follows that the Godel construction is a  
lso very much like a diagonal construction. This will become quite apparent i  
n the next two Chapters.

467

From BlooP to F  
loo

467

We have now defined the class of primitive recursive functions and primitive recursive properties of natural numbers by means of programs written   
in the language BlooP. We have also shown that BlooP doesn't capture a  
ll the functions of natural numbers which we can define in words. We e  
ven constructed an "unBlooPable" function, Bluediag [ N], by Cantor's diag  
onal method. What is it about BlooP that makes Bluediag unrepresentable in it?  
How could BlooP be improved so that Bluediag became r  
epresentabl

467

BlooP's defining feature was the boundedness of its loops. What if w  
e drop that requirement on loops, and invent a second language, c  
alled "FlooP" ('F' for "free")? FlooP will be identical to BlooP except in o  
ne respect: we may have loops without ceilings, as well as loops with c  
eilings (although the only reason one would include a ceiling when writing a  
loop-statement in FlooP would be for the sake of elegance). These n  
ew loops will be called MU-LOOPS. This follows the convention of mathematical logic, in which "free" searches (searches without bounds) are u  
sually indicated by a symbol called a "µ,-operator" (mu-operator). Thus, loopstatements in FlooP may look like t  
his: MU-LO  
OP: BLOCK n: B  
EGIN BLOCK n: E

468

This feature will allow us to write tests in FlooP for such properties a  
s wondrousness and the Tortoise property-tests which we did not kno  
w how to program in BlooP because of the potential open-endedness of t  
he searches involved. I shall leave it to interested readers to write a FlooP t  
est for wondrousness which does the following t  
hings: (1) If its input, N, is wondrous, the program halts and gives t  
he answer YES.  
( 2)If N is unwondrous, but causes a closed cycle other t  
han1-4-2-1-4-2-1 -... , the program halts and gives the a  
nswerN  
O.( 3)If N is unwondrous, and causes an "endlessly rising progression", the program never halts. This is FlooP's way of answering by not answering. FlooP's nonanswer bears a s  
trangeresemblance to Joshu's nonanswer "  
MU".The irony of case 3 is that OUTPUT always has the value NO, but it is a  
lways inaccessible, since the program is still grinding a way. That tro  
ublesome third alternative is the price that we must pay for the right to write f  
ree loops. In all FlooP programs incorporating the MU-LOOP option, nontermination will always be one theoretical alternative. Of course there will b  
e many FlooP programs which actually terminate for all possible input values. For instance, as I mentioned earlier, it is suspected by most people w  
ho have studied wondrousness that a FlooP program such as suggested a  
bove will always terminate, and moreover with the answer YES each t

468

Terminating and Nonterminating FlooP P  
rogram

468

It would seem extremely desirable to be able to separate FlooP p  
rocedures into two classes: terminators and nonterminators. A terminator will e  
ventually halt no matter what its input, despite the "MU-ness" of its loops. A non terminator will go on and on forever, for at least one choice of input. If we   
could always tell, by some kind of complicated inspection of a Flo  
oP program, to which class it belonged, there would be some r  
emarkable repercussions (as we shall shortly see). Needless to say, the operation o  
f class-checking would itself have to be a terminating operation-oth  
erwise one would gain noth

468

Turing's T  
ricker

468

The idea springs to mind that we might let a BlooP procedure do t  
he inspection. But BlooP procedures only accept numerical input, not programs! However, we can get around that . .. by coding programs into   
numbers! This sly trick is just Godel-numbering in another of its m  
any manifestations. Let the fifty-six characters of the FlooP alphabet get t  
he "codons" 901 ,902, ... , 956, respectively. So each FlooP program now g  
et

469

a very long Godel number. For instance, the shortest BlooP function (  
which is also a terminating FlooP p  
rogram)-DEFINE PROCEDURE "A" [  
B]: BLOCK 0: B  
EGIN BLOCK 0: END  
. -would get the Godel number partially shown below:  
904,905,906,909,914,905, . .......... , 905,914,904,95  
5, D EF INE E  
N

469

Now our scheme would be to write a BlooP test called TERMINAT  
OR? which says YES if its input number codes for a terminating FlooP p  
rogram, NO if not. This way we could hand the task over to a machine and w  
ith luck, distinguish terminators from nonterminators. However, an ingenious argument given by Alan Turing shows that no BlooP program c  
an make this distinction infallibly. The trick is actually much the same a  
s Godel's trick, and therefore closely related to the Cantor diagonal trick. W  
e shall not give it here-suffice it to say that the idea is to feed the termination tester its own Godel number. This is not so simple, however, for it is   
like trying to quote an entire sentence inside itself. You have to quote t  
he quote, and so forth; it seems to lead to an infinite regress. However, T  
uring figured out a trick for feeding a program its own Godel number. A s  
olution to the same problem in a different context will be presented next C  
hapter. In the present Chapter, we shall take a different route to the same g  
oal, which is namely to prove that a termination tester is impossible. For r  
eaders who wish to see an elegant and simple presentation of the Turing approach, I recommend the article by Hoare and Allison, mentioned in t  
he B

469

A Termination Tester Would Be M  
agica

469

Before we destroy the notion, let us delineate just why having a t  
ermination tester would be a remarkable thing. In a sense, it would be like having a  
magical dowsing rod which could solve all problems of number theory i  
n one swell FlooP. Suppose, for instance, that we wished to know if t  
he Goldbach Variation is a true conjecture or not. That is, do all numbers h  
ave the Tortoise property? We would begin by writing a FlooP test c  
alled TORTOISE? which checks whether its input has the Tortoise property. N  
ow the defect of this procedure-namely that it doesn't terminate if the Tortoise property is absent-here turns into a virtue! For now we run t  
he termination tester on the procedure TORTOISE?. If it says YES, that m  
eans that TORTOISE? terminates for all values of its input-in other words, a  
ll numbers have the Tortoise property. If it says NO, then we know t  
here exists a number which has the Achilles property. The irony is that we n  
ever actually use the program TORTOISE? at all-we just inspect i

469

This idea of solving any problem in number theory by coding it into a

470

program and then waving a termination tester over the program is n  
ot unlike the idea of testing a koan for genuineness by coding it into a f  
olded string and then running a test for Buddha-nature on the string instead. A  
s Achilles suggested, perhaps the desired information lies "closer to t  
he surface" in one representation than in a  
nothe

470

Pool F, Index Numbers, and Green P  
rogram

470

Well, enough daydreaming. How can we prove that the termination t  
ester is impossible? Our argument for its impossibility will hinge on trying t  
o apply the diagonal argument to Floo P,just as we did to BlooP. We shall s  
ee that there are some subtle and crucial differences between the two c  
ase

470

As we did for BlooP, imagine the pool of all FlooP programs. We s  
hall call it "Pool F". Then perform the same three filtering operations on P  
ool F, so that you get, in the e  
nd: A complete pool of all call-less FlooP programs which c  
alculate functions of exactly one input p  
arameter. Let us call these special FlooP-programs Green Programs (since they may g  
o forever).

470

Now just as we assigned index numbers to all Blue Programs, we c  
an assign index numbers to Green Programs, by ordering them in a catalogue  
, each volume of which contains all Green Programs of a fixed length,   
arranged in alphabetical order.

470

So far, the carry-over from BlooP to FlooP has been s  
traightforward. Now let us see if we can also carry over the last part: the diagonal t  
rick. What if we try to define a diagonal f  
unction? Greendiag [N] = 1 + Greenprogram{#N} [  
N]Suddenly, there is a snag: this function Greendiag [N] may not have a  
well-defined output value for all input values N. This is simply because w  
e have not filtered out the nonterminator programs from Pool F, and therefore we have no guarantee that we can calculate Greendiag [N] for all v  
alues of N. Sometimes we may enter calculations which never terminate. And t  
he diagonal argument cannot be carried through in such a case, for it d  
epends on the diagonal function having a value for all possible i

470

The Termination Tester Gives Us Red P  
rogram

470

To remedy this, we would have to make use of a termination tester, if o  
ne existed. So let us deliberately introduce the shaky assumption that o  
ne exists, and let us use it as our fourth filter. We run down the list of G  
reen Programs, eliminating one by one all non terminators, so that in the end we   
are left with:

471

A complete pool of all call-less FlooP programs which c  
alculate functions of exactly one input parameter, and which terminate f  
or all values of their input.  
Let us call these special FlooP programs Red Programs (since they all m  
ust stop). Now, the diagonal argument will go through. We d  
efine Reddiag [N] = 1 + Redprogram{#N} [  
N] and in an exact parallel to Bluediag. we are forced to conclude that Reddiag [N] is a well-defined, calculable function of one variable which is not in   
the catalogue of Red Programs, and is hence not even calculable in t  
he powerful language FlooP. Perhaps it is time to move on to G  
looP? GlooP .  
.. Yes, but what is GlooP? If FlooP is BlooP unchained, then GlooP must b  
e FlooP unchained. But how can you take the chains off twice? How do y  
ou make a language whose power transcends that of FlooP? In Reddiag, w  
e have found a function whose values we humans know how to calculate-t  
he method of doing so has been explicitly described in English-but whi  
ch seemingly cannot be programmed in the language FlooP. This is a s  
erious dilemma because no one has ever found any more powerful c  
omputer language than F  
loo

471

Careful investigation into the power of computer languages has b  
een carried out. We need not do it ourselves; let it just be reported that there i  
s a vast class of computer languages all of which can be proven to have exact  
ly the same expressive power as FlooP does, in this sense: any calculation w  
hich can be programmed in any one of the languages can be programmed i  
n them all. The curious thing is that almost any sensible attempt at d  
esigning a computer language ends up by creating a member of this class-which i  
s to say, a language of power equal to that of FlooP. It takes some doing t  
o invent a reasonably interesting computer language which is weaker t  
han those in this class. BlooP is, of course, an example of a weaker language, b  
ut it is the exception rather than the rule. The point is that there are s  
ome extremely natural ways to go about inventing algorithmic languages; a  
nd different people, following independent routes, usually wind up creat  
ing equivalent languages, with the only difference being style, rather t  
han powe

471

... Is a M  
yt

471

In fact, it is widely believed that there cannot be any more powerf  
ul language for describing calculations than languages that are equivalent t  
o FlooP. This hypothesis was formulated in the l 930's by two people, independently of each other: Alan Turing-about whom we will say m  
ore later-and Alonzo Church, one of the eminent logicians of this century. I  

472

is called the Church-Turing Thesis. If we accept the CT-Thesis, we have t  
o conclude that "GlooP" is a myth-there are no restrictions to remove i  
n FlooP, no ways to increase its power by "unshackling" it, as we did B  
loo

472

This puts us in the uncomfortable position of asserting that people c  
an calculate Reddiag [N] for any value of N, but there is no way to program a  
computer to do so. For, if it could be done at all, it could be done in   
FlooP-and by construction, it can't be done in FlooP. This conclusion is s  
o peculiar that it should cause us to investigate very carefully the pillars o  
n which it rests. And one of them, you will recall, was our shaky assumpti  
on that there is a decision procedure which can tell terminating from nonterminating FlooP programs. The idea of such a decision procedure already   
seemed suspect, when we saw that its existence would allow all problems o  
f number theory to be solved in a uniform way. Now we have double t  
he reason for believing that any termination test is a myth-that there is n  
o way to put FlooP programs in a centrifuge and separate out the terminat  
ors from the n  
onterminator

472

Skeptics might maintain that this is nothing like a rigorous proof t  
hat such a termination test doesn't exist. That is a valid objection; however, t  
he Turing approach demonstrates more rigorously that no computer program can be written in a language of the FlooP class which can perform a  
termination test on all FlooP progr  
am

472

The Church-Turing T  
hesi

472

Let us come back briefly to the Church-Turing Thesis. We will talk a  
bout it-and variations on it-in considerable detail in Chapter XVII; for now i  
t will suffice to state it in a couple of versions, and postpone discussion of i  
ts merits and meanings until then. Here, then, are three related ways to s  
tate the CT-Thesis:  
(1) What is human-computable is m  
achine-computable. (2) What is machine-computable is FlooP-com  
putable. (3) What is human-computable is F  
looP-computable (i.e., general or partial r

472

Terminology: General and Partial Recur  
siv

472

We have made a rather broad survey, in this Chapter, of some notions f  
rom number theory and their relations to the theory of computable functions. I  
t is a very wide and flourishing field, an intriguing blend of computer s  
cience and modern mathematics. We should not conclude this Chapter without   
introducing the standard terminology for the notions we have been d  
ealing w  
it

472

As has already been mentioned, "Bloop-computable" is s  
ynonymous with "primitive recursive". Now FlooP-computable functions can be di

473

vided into two realms: (1) those which are computable by terminating F  
looP programs: these are said to be general recursive; and (2) those which a  
re computable only by nonterminating FlooP programs: these are said to b  
e partial recursive. (Similarly for predicates.) People often just say "  
recursive" when they mean "general r

473

The Power of T  
N

473

It is interesting that TNT is so powerful that not only are all p  
rimitive recursive predicates represented, but moreover all general recursive predicates are represented. We shall not prove either of these facts, because s  
uch proofs would be superfluous to our aim, which is to show that TNT is   
incomplete. If TNT could not represent some primitive or general recursive predicates, then it would be incomplete in an uninteresting way-so w  
e might as well assume that it can, and then show that it is incomplete in a  
n interesting w

481

C HA PTER X  
IV On Formally Undecidabl  
e Propositions of TNT  
and Related Systems1

481

The Two Ideas of the "

481

THis CHAPTER'S TITLE is an adaptation of the title of Godel's fam  
ous 1 931 paper-"TNT" having been substituted for "Principia Mathematica".  
Godel's paper was a technical one, concentrating on making his p  
roof watertight and rigorous; this Chapter will be more intuitive, and in it I w  
ill stress the two key ideas which are at the core of the proof. The first key i  
dea is the deep discovery that there are strings of TNT which can be interpreted as speaking about other strings of TNT; in short, that TNT, as a  
language, is capable of "introspection", or self-scrutiny. This is what comes   
from Godel-numbering. The second key idea is that the property of selfscrutiny can be entirely concentrated into a single string; thus that s  
tring's sole focus of attention is itself. This "focusing trick" is traceable, in esse  
nce, to the Cantor diagonal m  
etho

481

In my opinion, if one is interested in understanding Godel's proof in a  
deep way, then one must recognize that the proof, in its essence, consists of   
a fusion of these two main ideas. Each of them alone is a master stroke; t  
o put them together took an act of genius. If I were to choose, h  
owever, which of the two key ideas is deeper, I would unhesitatingly pick the fi  
rst one-the idea of Godel-numbering, for that idea is related to the w  
hole notion of what meaning and reference are, in symbol-manipulating systems. This is an idea which goes far beyond the confines of mathemati  
cal logic, whereas the Cantor trick, rich though it is in mathematical consequences, has little if any relation to issues in real l

481

The First Idea: Proof-P  
air

481

Without further ado, then, let us proceed to the elaboration of the p  
roof itself. We have already given a fairly careful notion of what the G  
odel isomorphism is about, in Chapter IX. We now shall describe a mathematical notion which allows us to translate a statement such as "The string 0  
=0 is a theorem of TNT" into a statement of number theory. This will i  
nvolve the notion of proof-pairs. A proof-pair is a pair of natural numbers r  
elated in a particular way. Here is the i dea:

482

Two natural numbers, m and n respectively, form a TNTproof-pair if and only if m is the Godel number of a TNTderivation whose bottom line is the string with Godel number n  
. The analogous notion exists with respect to the MIU-system, and it is a l  
ittle easier on the intuition to consider that case first. So, for a moment, let u  
s back off from TNT-proof-pairs, and look at MIU-proof-pairs. T  
heir definition is p arallel:  
Two natural numbers, m and n respectively, form a MIU-proofpair if and only if m is the Godel number of a MIU-sy  
stem derivation whose bottom line is the string with Godel number n  
. Let us see a couple of examples involving MIU-proof-pairs. First, l  
et m = 3131131111301, n = 301. These values of m and n do indeed form a  
MIU-proof-pair, because m is the Godel number of the MIU-deri  
vation M  
l M  
il M  
illi M  
UI whose last line is MUI, having Godel number 301, which is n. By c  
ontrast, let m = 31311311130, and n = 30. Why do these two values not form a  
MIU-proof-pair? To see the answer, let us write out the alleged der  
ivation which m codes f  
or: M  
l M  
il M  
ill M  
U There is an invalid step in this alleged derivation! It is the step from t  
he second to the third line: from Mil to Mill. There is no rule of inference i  
n the MIU-system which permits such a typographical s  
tep. Correspondingly-and this is most crucial-there is no arithmetical rule of   
inference which carries you from 311 to 3111. This is perhaps a t  
rivial observation, in light of our discussion in Chapter IX, yet it is at the heart o  
f the Godel isomorphism. What we do in any formal system has its parallel i  
n arithmetical manipulatio

482

In any case, the values m = 31311311130, n = 30 certainly do n  
ot form a MIU-proof-pair. This in itself does not imply that 30 is not a  
MIU-number. There could be another value of m which forms a MIUproof-pair with 30. (Actually, we know by earlier reasoning that MU is not a  
MIU-theorem, and therefore no number at all can form a MIU-pr  
oof-pair with 3

482

Now what about TNT-proof-pairs? Here are two parallel e  
xamples, one being merely an alleged TNT-proof-pair, the other being a v  
alid TNT-proof-pair. Can you spot which is which? (Incidentally, here is w  
her

483

the '611' codon comes in. Its purpose is to separate the Godel numbers of   
successive lines in a TNT-derivation. In that sense, ' 611' serves as a punctuation mark. In the MIU-system, the initial '3' of all lines is sufficien  
t-no extra punctuation is neede  
d.) (I) m = 626,262,636,223,123,262 ,1 11,6 66,611,223 ,12 3,666,1 11,6  
66 n = 123 ,666,1 11,6  
66 (2) m = 626,262,636,223, 123,262,l l l ,666, 611,223,333,262,636,123,262,l l l,6  
66 n = 223,333,262,636,123,262,l l L  
666 It is quite simple to tell which one is which, simply by translating back to t  
he old notation, and making some routine examinations to s  
ee (1) whether the alleged derivation coded for by m is actually a  
legitimate deri  
vation; (2) if so, whether the last line of the derivation coincides with t  
he string which n codes f  
or. Step 2 is t rivial; and step 1 is also utterly straightforward, in this s ense:  
there are no open-ended searches involved, no hidden endless l  
oops. Think of the examples above involving the MIU-system, and now j  
ust mentally substitute the rules of TNT for the MIU-system's rules, and t  
he axioms of TNT for the MIU-system's one axiom. The algorithm in b  
oth cases is the same. Let me make that algorithm e  
xplicit: Go down the lines in the derivation one by o  
ne. Mark those which are a  
xioms. For each line which is not an axiom, check whether it follows b  
y any of the rules of inference from earlier lines in the a  
lleged derivation.  
If all nonaxioms follow by rules of inference from earlier l  
ines, then you have a legitimate derivation; otherwise it is a p  
hony der  
ivation. At each stage, there is a clear set of tasks to perform, and the number o  
f them is quite easily determinable in adva

483

Proof-Pair-ness Is Primitive Recur  
siv

483

The reason I am stressing the boundedness of these loops is, as you m  
ay have sensed, that I am about to a  
s�ert FUNDAMENTAL FACT 1: The property of being a proof-pair is a  
primitive recursive number-theoretical property, and can therefore be tested for by a BlooP p  
rogram. There is a notable contrast to be made here with that other c  
losely related number-theoretical property: that of being a theorem-number. T  

484

assert that n is a theorem-number is to assert that some value of m e  
xists which forms a proof-pair with n. (Incidentally, these comments a  
pply equally well to TNT and to the MIU-system; it may perhaps help to k  
eep both in mind, the MIU-system serving as a prototype.) To check whether n  
is a theorem-number, you must embark on a search through all its p  
otential proof-pair "partners" m-and here you may be getting into an e  
ndless chase. No one can say how far you will have to look to find a number w  
hich forms a proof-pair with n as its second element. That is the whole p  
roblem of having lengthening and shortening rules in the same system: they lead t  
o a certain degree of unpredicta

484

The example of the Goldbach Variation may prove helpful at t  
his point. It is trivial to test whether a pair of numbers (m,n) form a Tortoisepair: that is to say, both m and n + m should be prime. The test is e  
asy because the property of primeness is primitive recursive: it admits of a  
predictably terminating test. But if we want to know whether n p  
ossesses the Tortoise property, then we are asking, "Does any number m form a  
Tortoise-pair with n as its second element?"-and this, once again, leads u  
s out into the wild, MU-loopy unknown .

484

. . . And Is Therefore Represented in T  
N

484

The key concept at this juncture, then, is Fundamental Fact I given a  
bove, for from it we can c  
onclude FuNDAMENT AL FACT 2: The property of forming a proof-pair i  
s testable in BlooP, and consequently, it is represented in TNT b  
y some formula having two free v  
ariables. Once again, we are being casual about specifying which system t  
hese proof-pairs are relative to; it really doesn't matter, for both Fundament  
al Facts hold for any formal system. That is the nature of formal systems: it i  
s always possible to tell, in a predictably terminating way, whether a g  
iven sequence of lines forms a proof, or not-and this carries over to t  
he corresponding arithmetical n

484

The Power of Proof-P  
air

484

Suppose we assume we are dealing with the MIU-system, for the sake of   
concreteness. You probably recall the string we called "MUMON", w  
hose interpretation on one level was the statement "MU is a theorem of t  
he MIU-system". We can show how MUMON would be expressed in TNT, i  
n terms of the formula which represents the notion of MIU-proof-pairs. L  
et us abbreviate that formula, whose existence we are assured of by Fundamental Fact 2, this way:  
MIU-PROOF-PAIR{a,a'

485

Since it is a property of two numbers, it is represented by a formula with  
two free variables. (Note: In this Chapter we shall always use a  
ustere TNT-so be careful to distinguish between the variables a, a', a ''.) In o  
rder to assert "MU is a theorem of the Ml U-system", we would have to make t  
he isomorphic statement "30 is a theorem-number of the MIU-system", a  
nd then translate that into TNT-notation. With the aid of our a  
bbreviation, this is easy (remember also from Chapter VIII that to indicate the replacement of every a' by a numeral, we write that numeral followed by "/a '"  
): 3a:MI LI-PROOF-PAIR{ a,SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS0/ a  
'} Count the S's: there are 30. Note that this is a closed sentence of T  
NT, because one free variable was quantified, the other replaced by a n  
umeral. A clever thing has been done here, by the way. Fundamental Fact 2 gave u  
s a way to talk about proof-pairs; we have figured out how to talk a  
bout theorem-numbers, as well: you just acid an existential quantifier in front! A  
more literal translation of the string above would be, "There exists s  
ome number a that forms a MIU-proof-pair with 30 as its second e  
lemen

485

Suppose that we wanted to do something parallel with respect t  
o TNT-say, to express the statement ''0=0 is a theorem of TNT". We m  
ay abbreviate the formula which Fundamental Fact 2 assures us exists, in a  
n analogous way (with two free variables, again)  
: TNT-PROOF-PAIR{a,a'  
} (The interpretation of this abbreviated TNT-formula is: "Natural n  
umbers a and a' form a TNT-proof-pair.'') The next step is to transform o  
ur statement into number theory, following the MUMON-model above. T  
he statement becomes "There exists some number a which forms a TNTproof-pair with 666,111,666 as its second element". The TNT-formula   
which expresses this is:  
3a:TNT-PROOF-PAIR{a,SSSSS . ........ SSSSS0/a' }   
--------------many, many S  
's! (in fact, 666, 111,666 of them  
) -a closed sentence of TNT. (Let us call it "JOSHO", for reasons to a  
ppear momentarily.) So you see that there is a way to talk not only about t  
he primitive recursive notion of TNT-proof-pairs, but also about the relate  
d but trickier notion of TNT-theorem-n

485

To check your comprehension of these ideas, figure out how to translate into TNT the following statements of meta-  
TNT: (1) 0=0 is not a theorem of T:\IT.  
(2) ~0=0 is a theorem of T  
!\T. (3) ~0=0 is not a theorem of TNT.

486

How do the solutions differ from the example done above, and from e  
ach other? Here are a few more translation exerc  
ises. (4) JOsHO is a theorem of TNT. (Call the TNT-string w  
hich expresses this "META-j0SH0".  
) (5) META-JOsHO is a theorem of TNT. (Call the TNT-st  
ring which expresses this "META-META-JOsH  
O".) (6) META-META-j0SH0 is a theorem of T  
NT. (7) META-META-META-JOSHO is a theorem of T  
NT. (etc., e  
tc.) Example 5 shows that statements of meta-meta-TNT can be translated i  
nto TNT-notation; example 6 does the same for meta-meta-meta-TNT, e  
t

486

It is important to keep in mind the difference between expressing a  
property, and representing it, at this point. The property of being a TNTtheorem-number, for instance, is expressed by the f  
ormula 3a:TNT-PROOF-PAIR{a,a'  
} Translation: "a' is a TNT-theorem-number". However, we have n  
o guarantee that this formula represents the notion, for we have no guarant  
ee that this property is primitive recursive-in fact, we have more than a   
sneaking suspicion that it isn't. (This suspicion is well warranted. T  
he property of being a TNT-theorem-number is not primitive recursive, a  
nd no TNT-formula can represent the property!) By contrast, the property o  
f being a proof-pair, by virtue of its primitive recursivity, is both e  
xpressible and representable, by the formula already i

486

Substitution Leads to the Second Idea

486

The preceding discussion got us to the point where we saw how TNT can   
"introspect" on the notion of TNT-theoremhood. This is the essence of t  
he first part of the proof. We now wish to press on to the second major idea of   
the proof, by developing a notion which allows the concentration of t  
his introspection into a single formula. To do this, we need to look at w  
hat happens to the Godel number of a formula when you modify the f  
ormula structurally in a simple way. In fact, we shall consider this specific modification:  
replacement of all free variables by a specific n  
umeral. Below are shown a couple of examples of this operation in the left-hand  
column, and in the right-hand column are exhibited the parallel changes in   
Godel n  
umber

487

F  
ormula a=a  
We now replace a  
ll free variables b  
y the numeral for 2  
: SSO=S  
SO Godel n  
umber 262,111,2  
62 l  
123,123,666,l l l,123,123  
,666 * * * * *   
~3a:3a':a" = (SSa · S  
Sa') We now replace a  
ll free variables b  
y the numeral for 4  
: 223,333,262,636,333,262,163,6  
36, 262,163,163,l l l,362,123,1  
23,262, 236 ,123 , I 2  
l  
62, 1 63,3  
23 ~3a:3a':SSSSO= (SSa · SSa') 223,333,262,636,333,262,1  
63,636, 123,123,123,123,666,l l l,362,1  
23, 123,262,236,123,123,262,163,3  
2

487

An isomorphic arithmetical process is going on in the right-hand  
column, in which one huge number is turned into an even huger n  
umber. The function which makes the new number from the old one would not b  
e too difficult to describe arithmetically, in terms of additions, multiplications, powers of IO and so on-but we need not do so. The main point i  
s this: that the relation among (1) the original Godel number, (2) t  
he number whose numeral is inserted, and (3) the resulting Godel number, i  
s a primitive recursive relation. That is to say, a BlooP test could be writ  
ten which, when fed as input any three natural numbers, says YES if they they   
are related in this way, and NO if they aren't. You may test yourself on y  
our ability to perform such a test-and at the same time convince yourself t  
hat there are no hidden open-ended loops to the process-by checking the   
following two sets of three numbers:  
(1) 362,262,112,262,163,323,l l l,123,123,123,123  
,666; 2  
; 362,123,123,666,112,123, 123,666,323,l l l,123,123,123,123  
,666. (2) 223,362,262,236,262,323,111,262,1  
63; I  
; 223,362,123,666,236,123,666,323,111,262,163  
. As usual, one of the examples checks, the other does not. Now this relationship between three numbers will be called the substitution r  
elationship. Because it is primitive recursive, it is represented by some formula of T  
NT having three free variables. Let us abbreviate that TNT-formula by t  
he following n  
otation: SUB{ a,a' ,a"

488

Because this formula represents the substitution relationship, the f  
ormula shown below must be a T  
NT-theorem: SUB  
{SSSSS ..... SSSSSO/a,SSO/a',SSSSSS   
..... SSSSO/a"  
} ------------------------262,lJl,262 S's 123,123,666,ll l,123,123,666 S  
's (This is based on the first example of the substitution relation shown in t  
he parallel columns earlier in this section.) And again because the SUB formula represents the substitution relation, the formula shown below certainly is not a T  
NT-theorem: SUB{SSSO/a,SSO/a' .SO/a' '

488

Arithmoquin  
in

488

We now have reached the crucial point where we can combine all of o  
ur disassembled parts into one meaningful whole. We want to use the machinery of the TNT-PROOF-PAIR and SUB formulas in some way to construct a  
single sentence of TNT whose interpretation is: 'This very string of T  
NT is not a TNT-theorem." How do we do it? Even at this point, with all t  
he necessary machinery in front of us, the answer is not easy to f

488

A curious and perhaps frivolous-seeming notion is that of sub  
stituting a formula's own Godel number into itself. This is quite parallel to that o  
ther curious, and perhaps frivolous-seeming, notion of "quining" in the Air on   
G's String. Yet quining turned out to have a funny kind of importance, i  
n that it showed a new way of making a self-referential sentence. Selfreference of the Quine variety sneaks up on you from behind the first t  
ime you see it-but once you understand the principle, you appreciate that it i  
s quite simple and lovely. The arithmetical version of quining-let's call i  
t arithmoquining-will allow us to make a TNT-sentence which is "  
about itsel

488

Let us see an example of arithmoquining. We need a formula with a  
t least one free variable. The following one will d  
o: a=SO  
This formula's Godel number is 262,111,123,666, and we will stick t  
his number into the formula itself-or rather, we will stick its numeral in. H  
ere is the r  
esult: sssss ..... ssssso = s  
o -----------262,111,123,666 S  
's This new formula asserts a silly falsity-that 262,111,123,666 equals 1. I  
f we had begun with the string ~a=SO and then arithmoquined, we w  
ould have come up with a true statement-as you can see for yourself.

488

When you arithmoquine, you are of course performing a special c  
as

489

of the substitution operation we defined earlier. If we wanted to s  
peak about arithmoquining inside TNT, we would use the f  
ormula S UB{a'', a", a'}  
where the first two variables are the same. This comes from the fact that w  
e are using a single number in two different ways (shades of the Can  
tor diagonal method!). The number a" is both (1) the original Godel n  
umber, and (2) the insertion-number. Let us invent an abbreviation for the a  
bove f  
ormula: ARITHMOQUINE{a", a  
'} What the above formula says, in English, is:  
a' is the Godel number of the formula gotten by arith  
moquining the formula with Godel number a  
". Now the preceding sentence is long and ugly. Let's introduce a concise a  
nd elegant term to summarize it. We'll say   
a' is the arithmoquinification of a"  
to mean the same thing. For instance, the arithmoquinification o  
f 262, 111,123,666 is this unutterably gigantic n  
umber: 123,123,123, ..... ,123,123 ,1 23,666 ,l l l ,123,  
666 2 62,111,123,666 copies of ' 12  
3' (This is just the Godel number of the formula we got when w  
e arithmoquined a=S0.) We can s peak quite easily about a  
rithmoquining inside T

489

The Last S  
tra

489

Now if you look back in the Air on G's String, you will see that the ult  
imate trick necessary for achieving self-reference in Quine's way is to quine a   
sentence which itself talks about the concept of quining. It's not enough j  
ust to quine-you must quine a quine-rnentioning sentence! All right, thenthe parallel trick in our case must be to arithmoquine some formula w  
hich itself is talking about the notion of arithmoquining!

489

Without further ado, we'll now write that formula down, and call it G's  
uncle:  
~3a:3a':<TNT-PROOF-PAIR{a,a'}AARITHMOQU1NE{a'',  
a'}> You can see explicitly how arithmoquinification is thickly involved in t  
he plot. Now this "uncle" has a Godel number, of course, which we'll call 'u

490

The head and tail of u's decimal expansion, and even a teeny bit of i  
ts midsection, can be read off directly  
: u = 223,333,262,636,333,262,16 3,636,212, ... ,161, ... , 21  
3 For the rest, we'd have to know just how the formulas TNT-PROOF-PAIR   
and ARITHMOQUINE actually look when written out. That is too c  
omplex, and it is quite beside the point, in any c  
as

490

Now all we need to do is-arithmoquine this very uncle! What t  
his entails is "booting out" all free variables-of which there is only o  
ne, namely a"-and putting in the numeral for u everywhere. This gives u  
s: ~3a:3a':<TNT-PROOF-PAIR{a,a'}AARITHMOQUINE{SSS ... SSS0/a",a  
'}> ---------u S  
's And this, believe it or not, is Godel's string, which we can call 'G'. Now t  
here are two questions we must answer without delay. They a  
re (1) What is G's Godel n  
umber? (2) What is the interpretation of G  
? Question 1 first. How did we make G? Well, we began with the uncle, a  
nd arithmoquined it. So, by the definition of arithmoquinification, G's G  
odel number i  
s: the arithmoquinification of u  
. Now question 2. We will translate G into English in stages, getting g  
radually more comprehensible as we go along. For our first rough try, we make a  
p retty literal trans  
lation: "There do not exist numbers a and a' such that both ( 1) they fo  
rm a TNT-proof-pair, and (2) a' is the arithmoquinification of u ."  
Now certainly there is a number a' which is the arithmoquinification o  
f u-so the problem must lie with the other number, a. This observ  
ation allows us to rephrase the translation of G as f  
ollows: "There is no number a that forms a T  
NT-proof-pair with the arithmoquinification of u ."  
(This step, which can be confusing, is explained below in more detail.) D  
o you see what is happening? G is saying t  
his: "The formula whose Godel number is the a  
rithmoquinification of u is not a theorem of T  
NT." But-and this should come as no surprise by now-that formula is n  
one other than G itself; whence we can make the ultimate translation of G a  
s "G is not a theorem of T

491

-or if you p  
refer, "I am not a theorem of T  
NT." We have gradually pulled a high-level interpretation-a sentence o  
f meta-TNT-out of what was originally a low-level interpretation-a sentence of number t  
heor

491

TNT Says "Uncle!

491

The main consequence of this amazing construction has already b  
een delineated in Chapter IX: it is the incompleteness of TNT. To reiterate t  
he argument:  
Is G a TNT-theorem? If so, then it must assert a truth. But  
what in fact does G assert? Its own nontheoremhood. Thus f  
rom its theoremhood would follow its nontheoremhood: a contradict  
ion. Now what about G being a nontheorem? This is acceptable, i  
n that it doesn't lead to a contradiction. But G's nontheoremhood is   
what G asserts-hence G asserts a truth. And since G is not a  
theorem, there exists (at least) one truth which is not a theorem o  
f T

491

Now to explain that one tricky step again. I will use another s  
imilar example. Take this s  
tring: ~3a:3a':<TORTOISE-PAIR{a,a'}ATENTH-POWER{SS0/a'',  
a'}> where the two abbreviations are for strings of TNT which you can w  
rite down yourself. TENTH-POWER{a",a '} represents the statement "a' is t  
he tenth power of a "". The literal translation into English is t  
hen: "There do not exist numbers a and a' such that both (1) they f  
orm a Tortoise-pair, and (2) a' is the tenth power of 2  
." But clearly, there is a tenth power of 2-namely 1024. Therefore, what t  
he string is really saying is t  
hat "There is no number a that forms a Tortoise-pair with 102  
4" which can be further boiled down t  
o: "1024 does not have the Tortoise propert  
y." The point is that we have achieved a way of substituting a description of a  
number, rather than its numeral, into a predicate. It depends on using o  
ne extra quantified variable (a'). Here, it was the number 1024 that w  
as described as "the tenth power of 2"; above, it was the number described a  
s "the arithmoquinification of u

492

"Yields Nontheoremhood When Arithm  
oquine

492

Let us pause for breath for a moment, and review what has been done. T  
he best way I know to give some perspective is to set out explicitly how i  
t compares with the version of the Epimenides paradox due to Quine. Here  
1s a map:  
falsehood ¢:  
:;, quotation of a phrase ¢:  
=> preceding a predicate ¢:  
:;, by a subj  
ect preceding a predicate ¢:  
=> by a quoted p  
hrase preceding a predicate ¢:  
=> by itself, in q  
uotes ("quini  
ng") yields falsehood when quined ¢:  
=> (a predicate without a subj  
ect) "yields falsehood when quined" ¢:  
=> (the above predicate, q  
uoted) "yields falsehood when quined" ¢:  
:;, yields falsehood when quine  
d (complete sentence formed b  
y quining the above predic  
ate) n  
ontheoremhood Godel number of a s  
tring substituting a numeral (  
or definite term) into an open fo  
rmula substituting the Godel n  
umber of a string into an open fo  
rmula substituting the Godel n  
umber of an open formula into t  
he formula itself ("arithmoquining  
") the "uncle" of G  
(an open formula of T  
NT) the number u (the Godel n  
umber of the above open form  
ula) G i  
tself (sentence of TNT formed b  
y substituting u into the u  
ncle, i.e., arithmoquining the u

492

Godel's Second T  
heore

492

Since G's interpretation is true, the interpretation of its negation ~G i  
s false. And we know that no false statements are derivable in TNT. Th u  
s neither G nor its negation ~G can be a theorem of TNT. We have found a "  
hole" in our system-an undecidable proposition. This has a number of ramifications. Here is one curious fact which follows from G's undecidabilit y:  
although neither G nor ~G is a theorem, the formula <Gv~G> is a  
theorem, since the rules of the Propositional Calculus ensure that all   
well-formed formulas of the form <Pv~P> are t  
heorem

492

This is one simple example where an assertion inside the system and a  
n assertion about the system seem at odds with each other. It makes o  
ne wonder if the system really reflects itself accurately. Does the "refle  
cted metamathematics" which exists inside TNT correspond well to t  
he metamathematics which we do? This was one of the questions which intrigued Godel when he wrote his paper. In particular, he was interested i  
n whether it was possible, in the "reflected metamathematics'', to p  
rove TNT's consistency. Recall that this was a great philosophical dilemma o  

493

the d ay: how to prove a system consistent. Godel found a simple way t  
o express the statement "TNT is consistent" in a TNT formula; and then he   
showed that this formula (and all others which express the same idea) a  
re only theorems of TNT under one condition: that TNT is inconsistent. T  
his perverse result was a severe blow to optimists who expected that one c  
ould find a rigorous proof that mathematics is contradiction-fr  
e

493

How do you express the statement "TNT is consistent" inside TNT? I  
t hinges on this simple fact: that inconsistency means that two formulas, x  
and ~ x, one the negation of the other, are both theorems. But if both x  
and ~ x are theorems, then according to the Propositional Calculus, a  
ll well-formed formulas are theorems. Thus, to show TNT's consistency, i  
t would suffice to exhibit one single sentence of TNT which can be proven t  
o be a nontheorem. Therefore, one way to express "TNT is consistent" is t  
o say "The formula ~0=0 is not a theorem of TNT". This was a  
lready proposed as an exercise a few pages back. The translation i  
s: ~3a:TNT-PROOF-PAIR{a  
,SSSSS ..... SSSSS0/a'  
} --------------223 ,666,111,666 S  
's It can be shown, by lengthy but fairly straightforward reasoning, t  
hat-as long as TNT is consistent-this oath-of-consistency by TNT is not a theorem of TNT. So TNT's powers of introspection are great when it comes t  
o expressing things, but fairly weak when it comes to proving them. This i  
s quite a provocative result, if one applies it metaphorically to the h  
uman problem of s

493

TNT Is w-lnco  
mplet

493

TNT's incompleteness is of the "omega" variety-defined in Chapter VIII.  
This means that there is some infinite pyramidal family of strings all o  
f which are theorems, but whose associated "summarizing string" is a nontheorem. It is easy to exhibit the summarizing string which is a nontheor  
em: u S  
's � Va:~3a':<TNT-PROOF-PAIR{a,a' }AARITHMOQUINE{SSS ... SSS0/a",a  
'}> To understand why this string is a nontheorem, notice that it is e  
xtremely similar to G itself-in fact, G can be made from it in one step (  
viz., according to TNT's Rule of Interchange). Therefore, if it were a t  
heorem, so would G be. But since G isn't a theorem, neither can this b

493

Now we want to show that all of the strings in the related pyram  
idal family are theorems. We can write them down easily enoug

494

u  
u S  
's _,.___ -3a': <TNT-PROOF-PAIR{0/a,a'} A ARITHMOQUINE{SSS ... SSS0/a", a  
'}>-3a': <TNT-PROOF-PAIR{S0/a,a'} A ARITHMOQUINE{SSS ... SSS0/a", a  
')>-3a': <TNT-PROOF-PAIR{SS0/a,a'} A ARITHMOQUINE{SSS ... SSS0/a", a  
'}>-3a': <TNT-PROOF-PAIR{SSS0/a,a') AARITHMOQUINE{SSS ... SSS0/a", a  
')>What does each one assert? Their translations, one by one, a  
re: "O and the arithmoquinification of u do not form a TNT-proof-  
pair." "l and the arithmoquinification of u do not form a TNT-proof-  
pair." "2 and the arithmoquinification of u do not form a TNT-proof-p  
air." "3 and the arithmoquinification of u do not form a TNT-proof-p  
air." Now each of these assertions is about whether two specific integers form a   
proof-pair or not. (By contrast, G itself is about whether one specific i  
nteger is a theorem-number or not.) Now because ·G is a nontheorem, no i  
nteger forms a proof-pair with G's Godel number. Therefore, each of the statements of the family is true. Now the crux of the matter is that the p  
roperty of being a proof-pair is primitive r ecursive, hence represented, so that e  
ach of the statements in the list above, being true, must translate into a t  
heorem of TNT-which means that everything in our infinite pyramidal family is a  
theorem. And that shows why TNT is w

494

Two Different Ways to Plug Up the H  
ol

494

Since G's interpretation is true, the interpretation of its negation ~G i  
s false. And, using the assumption that TNT is consistent, we know that n  
o false statements are derivable in TNT. Thus neither G nor its negation ~  
G is a theorem of TNT. We have found a hole in our system-an u  
ndecidable proposition. Now this need be no source of alarm, ifwe are philosophical  
ly detached enough to recognize what this is a symptom of. It signifies t  
hat TNT can be extended, just as absolute geometry could be. In fact, T  
NT can be extended in two distinct directions, just as absolute geometry c  
ould be. It can be extended in a standard direction-which corresponds to extending absolute geometry in the Euclidean direction; or, it can be extended in a nonstandard direction-which corresponds, of course, to extending absolute geometry in the non-Euclidean direction. Now the standard type of extension would i  
nvolve adding G as a new a  
xio

495

This suggestion seems rather innocuous and perhaps even desirable, sinc  
e, after all, G asserts something true about the natural number system. B  
ut what about the nonstandard type of extension? If it is at all parallel to t  
he case of the parallel postulate, it must i  
nvolve adding the negation of G as a new a  
xiom. But how can we even contemplate doing such a repugnant, hideous t  
hing? After all, to paraphrase the memorable words of Girolamo Saccheri, isn  
't what ~G says "repugnant to the nature of the natural n

495

Supernatural Num  
ber

495

I hope the irony of this quotation strikes you. The exact problem w  
ith Saccheri's approach to geometry was that he began with a fixed notion o  
f what was true and what was not true, and he set out only to prove what h  
e'd assessed as true to start with. Despite the cleverness of his approa  
ch-which involved denying the fifth postulate, and then proving many "repugna  
nt" propositions of the ensuing geometry-Saccheri never entertained t  
he possibility of other ways of thinking about points and lines. Now we s  
hould be wary of repeating this famous mistake. We must consider impartially, t  
o the extent that we can, what it would mean to add ~ Gas an axiom to T  
NT. Just think what mathematics would be like today if people had n  
ever considered adding new axioms of the following s  
orts: 3a:(a+a)=  
S0 3a:Sa=  
O 3a:(a · a) =SS  
O 3 a:S (a·a) =  
0 While each of them is "repugnant to the nature of previously k  
nown number systems", each of them also provides a deep and wonderful extension of the notion of whole numbers: rational numbers, negative n  
umbers, irrational numbers, imaginary numbers. Such a possibility is what ~G i  
s trying to get us to open our eyes to. Now in the past, each new extension o  
f the notion of number was greeted with hoots and catcalls. You can hear t  
his particularly loudly in the names attached to the unwelcome arrivals, such a  
s "irrational numbers", "imaginary numbers". True to this tradition, we s  
hall name the numbers which ~G is announcing to us the supernatural n  
umbers, .  
showing how we feel they violate all reasonable and commonsensical not

495

If we are going to throw ~ Gin as the sixth axiom of TNT, we h  
ad better understand how in the world it. could coexist, in one system, with t  
he infinite pyramidal family we just finished discussing. To put it b luntly, ~  
G s  
ays: 4  
52 "There exists some number which forms a TNT-p  
roof-pair with the arithmoquinification of u

496

-but the various members of the pyramidal family s uccessively a  
ssert:"O is not that n  
umber" "l is not that n  
umber" "2 is not that n  
umber" This is rather confusing, because it seems to be a complete contradiction  
(which is why it is called "w-inconsiste ncy"). At the root of our  
confusion-much as in the case of the splitting of geometry-is our stubborn resistance to adopt a modified interpretation for the symbols, d  
espite the fact that we are quite aware that the system is a modified s ystem. W  
e want to get away without reinterpreting any symbols-and of course that   
will prove i

496

The reconciliation comes when we reinterpret 3 as "There exists a  
generalized natural number", rather than as "There exists a n  
atural number". As we do this, we shall also reinterpret Vin the c  
orresponding way. This means that we are opening the door to some extra n  
umbers besides the natural numbers. These are the supernatural numbers. T  
he naturals and supernaturals together make up the totality of generali  
zed n

496

The apparent contradicrion vanishes into thin air, now, for the pyramidal family still says what it said b efore: "No natural number forms a  
TNT-proof-pair with the arithmoquinification of u ." The family doesn'  
t say anything about supernatural numbers, because there are no numerals   
for them. But now, ~G says, "There exists a generalized natural n  
umber which forms a TNT-proof-pair with the arithmoquinification of u. " It i  
s clear that taken together, the f amily and ~G tell us something: that there i  
s a supernatural number which forms a TNT-proof-pair with the arithmoquinification of u. That is all-there is no contradiction any more.   
TNT +~G is a consistent system, under an interpretation which i  
ncludes supernatural n  
umber

496

Since we have now agreed to extend the interpretations of the t  
wo quantifiers, this means that any theorem which involves either of them h  
as an extended meaning. For example, the commutativity t  
heorem Va:Va':(a+a')=(a' +  
a) now tells us that addition is commutative for all generalized n  
atural numbers-in other words, not only for natural numbers, but also f  
or supernatural numbers. Likewise, the TNT-theorem which says "2 is not t  
he square of a natural number  
"-~3a:( a·a)=  
SSO -now tells us that 2 is not the square of a supernatural number, either. I  
nfact, supernatural numbers share all the properties of natural numbers, a  

497

long as those properties are given to us in theorems of TNT. In o  
ther words, everything that can be formally proven about natural numbers i  
s thereby established also for supernatural numbers. This means, in particular, that supernatural numbers are not anything already familiar to you,  
such as fractions, or negative numbers, or complex numbers, or whatev  
er. The supernatural numbers are, instead, best visualized as integers w  
hich are greater than all natural numbers--as infinitely large integers. Here is t  
he point: although theorems of TNT can rule out negative numbers, fractions, irrational numbers, and complex numbers, still there is no way t  
o rule out infinitely large integers. The problem is, there is no way even t  
o express the statement "There are no infinite q

497

This sounds quite strange, at first. Just exactly how big is the n  
umber which makes a TNT-proof-pair with G's Godel number? (Let's call i t'/',  
for no particular reason.) Unfortunately, we have not got any good vocabulary for describing the sizes of infinitely large integers, so I am afraid I  
cannot convey a sense of J's magnitude. But then just how big is i (  
the square root of -1)? Its size cannot be imagined in terms of the sizes of   
familiar natural numbers. You can't say, "Well, i is about half as big as 14,  
and 9/10 as big as 24." You have to say, "i squared is -1", and more or l  
ess leave it at that. A quote from Abraham Lincoln seems a propos h  
ere. When he was asked, "How long should a man's legs be?" he drawled, "  
Long enough to reach the ground." That is more or less how to answer t  
he question about the size of /-it should be just the size of a number which  
specifies the structure of a proof of G-no bigger, no smal  
le

497

Of course, any theorem of TNT has many different derivations, so y  
ou might complain that my characterization o f/ is non unique. That is so. B  
ut the parallel with i-the square root of - I-still holds. Namely, recall t  
hat there is another number whose square is also minus o ne: -i. Now i and -  
i are not the same number. They just have a property in common. The o  
nly trouble is that it is the property which defines them! We have to choose one   
of them-it doesn't matter which one--and call it "i". In fact there's no w  
ay of telling them apart. So for all we know we could have been calling t  
he wrong one "i" for all these centuries and it would have made no differenc  
e. Now, like i, I is also nonuniquely defined. So you just have to think o f/ a  
s being some specific one of the many possible supernatural numbers w  
hich form TNT-proof-pairs with the arithmoquinification of u

497

Supernatural Theorems Have Infinitely Long Derivati  
on

497

We haven't yet faced head on what it means to throw -G in as an a  
xiom. We have said it but not stressed it. The point is that -G asserts that G has a  
proof How can a system survive, when one of its axioms asserts that its o  
wn negation has a proof? We must be in hot water now! Well, it is not so bad a  
s you might think. As long as we only construct finite proofs, we will n  
ever prove G. Therefore, no calamitous collision between G and its negation -  
G will ever take p lace. The supernatural number / won't cause any d  
isaste

498

However, we will have to get used to the idea that ~G is now the one w  
hich asserts a truth ("G has a proof"), while G asserts a falsity ("G has n  
o proof"). In standard number theory it is the other way around-but t  
hen, in standard number theory there aren't any supernatural numbers. N  
otice that a supernatural theorem of TNT-namely G-may assert a falsity, b  
ut all natural theorems still assert t  
ruth

498

Supernatural Addition and Mul  
tiplicatio

498

There is one extremely curious and unexpected fact about s  
upernaturals which I would like to tell you, without proof. (I don't know the p  
roof either.) This fact is reminiscent of the Heisenberg uncertainty principle in   
quantum mechanics. It turns out that you can "index" the supernaturals i  
n a simple and natural way by associating with each supernatural number a  
trio of ordinary integers (including n egative ones). Thus, our o  
riginal supernatural number, /, might have the index set (9,-8,3), and its successor, / + 1, might have the index set (9,-8,4). Now there is no unique way t  
o index the supernaturals; different methods offer different advantages a  
nd disadvantages. Under some indexing schemes, it is very easy to calculat  
e the index triplet for the sum of two supernaturals, given the indices of t  
he two numbers to be added. Under other indexing schemes, it is very easy to   
calculate the index triplet for the product of two supernaturals, given t  
he indices of the two numbers to be multiplied. But under no indexing s  
cheme is it possible to calculate both. More p recisely, if the sum's index can b  
e calculated by a recursive function, then the product's index will not be a  
r ecursive function; and conversely, if the product's index is a r  
ecursive function, then the sum's index will not be. Therefore, supernatural schoolchildren who learn their supernatural plus-tables will have to be excused i  
f they do not know their supernatural times-tables-and vice versa! Y  
ou cannot know both at the same t  
im

498

Supernaturals Are Useful .

498

supernatural fractions (ratios of two supernaturals), supernatural r  
eal numbers, and so on. In fact, the calculus can be put on a new footing, u  
sing the notion of supernatural real numbers. Infinitesimals such as dx and dy,  
those old bugaboos of mathematicians, can be completely justified, b  
y considering them to be reciprocals of infinitely large real numbers! S  
ome theorems in advanced analysis can be proven more intuitively with the a  
id of "nonstandard a

498

But Are They R

498

Nonstandard number theory is a disorienting thing when you first meet u  
p with it. But then, non-Euclidean geometry is also a disorienting subject. I  

499

both instances, one is powerfully driven to �sk, "But which one of these t  
wo rival theories is correct? Which is th1• truth?" In a certain sense, there is n  
o answer to such a question. (And yet, in another sense-to be d  
iscussed later-there is an answer.) The reason that there is no answer to t  
he question is that the two rival theories, although they employ the s  
ame terms, do not talk about the same concepts. Therefore, they are o  
nly superficially rivals, just like Euclidean and non-Euclidean geometries. I  
n geometry, the words "point", "line". and so on are undefined terms, a  
nd their meanings are determined by the axiomatic system within which t  
hey are u  
se

499

Likewise for number theory. When we decided to formalize TNT, w  
e preselected the terms we would use as interpretation words-for i  
nstance, words such as "number", "plus", "times", and so on. By taking the step o  
f formalization, we were committing ourselves to accepting whatever p  
assive meanings these terms might take on. But-just like Saccheri-we didn  
't anticipate any surprises. We thought we knew what the true, the real, t  
he only theory of natural numbers was. We didn't know that there would b  
e some questions about numbers which TNT would leave open, and w  
hich could therefore be answered ad libitum by extensions of TNT heading o  
ff in different directions. Thus, there is no basis on which to say that n  
umber theory "really" is this way or that, just as one would be loath to say that t  
he square root of - 1 "really" exists, or "really" does n  
o

499

Bifurcations in Geometry, and Physicists

499

There is one argument which can be, and perhaps ought to be, r  
aised against the preceding. Suppose experiments in the real, p hysical world c  
an be explained more economically in terms of one particular version o  
f geometry than in terms of any other. Then it might make sense to say t  
hat that geometry is "true". From the point of view of a physicist who wants t  
o use the "correct" geometry, then it makes some sense to distinguish between the "true" geometry, and o ther geometries. But this cannot be t  
aken too simplistically. Physicists are always dealing with approximations a  
nd idealizations of situations. For instance, my own Ph.D. work, mentioned i  
n Chapter V, was based on an extreme idealization of the problem of a cryst  
al in a magnetic field. The mathematics which emerged was of a high d  
egree of beauty and symmetry. Despite--or rather, because of-the artificiality o  
f the model, some fundamental features emerged conspicuously in t  
he graph. These features then suggest some guesses about the kinds of t  
hings that might happen in more realistic �ituations. But without the s  
implifying assumptions which produced my graph, there could never be such i  
nsights. One can see this kind of thing over and over again in p hysics, where a  
physicist uses a "nonreal" situation to learn about deeply hidden features o  
f reality. Therefore, one should be extremely cautious in saying that t  
he brand of geometry which physicists might wish to use would represent "  
t

500

true geometry'-', for in fact, physicists will always use a variety of different  
geometries, choosing in any g iven situation the one that seems simplest a  
nd most c  
onvenien

500

Furthermore-and perhaps this is even more to the point-phys  
icists do not study just the 3-D space we live in. There are whole families o  
f "abstract spaces" within which physical calculations take place, spaces w  
hich have totally different geometrical properties from the physical space w  
ithin which we live. Who is to say, then, that "the true geometry" is defined b  
y the space in which Uranus and Neptune orbit around the sun? There i  
s "Hilbert space", where quantum-mechanical wave functions undulat  
e; there is "momentum space", where Fourier components dwell; there i  
s "reciprocal space", where wave-vectors cavort; there is "phase s  
pace", where many-particle configurations swish; and so on. There is a  
bsolutely no reason that the geometries of all these spaces should be the same; in fa  
ct, they couldn't possibly be the same! So it is essential and vital for phys  
icists that different and "rival" geometries should e

500

Bifurcations in Number Theory, and B  
anker

500

So much for geometry. What about number theory? Is it also essential a  
nd vital that different number theories should coexist with each other? If you   
asked a bank officer, my guess is that you would get an expression o  
f horror and disbelief. How could 2 and 2 add up to anything but 4? A  
nd moreover, if 2 and 2 did not make 4, wouldn't world economies c  
ollapse immediately under the unbearable uncertainty opened up by that fact? N  
ot really. First of all, nonstandard number theory doesn't threaten the a  
ge-old idea that 2 plus 2 equals 4. It differs from ordinary number theory only i  
n the way it deals with the concept of the infinite. After all, every theorem o  
f TNT remains a theorem in any extension of TNT! So bankers need not d  
espair of the chaos that will arrive when nonstandard number theory takes o  
ve

500

And anyway, entertaining fears about old facts being changed b  
etrays a misunderstanding of the relationship between mathematics and the r  
eal world. Mathematics only tells you answers to questions in the real w  
orld after you have taken the one vital step of choosing which kind of mathematics to apply. Even if there were a rival number theory which used t  
he symbols '2', '3', and '+', and in which a theorem said "2 + 2 = 3", t  
here would be little reason for bankers to choose to use that t heory! For t  
hat theory does not fit the way money works. You fit your mathematics to t  
he world, and not the other way around. For instance, we don't apply n  
umber theory to cloud systems, because the very concept of whole numbers h  
ardly fits. There can be one cloud and another cloud, and they will come together  
and instead of there being two clouds, there will still only be one. T  
his doesn't prove that 1 plus 1 equals l; it just proves that our numbertheoretical concept of "one" is not applicable in its full power to cloudc  
ountin

501

Bifurcations in N umber Theory, and Metamathematic  
ian

501

So bankers, cloud-counters, and most of the rest of us need not w  
orry about the advent of supernatural numbers: they won't affect our e  
veryday perception of the world in the slightest. The only people who m  
ight actually be a little worried are people whose endeavors depend in s  
ome crucial way on the nature of infinite entities. There aren't too many s  
uch people around-but mathematical logicians are members of this c  
ategory. How can the existence of a bifurcation in number theory affect them? W  
ell, number theory plays two roles in logic: (1) when axiomatized, it is an objec  
t of study; and (2) when used informally, it is an indispensable tool with which   
formal systems can be investigated. This is the use-mention distinction o  
nce again, in fact: in role (1), number theory is mentioned, in role (2) it is u  
se

501

Now mathematicians have judged that number theory is applicable to   
the study of formal systems even if not to cloud-counting, just as b  
ankers have judged that the arithmetic of real numbers is applicable to t  
heir transactions. This is an extramathematical judgement, and shows that t  
he thought processes involved in doing mathematics, just like those in o  
ther areas, involve "tangled hierarchies" in which thoughts on one level can   
affect thoughts on any other level. Levels are not cleanly separated, as t  
he formalist version of what mathematics is would have one believe.

501

The formalist philosophy claims that mathematicians only deal w  
ith abstract symbols, and that they couldn't care less whether those sym  
bols have any applications to or connect.ions with reality. But that is quite a  
distorted picture. Nowhere is this clearer than in metamathematics. If t  
he theory of numbers is itself used as an aid in gaining factual knowledge a  
bout formal s ystems, then mathematicians are tacitly showing that they b  
elieve these ethereal things called "natural numbers" are actually part of realitynot just figments of the imagination. This is why I parenthetically remarked earlier that, in a certain sense. there is an answer to the question o  
f which version of number theory is "true". Here is the nub of the matte  
r: mathematical logicians must choose which version of number theory to p  
ut their faith in. In particular, they cannot remain neutral on the question o  
f the existence or nonexistence of supernatural numbers, for the two different theories may give different answers to questions in m  
etamathematic

501

For instance, take this question: "Is ~G finitely derivable in TNT?" N  
o one actually knows the answer. Nevertheless, most mathematical l  
ogicians would answer no without hesitation. The intuition which motivates t  
hat answer is based on the fact that if --G were a theorem, TNT would b  
e w-inconsistent, and this would force supernaturals down your throat if y  
ouwanted to interpret TNT meaningfully-a most unpalatable thought for  
most people. After all, we didn't intend or expect supernaturals to be p  
artof TNT when we invented it. That is, we-or most of us-believe that it i  
spossible to make a formalization of number theory which does not forc  
eyou into believing that supernatural numbers are every bit as real a  
snaturals. It is that intuition about reality which determines which "fork" o  
fnumber theory mathematicians will put their faith in, when the chips a  
r

502

down. But this faith may be wrong. Perhaps every consistent form  
alization of number theory which humans invent will imply the existence of supernaturals, by being w-inconsistent. This is a queer thought, but it is conceiva

502

If this were the case-which I doubt, but there is no disproof available-then G would not have to be undecidable. In fact, there might be n  
o undecidable formulas of TNT at all. There could simply be one unbifurcated theory of numbers-which necessarily includes supernaturals. This i  
s not the kind of thing mathematical logicians expect, but it is s  
omething which ought not to be rejected outright. Generally, mathematical logicians  
believe that TNT -and systems similar to it-are w-consistent, and that t  
he Godel string which can be constructed in any such system is u  
ndecidable within that system. That means that they can choose to add either it or i  
ts negation as an a

502

Hilbert's Tenth Problem and the T  
ortois

502

I would like to conclude this Chapter by mentioning one extension o  
f Godel's Theorem. (This material is more fully covered in the article "Hilbert's Tenth Problem" by Davis and Hersh, for which see the Bibliography.) For this, I must define what a Diophantine equation is. This is a  
n equation in which a polynomial with fixed integral coefficients and exponents is set to 0. For ins  
tance, a = O  
a  
nd 5x + 13y - 1 = 0   
a  
nd 5p5 + 17q17 - 177 = 0   
a  
nd a  
123,666.111,666 + b 123,666,1 11,666 _ c 12 3,666.111,666 = o  
are Diophantine equations. It is in general a difficult matter to k  
now whether a given Diophantine equation has any integer solutions or not. I  
n fact, in a famous lecture at the beginning of the century, Hilbert a  
sked mathematicians to look for a general algorithm by which one could determine in a finite number of steps if a given Diophantine equation has i  
nteger solutions or not. Little did he suspect that no such algorithm exists!

503

Now for the simplification of G. It has been shown that whenever y  
ou have a sufficiently powerful formal number theory, and a Godelnumbering for it, there is a Diophantine equation which is equivalent to G  
. The equivalence lies in the fact that this equation, when interpreted on a  
metamathematical level, asserts of itself that it has no solutions. Turn i  
t around: if you found a solution to it, you could construct from it t  
he Godel number of a proof in the system that the equation has no s  
olutions! This is what the Tortoise did in the Prelude, using Fermat's equation as h  
is Diophantine equation. It is nice to know that when you do this, you c  
an retrieve the sound of Old Bach from the molecules in the a ir

508

C HA PTER X  
V Jumping out of the System

508

A More Powerful Formal S  
yste

508

ONE or THE things which a thoughtful critic of Godel's proof might d  
o would be to examine its generality. Such a critic might, for e  
xample, suspect that Godel has just cleverly taken advantage of a hidden defect i  
n one particular formal system, TNT. If this were the case, then perhaps a  
formal system superior to TNT could be developed which would not b  
e subject to the Godelian trick, and Godel's Theorem would lose much of i  
ts sting. In this Chapter we will carefully scrutinize the properties of T  
NT which made it vulnerable to the arguments of last C  
hapte

508

A natural thought is this: If the basic trouble with TNT is that i  
t contains a "hole"-in other words, a sentence which is undecidable, n  
amely G-then why not simply plug up the hole? Why not just tack G onto TNT  
as a sixth axiom? Of course, by comparison to the other axioms, G is a  
ridiculously huge giant, and the resulting system-TNT +G-would have a  
rather comical aspect due to the disproportionateness of its axioms. Be t  
hat as it may, adding G is a reasonable suggestion. Let us consider it d  
one. Now, it is to be hoped, the new system, TNT+G, is a superior for  
mal system-one which is not only supernatural-free, but also complete. It i  
s certain that TNT +G is superior to TNT in at least one respect: the string G  
is no longer undecidable in this new system, since it is a t  
heore

508

What was the vulnerability of TNT due to? The essence of its vulnerability was that it was capable of expressing statements about itself-  
in particular, the s  
tatement "I Cannot Be Proven in Formal System T  
NT" or, expanded a b  
it, "There does not exist a natural number which forms a  
TNT-proof-pair with the Godel number of this s

508

Is there any reason to expect or hope that TNT +G would be invulnerable to Godel's proof? Not really. Our new system is just as expressive a  
s TNT. Since Godel's proof relies primarily on the expressive power of a  
formal system, we should not be surprised to see our new system suc

509

too. The trick will be to find a string which expresses the s  
tatement "I Cannot Be Proven in Formal System TNT +  
G." Actually, it is not much of a trick, once you have seen it done for TNT. A  
ll the same principles are employed; only the context shifts slightly. (Figuratively speaking, we take a tune we know and simply sing it again, only in a  
higher key.) As before, the string which we are looking for-let us call i  
t "G' "-is constructed by the intermediary of an "uncle". But instead o  
f being based on the formula which represents TNT-proof-pairs, it is b  
ased on the similar but slightly more complicated notion of TNT +G-proofpairs. This notion of TNT +G-proof-pairs is only a slight extension of t  
he original notion of TNT-p  
roo

509

A similar extension could be envisaged for the MIU-system. We have   
seen the unadulterated form of MIU-proof-pairs. Were we now to add M  
U as a second axiom, we would be dealing with a new system-the MIU +  
MU system. A derivation in this extended system is presente  
d: M  
U M  
UU a  
xiom rule 2  
There is a MIU +MU-proof-pair which corresponds-namely, m = 3  
0300, n = 300. Of course, this pair of numbers does not form a MIU-proofpair-only a MIU +MU-proof-pair. The addition of an extra axiom d  
oes not substantially complicate the arithmetical properties of proof-pairs. T  
he significant fact about them-that being a proof-pair is p  
rimitive recursive-is prese  
rve

509

The Godel Method R  
eapplie

509

Now, returning to TNT+G, we will find a similar situation. TNT+Gproof-pairs, like their predecessors. are primitive recursive, so they a  
re represented inside TNT +G by a formula which we abbreviate in an obvious m  
anner: (TNT +G)-PROOF-PAlR{a,  
a'} Now we just do everything all over again. We make the counterpart of G b  
y beginning with an "uncle", just as before:  
~3a:3a':<(TNT +G)-PROOF-PAlR{a,a'}AARITHMOQUlNE{a'',  
a'}> Let us say its Godel-number is u'. Now we arithmoquine this very u  
ncle. That will give us G  
': 4  
66 ~3a:3a':<(TNT +G)-PROOF-PAlR{a,  
a'} AARITHMOQUlNE  
{SSS .... SSS0/a",a  
'}> � u' S

510

Its interpretation i  
s "There is no number a that forms a TNT +G-proof-p  
air with the arithmoquinification of u '.  
" More concisely  
, "I Cannot Be Proven in Formal System T  
NT+G." M  
ultifurcation Well (yawn), the details are quite boring from here on out. G' is precisely t  
o TNT +G as G was to TNT itself. One finds that either G' or ~G' can b  
e added to TNT +G, to yield a further splitting of number theory. And, l  
est you think this only happens to the "good guys", this very same d  
astardly trick can be played upon TNT +~G-that is, upon the nonstandard extension of TNT gotten by adding G's negation. So now we see (Fig. 75) t  
hat there are all sorts of bifurcations in number theor  

510

FIGURE 75. "Multifurcation" of TNT. Each extension of TNT has its very own G  
odel sentence; that sentence, or its negation, can be added on, so that from each extension t  
here sprouts a pair of further extensions, a process which goes on ad inf

510

Of course, this is just the beginning. Let us imagine moving down t  
he leftmost branch of this downwards-pointing tree, where we always toss i  
n the Godel sentences (rather than their negations). This is the best we can d  
o by way of eliminating supernaturals. After adding G, we add G'. Then w  
e add G", and G'", and so on. Each time we make a new extension of T  
NT, its vulnerability to the Tortoise's method-pardon me, I mean G  
odel's method-allows a new string to be devised, having the int  
erpretation "I Cannot Be Proven in Formal System X

511

Naturally, after a while, the whole process begins to seem u  
tterly predictable and routine. Why, all the "holes" are made by one single   
technique! This means that, viewed as typographical objects, they are a  
ll cast from one single mold, which in turn means that one single a  
xiom schema suffices to represent all of them! So if this is so, why not plug up a  
ll the holes at once and be done with this nasty business of inc  
ompleteness once and for all? This would be accomplished by adding an axiom schema t  
o TNT, instead of just one axiom at a time. Specifically, this axiom s  
chema would be the mold in which all of G, G', G", G' ", etc., are cast. By a  
dding this axiom schema (let's call it " G,."), we would be outsmarting the "Godelization" method. Indeed, it seems quite clear that adding Gw to TNT w  
ould be the last step necessary for the complete axiomatization of all of numbertheoretical t

511

It was at about this point in the Contracrostipunctus that the Tor  
toise related the Crab's invention of "Record Player Omega". However, r  
eaders were left dangling as to the fate of that device, since before completing h  
is tale, the tuckered-out Tortoise decided that he had best go home to s  
leep (but not before tossing off a sly reference to Godel's Incompleteness Theorem). Now, at last, we can get around to clearing up that dangling detail .  
.. Perhaps you already have an inkling, after reading the Birthday Cantatatata

511

Essential Incompletenes  

511

As you probably suspected, even this fantastic advance over TNT suffe  
rs the same fate. And what makes it quite weird is that it is still for, in essenc  
e, the same reason. The axiom schema is not powerful enough, and the G  
odel construction can again be effected. Let me spell this out a little. (One can d  
o it much more rigorously tpan I shall here.) If there is a way of capturing t  
he various strings G, G', G", G'", ... in a single typographical mold, then t  
here is a way of describing their Godel numbers in a single arithmetical m  
old. And this arithmetical portrayal of an infinite class of numbers can then b  
e represented inside TNT +Gw by some formula OMEGA-AXlOM{a} who  
se interpretation is: "a is the Godel number of one of the axioms coming f  
rom Gw". When a is replaced 1:,y any specific numeral, the formula which results  
will be a theorem of TNT +Gw if and only if the numeral stands for t  
he Godel number of an axiom coming from the s  
chem

511

With the aid of this new formula, it becomes possible to represent e  
ven such a complicated notion as TNT+Gw-proof-pairs inside TNT +  
Gw: (TNT +G w)-PROOF-PAIR{a,  
a'} Using this formula, we can construct a new uncle, which we proceed t  
o arithmoquine in the by now thoroughly familiar way, making yet a  
nother undecidable string, which will be called "TNT +Gw+1". At this point, y  
ou might well wonder, "Why isn't Gw+1 among the axioms created by the a  
xiom schema Gw?" The answer is that Gw was not clever enough to foresee its o  
wn embeddability inside number t  
heo1·y

512

In the Contracrostipunctus, one of the essential steps in the Tor  
toise's making an "unplayable record" was to get a hold of a m  
anufacturer's blueprint of the record player which he was out to destroy. This w  
as necessary so that he could figure out to what kinds of vibrations it w  
as vulnerable, and then incorporate into his record such grooves as w  
ould code for sounds which would induce those vibrations. It is a close ana  
logue to the Godel trick, in which the system's own properties are reflected i  
nside the notion of proof-pairs, and then used against it. Any system, no m  
atter how complex or tricky it is, can be Godel-numbered, and then the notion o  
f its proof-pairs can be defined-and this is the petard by which it is h  
oist. Once a system is well-defined, or "boxed", it becomes vulne  
rabl

512

This principle is excellently illustrated by the Cantor diagonal t  
rick, which finds an omitted real number for each well-defined list of r  
eals between O and 1. It is the act of giving an explicit list-a "box" of realswhich causes the downfall. Let us see how the Cantor trick can be r  
epeated over and over again. Consider what happens if, starting with some list L  
, you do the fo  
llowing: (la) Take list L, and construct its diagonal number d  
. (lb) Throw d somewhere into list L, making a new list L +  
d. (2a) Take list L +d, and construct its diagonal number d'.  
(2b) Throw d' somewhere into list L +d, making a new l  
ist L+d +d'.  
Now this step-by-step process may seem a doltish way to patch up L, for w  
e could have made the entire list d, d', d", d'", ... at once, given L o  
riginally. But if you think that making such a list will enable you to complete your l  
ist of reals, you are very wrong. The problem comes at the moment you a  
sk, "Where to incorporate the list of diagonal numbers inside L?" No m  
atter how diabolically clever a scheme you d evise for ensconcing the d-n  
umbers inside L, once you have done it, then the new list is still vulnerable. As w  
as said above, it is the act of g iving an explicit list-a "box" of r  
eals-that causes the d

512

Now in the case of formal systems, it is the act of giving an e  
xplicit recipe for what supposedly characterizes number-theoretical truth t  
hat causes the incompleteness. This is the crux of the problem with TNT +  
Gw. Once you insert all the G's in a well-defined way into TNT, there is seen t  
o be some other G-some unforeseen G-which you didn't capture in y  
our axiom schema. And in the case of the TC-battle inside the Contracrostipunctus, the instant a record player's "architecture" is determined, t  
he record player becomes capable of being shaken to p  
iece

512

So what is to be done? There is no end in sight. It appears that T  
NT, even when extended ad infinitum, cannot be made complete. TNT i  
s therefore said to suffer from essential incompleteness because the in

513

pleteness here is part and parcel of TNT; it is an essential part of t  
he nature of TNT and cannot be eradicated in any way, whether simpleminded or ingenious. What's more, this problem will haunt any f  
ormal version of number theory, whether it is an extension of TNT, a modification of TNT, or an alternative to TNT. The fact of the matter is this: t  
he possibility of constructing, in a given system, an undecidable string via  
Godel's self-reference method, depends on three basic conditions:

513

(1) That the system should be rich enough so that all d  
esired statements about numbers, whether true or false, can b  
e expressed in it. (Failure on this count means that the system i  
s from the very start too weak to be counted as a rival to T  
NT, because it can't even express number-theoretical notions t  
hat TNT can. In the metaphor of the C ontracrostipunctus, it is as i  
f one did not have a phonograph but a refrigerator or s  
ome other kind of object.

513

( 2)That all general recursive relations should be represented b  
yformulas in the system. (Failure on this count means t  
hesystem fails to capture in a theorem some general recur  
sivetruth, which can only be considered a pathetic bellyflop if it i  
sattempting to produce all of number theory's truths. In t  
heContracrostipunctus metaphor, this is like having a r  
ecordplayer, but one of low fid

513

( 3)That the axioms and typographical patterns defined by i  
tsrules be recognizable by some terminating decision procedure. (Failure on this count means that there is no method t  
odistinguish valid derivations in the s ystem from i  
nvalidones-thus that the "formal system" is not formal after a  
ll,and in fact is not even well-defined. In the Contracrostipunct  
usmetaphor, it is a phonograph which is still on the drawing  
board, only partially designe

513

Satisfaction of these three conditions guarantees that any consistent syst  
em will be incomplete, because Godel's construction is applic  
abl

513

The fascinating thing is that any such system digs its own hole; t  
he system's own richness brings about its own downfall. The downfall occ  
urs essentially because the system is powerful enough to have self-referential   
sentences. In physics, the notion exists of a "critical mass" of a f  
issionable substance, such as uranium. A solid lump of the substance will just sit t  
here, if its mass is less than critical. But beyond the critical mass, such a lump w  
ill undergo a chain reaction, and blow up. It seems that with formal sys  
tems there is an analogous critical point. Below that point, a system is "  
harmless" and does not even approach defining arithmetical truth formally; b  
ut beyond the critical point, the system suddenly attains the capacity f  
or self-reference, and thereby dooms itself to incompleteness. The thresh  
old seems to be roughly when a system attains the three properties listed a  
bov

514

Once this ability for self-reference is attained, the system has a hole which i  
s tailor-made for itself; the hole takes the features of the system into a  
ccount and uses them against the sys  
te

514

The Passion According to L  
uca

514

The baffling repeatability of the Godel argument has been used by v  
arious people-notably J. R. Lucas-as ammunition in the battle to show t  
hat there is some elusive and ineffable quality to human intelligence, whic  
h makes it unattainable by "mechanical automata"-that is, computers. L  
ucas begins his article "Minds, Machines, and Godel" with these w  
ords: Godel's theorem seems to me to prove that Mechanism is false, that is, t  
hat minds cannot be explained as machines. 1  
Then he proceeds to give an argument which, paraphrased, runs like t  
his. For a computer to be considered as intelligent as a person is, it must be a  
ble to do every intellectual task which a person can do. Now Lucas claims t  
hat no computer can do "Godelization" (one of his amusingly irreverent t  
erms) in the manner that people can. Why not? Well, think of any p  
articular formal system, such as TNT, or TNT+ G, or even TNT+ Gw. One can wri  
te a computer program rather easily which will systematically generate theorems of that system, and in such a manner that eventually, any p  
reselected theorem will be printed out. That is, the theorem-generating pro  
gram won't skip any portion of the "space" of all theorems. Such a p  
rogram would be composed of two major parts: (1) a subroutine which stamps o  
ut axioms, given the "molds" of the axiom schemas (if there are any), and (2) a  
subroutine which takes known theorems (including axioms, of course) and   
applies rules of inference to produce new theorems. The program w  
ould alternate

514

We can anthropomorphically say that this program "knows" some f  
acts of number theory-name ly, it knows those facts which it prints out. If i  
t fails to print out some true fact of number theory, then of course it doesn'  
t "know" that fact. Therefore, a computer program will be inferior to h  
uman beings if it can be shown that humans know something which the program   
cannot know. Now here is where Lucas starts rolling. He says that w  
e humans can always do the Godel trick on any formal system as powerful a  
s TNT-and hence no matter what the formal system, we know more than i  
t does. Now this may only sound like an argument about formal systems, b  
ut it can also be slightly modified so that it becomes, seemingly, an invinc  
ible argument against the possibility of Artificial Intelligence ever r  
eproducing the human level of intelligence. Here is the gist of it:   
Rigid internal codes entirely rule computers and robots; ergo .  
.. Computers are isomorphic to formal systems. Now .  
.. Any computer which wants to be as smart as we are has got to b  
e able to do number theory as well as we can, so .

515

Among other things, it has to be able to do primitive r  
ecursive arithmetic. But for this very reason .  
.. It is vulnerable to the Godelian "hook", which implies that .  
.. We, with our human intelligence, can concoct a certain statem  
ent of number theory which is true, but the computer is blind t  
o that statement's truth (i.e., will never print it out), p  
recisely because of Godel's boomeranging a  
rgument. This implies that there is one thing which computers just c  
annot be programmed to do, but which we can do. So we a  
re s  
marter. Let us enjoy, with Lucas, a transient moment of anthropocentric g  
lory: However complicated a machine we construct, it will, if it is a mach  
ine, correspond to a formal system, which in turn will be liable to the G  
odel procedure for finding a formula unprovable-in-that-system. This formula t  
he machine will be unable to produce as being true, although a mind can see it i  
s true. And so the machine will still not be an adequate model of the mind. W  
e are trying to produce a model of the mind which is mechanical-which i  
s essentially "dead"-but the mind, being in fact "alive," can always go o  
ne better than any formal, ossified, dead system can. Thanks to Godel's t  
heorem, the mind always has the last word.2

515

On first sight, and perhaps even on careful analysis, Lucas' a  
rgument appears compelling. It usually evokes rather polarized reactions. S  
ome seize onto it as a nearly religious proof of the existence of souls, w  
hile others laugh it off as being unworthy of comment. I feel it is wrong, b  
ut fascinatingly so-and therefore quite worthwhile taking the time to r  
ebut. In fact, it was one of the major early forces driving me to think over t  
he matters in this book. I shall try to rebut it in one way in this Chapter, and i  
n other ways in Chapter XVI

515

We must try to understand more deeply why Lucas says the c  
omputer cannot be programmed to "know" as much as we do. Basically the idea i  
s that we are always outside the system, and from out there we can a  
lways perform the "Godelizing" operation, which yields something which t  
he program, from within, can't see is true. But why can't the "  
Godelizing operator", as Lucas calls it, be programmed and added to the program as a   
third major component? Lucas e  
xplains: The procedure whereby the Godelian formula is constructed is a s  
tandard procedure-only so could we be sure that a Godelian formula can be constructed for every formal system. But if it is a standard procedure, then a  
machine should be able to be programmed to carry it out too .... This w  
ould correspond to having a system with an additional rule of inference w  
hich allowed one to add, as a theorem, the Godelian formula of the rest of t  
he formal system, and then the Godelian formula of this new, s  
trengthened, formal system, and so on. It would be tantamount to adding to the o  
riginal formal system an infinite sequence of axioms, each the Godelian formula o  
f the system hitherto obtained . ... We might expect a mind, faced with a   
machine that possessed a Godelizing operator, to take this into account, a  
n

516

out-Godel the new machine, Godelizing operator and all. This has, in fac  
t, proved to be the case. Even if we adjoin to a formal system the infinite set o  
f axioms consisting of the successive Godelian formulae, the resulting system is   
still incomplete, and contains a formula which cannot be proved-iri-thesystem, although a rational being can, standing outside the system, see that i  
t is true, We had expected this, for even if an infinite set of axioms were a  
dded, they would have to be specified by some finite rule or specification, and t  
his further rule or specification could then be taken into account by a m  
ind considering the enlarged formal system. In a sense .just because the mind h  
as the last word, it can always pick a hole in any formal system presented to it as a  
model of its own workings. The mechanical model must be, in some s  
ense, finite and definite: and then the mind can always go one better.3

516

Jumping Up a Dime  
nsio

516

A visual image provided by M, C. Escher is extremely useful in aiding t  
he intuition here: his drawing Dragon (Fig, 76). Its most salient feature i s, o  
f course, its subject matter-a dragon biting its tail, with all the G  
odelian connotations which that carries. But there is a deeper theme to this p  
icture, Escher himself wrote the following most interesting comments. The fi  
rst comment is about a set of his drawings all of which are concerned with "  
the conflict between the flat and the spatial"; the second comment is a  
bout Dragon in p  
articula

516

I. Our three-dimensional space is the only true reality we kno w. The twodimensional is every bit as fictitious as the four-dimensional, for nothing i  
s flat, not even the most finely polished mirror. And yet we stick to the convention that a wall or a piece of paper is flat, and curiously enough, we still go o  
n, as we have done since time immemorial, producing illusions of space on j  
ust such plane surfaces as these. Surely it is a bit absurd to draw a few lines a  
nd then claim: "This is a house". This odd situation is the theme of the next fi  
ve pictures [including Dragon ).4

516

II. However much this dragon tries to be spatial, he remains completely flat.  
Two incisions are made in the paper on which he is printed. Then it is fo  
lded in such a way as to leave two square openings. But this dragon is an o  
bstinate beast, and in spite of his two dimensions he persists in assuming that he h  
as three; so he sticks his head through one of the holes and his tail through t  
he other.5

516

This second remark especially is a very telling remark. The message is t  
hat no matter how cleverly you try to simulate three dimensions in two, you a  
re always missing some "essence of three-dimensionality". The dragon t  
ries very hard to fight his two-dimensionality. He defies the two-dime  
nsionality of the paper on which he thinks he is drawn, by sticking his head t  
hrough it; and yet all the while, we outside the drawing can see the pathetic f  
utility of it all, for the dragon and the holes and the folds are all merely twodimensional simulations of those concepts, and not a one of them is r  
eal. But the dragon cannot step out of his two-dimensional space, and c  
anno

517

steps further. For instance, we could tear it out of the book, fold it, cut   
holes in it, pass it through itself, and photograph the whole mess, so that i  
t again becomes two-dimensional. And to that photograph, we could o  
nce again do the same trick. Each time, at the instant that it becomes twodimensional-no matter how cleverly we seem to have simulated t  
hree dimensions inside two-it becomes vulnerable to being cut and f  
olded a

518

Now with this wonderful Escherian metaphor, let us return to t  
he program versus the human. We were talking about trying to e  
ncapsulate the "G6delizing operator" inside the program itself. Well, even if we h  
ad written a program which carried the operation out, that program w  
ould not capture the essence of Godel's method. For once again, we, outside t  
he system, could still "zap" it in a way which it couldn't do. But then are w  
e arguing with, or against, Lucas?

518

The Limits of Intelligent S  
ystem

518

Against. For the very fact that we cannot write a program to do "Godelizing" must make us somewhat suspicious that we ourselves could do it i  
n every case. It is one thing to make the argument in the abstract t  
hat Godelizing "can be done"; it is another thing to know how to do it in every   
particular case. In fact, as the formal systems (or programs) escalate i  
n complexity, our own ability to "Godelize" will eventually begin to waver. I  
t must, since, as we have said above, we do not have any algorithmic way o  
f describing how to perform it. If we can't tell explicitly what is involved i  
n applying the Godel method in all cases, then for each of us there w  
ill eventually come some case so complicated that we simply can't figure o  
ut how to apply i

518

Of course, this borderline of one's abilities will be somewhat illdefined, just as is the borderline of weights which one can pick up off t  
he ground. While on some days you may not be able to pick up a 2  
50-pound object, on other days maybe you can. Nevertheless, there are no d  
ays whatsoever on which you can pick up a 250-ton object. And in this s  
ense, though everyone's Godelization threshold is vague, for each person, t  
here are systems which lie far beyond his ability to G

518

This notion is illustrated in the Birthday Cantatatata. At first, it s  
eems obvious that the Tortoise can proceed as far as he wishes in p  
estering Achilles. But then Achilles tries to sum up all the answers in a single s  
woop. This is a move of a different character than any that has gone before, and i  
s given the new name 'w'  
. The newness of the name is quite important. It i  
s the first example where the old naming scheme-which only inc  
luded names for all the natural numbers-had to be transcended. Then c  
ome some more extensions, some of whose names seem quite obvious, others o  
f which are rather tricky. But eventually, we run out of names once again-  
at the point where the answe  
r-schemas W wW w, w '  
w ' .  
.  
.are all subsumed into one outrageously complex answer schema. T  
he altogether new name 'e0' is supplied for this one. And the reason a  
new name is needed is that some fundamentally new kind of step h  
as been taken-a sort of irregularity has been encountered. Thus a new n  
ame must be supplied ad h

519

There Is No Recursive Rule for Naming Ordina  
l

519

Now offband you might think that these irregularities in the p  
rogression from ordinal to ordinal (as these names of infinity are called) could b  
e handled by a computer program. That is, there would be a program t  
o produce new names in a regular way, and when it ran out of gas, it w  
ould invoke the "irregularity handler", which would supply a new name, a  
nd pass control back to the simple one. But this will not work. It turns out t  
hat the irregularities themselves happen in irregular ways, and one would n  
eed also a second-order program-that is, a program which makes new programs which make new names. And even this is not enough. Eventually, a  
third-order program becomes necessary. And so on, and so o  

519

All of this perhaps ridiculous-seeming complexity stems from a d  
eep theorem, due to Alonzo Church and Stephen C. Kleene, about the structure of these "infinite ordinals", which says:  
There is no recursively related n  
otation-system which gives a name to every constructive o  
rdinal. What "recursively related notation-systems" are, and what "  
constructive ordinals" are, we must leave to the more technical sources, such as Hart  
ley Rogers' book, to explain. But the intuitive idea has been presented. As t  
he ordinals get bigger and bigger, there are irregularities, and irregularities i  
n the irregularities, and irregularities in the irregularities in the irregularities, etc. No single scheme, no matter how complex, can name a  
ll the ordinals. And from this, it follows that no algorithmic method can t  
ell how to apply the method of Godel to all possible kinds of formal s  
ystems. And unless one is rather mystically inclined, therefore one must c  
onclude that any human being simply will reach the limits of his own ability t  
o Godelize at some point. From there on out, formal systems of that complexity, though admittedly incomplete for the Godel reason, will have as m  
uch power as that human b

519

Other Refutations of L  
uca

519

Now this is only one way to argue against Lucas' position. There are o  
thers, possibly more powerful, which we shall present later. But this counterargument has special interest because it brings up the fascinating c  
oncept of trying to create a computer program which can get outside of itself, s  
ee itself completely from the outside, and apply the Godel zapping-trick t  
o itself. Of course this is just as impossible as for a record player to be able t  
o play records which would cause it to b  
rea

519

But-one should not consider TNT defective for that reason. If t  
here is a defect anywhere, it is not in TNT, but in our expectations of what i  
t should be able to do. Furthermore, it is helpful to realize that we are e  
quallyvulnerable to the word trick which Godel transplanted into m  
athematical formalisms: the Epimenides paradox. This was quite cleverly pointed o  
u

520

by C .H. Whitely, when he proposed the sentence "Lucas cannot consistently assert this sentence." If you think about it, you will see that (1) it i  
s true, and yet (2) Lucas cannot consistently assert it. So Lucas is also "incomplete" with respect to truths about the world. The way in which he mirrors  
the world in his brain structures prevents him from simultaneously b  
eing "consistent" and asserting that true sentence. But Lucas is no more vulnerable than any of us. He is just on a par with a sophisticated formal sys  
te

520

An amusing way to see the incorrectness of Lucas' argument is t  
o translate it into a battle between men and women ... In his w  
anderings, Loocus the Thinker one day comes across an unknown object-a w  
oman. Such a thing he has never seen before, and at first he is wondrous thrilled a  
t her likeness to himself; but then, slightly scared of her as well, he cries to a  
ll the men about him, "Behold! I can look upon her face, which is s  
omething she cannot do-therefore women can never be like me!" And thus h  
eproves man's superiority over women, much to his relief, and that of h  
is male companions. Incidentally, the same argument proves that Loocus i  
s superior to all other males, as well-but he doesn't point that out to t  
hem. The woman argues back: "Yes, you can see my face, which is something I  
can't do-but I can see your face, which is something you can't do! We'  
re even." However, Loocus comes up with an unexpected counter: "I'm s  
orry, you're deluded if you think you can see my face. What you women do is n  
otthe same as what we men do-it is, as I have already pointed out, of a  
n inferior caliber, and does not deserve to be called by the same name. You  
may call it 'womanseeing'. Now the fact that you can 'womansee' my face i  
s of no import, because the situation is not symmetric. You see?" "I womansee," womanreplies the woman, and womanwalks away . ..

520

Well, this is the kind of "heads-in-the-sand" argument which you have   
to be willing to stomach if you are bent on seeing men and women r  
unning ahead of computers in these intellectual b  
attle

520

Self-Transcendence-A Modern M  
yt

520

It is still of great interest to ponder whether we humans ever can jump o  
ut of ourselves--or whether computer programs can jump out of thems  
elves. Certainly it is possible for a program to modify itself-but such modifiability has to be inherent in the program to start with, so that cannot b  
e counted as an example of "jumping out of the system". No matter how a  
program twists and turns to get out of itself, it is still following the r  
ules inherent in itself. It is no more possible for it to escape than it is for a  
human being to decide voluntarily not to obey the laws of physics. Physics i  
s an overriding system, from which there can be no escape. However, there i  
s a lesser ambition which it is possible to achieve: that is, one can certain  
ly jump from a subsystem of one's brain into a wider subsystem. One can s  
tep out of ruts on occasion. This is still due to the interaction of v  
arious subsystems of one's brain, but it can feel very much like stepping e  
ntirely out of oneself. Similarly, it is entirely conceivable that a partial ability t  
o "step outside of itse lf" could be embodied in a computer program.

521

However, it is important to see the distinction between perceiving oneself, and transcending oneself. You can gain visions of yourself in all sorts o  
f ways-in a mirror, in photos or movies, on tape, through the d  
escriptions of others, by getting psychoanalyzed, and so on. But you cannot quite b  
reak out of your own skin and be on the outside of yourself (modern occul  
t movements, pop psychology fads, etc. notwithstanding). TNT can t  
alk about itself, but it cannot jump out of itself. A computer program c  
an modify itself but it cannot violate its own instructions-it can at best c  
hange some parts of itself by o beying its own instructions. This is reminiscent of t  
he humorous paradoxical question, "Can God make a stone so heavy that h  
e can't lift i

521

Advertisement and Framing D  
evice

521

This drive to jump out of the system is a pervasive one, and lies behind a  
ll progress in art, music, and other human endeavors. It also lies behind suc  
h trivial undertakings as the making of radio and television commercial  
s. This insidious trend has been beautifully perceived and described b  
y Erving Goffman in his book Frame Analy  
sis: For example, an obviously professional actor completes a commercial p  
itch and, with the camera still on him, turns in obvious relief from his task, now t  
o take real pleasure in consuming the product he had been adver  
tising. This is, of course, but one example of the way in which TV and r  
adio commercials are coming to exploit framing devices to give an appearance o  
f naturalness that (it is hoped) will override the reserve auditors have developed. Thus, use is currently being made of children's voices, p  
resumably because these seem unschooled; street noises, and other effects to give t  
he impression of interviews with unpaid respondents; false starts, filled p  
auses, byplays, and overlapping speech to �imulate actual conversation; and, follow  
ing Welles, the interception of a firm's jingle commercials to give news of i  
ts new product, alternating occasionally with interception by a public i  
nterest spot, this presumably keeping the faith of the auditor alive.   
The more that auditors withdraw to minor expressive details as a test o  
f genuineness, the more that advertisers chase after them. What results is a s  
ort of interaction pollution, a disorder t.hat is also spread by the public r  
elations consultants of political figures, and, more modestly, by micro-sociology.6  
Here we have yet another example of an escalating "TC-battle"-the antagonists this time being Truth and Commerci

521

naturalness

521

Simplicio, Salviati, Sagredo: Why Three?

521

There is a fascinating connection between the problem of jumping out o  
f the system and the quest for complete objectivity. When I read Jauch's f  
our Dialogues in Are Quanta Real? based on Galileo's four Dialogues Conce  
rning Two New Sciences, I found myself wondering why there were three c  
haracters participating: Simplicio, Salviati, and Sagredo. Why wouldn't two h  
av

522

sufficed: Simplicio, the educated simpleton, and Salviati, the knowledgeable thinker? What function does Sagredo have? Well, he is supposed to be a   
sort of neutral third p arty, dispassionately weighing the two sides a  
nd coming out with a "fair" and "impartial" judgment. It sounds very balanced, and yet there is a problem: Sagredo is always agreeing with S  
alviati, not with Simplicio. How come Objectivity Personified is playing favorites?  
One answer, of course, is that Salviati is enunciating correct views, s  
o Sagredo has no choice. But what, then, of fairness or "equal t

522

By adding Sagredo, Galileo (and Jauch) stacked the deck more a  
gainst Simplicio, rather than less. Perhaps there should be added a yet higherlevel Sagredo-someone who will be objective about this whole situation .  
.. You can see where it is going. We are getting into a never-ending series o  
f "escalations in objectivity", which have the curious property of never getting any more objective than at the first level: where Salviati is simply right  
, and Simplicio wrong. So the puzzle remains: why add Sagredo at all? A  
nd the answer is, it gives the illusion of stepping out of the system, in s  
ome intuitively appealing s

522

Zen and "Stepping Out"

522

In Zen, too, we can see this preoccupation with the concept of transcen  
ding the system. For instance, the koan in which Tozan tells his monks that "  
the higher Buddhism is not Buddha". Perhaps, self-transcendence is even the   
central theme of Zen. A Zen person is always trying to understand m  
ore deeply what he is, by stepping more and more out of what he sees h  
imself to be, by breaking every rule and convention which he perceives himself to   
be chained by-needless to say, including those of Zen itself. S  
omewhere along this elusive path may come enlightenment. In any case (as I see it)  
, the hope is that by gradually deepening one's self-awareness, by g  
radually widening the scope of "the system", one will in the end come to a feeling o  
f being at one with the entire universe.

538

C HAPTER X  
VISelf-Ref and Self-Re  

538

IN THIS CHAPTER, we will look at some of the mechanisms which c  
reate self-reference in various contexts, and compare them to the mechan  
isms which allow some kinds of systems to reproduce themselves. Some remarkable and beautiful parallels between these mechanisms will come to l

538

Implicitly and Explicitly Self-Referential Sen  
tence

538

To begin with, let us look at sentences which, at first glance, may seem t  
o provide the simplest examples of self-reference. Some such sentences a  
re t  
hese: (1) This sentence contains five w  
ords. ( 2)This sentence is meaningless because it is self-referenti  
al.( 3)This sentence no v  
erb.( 4)This sentence is false. (Epimenides p  
aradox)( 5)The sentence I am now writing is the sentence you are n  
owrea  
ding.All but the last one (which is an anomaly) involve the simple-seemin  
g mechanism contained in the phrase "this sentence". But that mechanism i  
s in reality far from simple. All of these sentences are "floating" in t  
he context of the English language. They can be compared to icebergs, w  
hose tips only are visible. The word sequences are the tips of the icebergs, a  
nd the processing which must be done to understand them is the hidden p  
art. In this sense their meaning is implicit, not explicit. Of course, no senten  
ce's meaning is completely explicit, but the more explicit the self-reference i  
s, the more exposed will be the mechanisms underlying it. In this case, for t  
he self-reference of the sentences above to be recognized, not only has one t  
o be comfortable with a language such as English which can deal with linguistic subject matter, but also one has to be able to figure out the referent o  
f the phrase "this sentence". It seems simple, but it depends on our v  
ery complex yet totally assimilated ability to handle English. What is especia lly  
important here is the ability to figure out the referent of a noun p  
hrase with a demonstrative adjective in it. This ability is built up slowly, a  
nd should by no means be considered trivial. The difficulty is perhaps underlined when a sentence such as number 4 is presented to someone na'i  
ve about paradoxes and linguistic tricks, such as a child. They may say, "Wh  
at sentence is false?" and it may take a bit of persistence to get across the i  
dea that the sentence is talking about itself. The whole idea is a little mi

539

boggling at first. A couple of pictures may help (Figs. 8 3, 84). Figure 83 is a   
picture which can be interpreted on two levels. On one level, it is a senten  
ce pointing at itself; on the other level, it is a picture of Epimenides e  
xecuting his own death s  
entenc

539

Figure 84, showing visible and invisible portions of the i  
ceberg, suggests the relative proportion of sentence to processing required for t  
he recognition of self-reference:

539

FIGURE 84.

539

It is amusing to try to create a self-referring sentence without using t  
he trick of saying "this sentence". One could try to quote a sentence insi  
de itself. Here is an a  
ttempt: The sentence "The sentence contains five words" contains five w  
ords. But such an attempt must fail, for any sentence that could be q  
uoted entirely inside itself would have to be shorter than itself. This is a  
ctually possible, but only if you are willing to entertain infinitely long s  
entences, such a

540

The sentenc  
e "The s  
entence "The s  
entence "'The s  
entence is infinitely l  
ong"' is infinitely l  
ong·· is infinitely long"   
is infinitely long.

540

But this cannot work for finite sentences. For the same reason, G  
odel's string G could not contain the explicit numeral for its Godel number: i  
t would not fit. No string of TNT can contain the TNT-numeral for its own   
Godel number, for that numeral always contains more symbols than t  
he string itself does. But you can get around this by having G contain a  
description of its own Godel number, by means of the notions of "sub" a  
nd "

540

One way of achieving self-reference in an English sentence by m  
eans of description instead of by self-quoting or using the phrase "this s  
entence" is the Quine method, illustrated in the dialogue Air on G's String. T  
he understanding of the Quine sentence requires less subtle mental proce  
ssing than the four examples cited earlier. Although it may appear at first to b  
e trickier, it is in some ways more explicit. The Quine construction is q  
uite like the Godel construction, in the way that it creates self-reference b  
y describing another typographical entity which, as it turns out, is isom  
orphic to the Quine sentence itself. The description of the new typ  
ographical entity is carried out by two parts of the Quine sentence. One part is a set o  
f instructions telling how to build a certain phrase, while the other p  
art contains the construction materials to be used; that is, the other part is a   
template. This resembles a floating cake of soap more than it resembles a  
n iceberg (See Fig. 8

540

FIGURE 8

541

The self-reference of this sentence is achieved in a more direct way than i  
n the Epimenides paradox; less hidden processing is needed. By the way, it is   
interesting to point out that the phrase "this sentence" appears in t  
he previous sentence; yet it is not there to cause self-reference; you p  
robably understood that its referent was the Quine sentence, rather than t  
he sentence in which it occurs. This just goes to show how pointer p  
hrases such as "this sentence" are interpreted according to context, and helps t  
o show that the processing of such phrases is indeed quite i

541

A Self-Reproducing P  
rogra

541

The notion of quining, and its usage in creating self-reference, have already been explained inside the Dialogue itself, so we need not dwell o  
n such matters here. Let us instead show how a computer program can u  
se precisely the same technique to reproduce itself. The following selfreproducing program is written in a BlooP-like language and is based o  
n following a phrase by its own quotation (the opposite order from quining, s  
o I reverse the name "quine" to make "eniuq"):  
DEFINE PROCEDURE "ENIUQ" [TEMPLATE]: PRINT [TEMPLATE, LEFT-B  
RACKET, QUOTE-MARK, TEMPLATE, QUOTE-MARK, RIGHT-BRACKET, PERIOD  
]. E  
NIUQ ['DEFINE PROCEDURE "ENIUQ" [TEMPLATE] : PRINT [TEMPLATE, LEFT-BRA  
CKET, QUOTE-MARK, TEMPLATE, QUOTE-MARK, RIGHT-BRACKET, PERIO  
D]. ENIUQ']  
. ENlUQ is a procedure defined in the first two lines, and its input is c  
alled "TEMPLAT E". It is understood that when the procedure is c  
alled, TEMPLATE's value will be some string of typographical characters. T  
he effect of ENlUQ is to carry out a printing operation, in which T  
EMPLATE gets printed twice: the first time just plain; the second time wrapped i  
n (single) quotes and brackets, and garnished with a final period. Thus, i  
f TEMPLATE's value were the string DOUBLE-BUBBLE, then performin  
g ENlUQ on it would y

541

DOUBLE-BUBBLE ['DOUBLE-BUBBLE'].

541

Now in the last four lines of the program above, the procedure ENlUQ i  
s called with a specific value of TEMPLATE-namely the long string inside t  
he single quotes: DEFINE ... ENlUQ. That value has been carefully chosen; i  
t consists of the definition of ENlUQ, followed by the word ENlUQ. This makes   
the program itself-or, if you prefer, a perfect copy of it-get printed o  
ut. It is very similar to Quine's version of the Epimenides s  
entence: "yields falsehood when preceded by its q  
uotation" yields falsehood when preceded by its quot  
ation. It is very important to realize that the character string which appears i  
n quotes in the last three lines of the program above-that is, the value o  

542

TEMPLATE-is never interpreted as a sequence of instructions. That i  
t happens to be one is, in a s ense,just an accident. As was pointed out a  
bove, it could just as well have been DOUBLE-BUBBLE or any other string o  
f characters. The beauty of the scheme is that when the same string a  
ppears in the top two lines of this program, it is treated as a program (because it i  
s not in quotes). Thus in this program, one string functions in two ways: fi  
rst as program, and second as data. This is the secret of s  
elf-reproducing programs, and, as we shall see, of self-reproducing molecules. It is u  
seful, incidentally, to call any kind of self-reproducing object or entity a self-rep  
; and likewise to call any self-referring object or entity a self-ref. I will u  
se those terms occasionally from here on.

542

The preceding program is an elegant example of a s  
elf-reproducing program written in a language which was not designed to make the writin  
g of self-reps particularly easy. Thus, the task had to be carried out u  
sing those notions and operations which were assumed to be part of t  
he language-such as the word QUOTE-MARK, and the command PRINT. B  
ut suppose a language were designed expressly for making self-reps easy t  
o write. Then one could write much shorter self-reps. For example, s  
uppose that the operation of eniuq-ing were a built-in feature of the l  
anguage, needing no explicit definition (as we assumed PRINT was). Then a t  
eeny self-rep would be this:

542

ENIUQ ['ENIUQ']

542

It is very similar to the Tortoise's version of Quine's version of t  
he Epimenides self-ref, where the verb "to quine" is assumed to be k  
nown: "yields falsehood when quined" yields falsehood when q  
uined. But self-reps can be even shorter. For instance, in some c  
omputer language it might be a convention that any program whose first symbol i  
s an asterisk is to be copied before being executed normally. Then t  
he program consisting of merely one asterisk is a self-rep! You may complain  
that this is silly and depends on a totally arbitrary convention. In doing s  
o, you are echoing my earlier point that it is almost cheating to use the p  
hrase "this sentence" to achieve self-reference-it relies too much on the processor, and not enough on explicit directions for self-reference. Using a  
n asterisk as an example of a self-rep is like using the word "I" as an e  
xample of a self-ref: both conceal all the interesting aspects of their r  
espective p

542

This is reminiscent of another curious type of self-reproduction: v  
ia photocopy machine. It might be claimed that any written document is a  
self-rep because it can cause a copy of itself to be printed when it is p  
laced in a photocopy machine and the appropriate button is pushed. But somehow this violates our notion of self-reproduction; the piece of paper is n  
ot consulted at all, and is therefore not directing its own reproduction. Again  
, everything is in the processor. Before we call something a self-rep, we w  
ant to have the feeling that, to the maximum extent possible, it explicitly contains the directions for copying i  
tsel

543

To be sure, explicitness is a matter of degree; nonetheless there is a  
n intuitive borderline on one side of which we perceive true s  
elf-directed self-reproduction, and on the other side of which we merely see cop  
ying being carried out by an inflexible and autonomous copying mach  
in

543

What Is a Copy

543

Now in any discussion of self-refs and self-reps, one must sooner or l  
ater come to grips with the essential i ssue: what is a copy? We already dealt w  
ith that question quite seriously in Chapters V and VI; and now we come b  
ack to it. To give the flavor of the issue, let us describe some highly fanciful, y  
et plausible, examples of self-

543

A Self-Reproducing S  
on

543

Imagine that there is a nickelodeon in the local bar which, if you p  
ress buttons 11-U, will play a song whose lyrics go this w  
ay: Put another nickel in, in the n  
ickelodeon, All I want is 11-U, and music, music, m  
usic. We could make a little diagram of what happens one evening (Fig. 86).  
p  
erson S  
ong nickelode  
on FIGURE 86. A selj�reproducing s  
ong. Although the effect is that the song reproduces itself, it would feel s  
trange to call the song a self-rep, because of the fact that when it passes t  
hrough the 11-U stage, not all of the information is there. The information o  
nly gets put back by virtue of the fact that it is fully stored in the nickelodeonthat is, in one of the arrows in the diagram, not in one of the ovals. It i  
s questionable whether this song contains a complete description of how t  
o get itself played again, because the symbol pair " 11-U" is only a trigger, n  
ot a copy

543

A "Crab" P  
rogra

543

Consider next a computer program which prints itself out backw  
ards. (Some readers might enjoy thinking about how to write such a program i  

544

the BlooP-like language above, using the given self-rep as a model.) W  
ould this funny program count as a self-rep? Yes, in a way, because a t  
rivial transformation performed on its output will restore the original p  
rogram. It seems fair to say that the output contains the same information as t  
he program i tself.just recast in a simple way. Yet it is clear that someone m  
ight look at the output and not recognize it as a program printed backwards. T  
o recall terminology from Chapter VI, we could say that the "inner messages" of the output and the program itself are the same, but they h  
ave different "outer messages"-that is, they must be read by using differ  
ent decoding mechanisms. Now if one counts the outer message as part of t  
he information-which seems quite reasonable-then the total information i  
s not the same after all, so the program can't be counted as a s

544

However, this is a disquieting conclusion, because we are a  
ccustomed to considering something and its mirror image as containing the s  
ame information. But recall that in Chapter VI, we made the concept of "intrinsic meaning" dependent on a hypothesized universal notion of intelligenc  
e. The idea was that, in determining the intrinsic meaning of an object, w  
e could disregard some types of outer message-those which would be universally understood. That is, if the decoding mechanism seems f  
undamental enough, in some still ill-defined sense, then the inner message which it l  
ets be revealed is the only meaning that counts. In this example, it s  
eems reasonably safe to guess that a "standard intelligence" would consider t  
wo mirror images to contain the same information as each other; that is, i  
t would consider the isomorphism between the two to be so trivial as to b  
e ignorable. And thus our intuition that the program is in some sense a f  
air self-rep, is allowed to s

544

Epimenides Straddles the C  
hanne

544

prints itself out, but translated into a different computer language. O  
ne might liken this to the following curious version of the Quine version of t  
he Epimenides s  
elf-ref: "est une expression qui, quand elle est precedee de sa t  
raduction, mise entre guillemets, clans la langue provenant de l'autre cote d  
e la Manche, cree une faussete" is an expression which, when it i  
s preceded by its translation, placed in quotation marks, into t  
he language originating on the other side of the Channel, yields a  
fa  
lsehood. You might try to write down the sentence which is described by this w  
eird concoction. (Hint: It is not itself-or at least it is not if "it self" is taken in a  
naive sense.) If the notion of "self-rep by retrograde motion" (i.e., a program which writes itself out backwards) is reminiscent of a crab canon, t  
he notion of "self-rep by translation" is no less reminiscent of a canon w  
hich involves a transposition of the theme into another k  
e

545

A Program That Prints Out Its Own Godel Numb  
e

545

The idea of printing out a translation instead of an exact copy of t  
he original program may seem pointless. However, if you wanted to write a  
self-rep program in BlooP or FlooP, you would have to resort to some s  
uch device, for in those languages, OUTPUT is always a number, rather than a  
typographical string. Therefore, you would have to make the prograrr,  
print out its own Godel number: a very huge integer whose decimal   
expansion codes for the program, character by character, by using three_  
digit codons. The program is coming as close as it can to printing i  
tself, within the means available to it: it prints out a copy of itself in a  
nother "space", and it is easy to switch back and forth between the space of i  
ntegers and the space of strings. Thus, the value of OUTPUT is not a mere t  
rigger, like "1 1-U". Instead, all the information of the original program lies "  
close to the surface" of the o  
utpu

545

Godelian Self-Refe  
renc

545

This comes very close to describing the mechanism of Godel's self-ref G  
. After all, that string of TNT contains a description not of itself, but of an   
integer (the arithmoquinification of u). It just so happens that that i  
nteger is an exact "image" of the string G, m the space of natural numbers. T  
hus, G refers to a translation of itself into another space. We still feel comfortable in calling Ga self-referential string, because the isomorphism b  
etween the two spaces is so tight that we can consider them to be ide  
ntica

545

This isomorphism that mirrors TNT inside the abstract realm o  
f natural numbers can be likened to the quasi-isomorphism that mirrors t  
he real world inside our brains, by means of symbols. The symbols play   
quasi-isomorphic roles to the objects. and it is thanks to them that we c  
an think. Likewise, the Godel numbers play isomorphic roles to strings, and i  
t is thanks to them that we can find metamathematical meanings in statements about natural numbers. The amazing, nearly magical, thing about G  
is that it manages to achieve self-reference despite the fact that the language in which it is written, TNT, seems to offer no hope of referring to i  
ts own structures, unlike English, in which it is the easiest thing in the w  
orld to discuss the English l

545

So G is an outstanding example of a self-ref via translation-hardly t  
he most straightforward case. One might also think back to some of t  
he Dialogues, for some of them, too, are self-refs via translation. For i  
nstance, take the Sonata for Unaccompanied Achilles. In that Dialogue, several references are made to the Bach Sonatas for unaccompanied violin, and t  
he Tortoise's suggestion of imagining harpsichord accompaniments is particularly interesting. After all, if one applies this idea to the Dialogue itself, one   
invents lines which the Tortoise is saying; but if one assumes that A  
chilles' part stands alone (as does the violin), then it is quite wrong to attribute a  
ny lines at all to the Tortoise. In any case, here again is a self-ref by means of a  
mapping which maps Dialogues onto pieces by Bach. And this mapping i  

546

left, of course, for the reader to notice. Yet even if the reader does n  
ot notice it, the mapping is still there, and the Dialogue is still a self-r

546

A Self-Rep by Augmentatio  

546

We have been likening self-reps to canons. What, then, would be a fa  
ir analogue to a canon by augmentation? Here is a possibility: consider a  
program which contains a dummy loop whose only purpose is to slow u  
p the program. A parameter might tell how often to repeat the loop. A  
self-rep could be made which prints out a copy of itself, but with the   
parameter changed, so that when that copy is run, it will run at half the   
speed of its parent program; and its "daughter" will in turn run at h  
alf again the speed, and so on ... None of these programs prints itself o  
ut precisely; yet all clearly belong to a single "family".

546

This is reminiscent of the self-reproduction of living o  
rganisms. Clearly, an individual is never identical to either of its parents; w hy, then, i  
s the act of making young called "self-reproduction"? The answer is t  
hat there is a coarse-grained isomorphism between parent and child; it is a  
n isomorphism which preserves the information about species. Thus, what i  
s reproduced is the class, rather than the instance. This is also the case in t  
he recursive picture Gplot, in Chapter V: that is, the mapping b  
etween "magnetic butterflies" of various sizes and shapes is coarse-grained; no t  
wo are identical, but they all belong to a single "species", and the m  
apping preserves precisely that fact. In terms of self-replicating programs, t  
his would correspond to a family of programs, all written in "dialects" of a  
single computer language; each one can write itself out, but slightly modified, so that it comes out in a dialect of its original l

546

A Kimian Self-Re  

546

Perhaps the sneakiest example of a self-rep is the following: instead o  
f writing a legal expression in the compiler language, you type one of the   
compiler's own error messages. When the compiler looks at your "program", the first thing it does is get confused, because your "program" i  
s ungrammatica l; hence the compiler prints out an error message. All you   
need to do is arrange that the one it prints out will be the one you typed i  
n. This kind of self-rep, suggested to me by Scott Kim, exploits a diff  
erent level of the system from the one you would normally approach. Although i  
t may seem frivolous, it may have counterparts in complex s ystems w  
here self-reps vie against each other for survival, as we shall soon d  
iscus

546

What Is the O

546

Besides the question "What constitutes a copy?", there is another fundamental philosophical question concerning self-reps. That is the o  
bvers

547

side of the coin: "What is the original?" This can best be explained b  
y referring to some e  
xample

547

(1) a program which, when interpreted by some i  
nterpreter running on some computP.r, prints itself o  
u

547

(2) a program which, when interpreted by some int  
erpreter running on some computer, prints itself out along with a  
complete copy of the interpreter (which, after all, is also a   
p rogram);

547

(3) a program which, when interpreted by some i  
nterpreter running on some computer, not only prints itself out a  
long with a complete copy of the interpreter, but also directs a  
mechanical assembly process in which a second c  
omputer, identical to the one on which the interpreter and p  
rogram are running, is put togeth  
e

547

is clear that in (1), the program is t.he self-rep. But in (3), is it the p  
rogram which is the self-rep, or the compound s ystem of program plus int  
erpreter, or the union of program, interpreter, and p  
rocesso

547

C learly, a self-rep can involve more than just printing itself out. In fact,  
most of the rest of this Chapter is a discussion of self-reps in which d  
ata, program, interpreter, and processor are all extremely intertwined, and i  
n which self-replication involves replicating all of them at o

547

Typogen  
etic

547

We are now about to broach one of the most fascinating and p  
rofound topics of the twentieth c entury: the study of "the molecular logic of t  
he living state", to borrow Albert Lehninger's richly evocative phrase. And   
logic it is, too-but of a sort more complex and beautiful than any a h  
uman mind ever imagined. We will come at it from a slightly novel angle: via a  
n artificial solitaire game which I call Typogenetics-short for "Typ  
ographical Genetics". In Typogenetics I have tried to capture some ideas of m  
olecular genetics in a typographical s ystem which, on first sight, resembles v  
ery much the formal s ystems exemplified by the MIU-system. Of course, Typogenetics involves many simplifications, and therefore is useful p  
rimarily for didactic p

547

I should explain immediately that the field of molecular biology is a  
field in which phenomena on several levels interact, and that Typogen  
etics is only trying to illustrate phenomena from one or two levels. In p  
articular, purely chemical aspects have been completely avoided-they belong to a  
level lower than is here dealt with; similarly, all aspects of classical gen  
etics (viz., nonmolecular genetics) have also been avoided-they belong to a l  
evel higher than is here dealt with. I have intended in Typogenetics only to g  
ive an intuition for those processes centered on the celebrated Central Dogma o  

548

Molecular Biology, enunciated by Francis Crick (one of the co-discoverers o  
f the double-helix structure of DNA):  
DNA ::;, RNA ::;, p  
roteins. It is my hope that with this very skeletal model I have constructed t  
he reader will perceive some simple unifying principles of the fieldprinciples which might otherwise be obscured by the enormously intr  
icate interplay of phenomena at many different levels. What is sacrificed is, o  
f course, strict accuracy; what is gained is, I hope, a little ins  
igh

548

Strands, Bases, Enzy  
me

548

The game of Typogenetics involves typographical manipulation on sequences of letters. There are four letters inv  
olved: A C G T  
. Arbitrary sequences of them are called strands. Thus, some strands a  
re: G  
GGG ATTAC  
CA C  
ATCATCATCA"( Incidentally, "STRAND" spelled backwards begins with "DNA". This is   
appropriate since strands, in Typogenetics, play the role of pieces of D  
NA (which, in real genetics, are often called "strands"). Not only this, b  
ut "STRAND" fully spelled out backwards is "DNA RTS", which may be t  
aken as an acronym for "DNA Rapid Transit Service". This, too, is a  
ppropriate, for the function of "messenger RNA"-which in Typogenetics is represented by strands as well-is quite well characterized by the p  
hrase "Rapid Transit Service" for DNA, as we shall see l

548

I will sometimes refer to the letters A, C, G, T as bases, and to t  
he positions which they occupy as units. Thus, in the middle strand, there a  
re seven units, in the fourth of which is found the base A

548

If you have a strand, you can operate on it and change it in v  
arious ways. You can also produce additional strands, either by copying, or b  
y cutting a strand in two. Some operations lengthen strands, some s  
horten them, and some leave their length a  
lon

548

Operations come in packets-that is, several to be performed t  
ogether, in order. Such a packet of operations is a little like a programmed m  
achine which moves up and down the strand doing things to it. These m  
obile machines are called "typographical enzymes"--enzymes for short. Enzyme  
s operate on strands one unit at a time, and are said to be "bound" to the u  
nit they are operating on at any given m  
omen

548

I will show how some sample enzymes act on particular strings. T  
he first thing to know is that each enzyme likes to start out bound to a  
particular letter. Thus, there are four kinds of enzyme-those which p  
refe

549

A, those which prefer C, etc. Given the sequence of operations which a  
n enzyme performs, you can figure out which letter it prefers, but for now I  
'll just give them without explanation Here's a sample enzyme, consisting o  
f three operat  
ions: { ( 1) Delete the unit to which the enzyme is bound (and then b  
ind to the next unit to the right  
). ( 2)Move one unit to the right.  
( 3)Insert a T (to the immediate right of this u  
nit).This enzyme happens to like to bind to A initially. And here's a s  
amples  
trand: A  
CAWhat happens if our enzyme binds to the left A and begins acting? Step 1  
deletes the A, so we are left with CA--and the enzyme is now bound to t  
he C .Step 2 slides the enzyme rightwards, to the A, and Step 3 appends a T  
onto the end to form the strand CAT. And the enzyme has done i  
tscomplete duty: it has transformed ACA into C

549

What if it had bound itself to the right A of ACA? It would have d  
eletedthat A and moved off the end of the strand. Whenever this happens, t  
heenzyme quits (this is a general principle). So the entire effect would just b  
e to lop off one s  
ymbol. Let's see some more examples. Here is another e  
nzyme: { (1) Search for the nearest p )rimidine to the right of this unit.   
( 2)Go into Copy m  
ode.( 3)Search for the nearest purine to the right of of this u  
nit.( 4)Cut the strand here (viz., to the right of the present u  
nit).Now this contains the terms "pyrimidine" and "purine". They are e  
asy terms. A and G are called purines, and C and T are called pyrimidines. S  
osearching for a pyrimidine merely means searching for the nearest C or T

549

Copy Mode and Double S  
trand

549

The other new term is Copy mode. Any strand can be "copied" onto a  
nother strand, but in a funny way. Instead of copying A onto A, you copy it onto T  
,and vice versa. And instead of copying C onto C, you copy it onto G, and   
vice versa. Note that a purine copies onto a pyrimidine, and vice versa. T  
his is called complementary base pairing. The complements are shown b  
elow: c  
omplement {  
A ·¢=⇒ T  
}  
purines p  
yrimidines G •¢:⇒ C

550

You can perhaps remember this molecular pairing scheme by recalling t  
hat Achilles is paired with the Tortoise, and the Crab with his Genes.

550

When "copying" a strand, therefore, you don't actually copy it, but y  
ou manufacture its complementary strand. And this one will be written u  
pside down above the original strand. Let's see this in concrete terms. Let t  
he previous enzyme act on the following strand (and that enzyme also h  
appens to like to start at A):  
CAAAG  
AGMTCCTCTTTGAT There are many places it could start. Let's take the second A, for e  
xample. The enzyme binds to it, then executes step 1: Search for the n  
earest pyrimidine to the right. Well, this means a C or a T. The first one is a T   
somewhere near the middle of the strand, so that's where we go. Now s  
tep 2: Copy mode. Well, we just put an upside-down A above our T. But that's   
not all, for Copy mode remains in effect until it is shut off-or until t  
he enzyme is done, whichever comes first. This means that every base which i  
s passed through by the enzyme while Copy mode is on will get a complementary base put above it. Step 3 says to look for a purine to the right o  
f our T. That is the G two symbols in from the right-hand end. Now as w  
e move up to that G, we must "copy"-that is, create a complementary s  
trand. Here's what that gives:  
\{':)':) \{':) \{\{\{  
') CAAAGAGMTCCTCTTTGAT   
The last step is to cut the strand. This will yield two pieces:  
\{':)':) \{':) \{\{\{  
') CAAAGAGMT  
CCTCTTTG and A  
T. And the instruction packet is done. We are left with a double s  
trand, however. Whenever this happens, we separate the two complement  
ary strands from each other (general principle); so in fact our end product is a  
set of three strands  
: AT, CAAAGAGGA, and CAAAGAGMTCCTCTTTG.  
Notice that the upside-down strand has been turned right side up, a  
nd thereby right and left have been r

550

Now you have seen most of the typographical operations which can b  
e carried out on strands. There are two other instructions which should b  
e mentioned. One shuts off Copy mode; the other switches the enzyme from a  
strand to the upside-down strand above it. When this happens, if you k  
eep the paper right side up, then you must switch "left" and "right" in all the   
instructions. Or better, you can keep the wording and just turn the p  
aper around so the top strand becomes legible. If the "switch" command i  

551

given, but there is no complementary base where the enzyme is bound a  
t that instant, then the enzyme just detaches itself from the strand, and its j  
ob is d  
on

551

It should be mentioned that when a "cut" instruction is e  
ncountered, this pertains to both strands (if there are t wo); however, "delete" p  
ertains only to the strand on which the enzyme is working. If Copy mode is o  
n, then the "insert" command pertains to both strands-the base itself into t  
he strand the enzyme is working on, and its complement into the other s  
trand. If Copy mode is off, then the "insert" command pertains only to the o  
ne strand, so a blank space must be inserted into the complementary strand.

551

And, whenever Copy mode i5 on, "move" and "search" c  
ommands require that one manufacture complementary bases to all bases which t  
he sliding enzyme touches. Incidentally, Copy mode is always off when a  
n enzyme starts to work. If Copy mode is off, and the command "Shut o  
ff copy mode" is encountered, nothing happens. Likewise, if Copy mode i  
s already on, and the command "Turn copy mode on" is encountered, t  
hen nothing h  
appen

551

Amino A  
cid

551

There are fifteen types of command, listed below:   
cut cut s  
trand(s) de! delete a base f  
rom s  
trand sw1 switch enzyme to other s  
trand mvr move one unit to the r  
ight mvl move one unit to the l  
eft cop turn on Copy m  
ode off turn off Copy m  
ode ma insert A to the right of this u  
nit me insert C to the right of this u  
nit mg insert G to the right of this u  
nit int insert T to the right of this u  
nit rpy search for the nearest pyrimidine to the r  
ight rpu search for the nearest purine to the r  
ight lpy search for the nearest pyrimidine to the l  
eft I pu search for the nearest purine to the l  
eft Each one has a three-letter abbreviation. We shall refer to the t  
hree-letter abbreviations of commands as amino acids. Thus, every enzyme is made up of a  
sequence of amino acids. Let us write down an arbitrary e  
nzyme: rpu - inc - cop - mvr - mvl - swi - lpu - i  
nt and an arbitrary s  
trand: TAG  
ATCCAGTCCATCG

552

and see how the enzyme acts on the strand. It so happens that the e  
nzyme binds to G only. Let us bind to the middle G and begin. Search r  
ightwards for a purine ( viz., A or G). We (the enzyme) skip over TCC and land on A  
.Insert a C. Now we h  
ave TAG  
ATCCAGTCCACTCGA where the arrow points to the unit to which the enzyme is bound. Set C  
opy mode. This puts an upside-down G above the C. Move right, move l  
eft,then switch to the other strand. Here's what we have so fa  
r: +  
r:)  
\f TAG  
ATCCAGTCCACTCGA Let's turn it upside down, so that the enzyme is attached to the l  
ower stra  
nd: \/  
r:JJlJ\/JJlr:J\/JJl\/r:J\/1 A  
G ♦  
Now we search leftwards for a purine, and find A. Copy mode is on, but t  
hecomplementary bases are already there, so nothing is added. Finally, w  
e insert a T (in Copy mode), and quit:  
\/r:JJl\/J\/JJlr:J\/JJl\/  
r:J\/1 A  
TG Our final product is thus two strlnds:  
ATG, and T  
AGATCCAGTCCACATCGA The old one is of course g

552

Translation and the Typogenetic C  
od

552

Now you might be wondering where the enzymes and strands come fro  
m, and how to tell the initial binding-preference of a given enzyme. One w  
ay might be just to throw some random strands and some random e  
nzymes together, and see what happens when those enzymes act on those s  
trands and their progeny. This has a similar flavor to the MU-puzzle, where t  
here were some given rules of inference and an axiom, and you just began. T  
he only difference is that here, every time a strand is acted on, its original f  
orm is gone forever. In the MU-puzzle, acting on Ml to make MIU didn't d  
estroy M  

552

But in Typogenetics, as in real genetics, the scheme is quite a b  
it trickier. We do begin with some arbitrary strand, somewhat like an a  
xiom in a formal system. But we have, initially, no "rules of inference"-that i  
s, no enzymes. However, we can translate each strand into one or m  
ore enzymes! Thus, the strands themselves will dictate the operations w  
hich will be performed upon them, and those operations will in turn produc  

553

new strands which will dictate further enzymes, etc. e tc.! This is mixin  
g levels with a vengeance! Think, for the sake of comparison, how d  
ifferent the MU-puzzle would have been if each new theorem produced could h  
ave been turned into a new rule of inference by means of some c  
od

553

How is this "translation" done? It involves a Typogenetic Code by w  
hich adjacent pairs of bases-called "duplets"-in a single strand r  
epresent different amino acids. There are sixteen possible duplets: AA, AC, AG, AT,   
CA, CC, etc. And there are fifteen amino acids. The Typogenetic Code i  
s shown in Figure 8

553

FIGURE 87. The Typogenetic Code, b  
y which each duplet in a strand codes for o  
ne of fifteen "amino acids" ( or a p  
unctuation m

553

According to the table, the translation of the duplet GC is "inc" ("insert a  
C"); that of AT is "swi" ("switch strands"); and so on. Therefore it b  
ecomes clear that a strand can dictate an enzyme very straightforwardly. F  
or example, the s  
trand TAG  
ATCCAGTCCACATCGA breaks up into d uplets as fo  
llows: TA GA TC CA GT CC AC AT CG A  
with the A left over at the end. Its translation into an enzyme is:   
rpy - ina - rpu - mvr - int - mvl - cut - swi - cop.   
(Note that the leftover A contributes nothing.)

553

Tertiary Structure of E  
nzyme

553

What about the little letters 's', 'l', and 'r' in the lower righthand corner o  
f each box? They are crucial in determining the enzyme's binding-preference, and in a peculiar way. In order to figure out what letter an enzy  
me likes to bind to, you have to figure out the enzyme's "tertiary struct  
ure", which is itself determined by the enzyme's "primary structure". By i  
t

554

primary structure is meant its amino acid sequence. By its tertiary structure i  
s meant the way it likes to "fold up". The point is that e nzymes don't l  
ike being in straight lines, as we have so far exhibited them. At each i  
nternal amino acid (all but the two ends), there is a possibility of a "kink", which i  
s dictated by the letters in the corners. In particular, 'l' and 'r' stand fo  
r "left" and "right", and 's' stands for "straight". So let us take our m  
ost recent sample enzyme, and let it fold itself up to show its tertiary s  
tructure. We will start with the enzyme's primary structure, and move along it f  
rom left to right. At each amino acid whose corner-letter is 'l' we'll put a left  
turn, for those with 'r', we'll put a right turn, and at 's' we'll put no turn. I  
n Figure 88 is shown the two-dimensional conformation for our enzyme

554

FIGURE 88. The tertiary structure of a typoenzy

554

Note the left-kink at "rpu", the right-kink at "swi", and so on. Notice a  
lso that the first segment ("rpy � ina") and the last segment ("swi � cop") a  
re perpendicular. This is the key to the binding-preference. In fact, t  
he relative orientation of the first and last segments of an enzyme's tertiary s  
tructure determines the binding-preference of the enzyme. We can always o  
rient the enzyme so that its first segment points to the right. If we do so, then t  
he last segment determines the binding-preference, as shown in Figure 8  

554

FIGURE 89. Table of binding-preferences for typoenzy  
me

555

So in our case, we have an enzyme which likes the letter C. If, in folding u  
p, an enzyme happens to cross itself, that's okay-just think of it as g  
oing under or over itself. Notice that all its amino acids play a role in t  
he determination of an enzyme's tertiary s

555

Punctuation, Genes, and R  
ibosome

555

Now one thing remains to be explained. Why is there a blank in box AA o  
f the Typogenetic Code? The answer is that the duplet AA acts as a punctuation mark inside a strand, and it signals the end of the code for an e  
nzyme. That is to say, one strand may code for two or more enzymes if it has one o  
r more duplets AA in it. For example, the s  
trand codes for two enzymes:  
CG GA TA CT AA AC CG A  
cop - ina - rpy - o  
ff a  
nd c ut.- -c  
op with the AA serving to divide the strand up into two "genes". The defini  
tion of gene is: that portion of a strand which codes for a single enzyme. Note that t  
he mere presence of AA inside a strand does not mean that the strand c  
odes for two enzymes. For instance, CMG codes for "mvr - de!". The AA b  
egins on an even-numbered unit and therefore is not read as a d

555

The mechanism which reads strands and produces the enzymes w  
hich are coded inside them is called a ribosome. (In Typogenetics, the player o  
f the game does the work of the ribosomes.) Ribosomes are not in any w  
ay responsible for the tertiary structure of enzymes, for that is entirely determined once the primary structure is created. Incidenta lly, the process o  
f translation always goes from strands to enzymes, and never in the r  
everse d

555

Puzzle: A Typogenetical Self-R  
e

555

Now that the rules of Typogenetics have been fully set out, you may find i  
t interesting to experiment with the game. In particular, it would be m  
ost interesting to devise a self-replicating strand. This would mean somethi  
ng along the following lines. A single strand is written down. A ribosome a  
cts on it, to produce any or all of the enzymes which are coded for in t  
he strand. Then those enzymes are brought into contact with the o  
riginal strand, and allowed to work on it. This yields a set of "daughter s  
trands". The daughter strands themselves pass through the ribosomes, to yield a  
second generation of enzymes, which act on the daughter strands; and t  
h

556

cycle goes on and on. This can go on for any number of stages; the hope i  
s that eventually, among the strands which are present at some point, t  
here will be found two copies of the original strand (one of the copies may be, i  
n fact, the original s  
tran

556

The Central Dogma of Typ  
ogenetic

556

Typogenetical processes can be represented in skeletal form in a diag  
ram (Fig. 9

556

FIGURE 90. The "Central Dogma o  
f Typogenetics": an example of a "  
Tangled Hierarchy"

556

This diagram illustrates the Central Dogma of Typogenetics. It shows how   
strands define enzymes (via the Typogenetic Code); and how in t  
urn, enzymes act back on the strands which gave rise to them, yielding n  
ew strands. Therefore, the line on the left portrays how old information fl  
ows upwards, in the sense that an enzyme is a translation of a strand, a  
nd contains therefore the same information as the strand, only in a diff  
erent form-in particular; in an active form. The line on the right, however, d  
oes not show information flowing downwards; instead, it shows how new information gets created: by the shunting of symbols in s

556

An enzyme in Typogenetics, like a rule of inference in a formal sys  
tem, blindly shunts symbols in strands without regard to any "meaning" w  
hich may lurk in those symbols. So there is a curious mixture of levels here. O  
n the one hand, strands are acted upon, and therefore play the role of da  
ta (as is indicated by the arrow on the right); on the other hand, they a  
lso dictate the actions which are to be performed on the data, and t  
herefore they play the role of programs (as is indicated by the arrow on the left). It i  
s the player of Typogenetics who acts as interpreter and processor, o  
f course. The two-way street which links "upper" and "lower" levels o  
f Typogenetics shows that, in fact, neither strands nor enzymes can b  
e thought of as being on a higher level than the other. By contrast, a p  
icture of the Central Dogma of the MIU-system looks this way

556

In the MIU-system, there is a clear distinction of levels: rules of infe  
rence simply belong to a higher level than strings. Similarly for TNT, and a  
ll formal systems.

557

Strange Loops, TNT, and Real G  
enetic

557

However, we have seen that in TNT, levels are mixed, in another sense. I  
n fact, the distinction between language and metalanguage breaks down  
: statements about the system get mirrored inside the system. It turns out t  
hat if we make a diagram showing the relationship between TNT and i  
ts metalanguage, we will produce something which resembles in a r  
emarkable way the diagram which represents the Central Dogma of Molecular Biology. In fact, it is our goal to make this comparison in detail; but to do so, w  
e need to indicate the places where Typogenetics and true genetics c  
oincide, and where they differ. Of course, real genetics is far more complex than  
Typogenetics-but the "conceptual skeleton" which the reader has acquired in understanding Typogenetics will be very useful as a guide in t  
he labyrinth of true genetics.

557

DNA and Nuc  
leotide

557

We begin by discussing the relationship between "strands", and DNA. T  
he initials "DNA" stand for "deoxyribonucleic acid". The DNA of most c  
ells resides in the cell's nucleus, which is a small area protected by a m  
embrane. Gunther Stent has characterized the nucleus as the "throne room" of t  
he cell, with DNA acting as the ruler. DNA consists of long chains o fr  
elatively simple molecules called nucleotides. Each nucleotide is made up of t  
hree parts: (1) a phosphate group stripped of one special oxygen atom, whenc  
e the prefix "deoxy"; (2) a sugar called "ribose", and (3) a base. It is the base   
alone which distinguishes one nucleotide from another; thus it suffices t  
o specify its base to identify a nucleotide. The four types of bases which occ  
ur in DNA nucleotides a  
re: A: adenine } G: g  
uanine p  
urines C: cytosine } T: thymin  
e pyr  
imidines (Also see Fig. 91.) It is easy to remember which ones are p  
yrimidines because the first vowel in "cytosine", "thymine", and "pyrimidine" is 'y'  
. Later, when we talk about RNA, " uracil"-also a pyrimidine-will come i  
n and wreck the pattern, unfortunately. (Note: Letters representing nucleotides in real genetics will not be in the Quadrata font, as they were i  
n Typogenetics.

557

A single strand of DNA thus consists of many nucleotides s  
trung together like a chain of beads. The chemical bond which links a n  
ucleotide to its two neighbors is very strong; such bonds are called covalent bonds, a  
nd the "chain of beads" is often called the covalent backbone of D

557

Now DNA usually comes in double strands-that is, two single s  
trands which are paired up, nucleotide by nucleotide (see Fig. 92). It is the b  
ase

558

FIGURE 91. The four constituent bases of DNA: Adenine, Guanine. Thymine, Cytosine  
. [From Hanawalt and Haynes, The Chemical Basis of Life (San Francisco: W. H. Freeman, 197  
3), p .142.]

558

FIGURE 92. DNA structure resembles a ladder in which the side pieces consist of alternating units of deoxyribose and phosphate. The rungs are formed by the bases paired in a spe  
cwl way, A with T and G with C, and held together respectively by two and three hydrogen b  
onds. [From Hanawalt and Haynes, The Chemical Basis of Life, p. 142. ]

559

which are responsible for the peculiar kind of pairing which takes p  
lace between strands. Each base in one strand faces a complementary base in the   
other strand, and binds to it. The complements are as in Typogenetics: A  
pairs up with T, and C with G. Always one purine pairs up with a  
p

559

Compared to the strong covalent bonds along the backbone, the interstrand bonds are quite weak. They are not covalent bonds, but hydrogen  
bonds. A hydrogen bond arises when two molecular complexes are a  
ligned in such a way that a hydrogen atom which originally belonged to one o  
f them becomes "confused" about which one it belongs to, and it h  
overs between the two complexes, vacillating as to which one to join. Because t  
he two halves of double-stranded DNA are held together only by h  
ydrogen bonds, they may come apart or be put together relatively easily; and t  
his fact is of great import for the workings of the c  
el

559

When DNA forms double strands, the two strands curl around e  
ach other like twisting vines (Fig. 93). There are exactly ten nucleotide p  
airs per revolution; in other words, at each nucleotide, the "twist" is 36 d  
egrees. Single-stranded DNA does not exhibit this kind of coiling, for it is a   
consequence of the base-pairin  

559

FIGURE 93. Molecular model of t  
he DNA double helix. [From Vernon M. I  
ngram, Biosynthesis (Menlo Park, Calif.: W. A. Benjamin, 1972), p. 1 3.]

560

Messenger RNA and R  
ibosome

560

As was mentioned above, in many cells, DNA, the ruler of the cell, dwells i  
n its private "throne room": the nucleus of the cell. But most of the "living" i  
n a cell goes on outside of the nucleus, namely in the cytoplasm-the "  
ground" to the nucleus' "figure". In particular, enzymes, which make practically e  
very life process go, are manufactured by ribosomes in the cytoplasm, and they d  
o most of their work in the cytoplasm. And just as in Typogenetics, the  
blueprints for all enzymes are stored inside the strands-that is, inside t  
he DNA, which remains protected in its little nuclear home. So how does t  
he information about enzyme structure get from the nucleus to the ribosomes?

560

Here is where messenger RNA-mRNA--comes in. Earlier, m  
RNA strands were humorously said to constitute a kind of DNA Rapid T  
ransit Service; by this is meant not that mRNA physically carries DNA a  
nywhere, but rather that it serves to carry the information, or message, stored in t  
he DNA in its nuclear chambers, out to the ribosomes in the cytoplasm. How i  
s this done? The idea is easy: a special kind of enzyme inside the n  
ucleus faithfully copies long stretches of the DNA's base sequence onto a n  
ew strand-a strand of messenger RN A. This mRN A then departs from t  
he nucleus and wanders out into the cytoplasm, where it runs into m  
any ribosomes which begin doing their enzyme-creating work on i  

560

The process by which DNA gets copied onto mRNA inside the n  
ucleus is called transcription; in it, the double-stranded DNA must be t  
emporarily separated into two single strands, one of which serves as a template for t  
he mRNA. Incidentally, "RNA" stands for "ribonucleic acid", and it is v  
ery much like DNA except that all of its nucleotides possess that special o  
xygen atom in the phosphate group which DNA's nucleotides lack. Therefore t  
he "deoxy" prefix is dropped. Also, instead of thymine, RN A uses the· b  
ase uracil, so the information in strands of RNA can be represented by arbitrary sequences of the four letters 'A', 'C', 'G', 'U'. Now when mRNA i  
s transcribed off of DNA, the transcription process operates via the u  
sual base-pairing (except with U instead of T), so that a DNA-template and i  
ts mRNA-mate might look something like t  
his: DNA: ........ CGT AAATCAAGTCA ....... .  
mRNA: ........ GCAUUUAGUUCAGU ....... .  
(template  
) (  
"copy") RNA does not generally form long double strands with itself, although it   
can. Therefore it is prevalently found not in the helical form which s  
o characterizes DNA, but rather in long, somewhat randomly curvi  
ng stran

560

Once a strand of mRNA has escaped the nhcleus, it encounters t  
hose strange subcellular creatures called "ribosomes"-but before we go on t  
o explain how a ribosome uses mRNA, I want to make some comments a  
bout enzymes and proteins. Enzymes belong to the general category o  
f biomolecules called proteins, and the job of ribosomes is to make all pro

561

teins, not just enzymes. Proteins which are not enzymes are much m  
ore passive kinds of beings; many of them, for instance, are s  
tructural molecules, which means that they are like girders and beams and so forth i  
n buildings: they hold the cell's parts together. There are other kinds o  
f proteins, but for our purposes, the principal proteins are enzymes, and I  
will henceforth not make a sharp d

561

Amino A  
cid

561

Proteins are composed of sequences of amino acids, which come in twenty   
primary varieties, each with a thr ee-letter abbreviation:  
ala a  
lanine arg a  
rginine asn asparagm  
e asp aspartic a  
cid cys c  
ysteine gin g  
lutamine glu glutamic a  
cid gly g  
lycine his h  
istidine ile i  
soleucine leu l  
eucine lys l  
ysine met m  
ethionine phe p  
henylalanine pro p  
raline ser s  
enne thr t  
hreonine trp tryptop  
han tyr t  
yrosine val v  
aline Notice the slight numerical discrepancy with Typogenetics, where we h  
ad only fifteen "amino acids" composing enzymes. An amino acid is a s  
mall molecule of roughly the same complexity as a nucleotide; hence the building blocks of proteins and of nucleic acids (DNA, RNA) are roughly of t  
he same size. However, proteins are composed of much shorter sequences o  
f components: typically, about three hundred amino acids make a c  
omplete protein, whereas a strand of DNA can consist of hundreds of thousands o  
r millions of nucleotides.

561

Ribosomes and Tape Recorders

561

Now when a strand of mRNA, after its escape into the cytoplasm, encounters a ribosome, a very intricate and beautiful process called translation t  
akes place. It could be said that this process of translation is at the very heart o  

562

all of life, and there are many mysteries connected with it. But in essence i  
t is easy to describe. Let us first give a picturesque image, and then render i  
t more precise. Imagine the mRNA to be like a long piece of magneti  
c recording tape, and the ribosome to be like a tape recorder. As the tape   
passes through the playing head of the recorder, it is "read" and c  
onverted into music, or other sounds. Thus magnetic markings are "translated" into   
notes. Similarly, when a "tape" of mRNA passes through the "  
playing head" of a ribosome, the "notes" which are produced are amin:1 acids, a  
nd the "pieces of music" which they make up are proteins. This is what translation is all about; it is shown in Figure 9

562

The Genetic C  
od

562

But how can a ribosome produce a chain of amino acids when it i  
s reading a chain of nucleotides? This mystery was solved in the e  
arly l 960's by the efforts of a large number of people, and at the core o  
fthe answer lies the Genetic Code-a mapping from triplets of nuc  
leotidesinto amino acids (see Fig. 94). This is in spirit extremely similar t  
othe Typogenetic Code, except that here, three consecutive bases (  
ornuc leotides) form a c  
odon, whereas there, CUA GAU only two wer  
e needed. Thus Cu Ag Au there must b  
e 4X4X4 (equals 6 4)diffe  
rententries in the A t ypical segment of mRNA table, ins  
teadof sixteen. A read first as two triplets ribosome dic  
ks down a strand ( a bove), and second as t hreeof RN A t  
hree nucleotides at duplets ( below) : an example a time-wh  
ich is to say, one of hemiolia in biochemistry. codon at a t  
ime -and each time it does so, i  
t appends a single new amino acid to the protein it is presently manufacturing. Thus, a protein comes out of the ribosome amino acid by amino a

562

Tertiary Structure

562

However, as a protein emerges from a ribosome, it is not only g  
etting longer and longer, but it is also continually folding itself up into an extraordinary three-dimensional shape, very much in the way that t  
hose funny little Fourth-of-July fireworks called "snakes" simultaneously g  
row longer and curl up, when they are lit. This fancy shape is called t  
he protein's tertiary structure (Fig. 95), while the amino acid sequence per se is   
called the primary structure of the protein. The tertiary structure is i  
mplicit in the primary structure, just as in Typogenetics. However, the recipe f  
or deriving the tertiary structure, if you know only the primary structure, is b  
y far more complex than that given in Typogenetics. In fact, it is one of t  
he outstanding problems of contemporary molecular biology to figure o  
ut some rules by which the tertiary structure of a protein can be predicted i  
f only its primary structure is k

563

FIGURE 94. The Genetic Code, fry which each triplet in a strand of messenger RNA c  
odes for one of twenty amino acid1 ( or a punctuation m

563

Reductionistic Explanation of Protein Fun  
ctio

563

Another discrepancy between Typogenetics and true genetics-and this is   
probably the most serious one o fall--is this: whereas in Typogenetics, e  
ach component amino acid of an enzyme is responsible for some specific "pi  
ece of the action", in real enzymes, individual amino acids cannot be a  
ssigned such clear roles. It is the tertiary structure as a whole which determines t  
he mode in which an enzyme will function; there is no way one can say, "  
Th

564

amino acid's presence means that such-and-such an operation will g  
et performed". In other words, in real genetics, an individual amino a  
cid's contribution to the enzyme's overall function is not "context-free". However, this fact should not be construed in any way as ammunition for a  
n antireductionist argument to the effect that "the whole [enzyme] cannot b  
e explained as the sum of its parts". That would be wholly unjustified. W  
hat is justified is rejection of the simpler claim that "each amino acid contributes to the sum in a manner which is independent of the other amino a  
cids present". In other words, the function of a protein cannot be considered t  
o be built up from context-free functions of its parts; rather, one m  
ust consider how the parts interact. It is still possible in principle to write a  
computer program which takes as input the primary structure of a prote

564

FIGURE 95. The structure of myoglobin, deduced from high-resolution X-ray data. T  
he large-scale "twisted pipe" appearance is the tertiary structure; the finer helix i  
nside-the "alpha helix"�s the secondary structure. [From A. Lehninger, Biochemistry

565

and firstly determines its tertiary structure, and secondly determines t  
he function of the enzyme. This would he a completely reductio.nistic explanation of the workings of proteins, but the determination of the "sum" of t  
he parts would require a highly complex algorithm. The elucidation of t  
he function of an enzyme, given its primary, or even its tertiary, structure, i  
s another great problem of contemporary molecular b

565

Perhaps, in the last analysis, the function of the whole enzyme can b  
e considered to be built up from functions of parts in a context-free m  
anner, but where the parts are now considered to be individual particles, such a  
s electrons and protons, rather than "chunks", such as amino acids. T  
his exemplifies the "Reductionist's Dilemma": In order to explain e  
verything in terms of context-free sums, one has to go down to the level of physics; b  
ut then the number of particles is so huge as to make it only a t  
heoretical "in-principle" kind of thing. So, one has to settle for a context-  
dependent sum, which has two disadvantages. The first is that the parts are m  
uch larger units, whose behavior is describable only on a high level, and therefore indeterminately. The second is that the word "sum" carries the connotation that each part can be assigned a simple function and that t  
he function of the whole is just a context-free sum of those individual functions. This just cannot be done when one tries to explain a whole enzy  
me's function, given its amino acids as parts. But for better or for worse, this is a  
general phenomenon which arises in the explanations of complex s  
ystems. In order to acquire an intuitive and manageable understanding of h  
ow parts interact-in short, in order to proceed-one often has to sacrifice t  
he exactness yielded by a microscopic, context-free picture, simply because o  
f its unmanageability. But one does not sacrifice at that time the faith t  
hat such an explanation exists in p

565

Transfer RNA and Ribosom  
e

565

Returning, then, to ribosomes and R'.'JA and proteins, we have stated that a  
protein is manufactured by a ribosome according to the blueprint c  
arried from the DNA's "royal chambers" by its messenger, RNA. This seems t  
o imply that the ribosome can translate from the language of codons into t  
he language of amino acids, which amounts to saying that the r  
ibosome "knows" the Genetic Code. However, that amount of information is s  
imply not present in a ribosome. So how does it do it? Where is the Genetic C  
ode stored? The curious fact is that the Genetic Code is stored-where else?-in  
the DNA itself. This certainly calls for some e  
xplanatio

565

Let us back off from a total explanation for a moment, and give a  
partial explanation. There are, floating about in the cytoplasm at any g  
iven moment, large numbers of four-leaf-dover-shaped molecules; loosely fastened (i.e., hydrogen-bonded) to one leaf is an amino acid, and on t  
he opposite leaf there is a triplet of nucleotides called an anticodon. For o  
ur purposes, the other two leaves are irrelevant. Here is how these "  
clovers" are used by the ribosomes in their production of proteins. When a n  
e

566

FIGURE 96. A section of mRNA passing through a ribosome. Floating nearfry are t  
RNA molecules, carrying amino acids which are stripped off fry the ribosome and appended to t  
he growing protein. The Genetic Code is contained in the tRNA molecules, collectively. Note h  
ow the base-pairing (A-U, C-G) is represented fry interlocking letter-forms in the diagra  
m. [Drawing by Scott E. Kim.]

566

ribosome reaches out into the cytoplasm and latches onto a clover w  
hose anticodon is complementary to the mRNA codon. Then it pulls the c  
lover into such a position that it can rip off the clover's amino acid, and stick i  
t covalently onto the growing protein. (Incidentally, the bond between a  
n amino acid and its neighbor in a protein is a very strong covalent b  
ond, called a "peptide bond". For this reason, proteins are sometimes c  
alled "polypeptides".) Of course it is no accident that the "clovers" carry t  
he proper amino acids, for they have all been manufactured according t  
o precise instructions emanating from the "throne r

567

The real name for such a clover is transfer RNA. A molecule of tRNA i  
s quite small-about the size of a very small protein-and consists of a c  
hain of about eighty nucleotides. Like mRNA, tRNA molecules are made b  
y transcription off of the grand cellular template, DNA. However, tRNA's a  
re tiny by comparison with the huge mRNA molecules, which may c  
ontain thousands of nucleotides in long, long chains. Also, tRNA's resemble proteins (and are unlike strands of mRNA) in this respect: they have fi  
xed, well-defined tertiary structures-determined by their primary structure. A  
tRNA molecule's tertiary structure allows precisely one amino acid to b  
ind to its amino-acid site; to be sure, it is that one dictated according to t  
he Genetic Code by the anticodon on the opposite arm. A vivid image of t  
he function of tRNA molecules is as Aas hcards floating in a cloud around a  
simultaneous interpreter, who snaps one out of the air-invariably t  
he right one!-whenever he needs to translate a word. In this case, the interpreter is the ribosome, the words are codons, and their translations a  
re amino a

567

In order for the inner message of DNA to get decoded by the ribosomes, the tRNA flashcards must be floating about in the cytoplasm. I  
n some sense, the tRNA's contain the essence of the outer message of t  
he DNA, since they are the keys to the process of translation. But t  
hey themselves came from the DNA. Thus, the outer message is trying to b  
e part of the inner message, in a way reminiscent of the message-in-  
a-bottle which tells what language it is written in. Naturally, no such attempt can b  
e totally successful: there is no way for the DNA to hoist itself by its own  
bootstraps. Some amount of knowledge of the Genetic Code must a  
lready be present in the cell beforehand, to allow the manufacture of t  
hose enzymes which transcribe tRNA's themselves off of the master copy o  
f DNA. And this knowledge resides in previously manufactured t  
RNA molecules. This attempt to obviate the need for any outer message at all i  
s like the Escher dragon, who tries as hard as he can, within the context o  
f the two-dimensional world to which he is constrained, to be threedimensional. He seems to go a long way-but of course he never makes i  
t, despite the fine imitation he gives of t  
hree-dimensi

567

Punctuation and the Reading F  
ram

567

How does a ribosome know when a protein is done? Just as in Typogenetics, there is a signal inside the mRN A which indicates the termination o  
r initiation of a protein. In fact, three special codons-UAA, UAG, VGAact as punctuation marks instead of coding for amino acids. Whenever s  
uch a triplet clicks its way into the "reading head" of a ribosome, the r  
ibosome releases the protein under construction and begins a new o

567

Recently, the entire genome of the tiniest known virus, cpX 174, h  
as been laid bare. One most unexpected discovery was made en route: some   
of its nine genes overlap-that is, two distinct proteins are coded for by the same   
stretch of DNA! There is even one gene contained entirely inside a

568

This is accomplished by having the reading frames of the two genes shift  
ed relative to each other, by exactly one unit. The density of informationpacking in such a scheme is incredible. This is, of course, the i  
nspiration behind the strange "5/17 haiku" in Achilles' fortune cookie, in the Canon b  
y Intervallic Augmentatio

568

R  
eca

568

In brief, then, this picture emerges: from its central throne, DNA sends o  
ff long strands of messenger RNA to the ribosomes in the cytoplasm; and t  
he ribosomes, making use of the "flashcards" of tRNA hovering about t  
hem, efficiently construct proteins, amino acid by amino acid, according to t  
he blueprint contained in the mRNA. Only the primary structure of t  
he proteins is dictated by the DNA; but this is enough, for as they e  
merge from the ribosomes, the proteins "magically" fold up into complex conformations which then have the ability to act as powerful chemical machin  
e

568

Levels of Structure and Meaning in Proteins and M  
usi

568

We have been using this image of ribosome as tape recorder, mRNA a  
s tape, and protein as music. It may seem arbitrary, and yet there are s  
ome beautiful parallels. Music is not a mere linear sequence of notes. Our m  
inds perceive pieces of music on a level far higher than that. We chunk n  
otes into phrases, phrases into melodies, melodies into movements, and movements into full pieces. Similarly, proteins only make sense when they act a  
s chunked units. Although a primary structure carries all the information f  
or the tertiary structure to be created, it still "feels" like less, for its potential i  
s only realized when the tertiary structure is actually physically c  
reate

568

Incidentally, we have been referring only to primary and t  
ertiary structures, and you may well wonder whatever happened to the s  
econdary structure. Indeed, it exists, as does a quaternary structure, as well. T  
he folding-up of a protein occurs at more than one level. Specifically, at s  
ome points along the chain of amino acids, there may be a tendency to form a  
kind of helix, called the alpha helix (not to be confused with the DNA d  
ouble helix). This helical twisting of a protein is on a lower level than its t  
ertiary structure. This level of structure is visible in Figure 95. Quaternary structure can be directly compared with the building of a musical piece out o  
f independent movements, for it involves the assembly of several distinc  
t polypeptides, already in their full-blown tertiary beauty, into a l  
arger structure. The binding of these independent chains is usually acco  
mplished by hydrogen bonds, rather than covalent bonds; this is of course just as with  
pieces of music composed of several movements, which are far less t  
ightly bound to each other than they are internally, but which nevertheless form a  
tight "organic" w

568

The four levels of primary, secondary, tertiary, and quaternary structure can also be compared to the four levels of the MU-picture (Fig. 60) i  

569

FIGURE 97. A polyribosome. A s  
ingle strand of mRNA passes through one ribosome after another, like one tape p  
assing through several tape recorders in a row  
. The result is a set of growing proteins i  
n various stages of completion: the analo  
gue to a musical canon produced by t  
he staggered tape recorders. [From A  
.Lehning", Biochemistry.]

570

the Prelude, Ant Fugue. The global structure-consisting of the letters 'M'   
and 'U'-is its quaternary structure; then each of those two parts has a t  
ertiary structure, consisting of "HOLISM" or "REDUCTIONISM"; and then the  
opposite word exists on the secondary level, and at bottom, the prim  
ary structure is once again the word "MU", over and over agai  

570

Polyribosomes and Two-Tiered C  
anon

570

Now we come to another lovely parallel between tape recorders t  
ranslating tape into music and ribosomes translating mRNA into proteins. Imagine a  
collection of many tape recorders, arranged in a row, evenly spaced. We  
might call this array a "polyrecorder". Now imagine a single tape p  
assing serially through the playing heads of all the component recorders. If the  
tape contains a single long melody, then the output will be a many-voiced  
canon, of course, with the delay determined by the time it takes the tape t  
o get from one tape recorder to the next. In cells, such "molecular c  
anons" do indeed exist, where many ribosomes, spaced out in long lines-formi  
ng what is called a polyribosome-all "play" the same strand of mRNA, producing identical proteins, staggered in time (see Fig. 9

570

Not only this, but nature goes one better. Recall that mRNA is made b  
y transcription off of DNA; the enzymes which are responsible for t  
his process are called RNA polymerases ("-ase" is a general suffix for enzymes). I  
t happens often that a series of RNA polymerases will be at work in parallel  
on a single strand of DNA, with the result that many separate (but identical) strands of mRNA are being produced, each delayed with respect to the  
other by the time required for the DNA to slide from one RNA polymerase  
to the next. At the same time, there can be several different ribosomes  
working on each of the parallel emerging mRNA's. Thus one arrives at a  
double-decker, or two-tiered, "molecular canon" (Fig. 98). The corresponding image in music is a rather fanciful but amusing scenario: sever  
a

570

FIGURE 98. Here, an even more complex scheme. Not just one but several strands o  
f mRNA, all emerging by transcription from a single strand of DNA, are acted upon fry  
polyribosomes. The result is a two-tiered molecular canon. [From Hanawalt and Haynes, T  
he Chemical Basis of Life, p. 271

571

different copyists are all at work simultaneously, each one of them c  
opying the same original manuscript from a clef which flutists cannot read into a  
clef which they can read. As each copyist finishes a page of the o  
riginal manuscript, he passes it on to the next copyist, and starts transcribing a n  
ew page himself. Meanwhile, from each score emerging from the pens of t  
he copyists, a set of flutists are reading and tooting the melody, each f  
lutist delayed with respect to the others who are reading from the same s  
heet. This rather wild image gives, perhaps, an idea of some of the complexity o  
f the processes which are going on in each and every cell of your body d  
uring every second of every day .

571

Which Came First-The Ribosome or the Protein

571

We have been talking about these wonderful beasts called ribosomes; b  
ut what are they themselves composed of? How are they made? Ribosomes a  
re composed of two types of things: I 1) various kinds of proteins, and (  
2) another kind of RNA, called ribosomal RNA (rRNA). Thus, in order for a  
ribosome to be made, certain kinds of proteins must be present, and r  
RNA must be present. Of course, for proteins to be present, ribosomes must be   
there to make them. So how do you get around the vicious circle? W  
hich comes first-the ribosome or the protein? Which makes which? Of c  
ourse there is no answer because one always traces things back to p  
revious members of the same class-just as with the chicken-and-th  
e-egg question-until everything vanishes over the horizon of time. In any c  
ase, ribosomes are made of two pieces, a large and a small one, each of w  
hich contains some rRNA and some proteins. Ribosomes are about the size o  
f large proteins; they are much much smaller than the strands of m  
RNA which they take as input, and along which they m  
ov

571

Protein Funct  
io

571

We have spoken somewhat of the structure of proteins-specifically enzymes; but we have not really mentioned the kinds of tasks which they   
perform in the cell, nor how they do them. All enzymes are catalysts, w  
hich means that in a certain sense, they do no more than selectively a  
ccelerate various chemical processes in the cell, rather than make things h  
appen which without them never could happen. An enzyme realizes certain pathways out of the myriad myriad potentialities. Therefore, in choosing w  
hich enzymes shall be present, you choose what shall happen and what shall n  
ot happen-despite the fact that, theoretically speaking, there is a n  
onzero probability for any cellular process to happen spontaneously, without t  
he aid of catalys

571

Now how do enzymes act upon the molecules of the cell? As has b  
een mentioned, enzymes are folded-up polypeptide chains. In every enzyme  
, there is a cleft or pocket or some other clearly-defined surface f  
eature where the enzyme binds to some other kind of molecule. This location i  

572

called its active site, and any molecule which gets bound there is called a  
substrate. Enzymes may have more than one active site, and more than o  
ne substrate. Just as in Typogenetics, enzymes are indeed very choosy a  
bout what they will operate upon. The active site usually is quite specific, a  
nd allows just one kind of molecule to bind to it, although there are s  
ometimes "decoys"-other molecules which can fit in the active site and clog it up,   
fooling the enzyme and in fact rendering it i

572

Once an enzyme and its substrate are bound together, there is s  
ome disequilibrium of electric charge, and consequently charge-in the form o  
f electrons and protons-flows around the bound molecules and readjusts   
itself. By the time equilibrium has been reached, some rather p  
rofound chemical changes may have occurred to the substrate. Some examples are   
these: there may have been a "welding", in which some standard s  
mall molecule got tacked onto a nucleotide, amino acid, or other c  
ommon cellular molecule; a DNA strand may have been "nicked" at a p  
articular location; some piece of a molecule may have gotten lopped off; and s  
o forth. In fact, bio-enzymes do operations on molecules which are q  
uite similar to the typographical operations which Typo-enzymes p  
erform. However, most enzymes perform essentially only a single task, rather t  
han a sequence of tasks. There is one other striking difference between Typoenzymes and bio-enzymes, which is this: whereas Typo-enzymes o  
perate only on strands, bio-enzymes can act on DNA, RNA, other proteins, ribosomes, cell membranes-in short, on anything and everything in the cell. I  
n other words, enzymes are the universal mechanisms for getting things d  
one in the cell. There are enzymes which stick things together and take t  
hem apart and modify them and activate them and deactivate them and c  
opy them and repair them and destroy them .

572

Some of the most complex processes in the cell involve "cascades" i  
n which a single molecule of some type triggers the production of a c  
ertain kind of enzyme; the manufacturing process begins and the enzymes w  
hich come off the "assembly line" open up a new chemical pathway which a  
llows a second kind of enzyme to be produced. This kind of thing can go on f  
or three or four levels, each newly produced type of enzyme triggering t  
he production of another type. In the end a "shower" of copies of the fi  
nal type of enzyme is produced, and all of the copies go off and do t  
heir specialized thing, which may be to chop up some "foreign" DNA, or to h  
elp make some amino acid for which the cell is very "thirsty", or w  
hateve

572

Need for a Sufficiently Strong Support Syst  
e

572

Let us describe nature's solution to the puzzle posed for T  
ypogenetics: "What kind of strand of DNA can direct its own replication?" Certainly not   
every strand of DNA is inherently a self-rep. The key point is this: a  
ny strand which wishes to direct its own copying must contain directions f  
or assembling precisely those enzymes which can carry out the task. Now it is   
futile to hope that a strand of DNA in isolation could be a self-rep; for i  

573

order for those potential proteins to be pulled out of the DNA, there m  
ust not only be ribosomes, but also RNA polymerase, which makes the m  
RNA that gets transported to the ribosomes. And so we have to begin by assuming a kind of "minimal support system" just sufficiently strong that it a  
llows transcription and translation to be carried out. This minimal s  
upport system will thus consist in (1) some proteins, such as RNA p  
olymerase, which allow mRNA to be made from DNA, and (2) some r  
ibosome

573

How DNA Self-Replica  
te

573

It is not by any means coincidental that the phrases "sufficiently s  
trong support system" and "sufficiently powerful formal system" sound alik  
e. One is the precondition for a self-rep to arise, the other for a self-ref t  
o arise. In fact there is in essence only one phenomenon going on in two v  
ery different guises, and we shall explicitly map this out shortly. But before w  
e do so, let us finish the description of how a strand of DNA can be a s  
el

573

The DNA must contain the codes for a set of proteins which will c  
opy it. Now there is a very efficient and elegant way to copy a double-strande  
d piece of DNA, whose two strands are complementary. This involves t  
wo s  
teps: ( 1) unravel the two strands from each othe  
r; (2) "mate" a new strand to each of the two new single s  
trands. This process will create two new double strands of DNA, each identical t  
o the original one. Now if our solution is to be based on this idea, it m  
ust involve a set of proteins, coded for in the DNA itself, which will carry out   
these two s

573

It is believed that in cells, these two steps are performed together in a  
coordinated way, and that they require three principal enzymes: D  
NA endonuclease, DNA polymerase, and DNA ligase. The first is an "unzipping enzyme": it peels the two original strands apart for a short d  
istance, and then stops. Then the other two enzymes come into the picture. T  
he DNA polymerase is basically a copy-and-move enzyme: it chugs down t  
he short single strands of DNA, copying them complementarily in a fas  
hion reminiscent of the Copy mode in Typogenetics. In order to copy, it d  
raws on raw materials-specifically nucleotides-which are floating about in t  
he cytoplasm. Because the action proceeds in fits and starts, with some unzipping and some copying each time, some short gaps are created, and t  
he DNA ligase is what plugs them up. The process is repeated over and o  
ver again. This precision three-enzyme machine proceeds in careful fashion a  
ll the way down the length of the DNA molecule, until the whole thing h  
as been peeled apart and simultaneously replicated, so that there are now t  
wo copies of i

574

Comparison of DNA's Self-Rep Method with Q  
uinin

574

Note that in the enzymatic action on the DNA strands, the fact t  
hat information is stored in the DNA is just plain irrelevant; the enzymes are  
merely carrying out their symbol-shunting functions, just like rules o  
f inference in the MIU-system. It is of no interest to the three enzymes t  
hat at some point they are actually copying the very genes which coded f  
or them. The DNA, to them, is just a template without meaning or i  
nteres

574

It is quite interesting to compare this with the Quine sentence  
's method of describing how to construct a copy of itself. There, too, one h  
as a sort of "double strand"-two copies of the same information, where o  
ne copy acts as instructions, the other as template. In DNA, the process is   
vaguely parallel, since the three enzymes (DNA endonuclease, D  
NA polymerase, DNA ligase) are coded for in just one of the two strands, w  
hich therefore acts as program, while the other strand is merely a template. T  
he parallel is not perfect, for when the copying is carried out, both strands a  
re used as template, not just one. Nevertheless, the analogy is highly suggestive. There is a biochemical analogue to the use-mention dichotomy: w  
hen DNA is treated as a mere sequence of chemicals to be copied, it is l  
ike mention of typographical symbols; when DNA is dictating what o  
perations shall be carried out, it is like use of typographical s  
ymbol

574

Levels of Meaning of D  
N

574

There are several levels of meaning which can be read from a strand o  
f DNA, depending on how big the chunks are which you look at, and h  
ow powerful a decoder you use. On the lowest level, each DNA strand c  
odes for an equivalent RNA strand-the process of decoding being transcrip  
tion. If one chunks the DNA into triplets, then by using a "genetic decoder", o  
ne can read the DNA as a sequence of amino acids. This is translation (on top o  
f transcription). On the next natural level of the hierarchy, DNA is r  
eadable as a code for a set of proteins. The physical pulling-out of proteins f  
rom genes is called gene expression. Currently, this is the highest level at which we   
understand what DNA m  
ean

574

However, there are certain to be higher levels of DNA meaning w  
hich are harder to discern. For instance, there is every reason to believe that t  
he DNA of, say, a human being codes for such features as nose shape, m  
usic talent, quickness of reflexes, and so on. Could one, in principle, learn t  
o read off such pieces of information directly from a strand of DNA, w  
ithout going through the actual physical process of epigenesis-the phys  
ical pulling-out of phenotype from genotype? Presumably, yes, since-in  
theory-one could have an incredibly powerful computer p  
rogram simulating the entire process, including every cell, every protein, every t  
iny feature involved in the replication of DNA, of cells, to the bitter end. T  
he output of such apseudo-epigenesis program would be a high-level d  
escription of the phenotype

575

There is another (extremely faint) possibility: that we could learn t  
o read the phenotype off of the genotype without doing an isomorphic simulation of the physical process of epigenesis, but by finding some simpler  
sort of decoding mechanism. This could be called "shortcut pseudoepigenesis". Whether shortcut or not, pseudo-epigenesis is, of course, totally beyond reach at the present time-with one notable exception: in t  
he species Felis catus, deep probing has revealed that it is indeed possible t  
o read the phenotype directly off of the genotype. The reader will perh  
aps better appreciate this remarkable fact after directly examining the following typical section of the DNA of Felis c  
atus: ... CA TCATCATCA TCATCA TCA TCA TCA TCA T .

575

Below is shown a summary of the levels of DNA-readability, together  
with the names of the different levels of decoding. DNA can be read as a   
sequence of:   
(  
1) (  
2) (  
3) (4)  
(  
5) (  
6) ( N-1  
) (N  
) bases (nucleotides) . ....... ................ transcrip  
tion amino acids . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . trans  
lation prote�ns (pri�ary structure) } . ..... . ..... gene expression  
protems (tertiary structure  
) protein clusters .... • • . • . . • . higher levels of gene expressi  
on ?  
?? } . ................ unknown levels of DNA meanin  
g ?  
?? physical, mental, a  
nd psychological traits . ...... . ............ pseudo-epigen  
esi

575

The Central D  
ogma

575

th this background, now we are in a pos1t1on to draw an elabora  
te comparison between F. Crick's "Central Dogma of Molecular B  
iology" (.DOGMA I) upon which all cellular processes are based; and what I, wit  
h poetic license, call the "Central Dogma of Mathematical Logic" (  
.DOGMA II), upon which Godel's Theorem is based. The mapping from one o  
nto the other is laid out in Figure 99 and the following chart, which together  
constitute the Central D

575

FIGURE 99. The Central Dogmap. An analogy is established between two fun  
damental Tang/,ed Hierarchies: that of molecular biology and that of mathematical log

577

Note the base-pairing of A and T (Arithmetization and Translatio  
n), as well as of G and C (Godel and Crick). Mathematical logic gets the p  
urine side, and molecular biology gets the pyrimidine s  
id

577

To complete the esthetic side of this mapping, I chose to model m  
y Godel-numbering scheme on the Genetic Code absolutely faithfully. I  
n fact, under the following correspondence, the table of the Genetic C  
ode becomes the table of the Godel C  
ode: (odd) 1 ¢  
:� (even) 2 ¢  
:� (odd) 3 ¢  
:� (even) 6 ¢:�   
A  
C  
G  
u  
(  
purine) (pyr  
imidine) (  
purine) (pyr  
imidine) Each amino acid-of which there are twenty-corresponds to exactly o  
ne symbol of TNT-of which there are twenty. Thus, at last, my motive f  
or concocting "austere TNT" comes out-so that there would be exactly   
twenty symbols! The Godel Code is shown in Figure 100. Compare it w  
ith the Genetic Code (Fig. 9

577

There is something almost mystical in seeing the deep sharing of suc  
h an abstract structure by these two esoteric, yet fundamental, advances i  
n knowledge achieved in our century. This Central Dogmap is by no means a  
rigorous proof of identity of the two theories; but it clearly shows a profound kinship, which is worth deeper e

577

Strange Loops in the Central D  
ogma

577

One of the more interesting similarities between the two sides of the map i  
s the way in which "loops" of arbit rary complexity arise on the top level o  
f both: on the left, proteins which act on proteins which act on proteins a  
nd so on, ad infinitum; and on the right, statements about statements a  
bout statements of meta-TNT and so on, ad infinitum. These are like heterarchies, which we discussed in Chapter V, where a sufficiently c  
omplex substratum allows high-level Strange Loops to occur and to cycle a  
round, totally sealed off from lower levels. We will explore this idea in g  
reater detail in Chapter X

577

Incidentally, you may be wondering about this question: "What, according to the Central Dogmap, is Gc>del's Incompleteness Theorem i  
tself mapped onto?" This is a good question to think about before r  
eading a

577

The Central Dogmap and the Contracrostipun  
ctu

577

It turns out that the Central Dogmap is quite similar to the mapping t  
hat was laid out in Chapter IV between the Contracrostipunctus and God  
el's Theorem. One can therefore draw parallels between all three systems:

578

FIGURE JOO. The Godel Code. Under this Godel-numbering scheme, each TNT s  
ymbol gets one or more codons. The small ovals show how this table subsumes the earlier G  
ode/numbering table of Chapter I  

578

( 1) formal systems and s  
trings; ( 2)cells and strands of D  
NA;( 3)record players and r  
ecords.In the following chart, the mapping between systems 2 and 3 is e  
xplained careful  
l

579

The analogue of Godel's Theorem is seen to be a peculiar fact, proba-bly little useful to molecular biologists (to whom it is lik ely quite obviou  
s): It is always possible to design a strand of DNA which, if inj  
ected into a cell, would, upon being transcribed, cause such proteins t  
o be manufactured as would destroy the cell (or the DNA), and t  
hus result in the non-reproduction of that D  
NA. This conjures up a somewhat droll scenario, at least if taken in light of   
evolution: an invading species of virus enters a cell by some s  
urreptitiou

580

FIGURE I OI, The T4 bacterial virus is an assembly of protein components (a). The "  
head" is a protein membrane, shaped like a kind of prolate icosahedron with thirty face ts and fi  
lled with DNA. It is attached by a neck to a tail consisting of a hollow core surrounded lry a   
contractile sheath and based on a spiked end plate to which six fibers are attached. The spi  
kes and fibers affix the virus to a bacterial cell wall (b), The sheath contracts, driving the c  
ore through the wall, and viral DNA enters the cell. [From Hanawalt and Haynes, The C  
hemical Basis of Life, p, 2 30.]

580

means, and then carefully ensures the manufacture of proteins which w  
ill have the effect of destroying the virus itself! It is a sort of suicid  
e-or Epimenides sentence, if you will-on the molecular level. Obviously i  
t would not prove advantageous from the point of view of survival of t  
he species. However, it demonstrates the spirit, if not the letter, of the   
mechanisms of protection and subversion which cells and their inva  
ders have developed.

580

E. Coli vs. T 4

580

Let us consider the biologists' favorite cell, that of the bacterium E  
scherichia coli (no relation to M. C. Escher), and one of their favorite invaders of t  
hat cell: the sinister and eerie T4 phage, pictures of which you can see in F  
igure 101. (Incidentally, the words "phage" and "virus" are synonymous a  
nd mean "attacker of bacterial cells".) The weird tidbit looks like a little like a  
cross between a LEM (Lunar Excursion Module) and a mosquito-and it is   
much more sinister than the latter. It has a "head" wherein is stored all its   
"knowledge"-namely its DNA; and it has six "legs" wherewith to fa  
sten itself to the cell it has chosen to invade; and it has a "stinging tube" (  
more properly called its "tail") like a mosquito. The major difference is t  
hat unlike a mosquito, which uses its stinger for sucking blood, the T4 p  
hage uses its stinger for injecting its hereditary substance into the cell against the   
will of its victim. Thus the phage commits "rape" on a tiny s  
cal

581

FIGURE 102. Viral infection begins when ,1iral DNA enters a bacterium. Bacterial DNA i  
s disrupted and viral DNA replicated. Synthesis of viral structural proteins and their assembly  
into virus continues until the cell bursts, rl'leasmg particles. [From Hanawalt and Haynes, T  
he Chemical Basis of Life, p. 2 30.]

581

A Molecular Trojan Hors  

581

What actually happens when the viral DNA enters a cell? The v  
irus "hopes", to speak anthropomorphically, that its DNA will get exactly t  
he same treatment as the DNA of the host cell. This would mean g  
etting transcribed and translated, th us allowing it to direct the synthesis of its own  
special proteins, alien to the host cell, which will then begin to do their  
thing. This amounts to secretly transporting alien proteins "in code" (viz.,  
the Genetic Code) into the cell, and then "decoding" (viz., producing)  
them. In a way this resembles the story of the Trojan horse, according t  
o which hundreds of soldiers were sneaked into Troy inside a harmlessseeming giant wooden horse; but o nce inside the city, they broke loose a  
nd captured it. The alien proteins, once they have been "decoded" (synthesized) from their carrier DNA, now jump into action. The sequence o  
f actions directed by the T4 phage has been carefully studied, and is more o  
r less as follows (see also Figs. 102 and 103  
): 5  
38 Time e  
lapsed 0 m  
in. 1 mi  
n. 5 m  
in. 8 m  
in. Action taking p  
lace Injection of viral D NA.  
Breakdown of host DNA. Cessation of production of native proteins and initiation of production of alien (T 4) proteins. Among the e  
arliest produced proteins are those which direct t  
he replication of the alien (T4) DNA  
. Replication of viral DNA b  
egins. Initiation of production of structural p  
roteins which will form the "bodies" of new p  
hage

582

FIGURE 103. The morphogenetic pathway of the T4 virus has three princip  
al branches leading independently to the formation of heads, tails, and tail fibers, w  
hich then combine to form complete virus particles. [From Hanawalt and Haynes, T  
he Chemical Basis of Life, p. 237.]

583

First complete replica of T4 invader is produc  
ed. Lysozyme (a protein) attacks host cell w  
all, breaking open the bacterium, and the "bicentu plets" emerge.  
Thus, when a T4 phage invades an E. coli cell, after the brief span of a  
bout twenty-four or twenty-five minutes, the cell has been completely s  
ubverted, and breaks open. Out pop about two hundred exact copies of the o  
riginal virus-"bicentuplets"-ready to go attack more bacterial cells, the o  
riginal cell having been largely consumed in the process

583

Although from a bacterium's point of view this kind of thing is a  
deadly serious menace, from our large-scale vantage point it can be l  
ooked upon as an amusing game between two players: the invader, or "T" p  
layer (named after the T-even class of phages, including the T2, T4, and o  
thers), and the "C" player (standing for "Cell"). The objective of the T player is t  
o invade and take over the cell of the C player from within, for the purpo  
se of reproducing itself. The objective of the C player is to protect itself a  
nd destroy the invader. When described this way, the molecular TC-game c  
an be seen to be quite parallel to the macroscopic TC-game described in t  
he preceding Dialogue. (The reader can doubtless figure out which player-  
T or C--corresponds to the Tortoise, and which to the C  
ra

583

Recognition, Disguises, La  
belin

583

This "game" emphasizes the fact that recognition is one of the central t  
hemes of cellular and subcellular biology. How do molecules (or h  
igher-level structures) recognize each other? It is essential for the functioning o  
f enzymes that they should be able to latch onto special "binding sites" o  
n their substrates; it is essential that a bacterium should be able to d  
istinguish its own DNA from that of phages; it is essential that two cells should be a  
ble to recognize each other and interact in a controlled way. Such rec  
ognition problems may remind you of the original, key problem about fo  
rmal systems: How can you tell if a string has, or does not have, some p  
roperty such as theoremhood? Is there a decision procedure? This kind of q  
uestion is not restricted to mathematical logic: it permeates computer science a  
nd, as we are seeing, molecular b

583

The labeling technique described in the Dialogue is in fact one of E  
. coli's tricks for outwitting its phage invaders. The idea is that strands o  
f DNA can be chemically labeled by tacking on a small molecule-  
methyl-to various nucleotides. Now this labeling operation does not change the u  
sual biological properties of the DNA; in other words, methylated (la  
beled) DNA can be transcribed just as well as unmethylated (unlabeled) DNA, a  
nd so it can direct the synthesis of proteins. But if the host cell has some s  
pecia

584

mechanisms for examining whether DNA is labeled or not, then the label  
may make all the difference in the world. In particular, the host cell m  
ay have an enzyme system -which looks for unlabeled DNA, and destroys a  
ny that it finds by unmercifully chopping it to pieces. In that case, woe to a  
ll unlabeled inva  
der

584

The methyl labels on the nucleotides have been compared to serifs o  
n letters. Thus, using this metaphor, we could say that the E. coli cell i  
s looking for DNA written in its "home script", with its own p  
articular typeface-and will chop up any strand of DNA written in an "  
alien" typeface. One counterstrategy, of course, is for phages to learn to label  
themselves, and thereby become able to fool the cells which they a  
re invading into reproducing t

584

This TC-battle can continue to arbitrary levels of complexity, but w  
e shall not pursue it further. The essential fact is that it is a battle between a  
host which is trying to reject all invading DNA, and a phage which is tryin  
g to infiltrate its DNA into some host which will transcribe it into m  
RNA (after which its reproduction is guaranteed). Any phage DNA which succeeds in getting itself reproduced this way can be thought of as having t  
his high-level interpretation: "I Can Be Reproduced in'Cells of Type X". This  
is to be distinguished from the evolutionarily pointless kind of p  
hage mentioned earlier, which codes for proteins that destroy it, and w  
hose high-level interpretation is the self-defeating sentence: "I Cannot Be Reproduced in Cells of Type X

584

Henkin Sentences and Vi  
ruse

584

Now both of these contrasting types of self-reference in molecular b  
iology have their counterparts in mathematical logic. We have already d  
iscussed the analogue of the self-defeating phages-namely, strings of the G  
odel type, which assert their own unproducibility within specific formal s  
ystems. But one can also make a counterpart sentence to a real phage: the p  
hage asserts its own producibility in a specific cell, and the sentence asserts its   
own producibility in a specific formal system. Sentences of this type a  
re called Henkin sentences, after the mathematical logician Leon Henkin. T  
hey can be constructed exactly along the lines of Godel sentences, the o  
nly difference being the omission of a negation. One begins with an "uncle", o  
f c  
ourse: 3a:3a':<TNT-PROOF-PA1R{a,a'}AAR1THMOQU1NE{a'',  
a'}> and then proceeds by the standard trick. Say the Godel number of t  
he above "uncle" is h. Now by arithmoquining this very uncle, you get a  
Henkin sente  
nce: 3a:3a':<TNT-PROOF-PA1R{a,a'}AAR1THMOQU1NE{SSS ... SSS0/a",  
a'}> ---------h S's

585

(By the way, can you spot how this sentence differs from ~G?) The reason I   
show it explicitly is to point out that a Henkin sentence does not give a f  
ull recipe for its own derivation; it just asserts that there exists one. You m  
ight well wonder whether its claim is justified. Do Henkin sentences i  
ndeed possess derivations? Are they, as thev claim, theorems? It is useful to r  
ecall that one need not believe a politician who says, "I am honest"-he may b  
e honest, and yet he may not be. Are Henkin sentences any more t  
rustworthy than politicians? Or do Henkin sentences, like politicians, lie in c  
ast-iron s  
inks? It turns out that these Henkin sentences are invariably truth tell  
ers.Why this is so is not obvious; but we will accept this curious fact w  
ithout p

585

Implicit vs. Explicit Henkin Sen  
tence

585

I mentioned that a Henkin sentence tells nothing about its own deriv  
ation; it just asserts that one exists. Now it is possible to invent a variation on t  
he theme of Henkin sentences-namely sentences which explicitly describe t  
heir own derivations. Such a sentence's high-level interpretation would not b  
e "Some Sequence of Strings Exists Which is a Derivation of Me", but r  
ather, "The Herein-described Sequence of Strings ..... Is a Derivation of M  
e". Let us call the first type of sentence an implicit Henkin sentence. The n  
ew sentences will be called explicit Henkin sentences, since they explicitly describe their own derivations. Note that, unlike their implicit b  
rethren, explicit Henkin sentences need not be theorems. In fact, it is quite easy to wri  
te a string which asserts that its own derivation consists of the single s  
tring 0=0-a false statement, since 0=0 is not a derivation of anything. However, it is also possible to write an explicit Henkin sentence which is a  
theorem-that is, a sentence which in fact gives a recipe for its own derivation.

585

Henkin Sentences and Self-Assembly

585

The reason I bring up this distinction between explicit and implicit H  
enkin sentences is that it corresponds very nicely to a significant d  
istinction between types of virus. There are certain viruses, such as the so-ca  
lled "tobacco mosaic virus", which are called self-assembling viruses; and t  
hen there are others, such as our favorite T-evens, which are non-self-assemb  
ling.Now what is this distinction? It is a direct analogue to the d  
istinctionbetween implicit and explicit Henkin s

585

The DNA of a self-assembling ,irus codes only for the parts of a n  
ew virus, but not for any enzymes. Once the parts are produced, the s  
neaky virus relies upon them to link up to each other without help from a  
ny enzymes. Such a process depends on chemical affinities which the p  
arts have for each other, when swimming in the rich chemical brew of a c  
ell. Not only viruses, but also some organelles-such as ribosomes-a  
ssembl

586

themselves. Sometimes, enzymes may be needed-but in such cases, t  
hey are recruited from the host cell, and enslaved. This is what is meant b  
y self-assembly.

586

By contrast, the DNA of more complex viruses, such as the T  
-evens, codes not only for the parts, but in addition for various enzymes which p  
lay special roles in the assembly of the parts into wholes. Since the a  
ssembly process is not spontaneous but requires "machines", such viruses are n  
ot considered to be self-assembling. The essence of the distinction, t  
hen, between self-assembling units and non-self-assembling units is that t  
he former get away with self-reproduction without telling the cell a  
nything about their construction, while the latter need to give instructions as to h  
ow to assemble t  
hemselve

586

Now the parallel to Henkin sentences, implicit and explicit, ought to b  
e quite clear. Implicit Henkin sentences are self-proving but do not t  
ell anything at all about their proofs-they are analogous to self-  
assembling viruses; explicit Henkin sentences direct the construction of their o  
wn proofs-they are analogous to more complex viruses which direct t  
heir host cells in putting copies of themselves toget  
he

586

The concept of self-assembling biological structures as complex a  
s viruses raises the possibility of complex self-assembling machines as well.   
Imagine a set of parts which, when placed in the proper suppo  
rting environment, spontaneously group themselves in such a way as to form a  
complex machine. It seems unlikely, yet this is quite an accurate way t  
o describe the process of the tobacco mosaic virus' method of selfreproduction via self-assembly. The information for the total c  
onformation of the organism (or machine) is spread about in its parts; it is not concentrated in some single p  
lac

586

Now this concept can lead in some strange directions, as was shown i  
n the Edifying Thoughts of a Tobacco Smoker. There, we saw how the Crab u  
sed the idea that information for self-assembly can be distributed around,   
instead of being concentrated in a single place. His hope was that t  
his would prevent his new phonographs from succumbing to the Tortoise's   
phonograph-crashing method. Unfortunatel y,just as with the most sophisticated axiom schemata, once the system is all built and packaged into a  
box, its well-definedness renders it vulnerable to a sufficiently c  
lever "Godelizer"; and that was the sad tale related by the Crab. Despite i  
ts apparent absurdity, the fantastic scenario of that Dialogue is not so fa  
r from reality, in the strange, surreal world of the c  
el

586

Two Outstanding P  
roblems: Differentiation and M  
orphogenesi

586

Now self-assembly may be the trick whereby certain subunits of cells a  
re constructed, and certain viruses-but what of the most complex macroscopic structures, such as the body of an elephant or a spider, or the s  
hape of a Venus's-flytrap? How are homing instincts built into the brain of a

587

bird, or hunting instincts into the brain of a dog? In short, how is it t  
hat merely by dictating which proteins are to be produced in cells, DNA exercises such spectacularly precise control over the exact structure and function of macroscopic living objects? There are two major distinct p  
roblems here. One is that of cellular differentiation: how do different cells, s  
haring exactly the same DNA, perform different roles-such as a kidney cell, a  
bone marrow cell, and a brain cell? The other is that of morphogenesis (  
"birth of form"): how does intercellular communication on a local level give rise t  
o large-scale, global structures and organizations-such as the various o  
rgans of the body, the shape of the face, the suborgans of the brain, and so o  
n? Although both cellular differentiation and morphogenesis are poorly understood at present, the trick appears to reside in exquisitely fine-tune  
d feedback and "feedforward" mechanisms within cells and between cells,  
which tell a cell when to "turn on" and when to "turn off" production o  
f various proteins.

587

Feedback and Feedfo  
rwar

587

Feedback takes place when there is too much or too little of some desir  
ed substance in the cell; then the cell must somehow regulate the p  
roduction line which is assembling that substance. Feedforward also involves t  
he regulation of an assembly line, but not according to the amount of e  
nd product present; rather, according to the amount of some precursor of t  
he end product of that assembly line. There are two major devices for a  
chiev� ing negative feedforward or feedback. One way is to prevent the relevant  
enzymes from being able to perform--that is, to "clog up" their active sites.  
This is called inhi bition. The other way is to prevent the relevant e  
nzymes from ever being manufactured! This is called repression. Conceptually  
, inhibition is simple: you just block up the active site of the first enzyme i  
n the assembly line, and the whole process of synthesis gets stopped dead.

587

Repressors and Induc  
er

587

Repression is trickier. How does a cell stop a gene from being e  
xpressed? The answer is, it prevents it from ever getting transcribed. This means that   
it has to prevent RNA polymerase from doing its job. This can be accomplishec\ by placing a huge obstacle in its path, along the DNA, p  
recisely in front of that gene which the cell wants not to get transcribed. S  
uch obstacles do exist, and are called repressors. They are themselves proteins,   
and they bind to special obstacle-holding sites on the DNA, called (I am not   
sure why) operators. An operator therefore is a site of control for the g  
ene (or genes) which immediately follow it; those genes are called its oper  
on. Because a series of enzymes often act in concert in carrying out a l  
ong chemical transformation, they are often coded for in sequence; and this i  
s why operons often contain several genes, rather than just one. The e  
ffect of the successful repression of an operon is that a whole series of genes i  

588

prevented from being transcribed, which means that a whole set of r  
elated enzymes remains unsynthe  
size

588

What about positive feedback and feedforward? Here again, there a  
re two options: ( 1) unclog the clogged enzymes, or (2) stop the repression o  
f the relevant operon. (Notice how nature seems to love d  
ouble-negations! Probably there is some very deep reason for this.) The mechanism by whi  
ch repression is repressed involves a class of molecules called inducers. T  
he role of an inducer is simple: it combines with a repressor protein before t  
he latter has had a chance to bind to an operator on a DNA molecule; t  
he resulting "repressor-inducer complex" is incapable of binding to a  
n operator, and this leaves the door open for the associated operon to b  
e transcribed into mRNA and subsequently translated into protein. Oft  
en the end product or some precursor of the end product can act as a  
n i  
nduce

588

Feedback and Strange Loops Comp  
are

588

Incidentally, this is a good time to distinguish between simple kinds o  
f feedback, as in the processes of inhibition and repression, and t  
he looping-back between different informational levels, shown in the Centra  
l Dogmap. Both are "feedback" in some sense; but the latter is much d  
eeper than the former. When an amino acid, such as tryptophan or i  
soleucine, acts as feedback (in the form of an inducer) by binding to its repressor s  
o that more of it gets made, it is not telling how to construct itself; it is j  
ust telling enzymes to make more of it. This could be compared to a r  
adio's volume, which, when fed through a listener's ears, may cause itself to b  
e turned down or up. This is another thing entirely from the case in w  
hich the broadcast itself tells you explicitly to turn your radio on or off, or t  
o tune to another wavelength-or even how to build another radio! T  
he latter is much more like the looping-back between informational levels, f  
or here, information inside the radio signal gets "decoded" and translated i  
nto mental structures. The radio signal is composed of symbolic c  
onstituents whose symbolic meaning matters-a case of use, rather than mention. O  
n the other hand, when the sound is just too loud, the symbols are n  
ot conveying meaning; they are merely being perceived as loud sounds, a  
nd might as well be devoid of meaning-a case of mention, rather than u  
se. This case more resembles the feedback loops by which proteins r  
egulate their own rates of synt

588

It has been theorized that the difference between two neighl:ioring c  
ells which share the exact same genotype and yet have different functions i  
s that different segments of their genome have been repressed, and therefore they have different working sets of proteins. A hypopothesis like t  
his could account for the phenomenal differences between cells in differ  
ent organs of the body of a human b

589

Two Simple Examples of Differentiati  
o

589

The process by which one initial cell replicates over and over, giving rise t  
o a myriad of differentiated cells with specialized functions, can be likened t  
o the spread of a chain letter from person to person, in which each n  
ew participant is asked to propagate the message faithfully, but also to add   
some extra personal touch. Eventually, there will be letters which are  
tremendously different from each o  
the

589

Another illustration of the ideas of differentiation is provided by t  
his extremely simple computer analogue of a differentiating self-rep. C  
onsider a very short program which is controlled by an up-down switch, and whi  
ch has an internal parameter N-a natural number. This program can run i  
n two modes-the up-mode, and the down-mode. When it runs in the upmode, it self-replicates into an adjacent part of the computer's memoryexcept it makes the internal parameter N of its "daughter" one greater   
than in itself. When it runs in the down-mode, it does not self-rep, b  
ut instead calculates the n  
umber ( -l)N/( 2N + 1  
)and adds it to a running t

589

Well, suppose that at the beginning, there is one copy of the p  
rogram in memory, N = 0, and the mode is up. Then the program will copy i  
tself next door in memory, with N = 1. Repeating the process, the new program will self-rep next door to itself, with a copy having N = 2. And o  
ver and over again ... What happens is that a very large program is growing  
inside memory. When memory is full, the process quits. Now all of m  
emory can be looked upon as being filled with one big program, composed o  
f many similar, but differentiated, modules-or "cells". Now suppose w  
e switch the mode to down, and run this big program. What happens? T  
he first "cell" runs, and calculates 1 /1. The second "cell" runs, c  
alculating -1/ 3, and adding it to the previous result. The third "cell" runs, c  
alculating+ 1/5 and adding it on ... The end result is that the whole "organism"-  
thebig program-calculates the s  
um1 -1/3 +1/5 -1/7 +1/9 -· 1 /11 +1/13 -1/15 +  
to a large number of terms (as many terms as· "cells" can fit inside memory).  
And since this series converges (albeit slowly) to 'TT'/4, we have a "phenoty  
pe" whose function is to calculate the value of a famous mathematical constant

589

Level Mixing in the C  
el

589

I hope that the descriptions of processes such as labeling, self-a  
ssembly, differentiation, morphogenesis, as well as transcription and tra  
nslation, have helped to convey some notion of the immensely complex s  
ystem which is a cell-an information-processing system with some s  
trikingl

590

novel features. We have seen, in the Central Dogmap, that although we c  
an try to draw a clear line between program and data, the distinction i  
s somewhat arbitrary. Carrying this line of thought further, we find that not   
only are program and data intricately woven together, but also the interp  
reter of programs, the physical processor, and even the language are included i  
n this intimate fusion. Therefore, although it is possible (to some extent) t  
o draw boundaries and separate out the levels, it is just as import  
ant-and just as fascinating-to recognize the level-crossings and mixings. Illustrative of this is the amazing fact that in biological systems, all the v  
arious features necessary for self-rep (viz., language, program, data, i  
nterpreter, and processor) cooperate to such a degree that all of them are replicated   
simultaneously-which shows how much deeper is biological self-rep'ing   
than anything yet devised along those lines by humans. For instance, t  
he self-rep program exhibited at the beginning of this Chapter takes f  
or granted the pre-existence of three external aspects: a language, an interpr'eter, and a processor, and does not replicate t

590

Let us try to summarize various ways in which the subunits of a cell c  
an be classified in computer science terms. First, let us take DNA. Since D  
NA contains all the information for construction of protein&, which are the   
active agents of the cell, DNA can be viewed as a program written in a  
higher-level language, which is subsequently translated (or i  
nterpreted) into the "machine language" of the cell (proteins). On the other hand, DNA   
is itself a passive molecule which undergoes manipulation at the hands o  
f various kinds of enzymes; in this sense, a DNA molecule is exactly like a  
long piece of data, as well. Thirdly, DNA contains the templates off o  
f which the tRNA "flashcards" are rubbed, which means that DNA a  
lso contains the definition of its own higher-level l  
anguag

590

Let us move on to proteins. Proteins are active molecules, and c  
arry oui all the functions of the cell; therefore it is quite appropriate to think o  
f them as programs in the "machine language" of the cell (the cell itself b  
eing the processor). On the other hand, since proteins are hardware and m  
ost programs are software, perhaps it is better to think of the proteins a  
s processors. Thirdly, proteins are often acted upon by other proteins, w  
hich means that proteins are often data. Finally, one can view proteins as interp reters; this involves viewing DNA as a collection of high-level l  
anguage programs, in which case enzymes are merely carrying out the p  
rograms written in the DNA code, which is to say, the proteins are acting a  
s i

590

Then there are ribosomes and tRNA molecules. They mediate t  
he translation from DNA to proteins, which can be compared to the translation of a program from a high-level language to a machine language; i  
n other words, the ribosomes are functioning as interpreters and the tRNA   
molecules provide the definition of the higher-level language. But an alternative view of translation has it that the ribosomes are processors, while the   
tRNA's are interpreters.

590

We have barely scratched the surface in this analysis of i  
nterrelations between all these biomolecules. What we have seen is that nature feels q  
uit

591

comfortable in mixing levels which we tend to see as quite distinct. Actually  
, in computer science there is already a visible tendency to mix all t  
hese seemingly distinct aspects of an information-processing system. This i  
s particularly so in Artificial Intelligence research, which is usually at t  
he forefront of computer language d

591

The Origin of L  
if

591

A natural and fundamental question to ask, on learning of these i  
ncredibly intricately interlocking pieces of software and hardware is: "How did t  
hey ever get started in the first place?'' It is truly a baffling thing. One has t  
o imagine some sort of a bootstrap process occurring, somewhat like t  
hat which is used in the development of new computer languages-but a  
bootstrap from simple molecules to entire cells is almost beyond o  
ne's power to imagine. There are various theories on the origin of life. They a  
ll run aground on this most central of all central questions: "How did t  
he Genetic Code, along with the mechanisms for its translation (ribosomes a  
nd tRNA molecules), originate?" For the moment, we will have to c  
ontent ourselves with a sense of wonder and awe, rather than with an answer. And  
perhaps experiencing that sense of wonder and awe is more satisfying t  
han having an answer-at least for a w  
hil

602

C HAPTER X VII  
Church, Turing, Tarski,   
and Others

602

Formal and Informal S  
ystem

602

WE HAVE COME to the point where we can develop one of the main theses   
of this book: that every aspect of thinking can be viewed as a h  
igh-level description of a system which, on a low level, is governed by simple, e  
ven formal, rules. The "system", of course, is a brain-unless one is speaking o  
f thought processes flowing in another medium, such as a computer's circuits. The image is that of a formal system underlying an "  
informal system"-a system which can, for instance, make puns, discover n  
umber patterns, forget names, make awful blunders in chess, and so forth. This i  
s what one sees from the outside: its informal, overt, software level. B  
y contrast, it has a formal, hidden, hardware level (or "substrate") which is a  
formidably complex mechanism that makes transitions from state to s  
tate according to definite rules physically embodied in it, and according to t  
he input of signals which impinge on i

602

A vision of the brain such as this has many philosophical and other   
consequences, needless to say. I shall try to spell some of them out in t  
his Chapter. Among other things, this vision seems to imply that, at b  
ottom, the brain is some sort of a "mathematical" object. Actually, that is at best a  
very awkward way to look at the brain. The reason is that, even if a brain i  
s, in a technical and abstract sense, some sort of formal system, it remains t  
rue that mathematicians only work with simple and elegant systems, systems in   
which everything is extremely clearly defined-and the brain is a far c  
ry from that, with its ten billion or more semi-independent neurons, quasirandomly connected up to each other. So mathematicians would n  
ever study a real brain's networks. And if you define "mathematics" as w  
hat mathematicians enjoy doing, then the properties of brains are not mathem

602

The only way to understand such a complex system as a brain is b  
y chunking it on higher and higher levels, and thereby losing some p  
recision at each step. What emerges at the top level is the "informal system" w  
hich obeys so many rules of such complexity that we do not yet have t  
he vocabulary to think about it. And that is what Artificial Intelligence research is hoping to find. It has quite a different flavor from mathema  
tics research. Nevertheless, there is a loose connection to mathematics: A  
I people often come from a strong mathematics background, a  
n

603

mathematicians sometimes are intrigued by the workings of their own  
brains. The following passage, quoted from Stanislaw Ulam's autobiographical Adventures of a Mathematician, illustrates this p  
oint: It seems to me that more could be done to elicit ... the nature of a  
ssociations, with computers providing the means for experimentation. Such a s  
tudy would have to involve a gradation of notions, of symbols, of classes of symbo  
ls, of classes of classes, and so on, in the same way that the complexity of   
mathematical or physical structures is i  
nvestigated. There must be a trick to the train of thought, a recursive formula. A g  
roup of neurons starts working automatica lly, sometimes without external i  
mpulse. It is a kind of iterative process with a growing pattern. It wanders about in t  
he brain, and the way it happens must depend on the memory of similar patterns .'

603

Intuition and the Magnificent C  
ra

603

Artificial Intelligence is often referred to as "Al". Often, when I try to   
explain what is meant by the term, I say that the letters "Al" could just a  
s well stand for "Artificial Intuition'', or even "Artificial Imagery". The a  
im of Al is to get at what is happening when one's mind silently and i  
nvisibly chooses, from a myriad alternatives, which one makes most sense in a v  
ery complex situation. In many real-life situations, deductive reasoning is inappropriate, not because it would give wrong answers, but because there a  
re too many correct but irrelevant statements which can be made; there are j  
ust too many things to take into account simultaneously for reasoning alone t  
o be sufficient. Consider this mini-d  
ialogue: "The other day I read in the paper that the  
-" "Oh-you were reading? It follows that you have eyes. Or at l  
east one eye. Or rather, that you had at least one eye t hen."  
A sense of judgment-"What is important here, and what is not?"-is c  
alled for. Tied up with this is a sense of simplicity, a sense of beauty. Where d  
o these intuitions come from? How can they emerge from an u  
nderlying formal s

603

In the Magnificrab, some unusual powers of the Crab's mind are revealed. His own version of his powers is merely that he listens to music a  
nd distinguishes the beautiful from the non-beautiful. (Apparently for him the  
re is a sharp dividing line.) Now Achilles finds another way to describe t  
he Crab's abilities: the Crab divides statements of number theory into t  
he categories true and false. But the Crab maintains that, if he chances to do s  
o, it is only by the purest accident, for he is, by his own admission, incompetent in mathematics. What makes the Crab's performance all the m  
ore mystifying to Achilles, however, is that it seems to be in direct violation of a  
celebrated result of metamathematics with which Achilles is famili  
ar: CHURCH'S THEOREM: There is no infallible method for telling theorems o  
f TNT from n

604

It was proven in 1936 by the American logician Alonzo Church. C  
losely related is what I call t  
he TARSKI-CHURCH-TURING THEOREM: There is no infallible method fo  
r telling true from false statements of number t

604

The Church-Turing T  
hesi

604

To understand Church's Theorem and the Tarski-Church-Turing Theorem better, we should first describe one of the ideas on which they a  
re based; and that is the Church-Turing Thesis (often called "Church's Thesis"  
). For the Church-Turing Thesis is certainly one of the most i  
mportant concepts in the philosophy of mathematics, brains, and t  
hinkin

604

Actually, like tea, the Church-Turing Thesis can be given in a v  
ariety of different strengths. So I will present it in various versions, and we w  
ill consider what they i  
mply. The first version sounds very innocent-in fact almost pointless  
: CHURCH-TURING THESIS, TAUTOLOGICAL VERSION: Mathematics p  
roblems can be solved only by doing m  
athematics. Of course, its meaning resides in the meaning of its constituent terms. B  
y "mathematics problem" I mean the problem of deciding whether s  
ome number possesses or does not possess a given arithmetical property. I  
t turns out that by means of Godel-numbering and related coding t  
ricks, almost any problem in any branch of mathematics can be put into t  
his form, so that "mathematics problem" retains its ordinary meaning. W  
hat about "doing mathematics"? When one tries to ascertain whether a n  
umber has a property, there seem to be only a small number of operations w  
hich one uses in combination over and over again-addition, m  
ultiplication, checking for equality or inequality. That is, loops composed of such operations seem to be the only tool we have that allows us to probe the world o  
f numbers. Note the word "seem". This is the critical word which t  
he Church-Turing Thesis is about. We can give a revision  
: CHURCH-TURING THESIS, STANDARD VERSION: Suppose there is a m  
ethod which a sentient being follows in order to sort numbers into t  
wo classes. Suppose further that this method always yields an a  
nswer within a finite amount of time, and that it always gives the saHle a  
nswer for a given number. Then: Some terminating FlooP program (i.e., s  
ome general recursive function) exists which gives exactly the same a  
nswers as the sentient being's method d  
oes. The central hypothesis, to make it very clear, is that any mental p  
rocess which divides numbers into two sorts can be described in the form of a  
FlooP program. The intuitive belief is that there are no other tools t  
han those in FlooP, and that there are no ways to use those tools other than b  

605

unlimited iterations (which FlooP allows). The Church-Turing Thesis is n  
ot a provable fact in the sense of a Theorem of mathematics-it is a h  
ypothesis about the processes which human brains u

605

The Public-Processes V  
ersio

605

Now some people might feel that this version asserts too much. These   
people might put their objections as follows: "Someone such as the C  
rab might exist-someone with an almost mystical insight into mathematics, b  
ut who is just as much in the dark about his own peculiar abilities as a  
nyone else-and perhaps that person's mental mechanisms carry out o  
perations which have no counterpart in FlooP." The idea is that perhaps we have a  
subconscious potential for doing things which transcend the c  
onscious processes-things which are somehow inexpressible in terms of t  
he elementary FlooP operations. For these objectors, we shall give a w  
eaker version of the Thesis," one which di&tinguishes between public and p  
rivate mental p

605

CHURCH-TURING THESIS, PUBLIC-PROCESSES VERSION: Suppose there is a   
method which a sentient being follows in order to sort numbers i  
nto two classes. Suppose further that this method always yields an a  
nswer within a finite amount of time, and that it always gives the same a  
nswer for a given number. Proviso: Suppose also that this method can b  
e communicated reliably from one sentient being to another by means o  
f language. Then: Some terminating FlooP program (i.e., general recursive function) exists which gives exactly the same answers as the sentient beings' method d  
oes. This says that public methods are subject to "FlooPification", but asser  
ts nothing about private methods. It does not say that they are un-FlooP-able,   
but it at least leaves the door o  
pe

605

Srinivasa R  
amanuja

605

As evidence against any stronger version of the Church-Turing Thesis, l  
et us consider the case of the famous Indian mathematician of the fi  
rst quarter of the twentieth century, Srinivasa Ramanujan (188 7-192  
0). Ramanujan (Fig. 105) came from Tamilnadu, the southernmost part o  
f India, and studied mathematics a little in high school. One day, s  
omeone who recognized Ramanujan's talent for math presented him with a copy o  
f a slightly out-of-date textbook on analysis, which Ramanujan d  
evoured (figuratively speaking). He then began making his own forays into t  
he world of analysis, and by the time he was twenty-three, he had made a  
number of discoveries which he considered worthwhile. He did not k  
now to whom to turn, but somehow was told about a professor of mathema  
tics in faraway England, named G. H. Hardy. Ramanujan compiled his b  
es

606

FIGURE 105. · Srinivasa Ramanuj  
an and one of his strange Indian m  
elodie

606

results together in a packet of papers, and sent them all to the unforewarned Hardy with a covering letter which friends helped him e  
xpress in English. Below are some excerpts taken from Hardy's description of h  
is reaction upon receiving the b  
undle: ... It soon became obvious that Ramanujan must possess much more g  
eneral theorems and was keeping a great deal up his sleeve . ... [ Some f  
ormulae] defeated me completely; I had never seen anything in the least like t  
hem before. A single look at them is enough to show that they could only b  
e written down by a mathematician of the highest class. They must be t  
rue because, if they were not true, no one would have had the imagination t  
o invent them. Finally ... the writer must be completely honest, because g  
reat mathematicians are commoner than thieves or humbugs of such incredi  
ble skill. 2  
What resulted from this correspondence was that Ramanujan came t  
o England in 1913, sponsored by Hardy; and then followed an i  
ntense collaboration which terminated in Ramanujan's early demise at age thirtythree from tuberc

606

Ramanujan had several extraordinary characteristics which set h  
im apart from the majority of mathematicians. Om. was his lack of rigor. V  
ery often he would simply state a result which he would insist, had just come t  

607

him from a vague intuitive source, far out of the realm of consc  
ious probing. In fact, he often said that the goddess Namagiri inspired him i  
n his dreams. This happened time and again, and what made it all the m  
ore mystifying-perhaps even imbuing it with a certain mystical quality-  
was the fact that many of his "intuition-theorems" were wrong. Now there is a  
curious paradoxical effect where sometimes an event which you t  
hink could not help but make credulous people become a little more s  
keptical, actually has the reverse effect, hitting the credulous ones in some vulnerable spot of their minds, tantalizing them with the hint of some b  
affling irrational side of human nature. Such was the case with Ramanuj  
an's blunders: many educated people with a yearning to believe in something o  
f the sort considered Ramanujan's intuitive powers to be evidence of a  
mystical insight into Truth, and the fact of his fallibility seemed, if anything, to strengthen, rather than weaken, such beliefs.

607

Of course it didn't hurt that he was from one of the most b  
ackward parts of India, where fakirism and other eerie Indian rites had been   
practiced for millennia, and were still practiced with a frequency probably   
exceeding that of the teaching of higher mathematics. And his o  
ccasional wrong flashes of insight, instead of suggesting to people that he was m  
erely human, paradoxically inspired the idea that Ramanujan's wrongness always had some sort of "deeper rightness" to it-an "Oriental" rightness,   
perhaps touching upon truths inaccessible to Western minds. What a delicious, almost irresistible thought! Even Hardy-who would have been t  
he first to deny that Ramanujan had any mystical powers-once wrote a  
bout one of Ramanujan's failures, "And yet I am not sure that, in some ways, h  
is failure was not more wonderful than any of his triu  
mph

607

The other outstanding feature of Ramanujan's mathematical personality was his "friendship with the integers", as his colleague Littlewood put i  
t. This is a characteristic that a fair number of mathematicians share to s  
ome degree or other, but whic h.Ramanujan possessed to an extreme. There a  
re a couple of anecdotes which illustrate this special power. The first one i  
s related by H  
ardy: I remember once going to see him when he was lying ill at Putney. I h  
ad ridden in taxi-cab No. 1729, and remarked that the number seemed to m  
e rather a dull one, and that I hoped it was not an unfavourable omen. "No," h  
e replied, "it is a very interesting number; it is the smallest number e  
xpressible as a sum of two cubes in two different ways." I asked him, naturally, w  
hether he knew the answer to the correspondmg problem for fourth powers; and h  
e replied, after a moment's thought, that he could see no obvious example, and   
thought that the first such number must be very large.3  
It turns out that the answer for fourth powers i  
s: 6 3531 8657 = 134  
4 + 133  
4 = 1584 + 594  
The reader may find it interesting to tackle the analogous problem f  
or squares, which is much e

607

It is actually quite interesting to ponder why it is that Hardy im

608

mediately jumped to fourth powers. After all, there are several o  
ther reasonably natural generalizations of the equat  
ion u  
3 + v  
3 = x3 + y  
3  
along different dimensions. For instance, there is the question about representing a number in three distinct ways as a sum of two c ubes:  
r  
3 + s  
3 = u3 + v  
3 = x3 + y  
3  
Or, one can use three different cube s:  
u  
3 + v  
3 + w3 = x3 + y  
3 + z  
3  
Or one can even make a Grand Generalization in all dimensions at o  
nce: There is a sense, however, in which Hardy's generalization is "the m  
ost mathematician-like". Could this sense of mathematical esthetics ever b  
e progr

608

The other anecdote is taken from a biography of Ramanujan by h  
is countryman S. R. Ranganathan, where it is called "Ramanujan's Flash". I  
t is related by a Indian friend of Ramanujan's from his Cambridge days, D  
r. P .C. Mahalan obis.  
On another occasion, I went to his room to have lunch with him. The First  
World War had started some time earlier. I had in my hand a copy of t  
hemonthly "Strand Magazine" which at that time used to publish a number o  
f puzzles to be solved by readers. Ramanujan was stirring something in a p  
anover the fire for our lunch. I was sitting near the table, turning over the p  
agesof the Magazine. I got interested in a problem involving a relation b  
etweentwo numbers. I have forgotten the details; but I remember the type of t  
heproblem. Two British officers had been billeted in Paris in two diffe  
renthouses in a long street; the door numbers of these houses were related in a  
special way; the problem was to find out the two numbers. It was not at a  
lldifficult. I got the solution in a few minutes by trial and e  
rror.MAHALAN0BIS (in a joking way): Now here is a problem for you  
. RAMANUJAN: What problem, tell me. (He went on stirring the pan  
.) I read out the question from the "Strand M  
agazine". RAMANUJAN: Please take down the solution. (He dictated a c  
ontinued fracti  
on.) The first term was the solution which I had obtained. Each successive t  
erm represented successive solutions for the same type of relation between t  
wo numbers, as the number of houses in the street would increase indefinitely. I  
was a  
mazed. MAHALANOBIS: Did you get the solution in a fl  
ash? RAMANUJAN: Immediately I heard the problem, it was clear that t  
he solution was obviously a continued fraction; I then thought, "Which continued fraction?" and the answer came to my mind. It was just as simple a  
s this.4  
Hardy, as Ramanujan's closest co-worker, was often asked a  
fte

609

Ramanujan's death if there had been any occult or otherwise e  
xotically flavored elements to Ramanujan's thinking style. Here is one c  
omment which he g  
ave: I have often been asked wh-:ther Ramanujan had any special secret; w  
hether his methods differed in kind from those of other mathematicians; w  
hether there was anything really abnormal in his mode of thought. I cannot a  
nswer these questions with any confidence or conviction; but I do not believe it. M  
y belief is that all mathematicians think, at bottom, in the same kind of w ay, a  
nd that Ramanujan was no exception.  
5  
Here Hardy states in essence his own version of the Church-Turing T  
hesis. I p  
araphrase: CHURCH-TURING THESIS, HARDY'S VERSION: At bottom, all mathemat  
icians are i  
somorphic. This does not equate the mathematical potential of mathematicians w  
ith that of general recursive functions; for that, however, all you need is t  
o show that some mathematician's mental capacity is no more general t  
han recursive functions. Then, if you believe Hardy's Version, you know it fo  
r all mathematician

609

Then Hardy compares Ramanujan with calculating p rodigies:  
His memory, and his powers of calculation, were very unusual, but they c  
ould not reasonably be called "abnormal". If he had to multiply two large numbers,  
he multiplied them in the ordinary way; he could do it with unusual r  
apidity and accuracy, but not more rapidly and accurately than any mathemati  
cian who is naturally quick and has the habit of computation.6  
Hardy describes what he perceived as Ramanujan's outstanding inte  
llectual attribut es:  
With his memory, his patience, and his power of calculation, he combined a  
power of generalisation, a feeling for form, and a capacity for rapid modification of h  
is hypotheses, that were often really startling, and made him, in his own fi  
eld, without a rival in his d ay.  
7 The part of this passage which I have italicized seems to me to be a  
n excellent characterization of some of the subtlest features of intelligence i  
n general. Finally, Hardy concludes somewhat nostalgically:  
[ His work] has not the simplicity and inevitableness of the very greatest work;  
it would be greater if it were less strange. One gift it has which no one c  
an deny-profound and invincible originality. He would probably have been a  
greater mathematician if he had been caught and tamed a little in his y  
outh; he would have discovered more that was new, and that, no doubt, of g  
reater importance. On the other hand he would have been less of a Ramanujan, a  
nd more of a European professor and the loss might have been greater than t  
he gain.8  
The esteem in which Hardy held Ramanujan is revealed by the r  
omantic way in which he speaks of h

610

"Idiots Savants"

610

There is another class of people whose mathematical abilities seem to defy  
rational explanation-the so-called "idiots savants", who can perform complex calculations at lightning speeds in their heads (or wherever they do it).  
Johann Martin Zacharias Dase, who lived from 1824 to 186i and was   
employed by various European governments to perform computations, i  
s an outstanding example. He not only could multiply two numbers each o  
f 100 digits in his head; he also had an uncanny sense of quantity. That is, h  
e could just "tell", without counting, how many sheep were in a field, o  
r words in a sentence, and so forth, up to about 30-this in contrast to m  
ost of us, who have such a sense up to about 6, with reliability. Inc  
identally, Dase was not an i

610

I shall not describe the many fascinating documented cases of "lightning calculators", for that is not my purpose here. But I do feel it i  
s important to dispel the idea that they do it by some mysterious, unanalyzable method. Although it is often the case that such wizards' c  
alculational abilities far exceed their abilities to explain their results, every once in a  
while, a person with other intellectual gifts comes along who also has t  
his spectacular ability with numbers. From such people's introspection, as w  
ell as from extensive research by psychologists, it has been ascertained t  
hat nothing occult takes place during the performances of lightning calculators, but simply that their minds race through intermediate steps w  
ith the kind of self-confidence that a natural athlete has in executing a complicated motion quickly and gracefully. They do not reach their answers b  
y some sort of instantaneous flash of enlightenment (though subjectively i  
t may feel that way to some of them), but-like the rest of us-by sequen  
tial calculation, which is to say, by FlooP-ing (or BlooP-ing) a  
lon

610

Incidentally, one of the most obvious clues that no "hot line to God" is   
involved is the mere fact that when the numbers involved get bigger, t  
he answers are slower in coming. Presumably, if God or an "oracle" w  
ere supplying the answers, he wouldn't have to slow up when the numbers g  
ot bigger. One could probably make a nice plot showing how the time t  
aken by a lightning calculator varies with the sizes of the numbers involved, a  
nd the operations involved, and from it deduce some features of the algorithms e

610

The Isomorphism Version of the Church-Turing T  
hesi

610

This finally brings us to a strengthened standard version of the ChurchTuring T  
hesis: CHURCH-TURING THESIS, ISOMORPHISM VERSION: Suppose there is a m  
ethod which a sentient being follows in order to sort numbers into t  
wo classes. Suppose further that this method always yields an a  
nswer within a finite amount of time, and that it always gives the same a  
nswer for a given number. Then: Some terminating FlooP program (

611

general recursive function) exists which gives exactly the same a  
nswers as the sentient being's method does. Moreover: The mental process a  
nd the FlooP program are isomorphic in the sense that on some level   
there is a correspondence between the steps being carried out in b  
oth computer and b  
rain. Notice that not only has the conclusion been strengthened, but also t  
he proviso of communicability of the faint-hearted Public-Processes V  
ersion has been dropped. This bold version is the one which we now shall discuss

611

In brief, this version asserts that when one computes something, one's  
mental activity can be mirrored isomorphically in some FlooP p  
rogram. And let it be very clear that this does not mean that the brain is a  
ctually running a FlooP program, written in the FlooP language complete w  
ith BEGIN's, END's, ABORT's, and the rest-not at all. It is just that the steps a  
re taken in the same order as they could be in a FlooP program, and t  
he logical structure of the calculation can be mirrored in a FlooP program.

611

Now in order to make sense of this idea, we shall have to make s  
ome level distinctions in both computer and brain, for otherwise it could b  
e misinterpreted as utter nonsense. Presumably the steps of the c  
alculation going on inside a person's head are on the highest level, and are s  
upported by lower levels, and eventually by hardware. So if we speak of an isomorphism, it means we've tacitly made the assumption that the highest level c  
an be isolated, allowing us to discuss what goes on there independently o  
f other levels, and then to map that top level into FlooP. To be more p  
recise, the assumption is that there exist software entities which play the roles o  
f various mathematical constructs, and which are activated in ways which c  
an be mirrored exactly inside FlooP (see Fig. 106). What enables t  
hese software entities to come into existence is the entire infrastructure discussed in Chapters XI and XII, as well as in the Prelude, Ant Fugue. There i  
s no assertion of isomorphic activity on the lower levels of brain and computer ( e.g., neurons and bits

611

The spirit of the Isomorphism Version, if not the letter, is g  
otten across by saying that what an idiot savant does in calculating, say, t  
he logarithm of 'TT, is isomorphic to what a pocket calculator does in c  
alculating it-where the isomorphism holds on the arithmetic-step level, not on t  
he lower levels of, in the one case, neurons, and in the other, int  
egrated circuits. (Of course different routes can be followed in c  
alculating anything-but presumably the pocket calculator, if not the human, c  
ould be instructed to calculate the answer in any specific m

611

FIGURE 106. The behavior of natural numbers can be mirrored in a human brain or in t  
he programs of a computer. These two different representations can then be mapped onto e  
ach other on an appropriately abstract l

612

Representation of Knowledge about the Real W  
orl

612

Now this seems quite plausible when the domain referred to is n  
umber theory, for there the total universe in which things happen is very small a  
nd clean. Its boundaries and residents and rules are well-defined, as in a  
hard-edged maze. Such a world is far less complicated than the open-ended   
and ill-defined world which we inhabit. A number theory problem, o  
nce stated, is complete in and of itself. A real-world problem, on the o  
ther hand, never is sealed off from any part of the world with absolute c  
ertainty. For instance, the task of replacing a burnt-out light bulb may turn out t  
o require moving a garbage bag; this may unexpectedly cause the spilling of a  
box of pills, which then forces the floor to be swept so that the pet dog w  
on't eat any of the spilled pills, etc., etc. The pills and the garbage and the d  
og and the light bulb are all quite distantly related parts of the world-yet a  
n intimate connection is created by some everyday happenings. And there i  
s no telling what else could be brought in by some other small variations o  
n the expected. By contrast, if you are given a number theory problem, y  
ou never wind up having to consider extraneous things such as pills or dogs or   
bags of garbage or brooms in order to solve your problem. (Of course, y  
our intuitive knowledge of such objects may serve you in good stead as you g  
o about unconsciously trying to manufacture mental images to help you i  
n visualizing the problem in geometrical terms-but that is another m  
atte

612

Because of the complexity of the world, it is hard to imagine a l  
ittle pocket calculator that can answer questions put to it when you press a few   
buttons bearing labels such as "dog", "garbage", "light bulb", and so f  
orth. In fact, so far it has proven to be extremely complicated to have a f  
ull-size high-speed computer answer questions about what appear to us to b  
e rather simple subdomains of the real world. It seems that a large amount o  
f knowledge has to be taken into account in a highly integrated way f  
or "understanding" to take place. We can liken real-world thought p  
rocesses to a tree whose visible part stands sturdily above ground but depends v  
itally on its invisible roots which extend way below ground, giving it stability a  
nd nourishment. In this case the roots symbolize complex processes which t  
ake place below the conscious level of the mind-processes whose effects permeate the way we think but of which we are unaware. These are the   
"triggering patterns of symbols" which were discussed in Chapters XI a  
nd XII

612

Real-world thinking is quite different from what happens when we d  
o a multiplication of two numbers, where everything is "above ground", so t  
o speak, open to inspection. In arithmetic, the top level can be "skimmed o  
ff" and implemented equally well in many different sorts of h  
ardware: mechanical adding machines, pocket calculators, large computers, p  
eople's brains, and so forth. This is what the Church-Turing Thesis is all a  
bout. But when it comes to real-world understanding, it seems that there is n  
o simple way to skim off the top level, and program it.alone. The t  
riggering patterns of symbols are just too complex. There must be several l  
evels through which thoughts may "percolate" and "  
bubb

613

In particular-and this comes back to a major theme of Chapters X  
I and XII-the representation of the r�al world in the brain, a  
lthough rooted in isomorphism to some extent, involves some elements which have  
no counterparts at all in the outer world. That is, there is much more to it   
than simple mental structures representing "dog", "broom", etc. All of   
these symbols exist, to be sure-but their internal structures are e  
xtremely complex and to a large degree are unavailable for conscious inspe  
ction. Moreover, one would hunt in vain to map each aspect of a symbol's i  
nternal structure onto some specific feature of the real w  
orl

613

Processes That Are Not So Skimma  
bl

613

For this reason, the brain begins to look like a very peculiar formal s  
ystem, for on its bottom level-the neural level-where the "rules" operate a  
nd change the state, there may be no interpretation of the primitive e  
lements (neural firings, or perhaps even lower-level events). Yet on the top l  
evel, there emerges a meaningful interpretation-a mapping from the l  
arge "clouds" of neural activity which we have been calling "symbols", onto the   
real world. There is some resemblance to the Godel construction, in that a  
high-level isomorphism allows a high level of meaning to be read i  
nto strings; but in the Godel construction, the higher-level meaning "rides" o  
n the lower level-that is, it is derived from the lower level, once the notion o  
f Godel-numbering has been introduced. But in the brain, the events on t  
he neural level are not subject to real-world interpretation; they are simply not   
imitating anything. They are there purely as the substrate to support the   
higher level, much as transistors in a pocket calculator are there purely t  
o support its number-mirroring activity. And the implication is that there i  
s no way to skim off just the highest level and make an isomorphic copy in a   
program; if one is to mirror the brain processes which allow r  
eal-world understanding, then one must mirror some of the lower-level things w  
hich are taking place: the "languages of the brain". This doesn't n  
ecessarily mean that one must go all the way down to the level of the hardware,   
though that may turn out to be the case.

613

In the course of developing a program with the aim of achieving a  
n "intelligent" (viz., human-like) internal representation of what is "  
out there", at some point one will probably be forced into using structures a  
nd processes which do not admit of any straightforward interpreta  
tions-that is, which cannot be directly mapped onto elements of reality. These l  
ower l,!yers of the program will be able to be understood only by virtue of t  
heir catalytic relation to layers above them, rather than because of some d  
irect connection they have to the outer world. (A concrete image of this idea w  
as suggested by the Anteater in the Ant Fugue: the "indescribably b  
oring nightmare" of trying to understand a book on the letter l

613

Personally, I would guess that such multilevel architecture o  
f concept-handling systems becomes necessary just when processes i  
nvolving images and analogies become significant elements of the p

614

contrast to processes which are supposed to carry out strictly d  
eductive reasoning. Processes which carry out deductive reasoning can be programmed in essentially one single level, and are therefore skimmable, b  
y definition. According to my hypothesis, then, imagery and analo  
gical thought processes intrinsically require several layers of substrate and a  
re therefore intrinsically non-skimmable. I believe furthermore that it is precisely at this same point that creativity starts to emerge-which would i  
mply that creativity intrinsically depends upon certain kinds of "unin  
terpretable" lower-level events. The layers of underpinning of analogical thinking are,   
of course, of extreme interest, and some speculations on their nature w  
ill be offered in the next two C

614

Articles of Reductionistic Fa  
it

614

One way to think about the relation between higher and lower levels in t  
he brain is this. One could assemble a neural net which, on a local (neuronto-neuron) level, performed in a manner indistinguishable from a n  
eural net in a brain, but which had no higher-level meaning at all. The fact t  
hat the lower level is composed of interacting neurons does not n  
ecessarily force any higher level of meaning to appear-no more than the fact t  
hat alphabet soup contains letters forces meaningful sentences to be found,   
swimming about in the bowl. High-level meaning is an optional feature of a  
neural network-one which may emerge as a consequence of e  
volutionary environmental p  
ressure

614

Figure 107 is a diagram illustrating the fact that emergence of a h  
igher level of meaning is optional. The upwards-pointing arrow indicates that a  
substrate can occur without a higher level of meaning, but not vice vers  
a: the higher level must be derived from properties of a lower o  
n

614

FIGURE 107. Floating on neural activity, the symbol level of the brain mirrors the w  
orld. But neural activity per se, which can be simulated on a computer, does not create thought; t  
hat calls for higher levels of organizat

615

The diagram includes an indication of a computer simulation of a n  
eural network. This is in principle feasible, no matter how complicated t  
he network, provided that the behavior of individual neurons can be described in terms of computations which a computer can carry out. This is a  
subtle postulate which few people even think of questioning. Nevertheless   
it is a piece of "reductionistic faith"; it could be considered a "mic  
roscopic version" of the Church-Turing Thesis. Below we state it explicitl  
y: CHURCH-TURING THESIS, MICROSCOPIC VERSION: The behavior of the components of a living being can be simulated on a computer. That is, t  
he behavior of any component (typically assumed to be a cell) can b  
e calculated by a FlooP program (i.e., general recursive function) to a  
ny desired degree of accuracy, given a sufficiently precise description o  
f the component's internal state and local e  
nvironment. This version of the Church-Turing Thesis says that brain processes do not   
possess any more mystique-even though they possess more levels o  
f organization-than, say, stomach processes. It would be unthinkable in t  
his day and age to suggest that people digest their food, not by o  
rdinary chemical processes, but by a sort of mysterious and magic "  
assimilation". This version of the CT-Thesis simply extends this kind of c  
ommonsense reasoning to brain processes. In short, it amounts to faith that the b  
rain operates in a way which is, in principle, understandable. It is a piece o  
f reductionist fait

615

A corollary to the Microscopic CT -Thesis is this rather terse n  
ew macroscopic v  
ersion: CHURCH-TURING THESIS, REDUCTIONIST'S VERSION: All brain processes a  
re derived from a computable s  
ubstrate. This statement is about the strongest theoretical underpinning one c  
ould give in support of the eventual possibility of realizing Artificial Intelligenc  

615

Of course, Artificial Intelligence research is not aimed at s  
imulating neural networks, for it is based on another kind of faith: that p  
robably there are significant features of intelligence which can be floated on top o  
f entirely different sorts of substrates than those of organic brains. F  
igure 108 shows the presumed relations among Artificial Intelligence, n  
atural intelligence, and the real w  
orl

615

Parallel Progress in Al and Brain Simulati

615

The idea that, if AI is to be achieved, the actual hardware of the b  
rain might one day have to be simulated or duplicated, is, for the present a  
t least, quite an abhorrent thought to many AI workers. Still one w  
onders, "How finely will we need to copy the brain to achieve Al?" The real answer   
is probably that it all depends on how many of the features of h  
uman consciousness you want to s  
imulat

616

FIGURE 108. Crucial to the endeavor of Artificial Intelligence research is the notion t  
hat the symbolic levels of the mind can be "skimmed off" of their neural substrate and imp  
lemented in other media, such as the electronic substrate of computers. To what depth the copying o  
f brain must go is at present completely u  
nclea

616

Is an ability to play checkers well a sufficient indicator of i  
ntelligence? If so, then AI already exists, since checker-playing programs are of world   
class. Or is intelligence an ability to integrate functions symbolically, as in a  
freshman calculus class? If so, then AI already exists, since symbolic integration routines outdo the best people in most cases. Or is intelligence t  
he ability to play chess well? If so, then AI is well on its way, since c  
hess-playing programs can defeat most good amateurs; and the level of artificial c  
hess will probably continue to improve s  
lowl

616

Historically, people have been nai've about what qualities, i  
f mechanized, would undeniably constitute intelligence. Sometimes it s  
eems as though each new step towards AI, rather than producing s  
omething which everyone agrees is real intelligence, merely reveals what real intelligence is not. If intelligence involves learning, creativity, emotional responses, a sense of beauty, a sense of self, then there is a long road a  
head, and it may be that these will only be realized when we have totally duplicated a living b

616

Beauty, the Crab, and the S  
ou

616

Now what, if anything, does all this have to say about the Crab's v  
irtuoso performance in front of Achilles? There are two issues clouded t  
ogether here. They a

617

(1) Could any brain process, under any circumstances, distinguish completely reliably between true and false s  
tatementsof TNT without being in violation of the Churc  
h-TuringThesis-or is such an act in principle impo  
ssible?( 2)Is perception of beauty a brain proc  
ess?First of all, in response to ( 1 ), if violations of the Church-Turing Thesis a  
re allowed, then there seems to be no fundamental obstacle to the s  
trange events in the Dialogue. So what we are interested in is whether a believer i  
n the Church-Turing Thesis would have to disbelieve in the Crab's ability  
. Well, it all depends on which version of the CT-Thesis you believe. F  
or example, if you only subscribe to the Public-Processes Version, then y  
ou could reconcile the Crab's behavior with it very easily by positing that the  
Crab's ability is not communicable. Contrariwise, if you believe the Reductionist's Version, you will have a very hard time believing in the Crab  
's ostensible ability (because of Church's Theorem-soon to be demonstrated). Believing in intermediate versions allows you a certain amount o  
f wishy-washiness on the issue. Of course, switching your stand according t  
o convenience allows you to waffle even m

617

It seems appropriate to present a new version of the CT-Thesis, o  
ne which is tacitly held by vast numbers of people, and which has been p  
ublicly put forth by several authors, in various manners. Some of the more f  
amous ones are: philosophers Hubert Dreyfus, S. Jaki, Mortimer Taube, a ndj. R  
. Lucas; the biologist and philosopher Michael Polanyi (a holist par excellence); the distinguished Australian neurophysiologist John Eccles. I a  
m sure there are many other authors who have expressed similar ideas, a  
nd countless readers who are sympathetic. I ,have attempted below to summarize their joint position. I have probably not done full justice to it, but I  
have tried to convey the flavor as accurately as I c  
an: CHURCH-TURING THESIS, SouusTS' VERSION: Some kinds of things which a  
brain can do can be vaguely approximated on a computer but n  
ot most, and certainly not the interesting ones. But anyway, even if the  
y all could, that would still leave the soul to explain, and there is no w  
ay that computers have any bearing on that.  
This 'version relates to the tale of the Magnijicrab in two ways. In the firs  
t place, its adherents would probably consider the tale to be silly and implausible, but-not forbidden in principle. In the second place, they w  
ould probably claim that appreciation of qualities such as beauty is one of tho  
se properties associated with the elusive soul, and is therefore i  
nherently possible only for humans, not for mere machines.

617

We will come back to this second point in a moment; but first, while we   
are on the subject of "soulists", we ought to exhibit this latest version in a  
n even more extreme form, since that is the form to which large numbers o  
f well-educated people subscribe these d  
ays: CHURCH-TURING THESIS, THEODORE ROSZAK VERSION:  
ridiculous. So is science in g

618

This view is prevalent among certain people who see in anything s  
macking of numbers or exactitude a threat to human values. It is too bad that t  
hey do not appreciate the depth and complexity and beauty involved in exploring abstract structures such as the human mind, where, indeed, one comes   
in intimate contact with the ultimate questions of what to be human i  

618

Getting back to beauty, we were about to consider whether the appreciation of beauty is a brain process, and if so, whether it is imitable by a   
computer. Those who believe that it is not accounted for by the brain a  
re very unlikely to believe that a computer could possess it. Those who b  
elieve it is a brain process again divide up according to which version of t  
he CT-Thesis they believe. A total reductionist would believe that any b  
rain process can in principle be transformed into a computer program; others,   
however, might feel that beauty is too ill-defined a notion for a c  
omputer program ever to assimilate. Perhaps they feel that the appreciation o  
f beauty requires an element of irrationality, and therefore is incompat  
ible with the very fiber of c

618

Irrational and Rational Can Coexist on Different L  
evel

618

However, this notion that "irrationality is incompatible with c  
omputers" rests on a severe confusion of levels. The mistaken notion stems from t  
he idea that since computers are faultlessly functioning machines, they a  
re therefore bound to be "logical" on all levels. Yet it is perfectly obvious that a   
computer can be instructed to print out a sequence of illogic  
al statements--o:r, for variety's sake, a batch of statements having r  
andom truth values. Yet in following such instructions, a computer would not b  
e making any mistakes! On the contrary, it would only be a mistake if t  
he computer printed out something other than the statements it had b  
een instructed to print. This illustrates how faultless functioning on one l  
evel may underlie symbol manipulation on a higher level-and the goals of t  
he higher level may be completely unrelated to the propagation of Truth.

618

Another way to gain perspective on this is to remember that a b  
rain, too, is a collection of faultlessly functioning elements-neurons. W  
henever a neuron's threshold is surpassed by the sum of the incoming s  
ignals, BANG!-it fires. It never happens that a neuron forgets its a  
rithmetical knowledge-carelessly adding its inputs and getting a wrong answer. E  
ven when a neuron dies, it continues to function correctly, in the sense that i  
ts components continue to obey the laws of mathematics and physics. Yet a  
s we all know, neurons are perfectly capable of supporting high-level behavior that is wrong, on its own level, in the most amazing ways. Figure 109  
is meant to illustrate such a clash of levels: an incorrect belief held in t  
he software of a mind, supported by the hardware of a faultlessly function  
ing b

618

The point-a point which has been made several times earlier i  
n various contexts-is simply that meaning can exist on two or more differ  
ent levels of a symbol-handling system, and along with meaning, rightness a  
nd wrongness can exist on all those levels. The presence of meaning on a g  
ive

619

FIGURE 109. The &rain is rational; the mind may not be. [Drawing by the author.]

620

level is determined by whether or not reality is mirrored in an i  
somorphic (or looser) fashion on that level. So the fact that neurons always p  
erform correct additions (in fact, much more complex calculations) has no b  
earing whatsoever on the correctness of the top-level conclusions supported b  
y their machinery. Whether one's top level is engaged in proving koans of   
Boolean Buddhism or in meditating on theorems of Zen Algebra, o  
ne's neurons are functioning rationally. By the same token, the high-level   
symbolic processes which in a brain create the experience of appre  
ciating beauty are perfectly rational on the bottom level, where the faultless functioning is taking place; any irrationality, if there is such, is on the h  
igher level, and is an epiphenomenon-a consequence-of the events on the   
lower l  
eve

620

To make the same point in a different way, let us say you are having a  
hard time making up your mind whether to order a cheeseburger or a   
pineappleburger. Does this imply that your neurons are also b  
alking, having difficulty deciding whether or not to fire? Of course not. Y  
our hamburger-confusion is a high-level state which fully depends on t  
he efficient firing of thousands of neurons in very organized ways. This is a   
little ironic, yet it is perfectly obvious when you think about it. N  
evertheless, it is probably fair to say that nearly all confusions about minds and computers have their origin in just such elementary level-confusions.

620

There is no reason to believe that a. computer's faultlessly fu  
nctioning hardware could not support high-level symbolic behavior which w  
ould represent such complex states as confusion, forgetting, or appreciation o  
f beauty. It would require that there exist massive subsystems i  
nteracting with each other according to a complex "logic". The overt behavior c  
ould appear either rational or irrational; but underneath it would be the performance of reliable, logical h  
ardwar

620

More Against Lucas

620

Incidentally, this kind o flevel distinction provides us with some new fuel i  
n arguing against Lucas. The Lucas argument is based on the idea t  
hat Godel's Theorem is applicable, by definition, to machines. In fact, L  
ucas makes a most emphatic p  
ronunciation: Godel's theorem must apply to cybernetical machines, because it is of t  
he essence of being a machine, that it should be a concrete instantiation of a  
formal system.9  
This is, as we have seen, true on the hardware level-but since there may b  
e higher levels, it is not the last word on the subject. Now Lucas gives the   
impression that in the mind-imitating machines he discusses, there is only  
one level on which manipulation of symbols takes place. For instance, t  
he Rule of Detachment (called "Modus Ponens" in his article) would b� w  
ired into the hardware and would be an unchangeable feature of such a  
machine. He goes further and intimates that if Modus Ponens were not a  

621

immutable pillar of the machine's system, but could be overridden on   
occasion, then:  
The system will have ceased to be a formal logical system, and the m  
achine will barely qualify for the title of a model for the mind. 1  
0Now many programs which are being developed in AI research have v  
ery little in common with programs for generating truths of number theoryprograms with inflexible rules of inference and fixed sets of axioms. Y  
et they are certainly intended as "models for the mind". On their top levelthe "informal" level-there may be manipulation of images, formulation o  
f analogies, forgetting of ideas, confusing of concepts, blurring of distinctions, and so forth. But this does not contradict the fact that they rely on the   
correct functioning of their underlying hardware as much as brains rely on   
the correct functioning of their neurons. So AI programs are still "  
concrete instantiations of formal systems"-but they are not machines to w  
hich Lucas' transmogrification of Godel's proof can be applied. Lucas' a  
rgument applies merely to their bottom level, on which their intelligenc  
e-however great or small it may be-does not l

621

There is one other way in which Lucas betrays his oversimplified v  
ision of how mental processes would have to be represented inside c  
omputer programs. In discussing the matter of consistency, he w  
rites If we really were inconsistent machines, we should remain content with o  
ur inconsistencies, and would happily affirm both halves of a c  
ontradiction. Moreover, we would be prepared to say absolutely anything-which we a  
re not. It is easily shown that in an inconsistent formal system everything i  
s provable. 1  
1This last sentence shows that Lucas assumes that the Propositional C  
alculus must of necessity be built into any formal system which carries out reasoning·. In particular, he is thinking of the theorem <<PA-P>:JQ> of t  
he Propositional Calculus; evidently he has the erroneous belief that it is a  
n inevitable feature of mechanized reasoning. However, it is perfectly plausible that logical thought processes, such as propositional reasoning, w  
ill emerge as consequences of the general intelligence of an AI program, rather   
than being preprogrammed. This is wllat happens in humans! And there is no   
particular reason to assume that the strict Propositional Calculus, with i  
ts rigid rules and the rather silly definition of consistency that they entail,   
would emerge from such a p

621

An Underpinning of A  

621

We can summarize this excursion into level distinctions and come a  
way with one final, strongest version of the Church-Turing Thesis:  
CHURCH-TURING THESIS; AI VERSION: Mental processes of any sort can be   
simulated by a computer program whose underlying language is o  

622

power equal to that of FlooP-that is, in which all partial r  
ecursive functions can be p  
rogrammed. It should also be pointed out that in practice, many AI researchers r  
ely on another article of faith which is closely related to the CT-Thesis, a  
nd which I call the AI Thesis. It runs something like t  
his: AI THESIS: As the intelligence of machines evolves, its u  
nderlying mechanisms will gradually converge to the mechanisms u  
nderlying human i  
ntelligence. In other words, all intelligences are just variations on a single theme; t  
o create true intelligence, AI workers will just have to keep pushing to e  
ver lower levels, closer and closer to brain mechanisms, if they wish t  
heir machines to attain the capabilities which we h  
av

622

Church's T  
heore

622

Now let us come back to the Crab and to the question of whether h  
is decision procedure for theoremhood (which is presented in the guise of a  
filter for musical beauty) is compatible with reality. Actually, from t  
he events which occur in the Dialogue, we have no way of deducing w  
hether the Crab's gift is an ability to tell theorems from nontheorems, or a  
lternatively, an ability to tell true statements from false ones. Of course in many cases t  
his amounts to the same thing but Godel's Theorem shows that it doesn'  
t always. But no matter: both of these alternatives are impossible, if y  
ou believe the AI Version of the Church-Turing Thesis. The proposition t  
hat it is impossible to have a decision procedure for theoremhood in any f  
ormal system with the power of TNT is known as Church's Theorem. The proposition that it is impossible to have a decision procedure for numbertheoretical truth-if such truth exists, which one can well doubt after meeting up with all the bifurcations of TNT-follows quickly from Tars  
ki's Theorem (published in 1933, although the ideas were known to T  
arski considerably earlier)

622

The proofs of these two highly important results of metamathem  
atics are very similar. Both of them follow quite quickly from self-refe  
rential constructions. Let us first consider the question of a decision procedure f  
or TNT-theoremhood. If there were a uniform way by which people c  
ould decide which of the classes "theorem" and "nontheorem" any given formula X fell into, then, by the CT-Thesis (Standard Version), there would   
exist a terminating FlooP program (a general recursive function) whi  
ch could make the same decision, when given as input the Godel number o  
f formula X. The crucial step is to recall that any property that can be t  
ested for by a terminating FlooP program is represented in TNT. This means t  
hat the property ofTNT-theoremhood would be represented (as distinguis  
hed from merely expressed) inside TNT. But as we shall see in a moment, t  
hi

623

would put us in hot water, for if theoremhood is a representable a  
ttribute, then Godel's formula G becomes as vicious as the Epimenides p  
arado

623

It all hinges on what G says: "G is not a theorem of TNT". Assume t  
hat G were a theorem. Then, since theoremhood is supposedly r  
epresented, the TNT-formula which asserts "G is a theorem" would be a theorem o  
f TNT. But this formula is -G, the negation of G, so that TNT is inconsistent. On the other hand, assume G were not a theorem. Then once again by   
the supposed representability of theoremhood, the formula which a  
sserts "G is not a theorem" would be a theorem of TNT. But this formula is G  
, and once again we get into paradox. L'nlike the situation before, there is no   
resolution of the paradox. The problem is created by the assumption that   
theoremhood is represented by some formula of TNT, and therefore w  
e must backtrack and erase that assumption. This forces us also to c  
onclude that no FlooP program can tell the Godel numbers of theorems from t  
hose of nontheorems. Finally, if we accept the AI Version of the C  
T-Thesis, then we must backtrack further, and conclude that no method w  
hatsoever could exist by which humans could reliably tell theorems from nontheorems-and this includes determinations based on beauty. Those who subscribe only to the Public-Processes Version might still think the C  
rab's performance is possible; but of all the versions, that one is perhaps t  
he hardest one to find any justification f

623

Tarski's The  
ore

623

Now let us proceed to Tarski's result. Tarski asked whether there could b  
e a way of expressing in TNT the concept of number-theoretical truth. T  
hat theoremhood is expressible (though not representable) we have seen;   
Tarski was interested in the analogous question regarding the notion o  
f truth. More specifically, he wished to determine whether there is a  
ny TNT-formula with a single free variable a which can be translated t  
hus: "The formula whose Godel number is a expresses a truth."  
Let us suppose, with Tarski, that there is one-which we'll abbreviate a  
s TRUE{a}. Now what we'll do is use the diagonalization method to produce a  
sentence which asserts about itself that it is untrue. We copy the G  
odel method exactly, beginning with an "  
uncle": 3a: <-TRUE{a}AARITHMOQUINE{ a'',  
a}> Let us say the Godel number of the uncle is t. We arithmoquine this v  
ery uncle, and produce the Tarski formula T  
: 5  
80 3a:<-TRUE{a}AARITHMOQUINE{  
SSS ... SSS0/a",  
a}> � t S's

624

When interpreted, it s  
ays: "The arithmoquinification of t is t  
he Godel number of a false statement.  
" But since the arithmoquinification of t is T's own Godel number, T  
arski's formula T reproduces the Epimenides paradox to a tee inside TNT, s  
aying of itself, "I am a falsity". Of course, this leads to the conclusion that it m  
ust be simultaneously true and false (or simultaneously neither). There ari  
ses now an interesting matter: What is so bad about reproducing t  
he Epimenides paradox? Is it of any consequence? After all, we already have i  
t in English, and the English language has not gone up in s

624

The Impossibility of the M  
agnificra

624

The answer lies in remembering that there are two levels of m  
eaning involved here. One level is the level we have just been using; the other is a  
s a statement of number theory. If the Tarski formula T actually e  
xisted, then it would be a statement about natural numbe rs that is both true and fal  
se at once! There is the rub . While we can always just sweep t  
he English-language Epimenides paradox under the rug, saying that its subject matter (its own truth) is abstract, this is· not so when it becomes a  
concrete statement about numbers! If we believe this is a ridiculous state o  
f affairs, then we have to undo our assumption that the formula T  
RUE{a} exists. Thus, there is no way of expressing the notion of truth inside T  
NT. Notice that this makes truth a far more elusive property than theoremhood, for the latter is expressible. The same backtracking reasons as b  
efore (involving the Church-Turing Thesis, AI Version) lead us to the c  
onclusion t  
hat The Crab's mind cannot be a truth-recognizer any more than it i  
s a T  
NT-theorem-recognizer. The former would violate the Tarski-Church-Turing Theorem ("There i  
s no decision procedure for arithmetical truth"), while the latter w  
ould violate Church's T

624

Two Types of F  
or

624

It is extremely interesting, then, to think about the meaning of the w  
ord "form" as it applies to constructions of arbitrarily complex shapes. F  
or instance, what is it that we respond to when we look at a painting and fe  
el its beauty? Is it the "form" of the lines and dots on our retina? Evidently i  
t must be, for that is how it gets passed along to the analyzing mechanisms i  
n our heads-but the complexity of the processing makes us feel that we a  
re not merely looking at a two-dimensional surface; we are responding t  

625

some sort of inner meaning inside the picture, a multidimensional asp  
ect trapped somehow inside those two dimensions. It is the word "  
meaning" which is important here. Our minds contain interpreters which a  
ccept two-dimensional patterns and then "pull" from them high-di  
mensional notions which are so complex that we cannot consciously describe t  
hem. The same can be said about how we respond to music, incident

625

It feels subjectively that the pulling-out mechanism of inner meaning is   
not at all akin to a decision procedure which checks for the presence o  
r absence of some particular quality such as well-formedness in a s  
tring. Probably this is because inner meaning is something which reveals more o  
f itself over a period of time. One can never be sure, as one can about   
well-formedness, that one has finished with the i

625

This suggests a distinction that could be drawn between two senses o  
f "form" in patterns which we analyze. First, there are qualities such a  
s well-formedness, which can be detected by predictably terminating tests, as i  
n BlooP programs. These I propose to call syntactic qualities of form. O  
ne intuitively feels about the syntactic aspects of form that they lie close to t  
he surface, and therefore they do not provoke the creation of multidimensional cognitive structures.

625

By contrast, the semantic aspects of form are those which cannot b  
e tested for in predictable lengths of time: they require open-ended tests. S  
uch an aspect is theoremhood of TNT-strings, as we have seen. You cannot j  
ust apply some standard test to a string and find out if it is a t  
heorem. Somehow, the fact that its meaning is involved is crucially related to t  
he difficulty of telling whether or not a string is a TNT-theorem. The act o  
f pulling out a string's meaning involves, in essence, establishing all t  
he implications of its connections to all other strings, and this leads, to be s  
ure, down an open-ended trail. So "semantic" properties are connected t  
o open-ended searches because, in an important sense, an object's meaning is  
not localized within the object itself. This is not to say that no u  
nderstanding of any object's meaning is possible until the end of time, for as time p  
asses, more and more of the meaning unfolds. However, there are always asp  
ects of its meaning which will remain hidden arbitrarily l

625

Meaning Derives from Connections to Cognitive S  
tructure

625

Let us switch from strings to pieces of music, just for variety. You may s  
till substitute the term "string" for every reference to a piece of music, if y  
ou pre{er. The discussion is meant to be general, but its flavor is better g  
otten across, I feel, by referring to music. There is a strange duality about t  
he meaning of a piece of music: on the one hand, it seems to be s  
pread around, by virtue of its relation to many other things in the world-and y  
et, on the other hand, the meaning of a piece of music is obviously d  
erived from the music itself, so it must be localized somewhere inside the m  
usi

625

The resolution of this dilemma comes from thinking about the interpreter-the mechanism which does the pulling-out of meaning. (By "i

626

preter" in this context, I mean not the performer of the piece, but t  
he mental mechanism in the listener which derives meaning when the piece is   
played.) The interpreter may discover many important aspects of a p  
iece's meaning while hearing it for the first time; this seems to confirm the n  
otion that the meaning is housed in the piece itself, and is simply being read o  
ff. But that is only part of the story. The music interpreter works by setting u  
p a multidimensional cognitive structure-a mental representation of t  
he piece-which it tries to integrate with pre-existent information by fi  
nding links to other multidimensional mental structures which encode p  
revious experiences. As this process takes place, the full meaning gradually unfolds. In fact, years may pass before someone comes to feel that he h  
as penetrated to the core meaning of a piece. This seems to support t  
he opposite view: that musical meaning is spread around, the i  
nterpreter's role being to assemble it g

626

The truth undoubtedly lies somewhere in between: meanings-  
both musical and linguistic-are to some extent localizable, to some e  
xtent spread around. In the terminology of Chapter VI, we can say that m  
usical pieces and pieces of text are partly triggers, and partly carriers of e  
xplicit meaning. A vivid illustration of this dualism of meaning is provided by t  
he example of a tablet with an ancient inscription: the meaning is p  
artially stored in the libraries and the brains of scholars around the world, and y  
et it is also obviously implicit in the tablet i  
tsel

626

Thus, another way of characterizing the difference between "  
syntactic" and "semantic" properties (in the just-proposed sense) is that the syntacti  
c ones reside unambiguously inside the object under consideration, whe  
reas semantic properties depend on its relations with a potentially infinite class   
of other objects, and therefore are not completely localizable. There i  
s nothing cryptic or hidden, in principle, in syntactic properties, w  
hereas hiddenness is of the essence in semantic properties. That is the reason f  
or my suggested distinction between "syntactic" and "semantic" aspects o  
f visual f

626

Beauty, Truth, and F  
or

626

What about beauty? It is certainly not a syntactic property, according to t  
he ideas above. Is it even a semantic property? Is beauty a property which, f  
or instance, a particular painting has? Let us immediately restrict our consideration to a single viewer. Everyone has had the experience of fi  
nding something beautiful at one time, dull another time-and probably intermediate at other times. So is beauty an attribute which varies in time? O  
ne could turn things around and say that it is the beholder who has varied i  
n time. Given a particular beholder of a particular painting at a p  
articular time, is it reasonable to assert that beauty is a quality that is d  
efinitely present or absent? Or is there still something ill-defined and i  
ntangible about i

626

Different levels of interpreter probably could be invoked in e  
ver

627

person, depending on the circumstances. These various interpreters p  
ull out different meanings, establish different connections, and generally   
evaluate all deep aspects differently. So it seems that this notion of beauty i  
s extremely hard to pin down. It is for this reason that I chose to link b  
eauty, in the Magnificrab, with truth, which we have seen is also one of the m  
ost intangible notions in all of metamath  
ematic

627

The Neural Substrate of the Epimenides P  
arado

627

I would like to conclude this Chapter with some ideas about that c  
entral problem of truth, the Epimenides paradox. I think the Tarski reproduction of the Epimenides paradox inside TNT points the way to a d  
eeper understanding of the nature of the Epimenides paradox in English. What   
Tarski found was that his version of the paradox has two distinct levels to it.   
On one level, it is a sentence about itself which would be true if it were f  
alse, and false if it were true. On the other level-which I like to call t  
he arithmetical substrate-it is a sentence about integers which is true if and only if   
false

627

Now for some reason this latter bothers people a lot more than t  
he former. Some people simply shrug off the former as "meaningless", because of its self-referentiality. But you can't shrug off paradoxical statements about integers. Statements about integers simply cannot be both t  
rue and fals  

627

Now my feeling is that the Tarski transformation of the Epimeni  
des paradox teaches us to look for a substrate in the English-language version. I  
n the arithmetical version, the upper level of meaning is supported by t  
he lower arithmetical level. Perhaps analogously, the self-referential s  
entence which we perceive ("This sentence is false") is only the top level of a  
dual-level entity. What would be the lower level, then? Well, what is t  
he mechanism that language rides on? The brain. Therefore one ought t  
o look for a neural substrate to the Epimenides paradox-a lower level o  
f physical events which clash with each other. That is, two �vents which b  
y their nature cannot occur simultaneously. If this physical substrate e  
xists, then the reason we cannot make heads or tails of the Epimenides s  
entence is that our brains are trying to do an impossible task

627

Now what would be the nature of the conflicting physical e  
vents? Presumably when you hear the Epimenides sentence, your brain sets up   
some "coding" of the sentence-an internal configuration of int  
eracting symbols. Then it tries to classify the sentence as "true" or "false". T  
his classifying act must involve an attempt to force several symbols to int  
eract in a particular way. (Presumably this happens when any sentence is processed.) Now if it happens that the act of classification would physically d  
isrupt the coding of the sentence-something which would ordinarily n  
ever happen-then one is in trouble, for it is tantamount to trying to force a  
record player to play its self-breaking record. We have described t  
he conflict in physical terms, but not in neural terms. If this analysis is right s  

628

far, then presumably the rest of the discussion could be carried on when w  
e know something about the constitution of the "symbols" in the brain out o  
f neurons and their firings, as well as about the way that sentences b  
ecome converted into "  
codin

628

This sketch of the neural substrate of the Epimenides paradox   
suggests (to me, at least) that the resolution of the English version of t  
he Epimenides paradox might be similar to that for the Tarski version. T  
he resolution involves abandoning the notion that a brain could ever provide a  
fully accurate representation for the notion of truth. The novelty of this   
resolution lies in its suggestion that a total modeling of truth is i  
mpossible for quite physical reasons: namely, such a modeling would require physically incompatible events to occur in a b

637

C HA PTER X VII  
IArtificial Intelligence:  
Retrospect  

637

Turi  
n

637

IN 1 950, ALAN TURING wrote a  
most prophetic and p  
rovocative article on Artificial Intelligence. I  
t was entitled "Computing Machinery and Intelligence" and appeared in the journal Mind. 1 I w  
ill say some things about that arti  
cle, but I would like to precede t  
hem with some remarks about T  
uring the m

637

Alan Mathison Turing was   
born in London in 1912. He was a  
chilc\ full of curiosity and h  
umor. Gifted in mathematics, he went t  
o Cambridge where his interests i  
n machinery and mathemat  
ical logic cross-fertilized and r  
esulted in his famous paper on "computable numbers", in which he invented the theory of T  
uring machines and demonstrated the   
unsolvability of the halting problem; it was published in 1937. I  
n the l 940's, his interests t  
urned from the theory of c  
omputing machines to the actual building o  
f real computers. He was a maj  
or figure in the development o  
f computers in Britain, and a  
staunch defender of Artificial In

637

FIGURE 113. Alan Turing, after a successful race (May, 1950). [From Sara Turing, Alan M. Turing (Cambridge, U. K  
.: W .Hejfer & Sons, 1959).]

638

telligence when it first came under attack. One of his best friends was David   
Champernowne (who later worked on computer composition of m  
usic). Champernowne and Turing were both avid chess players and i  
nvented "round-the-house" chess: after your move, run around the house-if y  
ou get back before your opponent has moved, you're entitled to another m  
ove. More seriously, Turing and Champernowne invented the first chessplaying program, called "Turochamp". Turing died young, at 41-apparently of an accident with chemicals. Or some say suicide. His mother, S  
ara Turing, wrote his biography. From the people she quotes, one gets t  
he sense that Turing was highly unconventional, even gauche in some w  
ays, but so honest and decent that he was vulnerable to the world. He l  
oved games, chess, children, and bike riding; he was a strong l  
ong-distance runner. As a student at Cambridge, he bought himself a second-hand v  
iolin and taught himself to play. Though not very musical, he derived a g  
reat deal of enjoyment from it. He was somewhat eccentric, given to great b  
ursts of energy in the oddest directions. One area he explored was the p  
roblem of morphogenesis in biology. According to his mother, Turing "had a  
particular fondness for the Pickwick Papers", but "poetry, with the e  
xception of Shakespeare's, meant nothing to him." Alan Turing was one of the t  
rue pioneers in the field of computer s

638

The Turing T  
es

638

Turing's article begins with the sentence: "I propose to consider the question 'Can machines think?'" Since, as he points out, these are loaded t  
erms, it is obvious that we should search for an operational way to approach t  
he question. This, he suggests, is contained in what he calls the "im  
itation game"; it is nowadays known as the Turing test. Turing introduces it a  
s f  
ollows: It is played with three people: a man (A), a woman (B), and an int  
errogator (C) who may be of either sex. The interrogator stays in a room apart from t  
heother two. The object of the game for the interrogator is to determine w  
hich of the other two is the man and which is the woman. He knows them by l  
abels X and Y, and at the end of the game he says either "X is A and Y is B" or " Xi  
s B and Y is A". The interrogator is allowed to put questions to A and B t  
hus: C: Will X please tell me the length of his or her hair?   
Now suppose Xis actually A, then A must answer. It is A's object in the g  
ame to try to cause C to make the wrong identification. His answer might t  
herefore b  
e "My hair is shingled, and the longest strands are about nine inches l  
ong." In order that tones of voice may not help the interrogator the answers should   
be written, or better still, typewritten. The ideal arrangement is to have a  
teleprinter communicating between the two rooms. Alternatively the questions and answers can be repeated by an intermediary. The object of the g  
ame for the third player (B) is to help the interrogator. The best strategy for her i  
s probably to give truthful answers. She can add such things as "I am t  
he woman, don't listen to him!" to her answers, but it will avail nothing as t  
he man can make similar r

639

We now ask the question, "What will happen when a machine takes the part o  
f A in this game?'' Will the interrogator decide wrongly as often when the g  
ame is played like this as he does when the game is played between a man and a  
woman? These questions replace our original, "Can machines think?"2  
After having spelled out the nature of his test, Turing goes on to m  
ake some commentaries on it, which, given the year he was writing in, are quite  
sophisticated. To begin with, he gives a short hypothetical dialogue between interrogator and interrogate e:  
3  
Q: Please write me a sonnet on the subject of the Forth Bridge [ a b  
ridge over the Firth of Forth, in Scotland  
]. A: Count me out on this one. I never could write p  
oetry. Q: Add 34957 to 7  
0764. A: (Pause about 30 seconds and then give as answer) 105 621  
. Q: Do you play c  
hess? A: Y  
es. Q: I have K at my K 1, and no other pieces. You have only K at K6 and Rat  
Rl. It is your move. What do you p  
lay? A: (After a pause of 15 seconds) R-R8 m  
ate. Few readers notice that in the arithmetic problem, not only is there a  
n inordinately long delay, but moreover, the answer given is wrong! T  
his would be easy to account for if the respondent were a human: a m  
ere calculational error. But if the respondent were a machine, a variety of   
explanations are possible. Here are s  
ome: (1) a run-time error on the hardware level (i.e., an irreproducible fluke);  
(2) an unintentional hardware (or programming) error w  
hich (reproducibly) causes arithmetical mistakes;  
(3) a ploy deliberately inserted by the machine's programmer (  
or builder) to introduce occasional arithmetical mistakes, so as   
to trick interrogators;  
(4) an unanticipated epiphenomenon: the program has a h  
ard time thinking abstractly, and simply made "an honest mistake", which it might not make the next time around;  
(5) a joke on the part of the machine itself, deliberately t  
easing its in  
terrogator. Reflection on what Turing might have meant by this subtle touch opens u  
p just about all the major philosophical issues connected with Artificial Intell

639

Turing goes on to point out t  
hat The new problem has the advantage of drawing a fairly sharp line b  
etween the physical and the intellectual capacities of a man . ... We do not wish t  
o penalize the machine for its inabilit} to shine in beauty competitions, nor t  
o penalize a man for losing in a race against an airplane.4  
One of the pleasures of the article is to see how far Turing traced out e  
ac

640

line of thought, usually turning up a seeming contradiction at some stage   
and, by refining his c oncepts, resolving it at a deeper level of a  
nalysis. Because of this depth of penetration into the issues, the article still s  
hines after nearly thirty years of tremendous progress in computer d  
evelopment and intensive work in AI. In the following short excerpt you can see s  
ome of this rich back-and-forth working of i  
deas: The game may perhaps be criticized on the ground that the odds are weighted too heavily against the machine. If the man were to try to pretend to be t  
he machine he would clearly make a very poor showing. He would be given a  
way at once by slowness and inaccuracy in arithmetic. May not machines carry o  
ut something which ought to be described as thinking but which is very differe  
nt from what a man does? This objection is a very strong one, but at least we c  
an say that if, nevertheless, a machine can be constructed to play the i  
mitation game satisfactorily, we need not be troubled by this obj  
ection. It might be urged that when playing the "imitation game" the best strategy   
for the machine may possibly be something other than imitation of t  
he behaviour of a man. This may be, but I think it is unlikely that there is any g  
reat effect of this kind. In any case there is no intention to investigate here t  
he theory of the game, and it will be assumed that the best strategy is to try t  
o provide answers that would naturally be given by a man.5  
Once the test has been proposed and discussed, Turing r  
emarks: The original question "Can machines think?" I believe to be too m  
eaningless to deserve discussion. Nevertheless, I believe that at the end of the century the   
use of words and general educated opinion will have altered so much that o  
ne will be able to speak of machines thinking without expecting to be contradicted.  
6

640

Turing Anticipates O  
bjection

640

Aware of the storm of opposition that would undoubtedly greet this opinion, he then proceeds to pick apart, concisely and with wry humor, a s  
eries of objections to the notion that machines could think. Below I list the n  
ine types of objections he counters, using his own descriptions of them.  
7 Unfortunately there is not space to reproduce the humorous and i  
ngenious responses he formulated. You may enjoy pondering the objections yourself, and figuring out your own r  
esponses. ( 1)The Theological Objection. Thinking is a function of man's immortal s  
oul.God has given an immortal soul to every man and woman, but not to a  
nyother animal or to machines. Hence no animal or machine l:an t  
hink.(2) The "Heads in the Sand" Objection. The consequences of machines t  
hinkingwould be too dreadful. Let us hope and believe that they cannot do so  
.(3) The Mathematical Objection. [This is essentially the Lucas argument.  
]( 4)The Argument from Consciousness. "Not until a machine can write a s  
onnetor compose a concerto because of thoughts and emotions felt, and not b  
ythe chance fall of symbols, could we agree that machine equals brainthat is, not only write it but know that it had written it. No m  
echanis

641

could feel (and not merely artificially signal, an easy contrivance) pleasure at its successes, grief when its valves fuse, be warmed by flattery, b  
e made miserable by its mistakes, be charmed by sex, be angry or depressed when it cannot get what it wants." [ A quote from a c  
ertain Professor Jeffer  
son.] Turing is quite concerned that he should answer this serious objection i  
n full detail. Accordingly, he devotes quite a bit of space to his answer, and i  
n it he offers another short hypothetical d ialogue:8  
Interrogator: In the first line of your sonnet which reads "Shall I c  
ompare thee to a summer's day", would not "a spring day" do as well or bette  
r? Witness: It wouldn't s  
can. Interrogator: How about "a winter's day"? That would scan all r  
ight. Witness: Yes, but nobody wants to be compared to a winter's d  
ay. Interrogator: Would you say Mr. Pickwick reminded you of Chris  
tmas? Witness: In a w  
ay. Interrogator: Yet Christmas is a winter's day, and I do not think Mr. P  
ickwick would mind the c  
omparison. Witness: I don't think you're serious. By a winter's day one means a typ  
ical winter's day, rather than a special one like Chris  
tmas. After this dialogue, Turing asks, "What would Professor Jefferson say i  
f the sonnet-writing machine was able to answer like this in the viva voc  
e?" Further objectio  
ns: ( 5)Arguments from Various Disabilities. These arguments take the form, "  
Igrant you that you can make machines do all the things that you h  
avementioned but you will never be able to make one to do X." N  
umerousfeatures X are suggested in this connection. I offer a select  
ion:Be kind, resourceful, beautiful, friendly, have initiative, have a sense o  
fhumor, tell right from wrong, make mistakes, fall in love, enjoy strawberries and cream, make someone fall in love with it, learn from experience, use words properly, be the subject of its own thought, have as  
much diversity of behaviour as a man, do something really new.  
(6) Lady Lovelace's Objection. Our most detailed information of B  
abbage'sAnalytical Engine comes from a memoir by Lady Lovelace. In it s  
hestates, "The Analytical Engine has no pretensions to originate anything. I  
tcan do whatever we know how to order it to perform" (her italics)  
.( 7)Argument from Continuity in the Nervous System. The nervous system i  
scertainly not a discrete state machine. A small error in the i  
nformationabout the size of a nervous impulse impinging on a neuron may make a  
large difference to the size of the outgoing impulse. It may be a  
rguedthat, this being so, one cannot expect to be able to mimic the behavi  
ourof the nervous system with a discrete state s  
ystem.(8) The Argument from Informality of Behaviour. It seems to run something l  
ikethis. "If each man had a definite set of rules of conduct by which h  
eregulated his life he would be no better than a machine. But there are n  
osuch rules, so men cannot be machines.  
"( 9)The Argument from Extra-Sensory Perception. Let us play the i  
mitationgame, using as witnesses a man who is good as a telepathic receiver, and a  
digital computer. The interrogator can ask such questions as "What s  
ui

642

does the card in my right hand belong to?" The man by telepathy o  
r clairvoyance gives the right answer 130 times out of 400 cards. T  
he machine can only guess at random, and perhaps get 104 right, so t  
he interrogator makes the right identification.

642

As you can see, many of the objections overlap and are related to e  
ach other. I have attempted in this book to answer most of them in some way o  
r other, usually far less concisely than Turing d

642

Objection (9) I find remarkable. I have seen the Turing paper reprinted in a book-but with objection (9) omitted-which I find e  
qually remarkable. My own point of view-contrary to Turing's-is that ESP d  
oes not exist. Turing was reluctant to accept the idea that ESP is real, but did so   
nonetheless, being compelled by his outstanding scientific integrity to accept the consequences of what he viewed as powerful statistical evidence in   
favor of ESP. I disagree, though I consider it an exceedingly complex a  
nd fascinating q

642

"Parry Encounters the D  
octo

642

In the Dialogue preceding this Chapter, you have seen an authentic exchange between a computer program and a human. Now there have b  
een many programs with less ability to "converse" than SHRDLU. Two r  
ather famous ones are "Doctor", created by Joseph Weizenbaum, and "  
Parry", created by Kenneth Colby. The former is supposed to simulate a psychiatrist using "nondirective therapy", the latter to simulate the belief str  
ucture of a paranoid. An amusing head-on collision between the two p  
rograms was arranged over a computer network, and the following is a short e  
xcerpt from the full transcript :9  
Parry: I don't understand your m  
otives. Doctor: Why don't you understand my motives?  
Parry: Shouldn't I be?   
Doctor: Why do you say that just n  
ow? Parry: That's just the way it i  
s. Doctor: Suppose that's just the way it were n  
ot. Parry: S  
o? Doctor: I am not sure I understand you ful  
ly. Parry: You harp on the same questions too m  
uch. Doctor: What does that similarity suggest to y  
ou? Parry: I don't get y  
ou. Doctor: Do you wish that you did get I  
? Parry: It's about time you showed some interest in my feel  
ings. Doctor: Oh? I showed some interest in your f  
eeling

642

These programs, of course, were made to talk to humans, so they a  
re shown up rather poorly here, pitted against each other. Mostly they rely o  
n shrewd guesses as to the nature of the input (which they analyze q  
uite shallowly) and spit back canned answers that have been carefully s  
elected from a large repertoire. The answer may be only partially canned: for   
example, a template with blanks that can be filled in. It is assumed that t  
hei

643

human partners will read much more into what they say than is a  
ctually underlying it. And in fact, according to Weizenbaum, in his book C  
omputer Power and Human Reason, just that happens. He w  
rites: ELIZA [ the program from which Doctor was made] created the most remarkable illusion of having understood in the minds of the many people w  
ho conversed with it. . .. They would often demand to be permitted to c  
onverse with the system in private, and would, after conversing with it for a t  
ime, insist, in spite of my explanations, that the machine really understood t hem.1  
0Given the above excerpt, you may find this incredible. Incredible, but t  
rue. Weizenbaum has an e  
xplanation: Most men don't understand computers to even the slightest degree. So, u  
nless they are capable of very great skepticism (the kind we bring to bear w  
hile watching a stage magician), they can explain the computer's intellectual f  
eats only by bringing to bear the single analogy available to them, that is, t  
heir model of their own capacity to think. No wonder, then, that they o  
vershoot the mark; it is truly impossible to imagine a human who could imitate E  
LIZA, for example, but for whom ELIZA's language abilities were his limit. 1  
1Which amounts to an admission that this kind of program is based on a  
shrewd mixture of bravado and bluffing, taking advantage of people'  
s g ullibility.

643

In light of this weird "ELIZA-eff  
ect", some people have suggested t  
hat the Turing test needs revision, since people can apparently be fooled b  
y simplistic gimmick ry. It has been suggested that the interrogator should be   
a Nobel Prize-winning scientist. It might be more advisable to turn t  
he Turing test on its head, and insist that the interrogator should be a  
nother computer. Or perhaps there should be two interrogators-a human and a  
computer-and one witness, and the two interrogators should try to fi  
gure out whether the witness is a human or a compute

643

In a more serious vein, I personally feel that the Turing test, as   
originally proposed, is quite reasonable. As for the people who Weizenbaum claims were sucked in by ELIZA, t1'ey were not urged to be s  
keptical, or to use all their wits in trying to determine if the "person" typing to t  
hem were human or not. I think that Turing's insight into this issue was s  
ound, and that the Turing test, essentially unmodified, will sur  
viv

643

A Brief History of A  

643

I would like in the next few pages to present the story, perhaps from a  
n unorthodox point of view, of some of the efforts at unraveling the algorithms behind intelligence; there have been failures and setbacks a  
nd there will continue to be. Nonetheless, we are learning a great deal, and it i  
s an exciting p

643

Ever since Pascal and Leibniz, people have dreamt of machines t  
hat could perform intellectual tasks. In the nineteenth century, Boole and D  
e Morgan devised "laws of thought"-essentiall y the P  
ropositiona

644

Calculus-and thus took the first step towards AI software; also Char  
les Babbage designed the first "calculating engine"-the precursor to t  
he hardware of computers and hence of AI. One could define AI as c  
oming into existence at the moment when mechanical devices took over any t  
asks previously performable only by human minds. It is hard to look back a  
nd imagine the feelings of those who first saw toothed wheels p  
erforming additions and multiplications of large numbers. Perhaps they experien  
ced a sense of awe .at seeing "thoughts" flow in their very physical hardware. I  
n any case, we do know that nearly a century later, when the first e  
lectronic computers were constructed, their inventors did experience an awe  
some and mystical sense of being in the presence of another kind of "  
thinking being". To what extent real thought was taking place was a source of m  
uch puzzlement; and even now, several decades later, the question remains a  
great source of stimulation and vitriolics.

644

It is interesting that nowadays, practically no one feels that sense o  
f awe any longer-even when computers perform operations that are incredibly more sophisticated than those which sent thrills down spines in t  
he early days. The once-exciting phrase "Giant Electronic Brain" remains o  
nly as a sort of "camp" cliche, a ridiculous vestige of the era of Flash G  
ordon and Buck Rogers. It is a bit sad that we become blase so q  
uickl

644

There is a related "Theorem" about progress in Al: once some m  
ental function is programmed, people soon cease to consider it as an e  
ssential ingredient of "real thinking". The ineluctable core of intelligence is a  
lways in that next thing which hasn't yet been programmed. This "Theorem" w  
as first proposed to me by Larry Tesler, so I call it Tester's Theorem: "AI is   
whatever hasn't been done yet

644

A selective overview of AI is furnished below. It shows several d  
omains in which workers have concentrated their efforts, each one seeming in i  
ts own way to require the quintessence of intelligence. With some of t  
he domains I have included a breakdown according to methods employed, or   
more specific areas of concentr  
ation. mechanical tra  
nslation direct (dictionary look-up with some word rearrangeme  
nt) indirect (via some intermediary internal l  
anguage) game p  
laying c  
hess with brute force look-  
ahead with heuristically pruned l  
ook-ahead with no look-ahe  
ad c  
heckers g  
o k  
alah bridge (bidding; p  
laying) p  
oker variations on tic-tac-t  
oe e

645

proving theorems in various parts of m  
athematics symbolic l  
ogic "resolution" theorem-pr  
oving elementary g  
eometry symbolic manipulation of mathematical expr  
essions symbolic i  
ntegration algebraic s  
implification summation of infinite s  
eries v  
ision printed matte  
r: recognition of individual hand-printed characters d  
rawn from a small class (e.g., n  
umerals) reading text in variable f  
onts reading passages in h  
andwriting reading Chinese or Japanese printed characters   
reading Chinese or Japanese handwritten c  
haracters p  
ictorial: h  
earing locating prespecified objects in p  
hotographs decomposition of a scene into separate o  
bjects identification of separate objects in a s  
cene recognition of objects portrayed in sketches by people   
recognition of human fa  
ces understanding spoken words drawn from a limited vocabulary (e.g., names of the ten d  
igits) understanding continuous speech in fixed d  
omains finding boundaries between p  
honemes identifying p  
honemes finding boundaries between morphem  
es identifying morpheme  
s putting together whole words and s  
entences understanding natural l  
anguages answering questions in specific d  
omains parsing complex s  
entences making paraphrases of longer pieces of t  
ext using knowledge of the real world in order to u  
nderstand p  
assages resolving ambiguous referenc  
es producing natural l  
anguage abstract poetry (e.g., h  
aiku) random sentences, paragraphs, or longer pieces of t  
ext producing output from internal representation of k  
nowledg

646

creating original thoughts or works of a  
rt poetry writing (  
haiku) story w  
riting computer a  
rt musical c  
omposition a  
tonal t  
onal analogical t  
hinking geometrical shapes ("intelligence t  
ests") constructing proofs in one domain of mathematics based o  
n those in a related d  
omain l  
earning adjustment of param  
eters concept f  
ormatio

646

Mechanical Translatio  

646

Many of the preceding topics will not be touched upon in my s  
elective discussion below, but the list would not be accurate without them. The fi  
rst few topics are listed in historical order. In each of them, early efforts fe  
ll short of expectations. For example, the pitfalls in mechanical trans  
lation came as a great surprise to many who had thought it was a near  
ly straightforward task, whose perfection, to be sure, would be arduous, but   
whose basic implementation should be easy. As it turns out, translation i  
s far more complex than mere dictionary look-up and word r  
earranging. Nor is the difficulty caused by a lack of knowledge of idiomatic p  
hrases. The fact is that translation involves having a mental model of the w  
orld being discussed, and manipulating symbols in that model. A p  
rogram which makes no use of a model of the world as it reads the passage will s  
oon get hopelessly bogged down in ambiguities and multiple meanings. E  
ven people-who have a huge advantage over computers, for they come f  
ully equipped with an understanding of the world-when given a piece of text  
and a dictionary of a language they do not know, find it next to impossib  
le to translate the text into their own language. Thus-and it is not s  
urprising in retrospect-the first problem of AI led immediately to the issues at t  
he heart of A

646

Computer Che  
s

646

Computer chess, too, proved to be much more difficult than the e  
arly intuitive estimates had suggested. Here again it turns out that the w  
ay humans represent a chess situation in their minds is far more complex than   
just knowing which piece is on which square, coupled with knowledge o  
f the rules of chess. It involves perceiving configurations of several r  
elated pieces, as well as knowledge of heuristics, or rules of thumb, which pertain t  

647

such higher-level chunks. Even though heuristic rules are not rigorous i  
n the way that the official rules are, they provide shortcut insights into what i  
s going on on the board, which knowledge of the official rules does not. T  
his much was recognized from the start; it was simply underestimated h  
ow large a role the intuitive, chunked understanding of the chess world p  
lays in human chess skill. It was predicted that a program having some b  
asic heuristics, coupled with the blinding speed and accuracy of a computer t  
o look ahead in the game and analyze each possible move, would easily b  
eat top-flight human players-a prediction which, even after twenty-five y  
ears of intense work by various people, still is far from being realize  

647

People are nowadays tackling the chess problem from various angles.  
One of the most novel involves the hypothesis that looking ahead is a s  
illy thing to do. One should instead merely look at what is on the board a  
t present, and, using some heuristics, generate a plan, and then find a m  
ove which advances that particular plan. Of course, rules for the formulation o  
f chess plans will necessarily involve heuristics which are, in some sense,  
"flattened" versions of looking ahead. That is, the equivalent of m  
any games' experience of looking ahead is "squeezed" into another form w  
hich ostensibly doesn't involve looking ahead. In some sense this is a game o  
f words. But if the "flattened" knowledge gives answers more efficiently t  
han the actual look-ahead-even if it occasionally m isleads-then s  
omething has been gained. Now this kind of distillation of knowledge into m  
ore highly usable forms is just what intelligence excels at-so look-ahead-le  
ss chess is probably a fruitful line of research to push. Particularly int  
riguing would be to devise a program which itself could convert knowledge gaine  
d from looking ahead into "flattened" rules-but that is an immense tas  

647

Samuel's Checker P  
rogra

647

As a matter of fact, such a method was developed by Arthur Samuel in h  
is admirable checker-playing program. Samuel's trick was to use both dyn  
amic (look-ahead) and static (no-look-ahead) ways of evaluating any given b  
oard position. The static method involved a simple mathematical function o  
f several quantities characterizing any board position, and thus could b  
e calculated practically instantaneously, whereas the dynamic e  
valuation method involved creating a "tree" of possible future moves, responses t  
o them, responses to the responses, and so forth (as was shown in Fig. 38). I  
n the static evaluation function there were some parameters which c  
ould vary; the effect of varying them was to provide a set of different p  
ossible versions of the static evaluation function. Samuel's strategy was to select, i  
n an evolutionary way, better and better values of those parameters.

647

Here's how this was done: each time time the program evaluated a  
board position, it did so both statically and dynamically. The answer g  
otten by looking ahead-let us call it D-wa� used in determining the move to b  
e made. The purpose of S, the static evaluation, was trickier: on each m  
ove, the variable parameters were readjusted slightly so that S approximated D

648

as accurately as possible. The effect was to partially encode in the values o  
f the static evalution's parameters the knowledge gained by dynamic  
ally searching the tree. In short, the idea was to "flatten" the complex dyna  
mic evaluation method into the much simpler and more efficient static evaluation functi

648

There is a rather nice recursive effect here. The point is that t  
he dynamic evaluation of any single board position involves looking ahead a  
finite number of moves-say seven. Now each of the scads of board positions which might turn up seven turns down the road has to be i  
tself evaluated somehow as well. But when the program evaluates these positions, it certainly cannot look another seven moves ahead, lest it have t  
o look fourteen positions ahead, then twenty-one, etc., etc.-an infinite regress. Instead, it relies on static evaluations of positions seven moves a  
head. Therefore, in Samuel's scheme, an intricate sort of feedback takes p  
lace, wherein the program is constantly trying to "flatten" look-ahead e  
valuation into a simpler static recipe; and this recipe in turn plays a key role in the  
dynamic look-ahead evaluation. Thus the two are intimately linked together, and each benefits from improvements in the other in a r  
ecursive w  
a

648

The level of play of the Samuel checkers program is extremely high: o  
f the order of the top human players in the world. If this is so, why not a  
pply the same techniques to chess? An international committee, convened i  
n 1961 to study the feasibility of computer chess, including the Dutch International Grandmaster and mathematician Max Euwe, came to the b  
leak conclusion that the Samuel technique would be approximately one m  
illion times as difficult to implement in chess as in checkers, and that seems to   
close the book on that.

648

The extraordinarily great skill of the checkers program cannot b  
e taken as saying "intelligence has been achieved"; yet it should not b  
e minimized, either. It is a combination of insights into what checkers is, h  
ow to think about checkers, and how to program. Some people might feel tha  
t all it shows is Samuel's own checkers ability. But this is not true, for at l  
east two reasons. One is that skillful game players choose their moves a  
ccording to mental processes which they do not fully understand-they use the  
ir intuitions. Now there is no known way that anyone can bring to light all o  
f his own intuitions; the best one can do via introspection is to use "fee  
ling" or "meta-intuition"-an intuition about one's intuitions-as a guide, and   
try to describe what one thinks one's intuitions are all about. But this w  
ill only give a rough approximation to the true complexity of int  
uitive methods. Hence it is virtually certain that Samuel has not mirrored his o  
wn personal methods of play in his program. The other reason that Samu  
el's program's play should not be confused with Samuel's own play is t  
hat Samuel does not play checkers as well as his program-it beats him. This i  
s not a paradox at all-no more than is the fact that a computer which h  
as been programmed to calculate 1r can outrace its programmer in s  
pewing forth digits of 1

649

When Is a Program Origin

649

This issue of a program outdoing its programmer is connected with t  
he question of "originality" in Al. What if an AI program comes up with a  
n idea, or a line of play in a game, which its programmer has n  
ever entertained-who should get the credit? There are various i  
nteresting instances of this having happened, some on a fairly trivial level, some on a  
rather deep level. One of the more famous involved a program to fi  
nd proofs of theorems in elementary Euclidean geometry, written by E  
. Gelernter. One day the program came up with a sparklingly i  
ngenious proof of one of the basic theorems of geometry-the so-called "po  
ns asinorum", or "bridge of a

649

This theorem states that the base angles of an isosceles triangle a  
re equal. Its standard proof requires constructing an altitude which div  
ides the triangle into symmetrical halves. The elegant method found by t  
he program (see Fig. 114) used no construction lines. Instead, it c  
onsidere

649

FIGURE I 14. Pons Asinorum Proof  
(found by Pappus [ -300 A.D. ] a  
nd Gelernter's program [ -1960 A.D. ]). Problem: To show that the base angles of a  
n isosceles triangle are equal. Solution: As th  
e triangle is isosceles, AP and AP' are o  
f equal length. Therefore triangfRs PAP' a  
nd P'AP are congruent (side-side-side). T  
his implies that corresponding angfRs are e  
qual. In particular, the two base angles are e  
qua

649

the triangle and its mirror image as two different triangles. Then, h  
aving proved them congruent, it pointed out that the two base angles m  
atched each other in this congruence-QED.

649

This gem of a proof delighted the program's creator and others; some   
saw evidence of genius in its performance. Not to take anything away f  
rom this feat, it happens that in A.D. 300 the geometer Pappus had a  
ctually found this proof, too. In any case, the question remains: "Who gets t  
he credit?" Is this intelligent behavior? Or was the proof lying deeply h  
idden within the human (Gelernter), and did the computer merely bring it to t  
he surface? This last question comes close to hitting the mark. We can turn it   
around: Was the proo flying deeply hidden in the program? Or was it c  
lose to the surface? That is, how easy is it to see why the program did what i  
t did? Can the discovery be attributed to some simple mechanism, or simp  
le combination of mechanisms, in the program? Or was there a c  
omplex interaction which, if one heard it explained, would not diminish one's a  
we at its having h

649

It seems reasonable to say that if one can ascribe the performance to   
certain operations which are easily traced in the program, then in s  
ome sense the program was just revealing ideas which were in essence hiddenthough not too deeply-inside the programmer's own mind. Conversely, i  

650

following the program does not serve to enlighten one as to why t  
his particular discovery popped out, then perhaps one should begin to separate the program's "mind" from that of its programmer. The human g  
ets credit for having invented the program, but not for having had inside h  
is own head the ideas produced by the program. In such cases, the h  
uman can be referred to as the "meta-author"-the author of the author of t  
he result, and the program as the (just plain) a

650

In the particular case of Gelernter and his geometry machine, w  
hile Gelernter probably would not have rediscovered Pappus' proof, still t  
he mechanisms which generated that proof were sufficiently close to t  
he surface of the program that one hesitates to call the program a geometer i  
n its own right. If it had kept on astonishing people by coming up w  
ith ingenious new proofs over and over again, each of which seemed to b  
e based on a fresh spark of genius rather than on some standard m  
ethod, then one would have no qualms about calling the program a g  
eometer-but this did not h  
appe

650

Who Composes Computer M  
usi

650

The distinction between author and meta-author is sharply pointed up i  
n the case of computer composition of music. There are various levels o  
f autonomy which a program may seem to have in the act of c  
omposition. One level is illustrated by a piece whose "meta-author" was Max Mathews o  
f Bell Laboratories. He fed in the scores of the two marches "When J  
ohnny Comes Marching Home" and "The British Grenadiers", and instructed t  
he computer to make a new score--one which starts out as "Johnny", b  
ut slowly merges into "Grenadiers". Halfway through the piece, "Johnny" i  
s totally gone, and one hears "Grenadiers" by itself ... Then the process i  
s reversed, and the piece finishes with "Johnny", as it began. In Mathew  
s' own words, this is   
... a nauseating musical experience but one not without interest, particu  
larly in the rhythmic conversions. "The Grenadiers" is written in 2/4 time in t  
he key of F major. "Johnny" is written in 6/8 time in the key of E minor. T  
he change from 2/4 to 6/8 time can be clearly appreciated, yet would be q  
uite difficult for a human musician to play. The modulation from the key of F   
major to E minor, which involves a change of two notes in the scale, is j  
arring, and a smaller transition would undoubtedly have been a better c hoice.1  
2 The resulting piece has a somewhat droll quality to it, though in spots it i  
s turgid and c  
onfused. Is the computer composing? The question is best unasked, but it cannot b  
e completely ignored. An answer is difficult to provide. The algorithms a  
re deterministic, simple, and understandable. No complicated or hard-tounderstand computations are involved; no "learning" programs are used; n  
o random processes occur; the machine functions in a perfectly mechanical a  
nd straightforward manner. However, the result is sequences of sound that a  
re unplanned in fine detail by the composer, even though the over-all s  
tructur

651

of the section is completely and precisely specified. Thus the composer is   
often surprised, and pleasantly surprised, at the details of the realization o  
f his ideas. To this extent only is the computer composing. We call the p  
rocess algorithmic composition, but we immediately re-emphasize that the algorithms are transparently s imple.1

651

This is Mathews' answer to a question which he would rather "una  
sk". Despite his disclaimer, however, many people find it easier to say s  
imply that the piece was "composed by a computer". I believe this phrase misrepresents the situation totally. The program contained no structures   
analogous to the brain's "symbols", and could not be said in any sense to b  
e "thinking" about what it was doing. To attribute the composition of such a  
piece of music to the computer would be like attributing the authorship o  
f this book to the computerized automatically (often incorrectly) hyphenating phototypesetting machine with which it was s

651

This brings up a quest10n which is a slight digression from AI, b  
ut actually not a huge one. It is this: When you see the word "I" or "me" in a  
text, what do you take it to be referring to? For instance, think of t  
he phrase "WASH ME" which appears occasionally on the back of dirty t  
rucks. Who is this "me"? Is this an outcry of some forlorn child who, in desperation to have a bath, scribbled the words on the nearest surface? Or is t  
he truck requesting a wash? Or, perhaps, does the sentence itself wish to b  
e given a shower? Or, is it that the filthy English language is asking to b  
e cleansed? One could go on and on in this game. In this case, the phrase is a  
joke, and one is supposed to pretend, on some level, that the truck i  
tself wrote the phrase and is requesting a wash. On another level, one clear  
ly recognizes the writing as that of a child, and enjoys the humor of t  
he misdirection. Here, in fact, is a game based on reading the "me" at t  
he wrong l

651

Precisely this kind of ambiguity has arisen in this book, first in t  
he C ontracrostipunctus, and later in the discussions of Godel's string G (and i  
ts relatives). The interpretation given for unplayable records was "I Canno  
t Be Played on Record Player X", and that for unprovable statements was, "  
I Cannot Be Proven in Formal System X". Let us take the latter sentence. O  
n what other occasions, if any, have you encountered a sentence c  
ontaining the pronoun "I" where you automatically understood that the r  
eference was not to the speaker of the sentence, but rather to the sentence itsel  
f? Very few, I would guess. The word "I", when it appears in a S  
hakespeare sonnet, is referring not to a fourteen-line form of poetry printed on a p  
age, but to a flesh-and-blood creature behind the scenes, somewhere off s  
tag

651

How far back do we ordinarily trace the "I" in a sentence? The a  
nswer, it seems to me, is that we look for a sentient being to attach the a  
uthorship to. But what is a sentient being? Something onto which we can m  
ap ourselves comfortably. In Weizenbaum's "Doctor" program, is there a  
personality? If so, whose is it? A small debate over this very q  
uestion recently raged in the pages of Science m

651

This brings us back to the issue of the "who" who composes c  
omputer music. In most circumstances, the driving force behind such pieces is a

652

human intellect, and the computer has been employed, with more or l  
ess ingenuity, as a tool for realizing an idea devised by the human. The program which carries this out is not anything which we can identify with. It i  
s a simple and single-minded piece of software with no flexibility, n  
o perspective on what it is doing, and no sense of self. If and when, h  
owever, people develop programs which have those attributes, and pieces of m  
usic start issuing forth from them, then I suggest that will be the appro  
priate time to start splitting up one's admiration: some to the programmer f  
or creating such an amazing program, and some to the program itself for i  
ts sense of music. And it seems to me that that will only take place when t  
he internal structure of such a program is based on something similar to t  
he "symbols" in our brains and their triggering patterns, which are resp  
onsible for the complex notion of meaning. The fact of having this kind of i  
nternal structure would endow the program with properties which would make u  
s feel comfortable in identifying with it, to some extent. But until then, I w  
ill not feel comfortable in saying "this piece was composed by a c  
ompute

652

Theorem Proving and Problem Reduc  
tio

652

Let us now return to the history of AI. One of the early things which p  
eople attempted to program was the intellectual activity of theorem p  
roving. Conceptually, this is no different from programming a computer to l  
ook for a derivation of MU in the MIU-system, except that the formal s  
ystems involved were often more complicated than the MIU-system. They were   
versions of the Predicate Calculus, which is an extension of the Propositional Calculus involving quantifiers. Most of the rules of the Pre  
dicate Calculus are included in TNT, as a matter of fact. The trick in writing s  
uch a program is to instill a sense of direction, so that the program does n  
ot wander all over the map, but works only on "relevant" pathways-th  
ose which, by some reasonable criterion, seem to be leading towards the desired s

652

In this book we have not dealt much with such issues. How indeed c  
an you know when you are proceeding towards a theorem, and how can y  
ou tell if what you are doing is just empty fiddling? This was one thing which I  
hoped to illustrate with the MU-puzzle. Of course, there can be no definitive answer: that is the content of the limitative Theorems, since if y  
ou could always know which way to go, you could construct an algorithm f  
or proving any desired theorem, and that would violate Church's T  
heorem. There is no such algorithm. (I will leave it to the reader to see exactly w  
hy this follows from Church's Theorem.) However, this doesn't mean that it i  
s impossible to develop any intuition at all concerning what is and what is n  
ot a promising route; in fact, the best programs have very s  
ophisticated heuristics, which enable them to make deductions in the Predicate C  
alculus at speeds which are comparable to those of capable h  
uman

652

The trick in theorem proving is to to use the fact that you have a  
n overall goal-namely the string you want to produce-in guiding y  
ou locally. One technique which was developed for converting global g  
oal

653

into local strategies for derivations is called problem reduction. It is based on   
the idea that whenever one has a long-range goal, there are usually s  
ubgoals whose attainment will aid in the attainment of the main goal. Therefore i  
f one breaks up a given problem into a series of new subproblems, t  
hen breaks those in turn into subsubproblems, and so on, in a recursive fash  
ion, one eventually comes down to very modest goals which can presumably b  
e attained in a couple of steps. Or at least so it would seem

653

PrQblem reduction got Zeno into hot water. Zeno's method, you r  
ecall, for getting from A to B (think of B as the goal), is to "reduce" the p  
roblem into two subproblems: first go halfway, then go the rest of the way. So n  
ow you have "pushed"-in the sense of Chapter V-two subgoals onto y  
our "goal stack". Each of these, in turn, will be replaced by two subsubgoalsand so on ad infinitum. You wind up with an infinite goal-stack, instead of a  
single goal (Fig. 1 15). Popping an infinite number of goals off your s  
tack will prove to be tricky-which is just Zeno's point, of c  
ours

653

Another example of an infinite recursion in problem reduction occurred in the Dialogue Little Harmonic Labyrinth, when Achilles wanted to h  
ave a Typeless Wish granted. Its granting had to be deferred until p  
ermission was gotten from the Meta-Genie; but in order to get permission to g  
ive permission, she had to summon the Meta-Meta-Genie-and so on. Despit  

653

FIGURE 115. Zeno's endless goal t ree,for getting from A to B .

654

the infiniteness of the goal stack, Achilles got his wish. Problem r  
eduction wins the day

654

Despite my mockery, problem reduction is a powerful technique f  
or converting global problems into local problems. It shines in certain situations, such as in the endgame of chess, where the look-ahead t  
echnique often performs miserably, even when it is carried to ridiculous l  
engths, such as fifteen or more plies. This is because the look-ahead technique i  
s not based on planning; it simply has no goals and explores a huge n  
umber of pointless alternatives. Having a goal enables you to develop a strategy f  
or the achievement of that goal, and this is a completely different p  
hilosophy from looking ahead mechanically. Of course, in the look-ahead t  
echnique, desirability or its absence is measured by the evaluation function for positions, and that incorporates indirectly a number of goals, principally that o  
f not getting checkmated. But that is too indirect. Good chess players w  
ho play against look-ahead chess programs usually come away with the impression that their opponents are very weak in formulating plans o  
r s

654

Shandy and the B  
on

654

There is no guarantee that the method of problem reduction will wor  
k. There are many situations where it flops. Consider this simple problem, f  
or instance. You are a dog, and a human friend has just thrown your f  
avorite bone over a wire fence into another yard. You can see your bone t  
hrough the fence,just lying there in the grass-how luscious! There is an open g  
ate in the fence about fifty feet away from the bone. What do you do? S  
ome dogs will just run up to the fence, stand next to it, and b ark; others will d  
ash up to the open gate and double back to the lovely bone. Both dogs can b  
e said to be exercising the problem reduction technique; however, t  
hey represent the problem in their minds in different ways, and this makes a  
ll the difference. The barking dog sees the subproblems as (1) running to t  
he fence, (2) getting through it, and (3) running to the bone-but that s  
econd subproblem is a "toughie", whence the barking. The other dog sees t  
he subproblems as (1) getting to the gate; (2) going through the gate; (  
3) running to the bone. Notice how everything depends on the way y  
ou represent the "problem space"-that is, on what you perceive as red  
ucing the problem (forward motion towards the overall goal) and what y  
ou perceive as magnifying the problem (backward motion away from the g  
oa

654

Changing the Problem Spac  

654

Some dogs first try running directly towards the bone, and when t  
hey encounter the fence, something clicks inside their brain; soon they c  
hange course, and run over to the gate. These dogs realize that what on firs  

655

glance seemed as if it would increase the distance between the initial situation and the desired situation-na mely, running away from the bone but   
towards the open gate-actually would decrease it. At first, they c  
onfuse physical distance with problem distance. Any motion away from the b  
one seems, by definition, a Bad Thing. But then-somehow-they realize that   
they can shift their perception of what will bring them "closer" to the b  
one. In a properly chosen abstract space, moving towards the gate is a traj  
ectory bringing the dog closer to the bone! At every moment, the dog is g  
etting "closer"-in the new sense-to the bone. Thus, the usefulness of pro  
blem reduction depends on how you represent your problem mentally. What i  
n one space looks like a retreat can in another space look like a revolutionar  
y step forward.

655

In ordinary life, we constantly face and solve variations on the dogand-bone problem. For instance, if one afternoon I decide to drive o  
ne hundred miles south, but am at my office and have ridden my bike to wor  
k, I have to make an extremely large number of moves in what are o  
stensibly "wrong" directions before I am actually on my way in car headed south. I   
have to leave my office, which means, say, heading east a few feet; t  
hen follow the hall in the building which heads north, then west. Then I r  
ide my bike home, which involves excursions in all the directions of the compass; and I reach my home. A succession of short moves there eventu  
ally gets me into my car, and I am off. Not that I immediately drive due s  
outh, of course-I choose a route which may involve some excursions north,  
west, or east, with the aim of getting to the freeway as quickly as p  
ossibl

655

All of this doesn't feel paradoxical in the slightest; it is done w  
ithout even any sense of amusement. The space in which physical backtracking i  
s perceived as direct motion towards the goal is built so deeply into my m  
ind that I don't even see any irony when I head north. The roads and hall  
ways and so forth act as channels which I accept without much fight, so that p  
art of the act of choosing how to perceive the situation involves just a  
ccepting what is imposed. But dogs in front of fences sometimes have a hard t  
ime doing that, especially when that bone is sitting there so close, staring t  
hem in the face, and looking so good. And when the problem space is just a  
shade more abstract than physical space, people are often just as lacking i  
n insight about what to do as the barking d

655

In some sense all problems are abstract versions of the dog-and-  
bone problem. Many problems are not in physical space but in some sort o  
f conceptual space. When you realize that direct motion towards the goal i  
n that space runs you into some sort of abstract "fence", you can do one o  
f two things: (1) try moving away from the goal in some sort o fr.andom w  
ay, hoping that you may come upon a hidden "gate" through which you c  
an pass and then reach your bone; or (2) try to find a new "space" in which y  
ou can represent the problem, and in which there is no abstract fence separating you from your goal-then you can proceed straight towards the goal i  
n this new space. The first method may seem like the lazy way to go, and t  
he second method may seem like a difficult and complicated way to go. And   
yet, solutions which involve restructuring the problem space more oft  
e

656

than not come as sudden flashes of insight rather than as products of a  
series of slow, deliberate thought processes. Probably these intuitive fl  
ashes come from the extreme core of intelligence-and needless to say, t  
heir source is a closely protected secret of our jealous b

656

In any case, the trouble is not that problem reduction per se leads t  
o failures; it is quite a sound technique. The problem is a deeper one: how d  
o you choose a good internal representation for a problem? What kind o  
f "space" do you see it in? What kinds of action reduce the "distanc  
e" between you and your goal in the space you have chosen? This can b  
e expressed in mathematical language as the problem of hunting for an   
approprate metric (distance function) between states. You want to find a  
metric in which the distance between you and your goal is very sma

656

Now since this matter of choosing an internal representation is itself a  
type of problem-and a most tricky one, too-you might think of turni  
ng the technique of problem reduction back on it! To do so, you would have t  
o have a way of representing a huge variety of abstract spaces, which is a  
n exceedingly complex project. I am not aware of anyone's having tri  
ed anything along these lines. It may be just a theoretically appealing, a  
musing suggestion which is in fact wholly unrealistic. In any case, what AI s  
orely lacks is programs which can "step back" and take a look at what is going o  
n, and with this perspective, reorient themselves to the task at hand. It is o  
ne thing to write a program which excels at a single task which, when done b  
y a human being, seems to require intelligence-and it is another t  
hing altogether to write an intelligent program! It is the difference between t  
he Sphex wasp (see Chapter XI), whose wired-in routine gives the d  
eceptive appearance of great intelligence, and a human being observing a S  
phex w

656

The I-Mode and the M-Mode Again

656

An intelligent program would presumably be one which is versatile e  
nough to solve problems of many different sorts. It would learn to do each  
different one and would accumulate experience in doing so. It would b  
e able to work within a set of rules and yet also, at appropriate moments, t  
o step back and make a judgment about whether working within that set o  
f rules is likely to be profitable in terms of some overall set of goals which i  
t has. It would be able to choose to stop working within a given framework, i  
f need be, and to create a new framework of rules within which to work for a  
w  
hil

656

Much of this discussion may remind you of aspects of the MU-p  
uzzle. For instance, moving away from the goal of a problem is reminiscent o  
f moving away from MU by making longer and longer strings which y  
ou hope may in some indirect way enable you to make MU. If you are a naive  
"dog", you may feel you are moving away from your "MU-bone" w  
henever your string increases beyond two characters; if you are a more s  
ophisticated dog, the use of such lengthening rules has an indirect justification, something like heading for the gate to get your MU-b

657

Another connection between the previous discussion and the MUpuzzle is the two modes of operation which led to insight about the n  
ature of the MU-puzzle: the Mechanical mode, and the Intelligent mode. In t  
he former, you are embedded within some fixed framewor k; in the latter, y  
ou can always step back and gain an overview of things. Having an overview i  
s tantamount to choosing a representation within which to work; and working within the rules of the system is tantamount to trying the technique o  
f problem reduction within that selected framework. Hardy's comment o  
n Ramanujan's style-particularly his willingness to modify his o  
wn hypotheses-illustrates this interplay between the M-mode and the I-mo  
de in creative thought.

657

The Sphex wasp operates excellently in the M-mode, but it has absolutely no ability to choose its framework or even to alter its M-mode in t  
he slightest. It has no ability to notice when the same thing occurs over a  
nd over and over again in its system, for to notice such a thing would be t  
o jump out of the system, even if only ever so slightly. It simply does n  
ot notice the sameness of the repetitions. This idea (of not noticing t  
he identity of certain repetitive event�) is interesting when we apply it t  
o ourselves. Are there highly repetitious situations which occur in our l  
ives time and time again, and which we handle in the identical stupid way e  
ach time, because we don't have enough of an overview to perceive t  
heir sameness? This leads back to that recurrent issue, "What is sameness?" I  
t will soon come up as an AI theme, when we discuss pattern recogniti  
o

657

Applying Al to M  
athematic

657

Mathematics is in some ways an extremely interesting domain to s  
tudy from the AI point of view. Every mathematician has the sense that there is a  
kind of metric between ideas in mathematics-that all of mathematics is a  
network of results between which there are enormously many connecti  
ons. In that network, some ideas are very closely linked; others require m  
ore elaborate pathways to be joined. Sometimes two theorems in m  
athematics are close because one can be proven easily, given the other. Other times t  
wo ideas are close because they are analogous, or even isomorphic. These a  
re two different senses of the word "dose" in the domain of m  
athematics. There are probably a number of others. Whether there is an objectivity or a  
universality to our sense of mathematical closeness, or whether it is l  
argely an accident of historical development is hard to say. Some theorems o  
f different branches of mathematics appear to us hard to link, and we. might   
say that they are unrelated-but something might turn up later w  
hich forces us to change our minds. If we could instill our highly d  
eveloped sense of mathematical closeness-a "mathematician's mental metric", so t  
o speak-into a program, we could perhaps produce a primitive "  
artificial mathematician". But that depends on being able to convey a sense o  
f sir,1plicity or "naturalness" as well, which is another major stumbling bloc

657

These issues have been confronted in a number of Al projects. Ther.

658

is a collection of programs developed at MIT which go under the n  
ame " MACSYMA", whose purpose it is to aid mathematicians in symbolic manipulation of complex mathematical expressions. This program has in i  
t some sense of "where to go"-a sort of "complexity gradient" which g  
uides it from what we would generally consider complex expressions to sim  
pler ones. Part of M ACSYMA's repertoire is a program called "SIN", w  
hich does symbolic integration of functions; it is generally acknowledged to b  
e superior to humans in some categories. It relies upon a number of different skills, as intelligence in general must: a vast body of knowledge, t  
he technique of problem reduction, a large number of heuristics, and a  
lso some special t

658

Another program, written by Douglas Lenat at Stanford, had as its a  
im to invent concepts and discover facts in very elementary mathem  
atics. Beginning with the notion of sets, and a collection of notions of what i  
s "interesting" which had been spoon-fed into it, it "invented" the idea o  
f counting, then the idea of addition, then multiplication, t  
hen-among other things-the notion of prime numbers, and it went so far as t  
o rediscover Goldbach's conjecture! Of course these "discoveries" were a  
ll hundreds-even thousands--of years old. Perhaps this may be explain  
ed in part by saying that the sense of "inteFesting" was conveyed by Lenat in a  
large number of rules which may have been influenced by his twentiethcentury training; nonetheless it is impressive. The program seemed to r  
un out of steam after this very respectable performance. An interesting t  
hing about it was that it was unable to develop or improve upon its own,sense o  
f what is interesting. That seemed another level of difficulty up--or p  
erhaps several levels u

658

The Crux of Al: Representation of K  
nowledg

658

Many of the examples above have been cited in order to stress that the w  
ay a domain is represented has a huge bearing on how that domain is "understood". A program which merely printed out theorems of TNT in a  
preordained order would have no understanding of number theory; a  
program such as Lenat's with its extra layers of knowledge could be said t  
o have a rudimentary sense of number theory; and one which embeds mathematical knowledge in a wide context of real-world experience w  
ould probably be the most able to "understand" in the sense that we think we do.   
It is t his-representation of knowledge that is at the crux of A

658

In the early days it was assumed that knowledge came in sentence-  
like "packets", and that the best way to implant knowledge into a program w  
as to develop a simple way of translating facts into small passive packets o  
f data. Then every fact would simply be a piece of data, accessible to t  
he programs using it. This is exemplified by chess programs, where b  
oard positions are coded into matrices or lists of some sort and stored efficient  
ly in memory where they can be retrieved and acted upon by s  
ubroutine

658

The fact that human beings store facts in a more complicated way w  
a

659

known to psychologists for quite a while and has only recently been rediscovered by Al workers, who are now confronting the problems o  
f "chunked" knowledge, and the difference between procedural and declarative types of knowledge, which is related, as we saw in Chapter XI, t  
o the difference between knowledge which is accessible to introspection a  
nd knowledge which is inaccessible to i ntr  
ospectio

659

The nai:ve assumption that all knowledge should be coded into p  
assive pieces of data is actually c ontradicted by the most fundamental fact a  
bout computer design: that is, how to add, subtract, multiply, and so on is n  
ot coded into pieces of data and stored in memo ry; it is, in fact, represent  
ed nowhere in memory, but rather in tht· wiring patterns of the hardware. A  
pocket calculator does not store in its memory knowledge of how to add;  
that knowledge is encoded into its "guts". There is no memory location t  
o point to if somebody demands, "Show me where the knowledge of how t  
o add resides in this machine!

659

A large amount of work in AI has nevertheless gone into systems i  
n which the bulk of the knowledge is stored in specific places-that is, declaratively. It goes without saying that some knowledge has to be e  
mbodied in programs; otherwise one would not have a program at all, but merely a  
n encyclopedia. The question is how to split up knowledge between p  
rogram and data. Not that it is always easy to distinguish between program a  
nd data, by any means. I hope that was made clear enough in Chapter X  
VI. But in the development of a system, if the programmer intuitively conceives of some particular item as data (or as program), that may h  
ave significant repercussions on the system's structure, because as one programs one does tend to distinguish between data-like objects and programlike obj

659

It is important to point out that in principle, any manner of c  
oding information into data structures or procedures is as good as any other, i  
n the sense that if you are not too concerned about efficiency, what you c  
an do in one scheme, you can do in the other. However, reasons can be g  
iven which seem to indicate that one method is definitely superior to the other  
. For instance, consider the following argument in favor of using p  
rocedural representations only: "As soon as you try to encode features of suffic  
ient complexity into data, you are forced into developing what amounts to a  
new language, or formalism. So in effect your data s tructures b  
ecome program-like, with some piece of your program serving as their interpreter; you might as well represent the same information directly in p  
rocedural form to begin with, and obviate the extra level of interpretation

659

DNA and Proteins Help Give Some Perspec  
tiv

659

This argument sounds quite convincing, and yet, if interpreted a l  
ittle loosely, it can be read as an argument for the abolishment of DNA a  
nd RNA. Why encode genetic information in DNA, when by representing it   
directly in proteins, you could eliminate not just one, but two levels o  
f interpretation? The answer is: it turrn. out that it is extremely useful to h  
av

660

the same information in several different forms for different pur  
poses. One advantage of storing genetic information in the modular and d  
ata-like form of DNA is that two individuals' genes can be easily recombined t  
o form a new genotype. This would be very difficult if the information w  
ere only in proteins. A second reason for storing information in DNA is that i  
t is easy to transcribe and translate it into proteins. When it is not needed, i  
t does not take up much room; when it is needed, it serves as a t  
emplate. There is no mechanism for copying one protein off of another; t  
heir folded tertiary structures would make copying highly unwieldy. Complementarily, it is almost imperative to be able to get genetic inf  
ormation into three-dimensional structures such as enzymes, because the r  
ecognition and manipulation of molecules is by its nature a three-dimensional operation. Thus the argument for purely procedural representations is seen t  
o be quite fallacious in the context of cells. It suggests that there are advantages to being able to switch back and forth between procedural a  
nd declarative representations. This is probably true also in A

660

This issue was raised by Francis Crick in a conference on communica-tion with e xtraterrestrial intelligence:  
We see on Earth that there are two molecules, one of which is good f  
or replication [DNA] and one of which is good for action [protei ns]. ls it   
possible to devise a system in which one molecule does both jobs, or are th  
ere perhaps strong arguments, from systems analysis, which might suggest (  
if they exist) that to divide the job into two gives a great advantage? This is a   
question to which I do not know the answer.1  

660

Modularity of Know  
ledg

660

Another question which comes up in the representation of knowledge i  
s modularity. How easy is it to insert new knowledge? How easy is it to r  
evise old knowledge? How modular are books? It all depends. If from a t  
ightly structured book with many cross-references a single chapter is removed,  
the rest of the book may become virtually incomprehensible. It is like try  
ing to pull a single strand out of a spider web-you ruin the whole in doing s  
o. On the other hand, some books are quite modular, having indepen  
dent chapt

660

Consider a straightforward theorem-generating program which u  
ses TNT's axioms and rules of inference. The "knowledge" of such a p  
rogram has two aspects. It resides implicitly in the axioms and rules, and e  
xplicitly in the body of theorems which have so far been produced. Depending o  
n which way you look at the knowledge, you will see it either as modular or a  
s spread all around and completely nonmodular. For instance, suppose y  
ou had written such a program but had forgotten to include TNT's Axiom 1 i  
n the list of axioms. After the program had done many thousands of derivations, you realized your oversight, and inserted the new axiom. The f  
act that you can do so in a trice shows that the system's implicit knowledge i  
s modular; but the new axiom's c ontribution to the explicit knowledge of t  
he system will only be reflected after a long time-after its effects have "d

661

fused" outwards, as the odor of perfume slowly diffuses in a room w  
hen the bottle is broken. In that sense the new knowledge takes a long time to b  
e incorporated. Furthermore, if you wanted to go back and replace Axiom 1  
by its negation, you could not just do that by itself; you would have to d  
elete all theorems which had involved Axiom l in their derivations. Clearly this   
system's explicit knowledge is not nearly so modular as its implicit knowle

661

It would be useful if we learned how to transplant knowledge modularly. Then to teach everyone French, we would just open up their h  
eads and operate in a fixed way on t heir neural structures-then they w  
ould know how to speak French. Of course, this is only a hilarious pipe d

661

Another aspect of knowledge representation has to do with the way i  
n which one wishes to use the knowledge. Are inferences supposed to b  
e drawn as pieces of information arrive? Should analogies and c  
omparisons constantly be being made between new information and old i  
nformation? In a chess program, for instance, if you want to generate look-ahead tre  
es, then a representation which encodes board positions with a minimum o  
f redundancy will be preferable to one which repeats the information i  
n several different ways. But if you want your program to "understand" a  
board position by looking for patterns and comparing them to k  
nown patterns, then representing the same information several times over i  
n different forms will be more u

661

Representing Knowledge in a Logical F  
ormalis

661

There are various schools of thought concerning the best way to represent  
and manipulate knowledge. One which has had great influence advoc  
ates representations using formal notations similar to those for TNT  
-using propositional connectives and quantifiers. The basic operations in s  
uch representations are, not surprisingly, formalizations of deductive reasoning. Logical deductions can be made using rules of inference analogous t  
o some of those in TNT. Querying the system about some particular idea s  
ets up a goal in the form of a string to be derived. For example: "Is MU MON a  
theorem?" Then the automatic reasoning mechanisms take over in a goaloriented way, using various methods of problem r

661

For example, suppose that the proposition "All formal arithmetics a  
re incomplete" were known, and the program were queried, "Is Princi  
pia Mathematic a incomplete?" In scanning the list of known facts-often c  
alled the data base-the system might notice that if it could establish that Princi  
pia Mathematica is a formal arithmetic, then it could answer the q  
uestion. Therefore the proposition "Principia Mathematica is a formal a  
rithmetic" would be set up as a subgoal, and then problem reduction would take o  
ver. If it could find further things which would help in establishing (or r  
efuting) the goal or-the subgoal, it would work on them-and so on, recursively  
. This process is given the name of backwards chaining, since it begins with t  
he goal and works its way backwards, presumably towards things which m  
ay already be known. If one makes a graphic representation of the main g

662

subsidiary goals, subsubgoals, etc., a tree-like structure will arise, since t  
he main goal may involve several different subgoals, each of which in t  
urn involves several subsubgoals, e  
t

662

Notice that this method is not guaranteed to resolve the question, f  
or there may be no way of establishing within the system that Princip  
i,aMathematica is a formal arithmetic. This does not imply, however, t  
hat either the goal or the subgoal is a false statement-merely that they c  
annot be derived with the knowledge currently available to the system. T  
he system may print out, in such a circumstance, "I do not know" or words t  
o that effect. The fact that some questions are left open is of course similar t  
o the incompleteness from which certain well-known formal systems s

662

Deductive vs. Analogical Awarene  
s

662

This method affords a deductive awareness of the domain that is represente  
d, in that correct logical conclusions can be drawn from known facts. However, it misses something of the human ability to spot similarities and t  
o compare situations-it misses what might be called analogi.cal a  
wareness-a crucial side of human intelligence. This is not to say that analogical t  
hought processes cannot be forced into such a mold, but they do not lend themselves naturally to being captured in that kind of formalism. These d  
ays, logic-oriented systems are not so much in vogue as other kinds, which a  
llow complex forms of comparisons to be carried out rather n

662

When you realize that knowledge representation is an altogether different ball game than mere storage of numbers, then the idea that "  
a computer has the memory of an elephant" is an easy myth to e  
xplode. What is stored in memory is not necessarily synonymous with what a p  
rogram knows; for even if a given piece of knowledge is encoded somewhere i  
nside a complex system, there may be no procedure, or rule, or other type o  
f handler of data, which can get at it-it may be inaccessible. In such a c  
ase, you can say that the piece of knowledge has been "forgotten" b  
ecause access to it has been temporarily or permanently lost. Thus a c  
omputer program may "forget" something on a high level which it "remembers" o  
n a low level. This is another one of those ever-recurring level distinctions,   
from which we can probably learn much about our own selves. When a  
human forgets, it most likely means that a high-level pointer has b  
een lost-not that any information has been deleted or destroyed. This highlights the extreme importance of keeping track of the ways in which you   
store incoming experiences, for you never know in advance under what   
circumstances, or from what angle, you will want to pull something out o  
f s  
torag

662

From Computer Haiku to an RTN-G  
ramma

662

The complexity of the knowledge representation in human heads first h  
it home with me when I was working on a program to generate E  
nglish sentences "out of the blue". I had come to this project in a rather in

663

ing way. I had heard on the radio a few examples of so-called "  
Computer Haiku". Something about them struck me deeply. There was a large element of humor and simultaneously mystery to making a computer generate something which ordinarily would be considered an artistic creation. I  
was highly amused by the humorous aspect, and I was very motivated b  
y the mystery--even contradiction-of programming creative acts. So I s  
et out to write a program even more mysteriously contradictory and humorous than the haiku p

663

At first I was concerned with making the grammar flexible and recursive, so that one would not have the sense that the program was m  
erely filling in the blanks in some template. At about that time I ran across a  
Scientific American article by Victor Yngve in which he described a s  
imple but flexible grammar which could produce a wide variety of sentences o  
f the type found in some children's books. I modified some of the ideas I'd  
gleaned from that article and came up with a set of procedures w  
hich formed a Recursive Transition Network grammar, as described in Chapter   
V .In this grammar, the selection of words in a sentence was determined b  
ya process which began by selecting--at random-the overall structure o  
f the sentence; gradually the decision-making process trickled down t  
hrough lower levels of structure until the word level and the letter level w  
erereached. A lot had to be done below the word level, such as inflecting v  
erbs and making plurals of nouns; also irregular verb and noun forms were fi  
rst formed regularly, and then if they matched entries in a table, sub  
stitutions of the proper (irregular) forms were made. As each word reached its fi  
nal form, it was printed out. The program was like the proverbial monkey at a  
typewriter, but operating on several levels of linguistic struc  
ture simultaneously-not just the letter l

663

In the early stages of developing the program, I used a totally s  
illy vocabulary-deliberately, since I wa� aiming at humor. It produced a lot o  
f nonsense sentences, some of which had very complicated structures, o  
thers of which were rather short. Some excerpts are shown b  
elow: A male pencil who must laugh clumsily would quack. M  
ust program not always crunch girl at memory? The decimal b  
ug which spits clumsily might tumble. Cake who does sure take a  
n unexpected man within relationship might always dump c  
ard. Program ought run chee  
rfully. The worthy machine ought not always paste the a  
stronomer. Oh, program who ought really run off of the girl writes musician for theater. The businesslike relationship q  
uacks. The lucky girl which can always quack will never sure q  
uack. The game quacks. Professor will write pickle. A bug tumbles. Man   
takes the box who slips.   
The effect is strongly surrealistic and at times a little reminiscent o  

664

haiku-for example, the final sample of four consecutive short s  
entences. At first it seemed very funny and had a certain charm, but soon it b  
ecame rather stale. After reading a few pages of output one could sense the l  
imits of the space in which the program was operating; and after that, s  
eeing random points inside that space--even though each one was "new"  
-was nothing new. This is, it seems to me, a general principle: you get bored w  
ith something not when you have exhausted its repertoire of behavior, b  
ut when you have mapped out the limits of the space that contains its behavior. The behavior space of a person is just about complex enough that i  
t can continually surprise other people; but that wasn't true of my program  
. I realized that my goal of producing truly humorous output would r  
equire that far more subtlety be programmed in. But what, in this case, was m  
eant by "subtlety"? It was clear that absurd juxtapositions of words were just t  
oo unsubtle; I needed a way to ensure that words would be used in a  
ccordance with the realities of the world. This was where thoughts about representation of knowledge began to enter the p

664

From RTN's to ATN'

664

The idea I adopted was to classify each word-noun, verb, p  
repos1t10n, etc.-in several different "semantic dimensions". Thus, each word was a  
member of classes of various sorts; then there were also superclassesclasses of classes (reminiscent of the remark by Ulam). In principle, s  
uch aggregation could continue to any number of levels, but I stopped at t  
wo. At any given moment, the choice of words was now semantically r  
estricted, because it was required that there should be agreement between the v  
arious parts of the phrase being constructed. The idea was, for instance, t  
hat certain kinds of acts could be performed only by animate objects; that o  
nly certain kinds of abstractions could influence events, and so on. The decisions about what categories were reasonable, and whether each c  
ategory was better thought of as a class or a superclass, were quite complicated. A  
ll words were branded in several different dimensions. Common prepositions-"of", "in", etc.-had several distinct entries, corresponding to t  
heir distinct usages. Now, the output began to be much more  
comprehensible-and for that reason it was funny in a new w

664

A Little Turing T  
es

664

Below, I have reproduced nine selections, carefully culled from m  
any pages of output from later versions of my program. Along with them a  
re three (seriously intended) human-written sentences. W  
hich? ( 1 )Blurting may be considered as the reciprocal substitution o  
fsemiotic material (dubbing) for a semiotic dialogical p  
roduct in a dynamic r

665

( 2)Rather think of a pathway of a 'sequence' of gedankenexperiment simpletons where heir-lines are a prima facie case of a  
paradiachronic transitivity.  
( 3)Think of that as a chain strength possibility of what, eventually, comes out as a product (epistemic conditions?) and t  
he product is not a Frankfurt-ish p  
acking-it-all-in. ( 4)Despite the efforts, the reply, if you will, had been suppo  
rtedby the Orient; hence a fallacy will thereafter be suspended b  
y the attitude which will be being held by the a  
mbassador. ( 5)Of course, until the upheavals, the ambassador was s  
lightlygradually mollycoddling the r  
abble.( 6)Supposedly, refined liberty caused the attitudes insofar a  
speace is distilled by the consequences which will not eventually be caused by the command irrevocably insofar as p  
eaceof it is sometimes causing the intransigency infin  
itesimally s  
urprisingly. ( 7)According to the sophists, the campaigns in the city-states, i  
nother words, have been accepted by the Orient cunningly. O  
f course, the Orient has been separated by the states particularly v  
iolently.The Orient supports the efforts which had been s  
upportedby m  
ankind.( 8)Admittedly, the hierarchical origin of the fallacy, nevertheless, will be prophesied by the enemies of it. By the s  
ametoken, the individualists will have testified that i  
ntransigency will not have suspended the campa  
igns. ( 9)Needless to say, during the upheaval which will have warranted the secrecy, the replies do not separate the Orient.   
Of course, the countries, ipso facto, are always probing libe  
rty. (10) Although a Nobel Prize was being achieved by the h  
umanists,yet in addition, it was being achieved by the s  
erf.( 11) An attitude will often be held by the serfs of a s  
trife-torn n  
ation. (12) Moreover, the Nobel Prizes will be achieved. By the s  
ametoken, despite the consequence, the Nobel Prizes which w  
ill be achieved will sometimes be achieved by a w  
oman. The human-written sentences are numbers 1 to 3; they were drawn f  
rom the contemporary journal A  
rt-Lan guage15 and are-as far as I can tellcompletely serious efforts among literate and sane people to c  
ommunicate something to each other. That they appear here out of context is not t  
oo misleading, since their proper context sounds just the same as they d  

666

My program produced the rest. Numbers 10 to 12 were chosen t  
o show that there were occasional bursts of total lucidity; numbers 7 to 9 a  
re more typical of the output, floating in that curious and provocative netherworld between meaning and no-meaning; and then numbers 4 to 6 p  
retty much transcend meaning. In a generous mood, one could say that they   
stand on their own as pure "language objects", something like pieces o  
f abstract sculpture carved out of words instead of stone; alternatively, o  
ne could say that they are pure pseudointellectual d

666

My choice of vocabulary was still aimed at producing humorous effects. The flavor of the output is hard to characterize. Although much of i  
t "makes sense", at least on a single-sentence level, one definitely gets t  
he feeling that the output is coming from a source with no understanding o  
f what it is saying and no reason to say it. In particular, one senses an utt  
er lack of visual imagery behind the words. When I saw such sentences c  
ome pouring out of the line printer, I experienced complex emotions. I was v  
ery amused by the silliness of the output. I was also very proud of my achievement and tried to describe it to friends as similar to giving rules for   
building up meaningful stories in Arabic out of single strokes of t  
he pen-an exaggeration, but it pleased me to think of it that way. And lastly I  
was deeply thrilled by the knowledge that this enormously comp  
licated machine was shunting around long trains of symbols inside it according t  
o rules, and that these long trains of symbols were something like thoughts in   
my own head ... something like t

666

Images of What Thought Is

666

Of course I didn't fool myself into thinking that there was a conscious b  
eing behind those sentences-far from it. Of all people, I was the most aware o  
f the reasons that this program was terribly remote from real t  
hought. Tesler's Theorem is quite apt here: as soon as this level of languagehandling ability had been mechanized, it was clear that it did not consti  
tute intelligence. But this strong experience left me with an image: a glimmering sense that real thought was composed of much longer, much m  
ore complicated trains of symbols in the brain-many trains moving simultaneously down many parallel and crisscrossing tracks, their cars being p  
ushed and pulled, attached and detached, switched from track to track by a   
myriad neural shunting-engines .

666

It was an intangible image which I cannot convey in words, and it w  
as only an image. But images and intuitions and motivations lie mingled c  
lose in the mind, and my utter fascination with this image was a constant spur t  
o think more deeply about what thought really could be. I have tried in o  
ther parts of this book to communicate some of the daughter images of t  
his original image-particularly in the Prelude, Ant Fugue

666

What stands out in my mind now, as I look back at this program f  
rom the perspective of a dozen years, is how there is no sense of imagery b  
ehind what is being said. The program had no idea what a serf is, what a person i  
s, or what anything at all is. The words were empty formal symbols, as empty

668

as-perhaps emptier than-the p and q of the pq-system. My program t  
ook advantage of the fact that when people read text, they quite naturally t  
end to imbue each word with its full flavor-as if that were necessarily attac  
hed to the group of letters which form the word. My program could be l  
ooked at as a formal system, whose "theorems"-the output s  
entences-had ready-made interpretations (at least to speakers of English). But unlike t  
he pq-system, these "theorems" were not all true statements when interpre  
ted that way. Many were false, many were nonsen

668

In its humble way, the pq-system mirrored a tiny corner of the w  
orld. But when my program ran, there was no mirror inside it of how the w  
orld works, except for the small semantic constraints which it had to follow. T  
o create such a mirror of understanding, I would have had to wrap e  
ach concept in layers and layers of knowledge about the world. To do t  
his would have been another kind of effort from what I had intended to d  
o. Not that I didn't often think of trying to do it-but I never got around t  
o trying it o

668

Higher-Level Grammars .

668

In fact, I often pondered whether I could write an A TN-grammar (or s  
ome other kind of sentence-producing program) which would only produce t  
rue sentences about the world. Such a grammar would imbue the words w  
ith genuine meanings, in the way it happened in the pq-system and in T  
NT. This idea of a language in which false statements are ungrammatical is a  
n old one, going back to Johann Amos Comenius, in 1633. It is very appealing because you have a crystal ball embodied in your grammar: just wri  
te down the statement you want to know about, and check to see if it i  
s grammatical . ... Actually, Comenius went even further, for in his l  
anguage, false statements were not only ungrammatical-they were i

668

Carrying this thought in another direction, you might imagine a highlevel grammar which would produce random koans. Why not? Such a  
grammar would be equivalent to a formal system whose theorems a  
re koans. And if you had such a program, could you not arrange it to produc  
e only genuine koans? My friend Marsha Meredith was enthusastic about t  
his idea o f" Artificial Ism", so she tackled the project of writing a koan-wr  
iting program. One of her early efforts produced this curious q  
uasi-koan: A SMALL YOUNG MASTER WANTED A SMALL WHITE GNA  
RLED BOWL. "HOW CAN WE LEARN AND UNDERSTAND W  
ITHOUT STUDY?" THE YOUNG MASTER ASKED A LARGE CONFUSED MASTER. THE CONFUSED MASTER WALKED FROM A BROWN H  
ARD MOUNTAIN TO A WHITE SOFT MOUNTAIN WITH A SMALL R  
ED STONY BOWL. THE CONFUSED MASTER SAW A RED SOFT HUT  
. THE CONFUSED MASTER WANTED THE HUT. "WHY D ID  
BODHIDHARMA COME INTO CHINA?" THE CONFUSED M  
ASTE

668

FIGURE 116. A meaningful story in Arabic. [From A. Khatibi and M. Sijelmassi, T  
heSplendour of Islamic Calligraphy (New York: Riz.z.oli, 1976 ).]

669

ASKED A LARGE ENLIGHTENED STUDENT. "THE PEACHES A  
RE LARGE", THE STUDENT ANSWERED THE CONFUSED M  
ASTER. "HOW CAN WE LEARN AND UNDERSTAND WITHOUT S  
TUDY?" THE CONFUSED MASTER ASKED A LARGE OLD MASTER. THE O  
LD MASTER WALKED FROM A WHITE STONY G0025. THE OLD MASTER GOT L

669

Your personal decision procedure for koan genuineness p  
robably reached a verdict without need of the Geometric Code or the Art of Z  
en Strings. If the lack of pronouns or the unsophisticated syntax didn't aro  
use your suspicions, that strange "G0025" towards the end must have. What i  
s it? It is a strange fluke-a manifestation of a bug which caused the p  
rogram to print out, in place of the English word for an object, the program'  
s internal name for the "node" (a LISP atom, in fact) where all inf  
ormation concerning that particular object was stored. So here we have a "windo  
w" onto a lower level of the underlying Zen mind-a level that should h  
ave remained invisible. Unfortunately, we don't have such clear windows o  
nto the lower levels of human Zen m

669

The sequence of actions, though a little arbitrary, comes from a recursive LISP procedure called "CASCADE", which creates chains of a  
ctions linked in a vaguely causal way to each other. Although the degree o  
f comprehension of the world possessed by this koan generator is clearly n  
ot stupendous, work is in progress to make its output a little more genuines  
eemin

669

Grammars for M

669

Then there is music. This is a domain which you might suppose, on fi  
rst thought, would lend itself admirably to being codified in.  
an A TNgrammar, or some such program. Whereas (to continue this nai:ve line o  
f thought) language relies on connect.ions with the outside world for meaning, music is purely formal. There is no reference to things "out there" i  
n the sounds of music; there is just pure syntax-note following note, c  
hord following chord, measure following measure, phrase following phrase .

669

But wait. Something is wrong in this analysis. Why is some music s  
o much deeper and more beautiful than other music? It is because form, in   
music, is expressive--expressive to some strange subconscious regions o  
f our minds. The sounds of music do not refer to serfs or city-states, but t  
hey do trigger clouds of emotion in our innermost selves; in that sense m  
usical meaning is dependent on intangible links from the symbols to things in t  
he world-those "things", in this case, being secret software structures in o  
ur minds. No, great music will not come out of such an easy formalism as a  
n ATN-grammar. Pseudomusic, like pseudo-fairy tales, may well c  
ome out-and that will be a valuable exploration for people to make-but t  
he secrets of meaning in music lie far, far deeper than pure synt  
a

669

I should clarify one point here: in principle, A TN-grammars have a  
ll the power of any programming formalism, so if musical meaning is captur

670

able in any way at all (which I believe it is), it is capturable in an A TNgrammar. True. But in that case, I maintain, the grammar will be d  
efining not just musical structures, but the entire structures of the mind of a  
beholder. The "grammar" will be a full grammar of thought-not just a  
grammar of m

670

Winograd's Program SHRDLU

670

What kind of program would it take to make human beings admit that i  
t had some "understanding", even if begrudgingly? What would it take  
before you wouldn't feel intuitively that there is "nothing t  
her

670

In the years 1968-70, Terry Winograd (alias Dr. Tony Earrwig) was a  
doctoral student at MIT, working on the joint problems of language a  
nd understanding. At that time at MIT, much AI research involved the socalled blocks world-a relatively simple domain in which problems concerning both vision and language-handling by computer could fit easily. T  
he blocks world consists of a table with various kinds of toy-like blocks o  
n it-square ones, oblong ones, triangular ones, etc., in various colors. (For a  
"blocks world" of another kind, see Figure 1 17: the painting Mental Arithmetic by Magritte. I find its title singularly appropriate in this context.) T  
he vision problems in the MIT blocks world are very tricky: how can a computer figure out, from a TV-scan of a scene with many blocks in it,just wha  
t kinds of blocks are present, and what their relationships are? Some b  
locks may be perched on top of others, some may be in front of others, there may   
be shadows, and so o

670

FIGURE 117. Mental Arithmetic, by Rene Magritte (193

671

Winograd's work was separate from the issues of vision, h  
owever. Beginning with the assumption that the blocks world was well represent  
ed inside the computer's memory, he confronted the many-faceted pro  
blem of how to get the computer t  
o: ( 1 )understand questions in English about the s  
ituation;( 2)give answers in English to questions about the s  
ituation;( 3)understand requests in English to manipulate the blocks  
;( 4)break down each request into a sequence of operations i  
tcould do;  
( 5)understand what it had done, and for what reasons;  
( 6)describe its actions and their reasons, in English

671

It might seem reasonable to break up the overall program into modular subprograms, with one module for each different part of the p  
roblem; then, after the modules have been developed separately, to integrate t  
hem smoothly. Winograd found that this strategy of developing i  
ndependent modules posed fundamental difficulties. He developed a radical approach  
, which challenged the theory that intelligence can be compartme  
ntalized into independent or semi-independent pieces. His program SHRDLUnamed after the old code "ET AOIN SHRDLU", used by linotype o  
perators to mark typos in a newspaper column-did not separate the problem i  
nto clean conceptual parts. The operations of parsing sentences, p  
roducing internal representations, reasoning about the world represented i  
nside itself, answering questions, and so on, were all deeply and i  
ntricately meshed together in a procedural representation of knowledge. Some c  
ritics have charged that his program is so tangled that it does not represent a  
ny "theory" at all about language, nor does it contribute in any way to o  
ur insights about thought processes. Nothing could be more wrong than s  
uch claims, in my opinion. A tour de force such as SHRDLU may not b  
e isomorphic to what we do-in fact, in no way should you think that in   
SHRDLU, the "symbol level" has been attained-but the act of creating i  
t and thinking about it offers tremendous insight into the way intelligenc  
e w

671

The Structure of SHR  
DL

671

In fact, SHRDLU does consist of separate procedures, each of whi  
ch contains some knowledge about the world; but the procedures have such a  
strong interdependency that they cannot be cleanly teased apart. T  
he program is like a very tangled knot which resists untangling; but the f  
act that you cannot untangle it does not mean that you cannot understand i  
t. There may be an elegant geometrical description of the entire knot even i  
f it is physically messy. We could go back to a metaphor from the M  
u Offering, and compare it to looking at an orchard from a "natural" a  
ngl

671

Winograd has written lucidly about SHRDLU. I quote here from h  
is article in Schank and Colby's book:

672

One of the basic viewpoints underlying the model is that all language use c  
an be thought of as a way of activating procedures within the hearer. We c  
an think of any utterance as a program-one that indirectly causes a set o  
f operations to be carried out within the hearer's cognitive system. This "program writing" is _indirect in the sense that we are dealing with an i  
ntelligent interpreter, who may take a set of actions which are quite different from t  
hose the speaker intended. The exact form is determined by his knowledge of t  
heworld, his expectations about the person talking to him, etc. In this p  
rogramwe have a simple version of this process of interpretation as it takes place i  
n the robot. Each sentence interpreted by the robot is converted to a set of   
instructions in PLANNER. The program that is created is then executed t  
o achieve the desired effec t.1  

672

PLANNER Facilitates Problem R  
eductio

672

The language PLANNER, referred to here, is an AI language who  
se principal feature is that some of the operations necessary for problem   
reduction are built in-namely, the recursive process of creating a tree o  
f subgoals, subsubgoals, etc. What this means is that such processes, i  
nstead of having to be spelled out time and time again by the programmer, a  
re automatically implied by so-called GOAL-statements. Someone who reads a  
PLANNER program will see no explicit reference to such operations; i  
n jargon, they are user-transparent. If one path· in the tree fails to achieve t  
he desired goal, then the PLANNER program will "backtrack" and t  
ry another route. "Backtracking" is the magic word as far as PLANNER i  
s concerned.

672

Winograd's program made excellent use of these features o  
f PLANNER-more exactly, of MICROPLANNER, a partial implementation of the plans for PLANNER. In the past few years, however, p  
eople with the goal of developing AI have concluded that automatic backtracking, as in PLANNER, has definite disadvantages, and that it will p  
robably not lead to their goal; therefore they have backed off from it, preferring t  
o try other routes to A

672

Let us listen to further comments from Winograd on SHRDLU  
: The definition of every word is a program which is called at an a  
ppropriate point in the analysis, and which can do arbitrary computations involving t  
he sentence and the present physical s ituation.1  
7Among the examples which Winograd cites is the follow  
ing: The different possibilities for the meaning of "the" are procedures w  
hich check various facts about the context, then prescribe actions such as "Look for  
a unique object in the data base which fits this description'', or "Assert that the   
object being described is unique as far as the speaker is concerned." T  
he program incorporates a variety of heuristics for deciding what part of t  
he context is relev ant.1  
8 It is amazing how deep this problem with the word "the" is. It is p  
robably safe to say that writing a program which can fully handle the top five w  
ord

673

of English-"the", "of", "and", "a", and "to"-would be equivalent t  
o solving the entire problem of AI, and hence tantamount to knowing w  
hat intelligence and consciousness are. A small digression: the five most common nouns in English are-according to the Word Frequency Book compil  
ed by John B. Carroll et al-"time", "people", "way", "water", and "words" (  
in that order). The amazing thing about this is that most people have no i  
dea that we think in such abstract terms. Ask your friends, and 10 to 1 they'l  
l guess such words as "man", "house", "car", "dog", and "money". And  
-while we're on the subject of frequencies-the top twelve letters in E  
nglish, in order, according to Mergenthaler, are: "ETAOIN S  
HRDL

673

One amusing feature of SHRDLU which runs totally against t  
he stereotype of computers as "number crunchers" is this fact, pointed out b  
y Winograd: "Our system does not accept numbers in numeric form, and h  
as only been taught to count to ten."19 With all its mathematical underpinning, SHRDLU is a mathematical ignoramus! Just like Aunt Hillar  
y, SHRDLU doesn't know anything about the lower levels which make it u  
p. Its knowledge is largely procedural (see particularly the remark by " Dr.  
Tony Earrwig" in section 11 of the previous Dialogue

673

It is interesting to contrast the procedural embedding of knowledge i  
n SHRDLU with the knowledge in my sentence-generation program. All of   
the syntactical knowledge in my program was procedurally embedded i  
n Augmented Transition Networks, written in the language Algol; but t  
he semantic knowledge-the information about semantic cla  
ss membership-was static: it was contained in a short list of numbers a  
fter each word. There were a few words, such as the auxiliary verbs "to be", "  
to have", and others, which were represented totally in procedures in Alg  
ol, but they were the exceptions. By contrast, in SHRDLU, all words w  
ere represented as programs. Here is a case which demonstrates that, despite   
the theoretical equivalence of data and programs, in practice the choice o  
f one over the other has major consequences.

673

Syntax and Sem  
antic

673

And now, a few more words from Winograd:  
Our program does not operate by first parsing a sentence, then doing semantic analysis, and finally by using deduction to produce a response. These thr  
ee activities go on concurrently throughout the understanding of a sentence. A  
s soon as a piece of syntactic structure begins to take shape, a semantic p  
rogram is called to see whether it might make sense, and the resultant answer c  
an direct the parsing. In deciding whether it makes sense, the semantic r  
outine may call deductive processes and ask questions about the real world. As an   
example, in sentence 34 of the Dialogue ("Put the blue pyramid on the block   
in the box"), the parser first comes up with "the blue pyramid on the block" a  
s a candidate for a noun group. At this point, semantic analysis is done, a  
nd since "the" is definite, a check is made in the data base for the object b  
eing referred to. When no such object is found, the parsing is redirected to fi  
nd the noun group "the blue pyramid". It will then go on to find "on the block i  

674

the box" as a single phrase indicating a location ... Thus there is a contin  
uing interplay between the different sorts of analysis, with the results of o  
ne affecting the others. 2  

674

It is extremely interesting that in natural language, syntax and semantics are so deeply intertwined. Last Chapter, in discussing the e  
lusive concept of "form", we had broken the notion into two categories: synta  
ctic form, which is detectable by a predictably terminating decision procedure,  
and semantic form, which is not. But here, Winograd is telling us t  
hat-at least when the usual senses of "syntax" and "semantics" are t  
aken-they merge right into each other, in natural language. The external form of a  
sentence-that is, its composition in terms of elementary signs--does n  
ot divide up so neatly into syntactic and semantic aspects. This is a very   
significant point for linguistic

674

Here are some final comments on SHRDLU by Winogra  
d. Let us look at what the system would do with a simple description like "a r  
ed cube which supports a pyramid". The description will use concepts like  
BLOCK, RED, PYRAMID, and EQUIDIMENSIONAL-all parts of the sy

674

FIGURE 118. Procedural representation of "a red cube which supports a py ramid."  
[Adapted from Roger Schank and Kenneth Colby, Computer Models of Thought and L  
anguage (San Francisco: W. H. Freeman, 1973), p. 172. ]

675

in a flow chart like that in Figure 118. Note that this is a program for fi  
ndingan object fitting the description. It would then be incorporated into a command for doing something with the object, a question asking something a  
bout it, or, if it appeared in a statement, it would become part of the p  
rogram which was generated to represent the meaning for later use. Note that this bit   
of program could also be used as a test to see whether an object fit t  
he description, if the first FIND instruction were told in advance to look only a  
t that particular obj  
ect. At first glance, it seems that there is too much structure in this program, a  
s we don't like to think of the meaning of a simple phrase as explicitly containing loops, conditional tests, and other programming details. The solution is t  
o provide an internal language that contains the appropriate looping a  
nd checking as its primitives, and in which the representation of the process is a  
s simple as the description. The program described in Figure 118 would b  
e written in PLANNER looking something like what is belo  
w: (GOAL (IS ?X l B  
LOCK)) (GOAL (COLOR-OF ? Xl R  
ED)) (GOAL (EQUIDIMENSIONAL ? Xl))  
(GOAL (IS ?X2 P  
YRAMID)) (GOAL (SUPPORT ?X l ?  
X2)) The loops of the flowchart are implicit in PLANNER'S backtrack c  
ontrol structure. The description is evaluated by proceeding down the list until some   
goal fails, at which time the system backs up automatically to the last p  
oint where a decision was made, trying a different possibility. A decision can b  
e made whenever a new object name or VARIABLE (indicated by the p  
refix "?") such as "?Xl" or "?X2" appears. The variables are used by the p  
attern matcher. If they have already been assigned to a particular item, it checks t  
o see whether the GOAL is true for that item. If not, it checks for all p  
ossible items which satisfy the GOAL, by choosing one, and then taking s  
uccessive ones whenever backtracking occurs to that point. Thus, even the d  
istinction between testing and choosing is implicit.2

675

One significant strategy decision in devising this program was to n  
ot translate all the way from English into LISP, but only p  
artway-into PLANNER. Thus (since the PLANNER interpreter is itself written i  
n LISP), a new intermediate level-PLANNER-was inserted between t  
he top-level language (English) and the bottom-level language (machine language). Once a PLANNER program had been made from an E  
nglish sentence fragment, then it could be sent off to the PLANNER i  
nterpreter, and the higher levels of SHRDLU would be freed up, to work on new task  

675

This kind of decision constantly crops up: How many levels should a  
system have? How much and what kind of "intelligence" should be p  
laced on which level? These are some of the hardest problems facing AI t  
oday. Since we know so little about natural intelligence, it is hard for us to fi  
gure out which level of an artificially intelligent system should carry out what   
part of a t

675

This gives you a glimpse behind the scenes of the Dialogue preceding   
this Chapter. Next Chapter, we shall meet new and speculative ideas fo  
r A

684

C HAPTER X  
IXArtificial Intel  
ligence: Prospec  
t

684

"Almost" Situations and Subjunc  
tive

684

AFTER READING Contrafactus, a friend said to me, "My uncle was a  
lmost President of the U.S.!" "Really?" I said. "Sure," he replied, "he was s  
kipper of the PT 108." Qohn F. Kennedy was skipper of the PT 109

684

That is what Contref actus is all about. In everyday thought, we are   
constantly manufacturing mental variants on situations we face, ideas w  
e have, or events that happen, and we let some features stay exactly the same   
while others "slip". What features do we let slip? What ones do we not e  
ven consider letting slip? What events are perceived on some deep int  
uitive level as being close relatives of ones which really happened? What do w  
e think "almost" happened or "could have" happened, even though it unambiguously did not? What alternative versions of events pop without a  
ny conscious thought into our minds when we hear a story? Why do s  
ome counterfactuals strike us as "less counterfactual" than other counterfactuals? After all, it is obvious that anything that didn't happen didn't h  
appen. There aren't degrees of "didn't-happen-ness". And the same goes fo  
r "almost" situations. There are times when one plaintively says, "It almost   
happened", and other times when one says the same thing, full of r  
elief. But the "almost" lies in the mind, not in the external fact

684

Driving down a country road, you run into a swarm of bees. You d  
on't just duly take note of it; the whole situation is immediately placed i  
n perspective by a swarm of "replays" that crowd into your mind. Typically,   
you think, "Sure am lucky my window wasn't open!"--or worse, the reverse: "Too bad my window wasn't closed!" "Lucky I wasn't on my b ike!  
" "Too bad I didn't come along five seconds earlier." Strange but p  
ossible replays: "If that had been a deer, I could have been killed!" "I bet t  
hose bees would have rather had a collision with a rosebush." Even s  
tranger replays: "Too bad those bees weren't dollar bills!" "Lucky fhose b  
ees weren't made of cement!" "Too bad it wasn't just one bee instead of a  
swarm." "Lucky I wasn't the swarm instead of being me." What s  
lips naturally and what doesn't-and w

684

In a recent issue of The New Yorker magazine, the following e  
xcerpt from the "Philadelphia Welcomat" was reprinte d:1  
If Leonardo da Vinci had been born a female the ceiling of t  
he Sistine Chapel might never have been p

685

The New Yorker commented:  
And if Michelangelo had been Siamese twins, the work w  
ould have been completed in half the t  
ime. The point of The New Yorker's comment is not that such counterfactuals a  
re false; it is more that anyone who would entertain such an idea-anyone w  
ho would "slip" the sex or number of a given human being-would have to b  
e a little loony. Ironically, though, in the same issue, the following s  
entence, concluding a book review, was printed without b  
lushing: I think he [ Professor Philipp Frank] would have enjoyed both o  
f these books enormously.2  
Now poor Professor Frank is dead; and clearly it is nonsense to suggest t  
hat someone could read books written after his death. So why wasn't t  
his serious sentence also scoffed at? Somehow, in some d  
ifficult-to-pin-down sense, the parameters slipped in this sentence do not violate our sense o  
f "possibility" as much as in the earlier examples. Something allows us t  
o imagine "all other things being equal" better in this one than in the o  
thers. But why? What is it about the way we classify events and people that makes   
us know deep down what is "sensible" to slip, and what is "

685

Consider how natural it feels to slip from the valueless declarative "  
I don't know Russian" to the more charged conditional "I would like to k  
now Russian" to the emotional subjunctive "I wish I knew Russian" and finally t  
o the rich counterfactual "If I knew Russian, I would read Chekhov a  
nd Lermontov in the original". How flat and dead would be a mind that s  
aw nothing in a negation but an opaque barrier! A live mind can see a w  
indow onto a world of possibilities.

685

I believe that "almost" situations and unconsciously manufa  
ctured subjunctives represent some of the richest potential sources of insight i  
nto how human beings organize and categorize their perceptions of the w  
orld. An eloquent co-proponent of this view is the linguist and translator G  
eorge Steiner, who, in his book After Babel, has writte  
n: Hypotheticals, 'imaginaries', conditionals, the syntax of counter-factuality a  
nd contingency may well be the generative centres of human speech .... [  
They] do more than occasion philosophical and grammatical perplexity. No l  
ess than future tenses to which they are, one feels, related, and with which t  
hey ought probably to be classed in the larger set of 'suppositionals' or 'alternates',  
these ' if' propositions are fundamental to the dynamics of human feeling . ..  
. Ours is the ability, the need, to gainsay or 'un-say' the world, to image a  
nd speak it otherwise . ... We need a word which will designate the power, t  
he compulsion of language to posit 'otherness' .... Perhaps 'alternity' will do: t  
o define the 'other than the case', the counter-factual propositions, i  
mages, shapes of will and evasion with which we charge our mental being and b  
y means of which we build the changing, largely fictive milieu of our s  
omatic and our social existence . ..  
. Finally, Steiner sings a counterfactual hymn to counterfactuality:

686

It is unlikely that man, as we know him, would have survived without t  
he fictive, counter-factual, anti-determinist means of language, without t  
he semantic capacity, generated and stored in the 'superfluous' zones of t  
he cortex, to conceive of, to articulate possibilities beyond the treadmill of organic decay and death.3

686

The manufacture of "subjunctive worlds" happens so casually, s  
o naturally, that we hardly notice what we are doing. We select from o  
ur fantasy a world which is close, in some internal mental sense, to the r  
eal world. We compare what is real with what we perceive as almost real. In so   
doing, what we gain is some intangible kind of perspective on reality. T  
he Sloth is a droll example of a variation on reality-a thinking being w  
ithout the ability to slip into subjunctives (or at least, who claims to be without t  
he ability-but you may have noticed that what he says is full of counterfactuals!). Think how immeasurably poorer our mental lives would be if w  
e didn't have this creative capacity for slipping out of the midst of reality i  
nto soft "what i f" 's! And from the point of view of studying human t  
hought processes, this slippage is very interesting, for most of the time it h  
appens completely without conscious direction, which means that observation o  
f what kinds of things slip, versus what kinds don't, affords a good w  
indow on the unconscious m

686

One way to gain some perspective on the nature of this mental metric  
is to "fight fire with fire". This is done in the Dialogue, where our "subjunctive ability" is asked to imagine a world in which the very notion o  
f subjunctive ability is slipped, compared to what we expect. In the D  
ialogue, the first subjunctive instant replay-that where Palindromi stays i  
n bounds-is quite a normal thing to imagine. In fact, it was inspired by a  
completely ordinary, casual remark made to me by a person sitting next t  
o me at a football game. For some reason it struck me and I wondered w  
hat made it seem so natural to slip that particular thing, but not, say, t  
he number of the down, or the present score. From those thoughts, I went o  
n to consider other, probably less slippable features, such as the w  
eather (that's in the Dialogue), the kind of game (also in the Dialogue), and t  
hen even loonier variations (also in the Dialogue). I noticed, though, that w  
hat was completely ludicrous to slip in one situation could be quite slippable i  
n another. For instance, sometimes you might spontaneously wonder h  
ow things would be if the ball had a different shape (e.g., if you are p  
laying basketball with a half-inflated ball); other times that would never enter y  
our mind (e.g., when watching a football game on T

686

Layers of Stability

686

It seemed to me then, and still does now, that the slippability of a feature o  
f some event (or circumstance) depends on a set of nested contexts in whi  
ch the event (or circumstance) is perceived to occur. The terms cons  
tant, parameter, and variable, borrowed from mathematics, seem useful h  
ere. Often mathematicians, physicists, and others will carry out a c  
alculation, saying "c is a constant, p is a parameter, and v is a variable". What t  
he

687

mean is that any of them can vary (including the "constant"); h  
owever, there is a kind of hierarchy of variability. In the situation which is b  
eing represented by the symbols, c establishes a global condition; p e  
stablishes some less global condition which can vary while c is held fixed; and final  
ly, v can run around while c and p are held fixed. It makes little sense to t  
hink of holding v fixed while c and p vary, for c and p establish the context i  
n which v has meaning. For instance, think of a dentist who has a list o  
f patients, and for each patient, a list of teeth. It makes perfect sense (  
and plenty of money) to hold the patient fixed and vary his teeth-but it m  
akes no sense at all to hold one tooth fixed and vary the patient. (  
Although sometimes it makes good sense to vary the dentist ... )

687

We build up our mental representation of a situation layer by l  
ayer. The lowest layer establishes the deepest aspect of the context-  
sometimes being so low that it cannot vary at all. For instance, the t  
hree-dimensionality of our world is so ingrained that most of us never would imagine letting i  
t slip mentally. It is a constant constant. Then there are layers which e  
stablish temporarily, though not permanently, fixed aspects of situations, w  
hich could be called background assumptions--things which, in the back of y  
our mind, you know can vary, but which most of the time you unquesti  
oningly accept as unchanging aspects. These could still be called "constants". F  
or instance, when you go to a football game, the rules of the game a  
re constants of that sort. Then there are "parameters": you think of them a  
s more variable, but you temporarily hold them constant. At a football g  
ame, parameters might include the weather, the opposing team, and so f  
orth. There could be-and probably are-several layers of parameters. F  
inally, we reach the "shakiest" aspects of your mental representation of t  
he situation-the variables. These are things such as Palindromi's stepping o  
ut of bounds, which are mentally "loose" and which you don't mind letting slip   
away from their real values, for a short m  
omen

687

Frames and Nested Cont  
ext

687

The word frame is in vogue in Al currently, and it could be defined a  
s a computational instantiation of a context. The term is due to Marvin Minsky, a  
s are many ideas about frames, though the general concept has been fl  
oating around for a good number of years. In frame language, one could say t  
hat mental representations of situations involve frames nested within e  
ach other. Each of the various ingredients of a situation has its own frame. It i  
s interesting to verbalize explicitly one of my mental images c  
oncerning nested frames. Imagine a large collection of chests of drawers. When y  
ou choose a chest, you have a frame, and the drawer holes are places w  
here "subframes" can be attached. But subfr  
ames are themselves chests of drawers. How can you stick a whole chest of drawers into the slot for a s  
ingle drawer in another chest of drawers? Easy: you shrink and distort t  
he second chest, since, after all, this is all mental, not physical. Now in t  
he outer frame, there may be several different drawer slots that need to b  

688

filled; then you may need to fill slots in some of the inner chests of d  
rawers (or subframes). This can go on, r

688

The vivid surrealistic image of squishing and bending a chest of drawers so that it can fit into a slot of arbitrary shape is probably quite important, because it hints that your concepts are squished and bent by t  
he contexts you force them into. Thus, what does your concept of "perso  
n" become when the people you are thinking about are football players? I  
t certainly is a distorted concept, one which is forced on you by the o  
verall context. You have stuck the "person" frame into a slot in the "  
football game" frame. The theory of representing knowledge in frames relies o  
n the idea that the world consists of quasi-dosed subsystems, each of whi  
ch can serve as a context for others without being too disrupted, or c  
reating too much disruption, in the p

688

One of the main ideas about frames is that each frame comes with its   
own set of expectations. The corresponding image is that each chest o  
f drawers comes with a built-in, but loosely bound, drawer in each of i  
ts drawer slots, called a default. If I tell you, "Picture a river bank", you wil  
l invoke a visual image which has various features, most of which you c  
ould override if I added extra phrases such as "ip a drought" or "in Brazil" o  
r "without a merry-go-round". The existence of default values for slots   
allows the recursive process of filling slots to come to an end. In effect, y  
ou say, "I will fill in the slots myself as far as three layers down; beyond that I  
will take the default options." Together with its default expectations, a  
frame contains knowledge of its limits of applicability, and heuristics f  
or switching to other frames in case it has been stretched beyond its limits of   
t

688

The nested structure of a frame gives you a way of "zooming in" a  
nd looking at small details from as dose up as you wish: you just zoom in o  
n the proper subframe, and then on one of its subframes, etc., until you h  
ave the desired amount of detail. It is like having a road atlas of the USA w  
hich has a map of the whole country in the front, with individual state m  
aps inside, and even maps of cities and some of the larger towns if you want s  
till more detail. One can imagine an atlas with arbitrary amounts of d  
etail, going down to single blocks, houses, rooms, etc. It is like looking through a  
telescope with lenses of different power; each lens has its own uses. It i  
s important that one can make use of all the different scales; often detail i  
s irrelevant and even d  
istractin

688

Because arbitrarily different frames can be stuck inside other frames'  
slots, there is great potential for conflict or "collision". The nice n  
eat scheme of a single, global set of layers of "constants", "parameters", a  
nd "variables" is an oversimplification. In fact, each frame will have its o  
wn hierarchy of variability, and this is what makes analyzing how we p  
erceive such a complex event as a football game, with its many subframes, subsubframes, etc., an incredibly messy operation. How do all these many f  
rames interact with each other? If there is a conflict where one frame says, "  
This item is a constant" but another frame says, "No, it is a variable!", how does i  
t get resolved? These are deep and difficult problems of frame theory to,

689

which I can give no answers. There has as yet been no complete a  
greement on what a frame really is, or on how to implement frames in AI programs. I   
make my own stab at discussing some of these questions in the f  
ollowing section, where I talk about some puzzles in visual pattern r  
ecognition, which I call "Bongard p

689

Bongard Prob  
lem

689

Bongard prob lems (BP's) are problems of the general type given by t  
he Russian scientist M. Bongard in his book Pattern Recognition. A t  
ypical BP-number 51 in his collection of one hundred-is shown in Figure 119

689

FIGURE 119. Bongard problem 5 1. [From M. Bongard, Pattern Recognition (Rochelle P  
ark, N.j.: Hayden Book Co., Spartan Books, 1970).

689

These fascinating problems are intended for pattern-recognizers, w  
hether human or machine. (One might also throw in ETI's--extraterrestrial intelligences.) Each problem consists of twelve boxed figures (henceforth cal  
led boxes): six on the left, forming Class I, and six on the right, forming Class I  
I. The boxes may be indexed this w  
ay: I-A 1-B  
1-C 1  
-D1-E 1  
-FII-A II-  
B11-C II-  
D11-E II-  
FThe problem is "How do Class I boxes differ from Class II b  
oxe

689

A Bongard problem-solving program would have several stages, i  
n which raw data gradually get converted into descriptions. The early s  
tages are relatively inflexible, and higher stages become gradually more fl  
exible. The final stages have a property which I call tentativity, which means s  
imply that the way a picture is represented is always tentative. Upon the drop of a  
hat, a high-level description can he restructured, using all the devices of t  
h

690

later stages. The ideas presented below also have a tentative quality to   
them. I will try to convey overall ideas first, glossing over s  
ignificant difficulties. Then I will go back and try to explain subtleties and tricks a  
nd so forth. So your notion of how it all works may also undergo s  
ome revisions as you read. But that is in the spirit of the d

690

Preprocessing Selects a Mini-v  
ocabular

690

Suppose, then, that we have some Bongard problem which we want t  
o solve. The problem is presented to a TV camera and the raw data are r  
ead in. Then the raw data are preprocessed. This means that some salient features are detected. The names of these features constitute a "mini-vocabulary" for the problem; they are drawn from a general "salient-  
feature vocabulary". Some typical terms of the salient-feature vocabulary a  
re: line segment, curve, horizontal, vertical, black, white, big, s  
mall, pointy, round .  
.. In a second stage of preprocessing, some knowledge about e  
lementary shapes is used; and if any are found, their names are also made a  
vailable. Thus, terms such as   
triangle, circle, square, indentation, protrusion, right a  
ngle, vertex, cusp, arrow .  
.. may be selected. This is roughly the point at which the conscious and t  
he unconscious meet, in humans. This discussion is primarily concerned w  
ith describing what happens from here on o  
u

690

High-Level Descrip  
tion

690

Now that the picture is "understood", to some extent, in terms of f  
amiliar concepts, some looking around is done. Tentative descriptions are m  
ade for one or a few of the twelve boxes. They will typically use simple descriptors such a  
s above, below, to the right of, to the left of, inside, outside of, c  
lose to, far from, parallel to, perpendicular to, in a row, s  
cattered, evenly spaced, irregularly spaced, e  
tc. Also, definite and indefinite numerical descriptors can be u  
sed: 1, 2, 3, 4, 5, ... many, few, e  
tc. More complicated descriptors may be built up, such a  
s further to the right of, less close to, almost parallel to, e

691

FIGURE 120. Bongard problem 47. [From M. Bongard, Pattern Recogn

691

Thus, a typical box-say 1-F of BP 4 7 (Fig. 120)-could be variously described as h  
aving: three s  
hapes O  
Tthree white s  
hapes o  
r a circle on the right   
o  
r two triangles and a c  
ircle o  
r two upwards-pointing triangles   
o  
r one large shape and two small s  
hapes o  
r one curved shape and two straight-edged s  
hapes o  
r a circle with the same kind of shape on the inside and o  
utside. Each of these descriptions sees the box through a "filter". Out of c  
ontext, any of them might be a useful description. As it turns out, though, all o  
f them are "wrong", in the context of the particular Bongard problem they   
are part of. In other words, if you knew the distinction between Classes I  
and II in BP 4 7, and were given one of the preceding lines as a descripti  
on of an unseen drawing, that information would not allow you to tell to w  
hich Class the drawing belonged. The essential feature of this box, in context, i  
s that it i  
ncludes a circle containing a trian  
gle. Note that someone who heard such a description would not be able t  
o reconstruct the original drawing, but would be able to r ecognize d  
rawing

692

FIGURE 121. Bongard problem 91. [From M. Bongard, Pattern Recogn

692

which have this property. It is a little like musical style: you may be a  
n infallible recognizer of Mozart, but at the same time unable to write anything which would fool anybody into thinking it was by M  
ozar

692

Now consider box 1-D of BP 91 (Fig. 1 21). An overloaded but "  
right" description in the context of BP 91 i  
s a circle with three rectangular i  
ntrusions. Notice the sophistication of such a description, in which the word "  
with" functions as a disclaimer, implying that the "circle" is not really a circle: it i  
s almost a circle, except that ... Furthermore, the intrusions are not f  
ull rectangles. There is a lot of "play" in the way we use language to d  
escribe things. Clearly, a lot of information has been thrown away, and even m  
ore could be thrown away. A priori, it is very hard to know what it would b  
e smart to throw away and what to keep. So some sort of method for a  
n intelligent compromise has to be encoded, via heuristics. Of course, there i  
s always recourse to lower levels of description (i.e., less chunked descriptions) if discarded information has to be retrieved, just as people c  
an constantly look at the puzzle for help in restructuring their ideas about i  
t. The trick, then, is to devise explicit rules that say how to   
make tentative descriptions for each box;  
compare them with tentative descriptions for other boxes of e  
ither C  
lass; restructure the descriptions, b  
y (i) adding information  
,(ii) discarding i  
nformation,or (iii) viewing the same information from another a  
ngle;iterate this process until finding out what makes the two C  
lasses d

693

Templates and Sameness-D  
etector

693

One good strategy would be to try to make descriptions structurally similar t  
oeach other, to the extent this is possible. Any structure they have in c  
ommon will make comparing them that much easier. Two important elements o  
f this theory deal with this strategy. One is the idea of"description-sc  
hemas", or templates; the other is the idea of Sam-a "sameness d

693

First Sam. Sam is a special agent present on all levels of the program  
. (Actually there may be different kinds of Sams on different levels.) S  
am constantly runs around within individual descriptions and within diffe  
rent descriptions, looking for descriptors or other things which are r  
epeated. When some sameness is found, various restructuring operations can b  
e triggered, either on the single-description level or on the level of s  
everal descriptions at o

693

Now templates. The first thing that happens after preprocessing is a  
n attempt to manufacture a template, or description-schema-a uniform format for the descriptions of all the boxes in a problem. The idea is that a  
description can often be broken up in a natural way into s  
ubdescriptions, and those in turn into subsubdescriptions, if need be. The bottom is hit   
when you come to primitive concepts which belong to the level of t  
he preprocessor. Now it is important to choose the way of breaking descriptions into parts so as to reflect commonality among all the boxes; o  
therwise you are introducing a superfluous and meaningless kind of "pse  
udo-order" into the w

693

On the basis of what information is a template built? It is best to look a  
t an example. Take BP 49 (Fig. 122). Preprocessing yields the info  
rmation that each box consists of several little o's, and one large closed curve. This i  
s a valuable observation, and deserves to be incorporated in the t  
emplate. Thus a first stab at a template would b  
e: 6  
50 large closed curve: -  
small o's: -

693

FIGURE 122. Bongard problem 49. [From M. Bongard, Pattern Recognition.

694

It is very simple: the description-template has two explicit slots w  
here subdescriptions are to be a  
ttache

694

A Heterarchical P  
rogra

694

Now an interesting thing happens, triggered by the term "closed c  
urve". One of the most important modules in the program is a kind of semanti  
c net-the concept network-in which all the known nouns, adjectives, etc., a  
re linked in ways which indicate their interrelations. For instance, "  
closed curve" is strongly linked with the terms "interior" and "exterior". T  
he concept net is just brimming with information about relations between   
terms, such as what is the opposite of what, what is similar to what, w  
hat often occurs with what, and so on. A little portion of a concept network, t  
o be explained shortly, is shown in Figure 123. But let us follow w  
hat happens now, in the solution of problem 49. The concepts "interior" a  
nd "exterior" are activated by their proximity in the net to "closed curve". This   
suggests to the template-builder that it might be a good idea to m  
ake distinct slots for the interior and exterior of the curve. Thus, in the spirit o  
f tentativity, the template is tentatively restructured to be t  
his: large closed curve: -  
little o's in interior: -  
little o's in exterior: -  
-Now when subdescriptions are sought, the terms "interior" and "exteri  
or" will cause procedures to inspect those specific regions of the box. What i  
s found in BP 49, box I-A is t  
his: large closed curve: circle  
little o's in interior: t  
hreelittle o's in exterior: t  
hreeAnd a description of box II-A of the same BP might b  
e large closed curve: ciga  
rlittle o's in interior: t  
hreelittle o's in exterior: t  
hreeNow Sam, constantly active in parallel with other operations, spots t  
he recurrence of the concept "three" in all the slots dealing with o's, and this is   
strong reason to undertake a second template-restructuring o  
peration. Notice that the first was suggested by the concept net, the second by S  
am. Now our template for problem 49 b  
ecomes: large closed curve: -  
-three little o's in interior: -  
three little o's in exterior: -

696

Now that "three" has risen one level of generality-namely, into t  
he template-it becomes worthwhile to explore its neighbors in the concept   
network. One of them is "triangle", which suggests that triangles of o's may   
be important. As it happens, this leads down a blind alley-but how c  
ould you know in advance? It is a typical blind alley that a human would e  
xplore, so it is good if our program finds it too! For box 11-E, a description such a  
s the following might get g  
enerated: large closed curve: circl  
e three little o's in interior: equilateral tri  
angle three little o's in exterior: equilateral trian  
gle Of course an enormous amount of information has been thrown a  
way concerning the sizes, positions, and orientations of these triangles, a  
nd many other things as well. But that is the whole point of making descriptions instead of just using the raw data! It is the same idea as f  
unneling, which we discussed in Chapter X

696

The Concept Netw  
or

696

We need not run through the entire solution of problem 49; this suffices to   
show the constant back-and-forth interaction of individual d  
escriptions, templates, the sameness-detector Sam, and the concept network. W  
e should now look a little more in detail at the concept network and i  
ts function. A simplified portion shown in the figure codes the f  
ollowing i  
deas: "High" and "low" are o  
pposites. "Up" and "down" are o  
pposites. "High" and "up" are s  
imilar. "Low" and "down" are similar.   
"Right" and "left" are o  
pposites. The "right-left" distinction is similar to the "high-low" distinction  
. "Opposite" and "similar" are o  
pposites. Note how everything in the net-both nodes and links-can be t  
alked about. In that sense nothing in the net is on a higher level than a  
nything else. Another portion of the net is shown; it codes for the ideas t  
hat A square is a p  
olygon. A triangle is a polygo  
n. A polygon is a closed c

696

FIGURE 123. A small portion of a concept network for a program to solve Bon  
gard problems. "Nodes" are joined by "links", which in tum can be linked. By considering a link a  
s a verb and the nodes it joins as subject and object, you can pull out some English sentences fro  
m this diagra

697

The difference between a triangle and a square is that one has 3   
sides and the other has 4  
. 4 is similar to 3  
. A circle is a closed c  
urve. A closed curve has an interior and an e  
xterior. "Interior" and "exterior" are o  
pposites. I  
The network of concepts is necessarily very vast. It seems to store knowl-edge only statically, or declaratively, but that is only half the story. A  
ctually, its knowledge borders on being procedural as well, by the fact that t  
he proximities in the net act as guides, or "programs", telling the main program how to develop its understanding of the drawings in the b  
oxe

697

For instance, some early hunch may turn out to be wrong and yet h  
ave the germ of the right answer in it. In BP 33 (Fig. 124), one might at fi  
rs

697

FIGURE 124. Bongard problem 33. [From M. Bongard, Pattern Recognit

697

jump to the idea that Class I boxes contain "pointy" shapes, Class II boxe  
s contain "smooth" ones. But on closer inspection, this is wrong. Nevertheless, there is a worthwhile insight here, and one can try to push it f  
urther, by sliding around in the network of concepts beginning at "pointy". It i  
s close to the concept "acute", which is precisely the distinguishing feature o  
f Class I. Thus one of the main functions of the concept network is to a  
llow early wrong ideas to be modified slightly to slip into variations which m  
ay be c

697

Slippage and T enta  
tivit

697

Related to this notion of slipping between closely related terms is the n  
otion of seeing a given object as a variation on another object. An e  
xcellent example has been mentioned already-that of the "circle with three indentations", where in fact there is no circle at all. One has to be able to b  
end concepts, when it is appropriate. Nothing should be absolutely rigid. O  

698

the other hand, things shouldn't be so wishy-washy that nothing has a  
ny meaning at all, either. The trick is to know when and how to slip o  
ne concept into a  
nothe

698

An extremely interesting set of examples where slipping from o  
ne description to another is the crux of the matter is given in B  
ongard problems 85-87 (Fig. 125). BP 85 is rather trivial. Let us assume that o  
ur program identifies "line segment" in its preprocessing stage. It is r  
elatively simple for it then to count line segments and arrive at the diffe  
renc

698

FIGURE 125. Bongard problems 85-87. [From M. Bongard, Pattern Recogniti

699

between Class I and Class II in BP 85. Now it goes on to BP 86. A g  
eneral heuristic which it uses is to try out recent ideas which have worked. Successfu  
l repetition of recent methods is very common in the real world, and Bongard does not try to outwit this kind of heuristic in his collection-in fact,  
he reinforces it, fortunately. So we plunge right into problem 86 with t  
wo ideas ("count" and "line segment") fused into one: "count line segments"  
. But as it happens, the trick of BP 86 is to count line trains rather than l  
ine segments, where "line train" means an end-to-end concatenation of (one o  
r more) line segments. One way the program might figure this out is if t  
he concepts "line train" and "line segment" are both known, and are close i  
n the concept network. Another way is if it can invent the concept of "  
line train"-a tricky proposition, to say the least

699

Then comes BP 87, in which the notion of "line segment" is f  
urther played with. When is a line segment three line segments? (See box II-  
A.) The program must be sufficiently flexible that it can go back and f  
orth between such different representations for a given part of a drawing. It i  
s wise to store old representations, rather than forgetting them and p  
erhaps having to reconstruct them, for there is no guarantee that a newer representation is better than an old one. Thus, along with each old representation should be stored some of the reasons for liking it and disliking it. (  
This begins to sound rather complex, doesn't i

699

Meta-Descr  
iption

699

Now we come to another vital part of the recognition process, and t;hat h  
as to do with levels of abstraction and meta-descriptions. For this let u  
s consider BP 91 (Fig. 121) again. What kind of template could be constructed here? There is such an amount of variety that it is hard to k  
now where to begin. But this is in itself a clue! The clue says, namely, that t  
he class distinction very likely exists on a higher level of abstraction than t  
hat of geometrical description. This observation clues the program that i  
t should construct descriptions of descriptions-that is, meta-descriptions. P  
erhaps on this second level some common feature will emerge; and if we are lucky  
, we will discover enough commonality to guide us towards the fo  
rmulation of a template for the meta-descriptions! So we plunge ahead without a  
template, and manufacture descriptions for various boxes; then, once t  
hese descriptions have been made, we de5cribe them. What kinds of slot will our   
template for meta-descriptions have? Perhaps these, among others:  
concepts used: -  
recurring concepts: -names of slots: -filters used: -  
-There are many other kinds of slots which might be needed in metadescriptions, but this is a sample. Now suppose we have described box 1  
-E of BP 91. Its (template-less) description might look like this:

700

horizontal line segm  
ent vertical line segment mounted on the horizontal line s  
egment vertical line segment mounted on the horizontal line segment   
vertical line segment mounted on the horizontal line s  
egment Of course much information has been thrown out: the fact that the t  
hree vertical lines are of the same length, are spaced equidistantly, etc. But it i  
s plausible that the above description would be made. So the metadescription might look like t  
his: concepts used: vertical-horizontal, line segment, mounted o  
n repetitions in description: 3 copies of "vertical line segment mounted o  
n the horizontal line s  
egment" names of slots: --  
filters used: --  
Not all slots of the meta-description need be filled in; information can b  
e thrown away on this level as well as on the •�ust-plain-description" l

700

Now if we were to make a description for any of the other boxes o  
f Class I, and then a meta-description of it, we would wind up filling the s  
lot "repetitions in description" each time with the phrase "3 copies of ... " T  
he sameness-detector would notice this, and pick up three-ness as a s  
alient feature, on quite a high level of abstraction, of the boxes of Class I  
. Simila rly, four-ness would be recognized, via the method of metadescriptions, as the mark of Class I

700

Flexibility Is Importa  
n

700

Now you might object that in this case, resorting to the method of metadescriptions is like shooting a fly with an elephant gun, for the t  
hree-ness versus four-ness might as easily have shown up on the lower level if we h  
ad constructed our descriptions slightly differently. Yes, true-but it is important to have the possibility of solving these problems by different routes.  
There should be a large amount of flexibility in the program; it should n  
ot be doomed if, malaphorically speaking, it "barks up the wrong alley" for a   
while. (The amusing term "malaphor" was coined by the newspaper columnist Lawrence Harrison; it means a cross between a malapropism and a  
metaphor. It is a good example of "recombinant ideas".) In any case, I  
wanted to illustrate the general principle that says: When it is hard to b  
uild a template because the preprocessor finds too much diversity, that s  
hould serve as a clue that concepts on a higher level of abstraction are i  
nvolved than the preprocessor knows a

700

Focusing and Filtering

700

Now let us deal with another question: ways to throw information out. This   
involves two related notions, which I call "focusing" and "filtering". Focus

701

FIGURE 126. Bongard problem 55. [From M. Bongard, Pattern Recognition.]

701

FIGURE 127. Bongard problem 22. [From M. Bongard, Pattern Recogniti

701

ing involves making a description whose focus is some part of the d  
rawing in the box, to the exclusion of everything else. Filtering involves making a  
description which concentrates on some particular way of viewing t  
he contents of the box, and deliberately ignores all other aspects. Thus t  
hey are complementary: focusing has to do with objects (roughly, nouns), a  
nd filtering has to do with concepts (roughly, adjectives). For an example o  
f focusing, let's look at BP 55 (Fig. 126). Here, we focus on the i  
ndentation and the little circle next to it, to the exclusion of the everything else in t  
he box. BP 22 (Fig. 127) presents an example of filtering. Here, we must fi  
lter out every concept but that of size. A combination of focusing and filtering is   
required to solve problem BP 58 (Fig. 128

701

One of the most important ways to get ideas for focusing and fi  
ltering is by another sort of "focusing": namely, by inspection of a single particularly simple box-say one with as few objects in it as possible. It can b  

702

FIGURE 128. Bongard problem 58. [From M. Bongard, Pattern Recogn  
itio

702

FIGURE 129. Bongard problem 61. [From M. Bongard, Pattern Recogn

702

extremely helpful to compare the starkest boxes from the two Classes. B  
ut how can you tell which boxes are stark until you have descriptions f  
or them? Well, one way of detecting starkness is to look for a box with a  
minimum of the features provided by the preprocessor. This can be d  
one very early, for it does not require a pre-existing template; in fact, this c  
an be one useful way of discovering features to build into a template. BP 6  
1 (Fig. 129) is an example where that technique might quickly lead to a s  
olutio

702

Science and the World of Bongard P  
roblem

702

One can think of the Bongard-problem world as a tiny place where "science" is done-that is, where the purpose is to discern patterns in t  
he world. As patterns are sought, templates are made, unmade, and r  
emad

703

FIGURE 130. Bongard problems 70-71. [From M. Bongard, Pattern Recogniti

703

slots are shifted from one level of generality to another; filtering a  
nd focusing are done; and so on. There are discoveries on all levels of complexity. The Kuhnian theory that certain rare events called "  
paradigm shifts" mark the distinction between "normal" science and "  
conceptual revolutions" does not seem to work, for we can see paradigm shifts happening all throughout the system, all the time. The fluidity of d  
escriptions ensures that paradigm shifts will take place on all scales.

703

Of course, some discoveries are more "revolutionary" than othe  
rs, because they have wider effects. For instance, one can make the discove  
ry that problems 70 and 71 (Fig. 130) are "the same problem", when looked a  
t on a sufficiently abstract level. The key observation is that both i  
nvolve depth-2 versus depth-I nesting. This is a new level of discovery that can b  
e made about Bongard problems. There is an even higher level, c  
oncerning the collection as a whole. If someone has never seen the collection, it can b  
e a good puzzle just to figure out what it is. To figure it out is a r  
evolutionary insight, but it must be pointed out that the mechanisms of thought whi  
ch allow such a discovery to be made are no different from those whi  
ch operate in the solution of a single Bongard p

704

By the same token, real science does not divide up into "  
normal" periods versus "conceptual revolutions"; rather, paradigm shi  
fts pervade-there are just bigger and smaller ones, paradigm shifts on different levels. The recursive plots of INT and Gplot (Figs. 32 and 34) provide a  
geometric model for this idea: they have the same structure full of discontinuous jumps on every level, not just the top level-only the lower t  
he level, the smaller the j

704

Connections to Other Types of T  
hough

704

To set this entire program somewhat in context, let me suggest two ways i  
n which it is related to other aspects of cognition. Not only does it depend on   
other aspects of cognition, but also they in turn depend on it. First let m  
e comment on how it depends on other aspects of cognition. The intu  
ition which is required for knowing when it makes sense to blur distinctions, t  
o try redescriptions, to backtrack, to shift levels, and so forth, is s  
omething which probably comes only with much experience in thought in g  
eneral. Thus it would be very hard to define heuristics for these crucial aspects o  
f the program. Sometimes one's experience with real objects in the world h  
as a subtle effect on how one describes or redescribes boxes. For instance, who   
can say how much one's familiarity with living trees helps one to solve B  
P 70? It is very doubtful that in humans, the subnetwork of concepts relevan  
t to these puzzles can be easily separated out from the whole n  
etwork. Rather, it is much more likely that one's intuitions gained from seeing a  
nd handling real objects-combs, trains, strings, blocks, letters, rubber b  
ands, etc., etc.-play an invisible but significant guiding role in the solution o  
f these p

704

Conversely, it is certain that understanding real-world situations heavily depends on visual imagery and spatial intuition, so that having a powerful and flexible way of representing patterns such as these Bongard patterns can only contribute to the general efficiency of thought process

704

It seems to me that Bongard's problems were worked out with g  
reat care, and that they have a quality of universality to them, in the sense t  
hat each one has a unique correct answer. Of course one could argue with t  
his and say that what we consider "correct" depends in some deep way on o  
ur being human, and some creatures from some other star system m  
ight disagree entirely. Not having any concrete evidence either way, I still have a  
certain faith that Bongard problems depend on a sense of simplicity w  
hich is not just limited to earthbound human beings. My earlier comments a  
bout the probable importance of being acquainted with such surely e  
arth-limited objects as combs, trains, rubber bands, and so on, are not in conflict w  
ith the idea that our notion of simplicity is universal, for what matters is n  
ot any of these individual objects, but the fact that taken together they span a  
wide space. And it seems likely that any other civilization would have as v  
ast a repertoire of artifacts and natural objects and varieties of experience o  
n which to draw as we do. So I believe that the skill of solving B  
ongar

705

problems lies very close to the core of "pure" intelligence, if there is such a   
thing. Therefore it is a good place to begin if one wants to investigate t  
he ability to discover "intrinsic meaning" in patterns or messages. Unfortunately we have reproduced only a small selection of his stimulating collection. I hope that many readers will acquaint themselves with the e  
ntire collection, to be found in his book (see Bibliography).

705

Some of the problems of visual pattern recognition which we h  
uman beings seem to have completely "flattened" into our unconscious are q  
uite amazing. They i  
nclude: recognition of faces (invariance of faces under age change, expression change, lighting change, distance change, a  
ngle change, e  
tc.) recognition of hiking trails in forests and m  
ountains-somehow this has always impressed me as one of our most subtle acts o  
f pattern recognition-and yet animals can do it, t  
oo reading text without hesitation in hundreds if not thousands o  
f different t  
ypeface

705

Message-Passing Languages, Frames, and S  
ymbol

705

One way that has been suggested for handling the complexities of p  
attern recognition and other challenges to Al programs is the so-called "  
actor" formalism of Carl Hewitt (similar to the language "Smalltalk", d  
eveloped by Alan Kay and others), in which a program is written as a collection o  
f interacting actors, which can pass elaborate messages back and forth among   
themselves. In a way, this resembles a heterarchical collection of procedures which can call each other. The major difference is that where procedures usually only pass a rather small number of arguments back a  
nd forth, the messages exchanged by actors can be arbitrarily long and comp

705

Actors with the ability to exchange messages become somewhat autonomous agents-in fact, even like autonomous computers, with message  
s being somewhat like programs. Each actor can have its own idiosy  
ncratic way of interpreting any given message; thus a message's meaning w  
ill depend on the actor it is intercepted by. This comes about by the a  
ctor having within it a piece of program which interprets messages; so t  
here may be as many interpreters as there are actors. Of course, there may be   
many actors with identical interpreters; in fact, this could be a great advantage, just as it is extremely important in the cell to have a multitude ·  
of identical ribosomes floating throughout the cytoplasm, all of which w  
ill interpret a message-in this case, messenger RNA-in one and the s  
ame w

705

It is interesting to think how one might merge the frame-notion w  
ith the actor-notion. Let us call a frame with the capability of generating a  
nd interpreting complex messages a symbol:  
frame + actor = s  
ymbo

706

We now have reached the point where we are talking about ways of   
implementing those elusive active symbols of Chapters XI and XII; henceforth in this Chapter, "symbol" will have that meaning. By the way, d  
on't feel dumb if you don't immediately see just how this synthesis is to be m  
ade. It is not clear, though it is certainly one of the most fascinating directions t  
o go in AI. Furthermore, it is quite certain that even the best synthesis of   
these notions will turn out to have much less power than the actual s  
ymbols of human minds. In that sense, calling these frame-actor syntheses "symbols" is premature, but it is an optimistic way of looking at t  
hing

706

Let us return to some issues connected with message passing. S  
hould each message be directed specifically at a target symbol, or should it b  
e thrown out into the grand void, much as mRN A is thrown out into t  
he cytoplasm, to seek its ribosome? If messages have destinations, then e  
ach symbol must have an address, and messages for it should always be sent t  
o that address. On the other hand, there could be one central receiving d  
ock for messages, where a message would simply sit until it got picked up b  
y some symbol that wanted it. This is a counterpart to General D  
elivery. Probably the best solution is to allow both types of message to exist; also t  
o have provisions for different classes of urgency-special delivery, first c  
lass, second class, and so on. The whole postal system provides a rich source o  
f ideas for message-passing languages, including such curios as selfaddressed stamped envelopes (messages whose senders want a  
nswers quickly), parcel post (extremely long messages which can be sent some v  
ery slow way), and more. The telephone system will give you more i  
nspiration when you run out of postal-system i  
dea

706

Enzymes and A  

706

Another rich source of ideas for message passing-indeed, for i  
nformation processing in general-is, of course, the cell. Some objects in the cell a  
re quite comparable to actors-in particular, enzymes. Each enzyme's a  
ctive site acts as a filter which only recognizes certain kinds of substrates (messages). Thus an enzyme has an "address", in effect. The enzyme is "programmed" (by virtue of its tertiary structure) to carry out certain operations upon that "message", and then to release it to the world again. Now i  
n this way, when a message is passed from enzyme to enzyme along a  
chemical pathway, a lot can be accomplished. We have already desc  
ribed the elaborate kinds of feedback mechanisms which can take place in c  
ells (either by inhibition or repression). These kinds of me::chanisms show t  
hat complicated control of processes can arise through the kind of m  
essage passing that exists in the cel  

706

One of the most striking things about enzymes is how they sit a  
round idly, waiting to be triggered by an incoming substrate. Then, when t  
he substrate arrives, suddenly the enzyme springs into action, like a Venus'sflytrap. This kind of "hair-trigger" program has been used in AI, and g  
oes by the name of demon. The important thing here is the idea of having m  
any different "species" of triggerable subroutines just lying around waiting t  

707

be triggered. In cells, all the complex molecules and organelles are built u  
p, simple step by simple step. Some of these new structures are often e  
nzymes themselves, and they participate in the building of new enzymes, which i  
n turn participate in the building of yet other types of enzyme, etc. S  
uch recursive cascades of enzymes can have drastic effects on what a cell i  
s doing. One would like to see the same kind of simple step-by-step a  
ssembly process imported into AI, in the construction of useful subprograms. F  
or instance, repetition has a way of burning new circuits into our m  
ental hardware, so that oft-repeated pieces of behavior become encoded b  
elow the conscious level. It would be extremely useful if there were an a  
nalogous way of synthesizing efficient pieces of code which can carry out the same   
sequence of operations as something which has been learned on a h  
igher level o f"consciousness". Enzyme cascades may suggest a model for how t  
his could be done. (The program called "HACKER", written by G  
erald Sussman, synthesizes and debugs small subroutines in a way not too m  
uch unlike that of enzyme cascades.

707

The sameness-detectors in the Bongard problem-solver (Sams) c  
ould be implemented as enzyme-like subprograms. Like an enzyme, a S  
am would meander about somewhat at random, bumping into small d  
ata structures here and there. Upon filling its two "active sites" with iden  
tical data structures, the Sam would emit a message to other parts (actors) of t  
he program. As long as programs are serial, it would not make much sense t  
� have several copies of a Sam, but in a truly parallel computer, r  
egulating the number of copies of a subprogram would be a way of regulating t  
he expected waiting-time before an operation gets done, just as regulating the   
number of copies of an enzyme in a cell regulates how fast that f  
unction gets performed. And if new Sams could be synthesized, that would b  
e comparable to the seepage of pattern detection into lower levels of o  
ur m

707

Fission and F  
usio

707

Two interesting and complementary ideas concerning the interaction o  
f symbols are "fission" and "fusion". Fission is the gradual divergence of a  
new symbol from its parent symbol (that is , from the symbol which s  
erved as a template off of which it was copied). Fusion is what happens when two   
(or more) originally unrelated symbols participate in a ''.joint a  
ctivation", passing messages so tightly back and forth that they get bound t  
ogether and the combination can thereafter be addressed as if it were a s  
ingle symbol. Fission is a more or less inevitable process, since once a new s  
ymbol has been "rubbed off'' of an old one, it becomes autonomous, and i  
ts interactions with the outside world get reflected in its private i  
nternal structure; so what started out as a perfect copy will soon become imper  
fect, and then slowly will become less and less like the symbol off of which it was   
"rubbed". Fusion is a subtler thing. When do two concepts really b  
ecome one? Is there some precise instant when a fusion takes p

708

This notion of joint activations opens up a Pandora's box of q  
uestions. For instance, how much do we hear "dough" and "nut" when we s  
ay "doughnut"? Does a German who thinks of gloves ("Handschuhe") h  
ear "hand-shoes" or not? How about Chinese people, whose word "dong  
-xi" ("East-West") means "thing"? It is a matter of some political concern, t  
oo, since some people claim that words like "chairman" are heavily char  
ged with undertones of the male gender. The degree to which the parts resonate inside the whole probably varies from person to person and a  
ccording to circumstances.

708

The real problem with this notion of "fusion" of symbols is that it i  
s very hard to imagine general algorithms which will create meaningful n  
ew symbols from colliding symbols. It is like two strands of DNA which come   
together. How do you take parts from each and recombine them into a  
meaningful and viable new strand of DNA which codes for an individual o  
f the same species? Or a new kind of species? The chance is infinitesimal t  
hat a random combination of pieces of DNA will code for anything that w  
ill survive-something like the chance that a random combination of w  
ords from two books will make another book. The chance that recombinant   
DNA will make sense on any level but the lowest is tiny, precisely b  
ecause there are so many levels of meaning in DNA. And the same goes f  
or "recombinant s

708

Epigenesis of the Crab C  
ano

708

I think of my Dialogue Crab Canon as a prototype example where two i  
deas collided in my mind, connected in a new way, and suddenly a new kind o  
f verbal structure came alive in my mind. Of course I can still think a  
bout musical crab canons and verbal dialogues separately-they can still b  
e activated independently of each other; but the fused symbol for crabcanonical dialogues has its own characteristic modes of activation, too. T  
o illustrate this notion of fusion or "symbolic recombination" in some d  
etail, then, I would like to use the development of my Crab Canon as a case s  
tudy, because, of course, it is very familiar to me, and also because it is interesting, yet typical of how far a single idea can be pushed. I will recount it i  
n stages named after those of meiosis, which is the name for cell division i  
n which "crossing-over", or genetic recombination, takes place-the source o  
f diversity in evolu

708

PROPHASE: I began with a rather simple idea-that a piece of m  
usic, say a canon, could be imitated verbally. This came from the o  
bservation that, through a shared abstract form, a piece of text and a piece of m  
usic may be connected. The next step involved trying to realize some of t  
he potential of this vague hunch; here, I hit upon the idea that "voices" i  
n canons can be mapped onto "characters" in dialogues-still a rather obvious i

708

Then I focused down onto specific kinds of canons, and r  
emembered that there was a crab canon in the Musical Offering. At that time, I had j  
us

709

begun writing Dialogues, and there were only two characters: Achilles a  
nd the Tortoise. Since the Bach crab canon has two voices, this m  
apped perfectly: Achilles should be one voice, the Tortoise the other, with the o  
ne doing forwards what the other does backwards. But here I was faced with a  
problem: on what level should the reversal take place? The letter level? T  
he word level? The sentence level? After some thought, I concluded that t  
he "dramatic line" level would be most a  
ppropriat

709

Now that the "skeleton" of the Bach crab canon had been t  
ransplanted, at least in plan, into a verbal form, there was just one problem. When t  
he two voices crossed in the middle, there would be a short period of e  
xtreme repetition: an ugly blemish. What to do about it? Here, a strange t  
hing happened, a kind of level-crossing typical of creative acts: the word "  
crab" in "crab canon" flashed into my mind, undoubtedly because of s  
ome abstract shared quality with the notion of "tortoise"-and immediately I  
realized that at the dead center, I could block the repetitive effect, b  
y inserting one special line, said by a new character: a Crab! This is how, i  
n the "prophase" of the Crab Canon, the Crab was conceived: at the crossingover of Achilles and the Tortoise. (See Fig. 131.)

709

-  
FIGURE 13 I. A schematic diagram of the Dialogue Crab C  
ano

709

MET APHASE: This was the skeleton of my Crab Canon. I then e  
ntered the second stage-the "metaphase"-in which I had to fill in the fl  
esh, which was of course an arduous task. I made a lot of stabs at it, getting u  
sed to the way in which pairs of successive lines had to make sense when r  
ead from either direction, and experimenting around to see what kinds of d  
ual meanings would help me in writing such a form (e.g., "Not at all"). T  
here were two early versions both of which were interesting, but weak. I abandoned work on the book for over a year, and when I returned to the C  
rabCanon, I had a few new ideas. One of them was to mention a Bach c  
anon inside it. At first my plan was to mention the "Canon per a  
ugmentationem, contrario motu", from the Musical Offering (Sloth Canon, as I call it). B  
ut that started to seem a little silly, so reluctantly I decided that inside my C  
rabCanon, I could talk about Bach's own Crab Canon instead. Actually, this w  
as a crucial turning point, but I didn't know it t  
he

709

Now if one character was going to mention a Bach piece, wouldn't it b  
e awkward for the other to say exactly the same thing in the c  
orresponding place? Well, Escher was playing a similar role to Bach in my thoughts a  
nd my book, so wasn't there some way of just slightly modifying the line so t  
hat it would refer to Escher? After all, in the strict art of canons, note-pe  
rfect imitation is occasionally foregone for the sake of elegance or beauty. A  
n

710

no sooner did that idea occur to me than the picture Day and Night (Fig. 4  
9) popped into my mind. "Of course!" I thought, "It is a sort of pictorial c  
rab canon, with essentially two complementary voices carrying the same t  
heme both leftwards and rightwards, and harmonizing with each othe r!" H  
ere again was the notion of a single "conceptual skeleton" being instantiated i  
n two different media-in this case, music and art. So I let the Tortoise t  
alk about Bach, and Achilles talk about Escher, in parallel language; c  
ertainly this slight departure from strict imitation retained the spirit of crab c  
anot1

710

At this point, I began realizing that something marvelous was happening: namely, the Dialogue was becoming self-referential, without my e  
ven having intended it! What's more, it was an indirect self-reference, in t  
hat the characters did not talk directly about the Dialogue they were in, b  
ut rather about structures which were isomorphic to it (on a certain plane o  
f abstraction). To put it in the terms I have been using, my Dialogue n  
ow shared a "conceptual skeleton" with Godel's G, and could therefore b  
e mapped onto Gin somewhat the way that the Central Dogma was, to c  
reate in this case a "Central Crabmap". This was most exciting to me, since out o  
f nowhere had come an esthetically pleasing unity of Godel, Escher, a  
nd B

710

ANAP HASE: The next step was quite startling. I had had Caroli  
ne MacGillavry's monograph on Escher's tesselations for years, but one day, a  
s I flipped through it, my eye was riveted to Plate 23 (Fig. 42), for I saw it in a  
way I had never seen it before: here was a genuine crab canon--crab-like i  
n both form and content! Escher himself had given the picture no title, and   
since he had drawn similar tesselations using many other animal forms, it i  
s probable that this coincidence of form and content was just s  
omething which I had noticed. But fortuitous or not, this untitled plate was a miniature version of one main idea of my book: to unite form and content. So   
with delight I christened it Crab Canon, substituted it for Day and Night, a  
nd modified Achilles' and the Tortoise's remarks accordi  
ngl

710

Yet this was not all. Having become infatuated with molecular biolo  
gy, one day I was perusing Watson's book in the bookstore, and in the i  
ndex saw the word "palindrome". When I looked it up, I found a magical t  
hing: crab-canonical structures in DNA. Soon the Crab's comments had b  
een suitably modified to include a short remark to the effect that he owed h  
is predilection for confusing retrograde and forward motion to his g

710

TELOPH ASE: The last step came months later, when, as I was t  
alking about the picture of the crab-canonical section of DNA (Fig. 43), I saw t  
hat the 'A', 'T', 'C' of Adenine, Thymine, Cytosine coincided- mir  
abile dictu-with the 'A', 'T', 'C' of Achilles, Tortoise, Crab; moreover, just a  
s Adenine and Thymine are paired in DNA, so are Achilles and the Tort  
oise paired in the Dialogue. I thought for a moment and, in another of tho  
se level-crossings, saw that 'G', the letter paired with 'C' in DNA, could s  
tand for "Gene". Once again, I jumped back to the Dialogue, did a little s  
urgery on the Crab's speech to reflect this new discovery, and now I had a m  
apping between the DNA's structure, and the Dialogue's structure. In that s  
ense, the DNA could be said to be a genotype coding for a phenotype: the

711

structure of the Dialogue. This final touch dramatically heightened t  
he self-reference, and gave the Dialogue a density of meaning which I had   
never anti

711

Conceptual Skeletons and Conceptual M  
appin

711

That more or less summarizes the epigen�sis of the Crab Canon. The whole   
process can be seen as a succession of mappings of ideas onto each other, a  
t varying levels of abstraction. This is what I call conceptual mapping, and t  
he abstract structures which connect up two different ideas are con  
ceptual skeletons. Thus, one conceptual skeleton is that of the abstract notion of a  
crab c  
anon: a structure having two parts which do the same thing,   
only moving in opposite d  
irections. This is a concrete geometrical image which can be manipulated by the mind   
almost as a Bongard pattern. In fact, when I think of the Crab Canon toda  
y, I visualize it as two strands which cross in the middle, where they are joined   
by a "knot" (the Crab's speech). This is such a vividly pictorial image that i  
t instantaneously maps, in my mind, onto a picture of two h  
omologous chromosomes joined by a centromere in their middle, which is an i  
mage drawn directly from meiosis, as shown in Figure 132

711

FIGURE 1

711

In fact, this very image is what inspired me to cast the description of t  
he Crab Canon's evolution in terms of meiosis-which is itself, of course, y  
et another example of conceptual m  
appin

711

Recombinant Ide  
a

711

There are a variety of techniques of fusion of two symbols. One i  
nvolves lining the two ideas up next to each other (as if ideas were linear!), t  
hen judiciously choosing pieces from each one, and recombining them in a n  
ew symbol. This strongly recalls genetic recombination. Well, what do chromosomes exchange, and how do they do it? They exchange genes. What in a  
symbol is comparable to a gene? If symbols have frame-like slots, then s  
lots, perhaps. But which slots to exchange, and why? Here is where the crabcanonical fusion may offer some ideas. Mapping the notion of "mus  
ical crab canon" onto that of "dialogue" involved several auxiliary mappings; i  

712

fact it induced them. That is, once it had been decided that these two n  
otions were to be fused, it became a matter of looking at them on a level w  
here analogous parts emerged into view, then going ahead and mapping the parts  
onto each other, and so on, recursively, to any level that was found desirable. Here, for instance, "voice" and "character" emerged as c  
orresponding slots when "crab canon" and "dialogue" were viewed abstractly. Where d  
id these abstract views come from, though? This is at the crux of t  
he mapping-problem-where do abstract views come from? How do you make   
abstract views of specific n

712

Abstractions, Skeletons, A  
nalogie

712

A view which has been abstracted from a concept along some dimension is   
what I call a conceptual skeleton. In effect, we have dealt with c  
onceptual skeletons all along, without often using that name. For instance, many of   
the ideas concerning Bongard problems could be rephrased using t  
his terminology. It is always of interest, and possibly of importance, when two   
or more ideas are discovered to share a conceptual skeleton. An example i  
s the bizarre set of concepts mentioned at the beginning of the Contraf actus: a  
Bicyclops, a tandem unicycle, a teeter-teeter, the game of ping-ping, a  
one-way tie, a two-sided Mobius strip, the "Bach twins", a piano c  
oncerto for two left hands, a one-voice fugue, the act of clapping with one hand, a  
two-channel monaural phonograph, a pair of eighth-backs. All of t  
hese ideas are "isomorphic" because they share this conceptual s  
keleton: a plural thing made singular and re-pluralized wrongly.   
Two other ideas in this book which share that conceptual skeleton are ( 1  
) the Tortoise's solution to Achilles' puzzle, asking for a word beginning a  
nd ending in "HE" (the Tortoise's solution being the pronoun "HE", w  
hich collapses two occurrences into one), and (2) the Pappus-Gelernter proof o  
f the Pons Asinorum Theorem, in which one triangle is reperceived as t  
wo. Incidentally, these droll concoctions might be dubbed "

712

A conceptual skeleton is like a set of constant features (as d  
istinguished from parameters or variables)-features which should not be slipped in a  
subjunctive instant replay or mapping-operation. Having no parameters o  
r variables of its own to vary, it can be the invariant core of several diffe  
rent ideas. Each instance of it, such as "tandem unicycle", does have layers o  
f variability and so can be "slipped" in various w  
ay

712

Although the name "conceptual skeleton" sounds absolute and r  
igid, actually there is a lot of play in it. There can be conceptual skeletons o  
n several different levels of abstraction. For instance, the "  
isomorphism" between Bongard problems 70 and 71, already pointed out, involves a  
higher-level conceptual skeleton than that needed to solve either p  
roblem in i

713

Multiple Representatio  
n

713

Not only must conceptual skeletons exist on different levels of a  
bstraction; also, they must exist along different conceptual dimensions. Let us take t  
he following sentence as an e  
xample: "The Vice President is the spare t  
ire on the automobile of gov  
ernment." How do we understand what it means (leaving aside its humor, which is o  
f course a vital aspect) ? If you were told, "See our government as an automobile" without any prior motivation, you might come up with a  
ny number of correspondences: steering wheel = president, etc .. What a  
re checks and balances? What are seat. belts? Because the two things b  
eing mapped are so different, it is almost inevitable that the mapping w  
ill involve functional aspects. Therefore, you retrieve from your store of conceptual skeletons representing parts of automobiles, only those having t  
o do with function, rather than, say, shape. Furthermore, it makes sense to   
work at a pretty high level of abstraction, where "function" isn't taken i  
n too narrow a context. Thus, of the two following definitions of the f  
unction of a spare tire: (1) "replacement for a flat tire", and (2) "replacement for a  
certain disabled part of a car", certainly the latter would be preferable, i  
n this case. This comes simply from the fact that an auto and a g  
overnment are so different that they have to be mapped at a high level of a  
bstractio

713

Now when the particular sentence is examined, the mapping g  
ets forced in one respect-but it is not an awkward way, by any means. In fa  
ct, you already have a conceptual skeleton for the Vice President, among   
many others, which says, "replacement for a certain disabled part of government". Therefore the forced mapping works comfortably. But s  
uppose, for the sake of contrast, that you had retrieved another conceptual s  
keleton for "spare tire"-say, one describing its physical aspects. Among other   
things, it might say that a spare tire is "round and inflated". Clearly, this i  
s not the right way to go. (Or is it? As a friend of mine pointed out, some V  
ice Presidents are rather portly, and most are quite inflate

713

Ports of A  
cces

713

One of the major characteristics of each idiosyncratic style of thought is   
how new experiences get classified and stuffed into memory, for t  
hat defines the "handles" by which they will later be retrievable. And f  
or events, objects, ideas, and so on-for everything that can be t  
hought about-there is a wide variety of "handles". I am struck by this each time I  
reach down to turn on my car radio, and find, to my dismay, that it i  
s already on! What has happened is that two independent r  
epresentations are being used for the radio. One is "music producer", the other is "boredom reliever". I am aware that the music is on, but I am bored anyway, a  
nd before the two realizations have a chance to interact, my reflex to r  
eac

714

down has been triggered. The same reaching-down reflex one day occurred just after I'd left the radio at a repair shop and was driving a  
way, wanting to hear some music. Odd. Many other representations for t  
he same object exist, such a  
s shiny silver-knob h  
aver overheating-problems h  
aver lying-on-my-back-over-hump-to-fix t  
hing buzz-ma  
ker slipping-dials obj  
ect multidimensional representation e  
xample All of them can act as ports of access. Though they all are attached to m  
y symbol for my car radio, accessing that symbol through one does not o  
pen up all the others. Thus it is unlikely that I will be inspired to r  
emember lying on my back to fix the radio when I reach down and turn it on. A  
nd conversely, when I'm lying on my back, unscrewing screws, I probab  
ly won't think about the time I heard the Art of the Fugue on it. There a  
re "partitions" between these aspects of one symbol, partitions that p  
revent my thoughts from spilling over sloppily, in the manner of free a  
ssociations. My mental partitions are important because they contain and channel t  
he flow of my t

714

One place where these partitions are quite rigid is in sealing off w  
ords for the same thing in different languages. If the partitions were not s  
trong, a bilingual person would constantly slip back and forth between l  
anguages, which would be very uncomfortable. Of course, adults learning two new   
languages at once often confuse words in them. The partitions b  
etween these languages are flimsier, and can break down. Interpreters are particularly interesting, since they can speak any of their languages as if t  
heir partitions were inviolable and yet, on command, they can negate tho  
se partitions to allow access to one language from the other, so they c  
an translate. Steiner, who grew up trilingual, devotes several pages in Aft  
er Babel to the intermingling of French, English, and German in the layers o  
f his mind, and how his different languages afford different ports of a  
ccess onto conce

714

Forced Matc  
hin

714

When two ideas are seen to share conceptual skeletons on some level o  
f abstraction, different things can happen. Usually the first stage is that y  
ou zoom in on both ideas, and, using the higher-level match as a guide, you t  
ry to identify corresponding subideas. Sometimes the match can be e  
xtended recursively downwards several levels, revealing a profound i  
somorphism. Sometimes it stops earlier, revealing an analogy or similarity. And t  
hen there are times when the high-level similarity is so compelling that, even i  
f there is no apparent lower-level continuation of the map, you just go a  
head and make one: this is the forced match

715

Forced matches occur every day in the political cartoons of newspapers: a political figure is portrayed as an airplane, a boat, a fish, the M  
ona Lisa; a government is a human, a bird, an oil rig; a treaty is a briefcase, a  
sword, a can of worms; on and on and on. What is fascinating is how e  
asily we can perform the suggested mapping, and to the exact depth intended.  
We don't carry the mapping out too deeply or too shallowly

715

Another example of forcing one thing into the mold of another occurred when I chose to describe the development of my Crab Canon in terms o  
f meiosis. This happened in stages. First, I noticed the common concep  
tual skeleton shared by the Crab Canon and the image of chromosomes joined b  
y a centromere; this provided the inspiration for the forced match. Then I  
saw a high-level resemblance involving "growth", "stages", and "recombination". Then I simply pushed the analogy as hard as I could. T  
entativity-as in the Bongard problem-solver-played a large role: I went forwards a  
nd backwards before finding a match which I found a

715

A third example of conceptual mapping is provided by the C  
entral Dogmap. I initially noticed a high-level similarity between the discoveries o  
f mathematical logicians and those of molecular biologists, then pursued i  
t on lower levels until I found a strong analogy. To strengthen it further, I  
chose a Godel-numbering which imitated the Genetic Code. This was the   
lone element of forced matching in the Central D

715

Forced matches, analogies, and metaphors cannot easily be s  
eparated out. Sportscasters often use vivid imagery which is hard to pigeonhole. F  
or instance, in a metaphor such as "The Rams [ football team] are s  
pinning their wheels", it is hard to say just what image you are supposed to conjure  
up. Do you attach wheels to the team as a whole? Or to each p  
layer? Probably neither one. More likely, the image of wheels spinning in mud o  
r snow simply flashes before you for a brief instant, and then in s  
ome mysterious way, just the relevant part� get lifted out and transferred to t  
he team's performance. How deeply are the football team and the car m  
apped onto each other in the split second that you do t

715

R  
eca

715

Let me try to tie things together a little. I have presented a number o  
f related ideas connected with the creation, manipulation, and c  
omparison of symbols. Most of them have to do with slippage in some fashion, the i  
dea being that concepts are composed of some tight and some loose e  
lements, coming from different levels of nested contexts (frames). The loose o  
nes can be dislodged and replaced rather easily, which, depending on t  
he circumstances, can create a "subjunctive instant replay", a forced match, o  
r an analogy. A fusion of two symbols may result from a process in whi  
ch parts of each symbol are dislodged and other parts r

716

Creativity and Randomne  
s

716

It is obvious that we are talking about mechanization of creativity. But i  
s this not a contradiction in terms? Almost, but not really. Creativity is t  
he essence of that which is not mechanical. Yet every creative act i  
s mechanical-it has its explanation no less than a case of the hiccups d  
oes. The mechanical substrate of creativity may be hidden from view, but i  
t exists. Conversely, there is something unmechanical in flexible p  
rograms, even today. It may not constitute creativity, but when programs cease to b  
e transparent to their creators, then the approach to creativity has b  
egu

716

It is a common notion that randomness is an indispensable i  
ngredient of creative acts. This may be true, but it does not have any bearing on t  
he mechanizability-or rather, programmability!-of creativity. The world is a   
giant heap of randomness; when you mirror some of it inside your h  
ead, your head's interior absorbs a little of that randomness. The t  
riggering patterns of symbols, therefore, can lead you down the most randomseeming paths, simply because they came from your interactions with a  
crazy, random world. So it can be with a computer program, too. Randomness is an intrinsic feature of thought, not something which has to b  
e "artificially inseminated", whether through dice, decaying nuclei, r  
andom number tables, or what-have-you. It is an insult to human creativity t  
o imply that it relies on such arbitrary s

716

What we see as randomness is often simply an effect of looking a  
t something symmetric through a "skew" filter. An elegant example w  
as provided by Salviati's two ways of looking at the number rr/4. Although the   
decimal expansion of rr/4 is not literally random, it is as random as o  
ne would need for most purposes: it is "pseudorandom". Mathematics is f  
ull of pseudorandomness-plenty enough to supply all would-be creators f  
or all tim

716

Just as science is permeated with "conceptual revolutions" on all l  
evels at all times, so the thinking of individuals is shot through and through w  
ith creative acts. They are not just on the highest plane; they are e  
verywhere. Most of them are small and have been made a million times b  
efore-but they are close cousins to the most highly creative and new acts. C  
omputer programs today do not yet seem to produce many small creations. Most o  
f what they do is quite "mechanical" still. That just testifies to the fact t  
hat they are not close to simulating the way we think-but they are g  
etting c

716

Perhaps what differentiates highly creative ideas from ordinary ones i  
s some combined sense of beauty, simplicity, and harmony. In fact, I have a   
favorite "meta-analogy", in which I liken analogies to chords. The idea i  
s simple: superficially similar ideas are often not deeply related; and d  
eeply related ideas are often superficially disparate. The analogy to chords i  
s natural: physically close notes are harmonically distant (e.g., E-F-G); a  
nd harmonically close notes are physically distant (e.g., G-E-B). Ideas t  
hat share a conceptual skeleton resonate in a sort of conceptual analogue to   
harmony; these harmonious "idea-chords" are often widely separated, a  

717

measured on an imaginary "keyboard of concepts". Of course, it d  
oesn't suffice to reach wide and plunk down any old way-you may hit a s  
eventh or a ninth! Perhaps the present analogy is like a ninth-chord-wide b  
ut d

717

Picking up Patterns on All L  
evel

717

Bongard problems were chosen as a focus in this Chapter because w  
hen you study them, you realize that the elusive sense for patterns which w  
e humans inherit from our genes involves all the mechanisms of representation of knowledge, including nested contexts, conceptual skeletons a  
nd conceptual mapping, slippability, descriptions and meta-descriptions a  
nd their interactions, fission and fusion of symbols, multiple r  
epresentations (along different dimensions and diff  
erent levels of abstraction), d  
efault expectations, and m  
or

717

These days, it is a safe bet that if some program can pick u  
p patterns in one area, it will miss patterns in another area which, to u  
s, are equally obvious. You may remember that I mentioned this back i  
n Chapter I, saying that machines can be oblivious to repetition, whe  
reas people cannot. For instance, consider SHRDLU. If Eta Oin typed t  
he sentence "Pick up a big red block and put it down" over and over a  
gain, SHRDLU would cheerfully react in the same way over and over a  
gain, exactly as an adding machine will print out "4" over and over a  
gain, if a human being has the patience to type "2+2" over and over agai  
n. Humans aren't like that; if some pattern occurs over and over a  
gain, they will pick it up. SHRDLU wasn't built with the potential for f  
orming new concepts or recognizing patterns: it had no sense of over and o  
vervie

717

The Flexibility of L  
anguag

717

SHRDLU's language-handling capability is immensely fl  
exible-within limits. SHRDLU can figure out sentences of great syntactical complexity, or  
sentences with semantic ambiguities as long as they can be resolved b  
y inspecting the data base-but it cannot handle "hazy" language. For instance, consider the sentence "How many blocks go on top of each other t  
o make a steeple?" We understand it immediately, yet it does not make sense   
if interpreted literally. Nor is it that some idiomatic phrase has been u  
sed. "To go on top of each other" is an imprecise phrase which nonetheless g  
ets the desired image across quite well to a human. Few people would be   
misled into visualizing a paradoxical 5-etup with two blocks each of which i  
s on top of the other--or blocks which are "going" somewhere or o  
the

717

The amazing thing about language is how imprecisely we use it a  
nd still manage to get away with it. SHRDLU uses words in a "metallic" w  
ay, while people use them in a "spongy'· or "rubbery" or even "Nutty-Puttyish" way. If words were nuts and bolts, people could make any bolt fit i  
nto any nut: they'd just squish the one into the other, as in some surrealis  
ti

718

painting where everything goes soft. Language, in human hands, b  
ecomes almost like a fluid, despite the coarse grain of its c  
omponent

718

Recently, AI research in natural language understanding has tur  
ned away somewhat from the understanding of single sentences in i  
solation, and more towards areas such as understanding simple children's s  
tories. Here is a well-known children's joke which illustrates the open-ende  
dness of real-life situations:  
A man took a ride in an airp  
lane. Unfortunately, he fell o  
ut. Fortunately, he had a parachute o  
n. Unfortunately, it didn't w  
ork. Fortunately, there was a haystack below h  
im. Unfortunately, there was a pitchfork sticking out of i  
t. Fortunately, he missed the p  
itchfork. Unfortunately, he missed the hays  
tack. It can be extended indefinitely. To represent this silly story in a framebased system would be extremely complex, involving jointly a  
ctivating frames for the concepts of man, airplane, exit, parachute, falling, etc., e  
t

718

Intelligence and E  
motion

718

Or consider this tiny yet poignant stor  
y: Margie was holding tightly to the string of her beautiful new balloo  
n. Suddenly, a gust of wind caught it. The wind carried it into a tree. The   
balloon hit a branch and burst. Margie cried and cried.4  
To understand this story, one needs to read many things between the l  
ines. For instance: Margie is a little girl. This is a toy balloon with a string for a  
child to hold. It may not be beautiful to an adult, but in a child's eye, it i  
s. She is outside. The "it" that the wind caught was the balloon. The wind d  
id not pull Margie along with the balloon; Margie let go. Balloons can b  
reak on contact with any sharp point. Once they are broken, they are g  
one forever. Little children love balloons and can be bitterly disappointed w  
hen they break. Margie saw that her balloon was broken. Children cry w  
hen they are sad. "To cry and cry" is to cry very long and hard. Margie c  
ried and cried because of her sadness at her balloon's b  
reakin

718

This is probably only a small fraction of what is lacking at the surfac  
e level. A program must have all this knowledge in order to get at what i  
s going on. And you might object that, even if it "understands" in s  
ome intellectual sense what has been said, it will never really understand, until i  
t, too, has cried and cried. And when will a computer do that? This is the kind   
of humanistic point which Joseph Weizenbaum is concerned with m  
aking in his book Computer Power and Human Reason, and I think it is an important  
issue; in fact, a very, very deep issue. Unfortunately, many AI workers a  
t this time are unwilling, for various reasons, to take this sort of p  
oin

719

seriously. But in some ways, those AI workers are right: it is a l  
ittle premature to think about computers crying; we must first think about r  
ules for computers to deal with language and other things; in time, we'll fi  
nd ourselves face to face with the deeper issues.

719

Al Has Far to G  

719

Sometimes it seems that there is such a complete absence of r  
ule-governed behavior that human beings just aren't rule-governed. But this is an   
illusion-a little like thinking that crystals and metals emerge from r  
igid underlying laws, but that fluids or flowers don't. We'll come back to t  
his question in the next C  
hapter. The process of logic itself working internally in the brain may be m  
ore analogous to a succession of operations with symbolic pictures, a sort o  
f abstract analogue of the Chinese alphabet or some Mayan description o  
f events-except that the elements are not merely words but more like sentences or whole stories with linkages between them forming a sort of m eta-o  
r super-logic with its own rules.5  
It is hard for most specialists to express vividly-perhaps even t  
o remember-what originally sparked them to enter their field. C  
onversely, someone on the outside may understand a field's special romance and m  
ay be able to articulate it precisely. I think that is why this quote from Ulam   
has appeal for me, because it poetically conveys the strangeness of t  
he enterprise of AI, and yet shows faith in it. And one must run on faith at t  
his point, for there is so far to g

719

Ten Questions and Specula  
tion

719

To conclude this Chapter, I would like to present ten "Questions and   
Speculations" about AI. I would not make so bold as to call t  
hem "Answers"-these are my personal opinions. They may well change i  
n some ways, as I learn more and as Al develops more. (In what follows, t  
he term "AI program" means a program which is far ahead of today's programs; it means an "Actually Intelligent" program. Also, the words "program" and "computer" probably carr} overly mechanistic connotations, b  
ut let us stick with them a  
nyway.) Question: Will a computer program ever write beautiful m  
usic? Speculation: Yes, but not soon. Music is a language of emotions, a  
nd until programs have emotions as complex as ours, there is no way a  
program will write anything beautiful. There can be "  
forgeries"shallow imitations of the syntax of earlier music-but despite what o  
ne might think at first, there is much more to musical expression than can   
be captured in syntactical rules. There will be no new kinds of b  
eauty turned up for a long time by computer music-composing p  
rograms. Let me carry this thought a little further. To think-and I have h  
ear

720

this suggested-that we might soon be able to command a preprogrammed mass-produced mail-order twenty-dollar desk-model "  
music box" to bring forth from its sterile circuitry pieces which Chopin o  
r Bach might have written had they lived longer is a grotesque a  
nd shameful misestimation of the depth of the human spirit. A "  
program" which could produce music as they did would have to wander a  
round the world on its own, fighting its way through the maze of life a  
nd feeling every moment of it. It would have to understand the joy a  
nd loneliness of a chilly night wind, the longing for a cherished hand, t  
he inaccessibility of a distant town, the heartbreak and regeneration a  
fter a human death. It would have to have known resignation and worldweariness, grief and despair, determination and victory, piety and a  
we. In it would have had to commingle such opposites as hope and fear  
, anguish and jubilation, serenity and suspense. Part and parcel of i  
t would have to be a sense of grace, humor, rhythm, a sense of t  
he unexpected-and of course an exquisite awareness of the magic o  
f fresh creation. Therein, and therein only, lie the sources of meaning i  
n m  
usic. Question: Will emotions be explicitly programmed into a m  
achin

720

Speculation: No. That is ridiculous. Any direct simulation o  
f emotions-PAR RY, for example-cannot approach the complexity of   
human emotions, which arise indirectly from the organization of o  
ur minds. Programs or machines will acquire emotions in the same w  
ay: as by-products of their structure, of the way in which they are  
organized-not by direct programming. Thus, for example, n  
obody will write a "falling-in-love" subroutine, any more than they w  
ould write a "mistake-making" subroutine. "Falling in love" is a d  
escription which we attach to a complex process of a complex system; there n  
eed be no single module inside the system which is solely responsible for i  
t, h

720

Question: Will a thinking computer be able to add fa  
st? Speculation: Perhaps not. We ourselves are composed of h  
ardware which does fancy calculations but that doesn't mean that our symb  
ol level, where "we" are, knows how to carry out the same fancy calculations. Let me put it this way: there's no way that you can load n  
umbers into your own neurons to add up your grocery bill. Luckily for y  
ou, your symbol level (i.e., you) can't gain access to the neurons which a  
re doing your thinking-otherwise you'd get addle-brained. To paraphrase Descartes a  
gain: "I think; therefore I have no access  
to the level where I sum."  
Why should it not be the same for an intelligent program? It mustn'  
t be allowed to gain access to the circuits which are doing its thinkingotherwise it'll get addle-CPU'd. Quite seriously, a machine that c  
an pass the Turing test may well add as slowly as you or I do, and f  
o

721

similar reasons. It will represent the number 2 not just by the two b  
its "10", but as a full-fledged concept the way we do, replete with associations such as its homonyms "too" and "to", the words "couple" a  
nd "deuce", a host of mental images such as dots on dominos, the shape o  
f the numeral '2', the notions of alternation, evenness, oddness, and o  
n and on ... With all this "extra baggage" to carry around, an int  
elligent program will become quite slothful in its adding. Of course, we could  
give it a "pocket calculator", so to speak (or build one in). Then it could  
answer very fast, but its performance would be just like that of a  
person with a pocket calculator. There would be two separate parts to   
the machine: a reliable but mindless part and an intelligent but f  
allible part. You couldn't r ely on the composite system to be reliable, a  
ny more than a composite of person and machine is necessarily r  
eliable. So if it's right answers you're after, better stick to the pocket c  
alculator alone-don't throw in the intelligenc

721

Question: Will there be chess programs that can beat anyo  
ne? Speculation: No. There may be programs which can beat anyone a  
t chess, but they will not be exclusively chess players. They will b  
e programs of general intelligence, and they will be just as temperamental as people. "Do you want to play chess?" "No, I'm bored with c  
hess. Let's talk about poetry." That may be the kind of dialogue you c  
ould have with a program that could beat everyone. That is because r  
eal intelligence inevitably depends on a total overview capacity-that is, a  
programmed ability to 'Jump out of the system", so to speak-at l  
east roughly to the extent that we have that ability. Once that is p  
resent, you can't contain the program; it's gone beyond that certain c  
ritical point, and you just have to face the facts of what you've w  
rough

721

Question: Will there be special locations in memory which store p  
arameters governing the behavior of the program, such that if you reached i  
n and changed them, you would be able to make the program smarter o  
r stupider or more creative or more interested in baseball? In s  
hort, would you be able to "tune" the program by fiddling with it on a  
relatively low l

721

Speculation: No. It would be quite oblivious to changes of any p  
articular elements in memory, just as we stay almost exactly the same t  
hough thousands of our neurons die every day(!). If you fuss around too   
heavily, though, you'll damage it, just as if you irresponsibly d  
id neurosurgery on a human being. There will be no "magic" location i  
n memory where, for instance, the "IQ" of the program sits. Again, t  
hat will be a feature which emerges as a consequence of lower-level behavior, and nowhere will it sit explicitly. The same goes for such t  
hings as "the number of items it can hold in short-term memory", "  
the amount it likes physics", etc., e

721

Question: Could you "tune" an Al program to act like me, or like y  
ou-or halfway between us?

722

Speculation: No. An intelligent program will not be chameleon-like, a  
ny more than people are. It will r ely on the constancy of its memories, a  
nd will not be able to flit between personalities. The idea of c  
hanging internal parameters to "tune to a new personality" reveals a r  
idiculous underestimation of the complexity of p  
ersonalit

722

Question: Will there be a "heart" to an AI program, or will it simply c  
onsist of "senseless loops and sequences of trivial operations" (in the words o  
f Marvin Minsky6  
)  
? Speculation: If we could see all the way to the bottom, as we can a s  
hallow pond, we would surely see only "senseless loops and sequences o  
f trivial operations"-and we would s urely not see any "heart". N  
ow there are two kinds of extremist views on AI: one says that the h  
uman mind is, for fundamental and mysterious reasons, unprogr  
ammable. The other says that you merely need to assemble the a  
ppropriate "heuristic devices-multiple optimizers, pattern-recognition t  
ricks, planning algebras, recursive administration procedures, and the like",  
7 and you will have intelligence. I find myself somewhere in b  
etween, believing that the "pond" of an AI program will turn out to be so d  
eep and murky that we won't be able to peer all the way to the bottom. I  
f we look from the top, the loops will be invisible, just as nowadays t  
he current-carrying electrons are 'invisible to most programmers. W  
hen we create a program that passes the Turing test, we will see a "  
heart" even though we know it's not t

722

Question: Will AI programs ever become "  
superintelligent"? Speculation: I don't know. It is not clear that we would be able t  
o understand or relate to a "superintelligence", or that the concept e  
ven makes sense. For instance, our own intelligence is tied in with o  
ur speed of thought. If our reflexes had been ten times faster or s  
lower, we might have developed an entirely different set of concepts w  
ith which to describe the world. A creature with a radically different v  
iew of the world may simply not have many points of contact with us. I  
have often wondered if there could be, for instance, pieces of m  
usic which are to Bach as Bach is to folk tunes: "Bach squared", so to s  
peak. And would I be able to understand them? Maybe there is such m  
usic around me already, and I just don't recognize it, just as dogs d  
on't understand language. The idea of superintelligence is very strange. I  
n any case, I don't think of it as the aim of AI research, although if w  
e ever do reach the level of human intelligence, superintelligence w  
ill undoubtedly be the next goal-not only for us, but for our AI-program colleagues, too, who will be equally curious about AI a  
nd superintelligence. It seems quite likely that AI programs will be extremely curious about AI in general-understandab  
l

722

Question: You seem to be saying that AI programs will be virtually i  
dentical to people, then. Won't there be any differences?

723

Speculation: Probably the differences between AI programs and p  
eople will be larger than the differences between most people. It is a  
lmost impossible to imagine that the "body" in which an AI program i  
s housed would not affect it deeply. So unless it had an a  
mazingly faithful replica of a human body-and why should it?-it would probably have enormously different perspectives on what is important,  
what is interesting, etc. Wittgenstein once made the amusing comment  
, "If a lion could speak, we would not understand him." It makes m  
e think of Rousseau's painting of the gentle lion and the sleeping g  
ypsy on the moonlit desert. But how does Wittgenstein know? My guess is   
that any AI program would, if comprehensible to us, seem pretty a  
lien. For that reason, we will have a very hard time deciding when and if w  
e really are dealing with an Al program, or just a "weird" p

723

Question: Will we understand what intelligence and consciousness and f  
ree will and "I" are when we have made an intelligent p  
rogram? Speculation: Sort of-it all depends on what you mean by "  
understand". 6  
80 On a gut level, each of us probably has about as good an understanding as is possible of those things, to start with. It is like listening t  
o music. Do you really understand Bach because you have taken h  
im apart? Or did you understand it that time you felt the exhilaration i  
n every nerve in your body? Do we understand how the speed of light i  
s constant in every inertial reference frame? We can do the math, but n  
o one in the world has a truly relativistic intuition. And probably no o  
ne will ever understand the mysteries of intelligence and consciousness i  
n an intuitive way. Each of us can understand people, and that is p  
robably about as close as you can c

727

C HAPTER X  
XStrange Loops  
, Or Tangled Hierarchies

727

Can Machines Possess Ori

727

IN THE C HAPTER before last, I described Arthur Samuel's very s  
uccessful checkers program-the one which can beat its designer. In light of that, it is   
interesting to hear how Samuel himself feels about the issue of c  
omputers and originality. The following extracts are taken from a rebuttal by S  
amuel, written in 1960, to an article by Norbert Wiener.   
It is my conviction that machines cannot possess originality in the s  
ense implied by Wiener in his thesis that "machines can and do transcend some o  
f the limitations of their designers, and that in doing so they may be both   
effective and dangerous." .  
.. A machine is not a genie, it does not work by magic, it does not possess a w  
ill, and, Wiener to the contrary, nothing comes out which has not been put i  
n, barring, of course, an infrequent case of malfunctioning . ..  
.The "intentions" which the machine seems to manifest are the intentions o  
f the human programmer, as specified in advance, or they are subsid  
iary intentions derived from these, following rules specified by the p  
rogrammer. We can even anticipate higher levels of abstraction, just as Wiener does, i  
n which the program will not only modify the subsidiary intentions but will a  
lso modify the rules which are used in their derivation, or in which it will modify  
the ways in which it modifies the rules, and so on, or even in which o  
ne machine will design and construct a second machine with enhanc  
ed capabilities. However, and this is important, the machine will not and c  
annot [italics are his) do any of these things until it has been instructed as to how t  
o proceed. There is and logically then· must always remain a complete hiatu  
s between (i) any ultimate extension and elaboration in this process of c  
arrying out man's wishes and (ii) the development within the machine of a will of i  
ts own. To believe otherwise is either to believe in magic or to believe that t  
he existence of man's will is an illusion and that man's actions are as m  
echanical as the machine's. Perhaps Wiener's article and my rebuttal have both b  
een mechanically determined, but this I refuse to believe.'

727

This reminds me of the Lewis Carroll Dialogue (the Two-Part Invention); I'll try to explain why. Samuel bases his argument against m  
achine consciousness (or will) on the notion that any mechanical instantiation of w  
ill would require an in.finite regress. Similarly, Carroll's Tortoise argues that n  
o step of reasoning, no matter how simple, can be done without i  
nvoking some rule on a higher level to justify the step in question. But that b  
ein

728

also a step of reasoning, one must resort to a yet higher-level rule, and s  
o on. Conclusion: Reasoning involves an in.finite regres  

728

Of course something is wrong with the Tortoise's argument, and I  
believe something analogous is wrong with Samuel's argument. To s  
how how the fallacies are analogous, I now shall "help the Devil", by a  
rguing momentarily as Devil's advocate. (Since, as is well known, God helps tho  
se who help themselves, presumably the Devil helps all those, and only t  
hose, who don't help themselves. Does the Devil help himself?) Here are m  
y devilish conclusions drawn from the Carroll D  
ialogue: The conclusion "reasoning is impossible" does not apply to   
people, because as is plain to anyone, we do manage to carry o  
ut many steps of reasoning, all the higher levels notwiths  
tanding. That shows that we humans operate without need of rules: we a  
re "informal systems". On the other hand, as an argument agains  
t the possibility of any mechanical instantiation of reasoning, it i  
s valid, for any mechanical reasoning-system would have to d  
epend on rules explicitly, and so it couldn't get off the ground unless i  
t had metarules telling it when to apply its rules, metametarule  
s telling it when to apply its metarules, and so on. We may c  
onclude that the ability to reason can never be mechanized. It is a u  
niquely human capability

728

What is wrong with this Devil's advocate point of view? It is o  
bviously the assumption that a machine cannot do anything without having a rule telling i  
t to do so. In fact, machines get around the Tortoise's silly objections as e  
asily as people do, and moreover for exactly the same reason: both m  
achines and people are made of hardware which runs all by itself, according to t  
he laws of physics. There is no need to rely on "rules that permit you to a  
pply the rules", because the lowest-level rules-those without any "meta" 's i  
n front-are embedded in the hardware, and they run without p  
ermission. Moral: The Carroll Dialogue doesn't say anything about the differenc  
es between people and machines, after all. (And indeed, reasoning i  
s m

728

So much for the Carroll Dialogue. On to Samuel's argument. S  
amuel's point, if I may caricature it, is this:  
No computer ever "wants" to do anything, because it was programmed by someone else. Only if it could program itself f  
rom zero on up-an absurdity-would it have its own sense of d  
esire. In his argument, Samuel reconstructs the Tortoise's position, replacing "  
to reason" by "to want". He implies that behind any mechanization of d  
esire, there has to be either an infinite regress or worse, a closed loop. If this i  
s why computers have no will of their own, what about people? The same  
criterion would imply tha  

729

Unless a person designed himself and chose his own wants (as well   
as choosing to choose his own wants, etc.), he cannot be said t  
o have a will of his o  
w

729

It makes you pause to think where your sense of having a will c  
omes from. Unless you are a soulist, you'll probably say that it comes from y  
our brain-a piece of hardware which you did not design or choose. And y  
et that doesn't diminish your sense that you want certain things, and n  
ot others. You aren't a "self-programmed object" (whatever that would be),  
but you still do have a sense of desires, and it springs from the phys  
ical substrate of your mentality. Likewise, machines may someday have w  
ills despite the fact that no magic program spontaneously appears in m  
emory from out of nowhere (a "self-programmed program"). They will have wills   
for much the same reason as you do-by reason of organization a  
nd structure on many levels of hardware and software. Moral: The Samu  
el argument doesn't say anything about the differences between people a  
nd machines, after all. (And indeed, will will be mechanized.)

729

Below Every Tangled Hierarchy Lies An Inviolate L  
eve

729

Right after the Two-Part Invention, I wrote that a central issue of this b  
ook would be: "Do words and thoughts follow formal rules?" One major thr  
ust of the book has been to point out the many-leveledness of the m  
ind/brain, and I have tried to show why the ultimate answer to the question i  
s, "Yes-provided that you go down to the lowest level-the hardwa  
re-to find the rules.

729

Now Samuel's statement brought up a concept which I want to p  
ursue. It is this: When we humans think, we certainly do change our own m  
ental rules, and we change the rules that change the rules, and on and on-b  
ut these are, so to speak, "software rules". However, the rules at bottom do n  
ot change. Neurons run in the same simple way the whole time. You c  
an't "think" your neurons into running some nonneural way, although you c  
an make your mind change style or subject of thought. Like Achilles in the   
Prelude, Ant Fugue, you have access to your thoughts but not to y  
our neurons. Software rules on various levels can change; hardware rul  
es cannot-in fact, to their rigidity is due the software's flexibility! Not a  
paradox at all, but a fundamental, simple fact about the mechanisms o  
f i  
ntelligenc

729

This distinction between self-modifiable software and invi  
olate hardware is what I wish to pursue in this final Chapter, developing it into a  
set of variations on a theme. Some of the variations may seem to be q  
uite far-fetched, but I hope that by the time I close the loop by returning t  
o brains, minds, and the sensation of consciousness, you will have found a  
n invariant core in all the vari

729

My main aim in this Chapter is to communicate some of the ima  
ges which help me to visualize how consciousness rises out of the jungle o  
f neurons; to communicate a set of intangible intuitions, in the hope t  
ha

730

these intuitions are valuable and may perhaps help others a little to come t  
o clearer formulations of their own images of what makes minds run. I could   
not hope for more than that my own mind's blurry images of minds and   
images should catalyze the formation of sharper images of minds a  
nd images in other m

730

A Self-Modifying G  
am

730

A first variation, then, concerns games in which on your turn, you m  
ay modify the rules. Think of chess. Clearly the rules stay the same, just the   
board position changes on each move. But let's invent a variation in whi  
ch, on your turn, you can either make a move or change the rules. But how? A  
t liberty? Can you turn it into checkers? Clearly such anarchy would b  
e pointless. There must be some constraints. For instance, one version m  
ight allow you to redefine the knight's move. Instead of being l-and-then-2, i  
t could be m-and-then-n where m and n are arbitrary natural numbers; a  
nd on your turn you could change either m or n by plus or minus l. So i  
t could go from 1-2 to 1-3 to 0-3 to 0-4 to 0-5 to 1-5 to 2-5 ... Then t  
here could be rules about redefining the bishop's moves, and the other piece  
s' moves as well. There could be rules about adding new squares, or d  
eleting old squares . ..

730

Now we have two layers of rules: those which tell how to move p  
ieces, and those which tell how to change the rules. So we have rules a  
nd metarules. The next step is obvious: introduce metametarules by which w  
e can change the metarules. It is not so obvious how to do this. The reason i  
t is easy to formulate rules for moving pieces is that pieces move in a  
formalized space: the checkerboard. If you can devise a simple f  
ormal notation for expressing rules and metarules, then to manipulate them wil  
l be like manipulating strings formally, or even like manipulating c  
hess pieces. To carry things to their logical extreme, you could even e  
xpress rules and metarules as positions on auxiliary chess boards. Then an arbitrary chess position could be read as a game, or as a set of rules, or as a s  
et of metarules, etc., depending on which interpretation you place on it. O  
f course, both players would have to agree on conventions for interp  
reting the notati  
o

730

Now we can have any number of adjacent chess boards: one for t  
he game, one for rules, one for metarules, one for metametarules, and so o  
n, as far as you care to carry it. On your turn, you may make a move on a  
ny one of the chess boards except the top-level one, using the rules whi  
ch apply (they come from the next chess board up in the hierarchy  
). Undoubtedly both players would get quite disoriented by the fact tha  
t almost anything-though not everything!-can change. By definition, t  
he top-level chess board can't be changed, because you don't have rules t  
elling how to change it. It is inviolate. There is more that is inviolate: the conventions by which the different boards are interpreted, the agreement to t  
ake turns, the agreement that each person may change one chess board e  
ach turn-and you will find more if you examine the idea c

731

Now it is possible to go considerably further in removing the pillars by   
which orientation is achieved. One step at a time . .. We begin by c  
ollapsing the whole array of boards into a single board. What is meant by this? T  
here will be two ways of interpreting the board: (1) as pieces to be moved; (2) a  
s rules for moving the pieces. On your turn, you move pieces-and perfor  
ce, you change rules! Thus, the rules constantly change themselves. Shades o  
f Typogenetics---or for that matter, of real genetics. The distinction betw  
een game, rules, metarules, metametarules, has been lost. What was once a n  
ice clean hierarchical setup has become a Strange Loop, Or Tangled Hierarchy. The moves change the rules, the rules determine the moves, r  
ound and round the mulberry bush ... There are still different levels, but t  
he distinction between "lower" and "higher" has been wiped o

731

Now, part of what was inviolate has been made changeable. But t  
here is s.till plenty that is inviolate. Just as before, there are conventions b  
etween you and your opponent by which you interpret the board as a collection o  
f rules. There is the agreement to take turns-and probably other impl  
icit conventions, as well. Notice, therefore, that the notion of different l  
evels has survived, in an unexpected way. There is an Inviolate level-let's call i  
t the I-level-on which the interpretation conventions reside; there is also a  
Tangled level-the T-level---on which the Tangled Hierarchy resides. S  
o these two levels are still hierarchical: the I-level governs what happens o  
n the T-level, but the T-level does not and cannot affect the I-level. N  
o matter that the T-level itself is a Tangled Hierarchy-it is still governed b  
y a set of conventions outside of itself. And that is the important p

731

As you have no doubt imagined, there is nothing to stop us from d  
oing the "impossible"-namely, tangling the I-level and the T-level by m  
aking the interpretation conventions themselves subject to revision, according t  
o the position on the ches& board. But in order to carry out such a "supertangling", you'd have to agree with your opponent on some further conventions connecting the two levels--and the act of doing so would create a  
new level, a new sort of inviolate level on top of the "supertangled" level (  
or underneath it, if you prefer). And this could continue going on and on. I  
n fact, the "jumps" which are being made are very similar to those charted i  
n the Birthday Cantatatata, and in the repeated Godelization applied to vario  
us improvements on TNT. Each time you think you have reached the e  
nd, there is some new variation on the theme of jumping out of the syst  
em which requires a kind of creativity to s

731

The Authorship Triangle A  
gai

731

But I am not interested in pursuing the strange topic of the ever m  
ore abstruse tanglings which can arise in self-modifying chess. The point of t  
his has been to show, in a somewhat graphic way, how in any system there i  
s always some "protected" level which is unassailable by the rules on oth  
er levels, no matter how tangled their interaction may be among t  
hemselves. An amusing riddle from Chapter IV illustrates this same idea in a s  
lightly different context. Perhaps it will catch you off guard:

732

FIGURE 134. An "authorship triangle"

732

There are three authors-Z, T, and E. Now it happens that Z  
exists only in a novel by T. Likewise, T exists only in a novel by E  
. And strangely, E, too, exists only in a novel-by Z, of course. Now,  
is such an "authorship triangle" really possible? (See Fig. 1

732

Of course it's possible. But there's a trick ... All three authors Z, T, E, a  
re themselves characters in another novel-by H ! You can think of the Z  
-T-E triangle as a Strange Loop, Or Tangled Hierarchy; but author H is o  
utside of the space in which that tangle takes place-author H is in an invi  
olate space. Although Z, T, and E all have access-direct or indirect-to e  
ach other, and can do dastardly things to each other in their various n  
ovels, none of them can touch H's life! They can't even imagine him-no m  
ore than you can imagine the author of the book you're a character in. If I w  
ere to draw author H, I would represent him somewhere off the page. O  
f course that would present a problem, since drawing a thing necessarily p  
uts it onto the page ... Anyway, His really outside of the world of Z, T, and E  
, and should be represented as being s  

732

Escher's Drawing H  
and

732

Another classic variation on our theme is the Escher picture of D  
rawing Hands (Fig. 135). Here, a left hand (LH) draws a right hand (RH), while a  
t the same time, RH draws LH. Once again, levels which ordinarily are seen   
as hierarchical-that which draws, and that which is drawn-tum back o  
n each other, creating a Tangled Hierarchy. But the theme of the Chapter i  
s borne out, of course, since behind it all lurks the undrawn but d  
rawing hand of M. C. Escher, creator of both LH and RH. Escher is outside of t  
he two-hand space, and in my schematic version of his picture (Fig. 136), y  
ou can see that explicitly. In this schematized representation of the E  
scher picture, you see the Strange Loop, Or Tangled Hierarchy at the top; a  
lso, you see the Inviolate Level below it, enabling it to come into being. O  
ne could further Escherize the Escher picture, by taking a photograph of a  
hand drawing it. And so o

733

FIGURE 135. Drawing Hands, by M. C. Escher (lithograph, 194

733

FIGURE 136. Abstract diagram o  
f M .C. Escher's Drawing Hands. On t  
op, a seeming paradox. Below, its res

734

Brain and M  
ind: A Neural Tangle Supporting a Symbol T  
angl

734

Now we can relate this to the brain, as well as to AI programs. In o  
ur thoughts, symbols activate other symbols, and all interact heterarchically.  
Furthermore, the symbols may cause each other to change internally, in t  
he fashion of programs acting on other programs. The illusion is created,  
because of the Tangled Hierarchy of symbols, that there is no inviolate l  
evel. One thinks there is no such level because that level is shielded from o  
ur v  
ie

734

If it were possible to schematize this whole image, there would be a  
gigantic forest of symbols linked to each other by tangly lines like vines in a   
tropical jungle-this would be the top level, the Tangled Hierarchy whe  
re thoughts really flow back and forth. This is the elusive level of mind: t  
he analogue to LH and RH. Far below in the schematic picture, analogous t  
o the invisible "prime mover" Escher, there would be a representation of t  
he myriad neurons-the "inviolate substrate" which lets the tangle above i  
t come into being. Interestingly, this other level is itself a tangle in a l  
iteral sense-billions of cells and hundreds of billions of axons, joining them all   
t  
ogethe

734

This is an interesting case where a software tangle, that of the symb  
ols, is supported by a hardware tangle, that of the neurons. But only the symb  
ol tangle is a Tangled Hierarchy. The neural tangle is just a "simple" t  
angle. This distinction is pretty much the same as that between Strange Loops a  
nd feedback, which I mentioned in Chapter XVI. A Tangled Hierarchy occurs   
when what you presume are clean hierarchical levels take you by surp  
rise and fold back in a hierarchy-violating way. The surprise element is important; it is the reason I call Strange Loops "strange". A simple tangle, l  
ike feedback, doesn't involve violations of presumed level distinctions. A  
n example is when you're in the shower and you wash your left arm with y  
our right, and then vice versa. There is no strangeness to the image. E  
scher didn't choose to draw hands drawing hands for nothing!

734

Events such as two arms washing each other happen all the time in t  
he world, and we don't notice them particularly. I say something to you, t  
hen you say something back to me. Paradox? No; our perceptions of each o  
ther didn't involve a hierarchy to begin with, so there is no sense of strang  
enes

734

On the other hand, where language does create strange loops is w  
hen it talks about itself, whether directly or indirectly. Here, something in t  
he system jumps out and acts on the system, as if it were outside the s  
ystem. What bothers us is perhaps an ill-defined sense of topological wrongnes  
s: the inside-outside distinction is being blurred, as in the famous shape c  
alled a "Klein bottle". Even though the system is an abstraction, our minds u  
se spatial imagery with a sort of mental t  
opolog

734

Getting back to the symbol tangle, if we look only at it, and forget t  
he neural tangle, then we seem to see a self-programmed object-in just t  
he same way as we seem to see a self-drawn picture if we look at Drawing H  
ands and somehow fall for the illusion, by forgetting the existence of Escher. F  
o

735

the picture, this is unlikely-but for humans and the way they look at t  
heir minds, this is usually what happens. Wefeel self-programmed. Indeed, w  
e couldn't feel any other way, for we are shielded from the lower levels, t  
he neural tangle. Our thoughts seem to run about in their own space, c  
reating new thoughts and modifying old ones, and we never notice any n  
eurons helping us out! But that is to be expected. We c  
a

735

An analogous double-entendre can happen with LISP programs t  
hat are designed to reach in and change their own structure. If you look a  
t them on the LISP level, you will say that they change themselves; but if y  
ou shift levels, and think of LISP programs as data to the LISP interpreter (  
see Chapter X), then in fact the sole program that is running is the interprete  
r, and the changes being made are merely changes in pieces of data. T  
he LISP interpreter itself is shielded from changes.

735

How you describe a tangled situation of this sort depends how far b  
ack you step before describing. If you step far enough back, you can often s  
ee the clue that allows you to untangle thin

735

Strange Loops in Gover  
nmen

735

A fascinating area where hierarchies tangle is government-particularly i  
n the courts. Ordinarily, you think of two disputants arguing their cases i  
n court, and the court adjudicating the matter. The court is on a different  
level from the disputants. But strange things can start to happen when t  
he courts themselves get entangled in legal cases. Usually there is a h  
igher court which is outside the dispute. Even if two lower courts get involved in   
some sort of strange fight, with each one claiming jurisdiction over t  
he other, some higher court is outside, and in some sense it is analogous to t  
he inviolate interpretation conventions which we discussed in the w  
arped version of ches

735

But what happens when there is no higher court, and the Supr  
eme Court itself gets all tangled up in legal troubles? This sort of snarl near  
ly happened in the Watergate era. The President threatened to obey only a  
"definitive ruling" of the Supreme Court-then claimed he had the right t  
o decide what is "definitive". Now that threat never was made good; but if i  
t had been, it would have touched off  
a monumental confrontation b  
etween two levels of government, each of which, in some ways, can validly claim t  
o be "above" the other-and to whom is there recourse to decide which one is   
right? To say "Congress" is not to settle the matter, for Congress m  
ight command the President to obey the Supreme Court, yet the P  
resident might still refuse, claiming that he has the legal right to disobey t  
he Supreme Court (and Congress!) under certain circumstances. This w  
ould create a new court case, and would throw the whole system into d  
isarray, because it would be so unexpected, so Tangled-so S  
trang

735

The irony is that once you hit your head against the ceiling like t  
his, where you are prevented from jumping out of the system to a yet h  
igher authority, the only recourse is to forces which seem less well defined b  

736

rules, but which are the only source of higher-level rules anyway: t  
he lower-level rules, which in this case means the general reaction of society. I  
t is well to remember that in a society like ours, the legal system is, in a s  
ense, a polite gesture granted collectively by millions of people-and it can b  
e overridden just as easily as a river can overflow its banks. Then a s  
eeming anarchy takes over; but anarchy has its own kinds of rules, no less than d  
oes civilized society: it is just that they operate from the bottom up, not f  
rom the top down. A student of anarchy could try to discover rules according t  
o which anarchic situations develop in time, and very likely there are some   
such rules.

736

An analogy from physics is useful here. As was mentioned earlier i  
n the book, gases in equilibrium obey simple laws connecting their temperature, pressure, and volume. However, a gas can violate those laws (as a  
President can violate laws)-provided it is not in a state of equilibrium. I  
n nonequilibrium situations, to describe what happens, a physicist has recourse only to statistical mechanics-that is, to a level of description whi  
ch is not macroscopic, for the ultimate explanation of a gas's behavior a  
lways lies on the molecular level, just as the ultimate explanation of a s  
ociety's political behavior always lies at the "grass roots level". The field o  
f nonequilibrium thermodynamics attempts to find macroscopic laws to describe the behavior of gases (and other systems) which are out of equilibrium. It is the analogue to the branch of political science which would   
search for laws governing anarchical societies.

736

Other curious tangles which arise in government include the F  
BI investigating its own wrongdoings, a sheriff going to jail while in office, t  
he self-application of the parliamentary rules of procedure, and so on. One o  
f the most curious legal cases I ever heard of involved a person who c  
laimed to have psychic powers. In fact, he claimed to be able to use his p  
sychic powers to detect personality traits, and thereby to aid lawyers in p  
icking juries. Now what if this "psychic" has to stand trial himself one day? What   
effect might this have on a jury member who believes staunchly in E  
SP? How much will he feel affected by the psychic (whether or not the psychic i  
s genuine)? The territory is ripe for exploitation-a great area for selffulfilling p

736

Tangles Involving Science and the O  
ccul

736

Speaking of psychics and ESP, another sphere of life where strange l  
oops abound is fringe science. What fringe science does is to call into q  
uestion many of the standard procedures or beliefs of orthodox science, a  
nd thereby challenge the objectivity of science. New ways of i  
nterpreting evidence that rival the established ones are presented. But how do y  
ou evaluate a way of interpreting evidence? Isn't this precisely the problem o  
f objectivity all over a gain,just on a higher plane? Of course. Lewis Carrol  
l's infinite-regress paradox appears in a new guise. The Tortoise would a  
rgue that if you want to show that A is a fact, you need evidence: B. But wha  
t makes you sure that B is evidence of A? To show that, you need me

737

evidence: C. And for the validity of that meta-evidence, you need metameta-evidence-and so on, ad nauseam. Despite this argument, p  
eople have an intuitive sense of evidence. This is because-to repeat an o  
ld refrain-people have built-in hardware in their brains that includes s  
ome rudimentary ways of interpreting evidence. We can build on this, a  
nd accumulate new ways of interpreting evidence; we even learn how a  
nd when to override our most basic mechanisms of evidence interpretation, a  
s one must, for example, in trying to figure out magic t

737

Concrete examples of evidence dilemmas crop up in regard to m  
any phenomena of fringe science. For instance, ESP often seems to m  
anifest itself outside of the laboratory, but when brought into the laboratory, i  
t vanishes mysteriously. The standard scientific explanation for this is t  
hat ESP is a nonreal phenomenon which cannot stand up to rigorous s  
crutiny. Some (by no means all) believers in ESP have a peculiar way of fi  
ghting back, however. They say, "No, ESP is real; it simply goes away when o  
ne tries to observe it scientifically-it is contrary to the nature of a s  
cientific worldview." This is an amazingly brazen technique, which we might c  
all "kicking the problem upstairs". What that means is, instead of q  
uestioning the matter at hand, you call into doubt theories belonging to a higher level   
of credibility. The believers in ESP insinuate that what is wrong is not t  
heir ideas, but the belief system of science. This is a pretty grandiose claim, a  
nd unless there is overwhelming evidence for it, one should be skeptical of it.  
But then here we are again, talking about "overwhelming evidence" as i  
f everyone agreed on what that mea

737

The Nature of Evid  
enc

737

The Sagredo-Simplicio-Salviati tangle, mentioned in Chapters XIII a  
nd XV, gives another example of the complexities of evaluation of evi  
dence. Sagredo tries to find some objective compromise, if possible, between t  
he opposing views of Simplicio and Salviati. But compromise may not a  
lways be possible. How can one compromise "fairly" between right and w  
rong? Between fair and unfair? Between compromise and no compromise? T  
hese questions come up over and over again in disguised form in argume  
nts about ordinary t

737

Is it possible to define what evidence is? Is it possible to lay down l  
aws as to how to make sense out of situations? Probably not, for any rigid r  
ules would undoubtedly have exceptions, and nonrigid rules are not rules.   
Having an intelligent AI program would not solve the problem either, f  
or as an evidence processor, it would not be any less fallible than humans a  
re. So, if evidence is such an intangible thing after all, why am I w  
arning against new ways of interpreting evidence? Am I being inconsistent? In this   
case, I don't think so. My feeling is that there are guidelines which one c  
an give, and out of them an organic synthesis can be made. But i  
nevitably some amount of judgment and intuition must enter the picture-t  
hings which are different in different people. They will also be different i  

738

different AI programs. Ultimately, there are complicated criteria for deciding if a method of evaluation of evidence is good. One involves the "usefulness" of ideas which are arrived at by that kind of reasoning. Modes o  
f thought which lead to useful new things in life are deemed "valid" in s  
ome sense. But this word "useful" is extremely subjecti

738

My feeling is that the process by which we decide what is valid or w  
hat is true is an art; and that it relies as deeply on a sense of beauty a  
nd simplicity as it does on rock-solid principles of logic or reasoning or anything else which can be objectively formalized. I am not saying either (1)  
truth is a chimera, or (2) human intelligence is in principle not programmable. I am saying (1) truth is too elusive for any human or any collection o  
f humans ever to attain fully; and (2) Artificial Intelligence, when it r  
eaches the level of human intelligence-or even if it surpasses it-will still b  
e plagued by the problems of art, beauty, and simplicity, and will run up   
against these things constantly in its own search for knowledge and unders

738

"What is evidence?" is not just a philosophical question, for it i  
ntrudes into life in all sorts of places. You are faced with an extraordinary n  
umber of choices as to how to interpret evidence at every moment. You can h  
ardly go into a bookstore (or these days, even a grocery store!) without s  
eeing books on clairvoyance, ESP, UFO's, the Bermuda triangle, astrology, dowsing, evolution versus creation, black holes, psi fields, biofeedback, transcendental meditation, new theories of psychology . .. In science, there a  
re fierce debates about catastrophe theory, elementary particle theory, b  
lack holes, truth and existence in mathematics, free will, Artificial Int  
elligence, reductionism versus holism ... On the more pragmatic side of life, t  
here are debates over the efficacy of vitamin C or of laetrile, over the real size o  
f oil reserves (either underground or stored), over what causes inflation a  
nd unemployment-and on and on. There is Buckminster Fullerism, Z  
en Buddhism, Zeno's paradoxes, psychoanalysis, etc., etc. From issues as triv  
ial as where books ought to be shelved in a store, to issues as vital as what i  
deas are to be taught to children in schools, ways of interpreting evidence p  
lay an inestimable r  
ol

738

Seeing O  
nesel

738

One of the most severe of all problems of evidence interpretation is that o  
f trying to interpret all the confusing signals from the outside as to who o  
ne is. In this case, the potential for intralevel and interlevel conflict is tremendous. The psychic mechanisms have to deal simultaneously with t  
he individual's internal need for self-esteem and the constant flow of evi  
dence from the outside affecting the self-image. The result is that i  
nformation flows in a complex swirl between different levels of the personality; as i  
t goes round and round, parts of it get magnified, reduced, negated, o  
r otherwise distorted, and then those parts in turn get further subjected t  
o the same sort of swirl, over and over again-all of this in an attempt t  
o reconcile what is, with what we wish were (see Fig. 81).

739

The upshot is that the total picture o f"who I am" is integrated in s  
ome enormously complex way inside the entire mental structure, and c  
ontains in each one of us a large number of unresolved, possibly u  
nresolvable, inconsistencies. These undoubtedly provide much of the dynamic t  
ension which is so much a part of being human. Out of this tension between the   
inside and outside notions of who we are come the drives towards var  
ious goals that make each o fus unique. Thus, ironically, something which we a  
ll have in common-the fact of being self-reflecting conscious beings-lead  
s to the rich diversity in the ways we have of internalizing evidence about a  
ll sorts of things, and in the end winds up being one of the major forces i  
n creating distinct i

739

Godel's Theorem and Other Disciplin  
e

739

It is natural to try to draw parallels between people and sufficiently complicated formal systems which, like people, have "self-images" of a sort.  
Godel's Theorem shows that there are fundament.\l limitations to consistent formal systems with self-images. But is it more general? Is there a  
"Godel's Theorem of psychology", for i

739

If one uses Godel's Theorem as a metaphor, as a source of i  
nspiration, rather than trying to translate it literally into the language of psychology o  
r of any other discipline, then perhaps it can suggest new truths in psychology or other areas. But it is quite unjustifiable to translate it directly into a  
statement of another discipline and take that as equally valid. It would be a  
large mistake to think that what has been worked out with the utmo  
st delicacy in mathematical logic should hold without modification in a completely different a

739

Introspection and Insanity: A Godelian P  
roble

739

I think it can have suggestive value to translate Godel's Theorem into o  
ther domains, provided one specifies in advance that the translations a  
re metaphorical and are not intended to be taken literally. That having b  
een said, I see two major ways of using analogies to connect Godel's T  
heorem and human thoughts. One involves the problem of wondering about o  
ne's sanity. How can you figure out if you are sane? This is a Strange L  
oop indeed. Once you begin to question your own sanity, you can get trapped i  
n an ever-tighter vortex of self-fulfilling prophecies, though the process is b  
y no means inevitable. Everyone knows that the insane interpret the w  
orld via their own peculiarly consistent logic; how can you tell if your own l  
ogic is "peculiar" or not, given that you have only your own logic to judge i  
tself? I don't see any answer. I am just reminded of Godel's second T  
heorem, which implies that the only versions of formal number theory which a  
ssert their own consistency are inconsistent .

740

Can We Understand Our Own Minds or Bra  
in

740

The other metaphorical analogue to Godel's Theorem which I find provocative suggests that ultimately, we cannot understand our own m  
inds/ brains. This is such a lo:ided, many-leveled idea that one must be e  
xtremely cautious in proposing it. What does "understanding our own minds/b  
rains" mean? It could mean having a general sense of how they work, a  
s mechanics have a sense of how cars work. It could mean having a comple  
te explanation for why people do any and all things they do. It could m  
ean having a complete understanding of the physical structure of one's o  
wn brain on all levels. It could mean having a complete wiring diagram of a  
brain in a book (or library or computer). It could mean knowing, at e  
very instant, precisely what is happening in one's own brain on the n  
eural level-each firing, each synaptic alteration, and so on. It could mean h  
aving written a program which passes the Turing test. It could mean kno  
wing oneself so perfectly that such notions as the subconscious and the i  
ntuition make no sense, because everything is out in the open. It could mean a  
ny number of other t

740

Which of these types of self-mirroring, if any, does the self-  
mirroring in Godel's Theorem most resemble? I would hesitate to say. Some of t  
hem are quite silly. For instance, the idea of being able to monitor your own  
brain state in all its detail is a pipe dream, an absurd and u  
ninteresting proposition to start with; and if Godel's Theorem suggests that it is impossible, that is hardly a revelation. On the other hand, the age-old goal o  
f knowing yourself in some profound way-let us call it "understanding y  
our own psychic structure"-has a ring of plausibility to it. But might there n  
ot be some vaguely Godelian loop which limits the depth to which any individual can penetrate into his own psyche? Just as we cannot see our fa  
ces with our own eyes, is it not reasonable to expect that we cannot mirror o  
ur complete mental structures in the symbols which carry them o  
u

740

All the limitative Theorems of metamathematics and the theory o  
f computation suggest that once the ability to represent your own s  
tructure has reached a certain critical point, that is the kiss of death: it guarant  
ees that you can never represent yourself totally. Godel's Incompleteness Theorem, Church's Undecidability Theorem, Turing's Halting T  
heorem, Tarski's Truth Theorem-all have the flavor of some ancient fairy tale   
which warns you that "To seek self-knowledge is to embark on a j  
ourney which ... will always be incomplete, cannot be charted on any map, wil  
l never halt, cannot be d

740

But do the limitative Theorems have any bearing on people? Here i  
s one way of arguing the case. Either I am consistent or I am inconsist  
ent. (The latter is much more likely, but for completeness' sake, I consider b  
oth possibilities.) If I am consistent, then there are two cases. (1) The "lowfidelity" case: my self-understanding is below a certain critical point. In t  
his case, I am incomplete by hypothesis. (2) The "high-fidelity" case: M  
y self-understanding has reached the critical point where a metaphoric  
al analogue of the limitative Theorems does apply, so my self-  
understandi

741

undermines itself in a Godelian way, and I am incomplete for that reason.  
Cases (1) and (2) are predicated on my being 100 per cent consisten  
t-a very unlikely state of affairs. More likely is that I am i  
nconsistent-but that's worse, for then inside me there are contradictions, and how can I  
ever understand t

741

Consistent or inconsistent, no one is exempt from the mystery of t  
he self. Probably we are all inconsistent. The world is just too complicated for a  
person to be able to afford the luxury of reconciling all of his beliefs w  
ith each other. Tension and confusion are important in a world where m  
any decisions must be made quickly. Miguel de Unamuno once said, "If a  
person never contradicts himself, it must be that he says nothing." I w  
ould say that we all are in the same boat as the Zen master who, after contradicting himself several times in a row, said to the confused Doko, "I canno  
t understand m

741

Godel's Theorem and Personal Nonex  
istenc

741

Perhaps the greatest contradiction in our lives, the hardest to handle, is t  
he knowledge "There was a time when I was not alive, and there will come a  
time when I am not alive." On one level, when you "step out of y ourself"  
and see yourself as ')ust another human being", it makes complete s  
ense. But on another level, perhaps a deeper level, personal nonexistence m  
akes no sense at all. All that we know is embedded inside our minds, and for a  
ll that to be absent from the universe is not comprehensible. This is a b  
asic undeniable problem of life; perhaps it is the best metaphorical analogue o  
f Godel's Theorem. When you try to imagine your own nonexistence, y  
ou have to try to jump out of yourself, by mapping yourself onto someone else.   
You fool yourself into believing that you can import an outsider's view of   
yourself into you, much as TNT "believes" it mirrors its own m  
etatheory inside itself. But TNT only contains its own metatheory up to a c  
ertain extent-not fully. And as for you, though you may imagine that you h  
ave jumped out of yourself, you never can actually do so-no more t  
han Escher's dragon can jump out of its native two-dimensional plane into t  
hree dimensions. In any case., this contradiction is so great that most of our l  
ives we just sweep the whole mess under the rug, because trying to deal with i  
t just leads n

741

Zen minds, on the other hand, revel in this irreconcilability. Over a  
nd over again, they face the conflict between the Eastern belief: "The w  
orld and I are one, so the notion of my ceasing to exist is a contradiction i  
n terms" (my verbalization is undoubtedly too Westernized-apologies t  
o Zenists), and the Western belief: "I am just part of the world, and I will d  
ie, but the world will go on without m

741

Science and D  
ualis

741

Science is often criticized as being too "Western" or "dualistic"-that i  
s, being permeated by the dichotomy between subject and object, or obser  
ve

742

and observed. While it is true that up until this century, science w  
as exclusively concerned with things which can be readily distinguished f  
rom their human observers-such as oxygen and carbon, light and heat, s  
tars and planets, accelerations and orbits, and so on-this phase of science was a  
necessary prelude to the more modern phase, in which life itself has c  
ome under investigation. Step by step, inexorably, "Western" science has m  
oved towards investigation of the human mind-which is to say, of the obser  
ver. Artificial Intelligence research is the furthest step so far along that r  
oute. Before AI came along, there were two major previews of the strang  
e consequences of the mixing of subject and object in science. One was t  
he revolution of quantum mechanics, with its epistemological problems involving the interference of the observer with the observed. The other was t  
he mixing of subject and object in metamathematics, beginning with Godel  
's Theorem and moving through all the other limitative Theorems we h  
ave discussed. Perhaps the next step after AI will be the self-application o  
f science: science studying itself as an object. This is a different manner o  
f mixing subject and object-perhaps an even more tangled one than that o  
f humans studying their own m  
ind

742

By the way, in passing, it is interesting to note that all results e  
ssentially dependent on the fusion of subject and object have been limitative result  
s. In addition to the limitative Theorems, there is Heisenberg's u  
ncertainty principle, which says that measuring one quantity renders impossible t  
he simultaneous measurement ofa related quantity. I don't know why all these   
results are limitative. Make of it what you w

742

Symbol vs. Object in Modern Music and A  
r

742

Closely linked with the subject-object dichotomy is the symbol-o  
bject dichotomy, which was explored in depth by Ludwig Wittgenstein in t  
he early part of this century. Later the words "use" and "mention" w  
ere adopted to make the same distinction. Quine and others have written a  
t length about the connection between signs and what they stand for. But n  
ot only philosophers have devoted much thought to this deep and a  
bstract matter. In our century both music and art have gone through crises whi  
ch reflect a profound concern with this problem. Whereas music and p  
ainting, for instance, have traditionally expressed ideas or emotions through a  
vocabulary of "symbols" (i.e. visual images, chords, rhythms, or w  
hatever), now there is a tendency to explore the capacity of music and art to n  
otexpress anything-just to be. This means to exist as pure globs of paint, o  
rpure sounds, but in either case drained of all symbolic v  
alu

742

In music, in particular, John Cage has been very influential in b  
ringing a Zen-like approach to sound. Many of his pieces convey a disdain for "  
use" of sounds-that is, using sounds to convey emotional states-and an exultation in "mentioning" sounds-that is, concocting arbitrary juxtapositions o  
f sounds without regard to any previously formulated code by which a  
listener could decode them into a message. A typical example is "Ima  
ginary Landscape no. 4", the polyradio piece described in Chapter VI. I may n  
o

743

be doing Cage justice, but to me it seems that much of his work has b  
een directed at bringing meaninglessness into music, and in some sense, a  
t making that meaninglessness have meaning. Aleatoric music is a typi  
cal exploration in that direction. (Incidentally, chance music is a close cousin t  
o the much later notion of "happenings" or "be-in" 's.) There are many o  
ther contemporary composers who are following Cage's lead, but few with a  
s much originality. A piece by Anna Lockwood, called "Piano Burni  
ng", involves just that-with the strings stretched to maximum tightness, t  
o make them snap as loudly as possible; in a piece by LaMonte Young, t  
he noises are provided by shoving the piano all around the stage and t  
hrough obstacles, like a battering r

743

Art in this century has gone through many convulsions of this g  
eneral type. At first there was the abandonment of representation, which was   
genuinely revolutionary: the beginnings of abstract art. A gradual swoo  
p from pure representation to the most highly abstract patterns is revealed i  
n the work of Piet Mondrian. After the world was used to nonrepresentational art, then surrealism came along. It was a bizarre about-face, something like neoclassicism in music, in which extremely representational a  
rt was "subverted" and used for altogether new reasons: to shock, c  
onfuse, and amaze. This school was founded by Andre Breton, and was l  
ocated primarily in France; some of its more influential members were D  
ali, Magritte, de Chirico, Tang

743

Magritte's Semantic Ill  
usion

743

Of all these artists, Magritte was the most conscious of the symbol-obj  
ect mystery (which I see as a deep extension of the use-mention distinction).  
He uses it to evoke powerful responses in viewers, even if the viewers d  
o not verbalize the distinction this way. For example, consider his v  
ery strange variation on the theme of still life, called Common Sense (Fig. 1

743

FIGURE 137. Common Sense, by Rene Magritte (194

744

FIGURE 138. The Two Mysteries, by Rene Magritte (19

744

Here, a dish filled with fruit, ordinarily the kind of thing represen  
ted inside a still life, is shown sitting on top of a blank canvas. The c  
onflict between the symbol and the real is great. But that is not the full irony, fo  
r of course the whole thing is itself just a painting-in fact, a still life w  
ith nonstandard subject m

744

Magritte's series of pipe paintings is fascinating and perplexing. Consider The Two Mysteri£s (Fig. 138). Focusing on the inner painting, you g  
et the message that symbols and pipes are different. Then your glance m  
oves upward to the "real" pipe floating in the air-you perceive that it is r  
eal, while the other one is just a symbol. But that is of course totally wrong: b  
oth of them are on the same flat surface before your eyes. The idea that o  
ne pipe is in a twice-nested painting, and therefore somehow "less real" t  
han the other pipe, is a complete fallacy. Once you are willing to "enter t  
he room", you have already been tricked: you've fallen for image as reality. T  
o be consistent in your gullibility, you should happily go one level f  
urther down, and confuse image-within-image with reality. The only way not to b  
e sucked in is to see both pipes merely as colored smudges on a surface a few  
inches in front of your nose. Then, and only then, do you appreciate t  
he full meaning of the written message "Ceci n'est pas une pipe"-but ironically, at the very instant everything turns to smudges, the writing too t  
urns to smudges, thereby losing its meaning! In other words, at that instant, t  
he verbal message of the painting self-destructs in a most Godelian w

745

FIGURE 139. Smoke Signal. [ Drawing by the author.]

745

The Air and the Song (Fig. 82), taken from a series by M  
agritte, accomplishes all that The Two Myster  
ies does, but in one level instead of t  
wo. My drawings Smoke Signal and Pipe Dream (Figs. 139 and 140) c  
onstitute "Variations on a Theme of Magritte". Try staring at Smoke Signal for a  
while. Before long, you should be able to make out a hidden m  
essage saying, "Ceci n'est pas un message". Thus, if you find the message, it d  
enies itself-yet if you don't, you miss the point entirely. Because of their i  
ndirect self-snuffing, my two pipe pictures can be loosely mapped onto G  
odel's G-thus giving rise to a "Central Pipemap", in the same spirit as the o  
ther"Central Xmaps": Dog, Crab, Sloth.

745

A classic example of use-mention confusion in paintings is the occurrence of a palette in a painting. Whereas the palette is an illusion created b  
y the representational skill of the painter, the paints on the painted p  
alette are literal daubs of paint from the artist's palette. The paint plays itself-it  
does not symbolize anything else. In Don Giovanni, Mozart exploited a  
related trick: he wrote into the score explicitly the sound of an orchest  
ra tuning up. Similarly, if I want the letter 'I' to play itself (and not symbolize   
me), I put 'I' directly into my text; then I enclose 'I' between quotes. W  
hat results is "I" (not 'I', nor '"I '"). Got t

746

FIGURE 140. Pipe Dream. [Drawing b-y the author.]

746

The "Code" of Modern A  
r

746

A large number of influences, which no one could hope to pin d  
own completely, led to further explorations of the symbol-object dualism in a  
rt. There is no doubt that John Cage, with his interest in Zen, had a p  
rofound influence on art as well as on music. His friends Jasper Johns and R  
obert Rauschenberg both explored the distinction between objects and s  
ymbols by using objects as symbols for themselves-or, to flip the coin, by u  
sing symbols as objects in themselves. All of this was perhaps intended to b  
reak down the notion that art is one step removed from reality-that art s  
peaks in "code", for which the viewer must act as interpreter. The idea was t  
o eliminate the step of interpretation and let the naked object simply b  
e,period. ("Period"-a curious case of use-mention blur.) However, if t  
his was the intention, it was a monumental flop, and perhaps had to be.

746

Any time an object is exhibited in a gallery or dubbed a "work", i  
t acquires an aura of deep inner significance-no matter how much the   
viewer has been warned not to look for meaning. In fact, there is a backfiring effect whereby the more that viewers are told to look at these obj  
ects without mystification, the more mystified the viewers get. After all, if a

747

wooden crate on a museum floor is just a wooden crate on a museum fl  
oor, then why doesn't the j;mitor haul it out back and throw it in the g  
arbage? Why is the name of an artist attached to it? Why did the artist want t  
o demystify art? Why isn't that dirt clod out front labeled with an a  
rtist's name? Is this a hoax? Am I c razy, or are artists crazy? More and m  
ore questions flood into the viewer's mind; he can't help it. This is the "  
frame effect" which art-Art-automatically creates. There is no way to s  
uppress the wanderings in the minds of the curious.

747

Of course, if the purpose is to instill a Zen-like sense of the world a  
s devoid of categories and meanings, then perhaps such art is merely intended to serve-as does intellectualizing about Zen-as a catalyst to i  
nspire the viewer to go out and become acquainted with the philosophy whi  
ch rejects "inner meanings" and embraces the world as a whole. In this c  
ase, the art is self-defeating in the short run, since the viewers do ponder a  
bout its meaning, but it achieves its aim with a few people in the long run, b  
y introducing them to its sources. But in either case, it is not true that there i  
s no code by which ideas are conveyed to the viewer. Actually, the code is a   
much more complex thing, involving statements about the absence of c  
odes and so forth-that is, it is part code, part metacode, and so on. There is a  
Tangled Hierarchy of messages being transmitted by the most Zen-like a  
rt objects, which is perhaps why so many find modern art so i

747

Ism Once A  
gai

747

Cage has led a movement to break the boundaries between art and n  
ature. In music, the theme is that all sounds are equal-a sort of a  
coustical democracy. Thus silence is just as important as sound, and random s  
ound is just as important as organized �ound. Leonard B. Meyer, in his b  
ook Music, the Arts, and Ideas, has called this movement in music "transcendentalism", and states:  
If the distinction between art and nature is mistaken, aesthetic valuation i  
s irrelevant. One should no more judge the value of a piano sonata than o  
ne should judge the value of a stone, a thunderstorm, or a starfish. "Cate  
gorical statements, such as right and wrong, beautiful or ugly, ty,Pical of t  
he rationalistic thinking of tonal aesthetics," writes Luciano Berio La contemporary composer], "are no longer useful in understanding why and how a   
composer today works on audible forms and musical action  
." Later, Meyer continues in describing the philosophical position of transc  
endentalism: ... all things in all of time and space are inextricably connected with o  
ne another. Any divisions, classifications, or organizations discovered in t  
he universe are arbitra ry. The world is a complex, continuous, singl  
e event. 2 [ Shades of Zeno!  
] I find "transcendentalism" too bulky a name for this movement. In i  
ts place, I use "ism''. Being a suffix without a prefix, it suggests an i  
deolog

748

FIGURE 141. The Human Condition I, by Rene Magritte (193

749

without ideas-which, however you interpret it, is probably the case. A  
nd since "ism" embraces whatever is, its name is quite fitting. In "ism" the w  
ord "is" is half mentioned, half used; what could be more appropriate? Ism is   
the spirit of Zen in art. And just as the central problem of Zen is to u  
nmask the self, the central problem of art in this century seems to be to figure o  
ut what art is. All these thrashings-about are part of its identity cris  
i

749

We have seen that the use-mention dichotomy, when pushed, tur  
ns into the philosophical problem of symbol-object dualism, which links it t  
o the mystery of mind. Magritte wrote about his painting The Human Condition I (Fig. 14 1):  
I placed in front of a window, seen from a room, a painting r  
epresenting exactly that part of the landscape which was hidden from view by the painting. Therefore, the tree represented in the painting hid from view the t  
ree situated behind it, outside the room. It existed for the spectator, as it w  
ere, simultaneously in his mind, as both inside the room in the painting, a  
nd outside in the real landscape. Which is how we see the world: we see it as be  
ing outside ourselves even though it is only a mental representation of it that w  
e experience inside ourselves.3

749

Understanding the Mind

749

First through the pregnant images of his painting, and then in d  
irect words, Magritte expresses the link between the two questions "How d  
o symbols work?" and "How do our minds work?" And so he leads us back t  
o the question posed earlier: "Can we ever hope to understand our m  
inds/ b

749

Or does some marvelous diabolical Godelian proposition preclude o  
ur ever unraveling our minds? Provided you do not adopt a totally unreasonable definition of "understanding", I see no Godelian obstacle in the way o  
f the eventual understanding of our minds. For instance, it seems to me q  
uite reasonable to desire to understand the working principles of brains i  
n general, much the same way as we understand the working principles of c  
ar engines in general. It is quite different from trying to understand a  
ny single brain in every last detail-let alone trying to do this for one's o  
wn brain! I don't see how Godel's Theorem, even if construed in the s  
loppiest way, has anything to say about the feasibility of this prospect. I see n  
o reason that Godel's Theorem imposes any limitations on our ability t  
o formulate and verify the general mechanisms by which thought p  
rocesses take place in the medium of nerve cells. I see no barrier imposed by G  
odel's Theorem to the implementation on computers (or their successors) of type  
s of symbol manipulation that achieve roughly the same results as brains d  
o. It is entirely another question to try and duplicate in a program some   
particular human's mind-but to produce an intelligent program at all is a  
more limited goal. Godel's Theorem doesn't ban our reproducing our own  
level of intelligence via programs any more than it bans our r  
eproducing our own level of intelligence via transmission of hereditary information i  

750

DNA, followed by education. Indeed, we have seen, in Chapter XVI, how a  
remarkable Godelian mechanism-the Strange Loop of proteins a  
nd DNA-is precisely what allows transmission of intelligence!

750

Does Godel's Theorem, then, have absolutely nothing to offer us i  
n thinking about our own minds? I think it does, although not in the mys  
tical and limitative way which some people think it ought to. I think that t  
he process of coming to understand Godel's proof, with its construction involving arbitrary codes, complex isomorphisms, high and low levels o  
f interpretation, and the capacity for self-mirroring, may inject some r  
ich undercurrents and flavors into one's set of images about symbols a  
nd symbol processing, which may deepen one's intuition for the r  
elationship between mental structures on different l

750

Accidental lnexplicability of Inte  
lligenc

750

Before suggesting a philosophically intriguing "application" of G  
odel's proof, I would like to bring up the idea of "accidental inexplicability" o  
f intelligence. Here is what that involves. It could be that our brains, u  
nlike car engines, are stubborn and intractable systems which we cannot nea  
tly decompose in any way. At present, we have no idea whe'ther our brains wil  
l yield to repeated attempts to cleave them into clean layers, each of whi  
ch can be explained in terms of lower layers--or whether our brains will f  
oil all our attempts at d

750

But even if we do fail to understand ourselves, there need not be a  
ny Godelian "twist" behind it; it could be simply an accident of fate that o  
ur brains are too weak to understand themselves. Think of the lowly giraffe,  
for instance, whose brain is obviously far below the level required f  
or self-understanding-yet it is remarkably similar to our own brain. In fa  
ct, the brains of giraffes, elephants, baboons--even the brains of tortoises o  
r unknown beings who are far smarter than we are-probably all operate o  
n basically the same set of principles. Giraffes may lie far below the thresh  
old of intelligence necessary to understand how those principles fit together t  
o produce the qualities of mind; humans may lie closer to that thresholdperhaps just barely below it, perhaps even above it. The point is that the  
re may be no fundamental (i.e., Godelian) reason why those qualities are incomprehensible; they may be completely clear to more intelligent b

750

Undecidability Is Inseparable from a High-Level Vi  
ewpoin

750

Barring this pessimistic notion of the accidental inexplicability of the b  
rain, what insights might Godel's proof offer us about explanations of o  
ur minds/brains? Godel's proof offers the notion that a high-level view of a  
system may contain explanatory power which simply is absent on the l  
ower levels. By this I mean the following. Suppose someone gave you G, G  
odel's undecidable string, as a string of TNT. Also suppose you knew nothing of   
Godel-numbering. The question you are supposed to answer is: "Why i

751

this string a theorem of TNT?" Now you are used to such questions; for   
instance, if you had been asked that question about 50=0, you would have a   
ready explanation: "Its negation, -50==0, is a theorem." This, together w  
ith your knowledge that TNT is consistent, provides an explanation of why t  
he given string is a nontheorem. This is what I call an explanation "on the   
TNT-level". Notice how different it is from the explanation of why MU i  
s not a theorem of the MIU-system: the former comes from the M-mode, t  
he latter only from the I-mo

751

Now what about G? The TNT-level explanation which worked f  
or 50=0 does not work for G, because --G is not a theorem. The person w  
ho has no overview of TNT will be baffled as to why he can't make G a  
ccording to the rules, because as an arithmetical proposition, it apparently h  
as nothing wrong with it. In fact, when G is turned into a universally quantified string, every instance gotten from G by substituting numerals for t  
he variables can be derived. The only way to explain G's nontheoremhood is t  
o discover the notion of Godel-numbering and view TNT on an e  
ntirely different level. It is not that it is just difficult and complicated to write o  
ut the explanation on the TNT-level; it is impossible. Such an e  
xplanation simply does not exist. There is, on the high level, a kind of e  
xplanatory power which simply is lacking, in principle, on the TNT-level. G's nontheoremhood is, so to speak, an intrinsically high-level fact. It is my susp  
icion that this is the case for all undecidable propositions; that is to say: e  
very undecidable proposition is actually a Godel sentence, asserting its o  
wn nontheoremhood in some system via some c  
od

751

Consciousness as an Intrinsically Hig h-Level Phen  
omeno

751

Looked at this way, Godel's proof suggests-though by no means does i  
t prove!-that there could be some high-level way of viewing the mind/b  
rain, involving concepts which do not appear on lower levels, and that this l  
evel might have explanatory power that does not exist-not even i  
n principle-on lower levels. It would mean that some facts could be explained on the high level quite easily, but not on lower levels at all. N  
o matter how long and cumbersome a low-level statement were made, i  
t would not explain the phenomena in question. It is the analogue to the f  
act that, if you make derivation after derivation in TNT, no matter how l  
ong and cumbersome you make them, you will never come up with one f  
or G-despite the fact that on a higher level, you can see that G is t  
ru

751

What might such high-level concepts be? It ha� been proposed f  
oreons, by various holistically or "soulistically" inclined scientists a  
nd humanists, that consciousness is a phenomenon that escapes explanation i  
n terms of brain-components; so here is a candidate, at least. There is also t  
he ever-puzzling notion of free will. So perhaps these qualities could be "emergent" in the sense of requiring explanations which cannot be furnished b  
y the physiology alone. But it is important to realize that if we are b  
eing guided by Godel's proof in making such bold hypotheses, we must carry t  
h

752

analogy through thoroughly. In particular, it is vital to recall that G  
's nontheoremhood does have an explanation-it is not a total mystery! The   
explanation hinges on understanding not just one level at a time, but t  
he way in which one level mirrors its metalevel, and the consequences of t  
his mirroring. If our analogy is to hold, -then, "emergent" phenomena w  
ould become explicable in terms of a relationship between different levels i  
n mental s

752

Strange Loops as the Crux of Consciousness

752

My belief is that the explanations of "emergent" phenomena in o  
ur brains-for instance, ideas, hopes, images, analogies, and finally consciousness and free will-are based on a kind of Strange Loop, an i  
nteraction between levels in which the top level reaches back down towards the b  
ottom level and influences it, while at the same time being itself determined by t  
he bottom level. In other words, a self-reinforcing "resonance" between different levels---quite like the Henkin sentence which, by merely asserting i  
ts own provability, actually becomes provable. The self comes into being a  
t the moment it has the power to reflect i  
tsel

752

This should not be taken as an antireductionist position. It just implie  
s that a reductionistic explanation of a mind, in order to be comprehensihle, m  
ust bring in "soft" concepts such as levels, mappings, and meanings. In principle, I have no doubt that a totally reductionistic but i  
ncomprehensible explanation of the brain exists; the problem is how to translate it into a  
language we ourselves can fathom. Surely we don't want a description i  
n terms of positions and momenta of particles; we want a description w  
hich relates neural activity to "signals" (intermediate-level phenomena)-an  
d which relates signals, in turn, to "symbols" and "subsystems", including t  
he presumed-to-exist "self-symbol". This act of translation from low-l  
evel physical hardware to high-level psychological software is analogous to t  
he translation of number-theoretical statements into metamathematical statements. Recall that the level-crossing which takes place at this exact translation point is what creates Godel's incompleteness and the self-p  
roving character of Henkin's sentence. I postulate that a similar level-crossing i  
s what creates our nearly unanalyzable feelings of s

752

In order to deal with the full richness of the brain/mind system, we w  
ill have to be able to slip between levels comfortably. Moreover, we will have t  
o admit various types of "causality": ways in which an event at one level o  
f description can "cause" events at other levels to happen. Sometimes e  
vent A will be said to "cause" event B simply for the reason that the one is a  
translation, on another level of description, of the other. S  
ometimes "cause" will have its usual meaning: physical causality. Both types of   
causality-and perhaps some more-will have to be admitted in any explanation of mind, for we will have to admit causes that propagate both   
upwards and downwards in the Tangled Hierarchy of mentality, just as i  
n the Central D

753

At the crux, then, of our understanding ourselves will come an understanding of the Tangled Hierarchy of levels inside our minds. My p  
osition is rather similar to the viewpoint put forth by the neuroscientist R  
oger Sperry in his excellent article "Mind. Brain, and Humanist Values", f  
rom which I quote a little h  
ere: In my own hypothetical brain model. conscious awareness does get representation as a very real causal agent and rates an important place in the c  
ausal sequence and chain of control in brain events, in which it appears as an a  
ctive, operational force . ... To put it very ,imply, it comes down to the issue of w  
ho pushes whom around in the population of causal forces that occupy t  
he cranium. It is a matter, in other words, of straightening out the p  
eck-order hierarchy among intracranial control agents. There exists within the c  
ranium a whole world of diverse causal forces; what is more, there are forces w  
ithin forces within forces, as in no other cubic half-foot of universe that we know .  
. . . To make a long story short, if one keeps climbing upward in the chain of   
command within the brain, one finds at the very top those over-all organizational forces and dynamic properties of the large patterns of cerebral excitation that are correlated with mental ,tates or psychic activity . ... Near t  
he apex of this command system in the brain ... we find ideas. Man over the   
chimpanzee has ideas and ideals. In the brain model proposed here, t  
he causal potency of an idea, or an ideal, becomes just as real as that of a  
molecule, a cell, or a nerve impulse. Ideas cause ideas and help evolve n  
ew ideas. They interact with each other and with other mental forces in the s  
ame brain, in neighboring brains, and, thanks to global communication, in f  
ar distant, foreign brains. And they also interact with the external s  
urroundings to produce in toto a burstwise advance in evolution that is far beyond anything to hit the evolutionary scene yet, including the emergence of the l  
iving cell.4

753

There is a famous breach between two languages of discourse: the   
subjective language and the objective language. For instance, the "subjective" sensation of redness, and the •·objective" wavelength of red light. T  
o many people, these seem to be forever irreconcilable. I don't think so. N  
o more than the two views of Escher's Drawing Hands are irreconcilablefrom "in the system", where the hands draw each other, and from o  
utside, where Escher draws it all. The subjective feeling of redness comes from t  
he vortex of self-perception in the brain; the objective wavelength is how y  
ou see things when you step back, outside of the system. Though no one of u  
s will ever be able to step back far enough to see the "big picture", w  
e shouldn't forget that it exists. We should remember that physical law i  
s what makes it all happen-way, way down in neural nooks and crannies   
which are too remote for us to reach with our high-level i  
ntrospective p  
robe

753

The Self-Symbol and Free W  
il

753

In Chapter XII, it was suggested that what we call free will is a result of t  
he interaction between the self-symbol (or subsystem), and the other s  
ymbols in the brain. If we take the idea that symbols are the high-level entities t  

754

which meanings should be attached, then we can make a stab at explain  
ing the relationship between symbols, the self-symbol, and free w

754

One way to gain some perspective on the free-will question is to r  
eplace it by what I believe is an equivalent question, but one which involves less   
loaded terms. Instead of asking, "Does system X have free will?" we a  
sk, "Does system X make choices?" By carefully groping for what we r  
eally mean when we choose to describe a system-mechanical or b  
iological-as being capable of making "choices", I think we can shed much light on f  
ree will. It will be helpful to go over a few different systems which, u  
nder various circumstances, we might feel tempted to describe as "  
making choices". From these examples we can gain some perspective on what w  
e really mean by the p

754

Let us take the following systems as paradigms: a marble rolling d  
own a bumpy hill; a pocket calculator finding successive digits in the d  
ecimal expansion of the square root of 2; a sophisticated program which plays a  
mean game of chess; a robot in a T-maze (a maze with but a single fork, o  
n one side of which there is a reward); and a human being confronting a  
complex d  
ilemm

754

First, what about that marble rolling down a hill? Does it make choices?  
I think we would unanimously say that it doesn't, even though none of u  
s could predict its path for even a very short distance. We feel that it coul  
dn't have gone any other way than it did, and that it was just being shoved a  
long by the relentless laws of nature. In our chunked mental physics, of c  
ourse, we can visualize many different "possible" pathways for the marble, and w  
e see it following only one of them in the real world. On some level of o  
ur minds, therefore, we can't help feeling the marble has "chosen" a s  
ingle pathway out of those myriad mental ones; but on some other level of o  
ur minds, we have an instinctive understanding that the mental physics is o  
nly an aid in our internal modeling of the world, and that the m  
echanisms which make the real physical sequences of events happen do not require   
nature to go through an analogous process of first manufacturing var  
iants in some hypothetical universe (the "brain of God") and then c  
hoosing between them. So we shall not bestow the designation "choice" upon t  
his process-although we recognize that it is often pragmatically useful to u  
se the word in cases like this, because of its evocative p  
owe

754

Now what about the calculator programmed to find the digits of t  
he square root of 2? What about the chess program? Here, we might say t  
hat we are just dealing with "fancy marbles", rolling down "fancy hills". In fac  
t, the arguments for no choice-making here are, if anything, stronger than i  
n the case of a marble. For if you attempt to repeat the marble e  
xperiment, you will undoubtedly witness a totally different pathway being traced d  
own the hill, whereas if you rerun the square-root-of-2 program, you will get t  
he same results time after time. The marble seems to "choose" a different path  
each time, no matter how accurately you try to reproduce the conditions o  
f its original descent, whereas the program runs down precisely the s  
ame channels each t

754

Now in the case of fancy chess programs, there are various possibilit

755

If you play a game against certain programs, and then start a second g  
ame with the same moves as you made the first time, these programs will j  
ust move exactly as they did before, without any appearance of having lear  
ned anything or having any desire for vari ety. There are other programs whi  
ch have randomizing devices that will give some variety but not out of any   
deep desire. Such programs could be reset with the internal r  
andom number generator as it was the first time, and once again, the same g  
ame would ensue. Then there are other programs which do learn from t  
heir mistakes, and change their strategy depending on the outcome of a g  
ame. Such programs would not play the same game twice in a row. Of c  
ourse, you could also turn the clock back by wiping out all the changes in t  
he memory which represent learning, just as you could reset the r  
andom number generator, but that hardly seems like a friendly thing to d  
o. Besides, is there any reason to suspect that you would be able to change any   
of your own past decisions if every last detail-and that includes your b  
rain, of course-were reset to the way it was the first time around?

755

But let us return to the question of whether "choice" is an applic  
able term here. If programs are just "fancy marbles rolling down fancy hills", d  
o they make choices, or not? Of course the answer must be a subjective o  
ne, but I would say that pretty much the same considerations apply here as t  
o the marble. However, I would have to add that the appeal of using t  
he word "choice", even if it is only a convenient and evocative shorthand,   
becomes quite strong. The fact that a chess program looks ahead down t  
he various possible bifurcating paths, quite unlike a rolling marble, makes i  
t seem much more like an animate being than a square-root-of-2 p  
rogram. However, there is still no deep self-awareness here-and no sense of f  
ree w

755

Now let us go on to imagine a robot which has a repertoire of symb  
ols. This robot is placed in a T-maze. However, instead of going for the r  
eward, it is preprogrammed to go left whenever the next digit of the square root o  
f 2 is even, and to go right whenever it is odd. Now this robot is capable o  
f modeling the situation in its symbols, so it can watch itself making choices.  
Eich time the T is approached, if you were to address to the robot t  
he question, "Do you know which way you're going to turn this time?" it would   
have to answer, "No". Then in order to progress, it would activate i  
ts "decider" subroutine, which calculates the next digit of the square root of 2  
, and the decision is taken. However, the internal mechanism of the d  
ecider is unknown to the robot-it is represented in the robot's symbols merely a  
s a l;llack box which puts out "left" 's and "right" 's by some mysterious a  
nd seemingly random rule. Unless the robot's symbols are capable of p  
icking up the hidden heartbeat of the square root of 2, beating in the L's and R's,  
it will stay baffled by the "choices" which it is making. Now does this r  
obot make choices? Put yourself in that position. If you were trapped inside a  
marble rolling down a hill and were powerless to affect its path, yet c  
ould observe it with all your human intellect, would you feel that the marble's  
path involved choices? Of course not. Unless your mind is affecting t  
he outcome, it makes no difference that the symbols are p  
resen

756

So now we make a modification in our robot: we allow its symbolsincluding its self-symbol-to affect the decision that is taken. Now here i  
s an example of a program running fully under physical law, which seems t  
o get much more deeply at the essence of choice than the previous example  
s did. When the robot's own chunked concept of itself enters the scene, w  
e begin to identify with the robot, for it sounds like the kind of thing we do. I  
t is no longer like the calculation of the square root of 2, where no sym  
bols seem to be monitoring the decisions taken. To be sure, if we were to look a  
t the robot's program on a very local level, it would look quite like t  
he square-root program. Step after step is executed, and in the end "left" o  
r "right" is the output. But on a high level we can see the fact that symbols a  
re being used to model the situation and to affect the decision. That r  
adically affects our way of thinking about the program. At this stage, meaning h  
as entered this picture-the same kind of meaning as we manipulate with o  
ur own minds.

756

A Godel Vortex Where All Levels C  
ros

756

Now if some outside agent suggests 'L' as the next choice to the robot, t  
he suggestion will be picked up and channeled into the swirling mass o  
f interacting symbols. There, it will be sucked inexorably into i  
nteraction with the self-symbol, like a rowboat being pulled into a whirlpool. That is   
the vortex of the system, where all levels cross. Here, the 'L' encounters a  
Tangled Hierarchy of symbols and is passed up and down the levels. The   
self-symbol is incapable of monitoring all its internal processes, and s  
o when the actual decision emerges-'L' or 'R' or something outside the   
system-the system will not be able to say where it came from. Unlike a  
standard chess program, which does not monitor itself and consequentl  
y has no ideas about where its moves come from, this program does m  
onitor itself and does have ideas about its ideas-but it cannot monitor its o  
wn processes in complete detail, and therefore has a sort of intuitive sense of i  
ts workings, without full understanding. From this balance between selfknowledge and self-ignorance comes the feeling of free w

756

Think, for instance, of a writer who is trying to convey certain i  
deas which to him are contained in mental images. He isn't quite sure how t  
hose images fit together in his mind, and he experiments around, e  
xpressing things first one way and then another, and finally settles on some v  
ersion. But does he know where it all came from? Only in a vague sense. Much o  
f the source, like an iceberg, is deep underwater, unseen-and he k  
nows that. Or think of a music composition program, something we d  
iscussed earlier, asking when we would feel comfortable in calling it the c  
omposer rather than the tool of a human composer. Probably we would feel comfortable when self-knowledge in terms of symbols exists inside the program, and when the program has this delicate balance between self-knowledge and self-ignorance. It is irrelevant whether the system is r  
unning deterministically; what makes us call it a "choice maker" is whether we c  
an identify with a high-level description of the process which takes place when t  
h

757

FIGURE 142. Print Gallery, by M. C. Escher (lithograph, 195

757

program runs. On a low (machine language) level, the program looks l  
ike any other program; on a high (chunked) level, qualities such as "  
will", "intuition", "creativity", and "consciousness" can e

757

The important idea is that this "vortex" of self is responsible for t  
he tangledness, for the Godelian-ness, of the mental processes. People h  
avesaid to me on occasion, "This stuff with self-reference and so on is v  
eryamusing and enjoyable, but do you really think there is anything serious t  
o it?" I certainly do. I think it will eventually turn out to be at the core of A  
I, and the focus of all attempts to understand how human minds work. A  
nd that is why Godel is so deeply woven into the fabric of my b  
oo

758

An Escher Vortex Where All Levels Cros  

758

A strikingly beautiful, and yet at the same time disturbingly g  
rotesque, illustration of the cyclonic "eye" of a Tangled Hierarchy is given to us b  
y Escher in his Print Gallery (Fig. 142). What we see is a picture gallery w  
here a young man is standing, looking at a picture of a ship in the harbor of a  
small town, perhaps a Maltese town, to guess from the architecture, with i  
ts little turrets, occasional cupolas, and flat stone roofs, upon one of which s  
its a boy, relaxing in the heat, while two floors below him a woman-  
perhaps his mother-gazes out of the window from her apartment which sits directly above a picture gallery where a young man is standing, looking at a  
picture of a ship in the harbor of a small town, perhaps a Maltese townWhat!? We are back on the same level as we began, though all logic d  
ictates that we cannot be. Let us draw a diagram of what we see (Fig. 143

758

FIGURE 143. Abstract diagram o  
f M .C. Escher's Print G  
aller

758

What this diagram shows is three kinds of "in-ness". The gallery is physical  
ly in the town ("inclusion"); the town is artistically in the picture ("depiction");  
the picture is mentally in the person ("representation"). Now while t  
his diagram may seem satisfying, in fact it is arbitrary, for the number of l  
evels shown is quite arbitrary. Look below at another way of representing the t  
op half alone (Fig. 144

758

FIGURE 144. A collapsed version of t  
he previous figure.

759

We have eliminated the "town" level: conceptually it was useful, but can j  
ust as well be done without. Figure 144 looksjust like the diagram for D  
rawing Hands: a Strange Loop of two steps. The division markers are arbit  
rary, even if they seem natural to our minds. This can be further accentuated b  
y showing even more "collapsed" schematic diagrams of Print Gallery, s  
uch as that in Figure 145

759

FIGURE 145. Further collapse of Figure 143

759

This exhibits the paradox of the picture in the starkest terms. Now-if the  
picture is "inside itself", then is the young man also inside himself? T  
his question is answered in Figure 146

759

FIGURE 146. Another way of collapsing Figure 1

759

Thus, we see the young man "inside himself", in a funny sense which i  
s made up of compounding three dis.tinct senses of "

759

This diagram reminds us of the Epimenides paradox with its o  
ne-step self-reference, while the two-step diagram resembles the sentence pair e  
ach of which refers to the other. We cannot make the loop any tighter, but w  
e can open it wider, by choosing to insert any number of intermediate l  
evels, such as "picture frame", "arcade", and "building". I fwe do so, we will h  
ave many-step Strange Loops, whose diagrams are isomorphic to those o  
f Wateifall (Fig. 5) or Ascending and Descending (Fig. 6). The number o fl  
evels is determined by what we feel is "natural", which may vary according t  
o context, purpose, or frame of mind. The Central Xmaps-Dog, Cra  
b, Sloth, and Pipe-can all be seen as involving three-step Strange Loops  
; alternatively, they can all be collaps.ed into t wo-or one-step loops; t  
hen again, they can be expanded out into multistage loops. Where one perceives the levels is a matter of intuition and esthetic p  
referenc

759

Now are we, the observers of Print Gallery, also sucked into ourselves b  
y virtue of looking at it? Not really. We manage to escape that p  
articular vortex by being outside of the system. And when·we look at the picture, w  
e see things which the young man can certainly not see, such as E

760

signature, "MCE", in the central "blemish". Though the blemish seems l  
ike a defect, perhaps the defect lies in our expectations, for in fact E  
scher could not have completed that portion of the picture without being inconsistent with the rules by which he was drawing the picture. That center o  
f the whorl is-and must be-incomplete. Escher could have made it arbitrarily small, but he could not have gotten rid of it. Thus we, on the o  
utside, can know that Print Gallery is essentially incomplete-a fact which the  
young man, on the inside, can never know. Escher has thus given a p  
ictorial parable for Godel's Incompleteness Theorem. And that is why the s  
trands of Godel and Escher are so deeply interwoven in my b

760

A Bach Vortex Where All Levels Cros  

760

One cannot help being reminded, when one looks at the diagrams o  
f Strange Loops, of the Endlessly Rising Canon from the Musical Offering. A  
diagram of it would consist of six steps, as is shown in Figure 14 7. It is t  
o

760

FIGURE 147. The hexagonal modulation scheme of Bach's Endlessly Rising Canon for  
ms a true closed loo-p when Shepard tones are u

760

bad that when it returns to C, it is an octave higher rather than at the e  
xact original pitch. Astonishingly enough, it is possible to arrange for it t  
o return exactly to the starting pitch, by using what are called Shepard t  
ones, after the psychologist Roger Shepard, who discovered the idea. The principle of a Shepard-tone scale is shown in Figure 148. In words, it is this: y  
ou play parallel scales in several different octave ranges. Each note is w  
eighted independently, and as the notes rise, the weights shift. You make the t  
o

761

FIGURE 148. Two complete cycles of a Shepard tone scale, notated for pwno. The l  
oudness of each note is proportional to its area; thus, just as the top voice fades out, a new bottom v  
oice feebly enters. [Printed by Donald Byrd's program "SMUT".]

762

octave gradually fade out, while at the same time you are gradually bringing in the bottom octave. Just at the moment you would ordinarily be o  
ne octave higher, the weights have shifted precisely so as to reproduce the  
starting pitch ... Thus you can go "up and up forever", never getting a  
ny higher! You can try it at your piano. It works even better if the pitches c  
an be synthesized accurately under computer control. Then the illusion i  
s bewilderingly s

762

This wonderful musical discovery allows the Endlessly Rising Canon t  
o be played in such a way that it joins back onto itself after going "up" a  
n octave. This idea, which Scott Kim and I conceived jointly, has b  
een realized on tape, using a computer music system. The effect is v  
ery subtle-but very real. It is quite interesting that Bach himself was apparently aware, in some sense, of such scales, for in his music one can occa  
sionally find passages which roughly exploit the general principle of S  
hepard tones-for instance, about halfway through the Fantasia from the Fant  
asia and Fugue in G Minor, for o

762

In his book]. S. Bach's Musical Offering, Hans Theodore David writes:  
Throughout the Musical Offering, the reader, performer, or listener is t  
o search for the Royal theme in all its forms. The entire work, therefore, is a  
ricercar in the original, literal sense of the word. 5  
I think this is true; one cannot look deeply enough into the Musical Offer  
ing. There is always more after one thinks one knows everything. For ins  
tance, towards the very end of the Six-Part Ricercar, the one he declined t  
o improvise, Bach slyly hid his own name, split between two of the u  
pper voices. Things are going on on many levels in the Musical Offering. T  
here are tricks with notes and letters; there are ingenious variations on t  
he King's Theme; there are original kinds of canons; there are e  
xtraordinarily complex fugues; there is beauty and extreme depth of emotion; even an   
exultation in the many-leveledness of the work comes through. The Mus  
ical Offering is a fugue of fugues, a Tangled Hierarchy like those of Escher a  
nd Godel, an intellectual construction which reminds me, in ways I c  
annot express, of the beautiful many-voiced fugue of the human mind. And that i  
s why in my book the three strands of Godel, Escher, and Bach are woven i  
nto an Eternal Golden B

77

C HA PTER I  
The MU-puzz  
l

77

33

77

0 NE OF THE most central notions in this book is that of a formal system. T  
he type of formal system I use was invented by the American logician E  
mil Post in the l 920's, and is often called a "Post production system". T  
his Chapter introduces you to a formal system and moreover, it is my hope tha  
t you will want to explore this formal system at least a little; so to p  
rovoke your curiosity, I have posed a little p

77

"Can you produce MU?" is the puzzle. To begin with, you will b  
e supplied with a string (which means a string of letters).* Not to keep you i  
n suspense, that string will be Ml. Then you will be told some rules, w  
ith which you can change one string into another. If one of those rules i  
s applicable at some point, and you want to use it, you may, but-there i  
s nothing that will dictate which rule you should use, in case there are sev  
eral applicable rules. That is left up to you-and of course, that is where p  
laying the game of any formal system can become something of an art. The maj  
or point, which almost doesn't need stating, is that you must not do a  
nything which is outside the rules. We might call this restriction the "Requireme  
nt of Formality". In the present Chapter, it probably won't need to be s  
tressed at all. Strange though it may sound, though, I predict that when you p  
lay around with some of the formal systems of Chapters to come, you will fi  
nd yourself violating the Requirement of Formality over and over aga  
in, unless you have worked with formal systems b

77

The first thing to say about our formal system-the MIU-system-is t  
hat it utilizes only three letters of the alphabet: M, I, U. That means that"the  
only strings of the MIU-system are strings which are composed of tho  
se three letters. Below are some strings of the MIU

77

M  
U U  
IM M  
UUMUU UIIUMIUUIMUIIUMIUUIMU  
II

77

* In this book, we shall employ the following conventions when we refer to strings. W  
henthe string is in the same typeface as the text, then it will be enclosed in single or double q  
uotes. Punctuation which belongs to the sentence and not to the string under discussion will g  
o outside of the quotes, as logic dictates. For example, the first letter of this sentence is 'F', w  
hile the first letter of 'this sentence'·is 't'. When the string is in Quadrata Roman, however, q  
uotes will usually be left off, unless clarity demands them. For example, the first letter of Q  
uadrata is Q

78

34

78

But although all of these are legitimate strings, they are not strings whi  
ch are "in your possession". In fact, the only string in your possession so far i  
s Ml. Only by using the rules, about to be introduced, can you enlarge y  
our private collection. Here is the first rule:  
RULE I: If you possess a string whose last letter is I, you can add on a U a  
t the e  
nd. By the way, if up to this point you had not guessed it, a fact about the   
meaning of "string" is that the letters are in a fixed order. For example, M  
I and IM are two different strings. A string of symbols is not just a "bag" o  
f symbols, in which the order doesn't make any diffe

78

Here is the second r  
ule: RULE II: Suppose you have Mx. Then you may add Mxx to your collect  
ion. What I mean by this is shown below, in a few examples.  
From MIU, you may get M  
IUIU. From MUM, you may get M  
UMUM. From MU, you may get MUU  
. So the letter 'x' in the rule simply stands for any string; but once you h  
ave decided which string it stands for, you have to stick with your choice (unt  
il you use the rule again, at which point you may make a new choice). N  
otice the third example above. It shows how, once you possess MU, you can a  
dd another string to your collection; but you have to get MU first! I want t  
o add one last comment about the letter 'x': it is not part of the formal s  
ystem in the same way as the three letters 'M', 'I', and 'U' are. It is useful for u  
s, though, to have some way to talk in general about strings of the s  
ystem, symbolically-and that is the function of the 'x': to stand for an a  
rbitrary string. If you ever add a string containing an 'x' to your "collection", y  
ou have done something wrong, because strings of the MIU-system n  
ever contain "x" 's!

78

Here is the third r  
ule: RuLE III: If Ill occurs in one of the strings in your collection, you m  
ay make a new string with U in place of I  
ll. Examples:  
From UMIIIMU, you could make U  
MUMU. From Milli, you could make MIU (also M  
UI). From IIMII, you can't get anywhere using this r  
ule. (The three l's have to be consecu  
tive.) From Mlil, make MU.  
Don't, under any circumstances, think you can run this rule backwards, a  
s in the following e  
xampl

79

35

79

From MU, make MIii. ¢: This is w  
rong. Rules are one-  
way. Here is the final r  
ule: RULE IV: If UU occurs inside one of your strings, you can drop i  
t. From UUU, get U  
. From MUUUIII, get M  
UHi. There you have it. Now you may begin trying to make MU. Don't worry i  
f you don't get it. Just try it out a bit-the main thing is for you to get t  
he flavor of this MU-puzzle. Have fun

79

Theorems, Axioms, Rules

79

The answer to the MU-puzzle appears later in the book. For now, what i  
s important is not finding the answer, but looking for it. You probably h  
ave made some attempts to produce MU. In so doing, you have built up y  
our own private collection of strings. Such strings, producible by the rules, a  
re called theorems. The term "theorem" has, of course, a common usage i  
n mathematics which is quite different from this one. It means some statement in ordinary language which has been proven to be true by a r  
igorous argument, such as Zeno's Theorem about the "unexistence" of motion, or   
Euclid's Theorem about the infinitude of primes. But in formal s  
ystems, theorems need not be thought of as statements-they are merely strings o  
f symbols. And instead o fbeingproven, theorems are merely produced, as i  
fby machine, according to certain typographical rules. To emphasize this important distinction in meanings for the word "theorem", I will adopt the  
following convention in this book: when "theorem" is capitalized, its meaning will be the everyday one-a Theorem is a statement in ordinary language which somebody once proved to be true by some sort of l  
ogical argument. When uncapitalized, "theorem" will have its technical m  
eaning: a string producible in some formal system. In these terms, the MU-  
puzzle asks whether MU is a theorem of the MIU-

79

I gave you a theorem for free at the beginning, namely Ml. Such a  
"free" theorem is called an axiom-the technical meaning again being q  
uite different from the usual meaning. A formal system may have zero, o  
ne, several, or even infinitely many axioms. Examples of all these types w  
ill appear in the book.

79

Every formal system has symbol-shunting rules, such as the four r  
ules of the MIU-system. These rules are called either rules of production or rules o  
f inference. I will use both t  
erms. The last term which I wish to introduce at this point is deri  
vation. Shown below is a derivation of the theorem MUIIU:  
(1) M  
l ( 2)M  
ilThe MU-p  
uzzle a  
xiom from (1) by rule I  

80

36

80

( 3)M  
IIII( 4)MII  
IIU( 5)M  
UIU( 6)M  
UIUUIU( 7)M  
UIIU from (2) by rule I  
I from (3) by rule I  
from (4) by rule I  
II from (5) by rule I  
I from (6) by rule I  

80

A derivation of a theorem is an explicit, line-by-line demonstration of h  
ow to produce that theorem according to the rules of the formal system. T  
he concept of derivation is modeled on that of proof, but a derivation is a  
n austere cousin of a proof. It would sound strange to say that you had pro  
ven MUIIU, but it does not sound so strange to say you have derived MUIIU.

80

Inside and Outside the System

80

Most people go about the MU-puzzle by deriving a number of theorem  
s, quite at random, just to see what kind of thing turns up. Pretty soon, t  
hey begin to notice some properties of the theorems they have made; that i  
s where human intelligence enters the picture. For instance, it was prob  
ably not obvious to you that all theorems would begin with M, until you h  
ad tried a few. Then, the pattern emerged, and not only could you see t  
he pattern, but you could understand it by looking at the rules, which have t  
he property that they make each new theorem inherit its first letter from a  
n earlier theorem; ultimately, then, a ll theorems' first letters can be trac  
ed back to the first letter of the sole axiom MI-and that is a proof that  
theorems of the MIU-system must all begin with M

80

There is something very significant about what has happened here. I  
t shows one difference between people and machines. It would certainly b  
e possible-in fact it would be very easy-to program a computer to g  
enerate theorem after theorem of the Ml U-system; and we could include in t  
he program a command to stop only upon generating U. You now know that a  
computer so programmed would ne"er stop. And this does not amaze y  
ou. But what if you asked a friend to try to generate U? It would not surp  
rise you if he came back after a while, complaining that he can't get rid of t  
he initial M, and therefore it is a wild goose chase. Even if a person is not very  
bright, he still cannot help making some observations about what he i  
s doing, and these observations give him good insight into the t  
ask-insight which the computer program, as we have described it, l  
ack

80

Now let me be very explicit about what I meant by saying this shows a  
difference between people and machines. I meant that it is possible t  
o program a machine to do a routine task in such a way that the machine w  
ill never notice even the most obvious facts about what it is doing; but it i  
s inherent in human consciousness to notice some facts about the things o  
ne is doing. But you knew this all along. If you punch "l" into an a  
dding machine, and then add 1 to it, and then add 1 again, and again, and a  
gain, and continue doing so for hours and hours, the machine will never learn t  
o anticipate you, and do it itself, although any person would pick up t  
h

81

37

81

repetitive behavior very quickly. Or, to take a silly example, a car will n  
ever pick up the idea, no matter how much or how well it is driven, that it i  
s supposed to avoid other cars and obstacles on the road; and it will nev  
er learn even the most frequ ently traveled routes of its owne  

81

The difference, then, is that it is possible for a machine to act unobservant; it is impossible for a human to act unobservant. Notice I am not s  
aying that all machines are necessarily incapable of making sophisticated observations; just that some machines are. Nor am I saying that all people a  
re always making sophisticated observations; people, in fact, are often v  
ery unobservant. But machines can be made to be totally unobservant; a  
nd people cannot. And in fact, most machines made so far are pretty close t  
o being totally unobservant. Probably for this reason, the property of b  
eing unobservant seems to be the characteristic feature of machines, to m  
ost people. For example, if somebody says that some task is "mechanical", i  
t does not mean that people are incapable of doing the task; it i  
mplies, though, that only a machine could do it over and over without e  
ver complaining, or feeling bored.

81

Jumping out of the System

81

It is an inherent property of intelligence that it can jump out of the t  
ask which it is performing, and survey what it has done; it is always looking fo  
r, and often finding, patterns. Now I said that an intelligence can jump out o  
f its task, but that does not mean that it always will. However, a little prompting will often suffice. For example, a human being who is reading a b  
ook may grow sleepy. Instead of continuing to read until the book is fi  
nished, he is just as likely to put the book aside and turn off the light. He h  
as stepped "out of the system" and yet it seems the most natural thing in t  
he world to us. Or, suppose person A is watching television when person B  
comes in the room, and shows evident displeasure with the situa  
tion. Person A may think he understands the problem, and try to remedy it b  
y exiting the present system (that television program), and flipping the channel knob, looking for a better show. Person B may have a more r  
adical concept of what it is to "exit the system"-namely to turn the television o  
ff! Of course, there are cases where only a rare individual will have the v  
ision to perceive a system which governs many peoples' lives, a system which h  
ad never before even been recognized as a system; then such people oft  
en devote their lives to convincing other people that the system really is the  
re, and that it ought to be exited from

81

How well have computers been taught to jump out of the system? I w  
ill cite one example which surprised some observers. In a computer c  
hess tournament not long ago in Canada, one program-the weakest of all t  
he competing ones-had the unusual feature of quitting long before the g  
ame was over. It was not a very good chess player, but it at least had t  
he redeeming quality of being able to spot a hopeless position, and to r  
esign then and there, instead of waiting for the other program to go through the

82

38

82

boring ritual of checkmating. Although it lost every game it played, it did i  
t in style. A lot of local chess experts were impressed. Thus, if you define  
"the system" as "making moves in a chess game", it is clear that thi  
s program had a sophisticated, preprogrammed ability to exit from t  
he system. On the other hand, if you think of "the system" as being "wh  
atever the computer had been programmed to do", then there is no doubt that the  
computer had no ability whatsoever to exit from that s  
yste

82

It is very important when studying formal systems to distinguish working within the system from making statements or observations about t  
he system. I assume that you began the MU-puzzle, as do most people, b  
y working within the system; and that you then gradually started g  
etting anxious, and this anxiety finally built up to the point where without a  
ny need for further consideration, you exited from the system, trying to t  
ake stock of what you had produced, and wondering why it was that you h  
ad not succeeded in producing MU. Perhaps you found a reason why y  
ou could not produce MU; that is thinking about the system. Perhaps y  
ou produced MIU somewhere along the way; that is working within the s  
ystem. Now I do not want to make it sound as if the two modes are e  
ntirely incompatible; I am sure that every human being is capable to some extent  
of working inside a system and simultaneously thinking about what he i  
s doing. Actually, in human affairs, it is often next to impossible to b  
reak things neatly up into "inside the system" and "outside the system"; life i  
s composed of so many interlocking and interwoven and of ten inconsistent  
"systems" that it may seem simplistic to think of things in those terms. But i  
t is often important to formulate simple ideas very clearly so that one can u  
se them as models in thinking about more complex ideas. And that is why I   
am showing you formal systems; and it is about time we went back to   
discussing the MIU

82

M-Mode, I-Mode, LI-Mo  
d

82

The MU-puzzle was stated in such a way that it encouraged some a  
mount of exploration within the MIU-system-deriving theorems. But it was also   
stated in a way so as not to imply that staying inside the system would   
necessarily yield fruit. Therefore it encouraged some oscillation b  
etween the two modes of work. One way to separate these two modes would be t  
o have two sheets of paper; on one sheet, you work "in your c apacity as a  
machine", thus filling it with nothing but M's, l's, and U's; on the second   
sheet, you work "in your capacity as a thinking being", and are allowed t  
o do whatever your intelligence suggests-which might involve u  
sing English, sketching ideas, working backwards, using shorthand (such as t  
he letter 'x'), compressing several steps into one, modifying the rules of t  
he system to see what that gives, or whatever else you might dream up. O  
ne thing you might do is notice that the numbers J and 2 play an important  
role, since l's are gotten rid of in three's, and U's in two's-and doubling o  
f length (except for the M) is allowed by rule II. So the second sheet might

83

39

83

also have some figuring on it. We will occasionally refer back to these t  
wo modes of dealing with a formal system, and we will call them the Mec  
hanical mode (M-mode) and the Intelligent mode (I-mode). To round out our m  
odes, with one for each letter of the MIU-system, I will also mention a fi  
nal mode-the Un-mode (U-mode), which is the Zen way of approaching thi  
ngs. More about this in a few C

83

Decision P  
rocedure

83

An observation about this puzzle is that it involves rules of two o  
pposing tendencies-the lengthening rules and the shortening rules. Two rules (I a  
nd II) allow you to increase the size of strings (but only in very rigid, prescribed ways, of course); and two others allow you to shrink strings somewhat (again in very rigid ways). There seems to be an endless variety to t  
he order in which these different types of rules might be applied, and t  
his gives hope that one way or another, MU could be produced. It might  
involve lengthening the string to some gigantic size, and then e  
xtracting piece after piece until only two symbols are left; or, worse yet, it might  
involve successive stages of lengthening and then shortening and the  
n lengthening and then shortening, and so on. But there is no guarantee o  
f it. As a matter of fact, we already observed that U cannot be produced at a  
ll, and it will make no difference if you lengthen and shorten till k  
ingdom c

83

Still, the case of U and the case of MU seem quite different. It is by a  
very superficial feature of U that we recognize the impossibility of producing it: it doesn't begin with an M (whereas all theorems must). It is v  
ery convenient to have such a simple way to detect nontheorems. H  
owever, who says that that test will detect all nontheorems? There may be lots o  
f strings which begin with M but are not producible. Maybe MU is one of   
them. That would mean that the "first-letter test" is of limited usefu  
lness, able only to detect a portion of the nontheorems, but missing others. B  
ut there remains the possibility of some more elaborate test which discriminates perfectly between those strings which can be produced by the r  
ules, and those which cannot. Here we have to face the question, "What do w  
e mean by a test?" It may not be obvious why that question makes sense, or i  
s important, in this context. But I will give an example of a "test" whi  
ch somehow seems to violate the spirit of the w

83

Imagine a genie who has all the time in the world, and who enjoys  
using it to produce theorems of the MIU-system, in a rather methodica  
l way. Here, for instance, is a possible way the genie might go about i  
t: Step 1: Apply every applicable rule to the axiom MI. This y  
ields two new theorems: MIU, Mil  
. Step 2: Apply every applicable rule to the theorems produced i  
n step 1. This yields three new theorems: MIIU, MIUIU, M

84

40

84

Step 3: Apply every applicable rule to the theorems produced i  
n step 2. This yields five new theorems: MII IIU, MIIUI  
IU, MIUIUIUIU, MII IIIIII, MUI  
. This method produces every single theorem sooner or later, because the  
rules are applied in every conceivable order. (See Fig. 11.) All of t  
he lengthening-shortening alternations which we mentioned above eventual  
ly get carried out. However, it is not clear how long to wait for a given s  
trin

84

FIGURE 11. A systematically constructed "tree" of all the theorems of the MIU-system. T  
he Nth level down contains those theorems whose derivations contain exactly N steps. The  
encircled numbers tell which rule was employed. ls MU anywhere in this tre

84

to appear on this list, since theorems are listed according to the shortness o  
f their derivations. This is not a very useful order, if you are interested in a  
specific string (such as MU), and you don't even know if it has any derivation, much less how long that derivation might b  
e. Now we state the proposed "theoremhoo  
d-test": Wait until the string in question is produced; when that h  
appens, you know it is a theorem-and if it never happens, you know t  
hat it is not a t  
heorem. This seems ridiculous, because it presupposes that we don't mind w  
aiting around literally an infinite length of time for our answer. This gets to the  
crux of the matter of what should count as a "test". Of prime importance i  
s a guarantee that we will get our answer in a finite length of time. If there i  
s a test for theoremhood, a test which does always terminate in a fi  
nit

85

41

85

amount of time, then that test is called a decision procedure for the given   
formal s

85

When you have a decision procedure, then you have a very c  
oncrete characterization of the nature of all theorems in the system. Offhand, i  
t might seem that the rules and axioms of the formal system provide no less   
complete a characterization of the theorems of the system than a d  
ecision procedure would. The tricky word here is "characterization". Certainly the   
rules of inference and the axioms of the MIU-system do c  
haracterize, implicitly, those strings that are theorems. Even more implicitly, they characterize those strings that are not theorems. But implicit characterization i  
s not enough, for many purposes. If someone claims to have a characterization of all theorems, but it takes him infinitely long to deduce that s  
ome particular string is not a theorem, you would probably tend to say t  
hat there is something lacking in that characterization-it is not quite c  
oncrete enough. And that is why discovering that a decision procedure exists is a  
very important step. What the discovery means, in effect, is that you c  
an perform a test for theoremhood of a string, and that, even if the test i  
s complicated, it is guaranteed to terminate. In principle, the test is just as easy,   
just as mechanical, just as finite, just as full of certitude, as checking   
whether the first letter of the string is M. A decision procedure is a "  
litmus test" for theorem

85

Incidentally, one requirement on formal systems is that the set o  
f axioms must be characterized by a decision procedure-there must be a   
litmus test for axiomhood. This ensures that there is no problem in g  
etting off the ground at the beginning, at least. That is the difference between t  
he set of axioms and the set of theorems: the former always has a d  
ecision procedure, but the latter may not.

85

I am sure you will agree that when you looked at the MIU-system fo  
r the first time, you had to face this problem exactly. The lone axiom was   
known, the rules of inference were simple, so the theorems had b  
een implicitly characterized-and yet it was still quite unclear what the consequences of that characterization were. In particular, it was still t  
otally unclear whether MU is, or is not, a t  
heore