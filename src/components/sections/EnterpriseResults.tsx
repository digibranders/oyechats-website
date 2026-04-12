import { APP_LINKS } from '@/lib/constants';
import { CERTIFICATIONS, ENTERPRISE_SECONDARY_STATS } from '@/lib/constants';

export function EnterpriseResults() {
  return (
    <section className="ent-glow relative py-[120px] px-[52px] overflow-hidden section-responsive" aria-label="Enterprise Results">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 items-stretch ent-grid-responsive">
        {/* Left: Metric Panel */}
        <div className="pr-[72px] border-r border-white/[.07] flex flex-col justify-between gap-11 max-md:pr-0 max-md:border-r-0 max-md:border-b max-md:border-white/[.07] max-md:pb-12">
          <div>
            <div className="relative">
              <div className="absolute top-1/2 left-[-20px] -translate-y-1/2 w-[320px] h-[220px] rounded-full pointer-events-none" style={{background:'radial-gradient(ellipse, rgba(37,99,235,.26) 0%, transparent 70%)', filter:'blur(48px)'}} />
              <div className="animate-ent-num-glow relative z-1 font-semibold tracking-[-0.05em] leading-[.86]" style={{fontSize:'clamp(5rem, 11vw, 9.5rem)', background:'linear-gradient(140deg, #ffffff 18%, rgba(147,197,253,.9) 65%, rgba(96,165,250,.6) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
                99.99<span className="text-[.34em] align-super tracking-normal font-semibold">%</span>
              </div>
              <div className="mt-4 relative z-1 text-[11px] font-semibold tracking-[.14em] uppercase text-white/[.28]">Uptime SLA Guaranteed</div>
            </div>
            <div className="h-px my-10" style={{background:'linear-gradient(90deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.04) 55%, transparent 100%)'}} />
            <div className="flex">
              {ENTERPRISE_SECONDARY_STATS.map((stat, i) => (
                <div key={i} className={`flex-1 ${i < ENTERPRISE_SECONDARY_STATS.length - 1 ? 'pr-[22px] border-r border-white/[.06] mr-[22px]' : ''}`}>
                  <div className="font-semibold tracking-[-0.04em] text-white mb-[5px] leading-none" style={{fontSize:'clamp(1.5rem, 2.8vw, 2.2rem)'}}>
                    {stat.value}<sub className="text-[.55em] font-normal align-baseline tracking-normal">{stat.unit}</sub>
                  </div>
                  <div className="text-[11.5px] text-white/[.28] tracking-[-0.01em] leading-[1.45]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="inline-flex items-center gap-[9px] text-[11.5px] text-white/[.25] tracking-[.01em]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] flex-shrink-0 animate-livepulse" style={{boxShadow:'0 0 8px rgba(34,197,94,.6)'}} />
            Live infrastructure metrics
          </div>
        </div>

        {/* Right: Copy Panel */}
        <div className="pl-[72px] flex flex-col justify-between gap-9 max-md:pl-0 max-md:pt-12">
          <div className="flex flex-col">
            <p className="section-tag-line relative inline-block text-[11px] font-semibold tracking-[.14em] uppercase text-blue-3 mb-[14px]">Enterprise Results</p>
            <h2 style={{fontSize:'clamp(2rem, 4.2vw, 3.4rem)', fontWeight:400, letterSpacing:'-.02em', color:'rgba(255,255,255,.68)', lineHeight:1.12}}>
              Built for teams that <strong className="font-semibold gradient-text-heading">can&apos;t afford downtime</strong>
            </h2>
            <p className="text-[15px] leading-[1.65] text-muted max-w-[480px] mt-[14px]">
              Oye Chat runs on enterprise-grade infrastructure with dedicated failover, global edge nodes, and white-glove onboarding for teams of every size.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {CERTIFICATIONS.map((cert) => (
                <span key={cert} className="cert-hover inline-flex items-center gap-[7px] bg-white/[.055] border border-white/[.1] rounded-full py-[7px] px-[14px] text-[11.5px] font-normal text-white/[.42] backdrop-blur-[20px] cursor-default transition-all duration-[220ms]" style={{boxShadow:'inset 0 1px 0 rgba(255,255,255,.08)'}}>
                  <span className="w-[5px] h-[5px] rounded-full bg-blue-3 flex-shrink-0" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <a href={APP_LINKS.home} target="_blank" rel="noopener noreferrer" className="btn-magnetic btn-filled-style rounded-full bg-blue text-white font-semibold text-sm px-7 py-[13px] cursor-pointer border-none no-underline hover:bg-blue-2" style={{boxShadow:'0 0 24px rgba(37,99,235,.4)'}}>Book a demo</a>
            <a href="#pricing" className="btn-magnetic btn-ghost-style rounded-full bg-white/[.07] backdrop-blur-[20px] text-white/80 border border-white/[.16] font-semibold text-sm px-7 py-[13px] cursor-pointer no-underline hover:bg-white/[.12] hover:border-white/[.28] hover:text-white" style={{boxShadow:'inset 0 1px 0 rgba(255,255,255,.1)'}}>View pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}
