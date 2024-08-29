'ues client'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva} from 'class-variance-authority'
import { cn } from '@/utils/utils'



const buttonVariants = cva (
    'rounded-md bg-gray-900 text-white transition-transform hover:scale-105',
    {
        variants: {
            variant: {
                default: '',
                pagination: 'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                chapterNav: 'flex items-center justify-center',
                genreMain: 'px-4 py-2 text-sm font-medium',
                genreOption: 'px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                toTheTop: 'sticky place-self-end md:mx-12 md:bottom-12 mx-3 bottom-3',
            },
            size: {
                default: '',
                sm: 'md:h-12 md:w-12 h-8 w-8',
                lg: 'md:h-24 md:w-24 h-14 w-14',
                wide: 'flex w-full justify-center content-center py-2',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

interface ButtonProps 
extends ButtonHTMLAttributes<HTMLButtonElement>, 
VariantProps<typeof buttonVariants> {}


const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, size, variant, ...props}, ref) => {
        return (
            <button 
                ref={ref}
                className={cn(buttonVariants({variant, size, className}))} 
                {...props} 
            />
        )
    }
)

export {
    Button, 
    buttonVariants
}