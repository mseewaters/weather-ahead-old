function loginUser(email, password) {
    var authenticationData = {
        Username: toUsername(email),
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var userData = {
        Username: toUsername(email),
        Pool: new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: _config.cognito.userPoolId,
            ClientId: _config.cognito.userPoolClientId
        }),
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            console.log('Authentication successful:', result);
            var jwtToken = result.idToken.jwtToken;
            localStorage.setItem('userToken', jwtToken);
            console.log("JWT Token:", jwtToken)
            window.location.href = '/customize.html';           
            // Redirect the user to a new page or perform any other action
        },
        onFailure: function(err) {
            console.log('Authentication failed', err);
            openModal();
            // Handle authentication failure, e.g., display error message to the user
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
            // User must set a new password
            console.log('New password required');
            // Handle new password setup, e.g., redirect user to change password page
        }
    });
}

document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    loginUser(email, password);

});

