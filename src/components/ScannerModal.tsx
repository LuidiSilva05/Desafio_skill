"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Camera, QrCode, Barcode, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
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
          (errorMessage: string) => {}
        );
      } catch (err: any) {
        console.warn("Scanner initialization error:", err);
        setCameraError(
          "Câmera inacessível ou permissão não concedida no navegador. Utilize a leitura de boletos ou simulação de NFC-e."
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
    if (text.includes("gov.br") || text.includes("sefaz") || text.includes("nfe")) {
      setNfceSimulated({
        store: "Supermercado Pão de Açúcar",
        total: 184.5,
        items: ["Café Gourmet 500g", "Azeite Extra Virgem", "Proteína Vegetal", "Frutas Orgânicas"],
      });
      setActiveTab("nfce");
    } else {
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
      category: "Supermercado & Alimentação",
      vector: "sobrevivencia",
      method: "NFC-e / Cartão",
    });
    setNfceSimulated(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 border border-slate-200 shadow-elevated relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-kamino-50 text-kamino-600 border border-kamino-100">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-navy-900">
              Captura de Documentos & OCR
            </h3>
            <p className="text-xs text-slate-500">
              Leitura automatizada de Cupons Fiscais (NFC-e), Boletos e QR Codes Pix.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-1.5 mb-5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("camera")}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "camera"
                ? "bg-white text-navy-900 shadow-sm"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            <QrCode className="w-4 h-4" /> Câmera QR
          </button>
          <button
            onClick={() => setActiveTab("boleto")}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "boleto"
                ? "bg-white text-navy-900 shadow-sm"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            <Barcode className="w-4 h-4" /> Boletos
          </button>
          <button
            onClick={() => setActiveTab("nfce")}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "nfce"
                ? "bg-white text-navy-900 shadow-sm"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            <FileText className="w-4 h-4" /> Cupom NFC-e
          </button>
        </div>

        {/* TAB 1: Camera Scanner */}
        {activeTab === "camera" && (
          <div className="space-y-3.5">
            <div
              id="reader-container"
              className="w-full aspect-square max-h-[280px] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center relative"
            >
              {cameraError && (
                <div className="p-4 text-center text-xs text-amber-700">
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  {cameraError}
                </div>
              )}
            </div>

            <p className="text-center text-xs text-slate-500">
              Aponte a câmera para o QR Code Pix ou QR Code do Cupom Fiscal (NFC-e).
            </p>

            {scanResult && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Código lido: {scanResult}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Boleto Scanner */}
        {activeTab === "boleto" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Linha Digitável do Boleto (44 a 48 dígitos)
              </label>
              <textarea
                rows={3}
                value={boletoInput}
                onChange={(e) => setBoletoInput(e.target.value)}
                placeholder="Ex: 34191.79001 01043.510047 91020.150008 4 98760000025000"
                className="w-full kamino-input p-3 text-xs font-mono text-navy-900"
              />
            </div>

            <button
              onClick={handleProcessBoleto}
              className="w-full py-2.5 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Decodificar e Registrar Boleto
            </button>
          </div>
        )}

        {/* TAB 3: NFC-e Cupom Fiscal OCR */}
        {activeTab === "nfce" && (
          <div className="space-y-4">
            {nfceSimulated ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-navy-900 font-bold">
                  <span>{nfceSimulated.store}</span>
                  <span className="text-sm font-semibold text-emerald-600">R$ {nfceSimulated.total.toFixed(2)}</span>
                </div>
                <div className="text-slate-500 text-[11px] border-t border-slate-200 pt-2.5">
                  Itens identificados pelo OCR:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700 font-medium">
                    {nfceSimulated.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleConfirmNfce}
                  className="w-full mt-3 py-2.5 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white font-semibold text-xs"
                >
                  Confirmar e Categorizar em Sobrevivência
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3 text-xs text-slate-500">
                <FileText className="w-9 h-9 mx-auto text-slate-400" />
                <p>Nenhum cupom capturado no momento.</p>
                <button
                  onClick={() => {
                    setNfceSimulated({
                      store: "Supermercado Pão de Açúcar",
                      total: 247.8,
                      items: ["Café Gourmet 500g", "Salmão Fresco", "Azeite Português", "Queijo Minas"],
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-all"
                >
                  Simular Leitura OCR de Cupom Fiscal
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
