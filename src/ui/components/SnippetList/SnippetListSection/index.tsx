interface SnippetListSectionProps extends React.PropsWithChildren {
  title: string;
}

export default function SnippetListSection({
  children,
  title,
}: SnippetListSectionProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <h2 className="text-overlay-0 ml-2">{title.toUpperCase()}</h2>
      {children ? (
        children
      ) : (
        <div className="text-surface-2 ml-2">
          <p>No {title.toLowerCase()} snippets</p>
        </div>
      )}
    </div>
  );
}
