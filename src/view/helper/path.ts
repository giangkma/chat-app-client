export function getLastUrlPath(pathname: string): string | undefined {
    return pathname.split('/').pop();
}
