"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from "lucide-react";
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
    <div className="hud-box rounded-xl p-4 border border-cyan-500/30 bg-space-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleListening}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
              isListening
                ? "bg-hud-magenta text-white shadow-neon-magenta animate-pulse scale-105"
                : "bg-space-850 border border-hud-cyan/40 text-hud-cyan hover:border-hud-cyan hover:shadow-neon-cyan"
            }`}
            title="Clique para falar (hands-free)"
          >
            {isListening ? <Mic className="w-6 h-6 animate-bounce" /> : <Mic className="w-5 h-5" />}
            {isListening && (
              <span className="absolute -inset-1 rounded-xl bg-hud-magenta/30 animate-ping" />
            )}
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-bold text-xs uppercase tracking-wider text-hud-cyan">
                VOICE TELEMETRY INTERFACE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-space-950 text-slate-400 border border-slate-800">
                WEB SPEECH API
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              {isListening
                ? "Captação de voz ativa... Fale agora."
                : "Clique no microfone para registro falado em 3 segundos."}
            </p>
          </div>
        </div>

        {transcript && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleProcessTranscript}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-gradient-to-r from-hud-cyan to-blue-500 text-space-950 hover:brightness-110 shadow-neon-cyan transition-all uppercase"
            >
              Confirmar Voz
            </button>
            <button
              onClick={() => setTranscript("")}
              className="text-xs font-mono px-2 py-1.5 rounded bg-space-850 text-slate-400 hover:text-white"
            >
              Limpar
            </button>
          </div>
        )}
      </div>

      {/* Live Transcript Display */}
      {transcript && (
        <div className="mt-3 p-2.5 rounded bg-space-950 border border-hud-cyan/40 font-mono text-sm text-hud-cyan flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-hud-cyan animate-pulse" />
            <span>&quot;{transcript}&quot;</span>
          </div>
        </div>
      )}

      {/* Feedback Toast */}
      {feedback && (
        <div className="mt-2 text-xs font-mono text-hud-green flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{feedback}</span>
        </div>
      )}

      {!isSupported && (
        <div className="mt-2 text-xs font-mono text-hud-gold flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Navegador sem suporte nativo à Web Speech API (recomendado Chrome ou Edge).</span>
        </div>
      )}
    </div>
  );
}
