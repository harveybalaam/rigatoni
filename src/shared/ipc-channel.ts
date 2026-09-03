export const IpcChannelSnippet = {
  CREATE: "create-snippet",
  GET: "get-snippet-by-id",
  GET_ALL: "get-all-snippets",
  UPDATE: "update-snippet-by-id",
  DELETE: "delete-snippet-by-id",
} as const;

export const IpcChannelWindow = {
  SET_HEIGHT_OFFSET: "set-window-height-offset",
} as const;
