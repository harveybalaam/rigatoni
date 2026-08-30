export interface ISnippetsDocument {
  items: ISnippet[];
}

export interface ISnippet {
  id: string;
  dateCreated: string;
  dateLastUpdated: string;
  dateLastUsed: string;
  name: string;
  pinned: boolean;
  value: string;
}
