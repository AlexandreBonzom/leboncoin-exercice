This project was started with React.
This is part of a full stack exercise performed during a bootcamp.
This is the front part.
For the API part, go to:
https://github.com/AlexandreBonzom/leboncoin-api


Here are the main features:


### React the environment
BrowserRoute, Switch, Route and Link are used to navigate  through this website.


### Login
Send the request to the server with an email and a password.
If the email or email is not correct, a message will appear.

### Register
Simple registration form. Also, if the email appears in the database, a message will appear

### Offer
The offers are listed (with a map) with the same component with different accessories.
Ability to filter offers. 

Possibility to see one offer in particular; A carousel is displayed if there are several pictures for the same offer.

### Publis Offer
Only available when connected to the site or user will be redirected to Log In page. 
Pictures are saved encoded in base 64 before to be send to back.


### User's page
The same component as the offer list is reused but with different parameters from the description text for the ellipsis.
