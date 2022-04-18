export interface Posts {
    posts: Post[];
  }
  
  export interface Post {
    id: number;
    author_id: number;
    post_title: string;
    post_message: string;
    replies: number[],
    date_created: string
  }
  
  export interface Reply{
      id: number,
      author_id: number
      message: string;
      date_created: string
  }