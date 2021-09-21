import {Helmet} from 'react-helmet';
import ASCLLogo from '../images/ascl-logo.png';

const SEOHeader = ({
    title = "Ajaokuta Steel Company Limited",
    description = `Ajaokuta Steel Company Limited is Nigeria’s leading steel company and leading supplier of
    quality, safe and sustainable steel products in all the major economic sectors.`,
    nofollow = false,
    noindex = false,
    coverimg = ASCLLogo,
    site_url = window.location.href
}) => {

    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description}/> {/* Schema.org markup for Google+ */}
            <meta itemprop="name" content={title}/>
            <meta
                name="robots"
                content={`${noindex
                ? 'noindex'
                : 'index'},${nofollow
                    ? 'nofollow'
                    : 'follow'}`}/>
            <meta
                name="googlebot"
                content={`${noindex
                ? 'noindex'
                : 'index'},${nofollow
                    ? 'nofollow'
                    : 'follow'}`}/>
            <meta itemprop="description" content={description}/>
            <meta itemprop="image" content={coverimg}/> {/* Twitter Card data */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@ajaokutasteelng"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:creator" content="@ajaokuatasteelng"/> {/* Twitter summary card with large image must be at least 280x150px */}
            <meta name="twitter:image:src" content={coverimg}/> {/* Open Graph data */}
            <meta property="og:title" content={title}/>
            <meta property="og:type" content="article"/>
            <meta property="og:url" content={site_url}/>
            <meta property="og:image" content={coverimg}/>
            <link rel="canonical" href={site_url}/>
            <meta property="og:description" content={description}/>
            <meta property="og:site_name" content="Ajaokuta Steel Company Limited"/>
        </Helmet>
    )
}

export default SEOHeader
