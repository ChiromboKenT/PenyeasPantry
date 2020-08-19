export default function validate(values) {
    let errors = {}
    //email
    if(!values.email){
        errors.email = "Email Address is required"
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email address is invalid"
    }
    //String to be more than 8 chars
    return errors;
}