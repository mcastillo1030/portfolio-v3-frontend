import { StrapiMedia } from '../../lib/media';

interface Block {
  id: string;
  __component: string;
}

type Icon = {
  id: number,
  name: string,
}

export interface HeadingBlock extends Block {
  title: string,
}

export interface ImageBlock extends Block {
  heading: string | null,
  image: StrapiMedia,
}

export interface TextBlock extends Block {
  heading: string | null,
  text: string,
}

export interface IconListBlock extends Block {
  heading: string | null,
  icon: Icon[],
}

export interface MarkdownBlock extends Block {
  heading: string | null,
  content: string,
}