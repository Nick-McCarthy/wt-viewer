import {ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function absoluteUrl (path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export {
    absoluteUrl,
    cn
}