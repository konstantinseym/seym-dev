'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import type { Project } from '@/payload-types'

import { FAST_TRANSITION } from '@/lib/motion.config'

type ProjectCardData = Pick<Project, 'id' | 'name' | 'slug' | 'description' | 'primaryImage'>

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={FAST_TRANSITION}
      className="tracking-custom flex max-w-lg flex-col gap-6 px-9 py-5"
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-9 gap-y-2">
        <span className="text-palette-denim text-xs lg:text-sm">/ {project.id}</span>
        <Link href={'/project/' + project.slug}>
          <h3 className="text-xl font-medium uppercase lg:text-2xl">{project.name}</h3>
        </Link>
        <span className="text-palette-denim col-start-2 text-xs lg:text-sm">
          {project.description}
        </span>
      </div>

      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="border-palette-carbon rounded-lg border"
      />
    </motion.article>
  )
}
