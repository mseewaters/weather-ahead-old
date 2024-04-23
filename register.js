function toUsername(email) {
    return email.replace('@', '-at-');
}
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Optional: Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
            window.location.href = '/verify.html';
        });
    } else {
        alert('Passwords do not match');
    }

});


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
            openModal(); // Call this function when the action is successful
            window.location.href = '/index.html';
        }
    });

    
});