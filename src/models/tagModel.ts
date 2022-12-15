export type CreateTagDto = {
  uuid: string | undefined;
  categoryId: string;
  sequenceId: string;
  content: string;
  metadata: string;
};

export type DeleteTagDto = {
  metadata: string;
};

export type Tag = {
  uuid: string;
  content: string;
};
