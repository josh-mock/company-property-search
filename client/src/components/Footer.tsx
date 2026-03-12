export const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="px-6 py-4 border-t flex flex-col gap-2 text-center text-sm text-muted-foreground">
      <span>Software implementation: &#169; Josh Mock {thisYear}</span>
      <span>
        Data: Information produced by HM Land Registry &#169; Crown copyright{" "}
        {thisYear}
      </span>
    </footer>
  );
};
