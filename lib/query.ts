export type Params = Record<string, string | string[] | undefined>;
export function readSearch(params: Params, tags: string[]) {
  const q =
    typeof params.q === 'string'
      ? Array.from(params.q.normalize('NFKC').trim()).slice(0, 120).join('')
      : '';
  const tag =
    typeof params.tag === 'string' && tags.includes(params.tag)
      ? params.tag
      : 'All';
  return { q, tag };
}
