type ContactLinkProps = {
  icon: string;
  label: string;
  href: string;
  external?: boolean;
};

export function ContactLink({ icon, label, href, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-center py-4 border-b last:border-b-0 hover:bg-accent transition-colors"
    >
      <h2 className="text-xl font-semibold">
        {icon} {label}
      </h2>
    </a>
  );
}
