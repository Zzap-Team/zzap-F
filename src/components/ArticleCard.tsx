type ArticleCardProps = {
  title: string;
  contentPreview: string;
};

export default function ArticleCard({ title, contentPreview }: ArticleCardProps) {
  return (
    <div>
      <p>{title}</p>
      <p>{contentPreview}</p>
    </div>
  );
}
