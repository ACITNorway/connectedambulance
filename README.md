# Connected Ambulance IoT Demo on Bluemix with Google Glasses

This "How to" explains how to set up your own instance of the Connected Ambulance IoT Demo on Bluemix with Google Glasses.
The following steps must be followed in order for a successful setup.

## How to set up and configure the demo
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/ACITNorway/connectedambulance.git)

Click the ***"Deploy to Bluemix"*** button.

![screenshot01](https://github.com/langz/ActiveDeployImages/blob/master/connected_ambulance_1.jpg)

Click the ***"Login"*** button or ***"Sign Up"***, then continue on the next step.

![screenshot02](https://github.com/langz/ActiveDeployImages/blob/master/connected_ambulance_2.jpg)

Change the ***"App Name"***, ***"Region"***, ***"Organization"*** & ***"Space"*** fields to what you want.
Click the ***"Deploy"*** button, located bottom right.

![screenshot03](https://github.com/langz/ActiveDeployImages/blob/master/connected_ambulance_3.jpg)

Wait approx 5min for the application to be deployed, meanwhile grab yourself a coffee :)

![screenshot04](https://github.com/langz/ActiveDeployImages/blob/master/connected_ambulance_4.jpg)

Click the ***"VIEW YOUR APP"*** button.

![screenshot05](https://github.com/langz/ActiveDeployImages/blob/master/connected_ambulance_5.jpg)

From this page, follow each of the steps required, for a successfully configured application.

### Running the Application Locally
If you are running the application locally, you need to enter these commands inside the directory:
1. `npm install` to install dependencies. You will get deprecation warnings, but that's okay.
2. `node --max-old-space-size=384 node_modules/node-red/red.js --settings ./settings.js -v` must be used to run the application locally

### Note about the Google Glasses
If the Google Glasses have not been used with the Google Account used in the steps you most likely have to factory reset the glasses (due to account mismatch). After the glasses are powered on, go to Settings > Info about Glasses > Tap > Factory reset. Also make sure that you are logged in on the same account on the smartphone *before* pairing the newly factory reset glasses with it.

## Need further assistance?
If you have any questions or issues, please do not hesitate to contact ACIT through acit-ww@accenture.com
