"use client";

import React, { useState } from "react";
import { useFinancial } from "../context/FinancialContext";
import { ShoppingBag, Calculator, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

export function ImpulseCalculator() {
  const { analyzeImpulse, hourlyRate, settings } = useFinancial();
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price.replace(",", "."));
    if (!item.trim() || isNaN(numPrice) || numPrice <= 0) return;

    const res = analyzeImpulse(item, numPrice);
    setResult(res);
  };

  return (
    <div className="hud-box rounded-xl p-5 border border-hud-gold/30 bg-space-900/80">
      <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-slate-800">
        <div className="p-2 rounded-lg bg-yellow-950/70 border border-hud-gold text-hud-gold shadow-[0_0_15px_rgba(255,215,0,0.3)]">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-orbitron font-bold text-sm tracking-widest text-hud-gold">
            MODO COMPRA IMPULSIVA | TELEMETRIA DE DECISÃO
          </h2>
          <p className="text-xs font-mono text-slate-400">
            &quot;Vale a pena comprar X por R$ Y?&quot; — Custo em horas de vida vs. Juros Compostos.
          </p>
        </div>
      </div>

      <form onSubmit={handleSimulate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
            Item / Desejo:
          </label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Ex: iPhone 16 Pro, Tênis Nike, PS5"
            className="w-full bg-space-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-hud-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
            Valor Estimado (R$):
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: 5500.00"
            className="w-full bg-space-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-hud-gold focus:outline-none"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-hud-gold to-amber-600 text-space-950 font-orbitron font-bold text-xs uppercase hover:brightness-110 shadow-neon-gold transition-all"
          >
            Calcular Impacto FIRE
          </button>
        </div>
      </form>

      {/* RESULT DISPLAY */}
      {result && (
        <div className="p-4 rounded-xl bg-space-950 border border-hud-gold/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="font-orbitron font-bold text-sm text-white">
              ANÁLISE DE ESFORÇO: <span className="text-hud-gold">{result.item}</span> (R$ {result.price.toFixed(2)})
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                result.verdict === "CRITICO"
                  ? "bg-hud-magenta/20 text-hud-magenta border-hud-magenta/50"
                  : result.verdict === "ATENCAO_IMPACTO"
                  ? "bg-hud-gold/20 text-hud-gold border-hud-gold/50"
                  : "bg-hud-green/20 text-hud-green border-hud-green/50"
              }`}
            >
              VEREDITO: {result.verdict}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-space-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">HORAS DE TRABALHO</div>
              <div className="font-orbitron text-xl font-bold text-hud-cyan mt-1">
                {result.workHours.toFixed(1)}h
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                {(result.workHours / 8).toFixed(1)} dias de jornada
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-space-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">RENDIMENTO EM 1 ANO</div>
              <div className="font-orbitron text-lg font-bold text-hud-green mt-1">
                R$ {result.projection1y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] font-mono text-hud-green/80">+{(settings.annualReturnRate * 100).toFixed(0)}% a.a.</div>
            </div>

            <div className="p-2.5 rounded-lg bg-space-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">RENDIMENTO EM 5 ANOS</div>
              <div className="font-orbitron text-lg font-bold text-hud-green mt-1">
                R$ {result.projection5y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] font-mono text-slate-500">Multiplicador ~1.76x</div>
            </div>

            <div className="p-2.5 rounded-lg bg-space-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">RENDIMENTO EM 10 ANOS</div>
              <div className="font-orbitron text-lg font-bold text-hud-gold mt-1">
                R$ {result.projection10y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] font-mono text-hud-gold">Multiplicador ~3.10x</div>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-300 bg-space-900/60 p-3 rounded-lg border border-slate-800">
            <span className="text-hud-cyan font-bold">🧠 DIAGNÓSTICO DO COPILOTO:</span> Se este item potencializar sua produtividade, saúde ou felicidade genuína, enquadre-o no <strong>Vetor Futuro</strong> ou <strong>Lazer Livre</strong>. Se for impulso passageiro, este valor aplicado no <strong>Vetor Aceleração</strong> somaria R$ {result.projection10y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} ao seu relógio FIRE.
          </div>
        </div>
      )}
    </div>
  );
}

