const dummy = (blogs) => {
  return 1
}

const totalLike = (blogs) => {
  let likeSum = 0
  if (blogs.length > 0) {
    blogs.map(el => {
      likeSum += el.likes
    })
  }
  return likeSum
}

const favoriteBlog = (blogs) => {
  let topLikes = 0
  let favBlog = {}

  blogs.map(el => {
    if (el.likes > topLikes) {
      topLikes = el.likes
      favBlog = el
    }
  })

  return favBlog
}

const authorBlogs = (blogs) => {
  let arr = []

  //first for each new author create a new key,
  // if it is a new blog, increment count.

  blogs.map(el => {
    if (!arr.some(f => el.author === f.author)) {
      arr.push({
        author: el.author,
        blogs: 1
      })
      console.log('base', arr)
    }
    else {
      arr.find(f => {
        if (f.author === el.author) {
          f.blogs++
          console.log(`incrementing ${f.author} by 1`)
        }
        console.log('arr', arr)
      })
    }
  })

  return arr;
}

const mostBlogs = (blogs) => {
  let topBlogs = 0
  let topIndex = 0
  let index = 0
  //find author with greatest number of posts, call functioun above
  const arr = authorBlogs(blogs)
  console.log('arr for most blogs', arr)


  arr.map(el => {
    if (el.blogs > topBlogs) {
      topBlogs = el.blogs
      topIndex = index
    }
    index++
  })

  return arr[topIndex]
}

const authorLikes = (blogs) => {
  let arr = []

  //first for each new author create a new key,
  // if it is a new blog, increment count.

  blogs.map(el => {
    if (!arr.some(f => el.author === f.author)) {
      arr.push({
        author: el.author,
        likes: el.likes
      })
      console.log('base', arr)
    }
    else {
      let existing = arr.find(f => f.author === el.author)
      if (existing) {
        existing.likes += el.likes
      }
    }
  })

  return arr;
}

const mostLikes = (blogs) => {
  let topLikes = 0
  let topIndex = 0
  let index = 0
  //find author with greatest number of posts, call functioun above
  const arr = authorLikes(blogs)

  arr.map(el => {
    if (el.likes > topLikes) {
      topLikes = el.likes
      topIndex = index
    }
    index++
  })

  return arr[topIndex]
}

module.exports = {
  dummy,
  totalLike,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
