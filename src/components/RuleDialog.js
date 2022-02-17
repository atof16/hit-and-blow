import { Dialog, Transition } from '@headlessui/react';
import { ResultTable } from './ResultTable';
import { QuestionMarkCircleIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline'

export const RuleDialog = (prop) => {
    return (
        <div className="px-2">
            <div>
                <button
                className="py-2 px-2"
                type="button"
                onClick={prop.openModal}
                >
                <QuestionMarkCircleIcon className="h-8 w-8" />
                </button>
            </div>
            
        <Transition appear show={prop.isRuleDialogOpen}>
            <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={prop.closeModal}
            >
            <div className="min-h-screen px-4 text-center flex justify-center py-20">
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
                    <div className="flex justify-between mb-4">
                        <div className="mx-4"></div>
                        <Dialog.Title
                        as="h2"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                        Hit and Blowとは？
                        </Dialog.Title>
                        <button
                        type="button"
                        className="top-0 order-last"
                        onClick={prop.closeModal}
                        >
                            <XIcon className="h-7 w-7" />
                        </button>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 text-left">
                            <div>Hit and Blowとは重複のない4桁の数字を推測するゲームです。</div>
                            <div>あなたの各推測に対して、数字と桁の位置が共に合っていれば<span className="text-red-500 font-bold">HIT</span>、数字だけ合っており桁の位置が違うときは<span className="font-bold text-cyan-500">BLOW</span>といったヒントが与えられます。</div>
                        </div>
                    </div>
                    <div className="text-sm text-left font-bold text-gray-500 mt-4">
                            <h3>例: 答えが2564のとき</h3>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 text-left">
                            あなたの推測が2485であれば、2がHIT、4と5がそれぞれBLOWであるため、
                            結果は以下のように表示されます。
                        </div>
                    </div>
                    <div className="mt-3 mb-4">
                        <ResultTable 
                        lastResult={['2485']}
                        SOLUTION={'2564'}
                        />
                    </div>
                    <div className="text-sm text-left bg-rose-300 text-gray-500 rounded-md">
                        <InformationCircleIcon className="h-5 w-5" />
                        <div className="px-2 py-2">
                            推測は重複のない4桁の数字でなければなりません。
                        </div>
                    </div>
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    </div>
    )
}