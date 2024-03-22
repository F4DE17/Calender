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

        // Create some state-management login system

        // Forward to the calender
        document.location = "../calender"
    }
}


async function username() {
    // Should probably somehow clean input seems how rn we are passing native sql right to our db xD
    let input = document.querySelector("#input > div > input[type=text]");
    // Send request to the server to check if username is valid
    let data = await post("/read", {sql: `SELECT email FROM user WHERE email = "${input.value}";`});
    log(data)
        // If it is valid, go to the next page
    if(data.length > 0){
        email = input.value;
        // Make incorect text go away bc they got one right :)
        q("#incorrect").style.display = "none";
        // Clear input
        input.value = "";

        // Apply animation to make the effect of switching to a new thing
        let wrapper = q("#wrapper");
        wrapper.style.animation = "switch-wrapper 1000ms ease-in-out infinite alternate-reverse;"
        
        wrapper.style.tranform = "rotateY(180deg)"

        let duration = 1000;

        wrapper.animate(
            [{ transform: "rotateY(0)" },
            { transform: "rotateY(360deg)" }],
            {duration: duration, iterations: 1}
        )
        // Set the fields to show password input
        // halfway the duration through we want to change the fields
        
        setTimeout(() => {
            q("#email-phone").innerText = "Password"
            q("#options > button").innerText = "Sign in"
            q("#options > button").onclick = password
        }, duration/2)
    }
    // Else, tell the user login info is is incorrect
    else {
        q("#incorrect").style.display = "unset";
    }

}