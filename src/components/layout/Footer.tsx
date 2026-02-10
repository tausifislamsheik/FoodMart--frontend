import Link from "next/link";

const Footer = () => {
  const footerLinks = {
    Product: ["Overview", "Pricing", "Marketplace", "Features", "Integrations"],
    Company: ["About", "Team", "Blog", "Careers", "Contact", "Privacy"],
    Resources: ["Help", "Sales", "Advertise"],
    Social: ["Twitter", "Instagram", "LinkedIn"],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16 px-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl text-foreground">
                <i>
                  Food<span className="text-orange-500 font-bold">Mart</span>
                </i>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Delicious meals delivered fast.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 FoodMart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
