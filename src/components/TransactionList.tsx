"use client";

import React, { useState } from "react";
import { useFinancial } from "../context/FinancialContext";
import { Send, Trash2, Filter } from "lucide-react";
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
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">Sobrevivência</span>;
      case "aceleracao":
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Aceleração FIRE</span>;
      case "futuro":
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-kamino-700 border border-indigo-200">Vetor Futuro</span>;
      case "lazer":
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Lazer Livre</span>;
    }
  };

  return (
    <div className="kamino-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="font-heading font-bold text-base text-navy-900">
            Registro Rápido & Extrato Consolidado
          </h2>
          <p className="text-xs text-slate-500">
            Entrada desestruturada com categorização automática nos 4 Vetores.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {["all", "sobrevivencia", "aceleracao", "futuro", "lazer"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterVector(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filterVector === f
                  ? "bg-navy-900 text-white font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f === "all" ? "Todos" : f === "sobrevivencia" ? "Sobrevivência" : f === "aceleracao" ? "Aceleração" : f === "futuro" ? "Futuro" : "Lazer"}
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
          className="w-full kamino-input pl-4 pr-28 py-3 text-xs sm:text-sm text-navy-900 placeholder-slate-400 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5"
        >
          <span>Lançar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Transactions List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            Nenhuma movimentação encontrada para o filtro selecionado.
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 flex items-center justify-between transition-all group shadow-subtle"
            >
              <div className="flex items-center space-x-3.5">
                <div className="text-xs font-mono text-slate-400 w-20">{tx.date}</div>
                <div>
                  <div className="text-xs font-semibold text-navy-900 flex items-center gap-2">
                    <span>{tx.description}</span>
                    <span className="text-[11px] font-normal text-slate-400">({tx.category})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{tx.method}</span>
                    <span>•</span>
                    {vectorBadge(tx.vector)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="font-heading font-bold text-sm text-navy-900">
                  R$ {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="opacity-40 group-hover:opacity-100 hover:text-red-600 transition-all p-1 text-slate-400"
                  title="Remover transação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
