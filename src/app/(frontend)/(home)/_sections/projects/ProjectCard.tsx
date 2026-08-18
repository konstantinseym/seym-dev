'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import type { Project } from '@/payload-types'

import { SLOW_TRANSITION } from '@/lib/motion.config'

type ProjectCardData = Pick<
  Project,
  'id' | 'name' | 'slug' | 'description' | 'primaryImage' | 'order'
>

type ProjectCardProps = {
  project: ProjectCardData
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const image = typeof project.primaryImage === 'number' ? null : project.primaryImage

  if (!image?.url || !image.width || !image.height) {
    throw new Error(`Primary image is missing for project "${project.name}"`)
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={SLOW_TRANSITION}
      className="tracking-custom flex max-w-lg flex-col items-start gap-6 px-9 py-5"
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-9 gap-y-2">
        <span className="text-palette-denim text-xs lg:text-sm">
          / {String(project.order).padStart(2, '0')}
        </span>
        <Link href={'/projects/' + project.slug}>
          <h3 className="text-xl font-medium uppercase lg:text-2xl">{project.name}</h3>
        </Link>
        <span className="text-palette-denim col-start-2 text-xs lg:text-sm">
          {project.description}
        </span>
      </div>

      <div className="bg-white px-3 py-2">
        <Image src={image.url} alt={image.alt} width={image.width} height={image.height} />
      </div>
    </motion.article>
  )
}
