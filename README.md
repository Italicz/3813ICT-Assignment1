# PlugSpeak (3813ICT – Software Frameworks Assignment 2)

## GitHub Repo
* The GitHub repository for the PlugSpeak web app can be viewed and downloaded from the following link: (Says Assignment 1 due to being a continuation in the same REPO)
* https://github.com/Italicz/3813ICT-Assignment1
* The GitHub is professionally documented with a beautiful README and consistent commits with a professional commit message. Once the assignment is complete there will be a release on the GitHub repo with the version tag 2.0.

## Data Structure

### Server-Side:
Server-Side data is stored in MongoDB. There are four collections in MongoDB for the Assignment2 database. These collections are, Groups, Users, Channels and Chats.
### Users:
* ID - Integer
* Username – String
* Email - String
* Password – String
* Role – String
### Groups:
* Name – String
* Channels – Array
* Users - Array
### Channels:
* Name - String
* Group - String
* Users - Array
### Chats:
* Name - String
* User - String
* ioConnection - Any

### Client-Side:
Data is fetched from the server-side JSON files, then it is stored on the client side. 
### Users:
* Username – String storing the user’s username
* Email – String storing the user’s email
* Role – String storing the user’s role
### Groups:
* groupName – Variable string storing the group’s name
### Channels:
* channelName – Variable string storing the channel name
* newChannel – New list including name of channel and user array
### Chats:
* channelName - Channel that the chats belong to
* User - User the chats belong to
* currentChannel - Channel currently being viewed

## Rest API

* http://localhost:3000/api/auth (Post) - This route is used for checking the authentication for when a user logs in with a username and password. Two parameters are required, username and password, which then on post loops through the array of users checking for a username and password match. If it comes back with a valid user it will store the details of the user in local storage, if not it will display an error.
* http://localhost:3000/api/createuser (Post) - This route is used for creating a new user, providing a username, password, email and role. If successful, this user is added to the users collection in MongoDB.
* http://localhost:3000/api/deleteuser (Post) - This route is used for deleting a current user, providing the ObjectID allows the user to be removed from the users collection in MongoDB.
* http://localhost:3000/api/creategroup (Post) - This route is used for creating a new group, providing just a Name for this group. If successful and the group of that name doesn’t exist already, it will add this group to the group collection in MongoDB.
* http://localhost:3000/api/deletegroup (Post) - This route is used for deleting an existing group, providing the ObjectID allows the group to be removed from the group collection in MongoDB.
* http://localhost:3000/api/createchannel (Post) - This route is used for creating a new channel, providing the name of the channel and the name of the group the channel exists inside of. If successful and there isn’t a channel with the same name, it will be added to the channels collection in MongoDB.
* http://localhost:3000/api/deletechannel (Post) - This route is used for removing a channel, providing the ObjectID allows the channel to be removed from the channels collection in MongoDB.
* http://localhost:3000/api/addusertogroup (Post) - This route is used for adding an existing user to an existing group, providing the name of the group and the name of the user. If successful it will be added to the groups collection in MongoDB.
* http://localhost:3000/api/deleteusergroup (Post) - This route is used for removing an existing user from an existing group, providing the name of the group and the name of the user. If successful it will be cleared from the groups collection in MongoDB.
* http://localhost:3000/api/addusertochannel (Post) - This route is used for adding an existing user to an existing channel inside an existing group. Providing the name of the group, channel and user. If successful it will be added to the user array in the channel collection in MongoDB.
* http://localhost:3000/api/deleteuserchannel (Post) - This route is used for removing an existing user from an existing channel inside an existing group. Providing the name of the group, channel and user. If this is successful it will clear the user from the channel collection in MongoDB.
* http://localhost:3000/api/getusers (Get) - This route is used for getting all the existing users from the database.
* http://localhost:3000/api/getgroups (Get) - This route is used for getting all the existing groups from the database.
* http://localhost:3000/api/getchannels (Get) - This route is used for getting all the existing channels from the database.
* http://localhost:3000/api/addchat (Post) - Send a new chat to a channel using an object including the channel name, message and the user
* http://localhost:3000/api/getchats (Get) - Get all messages from a channel using the channel name


## Angular Architecture

### Components:
* Login Component – The login component is essentially the home page and is the first page any user will see. This page has a form that allows a user to login by providing a valid username and password. Once a user is logged in, they are then redirected to the chat page. Once logged in the user’s details will be stored in the Local Storage.
* Admin Component – The admin component is a page with a list of forms which only the Super Admin has access to. These forms allow an admin to add/remove users, add/remove groups and add/remove channels. No one else can see any of these forms on this page except for the Super Admin.
* Chat Component – The chat component is a page dedicated to showing the logged in users groups and channels. The user is able to click on a channel if one exists which will bring up a chat box using sockets to allow for real time messaging between users.
### Services:
* User Service – The user service is used for handling the createUser and deleteUser functions by taking in parameters from the admin component and posting it to the respected routes.
* Group Service – The group service is used for handling the createGroup and deleteGroup functions by taking in parameters from the admin component and posting to the respected routes. This service also handles the addUserToGroup and deleteUserFromGroup and getUsersGroups functions by also taking in parameters from the admin component.
* Channel Service – The channel service is also used for handling the createChannel and deleteChannel functions by taking in the parameters from the admin component and posting to the respected routes. This service also handles the addUserToChannel and deleteUserFromChannel functions by also taking in parameters from the admin component.
* Chat Service - The chat service is used for handling the addChat and getChats functions.
