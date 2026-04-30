const { useState, useEffect, useRef } = React;

/* ── Scroll Animation Hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in-up');
    // Immediately reveal anything already in the viewport (above-the-fold)
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

/* ── Navbar ── */
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
            src="Daewoong Header for questionaire.png"
            alt="Daewoong Indonesia"
            className="h-9 w-auto object-contain"
            style={{filter: 'none'}}
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
      {/* Decorative orbs */}
      <div style={{position:'absolute',top:'-10%',right:'-5%',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(59,111,232,0.3) 0%,transparent 70%)',pointerEvents:'none'}}></div>
      <div style={{position:'absolute',bottom:'-15%',left:'-8%',width:'600px',height:'600px',background:'radial-gradient(circle,rgba(20,184,166,0.15) 0%,transparent 70%)',pointerEvents:'none'}}></div>

      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
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

          {/* Stats bar */}
          <div className="fade-in-up delay-400 flex flex-wrap gap-x-8 gap-y-4">
            {[
              {label:'Lokasi Survei', num:'5 Aktif · 15+ Potensial'},
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

      {/* Scroll indicator */}
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
  const potentialSites = sites.filter(s => s.status === 'potential');

  const principles = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      ),
      title: 'Ketergantungan Sumber Data',
      desc: 'Seluruh entri data dilakukan melalui spreadsheet terenkripsi yang telah dikonfigurasi oleh tim survei. Tidak diperkenankan penggunaan format data alternatif.',
      tag: 'Spreadsheet Terenkripsi',
      tagColor: '#e0ebff',
      tagText: '#1a3480',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Pseudonimisasi Subjek',
      desc: 'Identitas pasien dilindungi menggunakan kode subjek unik yang menggantikan nama dan nomor rekam medis, sesuai standar privasi data klinis.',
      tag: 'Perlindungan Privasi',
      tagColor: '#ccfbf1',
      tagText: '#0d9488',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Integritas & Kepatuhan',
      desc: 'Data harus mencerminkan catatan rekam medis aktual. Estimasi, asumsi, atau interpolasi data tidak diperkenankan dalam kondisi apa pun.',
      tag: 'Zero Tolerance',
      tagColor: '#fef3c7',
      tagText: '#92400e',
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
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
            Prinsip Pengelolaan Data
          </h2>
          <p className="text-gray-500 max-w-xl text-lg leading-relaxed" style={{textWrap:'pretty'}}>
            Standar ketat untuk memastikan validitas dan reprodusibilitas setiap titik data yang dikumpulkan.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {principles.map((p, i) => (
            <div key={i} className={`fade-in-up delay-${(i+1)*100} card-hover bg-pharma-50 rounded-2xl p-7 border border-pharma-100`}>
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-pharma-600 mb-5">
                {p.icon}
              </div>
              <h3 className="font-display font-semibold text-pharma-900 text-lg mb-3" style={{fontFamily:'DM Sans,sans-serif'}}>{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                style={{background:p.tagColor,color:p.tagText}}>
                {p.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Subject ID Format */}
        <div className="fade-in-up bg-pharma-950 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge text-teal-400 mb-4 block">
                Format ID Subjek
              </span>
              <h3 className="font-display text-3xl font-bold text-white mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
                Kode Identifikasi<br/>Pasien
              </h3>
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
              {/* Active sites — show only 01–04 */}
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

/* ── Eligibility Section ── */
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
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {title:'Gangguan Hati',icon:'🫁',color:'#dc2626',bg:'#fef2f2',border:'#fecaca',desc:'Penyakit hati aktif atau peningkatan transaminase (SGOT/SGPT) persisten >3× batas normal atas.'},
            {title:'Gangguan Ginjal',icon:'🫘',color:'#d97706',bg:'#fffbeb',border:'#fde68a',desc:'Gangguan ginjal berat dengan nilai CrCl <30 mL/menit atau pasien yang menjalani dialisis.'},
            {title:'Kondisi Reproduksi',icon:'🤰',color:'#7c3aed',bg:'#faf5ff',border:'#ddd6fe',desc:'Kehamilan, menyusui, atau wanita berpotensi subur yang tidak menggunakan kontrasepsi yang memadai.'},
            {title:'Alergi & Hipersensitivitas',icon:'⚠️',color:'#b45309',bg:'#fffbeb',border:'#fde68a',desc:'Hipersensitivitas terhadap rosuvastatin, ezetimibe, atau komponen tablet Crezet lainnya.'},
            {title:'Miopati',icon:'💪',color:'#0369a1',bg:'#eff6ff',border:'#bfdbfe',desc:'Miopati aktif atau riwayat miopati yang diinduksi statin sebelumnya.'},
            {title:'Partisipasi Studi Lain',icon:'📋',color:'#065f46',bg:'#f0fdf4',border:'#bbf7d0',desc:'Pasien yang saat ini berpartisipasi dalam survei atau studi obat/intervensi lainnya secara bersamaan.'},
            {title:'Diskresi Dokter',icon:'🩺',color:'#6b7280',bg:'#f9fafb',border:'#e5e7eb',desc:'Setiap kondisi lain yang membuat pasien tidak layak mengikuti survei menurut penilaian dokter penanggung jawab.'},
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
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
            Kriteria Kelayakan
          </h2>
          <p className="text-gray-500 text-lg max-w-xl" style={{textWrap:'pretty'}}>
            Pastikan setiap pasien memenuhi semua kriteria sebelum data dimasukkan ke dalam sistem survei.
          </p>
        </div>

        {/* Tabs */}
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

        <div className="fade-in-up">
          {tabs[activeTab].content}
        </div>
      </div>
    </section>
  );
}

/* ── Timeline ── */
function Timeline() {
  const steps = [
    {
      week: 'Minggu ke-0',
      label: 'Awal / Baseline',
      badge: 'Kunjungan 1',
      color: '#3b6fe8',
      items: ['Konfirmasi eligibilitas pasien','Pencatatan diagnosis dislipidemia','Dokumentasi dosis Crezet awal','Data lab LDL & HDL (±30 hari)','Evaluasi CV Risk (ESC 2025)','Riwayat pengobatan sebelumnya'],
    },
    {
      week: 'Minggu ke-12',
      label: 'Pengamatan Rutin I',
      badge: 'Toleransi ±4 minggu',
      color: '#0d9488',
      items: ['Dokumentasi dosis Crezet aktual','Hasil lab LDL & HDL terbaru','Evaluasi CV Risk (ESC 2025)','Pencatatan efek samping (AE/SAE)','Nilai SGPT, SGOT, CK jika relevan','Kepatuhan penggunaan obat'],
    },
    {
      week: 'Minggu ke-24', // <-- Dikembalikan normal
      label: 'Pengamatan Rutin II',
      badge: 'Toleransi ±4 minggu', // <-- Dikembalikan ke ±4 minggu
      color: '#7c3aed',
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
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
            Alur Pengumpulan Data
          </h2>
          <p className="text-gray-500 text-lg max-w-xl" style={{textWrap:'pretty'}}>
            Tiga titik pengamatan selama 24 minggu untuk memastikan data longitudinal yang komprehensif.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 mx-20"
            style={{background:'linear-gradient(to right,#3b6fe8,#0d9488,#7c3aed)'}}></div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className={`fade-in-up delay-${(i+1)*100} relative`}>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm z-10 relative"
                      style={{background:step.color}}>
                      {i+1}
                    </div>
                    <div className="absolute inset-0 rounded-full opacity-30 scale-150 pulse-ring"
                      style={{background:step.color}}></div>
                  </div>
                </div>

                <div className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-center mb-5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                      style={{background:step.color+'15',color:step.color}}>
                      {step.badge}
                    </span>
                    <div className="font-display text-2xl font-bold text-pharma-900" style={{fontFamily:'DM Sans,sans-serif'}}>{step.week}</div>
                    <div className="text-gray-500 text-sm mt-1">{step.label}</div>
                  </div>

                  <div className="space-y-2.5">
                    {step.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{background:step.color+'20'}}>
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

        {/* Total duration badge */}
        <div className="fade-in-up mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-pharma-50 rounded-2xl px-8 py-4 border border-pharma-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b6fe8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="text-pharma-700 font-medium">Total durasi pengamatan:</span>
            {/* ±8 minggu dipindah ke sini */}
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
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
            Video Panduan Teknis
          </h2>
          <p className="text-gray-500 text-lg">Survei Klinis Crezet 2026</p>
        </div>

        <div className="fade-in-up">
          {/* Container Video Responsive */}
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

          {/* Video meta */}
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

/* ── Multi-Step Form (Konfirmasi & MOU) ── */
function SurveyForm() {
  const [step, setStep] = useState(1); // 1 = Konfirmasi, 2 = MOU, 3 = Sukses Semua
  const [loading, setLoading] = useState(false);
  
  // Membuat ID unik otomatis agar Form 1 dan Form 2 bisa dihubungkan di database
  const [sessionId] = useState(() => 'DOC-' + Date.now());

  // GANTI URL INI DENGAN WEB APP URL DARI APPS SCRIPT!
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyxHIYu-emakfDUoq4x9N2REFb40i8R8gRmfK4vo1br7jtqxu45HJHbSKVn-R6zNUe1-Q/exec';

  // Fungsi Submit Form 1 (Langsung masuk database)
  function submitKonfirmasi(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append("formType", "konfirmasi"); // Penanda Form 1
    formData.append("sessionId", sessionId);   // Mengirim ID Unik
    
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(() => {
        setLoading(false);
        setStep(2); // Lanjut ke Form 2 setelah berhasil masuk database
        window.scrollTo({ top: document.getElementById('form').offsetTop - 100, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error!', error.message);
        setLoading(false);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  }

  // Fungsi Submit Form 2
  function submitMOU(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append("formType", "mou");      // Penanda Form 2
    formData.append("sessionId", sessionId); // Mengirim ID Unik yang sama dengan Form 1
    
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(() => {
        setLoading(false);
        setStep(3); // Menuju halaman sukses
        window.scrollTo({ top: document.getElementById('form').offsetTop - 100, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error!', error.message);
        setLoading(false);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  }

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
              
              {/* Bagian 1: Data Klinik */}
              <div>
                <h3 className="font-bold text-pharma-800 text-xl mb-4 pb-2 border-b border-gray-100">1. Informasi Legal Klinik/RS</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">1. Nama legal klinik sesuai akta notaris pendirian</label>
                    <input type="text" name="legalKlinik" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">2. Alamat lengkap klinik (Kelurahan, Kec, Kota, Prov, Kode Pos)</label>
                    <textarea name="alamatKlinik" rows="2" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">3. Nama perwakilan tanda tangan klinik</label>
                    <input type="text" name="namaMewakili" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">4. Jabatan perwakilan (Misal: Direktur Utama)</label>
                    <input type="text" name="jabatanMewakili" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">5. NIK sesuai KTP perwakilan</label>
                    <input type="number" name="nik" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">11. Kepemilikan Klinik</label>
                    <input type="text" name="kepemilikan" required placeholder="Contoh: Swasta / Pemerintah" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                </div>
              </div>

              {/* Bagian 2: Data Dokter */}
              <div>
                <h3 className="font-bold text-pharma-800 text-xl mb-4 pb-2 border-b border-gray-100">2. Data Dokter Penanggung Jawab</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">6. Jabatan dokter penanda tangan</label>
                    <input type="text" name="jabatanDokter" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">10. Background Dokter (Spesialis/Umum)</label>
                    <input type="text" name="background" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">7. Alamat lengkap dokter penanda tangan</label>
                    <textarea name="alamatDokter" rows="2" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">8. No. Telp aktif</label>
                    <input type="tel" name="telpDokter" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">9. Email aktif</label>
                    <input type="email" name="emailDokter" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-pharma-500 outline-none" />
                  </div>
                </div>
              </div>

              {/* Bagian 3: Survey Tambahan */}
              <div>
                <h3 className="font-bold text-pharma-800 text-xl mb-4 pb-2 border-b border-gray-100">3. Kuesioner Kelayakan</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">12. Ketersediaan Crezet di Klinik Anda jika sudah tersedia (sebutkan dosisnya)</label>
                    <input type="text" name="ketersediaan" required placeholder="Contoh: Tersedia 10/10mg" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                  </div>
                  
                  {[
                    {name: 'q13', label: '13. Apakah dokter sudah dijelaskan mengenai Survey Klinis Crezet?'},
                    {name: 'q14', label: '14. Apakah sudah dijelaskan bahwa biaya pembelian obat (Crezet) pasien survey tidak ditanggung Daewoong?'},
                    {name: 'q15', label: '15. Apakah sudah dijelaskan pasien mendapatkan manfaat potongan harga pemeriksaan lab di minggu ke-12 dan 24?'},
                    {name: 'q16', label: '16. Apakah dokter bersedia untuk terlibat dalam Survey Klinis Crezet?'}
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
          <div className="animate-fade-in text-center py-12">
            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>Data Berhasil Disimpan!</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Terima kasih. Form Konfirmasi Panduan dan Kelengkapan Data MOU Anda telah terekam di dalam sistem kami.</p>
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
    {
      q: 'Bagaimana jika data lab tidak tersedia?',
      a: 'Wajib mencantumkan keterangan "Tidak Dilakukan/Tidak Tersedia" pada kolom yang bersangkutan. Estimasi, interpolasi, atau penggunaan data dari sumber lain tidak diperkenankan dalam kondisi apa pun. Integritas data adalah prioritas utama.',
      tag: 'Data Lab',
    },
    {
      q: 'Apa saja dosis Crezet yang didokumentasikan?',
      a: 'Dosis yang valid untuk didokumentasikan adalah: 10/5 mg, 10/10 mg, atau 10/20 mg. Pastikan dosis yang dicatat sesuai dengan dosis aktual yang diberikan kepada pasien pada setiap titik pengamatan.',
      tag: 'Dosis',
    },
    {
      q: 'Bagaimana pelaporan jika terjadi efek samping?',
      a: 'Dokumentasikan semua Adverse Event (AE) dan Serious Adverse Event (SAE) yang terjadi selama periode pengamatan. Jika efek samping dianggap signifikan secara klinis, sertakan nilai SGPT, SGOT, dan CK yang relevan. Semua kejadian harus dilaporkan tanpa terkecuali.',
      tag: 'AE / SAE',
    },
    {
      q: 'Apakah pasien yang menghentikan Crezet di tengah studi tetap dicatat?',
      a: 'Ya. Pasien yang menghentikan penggunaan Crezet di tengah periode survei tetap harus didokumentasikan hingga titik penghentian, termasuk alasan penghentian (jika tersedia). Data parsial tetap bernilai untuk analisis.',
      tag: 'Penghentian Terapi',
    },
    {
      q: 'Siapa yang dapat dihubungi untuk pertanyaan teknis?',
      a: 'Pertanyaan teknis terkait pengisian data, format spreadsheet, atau interpretasi kriteria dapat disampaikan langsung kepada tim Medical Affairs Daewoong Pharmaceutical Indonesia melalui saluran komunikasi yang telah disediakan untuk masing-masing lokasi survei.',
      tag: 'Kontak',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="fade-in-up text-center mb-16">
          <span className="badge text-pharma-500 mb-4 inline-flex items-center gap-2 justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Pertanyaan Umum
          </span>
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
            FAQ
          </h2>
          <p className="text-gray-500 text-lg">Jawaban untuk pertanyaan yang paling sering diajukan.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`fade-in-up delay-${Math.min(i*100, 400)}`}>
              <div className={`border rounded-2xl overflow-hidden transition-all ${
                openIdx === i ? 'border-pharma-300 shadow-sm' : 'border-gray-100 bg-white'
              }`}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{background:'#e0ebff',color:'#1a3480'}}>
                      {faq.tag}
                    </span>
                    <span className="font-display font-semibold text-pharma-900 text-base" style={{fontFamily:'DM Sans,sans-serif',textWrap:'pretty'}}>{faq.q}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openIdx === i ? 'bg-pharma-600 text-white' : 'bg-pharma-50 text-pharma-400'
                  }`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.3s ease'}}>
                      <polyline points="2 4 7 9 12 4"/>
                    </svg>
                  </div>
                </button>
                
                <div style={{
                  maxHeight: openIdx === i ? '600px' : '0px',
                  opacity: openIdx === i ? '1' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                }}>
                  <p className="px-6 pb-6 text-slate-700 text-sm leading-relaxed" style={{paddingLeft:'1.5rem'}}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Dose Reference Card ── */
function DoseCard() {
  // Array data dosis beserta nama file gambar yang Anda berikan
  const doses = [
    { label: '10/5 mg', img: 'Crezet 10_5 Green 2.jpeg', color: '#65a30d' }, // Warna aksen Hijau
    { label: '10/10 mg', img: 'Crezet 10_10 Blue 2.jpeg', color: '#2563eb' }, // Warna aksen Biru
    { label: '10/20 mg', img: 'Crezet 10_20 Orange 1.jpeg', color: '#ea580c' } // Warna aksen Oranye
  ];

  return (
    <section className="py-24 bg-pharma-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {doses.map((d, i) => (
            <div key={i} className={`fade-in-up delay-${(i+1)*100} bg-white rounded-[2rem] overflow-hidden flex flex-col items-center pb-12 shadow-xl transform transition-transform hover:-translate-y-2`}>
              {/* Garis warna aksen di atas kartu yang mengikuti lengkungan border-radius */}
              <div className="w-full h-4" style={{backgroundColor: d.color}}></div>
              
              {/* Kontainer Gambar Obat */}
              <div className="h-56 md:h-64 w-full flex items-center justify-center p-8 mt-4">
                <img 
                  src={d.img} 
                  alt={`Crezet ${d.label}`} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>
              
              {/* Teks Dosis dan Kandungan */}
              <div className="text-center px-4 mt-auto">
                <div className="font-display font-bold text-pharma-900 text-4xl mb-2" style={{fontFamily:'DM Sans,sans-serif'}}>
                  {d.label}
                </div>
                <div className="text-gray-500 text-xs md:text-sm font-bold tracking-widest uppercase">
                  Ezetimibe/Rosuvastatin
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Password Modal ── */
function PasswordModal({ doc, onClose, onSuccess }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === 'clinical123') {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{background:'rgba(17,29,69,0.7)',backdropFilter:'blur(8px)'}}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 ${shake ? 'animate-shake' : ''}`}
        style={{animation: shake ? 'shake 0.4s ease' : 'none'}}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-pharma-50 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3480" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 className="font-display font-bold text-pharma-900 text-xl mb-1" style={{fontFamily:'DM Sans,sans-serif'}}>Dokumen Terlindungi</h3>
          <p className="text-gray-500 text-sm">Masukkan password untuk mengakses</p>
          {doc && <p className="text-pharma-600 text-xs font-medium mt-2 truncate">📄 {doc.title}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              placeholder="Masukkan password..."
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all font-mono ${
                error ? 'border-red-400 bg-red-50 text-red-700' : 'border-pharma-200 bg-pharma-50 focus:border-pharma-400 text-pharma-900'
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="5"/><line x1="6" y1="4" x2="6" y2="6"/><line x1="6" y1="8" x2="6.01" y2="8"/></svg>
                Password salah. Silakan coba lagi.
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit"
              className="flex-1 py-3 rounded-xl bg-pharma-600 text-white text-sm font-semibold hover:bg-pharma-700 transition-colors">
              Buka Dokumen
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

/* ── Documents Download Section ── */
function Documents() {
  const [modalDoc, setModalDoc] = useState(null);
  const [unlockedDocs, setUnlockedDocs] = useState(new Set());

  function handleUnlock(doc) {
    setUnlockedDocs(prev => new Set([...prev, doc.file]));
    const a = document.createElement('a');
    a.href = doc.file;
    a.download = doc.title + '.pdf';
    a.click();
  }

  function isUnlocked(file) {
    return unlockedDocs.has(file);
  }
  
  const docs = [
    {
      title: 'Panduan Survei Klinis Crezet 2026',
      desc: 'Dokumen panduan lengkap pelaksanaan survei klinis Crezet 2026 oleh Daewoong Pharmaceutical Indonesia.',
      file: 'Panduan Survei Klinis Crezet 2026 (Daewoong Pharmaceutical Indonesia) (2).pdf',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      color: '#1a3480',
      bg: '#e0ebff',
      size: 'PDF',
      tag: 'Panduan Utama',
    },
    {
      title: 'Panduan CV Risk Kalkulator',
      desc: 'Panduan penggunaan kalkulator risiko kardiovaskular untuk penilaian klinis pasien dislipidemia.',
      file: 'Panduan CV risk kalkulator.pdf',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
      color: '#3b6fe8',
      bg: '#e0ebff',
      size: '2.4 MB',
      tag: 'Kalkulasi Risiko',
    },
    {
      title: 'Panduan Pelaporan AE / SAE',
      desc: 'Prosedur lengkap pelaporan Adverse Event dan Serious Adverse Event sesuai standar survei klinis.',
      file: 'Panduan_Pelaporan_AE_SAE (1).pdf',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      color: '#dc2626',
      bg: '#fef2f2',
      size: '1.8 MB',
      tag: 'Keamanan & Pelaporan',
    },
    {
      title: 'Troubleshooting Guide',
      desc: 'Panduan pemecahan masalah teknis seputar pengisian data, spreadsheet, dan sistem entri survei.',
      file: 'Troubleshooting Guide.pdf',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        </svg>
      ),
      color: '#0d9488',
      bg: '#ccfbf1',
      size: '3.1 MB',
      tag: 'Teknis & Operasional',
    },
  ];

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
          <h2 className="font-display text-4xl font-bold text-pharma-900 mb-4" style={{fontFamily:'DM Sans,sans-serif'}}>
            Unduh Dokumen Referensi
          </h2>
          
          {/* BAGIAN INI: Subtitle dibuat BLUR dan tidak bisa diblok */}
          <p className="text-gray-500 text-lg max-w-xl" style={{textWrap:'pretty', filter: 'blur(5px)', opacity: 0.5, userSelect: 'none', pointerEvents: 'none'}}>
            Seluruh panduan teknis yang diperlukan untuk pelaksanaan survei klinis Crezet 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docs.map((doc, i) => (
            <div key={i} className={`fade-in-up delay-${(i+1)*100} card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col`}>
              <div className="h-1.5 w-full" style={{background:doc.color}}></div>

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{background:doc.bg, color:doc.color}}>
                    {doc.icon}
                  </div>
                  
                  {/* BAGIAN INI: Label "Panduan Utama", dsb ikut diblur jika belum di-unlock */}
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                    style={{
                      background:doc.bg, 
                      color:doc.color,
                      filter: isUnlocked(doc.file) ? 'none' : 'blur(4px)',
                      opacity: isUnlocked(doc.file) ? 1 : 0.4,
                      userSelect: isUnlocked(doc.file) ? 'auto' : 'none'
                    }}>
                    {doc.tag}
                  </span>
                </div>

                {isUnlocked(doc.file) ? (
                  <>
                    {/* Tampilan Unlocked: Semua Blur Hilang */}
                    <h3 className="font-display font-semibold text-pharma-900 text-lg mb-2 leading-snug" style={{fontFamily:'DM Sans,sans-serif'}}>
                      {doc.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">{doc.desc}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span className="font-mono">PDF · {doc.size}</span>
                      </div>
                      <button onClick={() => handleUnlock(doc)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-md active:scale-95"
                        style={{background:doc.color, color:'white'}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Unduh
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col">
                    {/* Tampilan Locked: Judul Utama & Deskripsi di dalam kotak diblur */}
                    <div className="flex-1 mb-6 relative select-none" style={{filter:'blur(6px)', opacity: 0.4, userSelect:'none', pointerEvents:'none'}}>
                      <h3 className="font-display font-semibold text-pharma-900 text-lg mb-2 leading-snug" style={{fontFamily:'DM Sans,sans-serif'}}>
                        {doc.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-50 mt-auto">
                      <button onClick={() => setModalDoc(doc)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-md border-2"
                        style={{borderColor:doc.color+'40',color:doc.color,background:doc.bg}}>
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
          Dokumen bersifat <span className="font-medium text-pharma-500">konfidensial</span> — dilindungi password untuk penggunaan internal tim survei klinis.
        </div>
      </div>

      {modalDoc && (
        <PasswordModal
          doc={modalDoc}
          onClose={() => setModalDoc(null)}
          onSuccess={handleUnlock}
        />
      )}
    </section>
  );
}
/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-pharma-950 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="Daewoong Header for questionaire.png"
                alt="Daewoong Indonesia"
                className="h-8 w-auto object-contain"
                style={{filter:'brightness(0) invert(1) opacity(0.8)'}}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Panduan resmi survei klinis penggunaan Crezet dalam praktik klinis rutin di Indonesia tahun 2026.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white/80" style={{fontFamily:'DM Sans,sans-serif'}}>Lokasi Survei</h4>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Aktif</p>
            <ul className="space-y-1.5 text-white/60 text-sm mb-4">
              {[
                {code:'01',name:'RS XXX'},{code:'02',name:'Klinik XXX'},
                {code:'03',name:'Klinik XXX'},{code:'04',name:'RS XXX'},
                {code:'05',name:'Klinik XXX'},
              ].map(s => (
                <li key={s.code} className="flex items-center gap-2">
                  <span className="font-mono text-pharma-400 text-xs">{s.code}</span> {s.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white/80" style={{fontFamily:'DM Sans,sans-serif'}}>Dokumen</h4>
            <ul className="space-y-2 text-sm">
              {['Panduan PDF Lengkap','Spreadsheet Entri Data','Template Laporan AE/SAE','Formulir Kontraindikasi'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="0" y1="6" x2="12" y2="6"/><polyline points="7 1 12 6 7 11"/></svg>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2026 Daewoong Pharmaceutical Indonesia. Seluruh hak dilindungi undang-undang.
          </p>
          <p className="text-white/20 text-xs font-mono">
            Panduan Survei Klinis Crezet · Versi 1.0 · April 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
function App() {
  useScrollReveal();

  return (
    <div>
      <Navbar />
      <Hero />
      <DataIntegrity />
      <Eligibility />
      <Timeline />
      <VideoSection />
      <DoseCard />
      <Documents />
      <SurveyForm /> {/* FORM ADA DI SINI */}
      <FAQ />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);