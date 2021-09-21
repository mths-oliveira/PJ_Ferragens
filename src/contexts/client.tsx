import axios from 'axios';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { IClient } from '../core/client';

interface ContextProps {
  clients: IClient[];
  addClient: (client: IClient) => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const ClientsContext = createContext({} as ContextProps);

export function ClientsContextProvider({ children }: Props) {
  const url = '/api/clients';
  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(updateClients, []);

  async function addClient(client: IClient) {
    if (alreadyRegistered(client)) return;
    await axios.post(url, client);
    updateClients();
  }

  function alreadyRegistered(client: IClient) {
    const index = clients.findIndex(({ id }) => {
      return id === client.id;
    });
    return index !== -1;
  }

  function updateClients() {
    getClients().then((clients) => {
      setClients(clients);
    });
  }

  async function getClients(): Promise<IClient[]> {
    const response = await axios.get<IClient[]>(url);
    return response.data;
  }

  return (
    <ClientsContext.Provider value={{ clients, addClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClientsContext() {
  const context = useContext(ClientsContext);
  return context;
}
