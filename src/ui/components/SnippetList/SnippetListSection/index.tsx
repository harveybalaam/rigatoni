interface SnippetListSectionProps extends React.PropsWithChildren {
  emptyMessageOverride?: string;
  title: string;
}

export default function SnippetListSection({
  children,
  emptyMessageOverride,
  title,
}: SnippetListSectionProps) {
  const emptySectionMessage = emptyMessageOverride
    ? emptyMessageOverride
    : `No ${title.toLowerCase()} snippets`;

  return (
    <div className="flex flex-col gap-0.5">
      <h2 className="text-overlay-0 ml-2">{title.toUpperCase()}</h2>
      {children ? (
        children
      ) : (
        <div className="text-surface-2 ml-2">
          <p>{emptySectionMessage}</p>
        </div>
      )}
    </div>
  );
}
