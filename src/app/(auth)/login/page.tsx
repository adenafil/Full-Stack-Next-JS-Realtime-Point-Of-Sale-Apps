import { Metadata } from "next"
import Login from "./_components/login"


export const metaData: Metadata = {
    title: 'WPU Cafe | Login'
}

export default function LoginPage() {
    return <Login/>
}