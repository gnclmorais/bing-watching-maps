const ASCENDING = 'asc';

export function sort(data, { by, order = ASCENDING }) {
  if (!data || !by || typeof by !== 'string') throw 'sort needs data and a `by` key'

  const direction = order === ASCENDING ? 1 : -1

  return data.sort(({ [by]: a }, { [by]: b }) => {
    if (a < b) return direction * -1
    if (a > b) return direction * 1
    return 0
  });
}
