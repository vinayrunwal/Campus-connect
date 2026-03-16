const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <span className="text-xs font-bold text-primary-foreground">C1</span>
        </div>
        <span className="text-sm font-medium text-foreground">Campus One</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Campus One. Built for students, by students.
      </p>
    </div>
  </footer>
);

export default Footer;
