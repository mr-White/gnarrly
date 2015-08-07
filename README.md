# Gnarrly
Meteor+Angular App

Open your favorite terminal and cd into the root folder of the cloned project repo. Run the following command:
**meteor run**

That will get the web app started with a MongoDB instance running. To access a shell of the MongoDB instance, open your terminal and cd into the root folder of the repo. Run:
**meteor mongo**

That will open an instance of a Mongod shell for querying the db directly. Here is an example query:
**db.user.find().pretty()**

Prints a "pretty" list of all users in the collection.

## File Structure
Client folder is dedicated to the client side app
Server folder is dedicated to the server app
Model folder holds all the model blueprints (shared between the 2 apps)
Public folder is an assets folder for serving pictures, downloads, etc.
