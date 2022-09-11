import { StrapiMedia } from '../../lib/media';

interface BlockType {
  id: string;
  __component: string;
}

type Icon = {
  id: number,
  name: string,
}

export interface HeadingBlockType extends BlockType {
  title: string,
}

export interface ImageBlockType extends BlockType {
  heading: string | null,
  image: StrapiMedia,
}

export interface TextBlockType extends BlockType {
  heading: string | null,
  text: string,
}

export interface IconListBlockType extends BlockType {
  heading: string | null,
  icon: Icon[],
}

export interface MarkdownBlockType extends BlockType {
  heading: string | null,
  content: string,
}