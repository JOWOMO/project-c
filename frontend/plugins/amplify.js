import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'
// import aws_exports from '@/aws-exports'
Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.identityPoolId, 
        // REQUIRED - Amazon Cognito Region
        region: process.env.region, 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.userPoolId,
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: process.env.userPoolWebClientId, 
    }
});

Vue.use(AmplifyPlugin, AmplifyModules)

//register components individually for further use
// Do not import in .vue files
Vue.component('sign-in', components.SignIn)



