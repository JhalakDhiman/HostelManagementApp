
export const metadata = {
  title: "Practice",
  description: "Do or die"
}

import { AuthContextProvider } from '@context/AuthContext'
import { StudentLoginContextProvider } from '@context/StudentLoginData'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main className='bg-richblack-900 w-[100vw] h-[100vh]'>
          <AuthContextProvider>
            <StudentLoginContextProvider>
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
