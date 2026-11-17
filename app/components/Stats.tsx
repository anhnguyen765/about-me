export default function Stats({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <dl className="stats">
      {items.map((s) => (
        <div key={s.label}>
          <dd>{s.value}</dd>
          <dt>{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
