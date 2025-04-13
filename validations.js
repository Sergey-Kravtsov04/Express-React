import {body} from "express-validator"

export const registerValidation = [
    body("fullName").isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:5}),
    body("avatarUrl").optional().isURL(),
    body("major_id").optional()
]

export const loginValidation = [
    body("fullName").isLength({min:3}),
    body("email").isEmail(),
]

export const majorCreateValidation = [
    body("title").isLength({min:3}),
    body("description").isLength({min:3})
]
