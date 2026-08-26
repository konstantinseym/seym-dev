import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import BackButton from './_components/BackButton'

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

          <section className="flex w-full max-w-7xl flex-col items-end text-right">
            <h2 className="tracking-custom mr-3 text-base uppercase lg:text-lg">
              / 01 {siteSettings.projectOverviewLabel}
            </h2>

            <div className="border-palette-space w-3/4 border-b" />

            <p className="mr-3 max-w-17/20 py-2 leading-6">{project.overview}</p>

            <div className="mx-9 my-9 max-w-5xl self-center bg-white px-3 py-2">
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                width={primaryImage.width}
                height={primaryImage.height}
                loading="eager"
              />
            </div>
          </section>

          <section className="flex w-full max-w-7xl flex-col items-start">
            <h2 className="tracking-custom ml-3 text-base uppercase lg:text-lg">
              / 02 {siteSettings.projectStackLabel}
            </h2>

            <div className="border-palette-space w-3/4 border-b" />

            <ul className="text-palette-denim mx-3 flex flex-wrap gap-2 py-2 text-sm uppercase lg:text-base">
              {project.stack.map((tech, index) => (
                <li key={tech.id} className="flex items-center gap-2">
                  <span>{tech.value}</span>
                  {index < project.stack.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ul>

            <div className="mx-9 my-9 max-w-5xl self-center bg-white px-3 py-2">
              <Image
                src={secondaryImage.url}
                alt={secondaryImage.alt}
                width={secondaryImage.width}
                height={secondaryImage.height}
                loading="eager"
              />
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
