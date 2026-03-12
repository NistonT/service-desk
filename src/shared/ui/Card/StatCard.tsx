type Props = {
  title: string;
  value: string | number;
  subtitle: string;
  color: "blue" | "purple" | "green" | "orange";
};

export const StatCard = ({ title, value, subtitle, color }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <p className="text-sm font-mono text-gray-500">{title}</p>
        <h2 className="text-3xl font-mono font-bold text-black mt-2">{value}</h2>
      </div>
      <div
        className={`mt-4 inline-flex items-center px-2.5 py-0.5 rounded-2xl text-lg font-mono font-bold
          ${
            color === "blue"
              ? "bg-blue-50 text-blue-600"
              : color === "purple"
                ? "bg-purple-50 text-purple-600"
                : color === "green"
                  ? "bg-green-50 text-green-600"
                  : color === "orange"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-gray-100 text-gray-800"
          }`}
      >
        {subtitle}
      </div>
    </div>
  );
};
