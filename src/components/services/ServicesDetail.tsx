import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import ServicesDetailClient, { type ServiceItem } from './ServicesDetailClient'

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  order,
  title,
  tagline,
  description,
  deliverables,
  image { asset, alt },
  imageFile
}`

type SanityService = {
  _id: string
  order: number
  title: string
  tagline: string | null
  description: string | null
  deliverables: string[] | null
  image: { asset: { _ref: string; _type: string }; alt?: string } | null
  imageFile: string | null
}

export default async function ServicesDetail() {
  const { data } = await sanityFetch({ query: SERVICES_QUERY })
  const raw = (data ?? []) as SanityService[]

  const services: ServiceItem[] = raw.map((s) => ({
    _id: s._id,
    order: s.order,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    deliverables: s.deliverables,
    imageUrl: s.image?.asset
      ? urlFor(s.image).width(900).auto('format').url()
      : (s.imageFile ?? ''),
  }))

  return <ServicesDetailClient services={services} />
}
