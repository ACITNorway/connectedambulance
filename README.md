# Connected Ambulance IoT Demo on Bluemix with Google Glasses

## How to set up the demo
This "How to" explains how to set up your own instance of the Connected Ambulance IoT Demo on Bluemix with Google Glasses.
The following steps must be followed in order for a successful setup.

### 1. Deploy to Bluemix
Click the ***"Deploy to Bluemix""***-button.
  - Click Login
  - Change App name, Region, Organization, Space to whatever you want
  - Click Deploy
  - Wait approx 5min, grab yourself a coffee :)
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/langz/connectedambulance.git)

### 2. Google Authentication
  - Now that the application is deployed, grab the url of your application and update the magic-stuff on https://console.developers.google.com

### 3. Update the Node-Red Flow
  - Go to http://yourappname.mybluemix.net/red/
  - Open the node called ***"Context Variable""***
    - Change the Variable ***"Context Variable""***
    - Change the variable ***"Context Variable""***
    - Click the ***"OK""***-button in the bottom right corner
  - Click the ***"Deploy""***-button in the top right corner

### 4. Auth
  - Go to http://yourappname.mybluemix.net/auth
  - Login with the Google-Account you just used to create credentials with
  - If successful, you will see "User is authenticated with Google with userId/name: yourUserId/yourAccountName"

### 5. Run the demo
  - Go to http://yourappname.mybluemix.net/operations
