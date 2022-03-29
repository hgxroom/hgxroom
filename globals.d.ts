// 通用声明
declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare interface ImportMeta {
  env: {
    MODE: 'mock' | 'development' | 'test' | 'release';
  };
  // eslint-disable-next-line no-unused-vars
  glob: (url: string) => { url };
}

declare module '*.svg' {
  const CONTENT: string;
  export default CONTENT;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
