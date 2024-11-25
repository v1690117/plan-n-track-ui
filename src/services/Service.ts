export default class Service {
    fetchWithRedirect = async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
        const response = await fetch(url, options);
        if (response.status === 401 || response.status === 302) {
            window.location.href = '/login';
        } else if (response.ok) {
            return await response.json();
        }
        throw new Error('Something went wrong');
    };
}
