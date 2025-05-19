import {body} from "express-validator"

export const registerValidation = [
    body("fullName").isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:5}),
    // body("major").optional().isMongoId(),
    body("avatarUrl").optional().isURL(),
]

export const loginValidation = [
    body("email").isEmail(),
]

export const majorCreateValidation = [
    body("title").isLength({min:3}),
    body("description").isLength({min:3})
]
