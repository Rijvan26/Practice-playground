import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={18} color="#22c55e" />,
  error: <AlertCircle size={18} color="#ef4444" />,
  info: <Info size={18} color="#60a5fa" />,
};

export default function NotificationToast({ notification, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        background: 'rgba(15,15,40,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '12px 14px',
        minWidth: '260px',
        maxWidth: '320px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: 1 }}>{ICONS[notification.type] || ICONS.info}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: 2 }}>
          {notification.title}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
          {notification.message}
        </div>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 2, flexShrink: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
