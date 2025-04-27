import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";

interface ApiClientConfig extends AxiosRequestConfig {
	baseURL: string;
}

/**
 * Configuração padrão para o cliente de API
 */
const defaultConfig: ApiClientConfig = {
	baseURL: import.meta.env.VITE_API_URL || "/api",
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
};

/**
 * Cliente de API com Axios centralizado
 */
class ApiClient {
	private client: AxiosInstance;

	constructor(config: Partial<ApiClientConfig> = {}) {
		const mergedConfig = { ...defaultConfig, ...config };
		this.client = axios.create(mergedConfig);

		this.setupInterceptors();
	}

	/**
	 * Configura interceptadores para requisições e respostas
	 */
	private setupInterceptors(): void {
		// Interceptor de requisição
		this.client.interceptors.request.use(
			(config) => {
				// Aqui você pode adicionar headers de autenticação, tokens, etc.
				// Exemplo: const token = getToken(); if (token) config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			(error) => Promise.reject(error),
		);

		// Interceptor de resposta
		this.client.interceptors.response.use(
			(response) => response,
			(error) => {
				// Tratamento centralizado de erros
				console.error("API Error:", error.response?.data || error.message);
				return Promise.reject(error);
			},
		);
	}

	/**
	 * Realiza uma requisição GET
	 */
	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.get(url, config);
		return response.data;
	}

	/**
	 * Realiza uma requisição POST
	 */
	public async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		console.log({ url, data, config });
		const response: AxiosResponse<T> = await this.client.post(
			url,
			data,
			config,
		);
		return response.data;
	}

	/**
	 * Realiza uma requisição PUT
	 */
	public async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response: AxiosResponse<T> = await this.client.put(url, data, config);
		return response.data;
	}

	/**
	 * Realiza uma requisição PATCH
	 */
	public async patch<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response: AxiosResponse<T> = await this.client.patch(
			url,
			data,
			config,
		);
		return response.data;
	}

	/**
	 * Realiza uma requisição DELETE
	 */
	public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.delete(url, config);
		return response.data;
	}

	/**
	 * Acesso ao cliente Axios original para casos especiais
	 */
	public getAxiosInstance(): AxiosInstance {
		return this.client;
	}
}

/**
 * Instância padrão do cliente de API
 */
export const apiClient = new ApiClient();

/**
 * Exporta a classe para permitir criar instâncias personalizadas se necessário
 */
export default ApiClient;
