const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


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


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  console.log('result', result)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('likes is zero', () => {

    const result = listHelper.totalLike(listWithZero)
    assert.strictEqual(result, 0)
  })
  test('oneBlog list calculated right', () => {
    const result = listHelper.totalLike(oneBlog)

    assert.strictEqual(result, 4)
  })
  test('multipleBlog list calculated right', () => {
    const result = listHelper.totalLike(multipleBlog)

    assert.strictEqual(result, 3)
  })
})

describe('favBlog', () => {
  test('works with one blog', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    assert.deepStrictEqual(result, oneBlog[0])
  })

  test('works with multiple', () => {
    const result = listHelper.favoriteBlog(multipleBlog)

    console.log('result of multiple', result)

    assert.deepStrictEqual(result, multipleBlog[0])
  })

  test('works with same #', () => {
    const result = listHelper.favoriteBlog(sameNum)

    console.log('result of sameNum', result)

    assert.deepStrictEqual(result, sameNum[0])
  })

  describe('mostBlogs', () => {
    test('works with one', () => {
      const result = listHelper.mostBlogs(oneAuthor)
      assert.deepStrictEqual(result, {author: 'john kane', blogs: 1})
    })
    test('works with multiple', () => {
      const result = listHelper.mostBlogs(multipleAuthors)
      assert.deepStrictEqual(result, {author: 'hank swagner', blogs: 3})
    })
  })
  describe('mostLikes', () => {
    test('works with one', () => {
      const result = listHelper.mostLikes(oneAuthor)
      assert.deepStrictEqual(result, {author: 'john kane', likes: 3})
    })
    test('works with multiple', () => {
      const result = listHelper.mostLikes(multipleAuthors)
      assert.deepStrictEqual(result, {author: 'john kane', likes: 4})
    })
  })
})
