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

  useEffect(() => {
    getClients().then((clients) => {
      setClients(clients);
    });
  }, []);

  async function getClients() {
    const response = await axios.get<IClient[]>(url);
    let clients = response.data;
    if (!Array.isArray(clients) || isEmpty(clients)) {
      clients = await getClients();
    }
    return clients;
  }

  function isEmpty(list: any[]) {
    return list.length === 0;
  }

  async function addClient(client: IClient) {
    if (alreadyRegistered(client)) return;
    await axios.post(url, client);
    setClients([...clients, client]);
  }

  function alreadyRegistered({ id }: IClient) {
    const client = clients.find((client) => {
      return id === client.id;
    });
    return !!client;
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
