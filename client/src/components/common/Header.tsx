import UserMenu from "../user/UserMenu"
import Logo from "./Logo"

const Header = () => {
  return (
    <div className="border-b-2 p-4 flex justify-between items-center w-full">
        <Logo />
        <UserMenu />
    </div>
  )
}

export default Header
