import React from "react";
import Helmet from "react-helmet"

const Seo = (props) => {
  const title = props.title;
  const description = props.description;
  const type = props.type;
  return (
    <Helmet
      title={title}
      htmlAttributes={{
        lang: 'ja',
      }}
      meta={[
        {
          name: 'description', content: description,
        },
        {
          name: 'og:title', content: title,
        },
        {
          name: 'og:description', content: description
        },
        {
          name: 'og:type', content: type
        },
        {
          name: 'og:site_name', content: 'Code Clip Blog'
        }
      ]}
    />
  )
}

export default Seo