# who_won_it

## Team:
- Hunter Block-Beach
- Valerie Lobas
- Suraj Thyagaraj

## Project Overview:
<p> The aim of this project is to provide a dashboard for visualizing historical US Presidential election data. The data is presented as a set of easy to interpret interactive and static charts that are sourced and updated with data served from three Flask-created APIs.<br><br> Tools used include:
  
- Python
- Pandas
- Flask
- SQLite
- SQLAlchemy
- HTML
- CSS
- Javascript
- Leaflet
- Mapbox
- Anime.js library<br><br>

User interaction includes a layered map with views for electoral college votes and margin of victory, bar charts for 3rd party candidate votes and turnout rate, and two interactive charts that are filterable on state and year that show a data table of relevant information as well as a pie chart showing percentage of votes won by each republican, democrat, and the aggregated other.          

</p>

## Relevant Files:

#### Raw Data:
* [/data/working_data/](data/working_data)
1.  [Presidential election data, 1976-2016](data/working_data/1976-2016-president.csv)
2. [Turnout data, 1980-2014](data/working_data/1980-2014_November_General_Election_Turnout_Rates.csv)
3. [Turnout data, 2016](data/working_data/2016_November_General_Election_Turnout_Rates.csv)
4. [Available Electoral votes, 1976-2016](data/working_data/Available_Electoral_votes.csv)
5. [Candidate with list of parties](data/working_data/parties.csv)
6. [Manipulated party data](data/working_data/allparties.csv)

#### Python/Jupyter Notebooks:
* [/data/working_data/](data/working_data)
1. [Manipulated raw data for table creation](politics_data_raw.ipynb)

* [/](/)
2. [Creation of Flask routes from DB data](/app.py)

#### HTML/CSS/JS

* [/static/](static)
1. [Anime Javascript (new library) | animation for flip card](static/anime.min.js)
2. [Javascript code](static/logic.js)
3. [CSS](static/style.css)

* [/templates/](templates)
4. [HTML](index.html)

#### Project Work

* [/project/](project)
1. [Project Proposal](project/CWR-DA-BC-Project_II-Proposal.docx)
2. [Wireframe for website](project/WebpageWireframe.JPG)
3. [Google Slide Presentation](https://docs.google.com/presentation/d/17g2pkRBL8VQxejt5YE3nkZLkNLQlvulEk7Y5RkHSCeE/edit?usp=sharing)

#### Database

* [/](/)
1. [State-level election data 1976-2016](/StatesDB7)
2. [Year-level election data 1976-2016](/YearDB1)
2. [Voter turnout data 1976-2016](/TurnoutDB1)

#### Flask Routes

1. State Level
2. Year Level 
3. Turnout Data

#### Project Management

1. [Trello Board](https://trello.com/b/frfXB46k/project-2-election-data)
2. [Presentation Slides](https://docs.google.com/presentation/d/17g2pkRBL8VQxejt5YE3nkZLkNLQlvulEk7Y5RkHSCeE/edit)


