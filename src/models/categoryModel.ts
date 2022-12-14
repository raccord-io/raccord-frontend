import { Tag } from './tagModel';

export type Category = {
  color: string;
  projectId: string;
  name: string;
  uuid: string;
};

export type FullCategory = {
  name: string;
  uuid: string;
  color: string;
  tags: Tag[];
};
