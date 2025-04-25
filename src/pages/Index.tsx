
import { ChatFrame } from "@/components/ChatFrame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Chat Widget Demo</h1>
        <p className="text-xl text-gray-600 mb-8">
          Esta é uma demonstração do widget de chat. O iframe pode ser incorporado em qualquer site.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Como incorporar</h2>
          <p className="mb-4">Adicione o seguinte código ao seu site:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {`<iframe
  src="https://seu-dominio.com"
  width="380"
  height="600"
  frameborder="0"
  style="position: fixed; bottom: 20px; right: 20px;"
></iframe>`}
          </pre>
        </div>
      </div>
      <ChatFrame />
    </div>
  );
};

export default Index;
