import React from 'react';

type OrganizationJsonLdProps = {
    name: string;
    url: string;
    logoUrl?: string;
    description?: string;
};

export const OrganizationJsonLd = ({ name, url, logoUrl, description }: OrganizationJsonLdProps) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        ...(logoUrl && { logo: logoUrl }),
        ...(description && { description }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export const WebSiteJsonLd = ({ name, url }: { name: string; url: string }) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${url}/busqueda?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
