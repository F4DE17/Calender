async function createAccount() {
    // Get all inputs

    // If the inputs are valid then send it to the server to create the account
    let email = q("#email").value
    let firstname = q("#firstname").value
    let lastname = q("#lastname").value
    let password = q("#password").value
    let birthday = q("#birthday").value

    // Check to make sure all values are filled out except bday
    if(!email || !firstname || !lastname || !password || !birthday) {
        // Show the incorrect
        document.querySelector(".invalid").innerText = "Invalid information"
        document.querySelector(".invalid").style.visibility = "visible";
        return;
    }

    // Send data to the server to create our new account
    let data = await Req.create("account", {email, password, firstname, lastname, birthday})


    // If we dont recieve our new account back something went wrong
    // Log error and inform user
    if(data.status && data.status >= 400) {
        document.querySelector(".invalid").style.visibility = "visible";
        document.querySelector(".invalid").innerText = "Error"

        console.log("ERROR", data.error)
        return;
    }

    // We are logged in!
    // Create some state-management login system

    // Forward to calender js, and tell it to give the user a guide
    console.log(data)
    document.location = "../calendar";
}