import {Home} from "@/components/home"; import {getGithubProjects} from "@/lib/github";
export default async function Page(){const{projects,error}=await getGithubProjects();return <Home projects={projects} error={error}/>}
