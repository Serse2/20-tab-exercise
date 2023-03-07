import Link from 'next/link'
import React from 'react'

const Item = () => {
  return (
    <div>
      <Link href="/" title="return to main page">
        Return to main page
      </Link>
      Item
    </div>
  )
}
export default Item
