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
  - Go to https://console.developers.google.com/apis
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
For this step, the deployment, done in Step 1, must be successfully executed.
  - Go to ***"http://yourAppName.mybluemix.net/red/"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Open the node called ***"Context Variable"***, located in the top left corner of your flow ***"Flow 1"***
    - Change the variable ***"context.global.CLIENT_ID"*** from the value ***"YOUR_CLIENT_ID"*** to the value of ***"Client ID"*** which you acquired from Google APIs in Step 2
    - Change the variable ***"context.global.CLIENT_SECRET"*** from the value ***"YOUR_CLIENT_SECRET"*** to the value of ***"Client secret"*** which you acquired from Google APIs in Step 2
    - Click the ***"OK"*** button in the bottom right corner
  - Click the ***"Deploy"*** button in the top right corner

### 4. Auth
  - Go to ***"http://yourAppName.mybluemix.net/auth"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Login with the Google account you just used to create credentials with
  - If successful, you will see "User is authenticated with Google with userId/name: yourUserId/yourAccountName"

### 5. Run the demo to check if it is correctly configured
  - Go to ***"http://yourAppName.mybluemix.net/operations"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
    - You should not see a pop-up
  - Dispatch an ambulance:
    - ***"Right click"*** on a position on the map
    - ***"Left click"*** on the marker
    - Use Street View to look around, and when you are satisfied, click the ***"Dispatch Ambulance"*** button
  - Send patient information to ambulance:
    - ***"Left click"*** on the red cross in the map
    - Fill in the field ***"Patient name"*** with the value ***"John Doe"***
    - Click the ***"Magnifier Icon"*** button on the right side
      - It should then display ***"John Doe M/39"***
    - Fill in the field ***"Short description of incident"*** with any text you want
    - Click the ***"Send patient information"*** button
  - Check if the application have sent a card to your Google account
    - Go to ***"https://mirror-api-playground.appspot.com"***
    - Fill in your ***"Client ID"*** which you acquired from Google APIs in Step 2
    - Click the ***"AUTHORIZE"*** button
  - The configuration have been correct if you see a card with the text ***"Patient John Doe Critical medical data"***

### 6. Setup of Google Glasses (Optional)
  - Make sure your phone has internet access and Bluetooth is enabled
  - Download and open the MyGlass app and login with the same Google account as used earlier
  - Pair the glasses with the phone
    - if your glasses is already paired with an account, you have to factory reset the glasses
  - Connect the glasses to Wi-Fi:
    - In the MyGlass app, click on the Wi-Fi symbol in the app header
    - Select a network or add a new one
  -  You should now be able to run through the demo, as described in step 5, and see the cards on your Google Glasses.

You're Done!

That's it, you've now completed the setup of the Connected Ambulance IoT Demo on Bluemix with Google Glasses, which can be used to showcase Bluemix and IoT!

Run through the Demo, as described in step 5, how many times you would like :)

## Optional customization  
### Setting the default start location
  - Go to ***"http://yourAppName.mybluemix.net/red/"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Open the ***"OperationView"*** node:
    - Scroll down to line 95 and 96:
    - Set the ***"latitude"*** and ***"longitude"*** for your default start location
    - Click the ***"OK"*** button in the bottom right corner
  - Click the ***"Deploy"*** button in the top right corner

### Change or add test persons
  - Go to ***"http://yourAppName.mybluemix.net/red/"*** (yourAppName is the ***"App Name"*** you provided in Step 1)
  - Open the ***"Register Patients"*** node:
    - Here you can modify names, medical history, etc, or add a new patient.
    - Click the ***"OK"*** button in the bottom right corner
  - Click the ***"Deploy"*** button in the top right corner

## Need further assistance?
If you have any questions or issues, please do not hesitate to contact ACIT through acit-ww@accenture.com
