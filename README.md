# JIRA Worklog Controlling

In unsere DB werden die Projekt spezifischen Einstellungen gespeichert.
Darstellung von Tabellen, Detail Ansichten und Graphen.
Für Tablets und Desktop ausgelegt.

#Project
##API's
- [JIRA API](https://docs.atlassian.com/jira/REST/latest/#api/2/)
- [TEMPO API](http://tempo.io/doc/timesheets/api/rest/latest/#1279953671)

##Team
- Gabriel Brunner ([Brunn3r](https://github.com/Brunn3r))
- David Heimgartner ([davidheimgartner](https://github.com/davidheimgartner))
- Gerhard Hirschfeld ([hirsch88](https://github.com/hirsch88))

##Mockups
[Mockups](./mockups.pdf)

##NFA
| ID            | Name          |
| :------------ |:--------------|
| NFA_001       | Applikation muss auf Desktop und Tablet verfügbar sein |
| NFA_002       | Anwortzeit von dem PHP Backend Server soll unter 6sec sein |
| NFA_003       | Das Design muss Responsive sein (FlexBox) |
| NFA_004       | Das Design soll dem Google Material Standard angelehnt sein |

#Development
##Libraries

- [JQuery](http://jquery.org)
  - JQuery is used for the DOM manipulations.
- [RequireJS](http://requirejs.org/)
  - RequireJS is a simple module loader lib. We use this to provide the MVC pattern.
- [Handlebars](http://handlebarsjs.com/)
  - Handlebars build semantic templates. We use this to render our views.
- [Bootstrap](http://handlebarsjs.com/)
  - Bootstrap is a CSS Framework, which provides us the basic skeleton for our app.
