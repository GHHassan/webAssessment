# courseWork pages

## Universal Components
### Signin component
if the user is signed in:
This component renders a **button and two inputs**, a sign in button, an input for username, and another for password.
if the user is signed in:
This will only reder a **"sign out"** button for the user to sign out
This component is imported and used within the [Header]() component, globaly in the application

### header component
**Header** component is just wrapping the Signin and Menu components and add page title **CHI 2023** as advised by the assessment brief
This uses the:
**Signin** component
**Menu** component

## Footer component
This component is displays the text **Coursework assignment for KF6012 Web Application Integration, Northumbria University** Student **name** and **ID** and the **Date**

## Home page
This page fetches a random video and displays its title with the option to view its preview link or just watch the video on one click
then it displays a picture that is sourced from unsplash with free license

## countries page
This page displays the countries and their flag with no repeatitaion
Rest countries api [https://restcountries.com/v3.1] is used to to fetch the corresponding flags of each country.
it has a search bar where the user can dynamically search from the list of countries.
The country elements are clickable and opens the wekipedia page of the corresponding country

##



