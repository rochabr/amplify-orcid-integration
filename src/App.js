
 import './App.css';
 //import { withAuthenticator, AmplifySignOut } from 'aws-amplify-react';
 //import Amplify from 'aws-amplify';
 //import Aws_exports from './aws-exports';
 import '@aws-amplify/ui/dist/style.css';
 import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';

  Amplify.configure({
    Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

      // REQUIRED - Amazon Cognito Region
      region: 'XX-XXXX-X',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'XX-XXXX-X_abcd1234',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',

       // OPTIONAL - Hosted UI configuration
      oauth: {
          domain: 'your_cognito_domain_without_http://',
          scope: ['openid'],
          redirectSignIn: 'SIGN IN URL(THE SAME ONE CONFIGURED ON ORCID)',
          redirectSignOut: 'SIGN OUT URL',
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
  }
});

  function App() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      Hub.listen('auth', ({ payload: { event, data } }) => {
        switch (event) {
          case 'signIn':
          case 'cognitoHostedUI':
            getUser().then(userData => setUser(userData));
            break;
          case 'signOut':
            setUser(null);
            break;
          case 'signIn_failure':
          case 'cognitoHostedUI_failure':
            console.log('Sign in failure', data);
            break;
        }
      });
  
      getUser().then(userData => setUser(userData));
    }, []);
  
    function getUser() {
      return Auth.currentAuthenticatedUser()
        .then(userData => userData)
        .catch(() => console.log('Not signed in'));
    }
  
    return (
      <div>
        <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
        {user ? (
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => Auth.federatedSignIn({provider: '<IDP Name from cognito>'})}>Federated Sign In</button>
        )}
      </div>
    );
  }
  
  export default App;
