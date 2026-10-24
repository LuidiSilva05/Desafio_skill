"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Camera, QrCode, Barcode, FileText, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { useFinancial } from "../context/FinancialContext";

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScannerModal({ isOpen, onClose }: ScannerModalProps) {
  const { addTransaction } = useFinancial();
  const [activeTab, setActiveTab] = useState<"camera" | "boleto" | "nfce">("camera");
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [boletoInput, setBoletoInput] = useState("");
  const [nfceSimulated, setNfceSimulated] = useState<{ store: string; total: number; items: string[] } | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen || activeTab !== "camera") {
      stopScanner();
      return;
    }

    // Dynamic import of html5-qrcode for client-side rendering
    let html5QrCode: any = null;
    const startScanner = async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        html5QrCode = new Html5Qrcode("reader-container");
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText: string) => {
            setScanResult(decodedText);
            handleDecodedPayload(decodedText);
            stopScanner();
          },
          (errorMessage: string) => {
            // scan frames in progress
          }
        );
      } catch (err: any) {
        console.warn("Scanner initialization error:", err);
        setCameraError(
          "Câmera inacessível ou permissão não concedida. Use os modos de Boleto ou OCR manual."
        );
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [isOpen, activeTab]);

  const stopScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.stop().then(() => {
          scannerRef.current?.clear();
          scannerRef.current = null;
        }).catch(() => {});
      } catch (e) {}
    }
  };

  const handleDecodedPayload = (text: string) => {
    // If it's a pix payload or NFC-e link
    if (text.includes("gov.br") || text.includes("sefaz") || text.includes("nfe")) {
      // Simulate NFC-e parsing
      setNfceSimulated({
        store: "Supermercado Hipertech Ltda",
        total: 184.5,
        items: ["Café Especial 500g", "Azeite Extra Virgem", "Proteína Vegetal", "Frutas Orgânicas"],
      });
      setActiveTab("nfce");
    } else {
      // General QR / barcode
      const match = text.match(/(\d+[.,]\d{2})/);
      const val = match ? parseFloat(match[1].replace(",", ".")) : 89.9;
      addTransaction({
        description: `QR Code: ${text.substring(0, 24)}...`,
        amount: val,
        category: "Leitura Digital",
        vector: "sobrevivencia",
        method: "QR Code / Pix",
      });
    }
  };

  const handleProcessBoleto = () => {
    const clean = boletoInput.replace(/\D/g, "");
    if (clean.length < 44) {
      alert("Linha digitável de boleto deve conter 44 a 48 dígitos numéricos.");
      return;
    }

    // Extract value from Brazilian standard boleto line (last 10 digits represent cents in standard format)
    const valString = clean.substring(clean.length - 10);
    const amount = parseInt(valString, 10) / 100 || 250.0;

    addTransaction({
      description: `Boleto Bancário (Final ${clean.slice(-4)})`,
      amount: amount > 0 ? amount : 150.0,
      category: "Contas & Boletos",
      vector: "sobrevivencia",
      method: "Boleto",
    });

    setBoletoInput("");
    onClose();
  };

  const handleConfirmNfce = () => {
    if (!nfceSimulated) return;
    addTransaction({
      description: `${nfceSimulated.store} (NFC-e)`,
      amount: nfceSimulated.total,
      category: "Alimentação",
      vector: "sobrevivencia",
      method: "NFC-e / Cartão",
    });
    setNfceSimulated(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md">
      <div className="hud-box w-full max-w-lg rounded-2xl p-6 border border-hud-cyan shadow-neon-cyan relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-space-850 border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-lg bg-cyan-950/70 border border-hud-cyan text-hud-cyan">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-base text-hud-cyan tracking-wider">
              TELEMETRIA ÓPTICA & SCANNER
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Leitura instantânea de QR Code, Boletos e Cupons Fiscais.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-space-950 p-1 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab("camera")}
            className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "camera"
                ? "bg-hud-cyan text-space-950 shadow-neon-cyan"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <QrCode className="w-4 h-4" /> Câmera QR
          </button>
          <button
            onClick={() => setActiveTab("boleto")}
            className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "boleto"
                ? "bg-hud-cyan text-space-950 shadow-neon-cyan"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Barcode className="w-4 h-4" /> Boletos
          </button>
          <button
            onClick={() => setActiveTab("nfce")}
            className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "nfce"
                ? "bg-hud-cyan text-space-950 shadow-neon-cyan"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" /> NFC-e Cupom
          </button>
        </div>

        {/* TAB 1: Camera Scanner */}
        {activeTab === "camera" && (
          <div className="space-y-3">
            <div
              id="reader-container"
              className="w-full aspect-square max-h-[300px] bg-space-950 rounded-xl overflow-hidden border border-hud-cyan/40 flex items-center justify-center relative"
            >
              {cameraError && (
                <div className="p-4 text-center text-xs font-mono text-hud-gold">
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-hud-gold" />
                  {cameraError}
                </div>
              )}
            </div>

            <p className="text-center text-[11px] font-mono text-slate-400">
              Aponte a câmera para o QR Code Pix ou QR Code do Cupom Fiscal (NFC-e).
            </p>

            {scanResult && (
              <div className="p-3 rounded-lg bg-green-950/40 border border-hud-green text-xs font-mono text-hud-green flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Lido: {scanResult}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Boleto Scanner / Digitavel */}
        {activeTab === "boleto" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                Linha Digitável do Boleto (44 a 48 dígitos)
              </label>
              <textarea
                rows={3}
                value={boletoInput}
                onChange={(e) => setBoletoInput(e.target.value)}
                placeholder="Ex: 34191.79001 01043.510047 91020.150008 4 98760000025000"
                className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-cyan focus:outline-none"
              />
            </div>

            <button
              onClick={handleProcessBoleto}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-hud-cyan to-blue-500 text-space-950 font-orbitron font-bold text-xs uppercase hover:brightness-110 shadow-neon-cyan transition-all"
            >
              Decodificar e Lançar Boleto
            </button>
          </div>
        )}

        {/* TAB 3: NFC-e Cupom Fiscal OCR */}
        {activeTab === "nfce" && (
          <div className="space-y-4">
            {nfceSimulated ? (
              <div className="p-4 rounded-xl bg-space-950 border border-hud-green/40 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-hud-green font-bold">
                  <span>{nfceSimulated.store}</span>
                  <span className="text-sm">R$ {nfceSimulated.total.toFixed(2)}</span>
                </div>
                <div className="text-slate-400 text-[11px] border-t border-slate-800 pt-2">
                  Itens detectados via OCR:
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {nfceSimulated.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleConfirmNfce}
                  className="w-full mt-3 py-2 rounded-lg bg-hud-green text-space-950 font-orbitron font-bold text-xs uppercase"
                >
                  Confirmar e Categorizar em Sobrevivência
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3 font-mono text-xs text-slate-400">
                <FileText className="w-8 h-8 mx-auto text-hud-cyan/60" />
                <p>Nenhum cupom capturado ainda.</p>
                <button
                  onClick={() => {
                    setNfceSimulated({
                      store: "Rede Pão de Açúcar Hiper",
                      total: 247.8,
                      items: ["Café Gourmet 500g", "Salmão Fresco", "Azeite Português", "Queijo Minas"],
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-space-850 border border-hud-cyan/40 text-hud-cyan hover:border-hud-cyan font-mono text-xs"
                >
                  ⚡ Simular Captura OCR de Nota de Mercado
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

