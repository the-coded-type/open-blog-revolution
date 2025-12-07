declare module "@config" {
    export const CONFIG: {
      TITLE: string;
      URL: string;
      DESCRIPTION: string;
      LANG: string;

      STYLE: string;

      AUTHOR: string;
      CONTACT: boolean;
      EMAIL: string;
      
      POST_COVER: boolean;
      POST_THUMBNAILS: boolean;
      POST_SUGGESTIONS: boolean;
      
      HOME_NB_POSTS: number;

      BLOG_COVER: {
        src: string,
        alt: string
      }
      
      MENU: {
        label: string,
        url: string
      }[]
    };
  }