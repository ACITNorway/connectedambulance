# Connected Ambulance IoT Demo on Bluemix with Google Glasses

## How to set up the demo
This "How to" explains how to set up your own instance of the Connected Ambulance IoT Demo on Bluemix with Google Glasses.
The following steps must be followed in order for a successful setup.

### 1. Deploy to Bluemix
Click the ***"Deploy to Bluemix"*** button.
  - Click the ***"Login"*** button
  - Change the ***"App Name"***, ***"Region"***, ***"Organization"*** & ***"Space"*** fields to what you want.
  - Write down the ***"App Name"*** in a temporary document, this information is needed in the next step.
  - Click the ***"Deploy"*** button, located bottom right.
  - Wait approx 5min for the application to be deployed, meanwhile you can start on the next step.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/langz/connectedambulance.git)

### 2. Configure a Google Account
  - Go to https://console.developers.google.com/project
  - Sign in with your existing Google Account or create a new one.
  - Click on the ***"Create project"*** button
    - Fill in the ***"Project name"*** field and click ***"Create"***
  - Click on the ***"Overview"*** button in the left-side menu
  - Enable the following APIs(Search and click ***"Enable API"*** for each API):
    - Google Maps Geocoding API
    - Google Mirror API
    - Google+ API
  - Click on the ***"Credentials"*** button in the left-side menu
  - Click ***"Create credentials"***
    - Choose ***"OAuth client ID"***
  - Click ***"Configure consent screen"*** button if you must set a product name on the consent screen
  - Fill in the ***"Product name shown to users"*** field with a name, i.e ***"ConnectedAmbulanceApp"***
  - Click the ***"Save"*** button and it will redirect you back to where you left off.
  - Choose ***"Application Type"*** to be ***"Web application"***
  - Fill in the following fields:
    - ***"Name"***, i.e. ***"ConnectedAmbulanceApp"***
    - ***"Restrictions"***:
      - In ***"Authorized Javascript Origins"***, add the following addresses:
        - ***"https://mirror-api-playground.appspot.com"***
        - ***"http://yourAppName.mybluemix.net"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
      - In ***"Authorized Redirect URIs"***, add the following address:
        - ***"http://yourAppName.net/oauth2callback"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Click ***"Create"***, you will then get a pop-up with your ***"client ID"*** and ***"client secret"***. Save these in a temporary file, so that they are easy to access. These credentials is needed in the next stage of this setup guide.

### 3. Update the Node-Red Flow
  - Go to ***"http://yourAppName.mybluemix.net/red/"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Open the node called ***"Context Variable"***, located in the top left corner of your flow ***"Flow 1"***
    - Change the Variable ***"context.global.CLIENT_ID"*** to the value of ***"Client ID"*** which you acquired from Google APIs in Step 2
    - Change the variable ***"context.global.CLIENT_SECRET"*** to the value of ***"Client secret"*** which you acquired from Google APIs in Step 2
    - Click the ***"OK"*** button in the bottom right corner
  - Click the ***"Deploy"*** button in the top right corner

### 4. Auth
  - Go to ***"http://yourAppName.mybluemix.net/auth"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Login with the Google-Account you just used to create credentials with
  - If successful, you will see "User is authenticated with Google with userId/name: yourUserId/yourAccountName"

### 5. Run the demo
  - Go to ***"http://yourAppName.mybluemix.net/operations"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
