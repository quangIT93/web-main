import {
  MdAddCircleOutline,
  MdOutlineSync,
  MdOutlineLocationOn,
  MdPassword,
  MdOutlineLogout,
} from 'react-icons/md'

// @ts-ignore
import { AvatarIcon } from '#components'

import './style.scss'

const NavLogin: React.FC = () => {
  return (
    <div className="actions-login__nav">
      <div className="nav-login__user">
        <div className="login__avatar">
          <AvatarIcon />
        </div>
        <div className="nav-info__user">
          <h2>Trần Văn An</h2>
          <p>vanan.aiw@gmail.com</p>
        </div>
      </div>
      <div className="nav-login__pay">
        <div className="login-pay__left btn__navPay ">
          <img src="" alt="" />
          <MdAddCircleOutline fontSize={'20px'} />

          <span>200.000</span>
        </div>
        <div className="login-pay__right btn__navPay">
          <MdAddCircleOutline fontSize={'20px'} />
          <span>Nạp HiCoin</span>
        </div>
      </div>
      <div className="nav-login__setting">
        <ul>
          <li>
            <MdOutlineSync className="login-setting__icon" />
            Cập nhật thông tin
          </li>
          <li>
            <MdOutlineLocationOn className="login-setting__icon" />
            Chọn khu vực
          </li>
          <li>
            <MdPassword className="login-setting__icon" />
            Đổi mật khẩu
          </li>
          <li>
            <MdOutlineLogout className="login-setting__icon" />
            Đăng xuất
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavLogin
