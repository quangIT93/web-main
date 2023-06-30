import React from 'react'
import { CurrentCategoryActiveProps } from '../..'

interface CategoryItemProps {
  link: string
  content: string
  isActive: boolean
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  link,
  content,
  isActive,
}) => {
  return (
    <li className={isActive ? 'category__active' : undefined}>
      <a href={`#${link}`}>{content}</a>
    </li>
  )
}

const Category = (props: CurrentCategoryActiveProps) => {
  const { isAboutUs, privaryPolicy, termsOfUse } = props

  if (isAboutUs) {
    return (
      <aside className="policy__category">
        <ul>
          <CategoryItem isActive={true} link="about-us" content="Về HiJob" />
          <CategoryItem
            isActive={false}
            link="privacy-policy"
            content="Chính sách bảo mật"
          />
          <CategoryItem
            isActive={false}
            link="terms-of-use"
            content="Điều khoản sử dụng"
          />
        </ul>
      </aside>
    )
  } else if (privaryPolicy) {
    return (
      <aside className="policy__category">
        <ul>
          <CategoryItem isActive={false} link="about-us" content="Về HiJob" />
          <CategoryItem
            isActive={true}
            link="privacy-policy"
            content="Chính sách bảo mật"
          />
          <CategoryItem
            isActive={false}
            link="terms-of-use"
            content="Điều khoản sử dụng"
          />
        </ul>
      </aside>
    )
  } else if (termsOfUse) {
    return (
      <aside className="policy__category">
        <ul>
          <CategoryItem isActive={false} link="about-us" content="Về HiJob" />
          <CategoryItem
            isActive={false}
            link="privacy-policy"
            content="Chính sách bảo mật"
          />
          <CategoryItem
            isActive={true}
            link="terms-of-use"
            content="Điều khoản sử dụng"
          />
        </ul>
      </aside>
    )
  }
  return <div>Not found the Cateogory</div>
}

export default Category
