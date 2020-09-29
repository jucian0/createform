import React from 'react'
import { DefaultSeo } from 'next-seo'

function Index() {
  return (
    <div>
      <DefaultSeo
        title="Test Seo Index"
        titleTemplate="%s | Next SEO"
        description="My description"
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <h1>Index</h1>
    </div>
  )
}

export default Index
