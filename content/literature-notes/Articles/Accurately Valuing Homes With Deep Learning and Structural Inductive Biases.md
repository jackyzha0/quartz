---
author: [[Stu (Michael) Stewart]]
title: "Accurately Valuing Homes With Deep Learning and Structural Inductive Biases"
tags: 
- articles
- literature-note
Document Tags: [[favorite]]
---
# Accurately Valuing Homes With Deep Learning and Structural Inductive Biases

![rw-book-cover](https://miro.medium.com/v2/resize:fit:1200/1*G4oSJEEk7Y0xeG5Tkk283w.png)

## Metadata
- Author: [[Stu (Michael) Stewart]]
- Full Title: Accurately Valuing Homes With Deep Learning and Structural Inductive Biases
- Category: #articles
- Document Tags: [[favorite]] 
- URL: https://medium.com/opendoor-labs/accurately-valuing-homes-with-deep-learning-and-structural-inductive-biases-18232ede1efd

## Highlights
- utomated valuation model, is the name given to a Machine Learning model that estimates the value of a property, usually by comparing that property to similar nearby properties that have recently sold (comparables or comps). Comps are key: an AVM evaluates a property relative to its comps, assimilating those data into a single number quantifying the property’s value. ([View Highlight](https://read.readwise.io/read/01gwh2we0jekv6cp9r3wztcp6j))
- Many companies have an “AI strategy,” but at Opendoor (scare quotes) “AI” *is the business*. We don’t buy or sell a single home without consulting OVM — for a valuation, for information regarding comparable properties, or for both. ([View Highlight](https://read.readwise.io/read/01gwh2x6shqgtr90rdsd5gkzpv))
- OVM (handcrafted model pipeline)
  1. Select comps
  2. Score said comps based on their “closeness” to the subject property
  3. “Weight” each comp relative to the others
  4. “Adjust” the (observed) prices of each comp
  5. Estimate “uncertainty” via *multiple* additional models ([View Highlight](https://read.readwise.io/read/01gwh32xcfa8nh0j9186ksh4w8))
- ![](https://miro.medium.com/v2/resize:fit:700/1*glK4GZJRE08NzUdXyFdbFA.png) ([View Highlight](https://read.readwise.io/read/01gwh30xfgmabhf8qd4fp3rnzs))
- or our purposes, the ability to define an end-to-end system, in which gradients flow freely through all aspects of the valuation process, is key: for instance, attempting to assign weights to comps without *also* considering the requisite adjustments (a shortcoming of the prior algorithm) leaves useful information on the table. This shortcoming was top-of-mind as we built out our current framework. ([View Highlight](https://read.readwise.io/read/01gwh342dbr0p6w890x2r49x7x))
- OVM (deep learning)
  1. Select comps
  2. Give *everything* to a neural net and hope it works!
  ![](https://miro.medium.com/v2/resize:fit:700/1*Lb5sZzHbYx2Cy26ZHu_yZA.png) ([View Highlight](https://read.readwise.io/read/01gwh35cg79t80vqghv6q43vps))
- In residential real estate, we know the causal mechanism by which homes are valued, a powerful backstop typically unavailable in computer vision or Natural Language Processing (NLP) applications. That is, a home is priced by a human real estate agent who consults comps (those same comps again) and defines/adjusts the listing’s price based on:
  • the recency of the comps (which factors in home price fluctuations)
  • how fancy/new/desirable the comps are relative to the subject property ([View Highlight](https://read.readwise.io/read/01gwh38jfwm18qphf21nvgrjfy))
- Comp prices are *more than correlative*: a nearby comp selling for more than its intrinsic value *literally causes one’s home to be worth more*, as no shopper will be able to perfectly parse the underlying “intrinsic value” from the “noise (error)” of previous home sales. This overvaluation *propagates causally into the future prices of other nearby homes.* ([View Highlight](https://read.readwise.io/read/01gwh399gqb68ghhz866q0r4s4))
- Deep learning, through categorical feature embeddings, unlocks an extremely powerful treatment of high-cardinality categorical variables that is ill-approximated by ML stalwarts like linear models and Gradient Boosted Trees. ([View Highlight](https://read.readwise.io/read/01gwh3jwfdregdp9c4fzsbrppg))
- Real estate has surprising similarities to NLP: high-cardinality features such as postal code, census block, school district, etc. are nearly as central to home valuations as words are to language. By providing access to best-in-class handling of categorical features, a deep learning based solution immediately resolved a primary flaw of our system. Better yet, we didn’t need to lift a finger, as embedding layers are a provided building-block in all modern deep learning frameworks. ([View Highlight](https://read.readwise.io/read/01gwh3kdct4a5x3pzvgp4b3cxp))
- The final unresolved defect of our prior algorithm was its inability to jointly optimize parameters across sub-model boundaries. For instance, the model that assigned comp weights did not “talk” to the model that predicted the dollar-value of the comp-adjustment that would bring said comp to parity with the subject listing. ([View Highlight](https://read.readwise.io/read/01gwh3ktsgew81kcy1xpkg2k8n))
- PyTorch, cleanly resolves this fault, as well. We can define sub-modules of our network to tackle the adjustment and weighting schemes for each comp, and autograd will handle backward-pass gradient propagation within and between the sub-modules of the net. ([View Highlight](https://read.readwise.io/read/01gwh3mj8d92ttjtq4t9tdbtf7))
- There are several approaches to model this process (while enabling joint-optimization). We’ve had success with many model paradigms presently popular in **NLP** and/or **image retrieval / visual search**. ([View Highlight](https://read.readwise.io/read/01gwh3n4g1fb1437td6v3phvcc))
- • Transformer-style network architectures that accept a variable-length sequence of feature vectors (perhaps words or houses) and emit a sequence or single number quantifying an output
  • [Siamese Networks](https://en.wikipedia.org/wiki/Siamese_neural_network) that compare, for example, images or home listings and produce a number/vector quantifying the similarity between any two of them
  • [Triplet loss](https://en.wikipedia.org/wiki/Triplet_loss) frameworks for similarity detection (and, more recently, contrastive-loss approaches spiritually similar to triplet loss)
  • Embedding lookup schemes such as [Locality Sensitive Hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) that efficiently search a vector-space for similar entities to a query-vector of interest ([View Highlight](https://read.readwise.io/read/01gwh3nt0gqmcnh7wn8cj21ee7))
- The process of valuing a home is similar to NLP for one key reason: a home “lives” in a neighborhood just as a word “lives” in a sentence. Using the local context to understand a word works well; it is intuitive that a comparable method could succeed in real estate. ([View Highlight](https://read.readwise.io/read/01gwh3p5rbtyb5smdveewaf1cv))
- Image retrieval hinges on querying a massive database for images similar to the query image — a process quite aligned with the comparable-listing selection process.
  Which model works best will depend on the specifics of the issue one is trying to solve. Building a world-class AVM involves geographical nuance as well: an ensemble of models stratified by region and/or urban/suburban/exurban localization may leverage many or all of the above methodologies. ([View Highlight](https://read.readwise.io/read/01gwh3psv2f1emjs98ty7b954w))
- With our network(s) we must be able to answer two key questions:
  1. How much more (or less) expensive is some comp listing than the listing of interest?
  2. How much weight (if any) should be assigned to said comp, relative to the other comps? ([View Highlight](https://read.readwise.io/read/01gwh3q3m7p0kvdkdcyckkv7jv))
- The module might take in tabular data (about the listing’s features), photos, satellite imagery, text, etc. It may also use contextual information, including information about the other comps available for the given listing of interest — a transformer’s *self-attention* aligns well with this notion of contextual info. ([View Highlight](https://read.readwise.io/read/01gwh3r0bdxrqaxcyferde4bgh))
- • An estimate of the relative price difference between a given (subject, comp) listing pair
  • A “logit” (un-normalized weight) characterizing the relative strength of a comp ([View Highlight](https://read.readwise.io/read/01gwh3va19n5adpknrgvdwh1pd))
- Because the comp weights should sum to one, a normalization scheme (perhaps softmax, sparsemax, or a learned reduction-function) is employed after the weights are computed. Recall that the comparable properties have already recently sold (never mind active listings for now), so their close prices are known. That close price, augmented by the price delta computed in (1), is itself a powerful predictor of the close price of the subject listing. ([View Highlight](https://read.readwise.io/read/01gwh3w4d107pzbgewsc9z2w2f))
- These transformer-based techniques from NLP work well because each comp can be viewed as a draw from a relatively homogeneous bag of possible comparable properties. In this capacity, comps are quite similar to words in the context of a language model: atomic units that together form a “sentence” that describes the subject listing and speculates regarding its worth.
  Though, deciding which words (comps) to place in that sentence is a tricky problem in its own right. ([View Highlight](https://read.readwise.io/read/01gwh3wz26vf6y408829bphdb8))
- Once the aforementioned quantities are in hand, the valuation process reduces immediately to a standard regression problem:
  1. The observed comp close prices are adjusted via the values proposed by our network
  2. These adjusted close prices are reduced, via a weighted-average-like procedure, to a point estimate of the subject’s close price
  3. Your favorite regression loss can then be employed, as usual, to train the model and learn the parameters of the network ([View Highlight](https://read.readwise.io/read/01gwh3xjpd2ydtmaqgerng8610))
- We saw a step function improvement in accuracy after implementing these ideas; the bulk of the improvement can be attributed to (1) end-to-end learning and (2) efficient embeddings of high-cardinality categorical features. ([View Highlight](https://read.readwise.io/read/01gwh3yn46qszq8ade0vq58v8r))
- Humans interact (and fall in love) with homes through photos. It seems natural, then, that a deep learning model would leverage these images when comparing homes to one another during the appraisal process. After all, one of the great success stories of deep learning is the field of computer vision. Transitioning OVM to deep learning has the added benefit of making it much easier to incorporate mixed-media data, such as images and text (from listings, tax documents, etc.) into our core algorithm. ([View Highlight](https://read.readwise.io/read/01gwh3zjhqtsezcn11rskfmhs0))
