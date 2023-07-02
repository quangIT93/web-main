import React, { useState, memo } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

import './style.scss'

const EditText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState)
  }

  const convertToHtml = () => {
    const contentState = editorState.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    return html
  }

  const handleTextareaChange = (e: any) => {
    const html = e.target.value
    // console.log('html', html)
    // Convert HTML to editor content state if needed
    // Implement your logic here
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        value={convertToHtml()}
        onChange={handleTextareaChange}
        style={{ width: '100%', height: '200px' }}
      />
    </div>
  )
}

export default memo(EditText)
