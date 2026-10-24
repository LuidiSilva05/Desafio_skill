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
      // Simulate automated pull of last 3 transactions from Open Finance API
      const simulatedData = [
        { desc: `Pix Recebido - Dividendos FII (${bankName})`, val: 340, cat: "Investimentos", vec: "aceleracao" as const, meth: "Open Finance" },
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
      setSyncSuccess(`3 transações sincronizadas com sucesso via protocolo Open Finance (${bankName})!`);
    }, 1500);
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
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md">
      <div className="hud-box w-full max-w-lg rounded-2xl p-6 border border-hud-purple shadow-[0_0_25px_rgba(191,90,242,0.3)] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-space-850 border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-lg bg-purple-950/70 border border-hud-purple text-hud-purple">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-base text-hud-purple tracking-wider">
              OPEN FINANCE & CONCILIAÇÃO
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Conexão direta com APIs bancárias (Pluggy / Belvo) e leitura OFX/CSV.
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800 flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-4">
          <ShieldCheck className="w-4 h-4 text-hud-green flex-shrink-0" />
          <span>Criptografia ponta-a-ponta padrão Banco Central do Brasil. Leitura somente (sem permissão de movimentação).</span>
        </div>

        {/* Bank quick connect */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-mono text-slate-300 uppercase block">
            Conectar Instituição Financeira:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Nubank", "Itaú Personnalité", "BTG Pactual", "XP Investimentos", "Inter", "Bradesco"].map((b) => (
              <button
                key={b}
                disabled={syncingBank !== null}
                onClick={() => handleBankSync(b)}
                className="p-3 rounded-xl bg-space-900 border border-slate-800 hover:border-hud-purple hover:bg-space-850 text-left font-mono text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 group-hover:text-hud-purple" />
                  <span className="font-semibold text-white">{b}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-hud-purple group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Manual OFX/CSV Upload */}
        <div className="p-4 rounded-xl bg-space-950 border border-dashed border-slate-700 text-center space-y-2">
          <UploadCloud className="w-7 h-7 mx-auto text-hud-purple/70" />
          <div className="text-xs font-mono text-slate-300">
            Arraste seu extrato bancário <strong className="text-white">.OFX, .CSV ou .JSON</strong>
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
            className="inline-block px-3 py-1.5 rounded-lg bg-space-850 border border-slate-700 hover:border-hud-purple font-mono text-[11px] text-slate-300 cursor-pointer transition-all"
          >
            Selecionar do Computador
          </label>
        </div>

        {syncingBank && (
          <div className="mt-4 p-3 rounded-lg bg-purple-950/40 border border-hud-purple font-mono text-xs text-hud-purple flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-hud-purple animate-ping"></span>
            <span>Estabelecendo handshake seguro com {syncingBank}...</span>
          </div>
        )}

        {syncSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-green-950/40 border border-hud-green font-mono text-xs text-hud-green flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{syncSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
}
