import { IsNotEmpty, IsString } from 'class-validator';

export class AuthFormInfo {
    @IsString()
    @IsNotEmpty({ message: 'Hãy nhập tài khoản' })
    username!: string;

    @IsString()
    @IsNotEmpty({ message: 'Hãy nhập mật khẩu' })
    password!: string;
}
