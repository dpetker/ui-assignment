# REST API Design

## READ API

GET /commits  --> returns JSON array of commits with some arbitrary limit, eg 200
GET /commits/HEAD  --> returns the HEAD commit only
GET /commits/{SHA} --> returns the commit with sha given

since SHA's are globally unique, it seems like a good idea to use it as an ID.

GET /commits/{SHA}?{LIMIT=N} --> returns the commit with SHA and following LIMIT-1 commits

eg GET /commits/HEAD?LIMIT=500 --> will return most recent 500 commits

GET /commits/{SHA}/commit/message  --> will return the commit message

successful results should be sent with a HTTP 200 response.
non-existent commit request should return 404.

Note, PUT,POST,and DELETE to /commits should result in an error 405 as these 
operations are not permitted in the current design.

## UPDATE API

PATCH /commits/{SHA} 

with JSON body like:

    { message: "my commit message" }

--> will update the commit message

and return 204 response with no body, or 200 and return the JSON for the entire commit

if Patch is not available you could use PUT and field parameter:

PUT /commits/{SHA}/?field=message

{value: "my commit message"}

if the sent JSON is wrong format or not valid JSON, the server should return 400 response
if request attempts to modify a non-writable property, return 405.

all of these available options could be advertised in an OPTIONS request

NB: all request should specify MIME type of application/json,
for both Content-Type and Accept headers.

