https://kolibril13.github.io/plywood-gallery-matplotlib-examples/

https://matplotlib.org/stable/plot_types/basic/index.html

# Introduction to Data Visualization with Matplotlib

[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/matplot1.pdf)

1. **Pyplot Interface Introduction**:
   ```python
   import matplotlib.pyplot as plt
   plt.plot([1, 2, 3, 4])
   plt.ylabel('some numbers')
   plt.show()
   ```

2. **Adding Data to Axes**:
   ```python
   plt.plot(['Jan', 'Feb', 'Mar', 'Apr'], [40, 42, 50, 60])
   plt.ylabel('Average Temp')
   plt.show()
   ```

3. **Combining Multiple Data Sets**:
   ```python
   plt.plot(['Jan', 'Feb', 'Mar', 'Apr'], [40, 42, 50, 60], label='Seattle')
   plt.plot(['Jan', 'Feb', 'Mar', 'Apr'], [30, 35, 40, 50], label='New York')
   plt.ylabel('Temp')
   plt.legend()
   plt.show()
   ```

4. **Customizing Plots**:
   ```python
   plt.plot(['Jan', 'Feb', 'Mar', 'Apr'], [40, 42, 50, 60], linestyle='--', color='r', marker='o')
   plt.ylabel('Temp')
   plt.show()
   ```

5. **Axes Labels and Titles**:
   ```python
   plt.plot(['Jan', 'Feb', 'Mar', 'Apr'], [40, 42, 50, 60])
   plt.xlabel('Month')
   plt.ylabel('Temp')
   plt.title('Monthly Temp in Seattle')
   plt.show()
   ```

6. **Creating Subplots**:
   ```python
   fig, ax = plt.subplots()
   ax.plot(['Jan', 'Feb', 'Mar', 'Apr'], [40, 42, 50, 60])
   plt.show()
   ```

7. **Subplots Customization**:
   ```python
   fig, (ax1, ax2) = plt.subplots(1, 2)
   ax1.plot(['Jan', 'Feb', 'Mar', 'Apr'], [40, 42, 50, 60])
   ax2.plot(['Jan', 'Feb', 'Mar', 'Apr'], [30, 35, 40, 50])
   plt.show()
   ```

# Time-series Data with Matplotlib

#timeseries
[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/matplot2.pdf)


To create a DataFrame for `climate_change`, you can follow a structure similar to this:

```python
import pandas as pd

# Sample data structure
data = {
    "date": ["2020-01-01", "2020-01-02", "2020-01-03", ...],
    "co2": [414.7, 415.0, 415.3, ...],
    "relative_temp": [0.25, 0.27, 0.29, ...]
}

climate_change = pd.DataFrame(data)
climate_change['date'] = pd.to_datetime(climate_change['date'])
climate_change.set_index('date', inplace=True)
```

Replace the ellipses (`...`) with your actual data. This code sets up a DataFrame with date, CO2, and temperature data, converting the date column to a datetime format and setting it as the index, which is typical for time-series data.

1. **Plotting Basic Time-series Data**:
   ```python
   import matplotlib.pyplot as plt
   ax.plot(climate_change.index, climate_change['co2'])
   ax.set_xlabel('Time')
   ax.set_ylabel('CO2 (ppm)')
   plt.show()
   ```

2. **Zooming into Specific Time Frames**:
   - Decade Zoom:
     ```python
     sixties = climate_change["1960-01-01":"1969-12-31"]
     ax.plot(sixties.index, sixties['co2'])
     ```
   - Year Zoom:
     ```python
     sixty_nine = climate_change["1969-01-01":"1969-12-31"]
     ax.plot(sixty_nine.index, sixty_nine['co2'])
     ```

3. **Plotting Multiple Time-series Together**:
   ```python
   ax.plot(climate_change.index, climate_change["co2"])
   ax.plot(climate_change.index, climate_change["relative_temp"])
   ```

4. **Using Twin Axes for Different Variables**:
   ```python
   ax2 = ax.twinx()
   ax2.plot(climate_change.index, climate_change["relative_temp"])
   ```

5. **Differentiating Variables by Color**:
   ```python
   ax.plot(climate_change.index, climate_change["co2"], color='blue')
   ax2.plot(climate_change.index, climate_change["relative_temp"], color='red')
   ```

6. **Customizing Annotations on Time-series Plots**:
   - Basic Annotation:
     ```python
     ax2.annotate(">1 degree", xy=[pd.Timestamp("2015-10-06"), 1])
     ```
   - With Text Positioning and Arrows:
     ```python
     ax2.annotate(">1 degree", xy=(pd.Timestamp('2015-10-06'), 1), xytext=(pd.Timestamp('2008-10-06'), -0.2), arrowprops={})
     ```

7. **Creating a Function for Time-series Plotting**:
   ```python
   def plot_timeseries(axes, x, y, color, xlabel, ylabel):
       axes.plot(x, y, color=color)
       axes.set_xlabel(xlabel)
       axes.set_ylabel(ylabel, color=color)
   ```

Each section provides practical instructions and code snippets for effectively visualizing and analyzing time-series data using Matplotlib in Python.

# Quantitative Comparisons: Bar-Charts

[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/matplot3.pdf)

1. **Olympic Medals Data**: Presents a dataset on Olympic medals and demonstrates basic bar chart plotting.
2. **Rotating Tick Labels**: Shows how to rotate axis labels for clarity.
3. **Visualizing Multiple Medal Types**: Explains stacking bars for different medal types (Gold, Silver, Bronze).
4. **Adding a Legend**: Illustrates how to add a legend to distinguish between different bars.
5. **Histograms**: Discusses creating histograms to represent distribution of data.
6. **Error Bars in Bar Charts**: Teaches how to add error bars to bar charts for statistical representation.
7. **Boxplots**: Describes creating boxplots for data distribution analysis.
8. **Scatter Plots**: Introduces scatter plots for comparing two quantitative variables.

Here are example codes for each key point from "Quantitative Comparisons: Bar-Charts":

1. **Olympic Medals Data**:
   ```python
   medals.plot(kind='bar')
   ```

2. **Rotating Tick Labels**:
   ```python
   plt.xticks(rotation=45)
   ```

3. **Visualizing Multiple Medal Types**:
   ```python
   medals.plot(kind='bar', stacked=True)
   ```

4. **Adding a Legend**:
   ```python
   plt.legend()
   ```

5. **Histograms**:
   ```python
   plt.hist(data)
   ```

6. **Error Bars in Bar Charts**:
   ```python
   plt.bar(x, height, yerr=error)
   ```

7. **Boxplots**:
   ```python
   data.boxplot()
   ```

8. **Scatter Plots**:
   ```python
   plt.scatter(x, y)
   ```

These examples provide a basic structure for each type of plot, which you can adapt and expand upon based on your specific data and visualization needs.



# Preparing Your Figures to Share with Others

[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/matplot4.pdf)

The document "Preparing Your Figures to Share with Others" discusses various aspects of refining and saving Matplotlib figures for presentation and sharing. Here are the key points with corresponding Python code examples:

1. **Changing Plot Style**:
   ```python
   plt.style.use("ggplot")
   ```

2. **Choosing a Style**:
   ```python
   plt.style.use("seaborn-colorblind")
   ```

3. **Saving the Figure to File**:
   ```python
   fig.savefig("my_figure.png")
   ```

4. **Different File Formats**:
   - Saving as JPEG:
     ```python
     fig.savefig("my_figure.jpg")
     ```
   - Saving as SVG:
     ```python
     fig.savefig("my_figure.svg")
     ```

5. **Resolution**:
   ```python
   fig.savefig("my_figure.png", dpi=300)
   ```

6. **Size**:
   ```python
   fig.set_size_inches([5, 3])
   ```

7. **Automating Figures from Data**:
   ```python
   for sport in sports:
       sport_df = df[df["Sport"] == sport]
       ax.bar(sport, sport_df["Height"].mean(), yerr=sport_df["Height"].std())
   ```

Each section provides guidelines and examples for effectively preparing and customizing figures in Matplotlib to enhance their communicative power and suitability for various sharing formats.
