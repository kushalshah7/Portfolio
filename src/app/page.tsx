import { Home } from "@/components/home";
import { getGithubProjects } from "@/lib/github";

export const revalidate = 600;

export default async function Page() {
  const feed = await getGithubProjects();
  return <Home {...feed} />;
}
