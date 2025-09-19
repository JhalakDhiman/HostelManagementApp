
export const metadata = {
  title: "Practice",
  description: "Do or die"
}

import { AuthContextProvider } from '@/context/AuthContext'
import { StudentLoginContextProvider } from '@/context/StudentLoginData'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import Navbar from '@/components/common/Navbar'

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main className='bg-richblack-900 w-[100vw] min-h-[100vh]'>
          <AuthContextProvider>
            <StudentLoginContextProvider>
              <Navbar/>
              {children}
              <Toaster />
            </StudentLoginContextProvider>
          </AuthContextProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
