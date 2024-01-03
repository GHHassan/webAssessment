title: KF6012 web application integration

Authors
===============
*__ Ghulam Hassan Hassani [w20017074@northumbria.ac.uk]
*__ generated

# About this Project
This project has two main sections, a Restful API and a front end React App

## Section 1 the API
This api is providing data from chi2023 database
This is solely developed for Web Application Integration Assessment KF6012
This Api contains 8 Endpoint classes that extends the General Endpoint class
1. The api.php file is the only access point to this Api
2. It includes some Utility classed such as:
* ClientError for error handling,
* Database to handle the api connection to CHI2023 database, 
* Response class to handle setting the http responce headers 
* Router class the is designed to handle the routing of http requests to their relevant endpoints.
3. config files
* Autoloader class, to handle including required classes automatically as and when they are called.
* ExceptionHandler, self explainatory
* Settings file, sets the constant variables of the api
4. A db folder that consists of two sqlite databases
* Chi2023.sqlite provides contents relevant data
* account.sqlite used to store and provides user credentials, and user notes 
4. includes the Firebase JWT library 
* this library is used to generate and validate JWT tokens for user authorisations and authentaition.
5. a .htaccess file is used to enforce single point of entry

## How to use this APIs
These endpoints can form a RestFul API which can be used with any front end application that can interact with an API and process JSON formated data.

## Endpoint class
This class it the parent of all Endpoints of this API.
This does not return anything and neither it can be accessed via http request.
it provides the common properties and methods to its children.
Its methods includes sanitiseString(), sanitiseInt(), normaliseString(),
initialiseSQL(), checkAllowedParameters(), checkCredentials(), validateToken(), getBearerToken(), and checkAllowedMethods(). Most of the methods listed above are self exlanatory of thier potential functionalities. 
However, the ambiguos ones such as normaliseString() returns the string with
the first letter in capital and the rest of in lower case, checkAllowedMethods() checks whether the http request method is allowed by the enndpoint and 

## 1 Developer Enpoint
GET /developer
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/developer
does not support any parameter, 
only returns the Developer Details such as name, Student Number

## 2 Country Endpoint
GET /country
param N/A
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/Countries
only returns distinct list of countries,
no duplicates will be returned


## 3 Preview Endpoint
GET /preview
param = int limit; specifies the numper of requested contents
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/previews

no parameter returns all contents that have a vidoe link

## 4 Author-and-affiliation Endpoiont
GET /autor-and-affiliation
param = int content = contentID
param = string type = contentType
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/author-and-affiliations

Using both parameter with throw an error "message": "Unprocessable Entity, Invalid or disallowed parameters"
no parameter will return all linked authors and papers 

## 5 Content Endpoint
GET /content
param = int page; specifies the page number based on 20 content per page
param = string type; specifies the type of content to be retrieved
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/contents

Usin both parameter is allowed, however, if user's requested page is more than
available pages no content will be retrieved and the user will be informed
to consider a different range on the parameter

## 6 Token Endpoint
required username and password
GET and POST /token
Param = email and password in basic auth authorization header is required
username = john@example.com
password = examplePassword1234

Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/token

## 7 Note Endpoint
Requires valid token!
GET, POST, PUT, DELETE /note
Param: 
using GET = content_id || null //with content_id returns the note for the specific content if exists.
using POST || PUT = content_id && note //if note exists, it will be updatad
//otherwise a new note record may be created
using DELETE = content_id //deletes the note record for the given content if exists.

Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/notes

## 8 Type Endpoint
GET /types
param = none
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/types

returns all type names and type Ids from types table of CHI2023 database

## Section Two the Front end React application

* Note, the note functionality only works once you are signedIn and refereshed the page. It does not work if you are logged in for the first time. This has been discussed with John Rooksby.

* this is the link to the front end application [https://w20017074.nuwebspace.co.uk/kf6012/coursework/app]
* This section is organised in a React vite application.
All components includes a doc comment explaining thier purpose and
functionalities, authors and often return types
* This section is using the tailwindCSS frame work for styling the application
* The application is fluid and designed in a responsive way to be viewed on different screen sizes
* It contains four pages including a home, Countries, Contents and Not found pages.
* all pages contains a footer and a header consistently
* Navigation to different pages does not trigger new fetch requests
* if there is no data to display a user friedly message thats part of the Notfound page will be displayed
* One image is used in Not found page

