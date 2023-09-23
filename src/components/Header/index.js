import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'

const Header = () => {
  const hi = 8

  return (
    <div className="header-container">
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695201554/Group_7399_tj78al.png"
        alt="movies"
        className="movies"
      />
      <p className="home-para">Home</p>
      <p className="popular-para">Popular</p>
      <HiOutlineSearch className="search-icon" />
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695374031/Mask_Group_zdn2jk.png"
        alt="avatar"
        className="avatar"
      />
    </div>
  )
}
export default Header
