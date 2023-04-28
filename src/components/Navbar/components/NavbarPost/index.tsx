import { Link } from 'react-router-dom'
import {
  MdSearch,
  MdOutlineMenu,
  MdOutlineLocationOn,
  MdWork,
  MdOutlineAttachMoney,
} from 'react-icons/md'

import data from './dataLocation'

import './style.scss'

const NavbarPost: React.FC = () => {
  return (
    <>
      <div className="navbar-post__top">
        <input
          type="text"
          placeholder="Tên công ty, vị trí bạn muôn ứng tuyển"
        />
        <div className="navPost-search">
          <MdSearch />
          <span>Tìm kiếm</span>
        </div>
        <div className="navPost-filter">
          <MdOutlineMenu />
          <span>Lọc</span>
        </div>
      </div>

      <div className="navbar-post__bottom">
        <div className="navBox-location navBox-bottom">
          <MdOutlineLocationOn />
          <span>Chọn địa điểm</span>
          <div className="suvnav-locations">
            <h2>Địa điểm</h2>
            <div className="suvnav-location">
              {data.map((location, index) => (
                <ul key={index}>
                  <div className="suv-location__heading">
                    {location.city} {location.icon}
                  </div>
                  {location.districts.map((district, index) => (
                    <li key={index}>
                      {district}
                      <input type="checkbox" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="navBox-career navBox-bottom">
          <MdWork />
          <span>Chọn danh mục nghề nghiệp</span>
        </div>
        <div className="navBox-salary navBox-bottom">
          <MdOutlineAttachMoney />
          <span>Mức lương</span>
        </div>
      </div>
    </>
  )
}

export default NavbarPost
