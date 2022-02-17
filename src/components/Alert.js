import { Transition } from '@headlessui/react'

export const Alert = (prop) => {
    let classes = "bg-rose-500 text-white text-md font-medium fixed top-2 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-md rounded-lg overflow-hidden"
    if (prop.alertType === "correct") {
        classes = "bg-green-300 text-white text-xl font-medium fixed top-2 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-md rounded-lg overflow-hidden"
    }
    return (
        <Transition 
        show={prop.isReveal}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
            <div className={classes}>
                <div className='p-4'>
                    <p>{prop.message}</p>
                </div>
            </div>
        </Transition>
    )
} 