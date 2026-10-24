"use client";

import React from "react";
import Link from "next/link";
import { Settings, Camera, Database, ShieldCheck, ChevronRight, Layers } from "lucide-react";

interface HeaderHUDProps {
  onOpenScanner: () => void;
  onOpenOpenFinance: () => void;
}

export function HeaderHUD({ onOpenScanner, onOpenOpenFinance }: HeaderHUDProps) {
  return (
    <header className="border-b border-surface-border bg-white sticky top-0 z-40 px-6 py-3.5 shadow-subtle">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-kamino-600 text-white shadow-indigo">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-base tracking-tight text-navy-900">
                KAMINO
              </span>
              <span className="font-heading font-semibold text-xs tracking-wider uppercase text-kamino-600 bg-kamino-50 px-2 py-0.5 rounded-full border border-kamino-100">
                QUANTUM
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium flex items-center space-x-2 mt-0.5">
              <span className="flex items-center text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1"></span>
                Operação em Tempo Real
              </span>
              <span>•</span>
              <span>Gestão de Patrimônio & Vetores</span>
            </div>
          </div>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenScanner}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-navy-900 shadow-sm transition-all"
            title="Leitor de Cupons Fiscais NFC-e e Boletos"
          >
            <Camera className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Scanner OCR / QR</span>
          </button>

          <button
            onClick={onOpenOpenFinance}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-navy-900 shadow-sm transition-all"
            title="Conexão com Bancos e Extratos"
          >
            <Database className="w-4 h-4 text-kamino-600" />
            <span className="hidden sm:inline">Open Finance</span>
          </button>

          <Link
            href="/settings"
            className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white shadow-sm hover:shadow-indigo transition-all"
            title="Ajuste de Salário, Horas e Vetores"
          >
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
