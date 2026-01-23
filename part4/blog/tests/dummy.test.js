const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.multipleBlog)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  console.log('result', result)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('likes is zero', () => {

    const result = listHelper.totalLike(helper.listWithZero)
    assert.strictEqual(result, 0)
  })
  test('oneBlog list calculated right', () => {
    const result = listHelper.totalLike(helper.oneBlog)

    assert.strictEqual(result, 4)
  })
  test('multipleBlog list calculated right', () => {
    const result = listHelper.totalLike(helper.multipleBlog)

    assert.strictEqual(result, 3)
  })
})

describe('favBlog', () => {
  test('works with one blog', () => {
    const result = listHelper.favoriteBlog(helper.oneBlog)
    assert.deepStrictEqual(result, helper.oneBlog[0])
  })

  test('works with multiple', () => {
    const result = listHelper.favoriteBlog(helper.multipleBlog)

    console.log('result of multiple', result)

    assert.deepStrictEqual(result, helper.multipleBlog[0])
  })

  test('works with same #', () => {
    const result = listHelper.favoriteBlog(helper.sameNum)

    console.log('result of sameNum', result)

    assert.deepStrictEqual(result, helper.sameNum[0])
  })

  describe('mostBlogs', () => {
    test('works with one', () => {
      const result = listHelper.mostBlogs(helper.oneAuthor)
      assert.deepStrictEqual(result, {author: 'john kane', blogs: 1})
    })
    test('works with multiple', () => {
      const result = listHelper.mostBlogs(helper.multipleAuthors)
      assert.deepStrictEqual(result, {author: 'hank swagner', blogs: 3})
    })
  })
  describe('mostLikes', () => {
    test('works with one', () => {
      const result = listHelper.mostLikes(helper.oneAuthor)
      assert.deepStrictEqual(result, {author: 'john kane', likes: 3})
    })
    test('works with multiple', () => {
      const result = listHelper.mostLikes(helper.multipleAuthors)
      assert.deepStrictEqual(result, {author: 'john kane', likes: 4})
    })
  })
})
describe('mostLikes', () => {
  test('works with one', () => {
    const result = listHelper.mostLikes(helper.oneAuthor)
    assert.deepStrictEqual(result, {author: 'john kane', likes: 3})
  })
  test('works with multiple', () => {
    const result = listHelper.mostLikes(helper.multipleAuthors)
    assert.deepStrictEqual(result, {author: 'john kane', likes: 4})
  })
})
describe('get request works', () => {
  test('json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.deepStrictEqual(response.body.length, helper.multipleBlog.length)
  })
})
describe('id transformer works', () => {
  test('id works', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.ok(blog.id)
  })
  test('_id does not exist', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.strictEqual(blog._id, undefined)
  })
})

after(async () => {
  await mongoose.connection.close()
})
