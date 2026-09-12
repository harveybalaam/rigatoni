import * as z from "zod";

export const snippetSchema = z
  .strictObject({
    id: z.string().trim().nonempty().readonly(),
    dateCreated: z.iso.datetime().readonly(),
    dateLastUpdated: z.iso.datetime(),
    dateLastUsed: z.iso.datetime(),
    name: z.string().trim().nonempty(),
    pinned: z.boolean(),
    value: z.string().trim().nonempty(),
  })
  .required();

export const snippetContentSchema = snippetSchema.pick({
  name: true,
  pinned: true,
  value: true,
});

export const snippetUpdateBodySchema = z.strictObject({
  ...snippetContentSchema.shape,
  dateLastUpdated: z.iso.datetime(),
  dateLastUsed: z.iso.datetime().optional(),
});

export const snippetCollectionSchema = z.strictObject({
  snippets: z.array(snippetSchema).optional(), // TODO: make this required?
});

export const baseSnippetResponseSchema = z.strictObject({
  success: z.boolean(),
});

export const createSnippetResponseSchema = baseSnippetResponseSchema.safeExtend(
  {
    snippet: snippetSchema.optional(),
  },
);

export const getSnippetResponseSchema = baseSnippetResponseSchema.safeExtend({
  snippet: snippetSchema.optional(),
});

export const getAllSnippetsResponseSchema =
  baseSnippetResponseSchema.safeExtend({
    snippets: z.array(snippetSchema).optional(),
  });

export const updateSnippetResponseSchema = baseSnippetResponseSchema.safeExtend(
  {
    snippet: snippetSchema.optional(),
  },
);

export type Snippet = z.infer<typeof snippetSchema>;

export type SnippetContent = z.infer<typeof snippetContentSchema>;

export type SnippetCollection = z.infer<typeof snippetCollectionSchema>;

export type SnippetUpdateBody = z.infer<typeof snippetUpdateBodySchema>;

export type BaseSnippetResponse = z.infer<typeof baseSnippetResponseSchema>;

export type CreateSnippetResponse = z.infer<typeof createSnippetResponseSchema>;

export type GetSnippetResponse = z.infer<typeof getSnippetResponseSchema>;

export type GetAllSnippetsResponse = z.infer<
  typeof getAllSnippetsResponseSchema
>;

export type UpdateSnippetResponse = z.infer<typeof updateSnippetResponseSchema>;

export type DeleteSnippetResponse = z.infer<typeof baseSnippetResponseSchema>;
