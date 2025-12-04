import { PageHeader } from "@/components/layout/page-header"

export default function BackOfficeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PageHeader />
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    )
}
