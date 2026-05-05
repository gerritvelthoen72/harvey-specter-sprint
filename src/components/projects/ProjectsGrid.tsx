import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import ProjectsGridClient, { type ProjectItem } from "./ProjectsGridClient";

const PROJECTS_QUERY = `*[_type == "portfolioItem"] | order(order asc) {
  _id,
  title,
  description,
  client,
  year,
  image { asset, alt },
  tags,
  link,
  order
}`;

type SanityPortfolioItem = {
  _id: string;
  title: string;
  description: string | null;
  client: string | null;
  year: number | null;
  image: { asset: { _ref: string; _type: string }; alt?: string } | null;
  tags: string[] | null;
  link: string | null;
  order: number;
};

export default async function ProjectsGrid() {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });
  const raw = (data ?? []) as SanityPortfolioItem[];

  const projects: ProjectItem[] = raw.map((item) => ({
    _id: item._id,
    title: item.title,
    description: item.description,
    client: item.client,
    year: item.year,
    imageUrl: item.image?.asset
      ? urlFor(item.image).width(1000).auto("format").url()
      : "",
    alt: item.image?.alt ?? item.title,
    tags: item.tags ?? [],
    link: item.link,
    order: item.order,
  }));

  return <ProjectsGridClient projects={projects} />;
}
