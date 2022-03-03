import { Dialog, Transition } from '@headlessui/react';
import { ResultItem } from './ResultItem';
import { QuestionMarkCircleIcon, ExclamationCircleIcon, XIcon } from '@heroicons/react/outline'
import {
  YOUR_GUESS_HEAD,
  HIT_HEAD,
  BLOW_HEAD
} from '../constant/strings';

export const RuleDialog = (prop) => {
  return (
    <div>
      <div>
        <button
        className="py-2 px-2 dark:text-white"
        type="button"
        onClick={prop.openModal}
        >
          <QuestionMarkCircleIcon className="h-7 w-7" />
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden item-center align-middle transition-all transform bg-white dark:bg-zinc-800 shadow-xl rounded-2xl">
              <div className="flex justify-between mb-4">
                <div className="mx-4"></div>
                  <Dialog.Title
                  as="h2"
                  className="text-lg font-medium leading-6 dark:text-white"
                  >
                    Hit and Blowとは？
                  </Dialog.Title>
                  <button
                  type="button"
                  className="top-0 order-last dark:text-white"
                  onClick={prop.closeModal}
                  >
                    <XIcon className="h-7 w-7" />
                  </button>
                </div>
                <div>
                  <div className="text-sm text-left dark:text-white">
                    <div>Hit and Blowとは重複のない4桁の数字を推測するゲームです。</div>
                    <div>あなたの各推測に対して、数字と桁の位置が共に合っていれば<span className="text-red-500 font-bold">HIT</span>、数字だけ合っており桁の位置が違うときは<span className="font-bold text-cyan-500">BLOW</span>といったヒントが与えられます。</div>
                  </div>
                </div>
                <div className="text-sm text-left font-bold text-gray-500 mt-4 dark:text-white">
                  <h3>例: 答えが2564のとき</h3>
                </div>
                <div>
                  <div className="text-sm text-left dark:text-white">
                    あなたの推測が2485であれば、2が<span className="text-red-500 font-bold">HIT</span>、4と5がそれぞれ<span className="font-bold text-cyan-500">BLOW</span>であるため、
                    結果は以下のように表示されます。
                  </div>
                </div>
                <div className="mt-3 mb-4">
                  <table className="relative w-full">
                    <thead>
                      <tr>
                        <th className="bg-white dark:bg-zinc-800 sticky top-0 px-6"></th>
                        <th className="bg-white dark:bg-zinc-800 sticky top-0 text-xl dark:text-white">{YOUR_GUESS_HEAD}</th>
                        <th className="bg-white dark:bg-zinc-800 sticky top-0 text-xl px-6 text-red-500">{HIT_HEAD}</th>
                        <th className="bg-white dark:bg-zinc-800 sticky top-0 text-xl text-cyan-500">{BLOW_HEAD}</th>
                      </tr>
                    </thead>
                    <tbody>
                        <ResultItem
                        key={0}
                        index={0}
                        result={"2485"}
                        SOLUTION={"2564"}
                        />
                    </tbody>
                  </table>
                </div>
                <div className="text-sm text-left bg-rose-300 rounded-md pb-2">
                  <ExclamationCircleIcon className="h-5 w-5" />
                  <div className="px-2 py-2">
                    推測は重複のない4桁の数字にしてください。
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