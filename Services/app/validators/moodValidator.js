import validator from 'validator';

export const moodValidator = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.mood)) {
        isFormValid = false;
        errors.mood = "مود الزامی می باشد";
    } else if (!validator.isLength(payload.mood, { min: 3, max: 700 })) {
        isFormValid = false;
        errors.mood = "مود نمی تواند کمتر از 3 حرف و بیشتر از 700 حرف باشد";
    }

    return {
        success: isFormValid,
        errors
    };
}
