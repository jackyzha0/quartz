interface Props {
  date: Date
}

export function Date({ date }: Props) {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: "numeric",
    month: "short",
    day: '2-digit'
  })
  return <>{formattedDate}</>
}
