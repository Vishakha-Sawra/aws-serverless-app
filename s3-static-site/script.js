document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var subject = document.getElementById("subject").value.trim();
        var message = document.getElementById("message").value.trim();

        var emailRegex = /^\S+@\S+\.\S+$/;
        if (!name || !email || !subject || !message || !emailRegex.test(email)) {
            alert("Please fill in all fields with valid inputs.");
            return;
        }

        var formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };

        submitForm(formData);
    });

function submitForm(formData) {
    fetch("https://kn2h2qbh8i.execute-api.ap-southeast-2.amazonaws.com/dev/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(function (response) {
            if (response.ok) {
                window.location.href = "success.html";
            } else {
                window.location.href = "fail.html";
            }
        })
        .catch(function (error) {
            console.error(error);
            window.location.href = "fail.html";
        });
}
