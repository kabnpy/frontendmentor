// SEO utility functions - add more utils as separate files when needed
export interface SEOOptions {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  siteName?: string;
}

export function generateMetaTags(options: SEOOptions) {
  return {
    title: options.title,
    description: options.description,
    canonical: options.url,
  };
}

export function generateOpenGraphTags(options: SEOOptions) {
  const tags: Record<string, string> = {
    'og:title': options.title,
    'og:description': options.description,
    'og:type': options.type || 'website',
  };
  if (options.url) tags['og:url'] = options.url;
  if (options.image) tags['og:image'] = options.image;
  if (options.imageAlt) tags['og:image:alt'] = options.imageAlt;
  if (options.siteName) tags['og:site_name'] = options.siteName;
  return tags;
}

export function generateTwitterTags(options: SEOOptions) {
  const tags: Record<string, string> = {
    'twitter:card': options.image ? 'summary_large_image' : 'summary',
    'twitter:title': options.title,
    'twitter:description': options.description,
  };
  if (options.image) tags['twitter:image'] = options.image;
  if (options.imageAlt) tags['twitter:image:alt'] = options.imageAlt;
  return tags;
}

export function generateAllMetaTags(options: SEOOptions) {
  return {
    meta: generateMetaTags(options),
    og: generateOpenGraphTags(options),
    twitter: generateTwitterTags(options),
  };
}
