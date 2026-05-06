import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  .sp-body {
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    background: #f0f2f5;
    color: #1a1a2e;
    min-height: 100vh;
    padding: 28px;
    direction: rtl;
  }
  .sp-page-title { font-size: 26px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
  .sp-page-sub { font-size: 14px; color: #8b93a7; margin-bottom: 24px; }

  /* Tabs */
  .sp-tabs {
    display: flex; gap: 2px;
    background: #fff; border: 1px solid #e4e7ef;
    border-radius: 12px; padding: 5px;
    margin-bottom: 24px; width: fit-content;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .sp-tab {
    padding: 9px 22px; border-radius: 9px; border: none;
    background: transparent;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 14px; font-weight: 500; color: #8b93a7;
    cursor: pointer; transition: all .2s;
    display: flex; align-items: center; gap: 7px;
  }
  .sp-tab:hover { color: #3d5af1; }
  .sp-tab.active {
    background: #3d5af1; color: #fff;
    box-shadow: 0 2px 10px rgba(61,90,241,0.3);
  }

  /* Card */
  .sp-card {
    background: #fff; border: 1px solid #e4e7ef;
    border-radius: 16px; padding: 28px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    margin-bottom: 16px;
  }
  .sp-card-title {
    font-size: 15px; font-weight: 600; color: #1a1a2e;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 1px solid #f0f2f5;
    display: flex; align-items: center; gap: 9px;
  }
  .sp-card-title i { font-size: 18px; color: #3d5af1; }

  /* Avatar */
  .sp-avatar-row {
    display: flex; align-items: center; gap: 18px;
    margin-bottom: 26px; padding: 18px;
    background: #f8f9fc; border-radius: 12px;
    border: 1px solid #e4e7ef;
  }
  .sp-avatar {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, #3d5af1, #6c8aff);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 600; color: #fff;
    flex-shrink: 0; box-shadow: 0 4px 14px rgba(61,90,241,0.3);
  }
  .sp-avatar-name { font-size: 16px; font-weight: 600; color: #1a1a2e; }
  .sp-avatar-role { font-size: 13px; color: #8b93a7; margin-top: 2px; }
  .sp-btn-upload {
    padding: 8px 16px; border-radius: 8px;
    border: 1.5px solid #3d5af1; background: transparent;
    color: #3d5af1;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all .2s; display: flex; align-items: center; gap: 6px;
    margin-right: auto;
  }
  .sp-btn-upload:hover { background: #3d5af1; color: #fff; }

  /* Fields */
  .sp-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .sp-field-full { grid-column: 1 / -1; }
  .sp-field-label {
    font-size: 12px; font-weight: 600; color: #5a6282;
    letter-spacing: .4px; margin-bottom: 7px; text-transform: uppercase;
    display: block;
  }
  .sp-field-wrap { position: relative; }
  .sp-field-input {
    width: 100%; padding: 11px 40px 11px 14px;
    border: 1.5px solid #e4e7ef; border-radius: 10px;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 14px; color: #1a1a2e; background: #fff;
    outline: none; transition: all .2s;
  }
  .sp-field-input:focus { border-color: #3d5af1; box-shadow: 0 0 0 3px rgba(61,90,241,0.1); }
  .sp-field-input:disabled { background: #f8f9fc; color: #aab0c4; cursor: not-allowed; }
  .sp-field-icon {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    color: #aab0c4; font-size: 17px; pointer-events: none;
  }

  /* Buttons */
  .sp-btn-primary {
    padding: 11px 24px; border-radius: 10px; border: none;
    background: #3d5af1; color: #fff;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all .2s; display: inline-flex; align-items: center; gap: 8px;
    box-shadow: 0 3px 12px rgba(61,90,241,0.25);
  }
  .sp-btn-primary:hover {
    background: #2f49e0; box-shadow: 0 5px 18px rgba(61,90,241,0.35);
    transform: translateY(-1px);
  }
  .sp-btn-ghost {
    padding: 11px 24px; border-radius: 10px;
    border: 1.5px solid #e4e7ef; background: #fff; color: #5a6282;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer;
    transition: all .2s; display: inline-flex; align-items: center; gap: 8px;
    width: 100%;
  }
  .sp-btn-ghost:hover { border-color: #3d5af1; color: #3d5af1; background: #f0f3ff; }
  .sp-btn-danger {
    padding: 11px 24px; border-radius: 10px;
    border: 1.5px solid #ffd0cc; background: #fff5f4; color: #e53935;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all .2s; display: inline-flex; align-items: center; gap: 8px;
  }
  .sp-btn-danger:hover { background: #ffebea; border-color: #e53935; }

  /* Strength bar */
  .sp-strength-wrap { margin-top: 8px; display: flex; align-items: center; gap: 10px; }
  .sp-strength-bar { flex: 1; height: 4px; border-radius: 4px; background: #e4e7ef; overflow: hidden; }
  .sp-strength-fill { height: 100%; width: 70%; background: linear-gradient(90deg, #43a047, #66bb6a); border-radius: 4px; }
  .sp-strength-label { font-size: 11px; font-weight: 600; color: #43a047; }

  /* Toggle */
  .sp-toggle-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .sp-toggle-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 15px 18px; border: 1.5px solid #e4e7ef; border-radius: 12px;
    cursor: pointer; transition: all .2s;
  }
  .sp-toggle-row:hover { border-color: #3d5af1; background: #f8f9ff; }
  .sp-toggle-info { display: flex; align-items: center; gap: 14px; }
  .sp-toggle-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: #f0f3ff; display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: #3d5af1;
  }
  .sp-toggle-title { font-size: 14px; font-weight: 600; color: #1a1a2e; margin-bottom: 2px; }
  .sp-toggle-desc { font-size: 12px; color: #8b93a7; }

  /* Switch */
  .sp-switch { position: relative; width: 42px; height: 23px; flex-shrink: 0; }
  .sp-switch input { opacity: 0; width: 0; height: 0; }
  .sp-slider {
    position: absolute; inset: 0; border-radius: 23px;
    background: #dde0e8; transition: .25s; cursor: pointer;
  }
  .sp-slider:before {
    content: ''; position: absolute;
    width: 17px; height: 17px; left: 3px; bottom: 3px;
    background: #fff; border-radius: 50%; transition: .25s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }
  .sp-switch input:checked + .sp-slider { background: #3d5af1; }
  .sp-switch input:checked + .sp-slider:before { transform: translateX(19px); }

  /* Select */
  .sp-select-wrap { position: relative; }
  .sp-select-field {
    width: 100%; padding: 11px 40px 11px 14px;
    border: 1.5px solid #e4e7ef; border-radius: 10px;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-size: 14px; color: #1a1a2e; background: #fff;
    outline: none; transition: all .2s; appearance: none; cursor: pointer;
  }
  .sp-select-field:focus { border-color: #3d5af1; box-shadow: 0 0 0 3px rgba(61,90,241,0.1); }
  .sp-select-arrow {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: #aab0c4; font-size: 17px; pointer-events: none;
  }

  /* System grid */
  .sp-sys-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .sp-divider { border: none; border-top: 1px solid #f0f2f5; margin: 20px 0; }
  .sp-danger-zone {
    border: 1.5px solid #ffd0cc; border-radius: 12px;
    padding: 20px; background: #fff5f4;
  }
  .sp-danger-label {
    font-size: 12px; font-weight: 600; color: #e53935;
    letter-spacing: .4px; text-transform: uppercase;
    margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
  }
  .sp-danger-desc { font-size: 13px; color: #b0756e; margin-bottom: 16px; }
`;

function Toggle({ label, desc, icon, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="sp-toggle-row" onClick={() => setChecked(v => !v)}>
      <div className="sp-toggle-info">
        <div className="sp-toggle-icon"><i className={`ti ti-${icon}`}></i></div>
        <div>
          <div className="sp-toggle-title">{label}</div>
          <div className="sp-toggle-desc">{desc}</div>
        </div>
      </div>
      <label className="sp-switch" onClick={e => e.stopPropagation()}>
        <input type="checkbox" checked={checked} onChange={() => setChecked(v => !v)} />
        <span className="sp-slider"></span>
      </label>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="sp-card">
      <div className="sp-card-title"><i className="ti ti-user-circle"></i> المعلومات الشخصية</div>
      <div className="sp-avatar-row">
        <div className="sp-avatar">أح</div>
        <div>
          <div className="sp-avatar-name">أحمد الشمري</div>
          <div className="sp-avatar-role">مدير النظام</div>
        </div>
        <button className="sp-btn-upload"><i className="ti ti-upload"></i> رفع صورة</button>
      </div>
      <div className="sp-field-grid">
        <div>
          <label className="sp-field-label">الاسم</label>
          <div className="sp-field-wrap">
            <input className="sp-field-input" type="text" placeholder="الاسم الكامل" />
            <i className="ti ti-user sp-field-icon"></i>
          </div>
        </div>
        <div>
          <label className="sp-field-label">البريد الإلكتروني</label>
          <div className="sp-field-wrap">
            <input className="sp-field-input" type="email" defaultValue="ahmed@co.sa" disabled />
            <i className="ti ti-mail sp-field-icon"></i>
          </div>
        </div>
        <div className="sp-field-full">
          <label className="sp-field-label">الدور الوظيفي</label>
          <div className="sp-field-wrap">
            <input className="sp-field-input" type="text" defaultValue="مدير النظام" disabled />
            <i className="ti ti-briefcase sp-field-icon"></i>
          </div>
        </div>
      </div>
      <button className="sp-btn-primary"><i className="ti ti-device-floppy"></i> حفظ التغييرات</button>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="sp-card">
      <div className="sp-card-title"><i className="ti ti-shield-lock"></i> تغيير كلمة المرور</div>
      <div className="sp-field-grid">
        <div className="sp-field-full">
          <label className="sp-field-label">كلمة المرور الحالية</label>
          <div className="sp-field-wrap">
            <input className="sp-field-input" type="password" placeholder="••••••••" />
            <i className="ti ti-lock sp-field-icon"></i>
          </div>
        </div>
        <div>
          <label className="sp-field-label">كلمة المرور الجديدة</label>
          <div className="sp-field-wrap">
            <input className="sp-field-input" type="password" placeholder="••••••••" />
            <i className="ti ti-lock sp-field-icon"></i>
          </div>
          <div className="sp-strength-wrap">
            <div className="sp-strength-bar"><div className="sp-strength-fill"></div></div>
            <span className="sp-strength-label">قوية</span>
          </div>
        </div>
        <div>
          <label className="sp-field-label">تأكيد كلمة المرور</label>
          <div className="sp-field-wrap">
            <input className="sp-field-input" type="password" placeholder="••••••••" />
            <i className="ti ti-lock sp-field-icon"></i>
          </div>
        </div>
      </div>
      <button className="sp-btn-primary"><i className="ti ti-key"></i> تغيير كلمة المرور</button>
    </div>
  );
}

function PreferencesTab() {
  return (
    <div className="sp-card">
      <div className="sp-card-title"><i className="ti ti-adjustments"></i> التفضيلات</div>
      <div className="sp-toggle-list">
        <Toggle label="الوضع الداكن" desc="تفعيل الثيم الداكن" icon="moon" />
        <Toggle label="الإشعارات" desc="تلقي التنبيهات الفورية" icon="bell" defaultChecked />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label className="sp-field-label">اللغة</label>
        <div className="sp-select-wrap">
          <select className="sp-select-field">
            <option>العربية</option>
            <option>English</option>
          </select>
          <i className="ti ti-chevron-down sp-select-arrow"></i>
        </div>
      </div>
      <button className="sp-btn-primary"><i className="ti ti-device-floppy"></i> حفظ التفضيلات</button>
    </div>
  );
}

function SystemTab() {
  return (
    <div className="sp-card">
      <div className="sp-card-title"><i className="ti ti-settings"></i> إعدادات النظام — المدير</div>
      <div className="sp-sys-grid">
        <button className="sp-btn-ghost"><i className="ti ti-users"></i> إدارة المستخدمين</button>
        <button className="sp-btn-ghost"><i className="ti ti-mood-smile"></i> تعديل المشاعر</button>
        <button className="sp-btn-ghost"><i className="ti ti-list-check"></i> تعديل الأولويات</button>
      </div>
      <hr className="sp-divider" />
      <div className="sp-danger-zone">
        <div className="sp-danger-label"><i className="ti ti-alert-triangle"></i> منطقة الخطر</div>
        <div className="sp-danger-desc">هذا الإجراء لا يمكن التراجع عنه. تأكد قبل المتابعة.</div>
        <button className="sp-btn-danger"><i className="ti ti-refresh-alert"></i> إعادة ضبط النظام</button>
      </div>
    </div>
  );
}

const TABS = [
  { label: 'الملف الشخصي', icon: 'user', component: <ProfileTab /> },
  { label: 'الأمان', icon: 'shield-lock', component: <SecurityTab /> },
  { label: 'التفضيلات', icon: 'adjustments', component: <PreferencesTab /> },
  { label: 'النظام', icon: 'settings', component: <SystemTab /> },
];

export default function SettingsPage() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <style>{styles}</style>
      <div className="sp-body">
        <div className="sp-page-title">الإعدادات</div>
        <div className="sp-page-sub">إدارة حسابك وتفضيلاتك</div>

        <div className="sp-tabs">
          {TABS.map((t, i) => (
            <button
              key={i}
              className={`sp-tab${tab === i ? ' active' : ''}`}
              onClick={() => setTab(i)}
            >
              <i className={`ti ti-${t.icon}`}></i> {t.label}
            </button>
          ))}
        </div>

        {TABS[tab].component}
      </div>
    </>
  );
}
