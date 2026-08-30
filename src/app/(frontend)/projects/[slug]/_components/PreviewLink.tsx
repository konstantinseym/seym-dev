import Link from 'next/link'

import LinkIcon from '@/app/(frontend)/_components/icons/LinkIcon'

type PreviewLinkProps = {
  children: string
  url: string
}

export default function PreviewLink({ children, url }: PreviewLinkProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="tracking-custom hover:text-palette-denim flex items-start gap-2 text-base lowercase lg:text-lg"
    >
      {children} <LinkIcon width={16} />
    </Link>
  )
}
