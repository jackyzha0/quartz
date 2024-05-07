---
title: 3D Waterfall
tags:
  - advanced
  - graph
  - matlab
  - python
date: 2024-05-07
---

3D Waterfall - 3D 瀑布图

# Different kind of 3D waterfall for Different Applications

## 3D Waterfall for EMD

### Code


```matlab
clear all;clc;close all;

set(0, 'DefaultAxesFontSize', 16); % 设置坐标轴标签的字体大小

set(0, 'DefaultTextFontSize', 16); % 设置文本框的字体大小

% 假设你已经有了一个信号，这里我们创建一个示例信号

t = 0:0.01:10; % 时间向量

signal = cos(2*pi*t) + 0.5*cos(4*pi*t) + rand(1, length(t)) * 0.1; % 示例信号

% 使用EMD进行分解

[IMFs, residuals] = emd(signal);

% waterfall plot the IMFs

figure('Position', [0 0 1500 900]);

plot3(zeros(length(IMFs), 1), t, signal, 'LineWidth', 1.5, 'DisplayName', 'Signal');

hold on;

for i = 1:size(IMFs, 2)

plot3(ones(length(IMFs), 1) * i, t, IMFs(:, i), 'LineWidth', 1.5, 'DisplayName', ['IMF ' num2str(i)]);

hold on;

end

% plot the residuals

plot3(ones(length(IMFs), 1) * (size(IMFs, 2) + 1), t, residuals, 'LineWidth', 1.5, 'DisplayName', 'Residuals');

hold off;

xStringLables = cell(1, size(IMFs, 2) + 2);

xStringLables{1} = 'Signal';

for i = 1:size(IMFs, 2)

xStringLables{i + 1} = ['IMF ' num2str(i)];

end

xStringLables{size(IMFs, 2) + 2} = 'Residuals';

% 设置图例

legend('show');

xlabel('IMF Index');

ylabel('Time');

zlabel('Amplitude');

title('EMD Decomposition of Signal');

xticks(0:size(IMFs, 2) + 1);

xticklabels(xStringLables);

grid on;

% 保存图像

saveas(gcf, 'EMD_Decomposition.png');
```

### Result

![](data_sci/visualization/sci_graphics/attachments/EMD_Decomposition.png)