# CS132 React-Twitter Stencil README

## SETUP

If node_modules isn't installed you will have to run
	
	npm install

This will install all the dependencies you need. Will take a little while.

Now to start the react app run

	npm run boot

What this does is run npm run clean, npm run build and npm run server. This cleans (removes dist/ and npm-debug.log), builds the application with hot loading, then runs the server all in one command. Read the package.json for more information

Then you can just visit localhost:8080 in your web browser to see the web application in action!

## Important files

### .babelrc 
defines a few things like standard we are using (es2015 and react) as well as hot reloading

### package.json 
includes dependencies (for our purposes, devDependencies and dependencies are the same) as well as some npm scripts and some information about the project. You will be learning more about this file in future assignments

### webpack.config.js
defines a how webpack should "pack" everything together in order to build the application that ends up in /dist. Feel free to read this file and learn more about it online! Webpack is a versatile tool for building web applications

## Directory Structure

### /app/css
This is where all the css files live. If you want to edit the CSS that is applied to all the pages, edit it here

### /app/html
This is where the html where the entire application is rendered is held. You will notice quite a few things are loaded in here. Specifically these are:
* Bootstrap v3.3.7
* JQuery v3.1.1
* Google Fonts
* Font Awesome v4.7.0
Bootstrap and JQuery are very useful and Google Fonts and Font Awesome can be useful if you want to do a little bit of design 

### /app/js
This is where all the javascript and components are held. This folder has index.jsx which contains all the routes that are loaded into the app as well as a components folder which holds all the components required for this application. 
