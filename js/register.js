
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var poolData = {
        UserPoolId: _config.cognito.userPoolId, // Your user pool id here
        ClientId: _config.cognito.userPoolClientId // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var nickname = document.getElementById('nickname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('confirm-password').value;

    var attributeList = [];
    
    var dataEmail = {
        Name: 'email',
        Value: email
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    var dataNickname = {
        Name: 'nickname',
        Value: nickname
    };
    var attributeNickname = new AmazonCognitoIdentity.CognitoUserAttribute(dataNickname);
    attributeList.push(attributeNickname);


    if (password === password2) {
        userPool.signUp(toUsername(email), password, attributeList, null, function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var cognitoUser = result.user;
            console.log('User registration successful: ' + cognitoUser.getUsername());
            openModal(); // Call this function when the action is successful
            setTimeout(function() {
                window.location.href = '/verify.html'; // Redirect URL
            }, 1500); // Delay in milliseconds (3000ms = 3 seconds)
        });
    } else {
        alert('Passwords do not match');
    }

});
