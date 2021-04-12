module.export = {
   "env": {
      "test": {
         "plugins": [
            "transform-es2015-modules-commonjs",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
         ],
         "presets": [
            "@babel/preset-react",
            "@babel/preset-typescript",
            "@babel/env"
         ]
      }
   }
}