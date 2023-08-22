---
title: "Agile for Data Science"
Date: 2022-03-28
tags: 
- writing
- management
- project-management
---

My experience working with agile methodologies in Data Science projects is quite bitter. It did not work for small companies. Neither did it for the larger ones starting their journey in advanced analytics. In both environments, Data Scientists usually work on more than one project at a time (They can even be considered [floor sweepers](https://publish.obsidian.md/dr-mario/pages/%F0%9F%97%A3%EF%B8%8F+Down+with+Data+Science), but that is another story). In that situation, if a project running in agile has no fully dedicated team the whole system crumbles, but that is not specific to Data Science. 

![](writing/attachments/pelayo_workers_in_front_of_a_wall_full_of_post-it_in_an_office.png)

In this writing, I follow this great [post by Eugene Yan](https://eugeneyan.com/writing/data-science-and-agile-what-works-and-what-doesnt/) to keep the discussion going. 

Data Science is not engineering, although lots can be learned from [engineering good practices](https://logicmag.io/clouds/agile-and-the-long-crisis-of-software/). There are a few characteristics of Data Science that makes it quite difficult to run under agile:
- Not well-defined problems: Usually Product Owners, Product Managers (PMs) come with ill-defined problems. Similar objectives can be achieved with different data and very different techniques.  It might be something really specific like I need to query this data, but the ultimate objective of that query is something quite different, and it is not clear even in PMs' brains. It is usually not even clear what data to use as a similar concept can be approached from different data perspectives. Retrieving the data and running an adequacy assessment might be time-consuming and also an iterative process. In these preliminary steps, you have to reach a problem definition. 
- The science: unknown paths to be taken, difficulty to estimate the time to be spent in the different steps from one project vs another. Only a few times does the data speak by itself and you do not need to really deep dive into the details. Usually, you need time to grasp the quality and fit of the data to solve the question. The question, goal, and paths taken usually evolve as the analysis is running, so you need to change the scope. Although you have a well-defined DS workflow and process, the amount of effort at each step may vary between projects. 
- Research question: Related to the science it is the idea that Agile ceremonies push you to make a bet and put your efforts to solve a goal. Agile is supposed to be a methodology that allows you to pivot from one particular topic to other, so you should be able to move forward easily. The truth is that maybe the data indicates that the current goal is unfeasible and pushes you to a very different scenario. In my experience Agile lacks of general perspective and as Fabien Girardin says in this tweet, it does not help you asking if you are asking the wrong question. 

{{< tweet user="fabiengirardin" id="1526806791157317632" >}}

- Deliverables: Data Science is not engineering. For a PM it may be natural to think that if they can ask a software engineer for a new feature, she can do the same to a Data Scientist. Sometimes DS deliverables are difficult to be defined in advance during sprint planning. A successful DS deliverable might be an analysis or discovery that works as input for the next step in the DS workflow. It is quite likely that this output does not fit the definition of something usable for the end-user and that may be reported upwards. Sometimes a DS deliverable might be something as discouraging as data quality issues. 
- It hurdles DS innovation. Data Science has a really large potential of transforming companies. DS can optimize the company's performance by tweaking processes. These sorts of tasks are important but lead to incremental improvements, not exponential changes. Innovation may happen when  DS follows data trails without a clear purpose. 

What I like about agile
- Clear priorities with deliverables: A desirable skill of Data Scientists is curiosity. However, DS should know when to tame their curiosity and when they have to chase it even if it leads them to rabbit holes.  Sprint planning and execution create an environment that ensures the DS is focused on delivering specific outcomes. 
- Short deadlines: A short deadline keeps your feet on the ground and pushes you to use the most simple techniques. Moreover, having a time budget helps you define feasible solutions. 
- Deliverables focused on the ultimate objective. Reminds me of a problem-solving technique of the  [climber's technique](https://giorgionardone.com/en/strategic-logic-and-problem-solving/). This technique allows you to untangle a complex problem and set micro objectives that you can go solving. 

Managing Data Science projects is difficult because of the complicated nature of data challenges, the innate curiosity of Data Scientists, and the usual lack of a mature data culture in the company. Experiment and be flexible and try to accommodate the method to the project and the people involved. Don't fall in love with a methodology, tweak it to make it work for you. 

Andrew Ng take on the differences between ML systems and software systems in its newsletter The batch:
"We don’t know how accurate the system will be in advance. 
We might need a costly initial data collection phase.
After getting the initial dataset, we might come back and ask for more data or better data. Moreover, we might ask for this over and over. 
After we’ve built a prototype that runs accurately in the lab, it might not run as well in production because of data drift or concept drift. 
Even after we’ve built an accurate production system, its performance might get worse over time for no obvious reason. We might need help monitoring the system and, if its performance degrades over time, invest further to fix it. 
A system might exhibit biases that are hard to detect.
It might be hard to figure out why the system gave a particular output. We didn’t explicitly program it to do that! ""
