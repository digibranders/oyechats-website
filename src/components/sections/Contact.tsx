import { RevealSection } from '@/components/ui/RevealSection';

export function Contact() {
  return (
    <RevealSection
      id="contact"
      className="relative text-center overflow-hidden py-24 px-[52px] section-responsive"
    >
      <div
        className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(14,80,200,.4) 0%, rgba(14,60,180,.1) 42%, transparent 70%)',
        }}
      />

      <div className="relative z-1 max-w-[600px] mx-auto">
        <p className="section-tag-line relative inline-block text-[11px] font-semibold tracking-[.14em] uppercase text-blue-3 mb-[14px]">
          Get in touch
        </p>

        <h2
          className="mb-3"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
            fontWeight: 400,
            letterSpacing: '-.02em',
            color: 'rgba(255,255,255,.68)',
            lineHeight: 1.12,
          }}
        >
          Talk to{' '}
          <strong className="font-semibold gradient-text-heading">our team</strong>
        </h2>

        <p className="text-[15px] leading-[1.65] text-muted mb-10">
          Got questions or need a custom enterprise plan? We&apos;re here to help
          &mdash; reach out and we&apos;ll get back to you within one business day.
        </p>

        <form className="flex items-center gap-[10px] flex-wrap justify-center">
          <input
            type="text"
            placeholder="Name"
            autoComplete="name"
            className="glass-input flex-1 min-w-[150px] rounded-full px-[22px] py-[13px] text-sm leading-none text-text-primary outline-none placeholder:text-white/[.28] transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="glass-input flex-1 min-w-[150px] rounded-full px-[22px] py-[13px] text-sm leading-none text-text-primary outline-none placeholder:text-white/[.28] transition-all duration-200"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full px-[26px] py-[13px] font-semibold text-sm leading-none cursor-pointer transition-all duration-200 bg-white/[.09] backdrop-blur-[40px] border border-white/[.18] text-white/85 hover:bg-white/10 hover:border-white/[.22] hover:text-white"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14)',
            }}
          >
            Contact us
          </button>
        </form>
      </div>
    </RevealSection>
  );
}
