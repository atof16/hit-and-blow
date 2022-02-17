import { Dialog, Transition } from '@headlessui/react';
import { RefreshIcon, ExclamationCircleIcon} from '@heroicons/react/outline'

export const ConfirmDialog = (prop) => {
    return (
        <div className="px-2">
            <div>
                <button
                className="py-2 px-2"
                type="button"
                onClick={prop.openModal}
                >
                <RefreshIcon className="h-8 w-8" />
                </button>
            </div>
            
        <Transition appear show={prop.isConfirmDialogOpen}>
            <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={prop.closeModal}
            >
            <div className="min-h-screen px-4 text-center flex justify-center items-center">
                <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>

                <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-100"
                >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden item-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="flex justify-between mb-2">
                        <Dialog.Title
                        as="h2"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                        最初からやり直しますか？
                        </Dialog.Title>
                    </div>
                    <div className="flex text-sm mb-2 text-left">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        <div>答えと推測結果がすべてリセットされます。</div>
                    </div>
                    <div className="flex justify-center">
                        <button
                        type="button"
                        className="px-8 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-md"
                        onClick={prop.resetModal}
                        >
                            はい
                        </button>
                        <div className="p-2"></div>
                        <button
                        type="button"
                        className="px-8 text-white font-bold bg-red-500 hover:bg-red-700 rounded-md"
                        onClick={prop.closeModal}
                        >
                            いいえ
                        </button>
                    </div>
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    </div>
    )
}