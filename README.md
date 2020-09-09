# PlugSpeak (3813ICT – Software Frameworks Assignment 1)

## GitHub Repo
The GitHub repository for the PlugSpeak web app can be viewed and downloaded from the following link:
https://github.com/Italicz/3813ICT-Assignment1

## Data Structure

### Server-Side:
Server-Side data is stored in JSON files. I have three JSON files called users.json (Users) and groups.json (Groups). All of these are represented in arrays. And the channel has an array of users and belongs to a group.
### Users:
* ID - Integer
* Username – String
* Email - String
* Password – String
* Role – String
### Groups:
* Name – String
* Channels – Array

### Client-Side:
Data is fetched from the server-side JSON files, then it is stored on the client side. 
### Users:
* Username – String storing the user’s username
* Email – String storing the user’s email
* Role – String storing the user’s role
* removeUser – variable string storing the user’s name to be removed
### Groups:
* groupName – Variable string storing the group’s name
* removeGroup – variable string storing the group name to be removed
### Channels:
* channelName – Variable string storing the channel name
* removeChannel – Variable string storing the channel name to be removed
* newChannel – New list including name of channel and user array

## Rest API

* http://localhost:3000/api/auth (Post) - This route is used for checking the authentication for when a user logs in with a username and password. Two parameters are required, username and password, which then on post loops through the array of users checking for a username and password match. If it comes back with a valid user it will store the details of the user in local storage, if not it will display an error.
* http://localhost:3000/api/createuser (Post) - This route is used for creating a new user, providing a username, password, email and role. If successful, this user is added to the array in the JSON file. 
* http://localhost:3000/api/deleteuser (Post) - This route is used for deleting a current user, providing just a Username allows the user to be removed from the array in the JSON file.
* http://localhost:3000/api/creategroup (Post) - This route is used for creating a new group, providing just a Name for this group. If successful and the group of that name doesn’t exist already, it will add this group to the group array JSON file.
* http://localhost:3000/api/deletegroup (Post) - This route is used for deleting an existing group, providing the Name of the group to be deleted. If successful, and this group does exist, it will be removed from the group JSON file.
* http://localhost:3000/api/createchannel (Post) - This route is used for creating a new channel, providing the name of the channel and the name of the group the channel exists inside of. If successful and there isn’t a channel with the same name, it will be added to the groups json file.
* http://localhost:3000/api/deletechannel (Post) - This route is used for removing a channel, providing the name of the channel and the name of the group the channel exists inside of. If successful and there is a channel with this name in the defined group, it will be removed from the groups json file.\
* http://localhost:3000/api/addusertogroup (Post) - This route is used for adding an existing user to an existing group, providing the name of the group and the name of the user. If successful it will be added to the groups json file.
* http://localhost:3000/api/deleteusergroup (Post) - This route is used for removing an existing user from an existing group, providing the name of the group and the name of the user. If successful it will be cleared from the groups json file.
* http://localhost:3000/api/addusertochannel (Post) - This route is used for adding an existing user to an existing channel inside an existing group. Providing the name of the group, channel and user. If successful it will be added to the user array in the channel array in the group json file.
* http://localhost:3000/api/deleteuserchannel (Post) - This route is used for removing an existing user from an existing channel inside an existing group. Providing the name of the group, channel and user. If this is successful it will clear the user from the channel array in the groups json file.
* http://localhost:3000/api/getusersgroups (Post) – This route is used for getting an existing users’ array of groups, providing the users username. This is used in the chat component for displaying the currently logged in users’ groups and channels.


## Angular Architecture

### Components:
* Login Component – The login component is essentially the home page and is the first page any user will see. This page has a form that allows a user to login by providing a valid username and password. Once a user is logged in, they are then redirected to the chat page. Once logged in the user’s details will be stored in the Local Storage.
* Admin Component – The admin component is a page with a list of forms which only the Super Admin has access to. These forms allow an admin to add/remove users, add/remove groups and add/remove channels. No one else can see any of these forms on this page except for the Super Admin.
* Chat Component – The chat component is currently only displaying a hello message to the currently logged in user, as well as a loop for all the users’ current groups and channels in said groups. This is unique to the user logged in.
### Services:
* User Service – The user service is used for handling the createUser and deleteUser functions by taking in parameters from the admin component and posting it to the respected routes.
* Group Service – The group service is used for handling the createGroup and deleteGroup functions by taking in parameters from the admin component and posting to the respected routes. This service also handles the addUserToGroup and deleteUserFromGroup and getUsersGroups functions by also taking in parameters from the admin component.
* Channel Service – The channel service is also used for handling the createChannel and deleteChannel functions by taking in the parameters from the admin component and posting to the respected routes. This service also handles the addUserToChannel and deleteUserFromChannel functions by also taking in parameters from the admin component.
