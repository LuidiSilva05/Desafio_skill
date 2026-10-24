"use client";

import React, { useState } from "react";
import { HeaderHUD } from "../components/HeaderHUD";
import { TelemetryGauges } from "../components/TelemetryGauges";
import { VectorsProgress } from "../components/VectorsProgress";
import { FireClock } from "../components/FireClock";
import { VoiceCommander } from "../components/VoiceCommander";
import { ImpulseCalculator } from "../components/ImpulseCalculator";
import { LeakDetector } from "../components/LeakDetector";
import { TransactionList } from "../components/TransactionList";
import { ScannerModal } from "../components/ScannerModal";
import { OpenFinanceModal } from "../components/OpenFinanceModal";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOpenFinanceOpen, setIsOpenFinanceOpen] = useState(false);

  return (
    <main className="min-h-screen bg-surface-ground pb-20">
      <HeaderHUD
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenOpenFinance={() => setIsOpenFinanceOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* ROW 1: VOICE COMMANDER (HANDS-FREE INPUT) */}
        <VoiceCommander />

        {/* ROW 2: EXECUTIVE METRICS GAUGES */}
        <TelemetryGauges />

        {/* ROW 3: VECTORS PROGRESS & FIRE COUNTDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VectorsProgress />
          <FireClock />
        </div>

        {/* ROW 4: OPPORTUNITY COST CALCULATOR & LEAK DETECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImpulseCalculator />
          <LeakDetector />
        </div>

        {/* ROW 5: QUICK TRANSACTION DISPATCH & LEDGER */}
        <TransactionList />

        {/* ENTERPRISE FOOTER */}
        <footer className="pt-8 border-t border-slate-200 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>KAMINO QUANTUM FINANCIAL OS • CRIPTOGRAFIA LOCAL & PRIVACIDADE TOTAL</span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            📌 <strong>Ressalva Legal Informativa:</strong> As simulações e diagnósticos fornecidos por esta plataforma possuem finalidade estritamente educativa e de auxílio à gestão financeira pessoal, não configurando recomendação de investimento ou consultoria financeira regulada.
          </p>
        </footer>
      </div>

      {/* MODALS */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      <OpenFinanceModal
        isOpen={isOpenFinanceOpen}
        onClose={() => setIsOpenFinanceOpen(false)}
      />
    </main>
  );
}
