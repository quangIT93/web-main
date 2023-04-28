import { Link } from 'react-router-dom'
import './style.scss'

const NavHistory: React.FC = () => {
  return (
    <div className="wrap-history__nav wrap-nav">
      <ul>
        <li>
          <Link to="/">Công việc dã ứng tuyển </Link>
        </li>
        <li>
          <Link to="/">Công việc đã lưu</Link>
        </li>
        <li>
          <Link to="/">Bài đăng đăng tuyển</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavHistory
