

document.getElementById('verificationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var poolData = {
        UserPoolId: 'us-east-1_qKsrXJSBS', // Your user pool id here
        ClientId: '1t5h9lfrdf662ca5jvnnsb9etb' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var email = document.getElementById('emailverify').value;
    var code = document.getElementById('codeInputVerify').value;
    
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: toUsername(email),
        Pool: userPool
    });

    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        } else {
            console.log('Confirmation result:', result);
            console.log('Cognito Post Confirmation event:', JSON.stringify(event, null, 2));
            openModal(); // Call this function when the action is successful
            // setTimeout(function() {
            //     window.location.href = '/index.html'; // Redirect URL
            //}, 3000); // Delay in milliseconds (3000ms = 3 seconds)
        }
    });

    
});