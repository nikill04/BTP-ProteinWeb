import React, { useRef, useState, useEffect } from 'react'

export default function FileUploader({ onFileChange, allowed = 'image/*', helperText }) {
  const inputRef = useRef(null)
  const [fileObj, setFileObj] = useState(null)

  useEffect(() => {
    if (onFileChange) onFileChange(fileObj)
  }, [fileObj])

  const handlePick = e => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setFileObj({ file: f, url })
  }

  const remove = () => {
    if (fileObj) URL.revokeObjectURL(fileObj.url)
    setFileObj(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="card p-6 rounded-2xl">
        {!fileObj ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-lg font-medium">Upload a protein image</div>
            <div className="text-sm text-gray-300">{helperText || 'Supported: PNG/JPG. Use filename like covid_fast_01.png to demo behavior.'}</div>
            <input ref={inputRef} type="file" accept={allowed} onChange={handlePick} className="mt-4" />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <div className="w-40 h-40 bg-black/10 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={fileObj.url} alt="preview" className="preview-img" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{fileObj.file.name}</div>
              <div className="text-sm text-gray-300">{(fileObj.file.size / 1024).toFixed(1)} KB</div>
              <div className="mt-4 flex gap-3">
                <button onClick={remove} className="px-4 py-2 rounded-md bg-red-600/80">Remove</button>
                <label className="px-4 py-2 rounded-md bg-white/6 cursor-pointer">
                  <input type="file" accept={allowed} onChange={handlePick} className="hidden" /> Replace
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
