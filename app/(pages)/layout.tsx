import Header from '@/components/common/header'
import Sidebar from '@/components/common/sidebar'
import { Toaster } from 'sonner'


export default function layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex overflow-hidden h-screen bg-background/5">
      <Toaster />
      <Sidebar />
      <div className="w-full">
        <Header />
        <div>
          {children}  
        </div>
      </div>
    </div>
  )
}

