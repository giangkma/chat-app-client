import { yupResolver } from '@hookform/resolvers';
import { default as React, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { DataRegister } from 'src/domain/user';
import { RegisterForm, RegisterFormSchema } from 'src/domain/user/schema';
import { showToatify } from 'src/helper/toat';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { InputText } from 'src/view/components/input/InputText';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { Screen } from 'src/view/routes/Router';

const Register: FC = () => {
    const history = useHistory();
    const { onRegister } = useAuth();
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, errors } = useForm<RegisterForm>({
        resolver: yupResolver(RegisterFormSchema),
    });

    const onSubmit = async (data: DataRegister): Promise<void> => {
        try {
            setLoading(true);
            await onRegister(data);
            showToatify('success', 'Chào mừng bạn !');
            history.push(Screen.Chat);
        } catch (error) {
            setMessage({ message: 'Tên đăng nhập đã tồn tại' });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-woodyBrown h-full">
            <Spinner loading={loading} />
            <div className=" absolute flex bg-transparent z-10 top-0 w-full item-center justify-between p-5 lg:p-10">
                <div className="sm:block hidden">
                    <Link to={Screen.Login}>
                        <PrimaryButton
                            title="Đăng nhập"
                            className="w-full px-10 py-2"
                            color="blue"
                        />
                    </Link>
                </div>
            </div>
            <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <div className="text-lightPeach text-xl">
                    <h1>Hãy nhập đầy đủ thông tin !</h1>
                </div>
                <Alert
                    isSuccess={isSuccess}
                    message={message}
                    clearMessage={clearMessage}
                />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center justify-center w-full sm:mt-6 mt-4"
                >
                    <div className="w-75 text-xl">
                        {/* <InputText
                            msg={errors.name}
                            register={register}
                            name="name"
                            placeholder="Họ và tên"
                        /> */}
                        <div className="my-4">
                            <InputText
                                msg={errors.username}
                                register={register}
                                name="username"
                                placeholder="Tên đăng nhập"
                            />
                        </div>
                        <InputPassword
                            msg={errors.password}
                            register={register}
                            name="password"
                            placeholder="Mật khẩu"
                        />

                        <PrimaryButton
                            title="Đăng ký"
                            className="w-full py-2"
                            submit
                            color="green"
                        />
                        <div className="sm:hidden block sm:mt-6 mt-4">
                            <Link to={Screen.Login}>
                                <PrimaryButton
                                    title="Đăng nhập"
                                    className="w-full px-10 py-2"
                                    color="blue"
                                />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
