"use client";

import React, { useState } from "react";
import { X, Database, ArrowRight, ShieldCheck, UploadCloud, CheckCircle2, Building2 } from "lucide-react";
import { useFinancial } from "../context/FinancialContext";

interface OpenFinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OpenFinanceModal({ isOpen, onClose }: OpenFinanceModalProps) {
  const { addTransaction } = useFinancial();
  const [syncingBank, setSyncingBank] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBankSync = (bankName: string) => {
    setSyncingBank(bankName);
    setSyncSuccess(null);

    setTimeout(() => {
      const simulatedData = [
        { desc: `Pix Recebido - Rendimento FII (${bankName})`, val: 340, cat: "Investimentos", vec: "aceleracao" as const, meth: "Open Finance" },
        { desc: `Posto Ipiranga Combustível (${bankName})`, val: 180, cat: "Transporte", vec: "sobrevivencia" as const, meth: "Débito" },
        { desc: `Assinatura Amazon Prime (${bankName})`, val: 19.9, cat: "Assinatura", vec: "lazer" as const, meth: "Cartão", rec: true },
      ];

      simulatedData.forEach((item) => {
        addTransaction({
          description: item.desc,
          amount: item.val,
          category: item.cat,
          vector: item.vec,
          method: item.meth,
          isRecurring: item.rec,
        });
      });

      setSyncingBank(null);
      setSyncSuccess(`3 transações reconciliadas com sucesso via Open Finance (${bankName})!`);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTimeout(() => {
      addTransaction({
        description: `Importação OFX/CSV (${file.name})`,
        amount: 450.0,
        category: "Conciliação Bancária",
        vector: "sobrevivencia",
        method: "Extrato Bancário",
      });
      setSyncSuccess(`Extrato "${file.name}" importado e categorizado com sucesso!`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 border border-slate-200 shadow-elevated relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-kamino-50 text-kamino-600 border border-kamino-100">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-navy-900">
              Open Finance & Conciliação Bancária
            </h3>
            <p className="text-xs text-slate-500">
              Sincronização direta via Pluggy / Belvo APIs ou importação de arquivos de extrato.
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-600 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Criptografia de nível bancário com autorização do Banco Central do Brasil. Leitura somente.</span>
        </div>

        {/* Bank quick connect */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Instituições Conectadas:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Nubank", "Itaú Personnalité", "BTG Pactual", "XP Investimentos", "Banco Inter", "Bradesco"].map((b) => (
              <button
                key={b}
                disabled={syncingBank !== null}
                onClick={() => handleBankSync(b)}
                className="p-3 rounded-xl border border-slate-200 hover:border-kamino-300 hover:bg-slate-50 text-left text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 group-hover:text-kamino-600" />
                  <span className="font-semibold text-slate-800">{b}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-kamino-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Manual OFX/CSV Upload */}
        <div className="p-5 rounded-xl border border-dashed border-slate-300 text-center space-y-2.5 bg-slate-50/50">
          <UploadCloud className="w-7 h-7 mx-auto text-slate-400" />
          <div className="text-xs text-slate-600 font-medium">
            Arraste seu extrato bancário <strong className="text-slate-800">.OFX, .CSV ou .JSON</strong>
          </div>
          <input
            type="file"
            accept=".ofx,.csv,.json"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer shadow-sm transition-all"
          >
            Selecionar Arquivo
          </label>
        </div>

        {syncingBank && (
          <div className="mt-4 p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-kamino-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kamino-600 animate-ping"></span>
            <span>Estabelecendo conexão segura com {syncingBank}...</span>
          </div>
        )}

        {syncSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{syncSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
}
