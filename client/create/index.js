var email;

async function password() {
    let input = document.querySelector("#input > div > input[type=text]");
    console.log(input.value)
    // Make sure the password is correct
    // Send request to the server to check if username is valid
    let data = await post("/read", {event: "authorize", values: {password: input.value, email: email}});
    log(data)
    if(data?.status === 404) {
        q("#incorrect").style.display = "unset";
    }else {
        // We are logged in!
        // Make a cute sign in animation <3

        // Forward to the calender
        document.location = "../calender"
    }
}


async function createAccount() {
    // Get all inputs

    // If the inputs are valid then send it to the server to create the account
    let email = q("#email").value
    let firstname = q("#firstname").value
    let lastname = q("#lastname").value
    let password = q("#password").value
    let birthday = q("#birthday").value

    // Check to make sure all values are filled out except bday
    if(!email || !firstname || !lastname || !password) {
        // Show the incorrect
        document.querySelector(".invalid").style.visibility = "visible";
        return;
    }


    // If it is a success the account will be returned and we will be logged in
    if(data?.status === 404) {
        q("#incorrect").style.display = "unset";
    }else {
        // We are logged in!
        // Make a cute sign in animation <3

        // Forward to the calender
        document.location = "../calender"
    }
}