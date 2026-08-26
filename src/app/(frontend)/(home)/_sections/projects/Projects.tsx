import SectionLayout from '../../_components/SectionLayout'
import { getSiteSettings } from '@/data/getSiteSettings'
import { getProjects } from '@/data/getProjectsList'

import ProjectCard from './ProjectCard'

export default async function Projects() {
  const siteSettings = await getSiteSettings()

  const projects = await getProjects()

  return (
    <SectionLayout id="portfolio" header={siteSettings.portfolioSectionTitle}>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </SectionLayout>
  )
}
