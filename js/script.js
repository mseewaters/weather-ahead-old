// Include AWS SDK
// <script src="cognitosdk.js"></script>

// Initialize AWS Cognito
AWS.config.region = 'us-east-1';

var poolData = {
    UserPoolId: 'us-east-1_qKsrXJSBS',
    ClientId: '1t5h9lfrdf662ca5jvnnsb9etb'
};

var userPool;
userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = "tech_dev" // document.getElementById('username').value;
    var email = "seewatersedge@gmail.com" // document.getElementById('email').value;
    var password = "Password!1" // document.getElementById('password').value;
    
    console.log(username);

    var attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email })
    ];

    console.log(attributeList);

    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('User registered: ' + cognitoUser.getUsername());
        alert('Registration successful! Please check your email to verify your account.');
    });
});


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