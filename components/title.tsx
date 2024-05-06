export default function Title({ children, className }) {
  return (
    <h1
      className={`text-3xl font-bold text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </h1>
  );
}
