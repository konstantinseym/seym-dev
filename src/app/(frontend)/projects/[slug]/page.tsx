import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import BackButton from './_components/BackButton'
import PreviewLink from './_components/PreviewLink'
import ProjectOverview from './_components/ProjectOverview'
import ProjectStack from './_components/ProjectStack'

import { getSiteSettings } from '@/data/getSiteSettings'
import { getProject } from '@/data/getProject'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const socialTitle = project.name.toLocaleLowerCase() + ' - seym.dev'
  const projectUrl = `/projects/${project.slug}`
  const socialImage = project.primaryImage as {
    url: string
    alt: string
    width: number
    height: number
  }

  return {
    title: {
      absolute: socialTitle,
    },
    description: project.description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: socialTitle,
      description: project.description,
      url: projectUrl,
      siteName: 'seym.dev',
      locale: 'ru_RU',
      type: 'website',
      images: socialImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: project.description,
      images: socialImage,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const siteSettings = await getSiteSettings()
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const primaryImage = project.primaryImage as {
    url: string
    alt: string
    width: number
    height: number
  }
  const secondaryImage = project.secondaryImage as {
    url: string
    alt: string
    width: number
    height: number
  }

  return (
    <main>
      <article>
        <header className="tracking-custom flex flex-col gap-4 px-9 pt-14 pb-9">
          <h1 className="text-palette-eggshell text-5xl font-extralight uppercase lg:text-7xl">
            {project.name}
          </h1>

          <p className="text-palette-denim text-xs font-medium lg:text-sm">{project.description}</p>
        </header>

        <div className="bg-palette-eggshell text-palette-space flex w-full flex-col items-center rounded-t-2xl py-9">
          <div className="flex w-full justify-around gap-8 pt-8 pb-12">
            <BackButton>{siteSettings.goBackButtonLabel}</BackButton>
            <div>
              {project.demoUrl && (
                <PreviewLink url={project.demoUrl}>{siteSettings.demoButtonLabel}</PreviewLink>
              )}
            </div>
          </div>
          <ProjectOverview
            header={siteSettings.projectOverviewLabel}
            paragraph={project.overview}
            image={primaryImage}
          />
          <ProjectStack
            header={siteSettings.projectStackLabel}
            content={project.stack}
            image={secondaryImage}
          />
        </div>
      </article>
    </main>
  )
}
