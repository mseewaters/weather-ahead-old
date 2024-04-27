
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var poolData = {
        UserPoolId: 'us-east-1_qKsrXJSBS', // Your user pool id here
        ClientId: '1t5h9lfrdf662ca5jvnnsb9etb' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

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