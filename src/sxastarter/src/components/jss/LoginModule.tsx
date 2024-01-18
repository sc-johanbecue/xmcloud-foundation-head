import React, { useEffect, useState } from 'react';
import {
  Text,
  Field,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Input,
  Button,
  Container,
  Stack,
  Heading,
  HStack,
  FormLabel,
  FormControl,
  Checkbox,
  Box,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { Me, MeUser, Tokens } from 'ordercloud-javascript-sdk';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Login } from 'src/services/GlobalAuthenticationService';
import { BsGithub } from 'react-icons/bs';
import { IoMdShare } from 'react-icons/io';

import {
  signIn,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
  getSession,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { CONTENTHUB_TOKEN_COOKIE_KEY } from 'src/services/ContentHub/Constants';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

interface Fields {
  Title: Field<string>;
  RedirectItem: {
    url: string;
  };
}

type LoginProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LoginDefaultComponent = (props: LoginProps): JSX.Element => (
  <div className={`component loginModule ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Login Module</span>
    </div>
  </div>
);

export const Default = (props: LoginProps): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonInteraction, setIsButtonInteraction] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useNextAuth, setUseNextAuth] = useState(true);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [me, setMe] = useState<MeUser>();
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { sitecoreContext } = useSitecoreContext();
  const toast = useToast();
  const [savedProviders, setSavedProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const { data: session, update } = useSession();

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await Me.Get();
      if ((tmpMe?.ID ?? 'default-anonymous-shopper') != 'default-anonymous-shopper') {
        setMe(tmpMe);
      }
      setIsLoading(false);
    }
    async function GetProviders() {
      const providers = await getProviders();
      if (providers) {
        setSavedProviders(providers);
      }
    }
    GetMe();
    GetProviders();

    if (session?.user?.OCToken) {
      Tokens.SetAccessToken(session?.user?.OCToken);
    }
    if (session?.user?.OCRefreshToken) {
      Tokens.SetRefreshToken(session?.user?.OCRefreshToken);
    }

    if (session?.user?.CHubToken) {
      const cookies = new Cookies();
      cookies.set(CONTENTHUB_TOKEN_COOKIE_KEY, session?.user?.CHubToken, { path: '/' });
    }
  }, [session]);

  const handleSubmit = async () => {
    setIsButtonInteraction(true);
    if (useNextAuth) {
      await signIn('credentials', {
        email: username,
        password: password,
        redirect: false,
        callbackUrl: props.fields?.RedirectItem?.url ?? '',
      });

      setTimeout(async () => {
        await update({ dummy: 'Test' });
        const session = await getSession();
        setIsButtonInteraction(false);
        if (!session) {
          toast({
            title: 'Login failed',
            description: 'Please try again with a valid combination of username and password',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }, 2000);
    } else {
      await Login(username, password, rememberMe).catch((error) => {
        if (error.isOrderCloudError) {
          toast({
            title: 'Login failed',
            description: error.errors.Errors[0].Message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          setIsButtonInteraction(false);
          return;
        }
      });

      if (props.fields?.RedirectItem?.url) {
        router.push(props.fields?.RedirectItem?.url);
      } else {
        router.reload();
      }
      setIsButtonInteraction(false);
    }
  };

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component loginModule ${props.params.styles}`} id={id ? id : undefined}>
        {isLoading ? (
          // <Center>
          // <Spinner variant={'brandPrimary'} />
          // </Center>
          <></>
        ) : /* TODO Add condition when user is logged in with CHUB */
        sitecoreContext.pageState == LayoutServicePageState.Edit || (!me && !session) ? (
          <Container mt={6}>
            <Stack spacing="8">
              <Stack spacing="6">
                {/* <Logo /> */}
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                  <Heading size={{ base: 'sm', md: 'lg' }}>Log in to your account</Heading>
                  <HStack spacing="1" justify="center">
                    <Text color="muted">Don&apos;t have an account?</Text>
                    <Button colorScheme={'brand'} variant="link">
                      Sign up
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg-surface' }}
                boxShadow={{ base: 'none', sm: 'md-dark' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
              >
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        id="email"
                        type="email"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <InputRightElement>
                          <IconButton
                            variant="link"
                            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                            icon={isOpen ? <HiEyeOff /> : <HiEye />}
                            onClick={onClickReveal}
                          />
                        </InputRightElement>
                        <Input
                          id="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmit();
                            }
                          }}
                          name="password"
                          type={isOpen ? 'text' : 'password'}
                          autoComplete="current-password"
                          required
                          {...props}
                        />
                      </InputGroup>
                    </FormControl>
                  </Stack>
                  <HStack justify="space-between">
                    <Checkbox
                      isChecked={rememberMe}
                      onChange={() => {
                        setRememberMe(!rememberMe);
                      }}
                      colorScheme={'brand'}
                    >
                      Remember me
                    </Checkbox>
                    <Button variant="link" colorScheme="brand" size="sm">
                      Forgot password?
                    </Button>
                  </HStack>
                  <HStack>
                    <Checkbox
                      isChecked={useNextAuth}
                      onChange={() => {
                        setUseNextAuth(!useNextAuth);
                      }}
                      colorScheme={'brand'}
                    >
                      Use Next.Auth
                    </Checkbox>
                  </HStack>
                  <Stack spacing="6">
                    <Button
                      onClick={handleSubmit}
                      isLoading={isButtonInteraction}
                      loadingText={'Logging in...'}
                      colorScheme={'brand'}
                    >
                      Login
                    </Button>
                  </Stack>
                  <Flex
                    align={'center'}
                    _before={{
                      content: '""',
                      borderBottom: '1px solid',
                      borderColor: 'gray.200',
                      flexGrow: 1,
                      mr: 8,
                    }}
                    _after={{
                      content: '""',
                      borderBottom: '1px solid',
                      borderColor: 'gray.200',
                      flexGrow: 1,
                      ml: 8,
                    }}
                  >
                    or
                  </Flex>
                  {savedProviders &&
                    Object.values(savedProviders).map((provider: any) => {
                      if (provider.name !== 'Credentials') {
                        return (
                          <div key={provider.name} style={{ marginBottom: 0 }}>
                            <Button
                              width={'full'}
                              onClick={() => signIn(provider.id)}
                              leftIcon={provider.name == 'GitHub' ? <BsGithub /> : <IoMdShare />}
                            >
                              Sign in with {provider.name}
                            </Button>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </Stack>
              </Box>
            </Stack>
          </Container>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return <LoginDefaultComponent {...props} />;
};
