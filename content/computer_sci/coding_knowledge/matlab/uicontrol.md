---
title: Plot UI component in MATLAB
tags:
  - matlab
  - coding-language
date: 2024-03-20
---
# Demo

```matlab
clear all;close all;clc;

file_path = './signal/signal.xlsx';
signal = readtable(file_path);

mc_signal = load('./signal/mc_signal.txt');
mc_signal = mc_signal';

label = signal.Properties.VariableNames;

t = signal.t;

signal_cell = cell(length(label) - 1,1);

figure;

for i = 1:length(label) - 1
    signal_cell{i} = plot(t, signal.(label{i+1}), 'LineWidth', 1.5, 'DisplayName', label{i+1});
    hold on;
end

hold off;

xlabel('Time (s)');
ylabel('Amplitude');
title('Signal');
legend('show');

grid on;
grid minor;

prompt = cell(length(label), 1);

for i = 1:length(label) - 1
    prompt{i} = ['Show ', label{i+1}];
end

prompt{end} = 'Show All';

show_popupmenu = uicontrol('Style', 'popupmenu', 'String', prompt, 'Position', [20, 20, 100, 25], 'Callback', @(src, event) update_plot_show(src, event, signal_cell));

for i = 1:length(signal_cell)
    prompt{i} = ['Hide ', label{i+1}];
end

prompt{end} = 'Hide All';

hide_popupmenu = uicontrol('Style', 'popupmenu', 'String', prompt, 'Position', [140, 20, 100, 25], 'Callback', @(src, event) update_plot_hide(src, event, signal_cell));

delete_noise_button = uicontrol('Style', 'pushbutton', 'String', 'Delete Noise', 'Position', [20, 220, 100, 50], 'Callback', @(src, event) delete_noise(src, event, signal_cell, mc_signal));

function update_plot_show(src, ~, signal_cell)

    selectedCurve = get(src, 'Value');

    if selectedCurve == length(signal_cell) + 1
        for i = 1:length(signal_cell)
            set(signal_cell{i}, 'Visible', 'on');
        end
        return;
    end

    for i = 1:length(signal_cell)
        if selectedCurve == i
            set(signal_cell{i}, 'Visible', 'on');
        end
    end

end

function update_plot_hide(src, ~, signal_cell)

    selectedCurve = get(src, 'Value');

    if selectedCurve == length(signal_cell) + 1
        for i = 1:length(signal_cell)
            set(signal_cell{i}, 'Visible', 'off');
        end
        return;
    end

    for i = 1:length(signal_cell)
        if selectedCurve == i
            set(signal_cell{i}, 'Visible', 'off');
        end
    end

end

function delete_noise(~, ~, signal_cell, mc_signal)

    
    persistent flag;

    if isempty(flag)
        flag = 1;
    end

    if flag

        for i = 1:length(signal_cell)
            signal_cell{i}.YData = signal_cell{i}.YData - mc_signal;
        end 

        flag = 0;

    else

        for i = 1:length(signal_cell)
            signal_cell{i}.YData = signal_cell{i}.YData + mc_signal;
        end

        flag = 1;

    end

end
```

