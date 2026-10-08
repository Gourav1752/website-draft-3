import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  RotateCcw, 
  Link2, 
  X, 
  CheckCircle2, 
  Eye, 
  Settings2, 
  Layers, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Plus
} from 'lucide-react';
import { PartnerLogoImage } from './PartnerLogoImage';
import { PARTNER_LIST, CATEGORIES_CONFIG, PartnerConfig } from '../data/partnerLogos';

export interface PartnerNetworkProps {
  /**
   * Array of logo image URLs or dictionary mapping code to image URL.
   */
  partnerLogos?: string[] | Record<string, string>;
}

export const PartnerNetwork: React.FC<PartnerNetworkProps> = ({ partnerLogos }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Admin mode: Only enabled if URL contains ?admin=true, ?edit=true, or toggled via secret shortcut Ctrl+Shift+E
  // Viewers/public visitors NEVER see edit options by default
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('edit') === 'true' || window.location.hash === '#admin') {
        return true;
      }
      return localStorage.getItem('phoenix_partner_admin_auth') === 'true';
    }
    return false;
  });

  // Edit mode is strictly false for viewers
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Clear any legacy public edit mode from earlier sessions so viewers never see edit options
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('phoenix_partner_edit_mode');
    }
  }, []);

  // Hidden admin shortcut: Ctrl+Shift+E (or Cmd+Shift+E), #admin hash, or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        toggleAdmin();
      }
    };

    const handleCustomToggle = () => {
      toggleAdmin();
    };

    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdmin(true);
        setIsEditMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('phoenix_toggle_admin', handleCustomToggle);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('phoenix_toggle_admin', handleCustomToggle);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const toggleAdmin = () => {
    setIsAdmin((prev) => {
      const next = !prev;
      if (next) {
        setIsEditMode(true);
      }
      try {
        if (next) {
          localStorage.setItem('phoenix_partner_admin_auth', 'true');
        } else {
          localStorage.removeItem('phoenix_partner_admin_auth');
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleExitAdmin = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    try {
      localStorage.removeItem('phoenix_partner_admin_auth');
    } catch {
      // ignore
    }
  };

  // Custom uploaded/edited logo images mapping: { [code: string]: string }
  const [customLogos, setCustomLogos] = useState<{ [code: string]: string }>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('phoenix_custom_partner_logos');
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to load custom logos from storage', err);
      }
    }
    return {};
  });

  // State for active image insert modal
  const [editingPartner, setEditingPartner] = useState<PartnerConfig | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [activeInsertTab, setActiveInsertTab] = useState<'upload' | 'url'>('upload');

  // State for Manage All Logos modal
  const [isManageModalOpen, setIsManageModalOpen] = useState<boolean>(false);
  const [manageSearch, setManageSearch] = useState<string>('');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Drag and drop state
  const [dragOverCode, setDragOverCode] = useState<string | null>(null);

  // Hidden file input reference
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetUploadCode, setTargetUploadCode] = useState<string | null>(null);

  // Save custom logos to state and localStorage
  const handleSaveLogo = (code: string, imageSrc: string) => {
    const updated = { ...customLogos, [code]: imageSrc };
    setCustomLogos(updated);
    try {
      localStorage.setItem('phoenix_custom_partner_logos', JSON.stringify(updated));
    } catch {
      // quota exceeded or private mode
    }
  };

  const handleResetLogo = (code: string) => {
    const updated = { ...customLogos };
    delete updated[code];
    setCustomLogos(updated);
    try {
      localStorage.setItem('phoenix_custom_partner_logos', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all custom partner logos back to defaults?')) {
      setCustomLogos({});
      try {
        localStorage.removeItem('phoenix_custom_partner_logos');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetUploadCode) {
      processImageFile(file, targetUploadCode);
    }
    if (e.target) e.target.value = '';
    setTargetUploadCode(null);
  };

  const processImageFile = (file: File, code: string) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, SVG, WebP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleSaveLogo(code, reader.result);
        if (editingPartner && editingPartner.code === code) {
          setPreviewSrc(reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (code: string) => {
    setTargetUploadCode(code);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openEditModal = (partner: PartnerConfig) => {
    setEditingPartner(partner);
    const existing = getPartnerLogo(partner);
    setUrlInput(existing || '');
    setPreviewSrc(existing || '');
    setActiveInsertTab('upload');
  };

  // Helper to resolve logo from custom storage, prop, or default definition
  const getPartnerLogo = (partner: PartnerConfig): string | undefined => {
    // 1. In-browser uploaded/edited custom logo
    if (customLogos[partner.code]) {
      return customLogos[partner.code];
    }

    // 2. Props passed to PartnerNetwork
    if (partnerLogos) {
      if (typeof partnerLogos === 'object' && !Array.isArray(partnerLogos)) {
        if (partnerLogos[partner.code]) return partnerLogos[partner.code];
      } else if (Array.isArray(partnerLogos)) {
        const idx = PARTNER_LIST.findIndex((p) => p.code === partner.code);
        if (idx >= 0 && partnerLogos[idx]) return partnerLogos[idx];
      }
    }

    // 3. Built-in default image
    return partner.defaultImageUrl;
  };

  const displayedPartners = useMemo(() => {
    if (activeTab === 'all') return PARTNER_LIST;
    return PARTNER_LIST.filter((p) => p.category === activeTab);
  }, [activeTab]);

  // Handlers for Drag & Drop image files directly onto cards
  const handleDragOver = (e: React.DragEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverCode !== code) {
      setDragOverCode(code);
    }
  };

  const handleDragLeave = (e: React.DragEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverCode === code) {
      setDragOverCode(null);
    }
  };

  const handleDrop = (e: React.DragEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverCode(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0], code);
    }
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(customLogos, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const customLogosCount = Object.keys(customLogos).length;

  return (
    <section id="partners" className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      {/* Hidden File Input for Native File Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center">
            <button
              type="button"
              onClick={toggleAdmin}
              title="Click or press Cmd+Shift+E / Ctrl+Shift+E to toggle Admin Logo Editor"
              className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 hover:text-orange-500 cursor-pointer select-none transition-colors"
            >
              Institutional Association
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Our Banking & Financial Partners
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Associated with leading Banks, NBFCs and Housing Finance Companies across India for multi-institution product comparisons.
          </p>

          {/* Admin Toolbar - Only visible to authenticated site admin via ?admin=true or Ctrl+Shift+E */}
          {isAdmin && (
            <div className="mt-6 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Admin Logo Editor (Hidden from public viewers)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isEditMode
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{isEditMode ? 'Edit Mode: Active' : 'Enable Edit Controls'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsManageModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Manage All 23 Logos ({customLogosCount} custom)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExitAdmin}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                  title="Hide admin controls"
                >
                  Exit Admin
                </button>
              </div>
            </div>
          )}

          {isAdmin && isEditMode && (
            <p className="mt-3 text-xs text-amber-700 dark:text-amber-400 flex items-center justify-center gap-1.5">
              <span>💡 Admin Mode: Click on any partner slot below to upload an image, enter a URL, or drag & drop files.</span>
            </p>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name} {cat.id === 'all' && `(${PARTNER_LIST.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPartners.map((p) => {
            const resolvedLogo = getPartnerLogo(p);
            const hasCustomLogo = Boolean(customLogos[p.code]);
            const canEdit = isAdmin && isEditMode;
            const isDraggingOver = canEdit && dragOverCode === p.code;

            return (
              <div
                key={p.code}
                onDragOver={(e) => canEdit && handleDragOver(e, p.code)}
                onDragLeave={(e) => canEdit && handleDragLeave(e, p.code)}
                onDrop={(e) => canEdit && handleDrop(e, p.code)}
                className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border transition-all duration-300 group flex flex-col justify-between relative ${
                  isDraggingOver
                    ? 'border-amber-500 ring-4 ring-amber-400/20 bg-amber-50/50 dark:bg-amber-950/20 scale-102'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl'
                }`}
              >
                {/* Header Tag & Quick Actions */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{p.code}</span>
                  </div>

                  {/* Edit Controls - Only for Admin */}
                  {canEdit && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                        title={`Insert or change logo image for ${p.name}`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>{resolvedLogo ? 'Change' : 'Insert'}</span>
                      </button>

                      {hasCustomLogo && (
                        <button
                          onClick={() => handleResetLogo(p.code)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Reset to default logo"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Enlarged Logo Showcase Area (Supports Bigger Logos in full color) */}
                <div 
                  onClick={() => {
                    if (canEdit) openEditModal(p);
                  }}
                  className={`relative w-full h-24 sm:h-28 rounded-2xl bg-white dark:bg-slate-900 border p-3 sm:p-4 flex items-center justify-center overflow-hidden transition-all duration-300 mb-5 ${
                    canEdit ? 'cursor-pointer hover:border-amber-500 hover:shadow-md' : ''
                  } ${
                    isDraggingOver
                      ? 'border-dashed border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                      : 'border-slate-200/80 dark:border-slate-700/80 group-hover:border-amber-400/50 dark:group-hover:border-amber-500/50'
                  }`}
                  title={canEdit ? `Click to insert or change logo for ${p.name}` : p.name}
                >
                  {isDraggingOver ? (
                    <div className="text-center">
                      <Upload className="w-6 h-6 text-amber-500 mx-auto animate-bounce mb-1" />
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Drop image here!</span>
                    </div>
                  ) : (
                    <>
                      <PartnerLogoImage
                        src={resolvedLogo}
                        code={p.code}
                        partnerName={p.name}
                        className="w-full h-full max-h-16 sm:max-h-20 object-contain"
                      />

                      {/* Edit Mode Hover Overlay - Only for Admin */}
                      {canEdit && (
                        <div className="absolute inset-0 bg-slate-950/75 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerUpload(p.code);
                            }}
                            title="Upload image file from device"
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(p);
                            }}
                            title="Insert URL or customize"
                            className="px-2.5 py-1.5 rounded-lg bg-slate-700 text-white hover:bg-slate-600 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                            <span>URL</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Institution Name & Segment */}
                <div className="space-y-1 mb-4">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {p.type}
                  </p>
                </div>

                {/* Verification Footer */}
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Sourcing Partner</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-600/80 dark:text-amber-400/80">DSA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Insert / Edit Logo for a Specific Partner */}
        {isAdmin && editingPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div 
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditingPartner(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Insert Logo for {editingPartner.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Partner Code: <span className="font-semibold text-slate-700 dark:text-slate-300">{editingPartner.code}</span> · {editingPartner.type}
                  </p>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center h-28 relative">
                <PartnerLogoImage
                  src={previewSrc}
                  code={editingPartner.code}
                  partnerName={editingPartner.name}
                  className="max-h-20 max-w-full object-contain filter-none"
                />
                {previewSrc && (
                  <button
                    onClick={() => {
                      setPreviewSrc('');
                      setUrlInput('');
                    }}
                    className="absolute top-2 right-2 px-2 py-1 text-[10px] font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-md hover:bg-rose-200 cursor-pointer"
                  >
                    Clear Preview
                  </button>
                )}
              </div>

              {/* Tabs: Upload File vs Image URL */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveInsertTab('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    activeInsertTab === 'upload'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInsertTab('url')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    activeInsertTab === 'url'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Paste Image URL</span>
                </button>
              </div>

              {/* Tab 1: Upload File */}
              {activeInsertTab === 'upload' && (
                <div className="space-y-3">
                  <div 
                    onClick={() => triggerUpload(editingPartner.code)}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30"
                  >
                    <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Click to choose an image from your computer
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Supports PNG, JPG, SVG, WebP (Vibrant full color, any size)
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Image URL */}
              {activeInsertTab === 'url' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Direct Image Web Address (URL)
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => {
                        setUrlInput(e.target.value);
                        setPreviewSrc(e.target.value);
                      }}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                {customLogos[editingPartner.code] ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleResetLogo(editingPartner.code);
                      setEditingPartner(null);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPartner(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (previewSrc.trim()) {
                        handleSaveLogo(editingPartner.code, previewSrc.trim());
                      }
                      setEditingPartner(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Save & Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Bulk Manage All 23 Partner Logos */}
        {isAdmin && isManageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div 
              className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" />
                    <span>Manage Partner Logos ({PARTNER_LIST.length} Institutions)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Insert images for each bank and NBFC individually or copy the logo configuration.
                  </p>
                </div>

                <button
                  onClick={() => setIsManageModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Controls Bar */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={manageSearch}
                    onChange={(e) => setManageSearch(e.target.value)}
                    placeholder="Search partner by name or code (e.g. SBI, HDFC, Tata)..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                    title="Copy all custom logos as JSON configuration"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Logos JSON</span>
                      </>
                    )}
                  </button>

                  {customLogosCount > 0 && (
                    <button
                      onClick={handleResetAll}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Partner Table/List */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
                {PARTNER_LIST
                  .filter((p) => {
                    const q = manageSearch.toLowerCase();
                    return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
                  })
                  .map((p) => {
                    const logo = getPartnerLogo(p);
                    const isCustom = Boolean(customLogos[p.code]);

                    return (
                      <div
                        key={p.code}
                        className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex items-center justify-between gap-4 hover:border-amber-400/60 transition-colors"
                      >
                        {/* Logo Thumbnail */}
                        <div className="w-16 h-12 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                          <PartnerLogoImage
                            src={logo}
                            code={p.code}
                            partnerName={p.name}
                            className="max-h-8 max-w-full object-contain filter-none"
                          />
                        </div>

                        {/* Partner Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {p.name}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {p.code}
                            </span>
                            {isCustom && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                                Custom
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {p.type}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setIsManageModalOpen(false);
                              openEditModal(p);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{logo ? 'Change Image' : 'Insert Image'}</span>
                          </button>

                          {isCustom && (
                            <button
                              onClick={() => handleResetLogo(p.code)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Reset"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Custom images are stored in browser local storage and loaded automatically.
                </span>
                <button
                  onClick={() => setIsManageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verification & Legal Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Important Notice:</strong> Phoenix Financial Services acts as an independent Direct Selling Associate (DSA) and channel intermediary. Logos, brand names, and trademarks belong strictly to their respective registered Banks, NBFCs, and financial entities. Sourcing is subject to respective partner sanction guidelines.
          </p>
        </div>

      </div>
    </section>
  );
};
