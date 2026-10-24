"use client";

import React, { useState } from "react";
import { useFinancial } from "../context/FinancialContext";
import { Send, Trash2, ArrowUpRight, Filter, PlusCircle } from "lucide-react";
import { VectorKey } from "../types/financial";

export function TransactionList() {
  const { transactions, addTransaction, deleteTransaction, parseNaturalLanguage } = useFinancial();
  const [inputText, setInputText] = useState("");
  const [filterVector, setFilterVector] = useState<string>("all");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const parsed = parseNaturalLanguage(inputText);
    if (parsed.length === 0) {
      alert("Nenhum valor identificado. Exemplo: '45 no almoço e 12 no Uber'");
      return;
    }

    parsed.forEach((tx) => {
      addTransaction({
        description: tx.description,
        amount: tx.amount,
        category: tx.category,
        vector: tx.vector,
        method: tx.method,
      });
    });

    setInputText("");
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterVector === "all") return true;
    return t.vector === filterVector;
  });

  const vectorBadge = (vec: VectorKey) => {
    switch (vec) {
      case "sobrevivencia":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-hud-cyan border border-hud-cyan/40">🛡️ Sobrevivência</span>;
      case "aceleracao":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-950 text-hud-green border border-hud-green/40">⚡ Aceleração</span>;
      case "futuro":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-hud-purple border border-hud-purple/40">🚀 Futuro</span>;
      case "lazer":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-yellow-950 text-hud-gold border border-hud-gold/40">🎮 Lazer Livre</span>;
    }
  };

  return (
    <div className="hud-box rounded-xl p-5 border border-cyan-500/30 bg-space-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="font-orbitron font-bold text-sm tracking-widest text-hud-cyan">
            REGISTRO ULTRARRÁPIDO (30 SEGUNDOS)
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Digite frases soltas ou comprovantes — o copiloto categoriza e enquadra no vetor.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {["all", "sobrevivencia", "aceleracao", "futuro", "lazer"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterVector(f)}
              className={`px-2 py-1 rounded text-[11px] uppercase transition-all ${
                filterVector === f
                  ? "bg-hud-cyan text-space-950 font-bold"
                  : "bg-space-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {f === "all" ? "Todos" : f.slice(0, 5)}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleQuickSubmit} className="relative mb-5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Ex: "Gastei 45 no almoço, 12 no Uber e aportei 500 no Tesouro IPCA"'
          className="w-full bg-space-950 border border-hud-cyan/40 focus:border-hud-cyan rounded-xl pl-4 pr-24 py-3 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:shadow-neon-cyan transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-gradient-to-r from-hud-cyan to-blue-500 text-space-950 font-orbitron font-bold text-xs uppercase hover:brightness-110 shadow-neon-cyan flex items-center gap-1.5 transition-all"
        >
          <span>Lançar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Transactions Table / Cards */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-xs font-mono text-slate-500">
            Nenhuma movimentação registrada neste filtro.
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3 rounded-lg bg-space-950/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="font-mono text-[10px] text-slate-500 w-16">{tx.date}</div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>{tx.description}</span>
                    <span className="text-[10px] font-mono text-slate-400">({tx.category})</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{tx.method}</span>
                    <span>•</span>
                    {vectorBadge(tx.vector)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="font-orbitron font-bold text-sm text-white">
                  R$ {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="opacity-40 group-hover:opacity-100 hover:text-hud-magenta transition-all p-1"
                  title="Remover transação"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
