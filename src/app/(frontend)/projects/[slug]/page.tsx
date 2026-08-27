import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import Link from 'next/link'

import BackButton from './_components/BackButton'
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

  const primaryImage = typeof project.primaryImage === 'number' ? null : project.primaryImage
  const socialTitle = project.name.toLocaleLowerCase() + ' - seym.dev'
  const projectUrl = `/projects/${project.slug}`

  const socialImages =
    primaryImage?.url && primaryImage.width && primaryImage.height
      ? [
          {
            url: primaryImage.url,
            width: primaryImage.width,
            height: primaryImage.height,
            alt: primaryImage.alt,
          },
        ]
      : [
          {
            url: '/social-preview.png',
            width: 1200,
            height: 630,
            alt: 'seym.dev — создаю место в сети людям и бизнесу',
          },
        ]

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
      images: socialImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: project.description,
      images: socialImages,
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

  const primaryImage = typeof project.primaryImage === 'number' ? null : project.primaryImage
  const secondaryImage = typeof project.secondaryImage === 'number' ? null : project.secondaryImage

  if (!primaryImage?.url || !primaryImage.width || !primaryImage.height) {
    throw new Error(`Primary image is missing for project "${project.name}"`)
  }

  if (!secondaryImage?.url || !secondaryImage.width || !secondaryImage.height) {
    throw new Error(`Secondary image is missing for project "${project.name}"`)
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
          <div className="flex w-full justify-around gap-8">
            <BackButton>{siteSettings.goBackButtonLabel}</BackButton>

            {project.demoUrl && (
              <div className="self-center py-4">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  {siteSettings.demoButtonLabel}
                </Link>
              </div>
            )}
          </div>
          <ProjectOverview
            header={siteSettings.projectOverviewLabel}
            paragraph={project.overview}
            image={{
              url: primaryImage.url,
              alt: primaryImage.alt,
              width: primaryImage.width,
              height: primaryImage.height,
            }}
          />
          <ProjectStack
            header={siteSettings.projectStackLabel}
            content={project.stack}
            image={{
              url: secondaryImage.url,
              alt: secondaryImage.alt,
              width: secondaryImage.width,
              height: secondaryImage.height,
            }}
          />
        </div>
      </article>
    </main>
  )
}
