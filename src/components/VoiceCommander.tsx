"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Sparkles, Check, AlertCircle } from "lucide-react";
import { useFinancial } from "../context/FinancialContext";

export function VoiceCommander() {
  const { parseNaturalLanguage, addTransaction } = useFinancial();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "pt-BR";
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback("Ouvindo... Diga seus gastos ou investimentos");
    };

    recognition.onresult = (event: any) => {
      let currentText = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentText += event.results[i][0].transcript;
      }
      setTranscript(currentText);
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setFeedback("Permissão de microfone negada no navegador.");
      } else {
        setFeedback("Erro na captura de áudio. Tente novamente.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      setFeedback(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Recognition already started or error:", e);
      }
    }
  };

  const handleProcessTranscript = () => {
    if (!transcript.trim()) return;
    const detected = parseNaturalLanguage(transcript);
    if (detected.length === 0) {
      setFeedback("Nenhum valor detectado. Exemplo: '45 no almoço e 12 no uber'");
      return;
    }

    detected.forEach((tx) => {
      addTransaction({
        description: tx.description,
        amount: tx.amount,
        category: tx.category,
        vector: tx.vector,
        method: tx.method,
      });
    });

    const total = detected.reduce((acc, t) => acc + t.amount, 0);
    setFeedback(`✅ ${detected.length} transação(ões) adicionada(s) via Voz! Total: R$ ${total.toFixed(2)}`);
    setTranscript("");
  };

  return (
    <div className="kamino-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={toggleListening}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ${
              isListening
                ? "bg-red-500 text-white shadow-md animate-pulse"
                : "bg-kamino-50 text-kamino-600 hover:bg-kamino-100 border border-kamino-200/80"
            }`}
            title="Gravação por voz mãos-livres"
          >
            {isListening ? <Mic className="w-5 h-5 animate-bounce" /> : <Mic className="w-5 h-5" />}
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-semibold text-xs uppercase tracking-wider text-navy-900">
                Captura Hands-Free por Voz
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Web Speech / Whisper API
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isListening
                ? "Microfone ativo... Fale suas despesas ou aportes agora."
                : "Dite despesas em linguagem natural para registro instantâneo em 3 segundos."}
            </p>
          </div>
        </div>

        {transcript && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleProcessTranscript}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white shadow-sm transition-all"
            >
              Confirmar e Categorizar
            </button>
            <button
              onClick={() => setTranscript("")}
              className="text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Live Transcript Display */}
      {transcript && (
        <div className="mt-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-navy-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Volume2 className="w-4 h-4 text-kamino-600 flex-shrink-0" />
            <span className="font-medium">&quot;{transcript}&quot;</span>
          </div>
        </div>
      )}

      {/* Feedback Alert */}
      {feedback && (
        <div className="mt-2.5 text-xs font-medium text-emerald-600 flex items-center space-x-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>{feedback}</span>
        </div>
      )}

      {!isSupported && (
        <div className="mt-2.5 text-xs text-amber-700 flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Navegador sem suporte nativo à Web Speech API (recomendado Google Chrome ou Microsoft Edge).</span>
        </div>
      )}
    </div>
  );
}
