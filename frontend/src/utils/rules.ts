import * as yup from "yup";
import { InferType } from "yup";

export const widgetSchema = yup.object({
    name: yup.string().nullable(),
    email: yup.string().required("Enter a valid email address.").email("Enter a valid email address."),
    message: yup.string().required("Enter a value."),
});

export type Widget = InferType<typeof widgetSchema>;
