const upstreamTransformer = require("@react-native/metro-babel-transformer")
const postcssTransformer = require("react-native-postcss-transformer")
const postCSSExtensions = ["css", "pcss"]

module.exports.transform = function ({ src, filename, ...rest }) {
  if (postCSSExtensions.some((ext) => filename.endsWith("." + ext))) {
    return postcssTransformer.transform({ src, filename, ...rest })
  }
  return upstreamTransformer.transform({ src, filename, ...rest })
}
