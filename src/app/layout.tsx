export const metadata = {
  title: "EduQuiz",
  description: "EduQuiz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="br">
      <body>{children}</body>
    </html>
  );
}
