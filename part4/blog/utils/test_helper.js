const Blog = require('../models/blog')


const listWithZero = []

const oneBlog = [
  {
    title: 'ur mom gay',
    author: 'john kane',
    url: 'google.com/bbc',
    likes: 4
  }
]
const multipleBlog = [
  {
    title: 'ur mom gay',
    author: 'john kane',
    url: 'google.com/bbc',
    likes: 2
  }
  ,
  {
    title: 'i love joanna',
    author: 'brycen cousins',
    url: 'google.com/jjj',
    likes: 1
  },
  {
    title: 'asdasf',
    author: 'hank swagner',
    url: 'tatum',
    likes: 0
  }
]
const sameNum = [
  {
    title: 'ur mom gay',
    author: 'john kane',
    url: 'google.com/bbc',
    likes: 3
  }
  ,
  {
    title: 'i love joanna',
    author: 'brycen cousins',
    url: 'google.com/jjj',
    likes: 1
  },
  {
    title: 'asdasf',
    author: 'hank swagner',
    url: 'tatum',
    likes: 3
  },
  {
    title: 'duuuude',
    author: 'michael stevens',
    url: 'rose',
    likes: 0
  }
]

const oneAuthor = [
  {
    title: 'ur mom gay',
    author: 'john kane',
    url: 'google.com/bbc',
    likes: 3
  }
]

const multipleAuthors = [
  {
    title: 'ur mom gay',
    author: 'john kane',
    url: 'google.com/bbc',
    likes: 3
  },
  {
    title: 'i love joanna',
    author: 'john kane',
    url: 'google.com/jjj',
    likes: 1
  },
  {
    title: 'this',
    author: 'hank swagner',
    url: 'tatum',
    likes: 2
  },
  {
    title: 'duuuude',
    author: 'michael stevens',
    url: 'rose',
    likes: 0
  },
  {
    title: 'asdasf',
    author: 'hank swagner',
    url: 'tatum',
    likes: 1
  },
  {
    title: 'yes',
    author: 'hank swagner',
    url: 'tatum',
    likes: 0
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  oneBlog,
  multipleBlog,
  sameNum,
  oneAuthor,
  listWithZero,
  multipleAuthors,
  blogsInDb
}
