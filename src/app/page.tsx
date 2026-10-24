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
import { ShieldCheck, HelpCircle } from "lucide-react";

export default function Home() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOpenFinanceOpen, setIsOpenFinanceOpen] = useState(false);

  return (
    <main className="min-h-screen pb-16">
      <HeaderHUD
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenOpenFinance={() => setIsOpenFinanceOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-6">
        {/* ROW 1: VOICE COMMANDER (HANDS-FREE INPUT) */}
        <VoiceCommander />

        {/* ROW 2: HUD TELEMETRY GAUGES */}
        <TelemetryGauges />

        {/* ROW 3: VECTORS PROGRESS & FIRE COUNTDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VectorsProgress />
          <FireClock />
        </div>

        {/* ROW 4: IMPULSE BUY CALCULATOR & LEAK DETECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImpulseCalculator />
          <LeakDetector />
        </div>

        {/* ROW 5: QUICK TRANSACTION DISPATCH & FEED */}
        <TransactionList />

        {/* LEGAL DISCLAIMER */}
        <footer className="pt-6 border-t border-slate-800/80 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-hud-green" />
            <span>QUANTUM MISSION CONTROL | CRIPTOGRAFIA LOCAL & OFFLINE-FIRST</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 max-w-2xl mx-auto">
            📌 <strong>Ressalva Educativa:</strong> Esta suíte de telemetria fornece projeções matemáticas com fins estritamente educativos e de organização pessoal. Decisões de investimento de grande porte merecem a avaliação de um profissional certificado (CEA/CFP).
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

