export type CreateTagDto = {
  uuid: string;
  categoryId: string;
  sequenceId: string;
  content: string;
};

export type Tag = {
  uuid: string;
  content: string;
};
