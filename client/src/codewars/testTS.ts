export const join = (tokens: string | string[], glue=''): string => Array.isArray(tokens) ? tokens.join(glue) : tokens