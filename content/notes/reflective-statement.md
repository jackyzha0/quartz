---
aliases: 
geometry:
- left=10mm
- top=10mm
- right=10mm
- bottom=10mm
tags: 
- cosc202
---
### COSC202 Reflective Statement - Jet Hughes 9474308
#### Intro
I was honestly not expecting this paper to be as interesting as it was. The lecture were informative and interesting, and the semester-long project was a joy to work on. My team for this project was great. The member were Myself, Brad, Will, Arlo, and Riley. We communicated using Discord and used Trello for project management. We encountered a few small issues, but nothing catastrophic, and I had some clear favorite parts of the project.

#### Communication
The first thing we had to decide as a team was how to communicate. We agreed to use Discord. I created channels for general discussion, notes and resources, and bug discussion. The bugs channel was rarely used, but the other channel, general, was very lively, and the notes and resources channel was very useful. The notes and resources channel had quick links to the lab book, and other resources. It also had a snapshot of the project tasks and the deadline. One additional thing I added to the server that was immensely useful was the git-updates channel. I set up a gitlab-discord integration which send a message to discord every time a push was made to the repo. This integration was very useful because it made it very easy to keep up with the state of ANDIE. If I were to repeat this project, I would definitely do this again.

#### Project/Time Management
The first thing we did once communication had been established was to delegate tasks to team members. We each selected a task that we were interested in, and the rest of the tasks were to be assigned at a later date. I think this method worked very well, as each of us was able to do something we thought would be enjoyable, and the workload was very evenly distributed. We quickly realized we would need to use a project management tool. One of the group members suggested Trello, which uses a Kanban board. Since many of us had used it before, we agreed this was a good choice.  I set up a simple Trello board with 3 lists: To-do, doing, and done. Later I added, a list for ongoing tasks like commenting and unit testing, and a list for extra features we wanted to add. We were then able to easily assign team members to tasks, and track their progress with checklists. 

#### Main Issues
One main issue was that more menial tasks like commenting and creating unit tests were left unattended to. Hiding them away in the "Ongoing" task list was not helpful. I think a better way of doing this would have been to add commenting and unit testing to a checklist within each task. I think we should have used checklists within tasks much more in general. My final issues were the (almost) lack of a proper extra feature. Throughout the first half of the second part of the project, almost all of our team was sick. We were able to do the Posterise, negative, and extended filters, relatively quickly. But the Area Select feature created a bottleneck, blocking the drawing and crop features. Luckily, we were able to finish the rest of the features. However, we did not have an extra feature ready. Fortunately, Arlo was able to create the pen drawing feature quickly. Looking back, we should have re-delegated the tasks as soon as we knew the assigned team member was sick. This would have enabled us to avoid the bottleneck and progress faster. I also think we could have found other things to work on while waiting for Area Select [^3].

#### Highlights
My first and top highlight was the Posterise Filter. I decided to implement this using the K-Means algorithm. I was interested to see how a k-means could be done in Java. I was able to create a first version relatively using [this](https://stackabuse.com/guide-to-k-means-clustering-with-java/) article as a guide[^1]. I had some trouble long the way, so when I got it somewhat working I had a little-jump-around-the-room celebration. On the final day of the assignment, I realized that the centroids were not actually changing and that it was essentially using random colors. Thankfully, I was able to fix the issue of the centroids not updating. However, I am still not sure if it works as intended. In retrospect, I should have done better testing for this feature. When I saw a picture split into colors, I blindly assumed that it worked, without actually checking that it was working. If I were able to go back, I would first look at the results of other implementations first, and add more testing.

Another highlight was creating my own convolve operation class[^2]. I made this to solve the problem of negative and extended filters. I think there probably was an easier way of doing this, but I thought this method would also clean up a lot of the repeated code in the filter actions. The creation of this class went a bit smoother than the Posterise filter. I had [this](http://ramok.tech/2018/09/27/convolution-in-java/) article to use as a guide. I was able to significantly simplify their code to suit my need. However, it ran *very* slowly compared to the in-built java ConvoleOp class. I briefly considered changing it to run on the GPU using a library, but thankfully, Riley was able to speed it up by changing the RBG get and set operations.

#### Conclusion
Overall I think our project was very successful. This was reflected in our mark for part one and (hopefully) part two, and by the fact that the workload was evenly distributed across the team. The main issues were the delays of commenting, the lack of thorough testing. We had a small crunch in the final hours of the project, when we had issues with saving and exporting, but thankfully we were able to get it done.  

[^1]: I just realized I forgot to reference this in the Javadoc.
[^2]: I still don't know what to call this.
[^3]: This would have been adding comments and testing.