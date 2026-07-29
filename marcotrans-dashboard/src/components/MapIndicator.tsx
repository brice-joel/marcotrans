interface MapIndicatorProps {
  color: string;
  label: string;
  count: number;
}

export default function MapIndicator({
  color,
  label,
  count,
}: MapIndicatorProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 pb-1">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
        <span className="text-slate-500 font-medium">{label}</span>
      </div>
      <b className="text-slate-800">{count}</b>
    </div>
  );
}
