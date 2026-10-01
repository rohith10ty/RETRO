import React, { useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grailRequest: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", grailRequest: "", message: "" });
    }, 500);
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-8 sm:pt-10 pb-20 sm:pb-28 px-6 sm:px-10 md:px-16 bg-[#e0e2db] text-[#141414] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Pre-header */}
        <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px] tracking-[0.28em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>05 PRIVATE CONCIERGE</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="mb-16">
          <h2 className="font-impact text-4xl sm:text-6xl md:text-7xl xl:text-8xl uppercase font-black tracking-[-0.03em] leading-[0.92]">
            ACQUIRE RARE GRAILS.
            <br />
            <span className="text-neutral-500">REQUEST A PRIVATE SOURCING.</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-600 uppercase tracking-wider mt-4 max-w-[600px]">
            Seeking an elusive sample, 1985 original, or PE collaboration? Our archival sourcing network locates the world's most guarded footwear.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Channels & Right Sourcing Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Direct Inquiries & VIP Access */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Channel 1: Headquarters */}
              <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-black/10 flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#141414] text-white flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">VAULT HEADQUARTERS</p>
                  <h4 className="font-bold text-sm text-[#141414] mt-0.5">Shibuya Archive Gallery</h4>
                  <p className="text-xs text-neutral-600 mt-1">35.6762° N, 139.6503° E &bull; Tokyo, Japan</p>
                </div>
              </div>

              {/* Channel 2: Direct Concierge Email */}
              <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-black/10 flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#141414] text-white flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">PRIVATE INQUIRIES</p>
                  <a
                    href="mailto:concierge@retro-archive.com"
                    className="font-bold text-sm text-[#141414] hover:text-red-600 transition-colors mt-0.5 block"
                  >
                    concierge@retro-archive.com
                  </a>
                  <p className="text-xs text-neutral-600 mt-1">Encrypted response within 4 hours</p>
                </div>
              </div>

              {/* Channel 3: Private Hotline */}
              <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-black/10 flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#141414] text-white flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">DIRECT VAULT LINE</p>
                  <p className="font-bold text-sm text-[#141414] mt-0.5">+1 (800) RETRO-VAULT</p>
                  <p className="text-xs text-neutral-600 mt-1">Mon &ndash; Sat &bull; 09:00 &ndash; 21:00 JST</p>
                </div>
              </div>
            </div>

            {/* VIP Drop Notice Card */}
            <div className="p-6 rounded-2xl bg-[#141414] text-white border border-black/20">
              <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MONTHLY ARCHIVE VAULT DROP</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                Subscribed collectors receive first-access private purchase tokens 48 hours prior to public release.
              </p>
            </div>
          </div>

          {/* Right Column: Sourcing Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/60 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-black/15 shadow-xl">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-impact text-3xl uppercase tracking-tight text-[#141414]">
                    REQUEST ENCRYPTED & SUBMITTED
                  </h3>
                  <p className="font-mono text-xs text-neutral-600 uppercase tracking-widest mt-2 max-w-[420px]">
                    Your private sourcing dossier has been received. Our archival curator will contact you within 4 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#141414] text-white font-mono text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-black/10">
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#141414]">
                      PRIVATE SOURCING DOSSIER
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">CONFIDENTIAL</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-700 font-bold mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. H. Takahashi"
                        className="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 focus:border-black focus:bg-white text-xs font-mono outline-none transition-all placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-700 font-bold mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="collector@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 focus:border-black focus:bg-white text-xs font-mono outline-none transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-700 font-bold mb-2">
                      TARGET GRAIL / SILHOUETTE / YEAR *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.grailRequest}
                      onChange={(e) => setFormData({ ...formData, grailRequest: e.target.value })}
                      placeholder="e.g. 1989 Air Jordan 4 OG 'White Cement' (US 10.5)"
                      className="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 focus:border-black focus:bg-white text-xs font-mono outline-none transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-neutral-700 font-bold mb-2">
                      CUSTOM SPECIFICATIONS OR BUDGET
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Condition requirements (Deadstock / Pristine Box), target timeline, or special verification needs..."
                      className="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 focus:border-black focus:bg-white text-xs font-mono outline-none transition-all resize-none placeholder:text-neutral-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#141414] hover:bg-neutral-900 text-white font-mono text-xs uppercase tracking-[0.22em] font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl cursor-pointer"
                  >
                    <span>TRANSMIT SOURCING REQUEST</span>
                    <ArrowRight className="w-4 h-4 text-red-400" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
