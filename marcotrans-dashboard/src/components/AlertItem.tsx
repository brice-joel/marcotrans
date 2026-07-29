interface AlertItemProps {
  type: "danger" | "warning" | "info";
  title: string;
  subtitle: string;
  time: string;
}

export default function AlertItem({
  type,
  title,
  subtitle,
  time,
}: AlertItemProps) {
  const badgeColors = {
    danger: "bg-red-50 text-red-600 border-red-100",
    warning: "bg-orange-50 text-orange-600 border-orange-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <div
      className={`p-2.5 border rounded-xl flex items-start gap-3 bg-white ${badgeColors[type].split(" ")[2]}`}
    >
      <div
        className={`p-1.5 rounded-lg border text-center shrink-0 ${badgeColors[type]}`}
      >
        <div className="w-4 h-4 flex items-center justify-center text-xs">
          ⏱
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 leading-tight truncate">
          {title}
        </h4>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
          {subtitle}
        </p>
      </div>
      <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">
        {time}
      </span>
    </div>
  );
}
