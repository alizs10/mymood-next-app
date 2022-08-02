import validator from 'validator';

export const emailValidator = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.email)) {
        isFormValid = false;
        errors.email = "ایمیل الزامی می باشد";
    } else if (!validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "ایمیل صحیح نمی باشد";
    }

    return {
        success: isFormValid,
        errors
    };
}

export const passwordValidator = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.password)) {
        isFormValid = false;
        errors.password = "کلمه عبور الزامی می باشد";
    }
    return {
        success: isFormValid,
        errors
    };
}

export const vcodeValidator = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.verification_code)) {
        isFormValid = false;
        errors.verification_code = "کد تایید الزامی می باشد";
    }

    if (validator.isEmpty(payload.verification_code)) {
        isFormValid = false;
        errors.verification_code = "کد تایید الزامی می باشد";
    } else if (!validator.isNumeric(payload.verification_code)) {
        isFormValid = false;
        errors.verification_code = "کد تایید باید از نوع عدد باشد";
    } else if (!validator.isLength(payload.verification_code, { min: 6, max: 6 })) {
        isFormValid = false;
        errors.verification_code = `کد تایید باید 6 عدد باشد`;
    }

    return {
        success: isFormValid,
        errors
    };
}

export const passwordWithConfirmationValidator = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.password)) {
        isFormValid = false;
        errors.password = "کلمه عبور الزامی می باشد";
    } else if (!validator.isStrongPassword(payload.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
        isFormValid = false;
        errors.password = "کلمه عبور شما ضعیف می باشد";
    }


    if (validator.isEmpty(payload.password_confirmation)) {
        isFormValid = false;
        errors.password_confirmation = "تکرار کلمه عبور الزامی می باشد";
    } else if (!validator.equals(payload.password, payload.password_confirmation)) {
        isFormValid = false;
        errors.password_confirmation = "تکرار کلمه عبور با کلمه عبور شما مطابقت ندارد";
    }

    return {
        success: isFormValid,
        errors
    };
}