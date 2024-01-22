#lcd #lxd #nvidia

The ML application likely requires access to a GPU to run the model on.

Assuming you have a single NVidia GPU, you would create a container with the NVidia runtime, and add at least the `compute` and `utility` capability. The first is for _CUDA_, the second is to have the `nvidia-smi` utility to verify that the GPU is responding. Then, you add a LXD device for the GPU in order to expose the GPU to the container.

`$ lxc launch ubuntu:18.04 machine-learning -c nvidia.runtime=true -c nvidia.driver.capabilities=compute,utility Creating machine-learning Starting machine-learning $ lxc config device add machine-learning mygpu gpu Device mygpu added to machine-learning $` 

Finally, get a shell into the container and run `nvidia-smi` to verify that the GPU is accessible from within the container.

By doing all the above, your container will have the proper NVIDIA driver and the proper NVIDIA runtime. If you follow some ML tutorial, you then continue with the rest of their instructions to setup your system. That is, do not follow other instructions on setting up the NVIDIA driver or runtime.