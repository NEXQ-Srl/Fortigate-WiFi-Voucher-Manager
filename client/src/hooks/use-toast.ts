import { ToastProps } from '@/types/props/ToastProps'

export function toast(props: ToastProps) {
    //console.log(`Toast: ${props.title} - ${props.description}`)
    alert(`${props.title}: ${props.description}`)
}  