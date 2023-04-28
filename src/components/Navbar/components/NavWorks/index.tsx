import { Link } from 'react-router-dom'

import './style.scss'

const NavWorks: React.FC = () => {
  return (
    <div className="wrap-works__nav wrap-nav">
      <ul>
        <li>
          <Link to="/">Công việc mới nhất </Link>
        </li>
        <li>
          <Link to="/">Công việc theo chủ đề</Link>
        </li>
        <li>
          <Link to="/">Công việc gần bạn</Link>
        </li>
        <li>
          <Link to="/">Tìm kiếm công việc</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavWorks
