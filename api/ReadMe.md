# About this Api
This api is providing data from chi2023 database
This is solely developed for Web Application Integration Assessment

### This Api contains 5 Endpoints

## How to use this APIs

## 1 Developer Enpoint
GET /developer
Link https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/developer
does not support any parameter, 
only returns the Developer Details such as name, Student Number

## 2 Country Endpoint
GET /country
param N/A
Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/countries]
only returns distinct list of countries,
no duplicates will be returned


## 3 Preview Endpoint
GET /preview
param = int limit; specifies the numper of requested contents
Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/previews]

no parameter returns all contents that have a vidoe link

## 4 author-and-affiliation Endpoiont
GET /autor-and-affiliation
param = int content = contentID
param = string type = contentType
Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/author-and-affiliations]

Using both parameter with throw an error "message": "Unprocessable Entity, Invalid or disallowed parameters"
no parameter will return all linked authors and papers 

## 5 Content Endpoint
GET /contents
param = int page; specifies the page number based on 20 content per page
param = string type; specifies the type of content to be retrieved
Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/contents]

Usin both parameter is allowed, however, if user's requested page is more than
available pages no content will be retrieved and the user will be informed
to consider a different range on the parameter

## 6 token Endpoint
required username and password!
GET and POST /token
Param = email and password in basic auth authorization header is required
username = john@example.com
password = examplePassword1234

Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/token]

## 7 note Endpoint
Requires valid token!
GET, POST, PUT, DELETE /note
Param: 
using GET = content_id || null //with content_id returns the note for the specific content where applicable
using POST || PUT = content_id && note //if note exists, it will be updatad
using DELETE = content_id //deletes the note for the given content

Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/note]

## 8 types
return distinct types of the contents from type table on the databse
GET, 
Param: no parameter allowed
Link [https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/contentTypes]
