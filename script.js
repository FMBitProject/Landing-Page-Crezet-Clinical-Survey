const { useState, useEffect, useRef } = React;

/* ── Scroll Animation Hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in-up');
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ══════════════════════════════════════════════════════════════════
   Navbar — UPDATED: Logo menyatu dengan background
   ══════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Integritas Data', href: '#integrity' },
    { label: 'Kelayakan', href: '#eligibility' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="logo_1.png"
            alt="Daewoong Indonesia"
            className="h-9 w-auto object-contain transition-all duration-500"
            style={{
              filter: scrolled
                ? 'none'
                : 'brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            }}
          />
        </div>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled ? 'text-pharma-700 hover:bg-pharma-50' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}>
              {l.label}
            </a>
          ))}
        </div>

        <button className={`md:hidden p-2 ${scrolled ? 'text-pharma-700' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1"/>
            <rect y="9" width="20" height="2" rx="1"/>
            <rect y="15" width="20" height="2" rx="1"/>
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-pharma-100 px-6 py-4 flex flex-col gap-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="py-2 text-pharma-700 font-medium border-b border-pharma-50 last:border-0">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero-bg hero-grid min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div style={{position:'absolute',top:'-10%',right:'-5%',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(59,111,232,0.3) 0%,transparent 70%)',pointerEvents:'none'}}></div>
      <div style={{position:'absolute',bottom:'-15%',left:'-8%',width:'600px',height:'600px',background:'radial-gradient(circle,rgba(20,184,166,0.15) 0%,transparent 70%)',pointerEvents:'none'}}></div>

      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl">
          <div className="fade-in-up mb-8 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" style={{animation:'pulse 2s infinite'}}></span>
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase">Daewoong Pharmaceutical Indonesia · 2026</span>
          </div>

          <h1 className="fade-in-up delay-100 font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{fontFamily:'DM Sans,sans-serif',fontWeight:700}}>
            Panduan Survei<br/>
            <span style={{background:'linear-gradient(90deg,#93b9ff,#2dd4bf)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              Klinis Crezet
            </span>
            <br/>2026
          </h1>

          <p className="fade-in-up delay-200 text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl" style={{textWrap:'pretty'}}>
            Memastikan keseragaman, kelengkapan, dan akurasi data praktik klinis rutin untuk kualitas analisis survei terbaik.
          </p>

          <div className="fade-in-up delay-400 flex flex-wrap gap-x-8 gap-y-4">
            {[
              {label:'Lokasi Survei', num:'15 Aktif · 10+ Potensial'},
              {label:'Durasi Pengamatan', num:'24 Minggu (6 Bulan)'},
              {label:'Tersedia 3 Dosis', num:'10/5 · 10/10 · 10/20 mg'},
              {label:'Keamanan Data', num:'100% Terenkripsi'},
            ].map(s => (
              <div key={s.label} className="text-white">
                <div className="text-white/50 text-xs mb-1 uppercase tracking-wide">{s.label}</div>
                <div className="font-display font-bold text-lg leading-tight" style={{fontFamily:'DM Sans,sans-serif'}}>{s.num}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Gulir ke bawah</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{animation:'float 2s ease-in-out infinite'}}>
          <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </section>
  );
}

/* ── Data Integrity Section ── */
function DataIntegrity() {
  const sites = [
    { code: '01', name: 'RS XXX', color: '#3b6fe8', status: 'active' },
    { code: '02', name: 'Klinik XXX', color: '#0d9488', status: 'active' },
    { code: '03', name: 'Klinik XXX', color: '#7c3aed', status: 'active' },
    { code: '04', name: 'RS XXX', color: '#b45309', status: 'active' },
    { code: '05', name: 'Klinik XXX', color: '#0369a1', status: 'active' },
    { code: '06', name: 'Klinik Utama Medika', color: '#6b7280', status: 'potential' },
    { code: '07', name: 'RS Siloam Kebon Jeruk', color: '#6b7280', status: 'potential' },
    { code: '08', name: 'Apotek Kimia Farma Sudirman', color: '#6b7280', status: 'potential' },
    { code: '09', name: 'Klinik Prodia Fatmawati', color: '#6b7280', status: 'potential' },
    { code: '10', name: 'RS Premier Bintaro', color: '#6b7280', status: 'potential' },
    { code: '11', name: 'Klinik Sehat Sentosa', color: '#6b7280', status: 'potential' },
    { code: '12', name: 'RS Pondok Indah', color: '#6b7280', status: 'potential' },
    { code: '13', name: 'Apotek Guardian Kelapa Gading', color: '#6b7280', status: 'potential' },
    { code: '14', name: 'Klinik Medistra Jakarta', color: '#6b7280', status: 'potential' },
    { code: '15', name: 'RS Mitra Keluarga Bekasi', color: '#6b7280', status: 'potential' },
    { code: '16', name: 'Klinik Penyakit Dalam Menteng', color: '#6b7280', status: 'potential' },
  ];
  const activeSites = sites.filter(s => s.status === 'active');

  const principles = [
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>),
      title: 'Ketergantungan Sumber Data',
      desc: 'Seluruh entri data dilakukan melalui spreadsheet terenkripsi yang telah dikonfigurasi oleh tim survei. Tidak diperkenankan penggunaan format data alternatif.',
      tag: 'Spreadsheet Terenkripsi', tagColor: '#e0ebff', tagText: '#1a3480',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
      title: 'Pseudonimisasi Subjek',
      desc: 'Identitas pasien dilindungi menggunakan kode subjek unik yang menggantikan nama dan nomor rekam medis, sesuai standar privasi data klinis.',
      tag: 'Perlindungan Privasi', tagColor: '#ccfbf1', tagText: '#0d9488',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
      title: 'Integritas & Kepatuhan',
      desc: 'Data harus mencerminkan catatan rekam medis aktual. Estimasi, asumsi, atau interpolasi data tidak diperkenankan dalam kondisi apa pun.',
      tag: 'Zero Tolerance', tagColor: '#fef3c7', tagText: '#92400e',
    },
  ];

  return (
    <section id="integrity" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-up mb-16">
          <span className="badge text-pharma-500 mb-4 block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Integritas Data
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Prinsip Pengelolaan Data</h2>
          <p className="text-gray-500 max-w-xl text-lg leading-relaxed" style={{textWrap:'pretty'}}>
            Standar ketat untuk memastikan validitas dan reprodusibilitas setiap titik data yang dikumpulkan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {principles.map((p, i) => (
            <div key={i} className={`fade-in-up delay-${(i+1)*100} card-hover bg-pharma-50 rounded-2xl p-7 border border-pharma-100`}>
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-pharma-600 mb-5">
                {p.icon}
              </div>
              <h3 className="font-display font-semibold text-pharma-900 text-lg mb-3" style={{fontFamily:'DM Sans,sans-serif'}}>{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{background:p.tagColor,color:p.tagText}}>{p.tag}</span>
            </div>
          ))}
        </div>

        <div className="fade-in-up bg-pharma-950 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge text-teal-400 mb-4 block">Format ID Subjek</span>
              <h3 className="font-display text-3xl font-bold text-white mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Kode Identifikasi<br/>Pasien</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Setiap subjek diidentifikasi dengan format kode unik yang menggabungkan kode lokasi dan nomor urut pasien.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold" style={{color:'#93b9ff',fontFamily:'DM Mono,monospace'}}>XXS</span>
                  <span className="font-mono text-4xl font-bold text-teal-400" style={{fontFamily:'DM Mono,monospace'}}>###</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70">
                  <span className="text-pharma-300 font-mono font-semibold">XX</span> = Kode Lokasi
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70">
                  <span className="text-teal-300 font-mono font-semibold">S</span> = Survei
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70">
                  <span className="text-white font-mono font-semibold">###</span> = No. Urut
                </div>
              </div>
            </div>

            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Contoh per Lokasi</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Kode Lokasi Aktif</p>
              <div className="flex flex-col gap-2">
                {activeSites.slice(0,5).map(s => (
                  <div key={s.code} className="flex items-center justify-between bg-white/8 rounded-xl px-4 py-3 border border-white/15">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{background:s.color+'33',border:`1px solid ${s.color}66`,color:s.color,fontFamily:'DM Mono,monospace'}}>
                        {s.code}
                      </div>
                      <span className="text-white/90 text-sm font-medium">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" style={{boxShadow:'0 0 6px #2dd4bf'}}></span>
                      <span style={{background:s.color+'22',color:s.color,fontFamily:'DM Mono,monospace',padding:'2px 8px',borderRadius:'6px',fontSize:'0.75rem',fontWeight:600}}>
                        {s.code}S001
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Eligibility ── */
function Eligibility() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Kriteria Dasar',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
      content: (
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {icon:'👤',title:'Batas Usia',desc:'Pasien berusia ≥18 tahun pada saat indeks pengobatan pertama dengan Crezet.',highlight:'≥ 18 Tahun'},
            {icon:'🫀',title:'Diagnosis',desc:'Telah didiagnosis dislipidemia dan diindikasikan untuk menerima Crezet berdasarkan penilaian dokter serta sesuai label lokal — sesuai dengan diskresi dokter penanggung jawab.',highlight:'Dislipidemia'},
            {icon:'💊',title:'Penggunaan Crezet',desc:'Penggunaan Crezet sesuai dengan praktik klinis rutin — bukan dalam konteks uji klinis atau studi intervensi.',highlight:'Praktik Rutin'},
          ].map((item, i) => (
            <div key={i} className="bg-pharma-50 rounded-xl p-6 border border-pharma-100">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="font-display font-semibold text-pharma-900 mb-2" style={{fontFamily:'DM Sans,sans-serif'}}>{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
              <span className="inline-block bg-pharma-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{item.highlight}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'Ketersediaan Lab',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4m-1-8l1 1"/></svg>,
      content: (
        <div className="space-y-6">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-7">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4"/></svg>
              </div>
              <div>
                <h4 className="font-display font-semibold text-teal-900 text-lg mb-2" style={{fontFamily:'DM Sans,sans-serif'}}>Data LDL & HDL Wajib Tersedia</h4>
                <p className="text-teal-700 text-sm leading-relaxed">
                  Hasil laboratorium LDL dan HDL harus tersedia dalam rentang waktu <strong>-30 hingga 0 hari</strong> dari tanggal indeks pengobatan pertama.
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-1 gap-5">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h5 className="font-semibold text-pharma-800 mb-3 text-sm uppercase tracking-wide">Rentang Waktu Pengambilan Lab</h5>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-8 bg-pharma-50 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 right-1/2 bg-pharma-200 rounded-lg flex items-center justify-center">
                    <span className="text-pharma-700 text-xs font-mono font-semibold">–30 hari</span>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#3b6fe8" strokeWidth="1.5"><line x1="0" y1="8" x2="16" y2="8"/><polyline points="11 3 16 8 11 13"/></svg>
                <div className="w-16 h-8 bg-pharma-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-mono font-semibold">Indeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Kontraindikasi',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
      content: (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {title:'Gangguan Hati',icon:'🫁',color:'#dc2626',bg:'#fef2f2',border:'#fecaca',desc:'Penyakit hati aktif atau peningkatan transaminase (SGOT/SGPT) persisten >3× batas normal atas.'},
              {title:'Gangguan Ginjal',icon:'🫘',color:'#d97706',bg:'#fffbeb',border:'#fde68a',desc:'Gangguan ginjal berat dengan nilai CrCl <30 mL/menit atau pasien yang menjalani dialisis.'},
              {title:'Kondisi Reproduksi',icon:'🤰',color:'#7c3aed',bg:'#faf5ff',border:'#ddd6fe',desc:'Kehamilan, menyusui, atau wanita berpotensi subur yang tidak menggunakan kontrasepsi yang memadai.'},
              {title:'Alergi & Hipersensitivitas',icon:'⚠️',color:'#b45309',bg:'#fffbeb',border:'#fde68a',desc:'Hipersensitivitas terhadap rosuvastatin, ezetimibe, atau komponen tablet Crezet lainnya.'},
              {title:'Miopati',icon:'💪',color:'#0369a1',bg:'#eff6ff',border:'#bfdbfe',desc:'Miopati aktif atau riwayat miopati yang diinduksi statin sebelumnya.'},
              {title:'Partisipasi Studi Lain',icon:'📋',color:'#065f46',bg:'#f0fdf4',border:'#bbf7d0',desc:'Pasien yang saat ini berpartisipasi dalam survei atau studi obat/intervensi lainnya secara bersamaan.'},
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-6 border" style={{background:item.bg,borderColor:item.border}}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="font-display font-semibold text-sm" style={{fontFamily:'DM Sans,sans-serif',color:item.color}}>{item.title}</h4>
                  <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{background:item.color+'22'}}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill={item.color}><line x1="2" y1="5" x2="8" y2="5" stroke={item.color} strokeWidth="1.5"/></svg>
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{color:item.color+'bb'}}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{background:'linear-gradient(135deg, #1a3480 0%, #111d45 100%)'}}>
            <div className="absolute top-0 left-0 w-full h-1" style={{background:'linear-gradient(90deg, #2dd4bf, #93b9ff, #2dd4bf)'}}></div>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{background:'radial-gradient(circle, #2dd4bf 0%, transparent 70%)', transform:'translate(30%, -30%)'}}></div>

            <div className="relative p-7 md:p-9">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{background:'rgba(45,212,191,0.15)', border:'1px solid rgba(45,212,191,0.3)'}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                    <circle cx="20" cy="10" r="2"/>
                  </svg>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="font-display font-bold text-white text-xl md:text-2xl" style={{fontFamily:'DM Sans,sans-serif'}}>Diskresi Dokter</h4>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{background:'rgba(45,212,191,0.2)', color:'#5eead4', border:'1px solid rgba(45,212,191,0.4)'}}>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" style={{boxShadow:'0 0 6px #2dd4bf'}}></span>
                      Penilaian Klinis Final
                    </span>
                  </div>
                  
                  <p className="text-white/80 text-base leading-relaxed mb-4" style={{textWrap:'pretty'}}>
                    Setiap kondisi lain yang membuat pasien tidak layak mengikuti survei menurut <strong className="text-white">penilaian klinis dokter penanggung jawab</strong>. Keputusan akhir mengenai eligibilitas pasien berada pada diskresi profesional dokter yang merawat.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Penilaian Holistik', 'Evaluasi Kasus per Kasus', 'Otoritas Klinis'].map((tag, i) => (
                      <span key={i} className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
                        style={{background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.85)', border:'1px solid rgba(255,255,255,0.15)'}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="eligibility" className="py-24 bg-pharma-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-up mb-12">
          <span className="badge text-pharma-500 mb-4 block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Kelayakan Pasien
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Kriteria Kelayakan</h2>
          <p className="text-gray-500 text-lg max-w-xl" style={{textWrap:'pretty'}}>
            Pastikan setiap pasien memenuhi semua kriteria sebelum data dimasukkan ke dalam sistem survei.
          </p>
        </div>

        <div className="fade-in-up mb-8">
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-sm border border-pharma-100 gap-1">
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === i ? 'tab-active shadow-sm' : 'tab-inactive'
                }`}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="fade-in-up">{tabs[activeTab].content}</div>
      </div>
    </section>
  );
}

/* ── Timeline ── */
function Timeline() {
  const steps = [
    {
      week: 'Minggu ke-0', label: 'Awal / Baseline', badge: 'Kunjungan 1', color: '#3b6fe8',
      items: ['Konfirmasi eligibilitas pasien','Pencatatan diagnosis dislipidemia','Dokumentasi dosis Crezet awal','Data lab LDL & HDL (±30 hari)','Evaluasi CV Risk (ESC 2025)','Riwayat pengobatan sebelumnya'],
    },
    {
      week: 'Minggu ke-12', label: 'Pengamatan Rutin I', badge: 'Toleransi ±4 minggu', color: '#0d9488',
      items: ['Dokumentasi dosis Crezet aktual','Hasil lab LDL & HDL terbaru','Evaluasi CV Risk (ESC 2025)','Pencatatan efek samping (AE/SAE)','Nilai SGPT, SGOT, CK jika relevan','Kepatuhan penggunaan obat'],
    },
    {
      week: 'Minggu ke-24', label: 'Pengamatan Rutin II', badge: 'Toleransi ±4 minggu', color: '#7c3aed',
      items: ['Dokumentasi dosis Crezet akhir','Hasil lab LDL & HDL akhir survei','Evaluasi CV Risk (ESC 2025)','Laporan lengkap AE/SAE','Finalisasi data pasien','Verifikasi kelengkapan data'],
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-up mb-16">
          <span className="badge text-pharma-500 mb-4 block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Timeline
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Alur Pengumpulan Data</h2>
          <p className="text-gray-500 text-lg max-w-xl" style={{textWrap:'pretty'}}>
            Tiga titik pengamatan selama 24 minggu untuk memastikan data longitudinal yang komprehensif.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 mx-20" style={{background:'linear-gradient(to right,#3b6fe8,#0d9488,#7c3aed)'}}></div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className={`fade-in-up delay-${(i+1)*100} relative`}>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm z-10 relative" style={{background:step.color}}>
                      {i+1}
                    </div>
                    <div className="absolute inset-0 rounded-full opacity-30 scale-150 pulse-ring" style={{background:step.color}}></div>
                  </div>
                </div>

                <div className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-center mb-5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{background:step.color+'15',color:step.color}}>{step.badge}</span>
                    <div className="font-display text-2xl font-bold text-pharma-900" style={{fontFamily:'DM Sans,sans-serif'}}>{step.week}</div>
                    <div className="text-gray-500 text-sm mt-1">{step.label}</div>
                  </div>

                  <div className="space-y-2.5">
                    {step.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:step.color+'20'}}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l1.5 1.5 3.5-3.5" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in-up mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-pharma-50 rounded-2xl px-8 py-4 border border-pharma-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b6fe8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="text-pharma-700 font-medium">Total durasi pengamatan:</span>
            <span className="font-display font-bold text-pharma-900 text-lg" style={{fontFamily:'DM Sans,sans-serif'}}>24 Minggu (±8 minggu)</span>
            <span className="text-gray-400 text-sm">| ~6 bulan per pasien</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Video Section ── */
function VideoSection() {
  return (
    <section className="py-24 bg-pharma-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="fade-in-up text-center mb-12">
          <span className="badge text-pharma-500 mb-4 inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            Tutorial
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Video Panduan Teknis</h2>
          <p className="text-gray-500 text-lg">Survei Klinis Crezet 2026</p>
        </div>

        <div className="fade-in-up">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/FC3y9llDXuM"
              title="Video Panduan Teknis"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {[
              {icon:'📋',label:'Cara pengisian spreadsheet'},
              {icon:'🔐',label:'Enkripsi & keamanan data'},
              {icon:'📊',label:'Format ekspor laporan'},
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-pharma-100 text-sm text-gray-600 shadow-sm">
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SurveyForm — UPDATED:
   - Q12: multi-select dosis dengan logic "Belum Tersedia" exclusive
   - Q16: conditional input nama RPM/RPS jika dipilih "Ya"
   - Auto-generated session password dikirim ke Google Sheets
   ══════════════════════════════════════════════════════════════════ */
function SurveyForm({ onComplete, sessionPassword }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Q12: Multi-select dosis dengan exclusive "Belum Tersedia"
  const [selectedDoses, setSelectedDoses] = useState([]);
  
  // Q16: Conditional - kalo pilih "Ya" wajib isi nama RPM/RPS
  const [q16Answer, setQ16Answer] = useState('');
  
  const [sessionId] = useState(() => 'DOC-' + Date.now());
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyxHIYu-emakfDUoq4x9N2REFb40i8R8gRmfK4vo1br7jtqxu45HJHbSKVn-R6zNUe1-Q/exec';

  // Handler untuk Q12 multi-select dengan logic exclusive
  function toggleDose(doseValue) {
    if (doseValue === 'Belum Tersedia') {
      // Kalo klik "Belum Tersedia", clear semua dan set ke "Belum Tersedia" saja
      if (selectedDoses.includes('Belum Tersedia')) {
        setSelectedDoses([]);
      } else {
        setSelectedDoses(['Belum Tersedia']);
      }
    } else {
      // Kalo klik dosis lain, otomatis hapus "Belum Tersedia" dari selection
      let newSelection = selectedDoses.filter(d => d !== 'Belum Tersedia');
      if (newSelection.includes(doseValue)) {
        newSelection = newSelection.filter(d => d !== doseValue);
      } else {
        newSelection = [...newSelection, doseValue];
      }
      setSelectedDoses(newSelection);
    }
  }

  function isDoseDisabled(doseValue) {
    if (doseValue === 'Belum Tersedia') {
      // "Belum Tersedia" disabled kalo ada dosis lain yang sudah dipilih
      return selectedDoses.some(d => d !== 'Belum Tersedia') && selectedDoses.length > 0;
    } else {
      // Dosis lain disabled kalo "Belum Tersedia" sudah dipilih
      return selectedDoses.includes('Belum Tersedia');
    }
  }

  function submitKonfirmasi(e) {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      formType: "konfirmasi",
      sessionId: sessionId,
      namaDokter: e.target.namaDokter.value,
      tempatPraktek: e.target.tempatPraktek.value,
      pahamPanduan: e.target.pahamPanduan.value,
      pahamVideo: e.target.pahamVideo.value,
      pertanyaan: e.target.pertanyaan.value,
      sessionPassword: sessionPassword
    };
    
    fetch(scriptURL, { 
      method: 'POST', 
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        setLoading(false);
        setStep(2);
        window.scrollTo({ top: document.getElementById('form').offsetTop - 100, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error!', error.message);
        setLoading(false);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  }

  function submitMOU(e) {
    e.preventDefault();
    
    if (selectedDoses.length === 0) {
      alert('Mohon pilih ketersediaan Crezet di klinik Anda (pertanyaan no. 12)');
      return;
    }
    
    setLoading(true);
    
    const payload = {
      formType: "mou",
      sessionId: sessionId,
      legalKlinik: e.target.legalKlinik.value,
      alamatKlinik: e.target.alamatKlinik.value,
      namaMewakili: e.target.namaMewakili.value,
      jabatanMewakili: e.target.jabatanMewakili.value,
      nik: e.target.nik.value,
      kepemilikan: e.target.kepemilikan.value,
      jabatanDokter: e.target.jabatanDokter.value,
      background: e.target.background.value,
      alamatDokter: e.target.alamatDokter.value,
      telpDokter: e.target.telpDokter.value,
      emailDokter: e.target.emailDokter.value,
      ketersediaan: selectedDoses.join(', '),
      q13: e.target.q13.value,
      q14: e.target.q14.value,
      q15: e.target.q15.value,
      q16: e.target.q16.value,
      namaRPMRPS: e.target.namaRPMRPS.value,
      q17: e.target.q17.value,
      sessionPassword: sessionPassword
    };
    
    fetch(scriptURL, { 
      method: 'POST', 
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        setLoading(false);
        setStep(3);
        if (onComplete) onComplete();
        window.scrollTo({ top: document.getElementById('form').offsetTop - 100, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error!', error.message);
        setLoading(false);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  }

  function copyPassword() {
    navigator.clipboard.writeText(sessionPassword).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function scrollToDocuments() {
    const el = document.getElementById('documents');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  }

  // Dose options untuk Q12
  const doseOptions = [
    { value: '10/5 mg', color: '#65a30d', bg: '#f0fdf4', border: '#86efac' },
    { value: '10/10 mg', color: '#2563eb', bg: '#eff6ff', border: '#93c5fd' },
    { value: '10/20 mg', color: '#ea580c', bg: '#fff7ed', border: '#fdba74' },
    { value: 'Belum Tersedia', color: '#6b7280', bg: '#f9fafb', border: '#d1d5db', isExclusive: true },
  ];

  return (
    <section id="form" className="py-24 bg-white border-t border-pharma-100 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* === STEP 1: FORM KONFIRMASI === */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <span className="badge text-pharma-500 mb-4 inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Tahap 1 dari 2
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Form Konfirmasi Panduan</h2>
              <p className="text-gray-500 text-lg">Silakan isi form ini setelah Anda mempelajari panduan dan video tutorial.</p>
            </div>

            <div className="bg-pharma-50 p-8 md:p-10 rounded-3xl border border-pharma-100 shadow-sm">
              <form onSubmit={submitKonfirmasi} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-pharma-900 mb-2">Nama Dokter</label>
                    <input type="text" name="namaDokter" required placeholder="Contoh: Dr. Budi Santoso, Sp.PD" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pharma-500 focus:ring-2 focus:ring-pharma-200 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pharma-900 mb-2">Tempat Praktek</label>
                    <input type="text" name="tempatPraktek" required placeholder="Contoh: RS Medika Utama" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pharma-500 focus:ring-2 focus:ring-pharma-200 outline-none transition-all" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100">
                  <label className="block text-sm font-semibold text-pharma-900 mb-3">Apakah Anda mengerti dan paham tentang Panduan Survey Klinis?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pahamPanduan" value="Ya" required className="w-4 h-4 text-pharma-600 focus:ring-pharma-500" />
                      <span className="text-gray-700">Ya, Paham</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pahamPanduan" value="Belum" required className="w-4 h-4 text-pharma-600 focus:ring-pharma-500" />
                      <span className="text-gray-700">Belum Paham</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100">
                  <label className="block text-sm font-semibold text-pharma-900 mb-3">Apakah Anda mengerti dan paham tentang video tutorial yang diberikan?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pahamVideo" value="Ya" required className="w-4 h-4 text-pharma-600 focus:ring-pharma-500" />
                      <span className="text-gray-700">Ya, Paham</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pahamVideo" value="Belum" required className="w-4 h-4 text-pharma-600 focus:ring-pharma-500" />
                      <span className="text-gray-700">Belum Paham</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pharma-900 mb-2">Pertanyaan untuk Team Daewoong (Opsional)</label>
                  <textarea name="pertanyaan" rows="3" placeholder="Tuliskan pertanyaan Anda di sini..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pharma-500 focus:ring-2 focus:ring-pharma-200 outline-none transition-all resize-none"></textarea>
                </div>

                <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pharma-600 hover:bg-pharma-700 shadow-lg'}`}>
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Menyimpan Data Konfirmasi...
                    </>
                  ) : 'Simpan & Lanjut ke Form MOU →'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* === STEP 2: FORM KELENGKAPAN MOU === */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <span className="badge text-teal-600 bg-teal-50 mb-4 inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Tahap 2 dari 2
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Form Kelengkapan Data MOU</h2>
              <p className="text-gray-500 text-lg">Konfirmasi awal telah <b>tersimpan</b>. Mohon lengkapi data administratif berikut.</p>
            </div>
            
            <form onSubmit={submitMOU} className="space-y-8 bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl">
              
              <div>
                <h3 className="font-bold text-pharma-800 text-xl mb-4 pb-2 border-b border-gray-100">1. Informasi Legal Klinik/RS</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">1. Nama legal klinik/RS tempat survey akan berjalan</label>
                    <input type="text" name="legalKlinik" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">2. Alamat lengkap klinik/RS tempat survey akan berjalan (Kelurahan, Kec, Kota, Prov, Kode Pos)</label>
                    <textarea name="alamatKlinik" rows="2" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">3. Nama perwakilan tanda tangan klinik/RS tempat survey akan berjalan</label>
                    <input type="text" name="namaMewakili" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">4. Jabatan perwakilan (Misal: Direktur Operasional/Fungsional/struktural)</label>
                    <input type="text" name="jabatanMewakili" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">5. NIK sesuai KTP perwakilan</label>
                    <input type="number" name="nik" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">6. Kepemilikan Klinik</label>
                    <input type="text" name="kepemilikan" required placeholder="Contoh: Milik sendiri / Bersama" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-pharma-800 text-xl mb-4 pb-2 border-b border-gray-100">2. Data Dokter Penanggung Jawab</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">7. Jabatan dokter penanda tangan</label>
                    <input type="text" name="jabatanDokter" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">8. Background Dokter (Spesialis/Umum)</label>
                    <input type="text" name="background" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">9. Alamat lengkap dokter penanda tangan</label>
                    <textarea name="alamatDokter" rows="2" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">10. No. Telp aktif</label>
                    <input type="tel" name="telpDokter" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">11. Email aktif</label>
                    <input type="email" name="emailDokter" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-pharma-800 text-xl mb-4 pb-2 border-b border-gray-100">3. Kuesioner Kelayakan</h3>
                <div className="space-y-4">
                  
                  {/* ═══════════════════════════════════════════
                      Q12: MULTI-SELECT DOSIS dengan logic EXCLUSIVE "Belum Tersedia"
                      ═══════════════════════════════════════════ */}
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      12. Ketersediaan Crezet di Klinik Anda
                    </label>
                    <p className="text-xs text-gray-500 mb-4">
                      Pilih dosis yang tersedia di klinik Anda (boleh lebih dari satu). Jika belum tersedia, pilih opsi "Belum Tersedia".
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {doseOptions.map((dose) => {
                        const isSelected = selectedDoses.includes(dose.value);
                        const isDisabled = isDoseDisabled(dose.value);
                        return (
                          <button
                            key={dose.value}
                            type="button"
                            onClick={() => !isDisabled && toggleDose(dose.value)}
                            disabled={isDisabled}
                            className={`relative p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:shadow-md active:scale-95'
                            }`}
                            style={{
                              background: isSelected ? dose.color : 'white',
                              borderColor: isSelected ? dose.color : dose.border,
                              color: isSelected ? 'white' : dose.color,
                            }}>
                            
                            {/* Checkmark icon kalo selected */}
                            {isSelected && (
                              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={dose.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              </span>
                            )}
                            
                            <div className="flex flex-col items-center gap-1">
                              {dose.value === 'Belum Tersedia' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/>
                                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                                </svg>
                              ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                                  <path d="m8.5 8.5 7 7"/>
                                </svg>
                              )}
                              <span className="text-xs md:text-sm">{dose.value}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {/* Helper text di bawah */}
                    {selectedDoses.length > 0 && (
                      <div className="mt-3 text-xs flex items-center gap-2"
                        style={{color: selectedDoses.includes('Belum Tersedia') ? '#6b7280' : '#0d9488'}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        Terpilih: {selectedDoses.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  {/* Q13–Q15: Standard radio questions */}
                  {[
                    {name: 'q13', label: '13. Apakah dokter sudah dijelaskan mengenai Survey Klinis Crezet?'},
                    {name: 'q14', label: '14. Apakah sudah dijelaskan bahwa biaya pembelian obat (Crezet) pasien survey tidak ditanggung Daewoong?'},
                    {name: 'q15', label: '15. Apakah sudah dijelaskan bahwa pasien mendapatkan manfaat potongan harga pemeriksaan lab di minggu ke-12 dan 24?'},
                  ].map((q, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <label className="text-sm font-semibold text-gray-800 flex-1">{q.label}</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name={q.name} value="Sudah / Ya" required className="w-4 h-4 text-pharma-600" />
                          <span className="text-sm font-medium">Ya / Sudah</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name={q.name} value="Belum / Tidak" required className="w-4 h-4 text-pharma-600" />
                          <span className="text-sm font-medium">Tidak / Belum</span>
                        </label>
                      </div>
                    </div>
                  ))}

                  {/* ═══════════════════════════════════════════
                      Q16: CONDITIONAL — kalo "Ya" muncul input nama RPM/RPS
                      ═══════════════════════════════════════════ */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <label className="text-sm font-semibold text-gray-800 flex-1">
                        16. Apakah sudah dijelaskan tentang besaran consultation fee yang diberikan kepada dokter oleh RPM dan RPS Daewoong?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="q16" value="Sudah / Ya" required 
                            checked={q16Answer === 'Sudah / Ya'}
                            onChange={(e) => setQ16Answer(e.target.value)}
                            className="w-4 h-4 text-pharma-600" />
                          <span className="text-sm font-medium">Ya / Sudah</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="q16" value="Belum / Tidak" required 
                            checked={q16Answer === 'Belum / Tidak'}
                            onChange={(e) => setQ16Answer(e.target.value)}
                            className="w-4 h-4 text-pharma-600" />
                          <span className="text-sm font-medium">Tidak / Belum</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Conditional input — slide down kalo "Ya" */}
                    <div style={{
                      maxHeight: q16Answer === 'Sudah / Ya' ? '200px' : '0px',
                      opacity: q16Answer === 'Sudah / Ya' ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                    }}>
                      <div className="pt-3 mt-3 border-t border-gray-200">
                        <div className="bg-pharma-50 border border-pharma-200 rounded-lg p-4">
                          <label className="block text-xs font-semibold text-pharma-800 mb-2 flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                            Mohon sebutkan nama RPM/RPS yang menjelaskan
                          </label>
                          <input type="text" name="namaRPMRPS" 
                            required={q16Answer === 'Sudah / Ya'}
                            placeholder="Contoh: Bpk. Andi Wijaya (RPM Jakarta)"
                            className="w-full px-3 py-2 rounded-lg border border-pharma-200 bg-white focus:border-pharma-500 outline-none text-sm" />
                          <p className="text-xs text-gray-500 mt-1.5">
                            Cantumkan nama lengkap RPM atau RPS Daewoong yang memberikan penjelasan kepada Anda.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Q17: Standard radio */}
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <label className="text-sm font-semibold text-gray-800 flex-1">
                      17. Apakah dokter bersedia untuk terlibat dalam Survey Klinis Crezet?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="q17" value="Sudah / Ya" required className="w-4 h-4 text-pharma-600" />
                        <span className="text-sm font-medium">Ya / Sudah</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="q17" value="Belum / Tidak" required className="w-4 h-4 text-pharma-600" />
                        <span className="text-sm font-medium">Tidak / Belum</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'}`}>
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Menyimpan Data MOU...
                    </>
                  ) : 'Kirim Seluruh Data MOU ✓'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* === STEP 3: SUKSES === */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-pharma-900 mb-3" style={{fontFamily:'DM Sans,sans-serif'}}>
                Pendaftaran Berhasil Dikonfirmasi
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Terima kasih atas partisipasi Anda. Kedua tahap pendaftaran telah berhasil terekam dalam sistem kami.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
                ID Sesi: <span className="text-pharma-700 font-semibold">{sessionId}</span>
              </div>
            </div>

            {/* Pernyataan Kerahasiaan */}
            <div className="mb-8 bg-gradient-to-br from-pharma-50 to-white rounded-3xl border-2 border-pharma-100 overflow-hidden shadow-sm">
              <div className="px-7 py-5 border-b border-pharma-100 flex items-start gap-4"
                style={{background:'linear-gradient(135deg, rgba(26,52,128,0.04), rgba(45,212,191,0.04))'}}>
                <div className="w-11 h-11 rounded-xl bg-pharma-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-pharma-900 text-lg mb-0.5" style={{fontFamily:'DM Sans,sans-serif'}}>
                    Pernyataan Kerahasiaan Data
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Data Confidentiality & Privacy Notice
                  </p>
                </div>
              </div>

              <div className="px-7 py-6 space-y-4 text-sm text-gray-700 leading-relaxed" style={{textWrap:'pretty'}}>
                <p>
                  Seluruh informasi pribadi, data administratif, dan respons kuesioner yang Anda sampaikan melalui formulir ini bersifat <strong className="text-pharma-900">strictly confidential</strong> dan akan diperlakukan sesuai dengan prinsip-prinsip etika riset klinis (<em>Good Clinical Practice — ICH-GCP E6 R2</em>) serta peraturan perundang-undangan yang berlaku di Republik Indonesia, termasuk Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 my-5">
                  {[
                    {icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),title:'Penyimpanan Aman',desc:'Data disimpan dalam sistem terenkripsi dengan akses terbatas pada tim peneliti yang berwenang.'},
                    {icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),title:'Penggunaan Terbatas',desc:'Digunakan eksklusif untuk keperluan Survei Klinis Crezet 2026 dan tujuan ilmiah terkait.'},
                    {icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),title:'Anonimisasi',desc:'Identitas pribadi dipisahkan dari data analitik melalui sistem kode pseudonim.'},
                    {icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>),title:'Tanpa Pihak Ketiga',desc:'Tidak akan dibagikan, dijual, atau dialihkan ke pihak ketiga komersial dalam bentuk apa pun.'},
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                      <div className="w-9 h-9 rounded-lg bg-pharma-50 text-pharma-600 flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-pharma-900 text-sm mb-1" style={{fontFamily:'DM Sans,sans-serif'}}>{item.title}</div>
                        <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p>
                  Hasil agregat dari survei dapat dipublikasikan dalam jurnal ilmiah, presentasi konferensi, atau laporan internal Daewoong Pharmaceutical Indonesia, namun <strong className="text-pharma-900">identitas individu peserta tidak akan pernah dipublikasikan</strong> dan tidak dapat ditelusuri kembali ke responden tertentu. Anda berhak meminta penghapusan data Anda dari sistem kami sewaktu-waktu dengan menghubungi tim Medical Affairs.
                </p>

                <div className="flex items-start gap-2 mt-4 pt-4 border-t border-pharma-100 text-xs text-gray-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  <span>
                    Pernyataan ini sejalan dengan <em>Declaration of Helsinki (2013)</em>, prinsip <em>ICH-GCP E6 (R2)</em>, serta SOP Pengelolaan Data Klinis Daewoong Pharmaceutical Indonesia.
                  </span>
                </div>
              </div>
            </div>

            {/* Password Reveal Box */}
            <div className="mb-8 rounded-3xl overflow-hidden shadow-xl" style={{background:'linear-gradient(135deg, #1a3480 0%, #111d45 100%)'}}>
              <div className="h-1.5 w-full" style={{background:'linear-gradient(90deg, #2dd4bf, #93b9ff, #2dd4bf)'}}></div>
              
              <div className="p-7 md:p-9 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
                  style={{background:'radial-gradient(circle, #2dd4bf 0%, transparent 70%)', transform:'translate(30%, -40%)'}}></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{background:'rgba(45,212,191,0.15)', border:'1px solid rgba(45,212,191,0.3)'}}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{background:'rgba(45,212,191,0.2)', color:'#5eead4'}}>
                        Akses Diberikan
                      </span>
                      <h3 className="font-display font-bold text-white text-xl" style={{fontFamily:'DM Sans,sans-serif'}}>
                        Password Akses Dokumen
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    Sebagai apresiasi atas partisipasi Anda, berikut adalah password untuk mengunduh seluruh dokumen referensi survei klinis. <strong className="text-teal-300">Password ini berlaku khusus untuk sesi browser Anda saat ini</strong> dan akan di-generate ulang jika Anda menutup atau memuat ulang halaman.
                  </p>

                  <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10 mb-5">
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Password Sesi</div>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 font-mono text-2xl md:text-3xl font-bold text-white tracking-wider"
                        style={{fontFamily:'DM Mono,monospace', letterSpacing:'0.1em'}}>
                        {sessionPassword}
                      </code>
                      <button onClick={copyPassword}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
                        style={{
                          background: copied ? 'rgba(45,212,191,0.2)' : 'rgba(255,255,255,0.1)',
                          color: copied ? '#5eead4' : 'white',
                          border: `1px solid ${copied ? 'rgba(45,212,191,0.4)' : 'rgba(255,255,255,0.2)'}`
                        }}>
                        {copied ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Tersalin
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <button onClick={scrollToDocuments}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.99]"
                    style={{background:'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)', color:'#042f2e'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Akses Dokumen Referensi
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Password unik untuk sesi ini · Akan reset saat refresh · Konfidensial
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.6s ease forwards; }`}</style>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {q:'Bagaimana jika data lab tidak tersedia?',a:'Wajib mencantumkan keterangan "Tidak Dilakukan/Tidak Tersedia" pada kolom yang bersangkutan. Estimasi, interpolasi, atau penggunaan data dari sumber lain tidak diperkenankan dalam kondisi apa pun. Integritas data adalah prioritas utama.',tag:'Data Lab'},
    {q:'Apa saja dosis Crezet yang didokumentasikan?',a:'Dosis yang valid untuk didokumentasikan adalah: 10/5 mg, 10/10 mg, atau 10/20 mg. Pastikan dosis yang dicatat sesuai dengan dosis aktual yang diberikan kepada pasien pada setiap titik pengamatan.',tag:'Dosis'},
    {q:'Bagaimana pelaporan jika terjadi efek samping?',a:'Dokumentasikan semua Adverse Event (AE) dan Serious Adverse Event (SAE) yang terjadi selama periode pengamatan. Jika efek samping dianggap signifikan secara klinis, sertakan nilai SGPT, SGOT, dan CK yang relevan. Semua kejadian harus dilaporkan tanpa terkecuali.',tag:'AE / SAE'},
    {q:'Apakah pasien yang menghentikan Crezet di tengah studi tetap dicatat?',a:'Ya. Pasien yang menghentikan penggunaan Crezet di tengah periode survei tetap harus didokumentasikan hingga titik penghentian, termasuk alasan penghentian (jika tersedia). Data parsial tetap bernilai untuk analisis.',tag:'Penghentian Terapi'},
    {q:'Siapa yang dapat dihubungi untuk pertanyaan teknis?',a:'Pertanyaan teknis terkait pengisian data, format spreadsheet, atau interpretasi kriteria dapat disampaikan langsung kepada tim Medical Affairs Daewoong Pharmaceutical Indonesia melalui saluran komunikasi yang telah disediakan untuk masing-masing lokasi survei.',tag:'Kontak'},
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="fade-in-up text-center mb-16">
          <span className="badge text-pharma-500 mb-4 inline-flex items-center gap-2 justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Pertanyaan Umum
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>FAQ</h2>
          <p className="text-gray-500 text-lg">Jawaban untuk pertanyaan yang paling sering diajukan.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`fade-in-up delay-${Math.min(i*100, 400)}`}>
              <div className={`border rounded-2xl overflow-hidden transition-all ${openIdx === i ? 'border-pharma-300 shadow-sm' : 'border-gray-100 bg-white'}`}>
                <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{background:'#e0ebff',color:'#1a3480'}}>{faq.tag}</span>
                    <span className="font-display font-semibold text-pharma-900 text-base" style={{fontFamily:'DM Sans,sans-serif',textWrap:'pretty'}}>{faq.q}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openIdx === i ? 'bg-pharma-600 text-white' : 'bg-pharma-50 text-pharma-400'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" style={{transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.3s ease'}}>
                      <polyline points="2 4 7 9 12 4"/>
                    </svg>
                  </div>
                </button>
                
                <div style={{maxHeight: openIdx === i ? '600px' : '0px', opacity: openIdx === i ? '1' : '0', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(.22,1,.36,1)'}}>
                  <p className="px-6 pb-6 text-slate-700 text-sm leading-relaxed" style={{paddingLeft:'1.5rem'}}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DoseCard ── */
function DoseCard() {
  const doses = [
    { label: '10/5 mg', img: 'Crezet 10_5 Green 2.jpeg', color: '#65a30d', bgTint: '#f0fdf4' },
    { label: '10/10 mg', img: 'Crezet 10_10 Blue 2.jpeg', color: '#2563eb', bgTint: '#eff6ff' },
    { label: '10/20 mg', img: 'Crezet 10_20 Orange 1.jpeg', color: '#ea580c', bgTint: '#fff7ed' }
  ];

  return (
    <section className="py-16 bg-pharma-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-up bg-gradient-to-br from-pharma-800 to-pharma-950 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{background:'rgba(45,212,191,0.15)', color:'#5eead4', border:'1px solid rgba(45,212,191,0.3)'}}>
              Referensi Dosis
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
              Dosis Crezet yang Terdokumentasi
            </h3>
            <p className="text-white/70 text-base leading-relaxed">
              Hanya tiga varian dosis berikut yang valid untuk dicatat dalam survei klinis ini. Pastikan Anda mencatat sesuai dengan kemasan yang diberikan kepada pasien.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {doses.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-1.5" style={{backgroundColor: d.color}}></div>
                <div className="w-full py-8 px-6 flex items-center justify-center" style={{background: d.bgTint, minHeight: '240px'}}>
                  <img src={d.img} alt={`Crezet ${d.label}`} className="max-h-56 w-auto object-contain drop-shadow-lg" style={{maxWidth: '100%'}} />
                </div>
                <div className="w-full px-4 py-5 text-center border-t border-gray-100">
                  <div className="font-display font-bold text-pharma-900 text-2xl md:text-3xl mb-1.5" style={{fontFamily:'DM Sans,sans-serif'}}>{d.label}</div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                    Ezetimibe/Rosuvastatin
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Password Modal — UPDATED: validasi pakai sessionPassword (bukan hardcoded)
   ══════════════════════════════════════════════════════════════════ */
function PasswordModal({ doc, onClose, onSuccess, sessionPassword }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === sessionPassword) {
      onSuccess(doc);
      onClose();
    } else {
      setError(true);
      setShake(true);
      setPw('');
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(17,29,69,0.7)',backdropFilter:'blur(8px)'}}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 ${shake ? 'animate-shake' : ''}`} style={{animation: shake ? 'shake 0.4s ease' : 'none'}}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-pharma-50 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3480" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 className="font-display font-bold text-pharma-900 text-xl mb-1" style={{fontFamily:'DM Sans,sans-serif'}}>Dokumen Terlindungi</h3>
          <p className="text-gray-500 text-sm">Masukkan password sesi untuk mengakses</p>
          {doc && <p className="text-pharma-600 text-xs font-medium mt-2 truncate">📄 {doc.title}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }} placeholder="Masukkan password sesi..." autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all font-mono ${error ? 'border-red-400 bg-red-50 text-red-700' : 'border-pharma-200 bg-pharma-50 focus:border-pharma-400 text-pharma-900'}`} />
            {error && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="5"/><line x1="6" y1="4" x2="6" y2="6"/><line x1="6" y1="8" x2="6.01" y2="8"/></svg>
                Password salah. Silakan coba lagi.
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">Batal</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-pharma-600 text-white text-sm font-semibold hover:bg-pharma-700 transition-colors">Buka Dokumen</button>
          </div>
        </form>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Documents — UPDATED: terima sessionPassword & forward ke modal
   ══════════════════════════════════════════════════════════════════ */
function Documents({ formCompleted, sessionPassword }) {
  const [modalDoc, setModalDoc] = useState(null);
  const [unlockedDocs, setUnlockedDocs] = useState(new Set());

  function handleUnlock(doc) {
    setUnlockedDocs(prev => new Set([...prev, doc.file]));
    const a = document.createElement('a');
    a.href = doc.file;
    a.download = doc.title + '.pdf';
    a.click();
  }

  function isUnlocked(file) { return unlockedDocs.has(file); }

  function scrollToForm() {
    const el = document.getElementById('form');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
  
  const docs = [
    {title:'Panduan Survei Klinis Crezet 2026',desc:'Dokumen panduan lengkap pelaksanaan survei klinis Crezet 2026 oleh Daewoong Pharmaceutical Indonesia.',file:'Panduan Survei Klinis Crezet 2026 (Daewoong Pharmaceutical Indonesia) (2).pdf',icon:(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>),color:'#1a3480',bg:'#e0ebff',size:'PDF',tag:'Panduan Utama'},
    {title:'Panduan CV Risk Kalkulator',desc:'Panduan penggunaan kalkulator risiko kardiovaskular untuk penilaian klinis pasien dislipidemia.',file:'Panduan CV risk kalkulator.pdf',icon:(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>),color:'#3b6fe8',bg:'#e0ebff',size:'2.4 MB',tag:'Kalkulasi Risiko'},
    {title:'Panduan Pelaporan AE / SAE',desc:'Prosedur lengkap pelaporan Adverse Event dan Serious Adverse Event sesuai standar survei klinis.',file:'Panduan_Pelaporan_AE_SAE (1).pdf',icon:(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),color:'#dc2626',bg:'#fef2f2',size:'1.8 MB',tag:'Keamanan & Pelaporan'},
    {title:'Troubleshooting Guide',desc:'Panduan pemecahan masalah teknis seputar pengisian data, spreadsheet, dan sistem entri survei.',file:'Troubleshooting Guide.pdf',icon:(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>),color:'#0d9488',bg:'#ccfbf1',size:'3.1 MB',tag:'Teknis & Operasional'},
  ];

  if (!formCompleted) {
    return (
      <section id="documents" className="py-24 bg-pharma-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-md" style={{background:'linear-gradient(135deg, #1a3480, #111d45)'}}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#93b9ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <span className="badge text-pharma-500 mb-4 inline-flex items-center gap-2 justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Dokumen Referensi
            </span>
            
            <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Akses Terkunci</h2>
            
            <p className="text-gray-600 text-lg mb-2 max-w-xl mx-auto leading-relaxed" style={{textWrap:'pretty'}}>
              Untuk menjaga integritas survei dan kerahasiaan data, dokumen referensi hanya dapat diakses setelah pendaftaran selesai.
            </p>
            <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto">
              Silakan lengkapi <strong className="text-pharma-700">Form Konfirmasi Panduan</strong> dan <strong className="text-pharma-700">Form Kelengkapan Data MOU</strong> untuk mendapatkan akses.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              {[{num:1,label:'Form Konfirmasi Panduan'},{num:2,label:'Form Kelengkapan MOU'},{num:3,label:'Akses Dokumen'}].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 2 ? 'bg-gray-200 text-gray-400' : 'bg-pharma-100 text-pharma-700'}`}>{step.num}</span>
                    <span className={`text-sm font-medium ${i === 2 ? 'text-gray-400' : 'text-pharma-800'}`}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="hidden sm:block"><polyline points="9 18 15 12 9 6"/></svg>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button onClick={scrollToForm} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95" style={{background:'linear-gradient(135deg, #2550cc, #1a3480)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              Mulai Pendaftaran Sekarang
            </button>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-40 pointer-events-none select-none">
              {docs.map((doc, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-left" style={{filter:'blur(2px)'}}>
                  <div className="w-10 h-10 rounded-lg mb-3" style={{background: doc.bg}}></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-2 bg-gray-100 rounded w-full mb-1"></div>
                  <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="documents" className="py-24 bg-pharma-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-up mb-14">
          <span className="badge text-pharma-500 mb-4 block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            Dokumen Panduan
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Unduh Dokumen Referensi</h2>
          <p className="text-gray-500 text-lg max-w-xl" style={{textWrap:'pretty'}}>
            Seluruh panduan teknis yang diperlukan untuk pelaksanaan survei klinis Crezet 2026. Gunakan password sesi yang telah diberikan untuk membuka setiap dokumen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docs.map((doc, i) => (
            <div key={i} className={`fade-in-up delay-${(i+1)*100} card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col`}>
              <div className="h-1.5 w-full" style={{background:doc.color}}></div>

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:doc.bg, color:doc.color}}>
                    {doc.icon}
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium" style={{background:doc.bg, color:doc.color}}>{doc.tag}</span>
                </div>

                {isUnlocked(doc.file) ? (
                  <>
                    <h3 className="font-display font-semibold text-pharma-900 text-lg mb-2 leading-snug" style={{fontFamily:'DM Sans,sans-serif'}}>{doc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">{doc.desc}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span className="font-mono">PDF · {doc.size}</span>
                      </div>
                      <button onClick={() => handleUnlock(doc)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-md active:scale-95" style={{background:doc.color, color:'white'}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Unduh
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-display font-semibold text-pharma-900 text-lg mb-2 leading-snug" style={{fontFamily:'DM Sans,sans-serif'}}>{doc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">{doc.desc}</p>

                    <div className="pt-4 border-t border-gray-50 mt-auto">
                      <button onClick={() => setModalDoc(doc)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-md border-2" style={{borderColor:doc.color+'40',color:doc.color,background:doc.bg}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Masukkan Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="fade-in-up mt-8 flex items-center justify-center gap-4 text-sm text-gray-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Dokumen bersifat <span className="font-medium text-pharma-500">konfidensial</span> — dilindungi password sesi untuk penggunaan internal tim survei klinis.
        </div>
      </div>

      {modalDoc && (
        <PasswordModal 
          doc={modalDoc} 
          onClose={() => setModalDoc(null)} 
          onSuccess={handleUnlock}
          sessionPassword={sessionPassword}
        />
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER — UPDATED: Logo putih menyatu dengan latar gelap & oranye
   ══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-pharma-950 text-white">
      
      {/* ═══════════════════════════════════════
          MAIN FOOTER CONTENT
          ═══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        
        {/* Top section: Brand + Office Info */}
        <div className="grid lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="logo_1.png"
                alt="Daewoong Indonesia"
                className="h-10 w-auto object-contain"
                style={{
                  filter: 'brightness(0) invert(1) opacity(0.95)',
                }}
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
              Panduan resmi survei klinis penggunaan Crezet dalam praktik klinis rutin di Indonesia tahun 2026, dilakukan dengan standar Good Clinical Practice (ICH-GCP E6 R2).
            </p>
            
            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2">
              {['ICH-GCP E6 R2', 'UU PDP 2022', 'BPOM Compliant'].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  style={{background:'rgba(45,212,191,0.1)', color:'#5eead4', border:'1px solid rgba(45,212,191,0.2)'}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Jakarta Office Card */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              
              {/* Office Header */}
              <div className="px-6 py-5 border-b border-white/10">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-teal-300">Head Office</span>
                    </div>
                    <h4 className="font-display font-bold text-white text-xl" style={{fontFamily:'DM Sans,sans-serif'}}>
                      Jakarta Office
                    </h4>
                  </div>
                  
                  {/* Quick contact */}
                  <div className="flex flex-col gap-1.5 text-xs">
                    <a href="mailto:dpi.info@daewoong.co.kr" className="flex items-center gap-2 text-white/70 hover:text-teal-300 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                      dpi.info@daewoong.co.kr
                    </a>
                    <a href="tel:+62-021-3972-1100" className="flex items-center gap-2 text-white/70 hover:text-teal-300 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      +62-021-3972-1100
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-4 flex items-start gap-2 text-sm text-white/60 leading-relaxed">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0 text-white/40">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>
                    Wework Revenue Tower 20th Floor SCBD, Lot 13 District 8, Jl. Jenderal Sudirman Kav. 52-53, RT.5/RW.3, Senayan, Daerah Khusus Ibukota Jakarta 12190, Indonesia
                  </span>
                </div>
              </div>

              {/* Embedded Google Maps */}
              <div className="relative w-full h-52 bg-white/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4583773869447!2d106.80766297500559!3d-6.224515093774166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1495e07c5cb%3A0xdfb56e5b3ce9b0e6!2sRevenue%20Tower!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{border:0, filter:'grayscale(0.3) contrast(1.1)'}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jakarta Office Location"
                ></iframe>
                
                {/* Open in maps overlay button */}
                <a 
                  href="https://maps.google.com/?q=Revenue+Tower+SCBD+Jakarta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{background:'rgba(17,29,69,0.85)', color:'#5eead4', backdropFilter:'blur(8px)', border:'1px solid rgba(45,212,191,0.3)'}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Versioning */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-white/40">
            <span>Panduan Survei Klinis Crezet</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span className="font-mono">v1.0</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span>April 2026</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" style={{boxShadow:'0 0 6px #2dd4bf'}}></span>
            <span>System Status: Operational</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ORANGE COPYRIGHT BAR (Daewoong Branding)
          ═══════════════════════════════════════ */}
      <div className="relative" style={{background:'linear-gradient(90deg, #f97316 0%, #ea580c 100%)'}}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize:'40px 40px'}}>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Daewoong Logo (white) — invert filter biar nyatu dengan oranye */}
          <div className="flex items-center gap-3">
            <img
              src="logo_1.png"
              alt="Daewoong"
              className="h-7 w-auto object-contain"
              style={{
                filter: 'brightness(0) invert(1)',
              }}
            />
            <div className="h-7 w-px bg-white/30"></div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/95 font-bold">
                Pharmaceutical Indonesia
              </div>
              <div className="text-[9px] text-white/75 italic">
                Health for Better Life
              </div>
            </div>
          </div>

          {/* Copyright text */}
          <div className="flex items-center gap-2 text-white text-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
              <circle cx="12" cy="12" r="10"/>
              <path d="M14.83 14.83a4 4 0 1 1 0-5.66"/>
            </svg>
            <span className="text-white/95 font-medium">
              Copyright © PT Daewoong Pharmaceutical Indonesia. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════
   App — UPDATED: 
   - Auto-generate session password (format: CRZT-XXXX-YYYY)
   - Password reset saat refresh/tutup tab (pakai useState, bukan localStorage)
   - Password di-pass ke SurveyForm & Documents
   ══════════════════════════════════════════════════════════════════ */
function App() {
  useScrollReveal();
  const [formCompleted, setFormCompleted] = useState(false);

  // Generate password 1x saat App mount (hilang saat refresh)
  const [sessionPassword] = useState(() => {
    // Karakter ambigu (I, O, 0, 1) dihilangkan biar gampang dibaca user
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const generate = (len) => {
      let result = '';
      for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    return `CRZT-${generate(4)}-${generate(4)}`;
  });

  return (
    <div>
      <Navbar />
      <Hero />
      <DataIntegrity />
      <Eligibility />
      <Timeline />
      <VideoSection />
      <DoseCard />
      <SurveyForm 
        onComplete={() => setFormCompleted(true)} 
        sessionPassword={sessionPassword}
      />
      <Documents 
        formCompleted={formCompleted} 
        sessionPassword={sessionPassword}
      />
      <FAQ />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
