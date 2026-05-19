interface SectionLabelProps {
  text: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionLabel({ text, light = false, centered = true }: SectionLabelProps) {
  const lineClass = `h-[2px] w-10 ${light ? 'bg-white/50' : 'bg-fixturbo-primary'}`;
  const textClass = `text-[13px] font-semibold tracking-[0.12em] uppercase ${light ? 'text-white/70' : 'text-fixturbo-primary'}`;

  return (
    <div className={`flex items-center gap-4 mb-4 ${centered ? 'justify-center' : ''}`}>
      <span className={lineClass} />
      <span className={textClass}>{text}</span>
      {centered && <span className={lineClass} />}
    </div>
  );
}
