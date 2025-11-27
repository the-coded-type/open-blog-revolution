const createSanitizer = (base) => (url) => {

    console.log("createSanitizer url", url)
    console.log("createSanitizer base", base)


    if (!url || url.startsWith('http') || url.startsWith('mailto:')) return url;

    const cleanBase = base === '/' ? '' : base.replace(/\/$/, '');

    if (cleanBase && url.startsWith(cleanBase)) {
        return url;
    }
    
    const combined = `${cleanBase}/${url}`;

    console.log("*** createSanitizer combined", base)

    
    // Regex fies double // without affecting protocol
    return combined.replaceAll(/(?<!:)\/+/gm, '/');
};

const base = import.meta.env.BASE_URL;

export const sanitizeUrl = createSanitizer(base);