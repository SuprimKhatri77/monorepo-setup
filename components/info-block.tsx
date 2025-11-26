export const InfoBox = ({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    warning:
      "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
    success:
      "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
  };

  return (
    <div className={`border rounded-lg p-4 my-4 ${styles[type]}`}>
      <p className="font-semibold mb-2">{title}</p>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
};
