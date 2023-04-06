import React from 'react'

interface MetaProps {
  description: string
  title: string
}

export const useMetadata = (props: MetaProps) => {
  console.log('Just render the useMetadata')
  React.useEffect(() => {
    const title = document.head.querySelector('title')

    console.log('title :>> ', title)

    if (!title || title.textContent !== props.title) {
      const title = document.head.querySelector('title')
      const metaDescTag = document.head.querySelector(
        'meta[property="description"]'
      )
      const metaDescOrgTag = document.head.querySelector(
        'meta[property="og:description"]'
      )

      if (title && metaDescTag && metaDescTag) {
        title.textContent = props.title
        metaDescOrgTag?.setAttribute('content', props.description)
        metaDescTag.setAttribute('content', props.description)
      }
    }
  }, [])
}
