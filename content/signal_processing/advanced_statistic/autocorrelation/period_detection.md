---
title: Period Detection by Autocorrelation
tags:
  - signal
  - signal-processing
---


$$
R_x(n,n+m) = E\{x(n)x(n+m)\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^{N}x_k(n)x_k(n+m)
$$

$m=0$ 的时候肯定是autocorrelation最大的时候，即自己与自己最为相关；
在$m \not = 0$的时候，在$m = \text{Period}$的时候，会得到第二大的值，即移动一个周期后做相关。


# Demo Code

```matlab
for i = 1:length(signal_list) - 1
    name = strsplit(matFiles(i).name, '.');
    name = name{1};
    [autocor, lag] = xcorr(signal_list{i}, 200);
    figure;
    plot(lag, autocor, 'LineWidth', 1);
    xlabel('Lag');
    ylabel('Auto-correlation');
    title(['Auto-correlation for ', name]);
    grid on;
    grid minor;

    [~, max_idx] = max(autocor);
    disp(max_idx);
    freq = 1 / (max_idx * 1 / fs);
    disp(freq)
    fprintf('Signal %s freq: %f\n', name, freq);
end
```