import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  chartColor: string;
}
export default function StatCard({
  title,
  value,
  change,
  isPositive,
  icon,
  iconBg,
  iconColor,
  chartColor,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[115px]">
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
          {title}
        </span>
        <div className={`${iconBg} ${iconColor} p-2 rounded-lg`}>{icon}</div>
      </div>
      <div className="mt-2">
        <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none">
          {value}
        </h4>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-[10px] font-bold flex items-center gap-0.5 ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {change}
          </span>
          {/* Sparkline miniature */}
          <svg className="w-16 h-5" viewBox="0 0 50 20">
            <path
              d={
                isPositive
                  ? "M0,15 Q12,5 25,12 T50,3"
                  : "M0,3 Q12,15 25,8 T50,17"
              }
              fill="none"
              stroke={chartColor}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
