export type CreateTagDto = {
  uuid: string;
  categoryId: string;
  sequenceId: string;
  content: string;
  metadata: string;
};

export type Tag = {
  uuid: string;
  content: string;
};
