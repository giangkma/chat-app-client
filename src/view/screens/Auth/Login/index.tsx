import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { DataAuth } from 'src/domain/user';
import { AuthFormInfo } from 'src/domain/user/schema';
import { classValidatorFormResolverFactory } from 'src/helper/form';
import { showToatify } from 'src/helper/toat';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { InputText } from 'src/view/components/input/InputText';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useAuth } from 'src/view/hooks';
import { useMessageData } from 'src/view/hooks/message';
import { useIsMountedRef } from 'src/view/hooks/useIsMountedRef';
import { Screen } from 'src/view/routes/Router';

const authFormInfoValidatorResolver = classValidatorFormResolverFactory<
    AuthFormInfo
>(AuthFormInfo);

const Login: FC = () => {
    const history = useHistory();
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const { onLogin } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const mountedRef = useIsMountedRef();

    const { register, handleSubmit, errors } = useForm<AuthFormInfo>({
        resolver: authFormInfoValidatorResolver,
        mode: 'onChange',
    });

    const onSubmit = async (data: DataAuth): Promise<void> => {
        try {
            setLoading(true);
            await onLogin(data);
            showToatify('success', 'Chào mừng bạn !');
            history.push(Screen.Chat);
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            if (!mountedRef.current) {
                return;
            }
            setLoading(false);
        }
    };

    return (
        <>
            <Spinner loading={loading} />
            <div className="absolute top-0 flex z-10 w-full item-center justify-between p-5 lg:p-10">
                <div className="sm:block hidden">
                    <Link to={Screen.Register}>
                        <PrimaryButton
                            title="Đăng ký"
                            className="w-full px-10 py-2"
                            color="green"
                        />
                    </Link>
                </div>
            </div>
            <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <div className="text-lightPeach sm:text-xl text-lg">
                    <h1 className="sm:text-3xl text-2xl">Xin chào !</h1>
                    <h1>Hãy đăng nhập để tiếp tục</h1>
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
                        <InputText
                            msg={errors.username}
                            register={register}
                            name="username"
                            placeholder="Tên đăng nhập"
                        />
                        <div className="mt-4">
                            <InputPassword
                                msg={errors.password}
                                register={register}
                                name="password"
                                placeholder="Mật khẩu"
                            />
                        </div>

                        <PrimaryButton
                            title="Đăng nhập"
                            className="w-full py-2"
                            submit
                        />
                        <div className="sm:mt-6 mt-4 sm:hidden block">
                            <Link to={Screen.Register}>
                                <PrimaryButton
                                    title="Đăng ký"
                                    className="w-full px-10 py-2"
                                    color="green"
                                />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
