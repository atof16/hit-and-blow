import { Switch } from '@headlessui/react'
import { MoonIcon } from '@heroicons/react/solid'

export const DarkModeToggle = (prop) => {
    return (
        <div className="flex justify-center items-center">
        <Switch.Group>
            <div className="flex items-center py-4">
                <Switch.Label>
                    <MoonIcon className="h-5 w-5 text-yellow-400 mr-1" />
                </Switch.Label>
                <Switch
                checked={prop.enabled}
                onChange={prop.onChange}
                className={`${prop.enabled ? 'bg-yellow-400' : 'bg-gray-200'}
                    relative inline-flex flex-shrink-0 h-[24px] w-[52px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${prop.enabled ? 'translate-x-7' : 'translate-x-0'}
                    pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-300`}
                />
                </Switch>
            </div>
        </Switch.Group>
        </div>
    )
}