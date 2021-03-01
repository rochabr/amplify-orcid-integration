# Amplify Auth with ORCID integration

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initial setup

### Amplify

In the project directory, run:

```
amplify init

Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project <project-name>
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

### Cognito

Open the AWS console and navigate to Cognito, then follow [this guide](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html) to configure OIDC Identity Providers to a User Pool.

### Test

From the terminal, run:
```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

