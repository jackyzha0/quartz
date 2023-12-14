---
title: Mermaid Graphs
updated: 2023-12-14
compartir: true
---


Mermaid JS is a JavaScript based diagramming and charting tool that renders Markdown-inspired text definitions to create and modify diagrams dynamically. Mermaid lets you create diagrams and visualizations using text and code.

Check out the [Documentation](https://mermaid.js.org/intro/).

## Graph Examples

### Git Graph

https://mermaid.js.org/syntax/gitgraph.html  

```
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

```mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

### Mindmap

https://mermaid.js.org/syntax/mindmap.html  

```
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

### Gantt

```mermaid
gantt
    title GL Approaches Lighting Retrofit
    dateFormat YYYY-MM-DD
    excludes weekends
        Construction Phase :2024-01-08, 2024-02-15
        West Bank :2024-01-08, 2024-01-09
        Westgate :2024-01-10, 2024-01-12
        Raymond Ave :2024-01-12, 1d
        Fairview Ave: 2024-01-15, 2024-01-16
        Wheeler St Ped Cross :2024-01-17,1d
        Snelling Ave :2024-01-18,2024-01-22
        Hamline Ave :2024-01-23,2024-01-25
        Lexington Pkwy :2024-01-26,2024-01-30
        Victoria St :2024-01-31,2024-02-02
        Dale St :2024-02-05,2024-02-07
        Western Ave :2024-02-08,2024-02-12
        Capitol / Rice St :2024-02-13,1d
        Robert St :2024-02-14,1d
```
