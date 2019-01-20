import slugify from 'slugify'

const sanitizeOpts = {
    lower: true,
};

export function sanitize(text) {
    return slugify(text, sanitizeOpts)
}