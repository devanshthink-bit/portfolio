import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  thumbColor?: string;
}

export default function ProjectCard({
  title,
  description,
  slug,
  thumbColor,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="project-row">
      <div
        className="project-thumb"
        style={thumbColor ? { backgroundColor: thumbColor } : undefined}
      />
      <div className="project-info">
        <p className="project-title">{title}</p>
        <p className="project-description">{description}</p>
      </div>
    </Link>
  );
}
