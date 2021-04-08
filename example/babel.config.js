 module.exports = {
  "presets": [
    "@babel/preset-env", 
    "@babel/preset-react",
    "@babel/typescript",
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-syntax-optional-chaining",
    "@babel/plugin-proposal-optional-chaining",
    "react-hot-loader/babel",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-classes"
  ]
}