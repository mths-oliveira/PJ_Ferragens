import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Icon,
  Text,
  useToast,
  Flex,
  Radio,
  StackProps,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Button } from '../../components/button';
import { Field } from '../../components/field';
import { Heading } from '../../components/heading';
import { Input } from '../../components/input';
import { useAuthContext } from '../../contexts/auth';
import { useClientsContext } from '../../contexts/client';
import { useShoppingCartContext } from '../../contexts/shopping-cart';
import { IClient } from '../../core/client';
import { IProduct } from '../../core/product';
import { capitalize } from '../../utils/capitalize';
import { CNPJMask } from '../../utils/cnpj-mask';
import { CPFMask } from '../../utils/cpf-mask';
import { format } from '../../utils/format';
import { IClientData } from './clientes';

export interface RepresentativeData {
  client: IClient;
  representantive: IClientData;
  products: IProduct[];
  total: string;
  payment: string;
  conditions: string;
  term: string;
}

const DEFAULT_TERM = 'À vista';
export default function Representantes() {
  const toast = useToast();
  const user = useAuthContext();
  const shoppingcart = useShoppingCartContext();
  const { clients, addClient } = useClientsContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isForm, setIsForm] = useState(true);
  const [client, setClient] = useState<IClient>();
  const [term, setTerm] = useState(DEFAULT_TERM);
  const [payment, setPayment] = useState('Dinheiro');
  const [total, setTotal] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalForEachInstallment, setTotalForEachInstallment] = useState('');

  useEffect(() => {
    let total = shoppingcart.subtotal;
    if (discount) {
      const discountValue = shoppingcart.subtotal * (discount / 100);
      total -= discountValue;
    }
    setTotal(format(total));
  }, [discount, shoppingcart.subtotal]);

  useEffect(() => {
    if (!isDefaultTerm()) setDiscount(0);
    let numberOfInstallments = 0;
    for (const installments of term.split('/')) {
      if (installments) numberOfInstallments++;
    }
    let totalForEachInstallment = shoppingcart.subtotal;
    if (numberOfInstallments) {
      totalForEachInstallment /= numberOfInstallments;
    }
    const formatedValue = format(totalForEachInstallment);
    const formatedTotalForEachInstallment = isDefaultTerm()
      ? `${formatedValue} ${DEFAULT_TERM}`
      : `${numberOfInstallments}x de ${formatedValue}`;
    setTotalForEachInstallment(formatedTotalForEachInstallment);
  }, [term, shoppingcart.subtotal]);

  useEffect(() => {
    setIsForm(true);
  }, [isOpen]);

  function isDefaultTerm() {
    return term === DEFAULT_TERM;
  }

  function createToast(status: 'error' | 'success', description: string) {
    const title = status === 'error' ? 'Error' : 'Sucesso';
    toast({
      title,
      status,
      description,
      position: 'top-right',
      duration: 7_500,
      isClosable: true,
    });
  }

  async function handleSubmit() {
    let installment = totalForEachInstallment;
    if (isDefaultTerm() && !!discount) {
      installment = `${total} ${DEFAULT_TERM}`;
    }
    const representantive = {
      name: user.name,
      email: user.email,
    };
    const data: RepresentativeData = {
      products: shoppingcart.products,
      client,
      representantive,
      total: `Valor total: ${total}`,
      payment: `Forma de pagamento: ${payment}`,
      conditions: `Condições de pagamento: ${installment}`,
      term: `Prazo: ${isDefaultTerm() ? 'Hoje' : `${term} dias`}`,
    };
    const url = '/api/send-representantive-email';
    try {
      const response = await axios.post(url, data, {
        validateStatus: null,
      });
      const isError = response.status !== 200;
      createToast(isError ? 'error' : 'success', response.data);
    } catch (error) {
      console.log({ error: error.message });
    }
  }

  return (
    <Stack className="paddingX paddingY">
      <Form
        title="Emissão de pedido"
        callToAction="Emitir pedido"
        padding="0"
        onSubmit={handleSubmit}
        element={
          <>
            <Text fontSize="1.25rem" fontWeight="bold">
              {!term || isDefaultTerm()
                ? `${total} ${DEFAULT_TERM}`
                : totalForEachInstallment}
            </Text>
            {(!!discount || (!!term && !isDefaultTerm())) && (
              <Text fontSize="sm" fontWeight="bold">
                {discount
                  ? `com ${discount}% de desconto`
                  : `Valor total: ${total}`}
              </Text>
            )}
          </>
        }
      >
        <Field
          isReadOnly
          name="client"
          label="Cliente"
          value={client ? client.name : ''}
          onClick={onOpen}
        />
        <Field
          label="Forma de pagamento"
          name="payment"
          value={payment}
          onChange={(event) => {
            setPayment(event.currentTarget.value);
          }}
        >
          <Radio value="Dinheiro">Dinheiro</Radio>
          <Radio value="Cheque">Cheque</Radio>
          {shoppingcart.subtotal > 400 && (
            <Radio value="Boleto Bancário">Boleto Bancário</Radio>
          )}
          <Radio value="Pagamento por PIX">Pagamento por PIX</Radio>
          <Radio value="Transferência Bancária">Transferência Bancária</Radio>
          <Radio value="Outros">Outros</Radio>
        </Field>
        <Field
          name="term"
          label="Prazo"
          value={term}
          onChange={(event) => {
            const term = event.currentTarget.value.replace(/[^0-9\/]/g, '');
            setTerm(term);
          }}
          onFocus={(event) => {
            event.currentTarget.value = '';
          }}
          onBlur={(event) => {
            if (!event.currentTarget.value) {
              event.currentTarget.value = DEFAULT_TERM;
              setTerm(DEFAULT_TERM);
            }
          }}
        />
        {(!term || isDefaultTerm()) && (
          <Field
            name="discount"
            label="Desconto"
            isRequired={false}
            defaultValue={''}
            onChange={({ currentTarget }) => {
              const MAX_DISCOUNT = 100;
              let discount = Number(currentTarget.value.replace(/\D/g, ''));
              if (discount > MAX_DISCOUNT) {
                discount = MAX_DISCOUNT;
              }
              currentTarget.value = String(discount);
              setDiscount(discount);
            }}
            onBlur={({ currentTarget }) => {
              currentTarget.value = discount ? `${discount}%` : '';
            }}
            onFocus={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(/\D/g, '');
            }}
          />
        )}
      </Form>
      <InputModal isOpen={isOpen} onClose={onClose}>
        {isForm ? (
          <Form
            title="Cadastrar"
            callToAction="Cadastrar cliente"
            padding="2.25rem"
            onSubmit={(client: IClient) => {
              onClose();
              addClient(client);
              setClient(client);
            }}
            element={
              <Flex
                fontSize="md"
                fontWeight="700"
                color="primary"
                cursor="pointer"
                _hover={{
                  textDecoration: 'underline',
                }}
                onClick={() => {
                  setIsForm(false);
                }}
              >
                <Text marginRight="0.5rem">Ver clientes cadastrados</Text>
                <Icon as={MdArrowForward} transform="translateY(0.25rem)" />
              </Flex>
            }
          >
            <Field
              name="id"
              label="CPF / CNPJ"
              maxLength={18}
              onChange={({ currentTarget }) => {
                const CPF_LENGTH = 11;
                const value = currentTarget.value.replace(/\D/g, '');
                const isCNPJ = value.length > CPF_LENGTH;
                currentTarget.pattern = isCNPJ
                  ? '[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}'
                  : '[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}';
                currentTarget.value = isCNPJ ? CNPJMask(value) : CPFMask(value);
              }}
            />
            <Field
              name="name"
              label="Nome"
              onChange={({ currentTarget }) => {
                currentTarget.value = capitalize(currentTarget.value);
              }}
            />
            <Field
              name="email"
              type="email"
              label="E-mail"
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.toLowerCase();
              }}
            />
          </Form>
        ) : (
          <Search
            clients={clients}
            onClick={() => {
              setIsForm(!isForm);
            }}
            onSelect={(client) => {
              onClose();
              setClient(client);
            }}
          />
        )}
      </InputModal>
    </Stack>
  );
}

interface SearchProps {
  onClick: () => void;
  onSelect: (client: IClient) => void;
  clients: IClient[];
}

function Search({ onClick, onSelect, clients }: SearchProps) {
  const [value, setValue] = useState('');
  const [filteredClients, setfilteredClients] = useState(clients);

  function headleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  useEffect(() => {
    const clients = filterClients(value);
    setfilteredClients(clients);
  }, [value]);

  function filterClients(searchString: string) {
    const filteredClients = clients.filter((client) => {
      const name = client.name.toLowerCase();
      return name.includes(searchString.toLowerCase());
    });
    return filteredClients;
  }

  return (
    <Stack spacing="1rem">
      <Input prefix="Nome:" onChange={headleChange} value={value} />
      <Flex
        bg="white"
        flexDirection="column"
        paddingY="0.75rem"
        borderRadius="md"
      >
        {filteredClients.length !== 0 ? (
          filteredClients.map((client) => (
            <Text
              key={client.id}
              padding="0.75rem 1.5rem"
              fontSize="md"
              cursor="pointer"
              _hover={{ bg: 'gray.100' }}
              onClick={() => {
                onSelect(client);
              }}
            >
              {client.name}
            </Text>
          ))
        ) : (
          <Stack
            fontWeight="500"
            fontSize="md"
            padding="1.5rem 2.25rem"
            spacing="0.5rem"
            alignItems="center"
          >
            <Text
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="100%"
            >
              Nenhum resultado para "{value}"
            </Text>
            <Stack
              direction="row"
              alignItems="center"
              cursor="pointer"
              color="primary"
              onClick={onClick}
              _hover={{
                textDecoration: 'underline',
              }}
            >
              <Icon as={MdArrowBack} transform="translateY(0)" />
              <Text>Cadastrar cliente</Text>
            </Stack>
          </Stack>
        )}
      </Flex>
    </Stack>
  );
}

interface InputModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function InputModal({ children, isOpen, onClose }: InputModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" padding="1rem" boxShadow="none">
        <ModalBody padding="0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

interface Props extends StackProps {
  title: string;
  callToAction: string;
  children?: ReactNode;
  element?: ReactNode;
  onSubmit: (data: any) => void;
}

function Form({
  onSubmit,
  children,
  element,
  callToAction,
  title,
  ...rest
}: Props) {
  const stackInputRef = useRef<HTMLDivElement>();

  function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();
    const inputs = Array.from(
      stackInputRef.current.childNodes
    ) as HTMLInputElement[];
    const data = getInputsData(inputs);
    onSubmit(data);
  }

  function getInputsData(inputs: HTMLInputElement[]) {
    const data: any = {};
    for (const input of inputs) {
      const name = input.getAttribute('name');
      const value = input.getAttribute('value');
      data[name] = value;
    }
    return data;
  }

  return (
    <Stack
      as="form"
      bg="white"
      maxWidth="25rem"
      paddingY="2.25rem"
      paddingX={['1.5rem', '2.25rem']}
      spacing="2.25rem"
      borderRadius="md"
      onSubmit={handleSubmit}
      {...rest}
    >
      <Heading padding="0" whiteSpace="nowrap">
        {title}
      </Heading>
      <Stack spacing="1.5rem" ref={stackInputRef}>
        {children}
      </Stack>
      <Stack spacing="0.5rem" alignItems="center">
        {element}
      </Stack>
      <Button type="submit" padding="0.75rem 1rem" fontSize="md">
        {callToAction}
      </Button>
    </Stack>
  );
}