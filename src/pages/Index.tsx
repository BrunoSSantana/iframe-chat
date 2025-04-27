import { ChatFrame } from "@/components/ChatFrame";
import { IframeScript } from "@/components/IframeScript";

export default function Index() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Chat Widget Demonstração</h1>
        <p className="text-gray-600">
          Um exemplo de widget de chat que pode ser incorporado em qualquer site
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-1">
        <section className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Código para Incorporação</h2>
          <p className="text-gray-600 mb-6">
            Copie um dos códigos abaixo para adicionar este chat ao seu site.
          </p>

          <IframeScript />
        </section>
      </div>

      {/* Widget de demonstração */}
      <ChatFrame />
    </div>
  );
}
