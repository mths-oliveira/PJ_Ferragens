import {
  ModalBody,
  ModalContent,
  ModalOverlay,
  Modal,
  Stack,
  Box,
  Input,
  Flex,
  Heading,
  Text,
  Link,
  Avatar,
  useToast,
  CircularProgress,
  InputProps,
} from '@chakra-ui/react';
import { FormEvent, LegacyRef, useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/auth';
import { useFormModalContext } from '../../contexts/form-modal';
import { capitalize } from '../../utils/capitalize';
import { Button } from '../button';

type AsyncFn = (...args: any[]) => Promise<any>;

interface Props extends InputProps {
  label: string;
  name: string;
  inputRef?: LegacyRef<HTMLInputElement>;
}

function Field({ inputRef, label, ...rest }: Props) {
  return (
    <Stack>
      <Heading fontWeight="500" fontSize="1.25rem" as="h4">
        {label}
      </Heading>
      <Input
        isRequired
        ref={inputRef}
        border="none"
        fontSize="sm"
        size="lg"
        bg="gray.100"
        _focus={{
          boxShadow: '0 0 0 2px rgba(0,0,255,0.5)',
        }}
        {...rest}
      />
    </Stack>
  );
}

export function FormModal() {
  const toast = useToast();
  const user = useAuthContext();
  const [inputRefs, setInputRefs] = useState<HTMLInputElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { isOpen, onClose } = useFormModalContext();

  function handleRefs(ref: HTMLInputElement) {
    if (!ref) return;
    const haveInput = inputRefs.find((inputRef) => {
      return ref.name === inputRef.name;
    });
    if (haveInput) return;
    setInputRefs([...inputRefs, ref]);
  }

  useEffect(() => {
    setInputRefs([]);
  }, [isOpen, isLogin, isLoading]);

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();
    const handler = isLogin ? user.auth.signIn : user.auth.signUp;
    const data = getInputsData(inputRefs);
    handleLoading(handler)(data);
  }

  function getInputsData<T = any>(inputs: HTMLInputElement[]) {
    const data = {} as T;
    for (const input of inputs) {
      data[input.name] = input.value;
    }
    return data;
  }

  function handleLoading(fn: AsyncFn) {
    return async (...args: any[]) => {
      setIsLoading(true);
      try {
        await fn(...args);
      } catch (error) {
        createToast(error.message);
      }
      setIsLoading(false);
    };
  }

  function createToast(description: string) {
    toast({
      title: 'Error',
      status: 'error',
      description,
      position: 'top-right',
      duration: 7_500,
      isClosable: true,
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" size="sm">
      <ModalOverlay />
      <ModalContent padding="0" bg="transparent">
        <ModalBody
          padding="2.25rem"
          borderRadius="md"
          marginX="0.5rem"
          bg="white"
        >
          {user.auth.isAuthenticated ? (
            <Flex flexDirection="column" alignItems="center">
              <Avatar
                name={user.name}
                size="xl"
                color="gray.500"
                bg="white"
                boxShadow="lg"
              />
              <Box textAlign="center" fontWeight="500" marginTop="1rem">
                <Text fontSize="1.25rem">{user.name}</Text>
                <Text fontSize="md" color="blue.600" textDecoration="underline">
                  {user.email}
                </Text>
              </Box>
              <Button
                fontSize="1.25rem"
                padding="0.75rem 1rem"
                width="100%"
                marginTop="2rem"
                onClick={async () => {
                  await user.auth.signOut();
                }}
              >
                Sair
              </Button>
            </Flex>
          ) : (
            <Stack as="form" spacing="2.25rem" onSubmit={handleSubmit}>
              <Heading as="h3" fontSize="lg">
                {isLogin ? 'Entrar' : 'Registre-se'}
              </Heading>
              <Stack spacing="1.25rem">
                {!isLogin && (
                  <Field
                    label="Nome"
                    name="name"
                    minLength={2}
                    inputRef={handleRefs}
                    onChange={({ currentTarget }) => {
                      currentTarget.value = capitalize(currentTarget.value);
                    }}
                  />
                )}
                <Field
                  label="E-mail"
                  type="email"
                  name="email"
                  inputRef={handleRefs}
                  onChange={({ currentTarget }) => {
                    currentTarget.value = currentTarget.value.toLowerCase();
                  }}
                />
                <Field
                  label="Senha"
                  name="password"
                  type="password"
                  minLength={6}
                  inputRef={handleRefs}
                />
                {!isLogin && (
                  <Field
                    label="Código de segurança"
                    name="code"
                    type="password"
                    inputRef={handleRefs}
                  />
                )}
              </Stack>
              <Stack
                direction="row"
                fontWeight="bold"
                fontSize="sm"
                justifyContent="center"
              >
                <Text>
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                </Text>
                <Link
                  color="primary"
                  onClick={() => {
                    setIsLogin(!isLogin);
                  }}
                >
                  {isLogin ? 'Registre-se' : 'Entrar'}
                </Link>
              </Stack>
              <Button fontSize="1.25rem" padding="0.75rem 1rem" type="submit">
                {isLoading ? (
                  <CircularProgress
                    isIndeterminate
                    trackColor="transparent"
                    thickness="0.75rem"
                    color="white"
                    size="2.25rem"
                  />
                ) : isLogin ? (
                  'Entrar'
                ) : (
                  'Cadastrar-se'
                )}
              </Button>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
