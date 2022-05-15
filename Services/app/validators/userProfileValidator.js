import validator from 'validator';

export const bioValidator = payload => {
    const errors = {};
    let isFormValid = true;

    if (!validator.isEmpty(payload.bio) && !validator.isLength(payload.bio, { min: 0, max: 70 })) {
        isFormValid = false;
        errors.bio = "درباره شما نمی تواند بیشتر از 70 حرف باشد";
    }

    return {
        success: isFormValid,
        errors
    };
}

export const changePasswordValidation = payload => {
    const errors = {};
    let isFormValid = true;


    if (validator.isEmpty(payload.old_password)) {
        isFormValid = false;
        errors.old_password = "کلمه عبور فعلی الزامی می باشد";
    }

    if (validator.isEmpty(payload.password)) {
        isFormValid = false;
        errors.password = "کلمه عبور جدید الزامی می باشد";
    } else if (!validator.isStrongPassword(payload.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
        isFormValid = false;
        errors.password = "کلمه عبور جدید شما ضعیف می باشد";
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
};