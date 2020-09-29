const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
const withBlog = require('next-mdx-blog');
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
})

module.exports = withPlugins([withMDX, withBlog, withImages], {
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
});