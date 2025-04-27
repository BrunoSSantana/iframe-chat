import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface IframeScriptProps {
    chatUrl?: string;
}

export const IframeScript = ({ chatUrl = window.location.origin + "/chat" }: IframeScriptProps) => {
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    const iframeCode = `<iframe
  src="${chatUrl}"
  width="400"
  height="600"
  frameborder="0"
  allow="microphone"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);"
></iframe>`;

    const scriptCode = `<script>
  (function() {
    // Cria o elemento do iframe
    const iframe = document.createElement('iframe');
    iframe.src = "${chatUrl}";
    iframe.width = "380";
    iframe.height = "600";
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "8px";
    iframe.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    iframe.style.zIndex = "9999";
    iframe.allow = "microphone";
    iframe.frameBorder = "0";
    
    // Adiciona o iframe ao final do body
    document.body.appendChild(iframe);
  })();
</script>`;

    const embedScriptCode = `<script 
  src="${window.location.origin}/chat-embed.js"
  data-position="bottom-right" 
  data-color="#8b5cf6">
</script>`;

    const copyToClipboard = (text: string, item: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedItem(item);
            setTimeout(() => setCopiedItem(null), 2000);
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Opção 1: Script Simplificado (Recomendado)</h3>
                <p className="text-sm text-gray-600">
                    Adicione este script ao seu site para exibir um botão flutuante que abre o chat.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{embedScriptCode}</pre>
                </div>
                <Button
                    onClick={() => copyToClipboard(embedScriptCode, "embed")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    {copiedItem === "embed" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedItem === "embed" ? "Copiado!" : "Copiar código"}
                </Button>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Opção 2: Iframe Simples</h3>
                <p className="text-sm text-gray-600">
                    Incorpore este iframe em qualquer lugar do seu site.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{iframeCode}</pre>
                </div>
                <Button
                    onClick={() => copyToClipboard(iframeCode, "iframe")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    {copiedItem === "iframe" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedItem === "iframe" ? "Copiado!" : "Copiar código"}
                </Button>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Opção 3: Script Customizado</h3>
                <p className="text-sm text-gray-600">
                    Insere o chat via JavaScript no canto inferior direito do site.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{scriptCode}</pre>
                </div>
                <Button
                    onClick={() => copyToClipboard(scriptCode, "script")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    {copiedItem === "script" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedItem === "script" ? "Copiado!" : "Copiar código"}
                </Button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                    <strong>Nota:</strong> Certifique-se de que o URL do chat ({chatUrl}) está acessível publicamente.
                    Para testes locais, você pode usar seu IP local ou localhost.
                </p>
            </div>
        </div>
    );
}; 