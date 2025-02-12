const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const status = emailRegex.test(email.toLowerCase());
    if(!status) return { status: status, message: "Invalid Email"}
    return { status: status, message: "valid email" }
}

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
    const status = passwordRegex.test(password);
    if(!status) return { status: status, message: "Please choose another password."}
    return { status: true, message: "Valid password" }
}

module.exports = { validateEmail, validatePassword }