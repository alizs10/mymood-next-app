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
