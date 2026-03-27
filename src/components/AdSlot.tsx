interface Props {
  id: string;
  className?: string;
}

export function AdSlot({ id, className = '' }: Props) {
  return (
    <div
      id={id}
      className={`min-h-0 ${className}`}
      aria-hidden="true"
      data-ad-slot={id}
    >
      {/* Google AdSense code goes here when ready */}
    </div>
  );
}
