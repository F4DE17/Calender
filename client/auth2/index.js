function signIn() {
    // Make sure the password is correct

    // Make a cute sign in animation <3


    // Forward to the calender
    document.location = "../calender"
}


function submit() {
    console.log('d')
    // Send request to the server to check if username is valid

        // If it is valid, go to the next page
    if(true){
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
            q("#options > button").onclick = signIn
        }, duration/2)
    }
        // Else, tell the user it is incorrect

}