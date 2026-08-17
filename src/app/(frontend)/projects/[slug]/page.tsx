import { notFound } from 'next/navigation'
import Image from 'next/image'

import { getSiteSettings } from '@/data/getSiteSettings'
import { getProject } from '@/data/getProject'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const siteSettings = await getSiteSettings()

  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const primaryImage = typeof project.primaryImage === 'number' ? null : project.primaryImage
  const secondaryImage = typeof project.secondaryImage === 'number' ? null : project.secondaryImage

  if (!primaryImage?.url || !primaryImage.width || !primaryImage.height) {
    throw new Error(`Primary image is missing for project "${project.name}"`)
  }
  if (!secondaryImage?.url || !secondaryImage.width || !secondaryImage.height) {
    throw new Error(`Secondary image is missing for project "${project.name}"`)
  }

  return (
    <>
      <header className="tracking-custom flex flex-col gap-4 px-9 pt-14 pb-9">
        <h1 className="text-palette-eggshell text-5xl font-medium lowercase lg:text-7xl">
          {project.name}
        </h1>
        <span className="text-palette-denim text-xs font-medium lg:text-sm">
          {project.description}
        </span>
      </header>
      <main className="bg-palette-eggshell text-palette-space flex w-full flex-col items-center rounded-t-2xl py-9">
        <div className="flex max-w-7xl flex-col items-end text-right">
          <h2 className="tracking-custom mr-3 text-base uppercase lg:text-lg">
            / 01 {siteSettings.projectOverviewLabel}
          </h2>
          <div className="border-palette-space w-3/4 border-b" />
          <p className="mr-3 max-w-17/20 py-2 text-sm leading-6 lg:text-base">{project.overview}</p>
          <div className="mx-9 my-9 max-w-5xl self-center bg-white px-3 py-2">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              width={primaryImage.width}
              height={primaryImage.height}
              loading="eager"
            />
          </div>
        </div>

        <div className="flex max-w-7xl flex-col items-start">
          <h2 className="tracking-custom ml-3 text-base uppercase lg:text-lg">
            / 02 {siteSettings.projectStackLabel}
          </h2>
          <div className="border-palette-space w-3/4 border-b" />
          <div className="text-palette-denim mx-3 flex flex-wrap gap-2 py-2 text-sm uppercase lg:text-base">
            {project.stack.map((tech, index) => (
              <div key={tech.id} className="flex items-center gap-2">
                <span>{tech.value}</span>
                {index < project.stack.length - 1 && <span>/</span>}
              </div>
            ))}
          </div>
          <div className="mx-6 my-9 max-w-5xl self-center bg-white px-3 py-2">
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.alt}
              width={secondaryImage.width}
              height={secondaryImage.height}
              loading="eager"
            />
          </div>
        </div>
      </main>
    </>
  )
}
