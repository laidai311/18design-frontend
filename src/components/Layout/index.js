import Header from "@/components/Layout/Header";

export default function DefaultLayout({children}) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}