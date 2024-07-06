import Header from "@/components/common/Header"
import { FC, ReactNode } from "react"

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      { children }
    </div>
  )
}

export default BaseLayout
