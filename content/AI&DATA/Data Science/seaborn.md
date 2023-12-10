#seaborn

# Introduction to Data Visualization with Seaborn


[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seaborn1.pdf)

1. **Scatter Plot**: Demonstrates creating a scatter plot with height and weight data.
   ```python
   sns.scatterplot(x=height, y=weight)
   plt.show()
   ```

2. **Count Plot**: Shows how to create a count plot using gender data.
   ```python
   sns.countplot(x=gender)
   plt.show()
   ```

3. **DataFrames with Seaborn**: Explains using Pandas DataFrames with Seaborn for visualization.
   ```python
   df = pd.read_csv("masculinity.csv")
   sns.countplot(x="how_masculine", data=df)
   plt.show()
   ```

4. **Scatter Plot with 'hue'**: Teaches adding a third variable using 'hue' in scatter plots.
   ```python
   sns.scatterplot(x="total_bill", y="tip", data=tips, hue="smoker")
   plt.show()
   ```

5. **Setting 'hue' Order and Colors**: Provides examples for customizing the order and colors of 'hue' in plots.
   ```python
   sns.scatterplot(x="total_bill", y="tip", data=tips, hue="smoker", hue_order=["Yes", "No"])
   plt.show()
   ```

These examples help understand the versatility of Seaborn for different types of data visualizations, particularly when dealing with categorical data.

# Introduction to Relational Plots and Subplots with Seaborn


[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seaborn2.pdf)

1. **Relational Plots**: Explains the use of `relplot()` for creating relational plots like scatter and line plots. 
   ```python
   sns.relplot(x="total_bill", y="tip", data=tips, kind="scatter")
   ```

2. **Subplots**: Demonstrates creating subplots in rows, columns, or both, using `relplot()`.
   ```python
   sns.relplot(x="total_bill", y="tip", data=tips, kind="scatter", col="smoker")
   ```

3. **Customizing Scatter Plots**: Covers customizations like point size, style, and transparency.
   ```python
   sns.relplot(x="total_bill", y="tip", data=tips, kind="scatter", size="size", hue="size")
   ```

4. **Line Plots**: Discusses creating line plots and adding markers, turning off line style, and handling multiple observations per x-value.
   ```python
   sns.relplot(x="hour", y="NO_2_mean", data=air_df_mean, kind="line", style="location", hue="location")
   ```

These examples illustrate Seaborn's capabilities for creating complex plots and subplots, enhancing data visualization.

# Count Plots and Bar Plots in Seaborn 


[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seaborn3.pdf)


1. **Count Plot**: Demonstrates creating count plots for categorical data.
   ```python
   sns.countplot(x="category", data=df)
   plt.show()
   ```

2. **Bar Plot**: Illustrates how to make bar plots to display the mean of quantitative variables for each category.
   ```python
   sns.barplot(x="category", y="value", data=df)
   plt.show()
   ```

3. **Customizing Plots**: Discusses customizing plots by changing the order of categories, orientation, and adding confidence intervals.
   ```python
   sns.barplot(x="category", y="value", data=df, ci="sd")
   plt.show()
   ```

These examples demonstrate Seaborn's capabilities in handling categorical data and the various ways to customize the visualization for clearer insights.


# Changing Plot Style and Color in Seaborn


[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seaborn4.pdf)

1. **Changing Plot Style**: Set different background styles.
   ```python
   sns.set_style("whitegrid")
   ```

2. **Customizing Color Palette**: Apply different color palettes.
   ```python
   sns.set_palette("husl")
   ```

3. **Setting Context**: Adjust the scale of plot elements and labels.
   ```python
   sns.set_context("talk")
   ```

4. **Adding Titles and Labels**: Enhance plot readability.
   ```python
   ax.set_title("Plot Title")
   ax.set_xlabel("X Label")
   ax.set_ylabel("Y Label")
   ```

These examples demonstrate how to effectively change the style, color, and context of plots in Seaborn, as well as how to add titles and labels for clarity.



------------------------------------------------

# Difference Between Catplot vs Relplot

1. **Catplot**: The `catplot` function is used for plotting categorical data. It provides a high-level interface for drawing categorical plots onto a FacetGrid. This function provides access to several axes-level functions that show the relationship between a numerical and one or more categorical variables using one of several visual representations. Examples include box plots, violin plots, bar plots, and strip plots.

2. **Relplot**: The `relplot` function, on the other hand, is used for plotting relational data. It provides a high-level interface for drawing attractive and informative statistical graphics. This function is particularly good for visualizing the relationship between two numerical variables, often using scatter plots or line plots. It also utilizes a FacetGrid, allowing you to create a grid of plots by mapping dataset columns to the rows and columns of the grid.

The key difference lies in the type of data they are best suited for: `catplot` is for categorical data and allows you to choose among different types of categorical plots, whereas `relplot` is for relational (usually numerical) data and focuses on scatter and line plots. Both functions offer the flexibility to plot across a FacetGrid, enabling easy comparison of subgroups within your data.

#whiskers

In Seaborn, which is a Python data visualization library based on matplotlib, "whiskers" are a component of box plots and are used to represent the variability outside the upper and lower quartiles of the data. They provide a visual indication of the spread of the data and potential outliers.

Here's a detailed explanation of how whiskers work in Seaborn's box plots:

1. **Box**: The central box of a box plot represents the interquartile range (IQR), which is the range between the first quartile (25th percentile) and the third quartile (75th percentile). The line inside the box indicates the median of the data.

2. **Whiskers**: The whiskers extend from the box to show the range of the data. By default, the whiskers extend to 1.5 * IQR above the third quartile and 1.5 * IQR below the first quartile. Any data point beyond this range is considered an outlier and is often represented with a different marker such as a dot.

3. **Outliers**: Points outside the end of the whiskers are considered outliers and are usually plotted individually.

It's important to note that the default behavior for whiskers can be adjusted in Seaborn. You can change the multiplier for the IQR to adjust how far the whiskers extend from the box. Additionally, you can set whiskers to represent a specific percentile or a specific range of data, depending on your specific needs and the nature of your dataset.

Using these whiskers, box plots provide a concise summary of the distribution of the data, highlighting the median, quartiles, and potential outliers. This makes them extremely useful for comparing distributions between several groups or datasets.




# Seaborn Intermediate

[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seabornInt1.pdf)

The document "Intermediate Data Visualization with Seaborn" provides a comprehensive introduction to Seaborn, a Python library for data visualization. It covers various plotting techniques and how Seaborn integrates with other Python libraries like Matplotlib and Pandas. Key points include:

1. **Matplotlib Integration**: Example - Using Matplotlib for basic plots before enhancing them with Seaborn.
   ```python
   import matplotlib.pyplot as plt
   import pandas as pd
   df = pd.read_csv("wines.csv")
   fig, ax = plt.subplots()
   ax.hist(df['alcohol'])
   ```

2. **Pandas for Data Analysis**: Example - Basic plotting with Pandas.
   ```python
   import pandas as pd
   df = pd.read_csv("wines.csv")
   df['alcohol'].plot.hist()
   ```

3. **Seaborn for Complex Visualizations**: Example - Creating histograms with Seaborn's `histplot`.
   ```python
   import seaborn as sns
   sns.histplot(df['alcohol'])
   ```

4. **Distribution Plots**: Example - Using Seaborn's `displot` for distribution plots.
   ```python
   import seaborn as sns
   sns.displot(df['alcohol'], kind='kde')
   ```

5. **Enhanced Plot Types**: Example - Combining KDE, rug plot, and cumulative distribution functions.
   ```python
   sns.displot(df['alcohol'], kind='ecdf')
   ```

6. **Regression Plots**: Example - Creating scatter plots with regression lines using `regplot` and `lmplot`.
   ```python
   sns.regplot(data=df, x="alcohol", y="pH")
   sns.lmplot(data=df, x="alcohol", y="quality", hue="type")
   ```

These examples demonstrate how Seaborn can be used to create and enhance various types of data visualizations.




# Chapter 2: Intermediate Data Visualization with Seaborn

[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seabornInt2.pdf)

1. **Setting Styles**: Changing the overall appearance of plots.
   ```python
   sns.set_style('whitegrid')
   sns.displot(df['Tuition'])
   ```

2. **Removing Axes Spines**: Simplifying plots by removing spines.
   ```python
   sns.set_style('white')
   sns.displot(df['Tuition'])
   sns.despine(left=True)
   ```

3. **Defining Custom Colors**: Assigning specific colors to plots.
   ```python
   sns.set(color_codes=True)
   sns.displot(df['Tuition'], color='g')
   ```

4. **Using Different Palettes**: Demonstrating the use of various color palettes.
   ```python
   palettes = ['deep', 'muted', 'pastel', 'bright', 'dark', 'colorblind']
   for p in palettes:
       sns.set_palette(p)
       sns.displot(df['Tuition'])
   ```

5. **Customizing with Matplotlib**: Further customizations using Matplotlib.
   ```python
   fig, ax = plt.subplots()
   sns.histplot(df['Tuition'], ax=ax)
   ax.set(xlabel='Tuition 2013-14', ylabel='Distribution', xlim=(0, 50000), title='2013-14 Tuition and Fees Distribution')
   ```

These examples show how Seaborn can be used in conjunction with Matplotlib for more detailed plot customizations.


# Chapter 3


[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seabornInt3.pdf)

1. **Stripplot** - Plotting individual data points.
   ```python
   sns.stripplot(data=df, y="DRG Definition", x="Average Covered Charges", jitter=True)
   ```

2. **Swarmplot** - Similar to stripplot but points are adjusted to avoid overlap.
   ```python
   sns.swarmplot(data=df, y="DRG Definition", x="Average Covered Charges")
   ```

3. **Boxplot** - Showing distributions with respect to categories.
   ```python
   sns.boxplot(data=df, y="DRG Definition", x="Average Covered Charges")
   ```

4. **Violinplot** - Combining boxplot and kernel density estimation.
   ```python
   sns.violinplot(data=df, y="DRG Definition", x="Average Covered Charges")
   ```

5. **Boxenplot** - An enhanced boxplot for larger datasets.
   ```python
   sns.boxenplot(data=df, y="DRG Definition", x="Average Covered Charges")
   ```

6. **Barplot** - Visualizing data with bar charts.
   ```python
   sns.barplot(data=df, y="DRG Definition", x="Average Covered Charges", hue="Region")
   ```

7. **Pointplot** - Points are connected by a line, useful for time series data.
   ```python
   sns.pointplot(data=df, y="DRG Definition", x="Average Covered Charges", hue="Region")
   ```

8. **Countplot** - Shows the count of observations in each categorical bin.
   ```python
   sns.countplot(data=df, y="DRG_Code", hue="Region")
   ```

These examples demonstrate various ways to visualize categorical data using Seaborn.

# FacetGrid, catplot, and lmplot in Seaborn


[See PDF link](https://github.com/ErdemOzgen/brain/blob/v4/docs/pdfs/seabornInt4.pdf)


1. **FacetGrid** - Creating grids of plots based on a category:
   ```python
   g = sns.FacetGrid(df, col='HIGHDEG')
   g.map(sns.boxplot, 'Tuition', order=['1', '2', '3', '4'])
   ```

2. **catplot** - Simplified facet grid for categorical data:
   ```python
   sns.catplot(x="Tuition", data=df, col="HIGHDEG", kind="box")
   ```

3. **lmplot** - Plotting regression models on a FacetGrid:
   ```python
   sns.lmplot(data=df, x="Tuition", y="SAT_AVG_ALL", col="HIGHDEG", fit_reg=False)
   ```

4. **lmplot with Regression** - Adding regression lines to plots:
   ```python
   sns.lmplot(data=df, x="Tuition", y="SAT_AVG_ALL", col="HIGHDEG", row="REGION")
   ```

These examples illustrate how to use Seaborn's FacetGrid, catplot, and lmplot functions to create complex, multi-faceted visualizations.
