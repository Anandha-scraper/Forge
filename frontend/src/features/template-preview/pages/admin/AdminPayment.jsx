"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CreditCard, ImageUp } from "lucide-react";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import "@/src/styles/pages/template/admin.css";

export default function AdminPayment() {
  const { payment, updatePayment } = useTemplatePreview();
  const [form, setForm] = useState(payment);
  const [saved, setSaved] = useState(false);
  useEffect(() => setForm(payment), [payment]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = (event) => { event.preventDefault(); updatePayment(form); setSaved(true); window.setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="template-page">
      <div className="template-page-head"><div><span className="template-eyebrow">Configuration</span><h1>Payment settings</h1><p>Show clients how gateway and screenshot approval modes can be configured.</p></div>{saved && <span className="template-save-state"><CheckCircle2 size={17} /> Saved locally</span>}</div>
      <form className="payment-layout" onSubmit={save}>
        <section className="template-panel">
          <div className="template-panel-head"><div><span className="template-eyebrow">Collection flow</span><h2>Choose a payment mode</h2></div><span className="template-status template-status--completed">Demo setting</span></div>
          <div className="payment-mode-grid">
            <button type="button" className="payment-mode" data-active={form.mode === "gateway" || undefined} onClick={() => set("mode", "gateway")}><CreditCard size={23} /><strong>Payment gateway</strong><small>Verify online payments automatically.</small></button>
            <button type="button" className="payment-mode" data-active={form.mode === "screenshot" || undefined} onClick={() => set("mode", "screenshot")}><ImageUp size={23} /><strong>Screenshot approval</strong><small>Review payment proof before confirmation.</small></button>
          </div>
        </section>
        <section className="template-panel">
          <div className="template-panel-head"><div><span className="template-eyebrow">Displayed configuration</span><h2>{form.mode === "gateway" ? "Gateway details" : "Where participants pay"}</h2></div></div>
          <div className="template-form-grid">
            {form.mode === "gateway" ? <><label><span>Gateway name</span><input value={form.gatewayName} onChange={(event) => set("gatewayName", event.target.value)} /></label><label><span>Public key preview</span><input value={form.gatewayKey} onChange={(event) => set("gatewayKey", event.target.value)} /></label></> : <><label><span>UPI ID</span><input value={form.upiId} onChange={(event) => set("upiId", event.target.value)} /></label><div className="payment-qr"><span aria-hidden="true" /><strong>PAYMENT QR</strong><small>Mock preview</small></div></>}
            <label className="template-field-wide"><span>Participant instructions</span><textarea rows="4" value={form.approvalNote} onChange={(event) => set("approvalNote", event.target.value)} /></label>
          </div>
          <div className="template-form-actions"><button type="submit" className="template-btn">Save demo settings</button><button type="button" className="template-btn template-btn--ghost" onClick={() => setForm(payment)}>Cancel changes</button></div>
        </section>
      </form>
    </div>
  );
}
