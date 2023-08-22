---
author: [[Luis Serrano]]
title: "What Are Word and Sentence Embeddings?"
tags: 
- articles
- literature-note
---
# What Are Word and Sentence Embeddings?

![rw-book-cover](https://txt.cohere.ai/content/images/2023/01/1.png)

## Metadata
- Author: [[Luis Serrano]]
- Full Title: What Are Word and Sentence Embeddings?
- Category: #articles
- URL: https://txt.cohere.ai/sentence-word-embeddings/?utm_source=twitter&utm_medium=paidsocial&utm_campaign=contentpromotion_retargeting_site&twclid=21m5p3ikfn1n6k1x1nhi1ul8ty

## Highlights
- An assignment of words to numbers is called a *word embedding*. We can think of a word embedding as an assignment of *scores* to the words, with some nice properties ( ([View Highlight](https://read.readwise.io/read/01gqqw5kjbt63d24h22x9z9shr))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77n8peqnna90dhxa0yr4))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77pg83nqv249n4geqfsx))
- And what are the numbers we are assigning to each word? Simply the horizontal and vertical coordinates of the location of the word ([View Highlight](https://read.readwise.io/read/01gqqw7306pcef7dadk7jwa10v))
- properties that a nice word embedding should have:
  1. Words that are similar should correspond to points that are close by (or equivalently, to scores that are similar).
  2. Words that are different should correspond to points that are far away (or equivalently, to scores that are significantly different). ([View Highlight](https://read.readwise.io/read/01gqqw7p89nvv67b5nsv09ttz7))
- There is something more to these word embeddings, and it is that they don’t only capture word similarity, but they also capture other properties of the language. In language, words can be combined to get more complicated concepts. In mathematics, numbers can be added or subtracted to get other numbers. Could we build a word embedding that captures relations between words, as relations between numbers? ([View Highlight](https://read.readwise.io/read/01gqqw8b9k95jxtv87nhs89219))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9xnp6wam8m6fe3pewgr))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9ye9va8mc185vxyh44b))
- The analogy “A puppy is to a dog like a calf is to a cow” can be translated into “The path from the word puppy to the word dog is the same as the path from the word calf to the word cow”. The analogy “A dog is to a cow like a puppy is to a calf” is also captured in this rectangle ([View Highlight](https://read.readwise.io/read/01gqqwj85kpr6s0maystb7j6tg))
- The main property of word embeddings that is in effect here is that the two axes (vertical and horizontal) represent different things. If you look carefully, moving towards the right turns the puppy into a dog, and the calf into a cow, which is an increase in *age*. Likewise, moving upwards turns a puppy into a calf and a dog into a cow, which is an increase in the *size* of the animal. It seems that this embedding is understanding that the words in it have two main properties, or features: age and size. Furthermore, it seems that the embedding is locating age in the horizontal axis and size in the vertical axis. ([View Highlight](https://read.readwise.io/read/01gqqwqne86n0epfjcz2srzky4))
- good word embedding would be able to capture not only age and size, but also many more features of the words. Since each feature is one new axis, or coordinate, then a good embedding must have many more than two coordinates assigned to every word. The cohere embedding, for example, has 4096 coordinates associated with each word. ([View Highlight](https://read.readwise.io/read/01gqqwrbbk8mfpbqsxmtyhghtb))
- . A sentence embedding is just like a word embedding, except it associates every sentence with a vector full of numbers, in a coherent way. By coherent, I mean that it satisfies similar properties as a word embedding. For instance, similar sentences are assigned to similar vectors, different sentences are assigned to different vectors, and most importantly, each of the coordinates of the vector identifies some (whether clear or obscure) property of the sentence. ([View Highlight](https://read.readwise.io/read/01gqqwvja8bdxv1crf6p8wtz09))
---
author: [[Luis Serrano]]
title: "What Are Word and Sentence Embeddings?"
tags: 
- articles
- literature-note
---
# What Are Word and Sentence Embeddings?

![rw-book-cover](https://txt.cohere.ai/content/images/2023/01/1.png)

## Metadata
- Author: [[Luis Serrano]]
- Full Title: What Are Word and Sentence Embeddings?
- Category: #articles
- URL: https://txt.cohere.ai/sentence-word-embeddings/?utm_source=twitter&utm_medium=paidsocial&utm_campaign=contentpromotion_retargeting_site&twclid=21m5p3ikfn1n6k1x1nhi1ul8ty

## Highlights
- An assignment of words to numbers is called a *word embedding*. We can think of a word embedding as an assignment of *scores* to the words, with some nice properties ( ([View Highlight](https://read.readwise.io/read/01gqqw5kjbt63d24h22x9z9shr))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77n8peqnna90dhxa0yr4))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77pg83nqv249n4geqfsx))
- And what are the numbers we are assigning to each word? Simply the horizontal and vertical coordinates of the location of the word ([View Highlight](https://read.readwise.io/read/01gqqw7306pcef7dadk7jwa10v))
- properties that a nice word embedding should have:
  1. Words that are similar should correspond to points that are close by (or equivalently, to scores that are similar).
  2. Words that are different should correspond to points that are far away (or equivalently, to scores that are significantly different). ([View Highlight](https://read.readwise.io/read/01gqqw7p89nvv67b5nsv09ttz7))
- There is something more to these word embeddings, and it is that they don’t only capture word similarity, but they also capture other properties of the language. In language, words can be combined to get more complicated concepts. In mathematics, numbers can be added or subtracted to get other numbers. Could we build a word embedding that captures relations between words, as relations between numbers? ([View Highlight](https://read.readwise.io/read/01gqqw8b9k95jxtv87nhs89219))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9xnp6wam8m6fe3pewgr))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9ye9va8mc185vxyh44b))
- The analogy “A puppy is to a dog like a calf is to a cow” can be translated into “The path from the word puppy to the word dog is the same as the path from the word calf to the word cow”. The analogy “A dog is to a cow like a puppy is to a calf” is also captured in this rectangle ([View Highlight](https://read.readwise.io/read/01gqqwj85kpr6s0maystb7j6tg))
- The main property of word embeddings that is in effect here is that the two axes (vertical and horizontal) represent different things. If you look carefully, moving towards the right turns the puppy into a dog, and the calf into a cow, which is an increase in *age*. Likewise, moving upwards turns a puppy into a calf and a dog into a cow, which is an increase in the *size* of the animal. It seems that this embedding is understanding that the words in it have two main properties, or features: age and size. Furthermore, it seems that the embedding is locating age in the horizontal axis and size in the vertical axis. ([View Highlight](https://read.readwise.io/read/01gqqwqne86n0epfjcz2srzky4))
- good word embedding would be able to capture not only age and size, but also many more features of the words. Since each feature is one new axis, or coordinate, then a good embedding must have many more than two coordinates assigned to every word. The cohere embedding, for example, has 4096 coordinates associated with each word. ([View Highlight](https://read.readwise.io/read/01gqqwrbbk8mfpbqsxmtyhghtb))
- . A sentence embedding is just like a word embedding, except it associates every sentence with a vector full of numbers, in a coherent way. By coherent, I mean that it satisfies similar properties as a word embedding. For instance, similar sentences are assigned to similar vectors, different sentences are assigned to different vectors, and most importantly, each of the coordinates of the vector identifies some (whether clear or obscure) property of the sentence. ([View Highlight](https://read.readwise.io/read/01gqqwvja8bdxv1crf6p8wtz09))
---
author: [[Luis Serrano]]
title: "What Are Word and Sentence Embeddings?"
tags: 
- articles
- literature-note
---
# What Are Word and Sentence Embeddings?

![rw-book-cover](https://txt.cohere.ai/content/images/2023/01/1.png)

## Metadata
- Author: [[Luis Serrano]]
- Full Title: What Are Word and Sentence Embeddings?
- Category: #articles
- URL: https://txt.cohere.ai/sentence-word-embeddings/?utm_source=twitter&utm_medium=paidsocial&utm_campaign=contentpromotion_retargeting_site&twclid=21m5p3ikfn1n6k1x1nhi1ul8ty

## Highlights
- An assignment of words to numbers is called a *word embedding*. We can think of a word embedding as an assignment of *scores* to the words, with some nice properties ( ([View Highlight](https://read.readwise.io/read/01gqqw5kjbt63d24h22x9z9shr))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77n8peqnna90dhxa0yr4))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77pg83nqv249n4geqfsx))
- And what are the numbers we are assigning to each word? Simply the horizontal and vertical coordinates of the location of the word ([View Highlight](https://read.readwise.io/read/01gqqw7306pcef7dadk7jwa10v))
- properties that a nice word embedding should have:
  1. Words that are similar should correspond to points that are close by (or equivalently, to scores that are similar).
  2. Words that are different should correspond to points that are far away (or equivalently, to scores that are significantly different). ([View Highlight](https://read.readwise.io/read/01gqqw7p89nvv67b5nsv09ttz7))
- There is something more to these word embeddings, and it is that they don’t only capture word similarity, but they also capture other properties of the language. In language, words can be combined to get more complicated concepts. In mathematics, numbers can be added or subtracted to get other numbers. Could we build a word embedding that captures relations between words, as relations between numbers? ([View Highlight](https://read.readwise.io/read/01gqqw8b9k95jxtv87nhs89219))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9xnp6wam8m6fe3pewgr))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9ye9va8mc185vxyh44b))
- The analogy “A puppy is to a dog like a calf is to a cow” can be translated into “The path from the word puppy to the word dog is the same as the path from the word calf to the word cow”. The analogy “A dog is to a cow like a puppy is to a calf” is also captured in this rectangle ([View Highlight](https://read.readwise.io/read/01gqqwj85kpr6s0maystb7j6tg))
- The main property of word embeddings that is in effect here is that the two axes (vertical and horizontal) represent different things. If you look carefully, moving towards the right turns the puppy into a dog, and the calf into a cow, which is an increase in *age*. Likewise, moving upwards turns a puppy into a calf and a dog into a cow, which is an increase in the *size* of the animal. It seems that this embedding is understanding that the words in it have two main properties, or features: age and size. Furthermore, it seems that the embedding is locating age in the horizontal axis and size in the vertical axis. ([View Highlight](https://read.readwise.io/read/01gqqwqne86n0epfjcz2srzky4))
- good word embedding would be able to capture not only age and size, but also many more features of the words. Since each feature is one new axis, or coordinate, then a good embedding must have many more than two coordinates assigned to every word. The cohere embedding, for example, has 4096 coordinates associated with each word. ([View Highlight](https://read.readwise.io/read/01gqqwrbbk8mfpbqsxmtyhghtb))
- . A sentence embedding is just like a word embedding, except it associates every sentence with a vector full of numbers, in a coherent way. By coherent, I mean that it satisfies similar properties as a word embedding. For instance, similar sentences are assigned to similar vectors, different sentences are assigned to different vectors, and most importantly, each of the coordinates of the vector identifies some (whether clear or obscure) property of the sentence. ([View Highlight](https://read.readwise.io/read/01gqqwvja8bdxv1crf6p8wtz09))
---
author: [[Luis Serrano]]
title: "What Are Word and Sentence Embeddings?"
tags: 
- articles
- literature-note
---
# What Are Word and Sentence Embeddings?

![rw-book-cover](https://txt.cohere.ai/content/images/2023/01/1.png)

## Metadata
- Author: [[Luis Serrano]]
- Full Title: What Are Word and Sentence Embeddings?
- Category: #articles
- URL: https://txt.cohere.ai/sentence-word-embeddings/?utm_source=twitter&utm_medium=paidsocial&utm_campaign=contentpromotion_retargeting_site&twclid=21m5p3ikfn1n6k1x1nhi1ul8ty

## Highlights
- An assignment of words to numbers is called a *word embedding*. We can think of a word embedding as an assignment of *scores* to the words, with some nice properties ( ([View Highlight](https://read.readwise.io/read/01gqqw5kjbt63d24h22x9z9shr))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77n8peqnna90dhxa0yr4))
- ![](https://txt.cohere.ai/content/images/2023/01/Vis-1.1-1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqw77pg83nqv249n4geqfsx))
- And what are the numbers we are assigning to each word? Simply the horizontal and vertical coordinates of the location of the word ([View Highlight](https://read.readwise.io/read/01gqqw7306pcef7dadk7jwa10v))
- properties that a nice word embedding should have:
  1. Words that are similar should correspond to points that are close by (or equivalently, to scores that are similar).
  2. Words that are different should correspond to points that are far away (or equivalently, to scores that are significantly different). ([View Highlight](https://read.readwise.io/read/01gqqw7p89nvv67b5nsv09ttz7))
- There is something more to these word embeddings, and it is that they don’t only capture word similarity, but they also capture other properties of the language. In language, words can be combined to get more complicated concepts. In mathematics, numbers can be added or subtracted to get other numbers. Could we build a word embedding that captures relations between words, as relations between numbers? ([View Highlight](https://read.readwise.io/read/01gqqw8b9k95jxtv87nhs89219))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9xnp6wam8m6fe3pewgr))
- ![](https://txt.cohere.ai/content/images/size/w2400/2023/01/Vis-2.1.jpg) ([View Highlight](https://read.readwise.io/read/01gqqwj9ye9va8mc185vxyh44b))
- The analogy “A puppy is to a dog like a calf is to a cow” can be translated into “The path from the word puppy to the word dog is the same as the path from the word calf to the word cow”. The analogy “A dog is to a cow like a puppy is to a calf” is also captured in this rectangle ([View Highlight](https://read.readwise.io/read/01gqqwj85kpr6s0maystb7j6tg))
- The main property of word embeddings that is in effect here is that the two axes (vertical and horizontal) represent different things. If you look carefully, moving towards the right turns the puppy into a dog, and the calf into a cow, which is an increase in *age*. Likewise, moving upwards turns a puppy into a calf and a dog into a cow, which is an increase in the *size* of the animal. It seems that this embedding is understanding that the words in it have two main properties, or features: age and size. Furthermore, it seems that the embedding is locating age in the horizontal axis and size in the vertical axis. ([View Highlight](https://read.readwise.io/read/01gqqwqne86n0epfjcz2srzky4))
- good word embedding would be able to capture not only age and size, but also many more features of the words. Since each feature is one new axis, or coordinate, then a good embedding must have many more than two coordinates assigned to every word. The cohere embedding, for example, has 4096 coordinates associated with each word. ([View Highlight](https://read.readwise.io/read/01gqqwrbbk8mfpbqsxmtyhghtb))
- . A sentence embedding is just like a word embedding, except it associates every sentence with a vector full of numbers, in a coherent way. By coherent, I mean that it satisfies similar properties as a word embedding. For instance, similar sentences are assigned to similar vectors, different sentences are assigned to different vectors, and most importantly, each of the coordinates of the vector identifies some (whether clear or obscure) property of the sentence. ([View Highlight](https://read.readwise.io/read/01gqqwvja8bdxv1crf6p8wtz09))
