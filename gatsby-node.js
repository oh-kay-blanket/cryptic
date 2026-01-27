const path = require('path')

// List of tracking slugs for /go/ redirect pages
const GO_SLUGS = ['fg', 'wp', 'wg', 'pz', 'fgid', 'wga', 'ig', 'cr', 'gm']

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  const goRedirectTemplate = path.resolve('./src/templates/go-redirect.js')

  GO_SLUGS.forEach((slug) => {
    createPage({
      path: `/go/${slug}`,
      component: goRedirectTemplate,
      context: {
        slug,
      },
    })
  })
}
