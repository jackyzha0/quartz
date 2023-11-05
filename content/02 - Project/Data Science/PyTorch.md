---
creation_date: 2023年10月21日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# PyTorch
**Resources**
- 🌐 [PyTorch Documentation](https://pytorch.org/docs/stable/index.html) 
- 🌐 https://pytorch.org/tutorials/beginner/basics/intro.html - good first step into PyTorch, quick
- 📹 [Pytorch Beginner Series](https://www.youtube.com/playlist?list=PL_lsbAsL_o2CTlGHgMxNrKhzP97BaG9ZN) by PyTorch 🟢
- 📹 [Pytorch for Deep Learning & Machine Learning](https://www.youtube.com/watch?v=V_xro1bcAuA)  🟢
- 📖 PyTorch Pocket Reference - good handbook, but using online documentation is better.

**Recommended Learning Path**
1. PyTorch for Deep Learning & Machine Learning
2. Learn PyTorch for deep learning in a day. Literally
3. Use PyTorch to implement popular neural network models by yourself!
4. Use in the real world for tasks.

**Tools for Pytorch**
- [PyTorch with Tensorboard](https://www.tensorflow.org/tensorboard/get_started)
- [MLflow](https://mlflow.org/)
- 

**Why PyTorch?** Most popular framework.
![[Pasted image 20231026094940.png]]

**PyTorch Workflow**
![[Pasted image 20231026112619.png]]
1. Get data ready (turn into tensors)
2. Build or pick a pre-trained model
	1. Pick a loss function
	2. Build a training loop
3. Fit a model to the data and make a prediction
4. Evaluate the model
5. Improve through experimentation
6. Save and reload your trained data

**Basic Training Loop**
![[Pasted image 20231026112640.png | center ]]
1. Loop through the data
	1. Set the model to correct mode
	2. Forward pass 
	3. Calculate the loss
	4. Optimizer zero grad
	5. Perform backpropagation on the loss with respect
	6. Step the optimizer (perform gradient descent)**

**When to use GPU vs CPU?**
Sometimes, depending on your data/hardware, you might find that your model trains faster on CPU than GPU. Why is this?
- It could be that the overhead for copying data/model to and from the GPU outweighs the compute benefits offered by the GPU
- The CPU has better compute capability than GPU (depending on hardware)

So it is also important to learn how to effectively use GPU.