
Haystack is an **open-source framework** for building **search systems** that work intelligently over large document collections


### The Building Blocks of Haystack

### Nodes

* Haystack offers [nodes](https://docs.haystack.deepset.ai/docs/nodes_overview) that perform different kinds of text processing
* These are often powered by the latest transformer models.


### Transformers

The Transformer model revolutionized the field of NLP and became the foundation for many subsequent advancements, including OpenAI's GPT models. Unlike earlier NLP models that relied on recurrent neural networks (RNNs) or convolutional neural networks (CNNs), the Transformer model relies on a self-attention mechanism.

The self-attention mechanism allows the Transformer model to capture dependencies between different words in a sentence or sequence by assigning different weights to each word based on its relevance to other words in the sequence. This enables the model to effectively model long-range dependencies and improve performance on various NLP tasks such as machine translation, text summarization, and question answering.

The Transformer model consists of an encoder-decoder architecture, where the encoder processes the input sequence and the decoder generates the output sequence. Both the encoder and decoder are composed of multiple layers of self-attention mechanisms and feed-forward neural networks. The model is trained using a technique called "unsupervised learning" on large amounts of text data.

Overall, the Transformer model has significantly advanced the state of the art in NLP and has become a crucial component in many applications involving natural language understanding and generation.

NLP’s Transformer is a new architecture that aims to solve tasks sequence-to-sequence while easily handling long-distance dependencies. Computing the input and output representations without using sequence-aligned RNNs or convolutions and it relies entirely on self-attention. Lets look in detail what are transformers.

https://blog.knoldus.com/what-are-transformers-in-nlp-and-its-advantages/

```python
reader = FARMReader(model="deepset/roberta-base-squad2") result = reader.predict( query="Which country is Canberra located in?", documents=documents, top_k=10 )
#https://docs.haystack.deepset.ai/reference/reader-api
```


### Pipelines

```python
p = Pipeline()
p.add_node(component=retriever, name="Retriever", inputs=["Query"]) 
p.add_node(component=reader, name="Reader", inputs=["Retriever"])
result = p.run(query="What did Einstein work on?")

```



**Readers**, also known as Closed-Domain Question Answering systems in machine learning speak, are powerful models that closely analyze documents and perform the core task of question answering. The Readers in Haystack are trained from the latest transformer-based language models and can be significantly sped up using GPU acceleration. But it's not currently feasible to use the Reader directly on a large collection of documents.

The **Retriever** assists the Reader by acting as a lightweight filter that reduces the number of documents the Reader must process. It scans through all documents in the database, quickly identifies the relevant ones, and dismisses the irrelevant ones. It ends up with a small set of candidate documents that it passes on to the Reader.

```python
p = ExtractiveQAPipeline(reader, retriever) 
result = p.run(query="What is the capital of Australia?")
```

You can't do question answering with a Retriever only. And with just a Reader, it would be unacceptably slow. The power of this system comes from the combination of the two nodes.


### Agent


[The Agent](https://docs.haystack.deepset.ai/docs/agent) is a very versatile, prompt-based component that uses a large language model and employs reasoning to answer complex questions beyond the capabilities of extractive or generative question answering. It's particularly useful for multi-hop question answering scenarios where it must combine information from multiple sources to arrive at an answer. When the Agent receives a query, it forms a plan of action consisting of steps it has to complete. It then starts with choosing the right tool and proceeds using the output from each tool as input for the next. It uses the tools in a loop until it reaches the final answer.

```python
agent = Agent( prompt_node=prompt_node, prompt_template=few_shot_agent_template, tools=[web_qa_tool], final_answer_pattern=r"Final Answer\s*:\s*(.*)", ) 
hotpot_questions = [ "What year was the father of the Princes in the Tower born?", "Name the movie in which the daughter of Noel Harrison plays Violet Trefusis.", "Where was the actress who played the niece in the Priest film born?", "Which author is English: John Braine or Studs Terkel?", ]
```

### REST API

To deploy a search system, you need more than just a Python script. You need a service that can stay on, handle requests as they come in, and be callable by many different applications. For this, Haystack comes with a [REST API](https://docs.haystack.deepset.ai/docs/rest_api) designed to work in production environments.

# Tutorial: Build Your First Question Answering System


DocumentStore stores the Documents that the question answering system uses to find answers to your questions. In this tutorial, we’re using the `InMemoryDocumentStore`, which is the simplest DocumentStore to get started with. It requires no external dependencies and it’s a good option for smaller projects and debugging. But it doesn’t scale up so well to larger Document collections, so it’s not a good choice for production systems. To learn more about the DocumentStore and the different types of external databases that we support, see [DocumentStore](https://docs.haystack.deepset.ai/docs/document_store).

```python
from haystack.document_stores import InMemoryDocumentStore
document_store = InMemoryDocumentStore(use_bm25=True)
```

### In Haystack Which one connect to Documentstore first retriver or reader ?

In Haystack, both the retriever and the reader components can be connected to the document store, but the order in which they are connected depends on the specific pipeline configuration and use case.

The document store is responsible for storing and indexing the documents that the retriever component will search through. It acts as the initial source of information for the retrieval process.

Typically, the retriever component is connected to the document store first. The retriever performs an initial search using a given query to retrieve a set of relevant documents or passages from the document store based on their similarity or relevance to the query. The retrieved documents or passages are then passed on to the reader component for further processing.

Once the retriever component retrieves the relevant documents or passages, the reader component is connected to the retriever's output. The reader component is responsible for extracting the answer or information from the retrieved documents or passages, typically using techniques like machine reading comprehension.

Here's an example of how the retriever and reader components can be connected to the document store in a Haystack pipeline:

```python
# Connect retriever to document store
p.add_node(component=retriever, name="Retriever", inputs=["Query"], outputs=["RetrievedDocuments"])
p.add_node(component=document_store, name="DocumentStore", inputs=["Retriever"])

# Connect reader to retriever's output
p.add_node(component=reader, name="Reader", inputs=["RetrievedDocuments"])
```

In this example, the retriever component is connected to the document store, and its output is named "RetrievedDocuments". The document store serves as the input to the retriever component. The reader component is then connected to the "RetrievedDocuments" output, using the retrieved information as its input.

Please note that the actual configuration and connection of components in your Haystack pipeline may differ based on your specific requirements and implementation.


### What is BM25 ?
https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables

Download 517 articles from the Game of Thrones Wikipedia. You can find them in _data/build_your_first_question_answering_system_ as a set of _.txt_ files
```python
from haystack.utils import fetch_archive_from_http

doc_dir = "data/build_your_first_question_answering_system"

fetch_archive_from_http(
    url="https://s3.eu-central-1.amazonaws.com/deepset.ai-farm-qa/datasets/documents/wiki_gameofthrones_txt1.zip",
    output_dir=doc_dir
)
```

2. Use `TextIndexingPipeline` to convert the files you just downloaded into Haystack [Document objects](https://docs.haystack.deepset.ai/docs/documents_answers_labels#document) and write them into the DocumentStore:
```python
import os

from haystack.pipelines.standard_pipelines import TextIndexingPipeline

  

files_to_index = [doc_dir + "/" + f for f in os.listdir(doc_dir)]

indexing_pipeline = TextIndexingPipeline(document_store)

indexing_pipeline.run_batch(file_paths=files_to_index)
```

## Initializing the Retriever

Our search system will use a Retriever, so we need to initialize it. A Retriever sifts through all the Documents and returns only the ones relevant to the question. This tutorial uses the BM25 algorithm. For more Retriever options, see [Retriever](https://docs.haystack.deepset.ai/docs/retriever).

Let's initialize a BM25Retriever and make it use the InMemoryDocumentStore we initialized earlier in this tutorial:

```python
from haystack.nodes import BM25Retriever
retriever = BM25Retriever(document_store=document_store)
```

## Initializing the Reader

A Reader scans the texts it received from the Retriever and extracts the top answer candidates. Readers are based on powerful deep learning models but are much slower than Retrievers at processing the same amount of text. In this tutorial, we're using a FARMReader with a base-sized RoBERTa question answering model called [`deepset/roberta-base-squad2`](https://huggingface.co/deepset/roberta-base-squad2). It's a strong all-round model that's good as a starting point. To find the best model for your use case, see [Models](https://haystack.deepset.ai/pipeline_nodes/reader#models).

Let's initialize the Reader:
```python
from haystack.nodes import FARMReader

  

reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", use_gpu=True)
```

### Create Retriver-Reader pipeline

In this tutorial, we're using a ready-made pipeline called `ExtractiveQAPipeline`. It connects the Reader and the Retriever. The combination of the two speeds up processing because the Reader only processes the Documents that the Retriever has passed on. To learn more about pipelines, see [Pipelines](https://docs.haystack.deepset.ai/docs/pipelines).

To create the pipeline, run:

```python
from haystack.pipelines import ExtractiveQAPipeline

pipe = ExtractiveQAPipeline(reader,retriver)

prediction = pipe.run(

query="Who is the father of Arya Stark?",

params={

"Retriever": {"top_k": 10},

"Reader": {"top_k": 5}

}

)


```

