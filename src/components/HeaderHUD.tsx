"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Settings, Radio, Sparkles, Camera, ShieldCheck, Database } from "lucide-react";

interface HeaderHUDProps {
  onOpenScanner: () => void;
  onOpenOpenFinance: () => void;
}

export function HeaderHUD({ onOpenScanner, onOpenOpenFinance }: HeaderHUDProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toISOString().replace("T", " | ").substring(0, 21) + " UTC"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-cyan-500/20 bg-space-900/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Telemetry Status */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950/60 border border-hud-cyan text-hud-cyan shadow-neon-cyan">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-hud-green rounded-full shadow-[0_0_8px_#39ff14] animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-hud-cyan via-hud-purple to-hud-magenta">
                QUANTUM MISSION CONTROL
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-hud-cyan">
                SPACEX HUD v2.4
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
              <span className="text-hud-green font-semibold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-green inline-block mr-1"></span>
                TELEMETRY LINK: STABLE
              </span>
              <span>•</span>
              <span className="hidden md:inline">{time}</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenScanner}
            className="flex items-center space-x-1.5 text-xs font-mono uppercase px-3 py-1.5 rounded bg-space-850 hover:bg-space-800 border border-hud-cyan/40 text-hud-cyan hover:border-hud-cyan shadow-sm hover:shadow-neon-cyan transition-all"
            title="Scan QR Code, Boleto ou Cupom Fiscal"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Scanner OCR / QR</span>
          </button>

          <button
            onClick={onOpenOpenFinance}
            className="flex items-center space-x-1.5 text-xs font-mono uppercase px-3 py-1.5 rounded bg-space-850 hover:bg-space-800 border border-hud-purple/40 text-hud-purple hover:border-hud-purple shadow-sm hover:shadow-[0_0_15px_rgba(191,90,242,0.4)] transition-all"
            title="Open Finance & Extratos OFX/CSV"
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Open Finance</span>
          </button>

          <Link
            href="/settings"
            className="flex items-center space-x-1.5 text-xs font-mono uppercase px-3 py-1.5 rounded bg-space-850 hover:bg-space-800 border border-slate-700 text-slate-300 hover:text-hud-cyan hover:border-hud-cyan transition-all"
            title="Ajuste parâmetros, salário e vetores"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Configurações</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

