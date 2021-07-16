// import { IsEmail, MinLength, IsString } from 'class-validator';

// export class UserAuthInfo {
//     @IsEmail()
//     email!: string;

//     @IsString()
//     @MinLength(8)
//     password!: string;
// }

import * as yup from 'yup';

export const LoginFormSchema = yup.object({
    username: yup.string().required('Hãy nhập username'),
    password: yup.string().required('Hãy nhập mật khẩu'),
});

export const ProfileFormSchema = yup.object({
    name: yup.string().required('Hãy nhập tên'),
    username: yup.string(),
});

export const ChangePassFormSchema = yup.object({
    password: yup.string().required('Hãy nhập mật khẩu cũ'),
    newPassword: yup.string().required('Hãy nhập mật khẩu mới'),
    reNewPassword: yup
        .string()
        .required('Hãy nhập lại mật khẩu mới')
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu mới phải giống nhau'),
});

export const RegisterFormSchema = yup
    .object({
        // name: yup.string().required('Hãy nhập tên'),
    })
    .concat(LoginFormSchema);

export type ChangePassForm = yup.InferType<typeof ChangePassFormSchema>;
export type LoginForm = yup.InferType<typeof LoginFormSchema>;
export type ProfileForm = yup.InferType<typeof ProfileFormSchema>;
export type RegisterForm = yup.InferType<typeof RegisterFormSchema>;
