//---[ Blog ]---------------------------
export interface BlogPostJson {
  filename: string,
  title: string,
  publishDate: string | null,
  readingTime: string,
  tags: string[],
};

export interface BlogPost {
  filename: string,
  title: string,
  publishDate: Date,
  readingTime: string,
  tags: string[],
};

export interface MonthMetadata {
  year: number,
  month: number,
  count: number,
}

export interface Blog {
  initialized: boolean,
  posts: BlogPost[],
  postsBy: {
    month: MonthMetadata[],
    tag: {
      [tag: string]: number,
    },
  },
}
//======================================
