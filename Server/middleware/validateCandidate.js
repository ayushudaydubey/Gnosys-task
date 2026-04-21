import { body } from "express-validator";

export const validateCandidate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),


  body("phone")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Phone must be 10 digits and start with 6, 7, 8, or 9"),
];