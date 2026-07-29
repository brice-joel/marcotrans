interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

export default function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl transition-all cursor-pointer group text-center gap-2">
      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-800 transition-colors whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
