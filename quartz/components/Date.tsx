interface Props {
  date: Date
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function Date({ date }: Props) {
  return <>{formatDate(date)}</>
}
