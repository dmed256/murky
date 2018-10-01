import JSON5 from 'json5';

import config from './config';
import * as types from './types';

let blog = {
  initialized: false,
  posts: [],
  postsBy: {
    month: [],
    tag: {},
  },
};

const BLOG_LISTENERS = new Set<any>();

const addListener = (listener: any) => {
  BLOG_LISTENERS.add(listener);
}

const removeListener = (listener: any) => {
  BLOG_LISTENERS.delete(listener);
}

// Convert date to Dates and sort by date
const convertBlogPosts = (
  posts: types.BlogPostJson[]
): types.BlogPost[] => {
  const today = new Date();
  return (
    posts
      .map((entry) => ({
        ...entry,
        publishDate: new Date(entry.publishDate as string),
      }))
      // Filter future entries
      .filter((entry) => (
        entry.publishDate < today
      ))
      .sort((a, b) => {
        const aDate = a.publishDate;
        const bDate = b.publishDate;
        // Sort descending
        if (aDate < bDate) {
          return 1;
        }
        return (aDate > bDate) ? -1 : 0;
      })
  );
};

// Aggregate blog posts by year-month
const aggregateByMonth = (
  posts: types.BlogPost[]
): types.MonthMetadata[] => {
  let date = new Date(posts[posts.length - 1].publishDate);
  const today = new Date();

  // Fill out possible entries since the first post with 0
  const monthCounts: any = {};
  while (date < today) {
    const year = date.getFullYear();
    const month = date.getMonth();
    monthCounts[`${year}-${month}`] = { year, month, count: 0 };
    date.setDate(1);
    date.setMonth(month + 1);
  }

  // Aggregate by date
  posts.forEach((post) => {
    const { publishDate } = post;
    const year = publishDate.getFullYear();
    const month = publishDate.getMonth();
    monthCounts[`${year}-${month}`].count += 1;
  });

  return (
    Object.keys(monthCounts)
      .map((key) => monthCounts[key])
      .sort((a, b) => {
        // Sort descending
        if (a.year < b.year) {
          return 1;
        }
        if (a.year > b.year) {
          return -1;
        }
        if (a.month < b.month) {
          return 1;
        }
        return (a.month > b.month) ? -1 : 0;
      })
  );
}

// Aggregate tags based on blog post occurrences
const aggregateByTag = (posts: types.BlogPost[]) => {
  const tagCounts: any = {};
  posts.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (tag in tagCounts) {
        tagCounts[tag] += 1;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  return tagCounts;
}

const processBlogEntries = (jsonPosts: types.BlogPostJson[]) => {
  blog.posts = convertBlogPosts(jsonPosts) as any;
  blog.postsBy.month = aggregateByMonth(blog.posts) as any;
  blog.postsBy.tag = aggregateByTag(blog.posts) as any;
  blog.initialized = true;

  BLOG_LISTENERS.forEach((listener: any) => {
    listener();
  });
}

const initBlog = () => {
  const { blogJson } = config;
  if (!blogJson) {
    return;
  }
  fetch(config.pathname(blogJson))
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Unable to fetch ${blogJson}`);
      }
      return res.text();
    })
    .then((info) => {
      processBlogEntries(JSON5.parse(info));
    });
};

export {
  initBlog,
  addListener,
  removeListener,
};

export default blog as types.Blog;
