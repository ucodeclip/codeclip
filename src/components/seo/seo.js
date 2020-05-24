import React from "react";
import Helmet from "react-helmet"

const Seo = (props) => {
  const title = props.title === "Code Clop Blog" ? props.title : props.title + " | Code Clip Blog";
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
        },
        {
          name: 'google-site-verification',
          content:
            'H9iRfK03WwB_7J-ijEMiAkby71EmS1ejxlW1wYWyoSo',
        }
      ]}
    />
  )
}

export default Seo