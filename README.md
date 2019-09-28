# EUROSTAT - Migration Data Visualised

## Milestone 2 Project: Interactive Frontend Development.
###### Disclaimer: *this dashboard is made for educational use only.*

## About EUROSTAT
Eurostat is the statistical office of the European Union situated in Luxembourg. Its mission is to provide high quality statistics for Europe.
Providing the European Union with statistics at European level that enable comparisons between countries and regions their key task. 
On the other hand, the public and media need statistics for an accurate picture of contemporary society and to evaluate the performance of politicians and others.

## About this dashboard
This data dashboard represents data about Asylum applicants in the 28 member states, by age and sex, based on Annual aggregated data (rounded) and was last updated on the 18th of June 2019.

Migration is not the only interesting statistical data Eurostat has. Therefore, the link to the Eurostat database is given top left, which opens to a new page.

##### Total asylum applicants per year in 28 EU Countries
This graph represents the total number of asylum applicants in the 28 member states from 2013 to 2018 and is the main focus for this dashboard. By clicking one or more years the selected bar will turn orange and the underlining tables and pie will show the composition of the influx of asylum seekers for those selected years.
Years with a grey bar are not a part of the dataset, but if the user wants back to selecting all the available years, the button "Reset filters" can be used.

Because this graph is the main focus of this dashboard it will stay in screen while the other tables will slide underneath it. Furthermore, this way the reset button is always readily available.


##### Top-5 Country Table and Pie
The most important countries are the top-5, because in the highest influx there is the most diversity or are certain trends better to observe and often more accurate.

<span style="color: red"> The percentages on the country table represent the percentage on the total influx for the selected years </span>

The pie slices or the country names in the legend of the pie chart can be selected if the user not only wants the influx of a specific period, but wants to zoom further into a specific top-5 country.
Important to note is when years and countries are selected and the user clicks on the reset button the years as well as the countries are reset to the initial values, namely the influx over 2013-2018 and the corresponding top-5 countries.

##### Sex Table
The sex table only gives information about Male/Female/Unknown and doesn't reflect any information about gender. It will give the number and percentages based on the selected years and/or countries.

##### Age Table
The age gives information about age categories and will give the number and percentages based on the selected years and/or countries.


##### Location Dashboard
The dashboard is available on <a href='https://rory81.github.io/eurostat-migration-db/' alt='location dashboard' target="_blank">GitHub</a>.


## UX
An important question in the migration chain is not only how much applicants will come their way, but the composition of the migrationstream is also very important.
For instance, when their are mostly males it is very likely that they travelled ahead and that family reunification will most likely follow. When the group of minors get bigger this will have consequences on the type of accomodations needed and for instance the educational necessities. 
As mentioned earlier it is also important to identify the top-5 countries, because in the highest influx there is the most diversity or are certain trends better to observe and often more accurate. Furthermore, it identifies which part of Europe is most favored by the asylum seekers as an asylum seeker can only to one EU country due to the EU Dublin Regulation.

#### Audience
My main goal was to give this information without showering the users with all kinds of tables and graphs. My goal audience are policy officers that have to be able to go to parliament with certain data, but are often not as skilled in reading complicated data and graphs.

#### Mockups & other design decisions

##### Mockups

The mockups were created with Pencil Project and are in the <a href="https://github.com/rory81/eurostat-migration-db/tree/master/assets/images" target="_blank">/assets/images</a> folder

![mobileMockup](./assets/images/mockupMobile.PNG)


##### Deviations from the Mockups

For the mobile and the ipad version the country, sex and age elements are stacked rather than next to each other for readibility and user friendliness.

##### Other Design decisions

The color blue used in the reset button and for the link to Eurostat is the blue that Eurostat uses, namely (#003399).

The color orange makes it more lively and is good and warm counter color to the grey, which is the color when a certain year is not selected, or the blue in the Eurostat logo.

The colors for the pie are the automatic generated color palette, which matched nicely with the other colors.

As font type Roboto was choosen as it makes text as well as numbers nicely readible.







#Acknowledgments
use code from https://jbroks.github.io/GB-Accidents-Dashboard/ for the reset filters button
https://code-institute-room.slack.com/archives/C7HD37Q1F/p1545124218942400 for responsiveness charts
