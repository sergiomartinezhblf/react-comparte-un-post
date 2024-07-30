import React from 'react'

function PostImage({url}) {
  return (
    <div className="col">
    <div className="card">
      <img src={url} className="card-img-top" alt="..."/>
    </div>
  </div>
  )
}

export default PostImage