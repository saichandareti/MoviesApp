import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const ContactUs = () => (
  <>
    <div className="contact-con">
      <FaGoogle className="google-icon" />
      <FaTwitter className="google-icon icon-margin" />
      <FaInstagram className="google-icon icon-margin" />
      <FaYoutube className="google-icon icon-margin" />
    </div>
    <p className="contact-us">Contact Us</p>
  </>
)
export default ContactUs
