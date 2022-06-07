# L5 Stata: Advanced

Covid data:

Histogram

Hist total_deaths_per_million if date=="2021-09-08"

Scatter

Scatter total_deaths_per_million gdp

Regress

regress new_deaths_per_million people_vaccinated_per_hundred if
date==\"2021-09-08\"

Predict

predict predictable_new_deaths if date==\"2021-09-08\"

predict excess_new_deaths if date==\"2021-09-08\", resid

Twoway graphs

graph twoway (scatter new_deaths_per_million
people_vaccinated_per_hundred) (line predictable_new_deaths
people_vaccinated_per_hundred) if date=="2021-09-08"

twoway scatter new_deaths_per_million people_vaccinated_per_hundred\|\|
line predictable_new_deaths people_vaccinated_per_hundred

Collapse

gen US=1 if location=="United States"

gen US_newdeaths_percap = us\*new_deaths_per_million

collapse (mean) new_cases_per_million new_deaths_per_million
new_vaccinations_smoothed_per_mi\[fweight=population\], by(date)

Variable types

help datatypes

destring date, gen(date2)

generate int numdate = date(date,\"YMD\",2021)

Graphs

twoway line us_new_deaths_percap numdate\|\| line
new_deaths_per_million numdate

twoway line new_deaths_per_million numdate\|\| line
new_cases_per_million numdate

graph save filename.gph, replace

Time Series

tsset numdate

gen rising = new_deaths_per_million\> new_deaths_per_million

Log files

log using filename.og, replace

log close

Review stata commands