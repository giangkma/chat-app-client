import React, { FC } from 'react';

type IProps = {
    onAgree: () => void;
    onCancel: () => void;
    title: string;
};

export const ModalConfirmExit: FC<IProps> = ({ onAgree, onCancel, title }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-black bg-opacity-75 z-50"></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-lightPeach rounded-30px px-20 py-16 pb-8 text-woodyBrown">
                        <p>{title}</p>
                        <div className="mt-5 text-sm mb-8">
                            <button
                                type="button"
                                onClick={onAgree}
                                className="px-8 py-1 rounded-full outline-none focus:outline-none border-1.6px border-woodyBrown mr-3 hover:bg-woodyBrown hover:text-white transition duration-200"
                            >
                                Ja
                            </button>
                            <button
                                type="button"
                                className="outline-none focus:outline-none hover:underline"
                                onClick={onCancel}
                            >
                                Angre
                            </button>
                        </div>
                        <p>Slapp av, vi lagrer arbeidet ditt!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
