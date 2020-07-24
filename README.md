# mern-lagomify

#  Project 3: Lagomfiy
#### Created by 
Monica Nadal, Frank Flores, Christopher Zenner, and Tamar Cabayan

#### Our Mission
In Swedish, the word "lagom" means just the right amount. We felt, given the main purpose of our app was to help users simplify their lives by cleaning out their closets to just the "right amount" of things, the perfect name for our app would be Lagomify or, as we translate it to mean, the process of getting to just the right amount of things. 

Our goal is threefold (i) educating our users about the beauty of minimalism, organization, and tidying up; (ii)  getting the user back to basics by cleaning out their closets and getting rid of excess; and (iii) helping the environment, our user's wallets, and others by providing links to donation and resale sites. 

#### How to Get Started
If you are interested in simplifying your life, visit our app site at https://lagomify.herokuapp.com/. Once you are logged in, you can:
1. Read articles about simplifying your life through tidying up,
1. Start uploading your belongings onto our app,
1. Deciding whether you want to keep or sell or donate your belongings, and
1. Figuring out the best site for you to either sell or donate your belongings. 

#### New Technologies 
### Material-UI
Material-UI is an open-source project that implements React Components and which follows Google’s Material Design design principles. 

We ran the command "npm install @material-ui/core" to install Material-UI to our project, making sure to run the command in the root directory of your project. We ran the command "npm install @material-ui/icons" to install the Material-UI Icons. Once installed, we were able to use the Material UI components to create the grid layout and components for the page. 

For more information about Material-UI and how it works, you can visit https://material-ui.com/.

### Amazon S3
Amazon Simple Storage Service (Amazon S3) is an object storage service. We used Amazon S3 to store the items our users were uploading to the site in the cloud. This involved having to create an AWS profile, create the S3 bucket that would store the items, uploading the files from the client side UI to the server, and linking the items in the s3 bucket to our MongoDB database. 

We use Multer to make sure the files were uploaded to the server. When a web client uploads a file to a server, it is generally submitted through a form and encoded as multipart/form-data. Multer is the middleware used for Express and Node.js to makes it easy to handle this multipart/form-data when your users upload files. 


#### App Layout
### Authentication
Upon entering our site, you will be directed to the authentication page. The authentication page will requie you to log-in using your google account before you can being to utilize our app and start sorting out your belongings.

### Learn More Page
Once you are logged in, if you are not ready to start cleaning house, you can choose to read more about minimalism and simplifying your life by clicking on the "Learn More" page in the navbar. This page will have links to sites and articles about why it is so important to simplify your life as well as tips on how to get started and tidy up. 

### Add Item Page
Here, you can begin adding all your items onto your account. We require you to give your item a name, briefly describe the item, and let us know where the item is located. You then just drop an image of the itme into the dropzone area. Once you click "Add My Item", the item will be saved to your account. 

### My Items
This page allows you to view all the items you have uploaded to our app and decide whether or not you want to keep the item or give it up. If you decide to keep it, it remains listed as one of your items. If you decide to donate or sell the item, you are taken to a page with links to a couple of resale and donation sites. 


Project Management
https://trello.com/b/ef6HhazG/lagomify

Application
https://lagomify.herokuapp.com/

GitHub
https://github.com/ariellemonica/mern-lagomify