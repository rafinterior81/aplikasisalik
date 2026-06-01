import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, BookOpen, CheckSquare, MessageCircle, Menu, Play, RotateCcw, 
  Save, ChevronRight, ChevronDown, Activity, Heart, Shield, Send, 
  Loader2, Wind, Moon, Sun, Book, Bookmark, Settings, X, Target, 
  BarChart2, Bell, User, Edit3, ArrowRight, BookHeart, Calendar,
  TrendingUp, Award, Download, Upload, Trash2, Smartphone, BellRing, Info, Plus
} from 'lucide-react';

const INITIAL_MUHASABAH = {
  "Ibadah Wajib": ["Sholat Subuh", "Sholat Dzuhur", "Sholat Ashar", "Sholat Maghrib", "Sholat Isya", "Berjamaah (Bagi Laki-laki)", "Khusyuk dalam Sholat"],
  "Tazkiyatun Nafs": ["Menjaga Ikhlas", "Menjaga Sabar", "Menjaga Syukur", "Menjaga Tawakal", "Menjaga Ridha"],
  "Sunnah Nabi ﷺ": ["Qiyamul Lail", "Sholat Dhuha", "Sholat Rawatib", "Puasa Sunnah", "Sedekah", "Membaca Al-Qur'an", "Dzikir Pagi/Petang"],
  "Muhasabah Anggota Tubuh": [
    "Mata: Bebas melihat yang haram", 
    "Lisan: Bebas Ghibah & Namimah", 
    "Lisan: Bebas Dusta", 
    "Lisan: Menahan keluh kesah",
    "Telinga: Bebas mendengar maksiat", 
    "Tangan/Kaki: Tidak mendzalimi makhluk"
  ],
  "Muhasabah Hati & Ruh": [
    "Bebas Riya (Ingin dipuji)", 
    "Bebas Ujub (Bangga diri)", 
    "Bebas Hasad (Dengki)", 
    "Bebas Takabur (Sombong)", 
    "Bebas Hubbud Dunya berlebih",
    "Muraqabah (Merasa diawasi Allah)"
  ],
};

const PANDUAN_MATERI = [
  {
    kategori: "Dasar & Tujuan Suluk",
    icon: "bg-blue-100 text-blue-600",
    materi: [
      { judul: "Tujuan Suluk", isi: "Suluk adalah perjalanan spiritual menuju Allah SWT. Tujuannya bukan untuk mendapatkan kesaktian atau pujian, melainkan mencapai Makrifatullah (mengenal Allah) dan meraih ridha-Nya dengan menyucikan hati dari selain Allah (Takhalli) dan menghiasinya dengan sifat terpuji (Tahalli)." },
      { judul: "Maqamat (Terminal Spiritual)", isi: "Merupakan tahapan kedudukan hamba di sisi Allah yang dicapai dengan usaha (kasb). Dimulai dari Taubat, Wara', Zuhud, Fakir, Sabar, Tawakal, hingga mencapai tingkat tertinggi yaitu Ridha." },
      { judul: "Ahwal (Kondisi Hati)", isi: "Berbeda dengan maqamat, Ahwal adalah pemberian langsung dari Allah (Wahb) tanpa usaha manusia. Contohnya adalah rasa takut yang amat sangat (Khauf), harap (Raja'), rindu (Syauq), dan rasa tenang bersama Allah (Uns Billah)." }
    ]
  },
  {
    kategori: "Adab Salik (Pencari Jalan)",
    icon: "bg-amber-100 text-amber-600",
    materi: [
      { judul: "Adab Kepada Allah", isi: "Senantiasa merasa diawasi (Muraqabah), menjaga pandangan batin agar tidak berpaling dari-Nya, ridha terhadap segala ketetapan takdir, dan menyadari bahwa setiap nikmat adalah murni karunia-Nya." },
      { judul: "Adab Kepada Rasulullah ﷺ", isi: "Memperbanyak sholawat, menghidupkan sunnah-sunnahnya baik yang zahir maupun batin, mencintai keluarga dan sahabatnya, serta menjadikannya sebagai teladan mutlak." },
      { judul: "Adab Kepada Mursyid", isi: "Mursyid adalah dokter ruhani. Seorang salik harus husnudzon, tunduk pada arahannya dalam hal suluk, tidak membantah, dan tidak mencari-cari kesalahan guru, karena keberkahan ilmu ada pada ketaatan dan adab." },
      { judul: "Adab Kepada Ikhwan & Diri", isi: "Kepada saudara sejalan (ikhwan): saling mendoakan, tawadhu, tidak merasa lebih suci. Kepada diri sendiri: senantiasa menuduh diri penuh kekurangan (muhasabah) agar tidak timbul sifat ujub." }
    ]
  },
  {
    kategori: "Mengobati Penyakit Hati",
    icon: "bg-red-100 text-red-600",
    materi: [
      { judul: "Riya' (Pamer)", isi: "Beramal karena ingin dilihat atau dipuji manusia. Obatnya: Menyadari bahwa pujian manusia tidak memperpanjang umur atau menyelamatkan dari neraka. Latihlah menyembunyikan amal sunnah seperti menyembunyikan aib." },
      { judul: "Ujub (Bangga Diri)", isi: "Kagum terhadap diri sendiri atau amalnya, merasa hebat tanpa menyadari itu taufik dari Allah. Obatnya: Menyadari hakikat kehinaan diri dan bahwa amal tersebut bisa saja tertolak jika Allah menghendaki." },
      { judul: "Takabur (Sombong)", isi: "Menolak kebenaran dan meremehkan orang lain. Obatnya: Mengingat asal penciptaan dari air mani yang hina, dan akhir kehidupan yang menjadi bangkai di tanah." },
      { judul: "Hasad (Dengki)", isi: "Membenci nikmat yang ada pada orang lain dan berharap nikmat itu hilang darinya. Obatnya: Ridha dengan pembagian rezeki dari Allah (Qada dan Qadar), serta mendoakan kebaikan untuk orang yang didengki." }
    ]
  }
];

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 transition">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProgressRing = ({ progress, size = 80, strokeWidth = 6, color = "#059669", bg = "#E5E7EB" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={bg} strokeWidth={strokeWidth} fill="transparent" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="transparent"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold text-gray-800">{progress}%</span>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ enabled, onChange }) => (
  <button 
    onClick={onChange}
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const HomeDashboard = ({ muhasabahState, tasbihCount, muhasabahList, navigate }) => {
  const calculateProgress = () => {
    const totalItems = Object.values(muhasabahList).flat().length;
    const completedItems = Object.values(muhasabahState).filter(Boolean).length;
    return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  };
  const progress = calculateProgress();
  const sholatWajib = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

  return (
    <div className="p-5 pb-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Ahlan wa Sahlan,</h2>
          <p className="text-gray-500">Semoga harimu penuh berkah.</p>
        </div>
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
          <User size={24} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 shadow-xl shadow-emerald-900/20 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10"><Target size={150} /></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-emerald-100 text-sm font-medium">Indeks Spiritual Harian</p>
            <h3 className="text-3xl font-bold">{progress}% <span className="text-lg font-normal text-emerald-200">Tercapai</span></h3>
            <button onClick={() => navigate('muhasabah')} className="mt-3 bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full text-sm font-medium flex items-center backdrop-blur-sm">
              Isi Muhasabah <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
          <div className="bg-white rounded-full p-2">
             <ProgressRing progress={progress} size={70} strokeWidth={5} />
          </div>
        </div>
      </div>

      <button onClick={() => navigate('ai')} className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all group active:scale-[0.98]">
        <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
          <MessageCircle size={28} />
        </div>
        <div className="text-left flex-1">
          <h4 className="text-gray-800 font-bold text-lg mb-0.5">Tanya Mursyid AI</h4>
          <p className="text-gray-500 text-sm italic">"Ada kerisauan hati yang ingin diutarakan?"</p>
        </div>
        <ChevronRight className="text-gray-300" />
      </button>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Status Sholat Fardhu</h3>
          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">Hari ini</span>
        </div>
        <div className="flex justify-between">
          {sholatWajib.map((waktu, idx) => {
            const isDone = muhasabahState[`Ibadah Wajib-Sholat ${waktu}`];
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                  {isDone ? <CheckSquare size={20} /> : <Moon size={20} />}
                </div>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{waktu}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
            <BookHeart size={24} />
          </div>
          <div>
            <h4 className="text-gray-800 font-bold mb-1">Kalam Mursyid Hari Ini</h4>
            <p className="text-gray-600 text-sm leading-relaxed italic font-serif">
              "Ketahuilah, hati yang penuh dengan cinta kepada selain-Nya tidak akan memiliki ruang untuk menerima cahaya makrifatullah. Kosongkanlah wadahmu."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => navigate('riyadhoh')} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 hover:border-emerald-200 transition group text-left">
          <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform"><Play size={20} /></div>
          <div>
            <h4 className="font-bold text-xl text-gray-800">{tasbihCount}</h4>
            <p className="text-xs text-gray-500 font-medium">Zikir Hari Ini</p>
          </div>
        </button>
        <button onClick={() => navigate('amalan')} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 hover:border-blue-200 transition group text-left">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform"><Book size={20} /></div>
          <div>
            <h4 className="font-bold text-xl text-gray-800">2</h4>
            <p className="text-xs text-gray-500 font-medium">Wirid Selesai</p>
          </div>
        </button>
      </div>
    </div>
  );
};

const RiyadhohScreen = ({ tasbihCount, setTasbihCount, tasbihTarget, setTasbihTarget }) => {
  const [activeSubTab, setActiveSubTab] = useState('tasbih'); 
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [tempTarget, setTempTarget] = useState(tasbihTarget);

  const handleTap = () => {
    setTasbihCount(prev => prev + 1);
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(40);
  };

  const saveTarget = () => {
    setTasbihTarget(parseInt(tempTarget) || 100);
    setIsTargetModalOpen(false);
  };

  const TasbihView = () => (
    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300 w-full">
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 w-full flex flex-col items-center">
        <div className="relative flex justify-center items-center w-full mb-8">
           <div className="text-7xl font-bold text-emerald-800 tracking-tighter font-mono z-10">
             {String(tasbihCount).padStart(4, '0')}
           </div>
           <div className="absolute text-9xl text-emerald-50 opacity-50 font-bold -z-10 tracking-tighter">
             {String(tasbihCount).padStart(4, '0')}
           </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((tasbihCount/tasbihTarget)*100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 font-medium mb-10 w-full flex justify-between">
          <span>Target: {tasbihTarget}</span>
          <span>{Math.round((tasbihCount/tasbihTarget)*100)}%</span>
        </p>
        <button onClick={handleTap} className="w-48 h-48 bg-emerald-50 rounded-full shadow-[0_0_40px_rgba(5,150,105,0.15)] active:shadow-inner active:scale-95 transition-all flex items-center justify-center p-4">
          <div className="w-full h-full bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-emerald-300 text-white">
             <Heart size={32} className="mb-2 opacity-80" />
             <span className="font-bold text-2xl tracking-widest">TAP</span>
          </div>
        </button>
        <div className="flex justify-center gap-8 w-full mt-10">
          <button onClick={() => setIsResetModalOpen(true)} className="flex flex-col items-center text-gray-400 hover:text-red-500 transition-colors">
            <div className="bg-gray-50 p-4 rounded-2xl mb-1"><RotateCcw size={20} /></div>
            <span className="text-xs font-semibold">Reset</span>
          </button>
          <button onClick={() => setIsTargetModalOpen(true)} className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
            <div className="bg-gray-50 p-4 rounded-2xl mb-1"><Target size={20} /></div>
            <span className="text-xs font-semibold">Target</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ZikirNafasView = () => (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h3 className="text-xl font-bold text-gray-800">Latihan Zikir Nafas</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-[250px] mx-auto">Sadari keluarnya nafas dengan "Hu", masuknya nafas dengan "Allah".</p>
      </div>
      <div className="relative w-64 h-64 flex items-center justify-center">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes breathe {
            0% { transform: scale(0.6); opacity: 0.5; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
            40% { transform: scale(1.2); opacity: 0.2; box-shadow: 0 0 60px rgba(16, 185, 129, 0.6); }
            50% { transform: scale(1.2); opacity: 0.2; box-shadow: 0 0 60px rgba(16, 185, 129, 0.6); }
            90% { transform: scale(0.6); opacity: 0.5; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
            100% { transform: scale(0.6); opacity: 0.5; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
          }
          .breathe-circle { animation: breathe 8s infinite ease-in-out; }
        `}} />
        <div className="absolute w-full h-full bg-emerald-200 rounded-full breathe-circle"></div>
        <div className="absolute w-48 h-48 bg-emerald-400 rounded-full breathe-circle" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute w-32 h-32 bg-white rounded-full shadow-lg z-10 flex flex-col items-center justify-center text-emerald-800 border-4 border-emerald-50">
          <Wind size={32} className="mb-2 text-emerald-500" />
          <span className="font-bold text-sm">Huu - Allah</span>
        </div>
      </div>
      <div className="mt-16 bg-white px-6 py-3 rounded-full shadow-sm text-sm font-medium text-gray-500 border border-gray-100 flex items-center">
        <Activity size={16} className="mr-2 text-emerald-500" /> Siklus 8 Detik
      </div>
    </div>
  );

  return (
    <div className="p-4 pb-24 h-full flex flex-col">
      <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-6">
        <button onClick={() => setActiveSubTab('tasbih')} className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${activeSubTab === 'tasbih' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>Tasbih Digital</button>
        <button onClick={() => setActiveSubTab('nafas')} className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${activeSubTab === 'nafas' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>Zikir Nafas</button>
      </div>
      <div className="flex-1 flex justify-center">
        {activeSubTab === 'tasbih' ? <TasbihView /> : <ZikirNafasView />}
      </div>

      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} title="Reset Zikir">
        <p className="text-gray-600 mb-6 text-center">Anda yakin ingin mereset hitungan zikir kembali ke 0?</p>
        <div className="flex gap-3">
          <button onClick={() => setIsResetModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl">Batal</button>
          <button onClick={() => { setTasbihCount(0); setIsResetModalOpen(false); }} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md shadow-red-200">Ya, Reset</button>
        </div>
      </Modal>

      <Modal isOpen={isTargetModalOpen} onClose={() => setIsTargetModalOpen(false)} title="Atur Target Harian">
        <div className="mb-6">
          <label className="text-sm text-gray-500 font-medium mb-2 block">Masukkan target jumlah zikir:</label>
          <input type="number" className="w-full bg-gray-50 border border-gray-200 text-3xl font-bold text-center text-emerald-800 rounded-xl py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={tempTarget} onChange={(e) => setTempTarget(e.target.value)} />
        </div>
        <button onClick={saveTarget} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-md shadow-emerald-200">Simpan Target</button>
      </Modal>
    </div>
  );
};

const MuhasabahScreen = ({ muhasabahState, setMuhasabahState, muhasabahList, setMuhasabahList }) => {
  const [expandedCategory, setExpandedCategory] = useState("Ibadah Wajib");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryToAdd, setCategoryToAdd] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const toggleMuhasabahItem = (category, item) => {
    setMuhasabahState(prev => ({
      ...prev,
      [`${category}-${item}`]: !prev[`${category}-${item}`]
    }));
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    setMuhasabahList(prev => ({
      ...prev,
      [categoryToAdd]: [...(prev[categoryToAdd] || []), newItemName.trim()]
    }));
    setNewItemName("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-4 pb-24 animate-in fade-in duration-300">
      <div className="mb-6 bg-emerald-700 p-6 rounded-3xl shadow-lg text-white">
        <h2 className="text-2xl font-bold tracking-tight">Muhasabah Diri</h2>
        <p className="text-emerald-100 text-sm mt-2 opacity-90">"Hisablah dirimu sebelum engkau dihisab pada hari Kiamat kelak." (Umar bin Khattab)</p>
      </div>

      <div className="space-y-4">
        {Object.entries(muhasabahList).map(([category, items]) => {
          const isExpanded = expandedCategory === category;
          const completedInCategory = items.filter(item => muhasabahState[`${category}-${item}`]).length;
          const isAllCompleted = completedInCategory === items.length && items.length > 0;
          
          return (
            <div key={category} className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-colors ${isAllCompleted ? 'border-emerald-200' : 'border-gray-100'}`}>
              <button onClick={() => setExpandedCategory(isExpanded ? null : category)} className="w-full px-5 py-5 flex justify-between items-center bg-transparent hover:bg-gray-50 transition-colors">
                <div className="flex items-center text-left">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${isAllCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {isAllCompleted ? <CheckSquare size={20} /> : <Edit3 size={20} />}
                  </div>
                  <div>
                    <span className={`font-bold block ${isAllCompleted ? 'text-emerald-800' : 'text-gray-800'}`}>{category}</span>
                    <span className="text-xs text-gray-400 font-medium">Terselesaikan {completedInCategory} dari {items.length}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-full ${isExpanded ? 'bg-gray-100' : ''}`}>
                  {isExpanded ? <ChevronDown size={20} className="text-gray-600" /> : <ChevronRight size={20} className="text-gray-400" />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-50 bg-gray-50/30">
                  {items.map(item => {
                    const id = `${category}-${item}`;
                    const isChecked = !!muhasabahState[id];
                    return (
                      <label key={id} className="flex items-start py-3 cursor-pointer group">
                        <div className={`mt-0.5 w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mr-4 transition-all duration-200 ${isChecked ? 'bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-200' : 'border-2 border-gray-300 bg-white group-hover:border-emerald-400'}`}>
                          {isChecked && <CheckSquare className="w-4 h-4 text-white" />}
                        </div>
                        <span className={`text-sm pt-0.5 font-medium transition-colors ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-emerald-800'}`}>{item}</span>
                        <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleMuhasabahItem(category, item)} />
                      </label>
                    );
                  })}
                  
                  <button 
                    onClick={() => { setCategoryToAdd(category); setIsAddModalOpen(true); }} 
                    className="w-full mt-4 py-3 flex items-center justify-center text-sm text-emerald-600 font-medium bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-100 border-dashed"
                  >
                    <Plus size={16} className="mr-2" /> Tambah Item {category}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={`Tambah: ${categoryToAdd}`}>
        <div className="mb-6">
          <label className="text-sm text-gray-500 font-medium mb-2 block">Nama item muhasabah baru:</label>
          <input 
            type="text" 
            placeholder="Contoh: Baca Surah Al-Waqi'ah"
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
          />
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl">Batal</button>
          <button onClick={handleAddItem} disabled={!newItemName.trim()} className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-md shadow-emerald-200 disabled:opacity-50">Simpan</button>
        </div>
      </Modal>
    </div>
  );
};

const PanduanScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (idx) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  return (
    <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Panduan Salik</h2>
        <p className="text-gray-500 text-sm mt-1">Materi dasar suluk, adab, dan penyucian jiwa (Tazkiyatun Nafs).</p>
      </div>

      <div className="space-y-4">
        {PANDUAN_MATERI.map((kategori, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection(idx)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${kategori.icon}`}>
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-gray-800 text-left">{kategori.kategori}</h3>
              </div>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${expandedSection === idx ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSection === idx && (
              <div className="p-4 pt-0 border-t border-gray-50 bg-slate-50/50 space-y-4">
                {kategori.materi.map((materi, mIdx) => (
                  <div key={mIdx} className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-emerald-800 mb-2">{materi.judul}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{materi.isi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressScreen = ({ muhasabahState, tasbihCount, muhasabahList }) => {
  const totalItems = Object.values(muhasabahList).flat().length;
  const completedItems = Object.values(muhasabahState).filter(Boolean).length;
  const muhasabahScore = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  const weeklyData = [
    { day: 'Sn', val: 40 },
    { day: 'Sl', val: 60 },
    { day: 'Rb', val: 80 },
    { day: 'Km', val: 50 },
    { day: 'Jm', val: 90 },
    { day: 'Sb', val: 70 },
    { day: 'Ah', val: muhasabahScore || 10 },
  ];

  return (
    <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Statistik Perkembangan</h2>
        <p className="text-gray-500 text-sm mt-1">Pantau grafik dan konsistensi ibadahmu.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-600 text-white p-5 rounded-3xl shadow-md shadow-emerald-200 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20"><TrendingUp size={80} /></div>
          <p className="text-emerald-100 text-xs font-medium mb-1">Skor Muhasabah</p>
          <h3 className="text-3xl font-bold">{muhasabahScore}%</h3>
          <p className="text-[10px] mt-2 opacity-80">Hari Ini</p>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-gray-900"><Award size={80} /></div>
          <p className="text-gray-500 text-xs font-medium mb-1">Total Zikir</p>
          <h3 className="text-3xl font-bold text-gray-800">{tasbihCount}</h3>
          <p className="text-[10px] text-emerald-600 font-medium mt-2">Terus Tingkatkan!</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Grafik Mingguan</h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">Skor Muhasabah</span>
        </div>
        
        <div className="flex items-end justify-between h-40 gap-2 pb-2">
          {weeklyData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center h-32 relative group">
                <div 
                  className={`w-full max-w-[24px] rounded-t-lg transition-all duration-1000 ease-out ${idx === 6 ? 'bg-emerald-500 shadow-md shadow-emerald-200' : 'bg-emerald-100'}`}
                  style={{ height: `${data.val}%` }}
                ></div>
                <span className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.val}%
                </span>
              </div>
              <span className={`text-xs mt-2 font-medium ${idx === 6 ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Konsistensi Terakhir</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Calendar size={18} /></div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm">Zikir 3 Hari Berturut-turut</h4>
              <p className="text-xs text-gray-500">Selesai pada hari Minggu</p>
            </div>
            <CheckSquare size={18} className="text-emerald-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Heart size={18} /></div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm">Muhasabah Hati Sempurna</h4>
              <p className="text-xs text-gray-500">Mencapai target kemarin</p>
            </div>
            <CheckSquare size={18} className="text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsScreen = ({ setTasbihCount, setMuhasabahState, setMuhasabahList, navigate }) => {
  const [notifAdzan, setNotifAdzan] = useLocalStorage('setting_notif_adzan', true);
  const [notifZikir, setNotifZikir] = useLocalStorage('setting_notif_zikir', false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleResetApp = () => {
    setTasbihCount(0);
    setMuhasabahState({});
    setMuhasabahList(INITIAL_MUHASABAH);
    window.localStorage.removeItem('riyadhoh_tasbih_count');
    window.localStorage.removeItem('riyadhoh_muhasabah_state');
    window.localStorage.removeItem('riyadhoh_muhasabah_list');
    setIsResetModalOpen(false);
    navigate('home');
  };

  return (
    <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pengaturan</h2>
        <p className="text-gray-500 text-sm mt-1">Sesuaikan preferensi dan kelola data aplikasi.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2">
          <div className="p-4 border-b border-gray-50 flex items-center gap-3">
            <BellRing size={18} className="text-emerald-600" />
            <h3 className="font-bold text-gray-800">Notifikasi & Pengingat</h3>
          </div>
          <div className="p-4 flex justify-between items-center border-b border-gray-50">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Pengingat Waktu Sholat</p>
              <p className="text-xs text-gray-500">Notifikasi saat masuk waktu adzan</p>
            </div>
            <ToggleSwitch enabled={notifAdzan} onChange={() => setNotifAdzan(!notifAdzan)} />
          </div>
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Pengingat Wirid Harian</p>
              <p className="text-xs text-gray-500">Notifikasi rutinitas wirid pagi & petang</p>
            </div>
            <ToggleSwitch enabled={notifZikir} onChange={() => setNotifZikir(!notifZikir)} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2">
          <div className="p-4 border-b border-gray-50 flex items-center gap-3">
            <Save size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-800">Manajemen Data</h3>
          </div>
          <button className="w-full p-4 flex justify-between items-center border-b border-gray-50 hover:bg-gray-50 transition-colors text-left">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Backup Data Ke Cloud</p>
              <p className="text-xs text-gray-500">Simpan progress ibadah Anda (Segera)</p>
            </div>
            <Upload size={18} className="text-gray-400" />
          </button>
          <button onClick={() => setIsResetModalOpen(true)} className="w-full p-4 flex justify-between items-center hover:bg-red-50 rounded-b-2xl transition-colors text-left group">
            <div>
              <p className="font-semibold text-red-600 text-sm">Reset Semua Data</p>
              <p className="text-xs text-red-400">Hapus zikir, muhasabah, dan pengaturan</p>
            </div>
            <Trash2 size={18} className="text-red-400 group-hover:text-red-600" />
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info size={24} className="text-gray-400" />
            <div>
              <h3 className="font-bold text-gray-800">Riyadhoh Salik App</h3>
              <p className="text-xs text-gray-500">Versi 2.1 (Web Prototype)</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} title="Reset Aplikasi?">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
            <Trash2 size={32} />
          </div>
          <p className="text-gray-600">Aksi ini tidak dapat dibatalkan. Semua data progress ibadah, muhasabah, dan pengaturan Anda akan dihapus secara permanen dari perangkat ini.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsResetModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl">Batal</button>
          <button onClick={handleResetApp} className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md shadow-red-200">Hapus Data</button>
        </div>
      </Modal>

    </div>
  );
};

const ModernListView = ({ title, description, items, icon: IconColor }) => (
  <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </div>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer">
          <div className={`p-3 rounded-xl ${IconColor}`}><Bookmark size={20} /></div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800">{item.title}</h4>
            {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>
      ))}
    </div>
  </div>
);

const AmalanScreen = () => (
  <ModernListView 
    title="Amalan & Wirid" 
    description="Kumpulan amalan rutin, hizb, dan doa harian."
    icon="bg-blue-50 text-blue-600"
    items={[
      { title: "Wirid Ba'da Sholat", subtitle: "Sesuai bimbingan tarekat" },
      { title: "Hizbul Bahr", subtitle: "Imam Abul Hasan Asy-Syadzili" },
      { title: "Ratib Al-Haddad", subtitle: "Al-Habib Abdullah bin Alawi Al-Haddad" },
      { title: "Dzikir Pagi", subtitle: "Al-Ma'tsurat" },
      { title: "Dzikir Petang", subtitle: "Al-Ma'tsurat" }
    ]}
  />
);

const TadaburScreen = () => (
  <ModernListView 
    title="Tadabur Al-Qur'an" 
    description="Bacaan, terjemahan, dan tafsir ringkas."
    icon="bg-emerald-50 text-emerald-600"
    items={[
      { title: "Surah Al-Fatihah", subtitle: "Makkiyah • 7 Ayat" },
      { title: "Surah Al-Baqarah", subtitle: "Madaniyah • 286 Ayat" },
      { title: "Surah Al-Kahf", subtitle: "Makkiyah • 110 Ayat" },
      { title: "Surah Ya Sin", subtitle: "Makkiyah • 83 Ayat" },
      { title: "Surah Al-Mulk", subtitle: "Makkiyah • 30 Ayat" }
    ]}
  />
);

const AIChatScreen = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Assalamu\'alaikum warahmatullah. Saya adalah "Asisten Mursyid", asisten virtual yang dibekali dengan ilmu Tasawuf, Fiqih, dan Akhlak berdasarkan Al-Qur\'an, Hadits, dan kitab ulama mu\'tabar. Adakah kerisauan hati atau pertanyaan fiqih yang ingin diutarakan?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const systemPrompt = "Anda adalah 'Asisten Mursyid', sebuah AI Islami yang ramah, bijaksana, menyejukkan hati, dan berpengetahuan luas tentang Tasawuf, Tariqah, Suluk, Akhlak, dan Fiqih. Jawaban Anda harus bersumber dari Al-Qur'an, Hadits, dan kitab ulama. Berikan nasihat yang mengarahkan pada tazkiyatun nafs. Jangan menggurui, gunakan sapaan santun.";
      const payload = { contents: [{ parts: [{ text: input }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.candidates[0].content.parts[0].text }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Mohon maaf, saat ini sedang terjadi gangguan jaringan. Silakan coba beberapa saat lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50">
      <div className="bg-white p-4 shadow-sm z-10 flex items-center border-b border-gray-100">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3">
          <BookOpen size={20} />
        </div>
        <div>
          <h2 className="font-bold text-gray-800 leading-tight">Tanya Mursyid AI</h2>
          <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Berbasis Kitab Mu'tabar</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            {msg.role === 'assistant' && (
               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1 shadow-sm">
                 <Moon size={14} />
               </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm shadow-sm font-medium leading-relaxed ${
              msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none shadow-emerald-200' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
            }`}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1"><Moon size={14} /></div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 text-sm text-gray-500 flex items-center shadow-sm">
              <Loader2 className="w-5 h-5 mr-3 animate-spin text-emerald-500" /> Sedang merumuskan jawaban...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-4 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            placeholder="Tuliskan keresahan atau pertanyaan Anda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${input.trim() ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 hover:scale-105' : 'bg-gray-100 text-gray-400'}`}>
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3 italic">
          "Setiap pertanyaan Anda akan dijawab dengan landasan ilmu yang benar."
        </p>
      </div>
    </div>
  );
};

export default function RiyadhohSalikApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [tasbihCount, setTasbihCount] = useLocalStorage('riyadhoh_tasbih_count', 0);
  const [tasbihTarget, setTasbihTarget] = useLocalStorage('riyadhoh_tasbih_target', 100);
  const [muhasabahState, setMuhasabahState] = useLocalStorage('riyadhoh_muhasabah_state', {});
  const [muhasabahList, setMuhasabahList] = useLocalStorage('riyadhoh_muhasabah_list', INITIAL_MUHASABAH);

  const MENU_ITEMS = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'riyadhoh', icon: Play, label: 'Riyadhoh' },
    { id: 'tadabur', icon: BookOpen, label: 'Tadabur Qur\'an' },
    { id: 'amalan', icon: Bookmark, label: 'Amalan' },
    { id: 'panduan', icon: Book, label: 'Panduan Salik' },
    { id: 'muhasabah', icon: CheckSquare, label: 'Muhasabah' },
    { id: 'ai', icon: MessageCircle, label: 'Tanya Mursyid' },
    { id: 'progress', icon: BarChart2, label: 'Progress' },
    { id: 'settings', icon: Settings, label: 'Pengaturan' }
  ];

  const handleNavigation = (id) => {
    setActiveTab(id);
    setIsDrawerOpen(false);
  };

  const TopBar = () => (
    <div className="bg-white/80 backdrop-blur-md text-gray-800 p-4 border-b border-gray-100 sticky top-0 z-30 flex justify-between items-center h-16">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
          <Moon size={18} />
        </div>
        <h1 className="text-lg font-bold tracking-tight font-serif text-emerald-800">Riyadhoh Salik</h1>
      </div>
      <div className="flex space-x-3">
        <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </div>
  );

  const BottomNav = () => {
    const mainNav = ['home', 'riyadhoh', 'muhasabah', 'ai'];
    return (
      <div className="bg-white/90 backdrop-blur-lg border-t border-gray-100 fixed bottom-0 w-full max-w-md flex justify-around p-1 pb-safe z-40">
        {mainNav.map(id => {
          const item = MENU_ITEMS.find(m => m.id === id);
          const Icon = item.icon;
          const isActive = activeTab === id;
          return (
            <button key={id} onClick={() => handleNavigation(id)} className="flex flex-col items-center p-2 w-16 transition-all">
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-100 text-emerald-600 scale-110 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-emerald-700' : 'text-gray-500'}`}>{item.label}</span>
            </button>
          );
        })}
        <button onClick={() => setIsDrawerOpen(true)} className="flex flex-col items-center p-2 w-16 transition-all">
           <div className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 transition-all duration-300"><Menu size={22} /></div>
           <span className="text-[10px] mt-1 font-medium text-gray-500">Menu</span>
        </button>
      </div>
    );
  };

  const SideDrawer = () => (
    <>
      {isDrawerOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={() => setIsDrawerOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 bg-emerald-700 text-white flex justify-between items-center rounded-bl-3xl">
          <div>
            <h2 className="font-bold text-xl">Semua Menu</h2>
            <p className="text-emerald-200 text-sm">Navigasi Aplikasi</p>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-emerald-600 rounded-full hover:bg-emerald-500 transition"><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => handleNavigation(item.id)} className={`w-full flex items-center p-4 rounded-2xl transition-all ${isActive ? 'bg-emerald-50 border border-emerald-100 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}>
                <div className={`mr-4 p-2 rounded-xl ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}><Icon size={20} /></div>
                <span className={`font-semibold flex-1 text-left ${isActive ? 'text-emerald-800' : 'text-gray-700'}`}>{item.label}</span>
                {isActive && <ChevronRight size={18} className="text-emerald-500" />}
              </button>
            )
          })}
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
          <p className="text-xs text-gray-400 font-medium">Riyadhoh Salik v2.1</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-slate-100 min-h-screen font-sans selection:bg-emerald-200 flex justify-center text-gray-900">
      <div className="w-full max-w-md bg-slate-50 min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col border-x border-gray-200">
        
        {activeTab !== 'ai' && <TopBar />}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {activeTab === 'home' && <HomeDashboard muhasabahState={muhasabahState} tasbihCount={tasbihCount} muhasabahList={muhasabahList} navigate={handleNavigation} />}
          {activeTab === 'riyadhoh' && <RiyadhohScreen tasbihCount={tasbihCount} setTasbihCount={setTasbihCount} tasbihTarget={tasbihTarget} setTasbihTarget={setTasbihTarget} />}
          {activeTab === 'muhasabah' && <MuhasabahScreen muhasabahState={muhasabahState} setMuhasabahState={setMuhasabahState} muhasabahList={muhasabahList} setMuhasabahList={setMuhasabahList} />}
          {activeTab === 'amalan' && <AmalanScreen />}
          {activeTab === 'tadabur' && <TadaburScreen />}
          {activeTab === 'panduan' && <PanduanScreen />}
          {activeTab === 'progress' && <ProgressScreen muhasabahState={muhasabahState} tasbihCount={tasbihCount} muhasabahList={muhasabahList} />}
          {activeTab === 'settings' && <SettingsScreen setTasbihCount={setTasbihCount} setMuhasabahState={setMuhasabahState} setMuhasabahList={setMuhasabahList} navigate={handleNavigation} />}
          {activeTab === 'ai' && <AIChatScreen />}
        </div>

        <BottomNav />
        <SideDrawer />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }
      `}} />
    </div>
  );
}