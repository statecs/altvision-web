import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Copy, Check, Loader2 } from 'lucide-react';

const API_BASE = 'https://cloudfare-worker-altvision-api.chris-172.workers.dev';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Portuguese',
  vi: 'Vietnamese', sv: 'Swedish', ro: 'Romanian', ar: 'Arabic', bn: 'Bengali',
  cs: 'Czech', da: 'Danish', el: 'Greek', fi: 'Finnish', he: 'Hebrew',
  hi: 'Hindi', hu: 'Hungarian', id: 'Indonesian', it: 'Italian', ja: 'Japanese',
  ko: 'Korean', nl: 'Dutch', no: 'Norwegian', pl: 'Polish', ru: 'Russian',
  ta: 'Tamil', th: 'Thai', tr: 'Turkish', uk: 'Ukrainian', ur: 'Urdu', zh: 'Chinese',
};

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp'];
const MAX_SIZE = 16 * 1024 * 1024;

const MAX_DIMENSION = 512;
const TARGET_SIZE = 200_000;

async function compressImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.6;
      let result  = canvas.toDataURL('image/jpeg', quality);
      while (result.length > TARGET_SIZE * 1.37 && quality > 0.15) {
        quality -= 0.1;
        result   = canvas.toDataURL('image/jpeg', quality);
      }
      resolve(result);
    };
    img.src = dataUrl;
  });
}

const ImageUploadDemo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadZoneRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [uploadRequired, setUploadRequired] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [keywords, setKeywords] = useState('');
  const [keywordsEnabled, setKeywordsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateAndSetFile = (f: File) => {
    setResult(null);
    setError(null);
    setUploadRequired(false);
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError(t('home.demo.errorInvalidType'));
      return;
    }
    if (f.size > MAX_SIZE) {
      setError(t('home.demo.errorFileTooLarge'));
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const raw = e.target?.result as string;
      const compressed = await compressImage(raw);
      setPreview(compressed);
    };
    reader.readAsDataURL(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSetFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleGenerate = async () => {
    if (!file || !preview) {
      setUploadRequired(true);
      uploadZoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      uploadZoneRef.current?.focus();
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Step 1: fetch/process image
      const fetchRes = await fetch(`${API_BASE}/proxy/fetch-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Source': 'Web-App' },
        body: JSON.stringify({ url: preview }),
      });
      if (!fetchRes.ok) throw new Error('fetch-image failed');
      const fetchData = await fetchRes.json();
      const base64Image: string = fetchData.base64;

      // Step 2: generate alt text
      const langCode = i18n.language?.split('-')[0] || 'en';
      const langName = LANGUAGE_NAMES[langCode] || 'English';
      let promptText = `Write the alt text in ${langName}.`;
      if (keywordsEnabled && keywords.trim()) {
        promptText += ` Adjacent content: ${keywords.trim()}`;
      }

      const visionRes = await fetch(`${API_BASE}/proxy/process-simple-vision-api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Source': 'Web-App' },
        body: JSON.stringify({ base64Image, promptText, threadId: null }),
      });
      if (!visionRes.ok) throw new Error('process-simple-vision-api failed');
      const visionData = await visionRes.json();

      if (visionData.message && (!visionData.code || visionData.code === 'success')) {
        setResult(visionData.message);
      } else if (visionData.code === 'limit') {
        setError(t('home.demo.errorRateLimit'));
      } else if (visionData.message) {
        setError(visionData.message);
      } else {
        throw new Error('Unexpected response');
      }
    } catch {
      setError(t('home.demo.errorGenerate'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4">
      {/* Upload zone */}
      <div
        ref={uploadZoneRef}
        tabIndex={-1}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors outline-none ${
          uploadRequired ? 'border-red-500 bg-red-900/10' : isDragging ? 'border-blue-400 bg-blue-900/20' : 'border-gray-600 hover:border-gray-500'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-48 rounded-lg object-contain"
          />
        ) : (
          <>
            <Upload className="mx-auto mb-3 text-gray-400" size={36} />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {t('home.demo.tryIt')}
              </span>
              <span className="text-gray-300 text-sm text-center">{t('home.demo.dragDrop')}</span>
            </div>
            <p className="text-gray-500 text-xs mb-3">{t('home.demo.fileTypes')}</p>
          </>
        )}

        <button
          type="button"
          className="mt-3 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm px-4 py-1.5 rounded-lg transition-colors"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
        >
          {t('home.demo.chooseFile')}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Keywords toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">{t('home.demo.seoKeywords')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{t('home.demo.optional')}</span>
            <button
              type="button"
              role="switch"
              aria-checked={keywordsEnabled}
              onClick={() => setKeywordsEnabled((v) => !v)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                keywordsEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  keywordsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {keywordsEnabled && (
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. product photography outdoor"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        )}
      </div>

      {/* Generate button */}
      <button
        type="button"
        disabled={loading}
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t('home.demo.generating')}
          </>
        ) : (
          t('home.demo.generateButton')
        )}
      </button>

      {/* Result */}
      {result && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-start gap-3">
          <p className="text-gray-200 text-sm leading-relaxed flex-1">{result}</p>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors mt-0.5"
            aria-label={copied ? t('home.demo.copied') : t('home.demo.copyButton')}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadDemo;
