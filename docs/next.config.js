const { engrafia } = require("engrafia/src/plugin/index");
const withImages = require("next-images");
const compose = require("compose-function");

const composed = compose(engrafia, withImages);

module.exports = composed({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
