import Header from '@/components/common/Header'
import Sidebar from '@/components/common/Sidebar'


export default function layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex overflow-hidden h-screen bg-background/5">
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

