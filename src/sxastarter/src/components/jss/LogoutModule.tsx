import React, { useEffect, useState } from 'react';
import {
  Field,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Container, Stack, Heading, Box } from '@chakra-ui/react';
import { Logout } from 'src/services/GlobalAuthenticationService';
import { Me, MeUser } from 'ordercloud-javascript-sdk';
import Router from 'next/router';
import { useSession, signOut } from 'next-auth/react';

interface Fields {
  Title: Field<string>;
}

type LogoutProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LogoutDefaultComponent = (props: LogoutProps): JSX.Element => (
  <div className={`component loginModule ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Logout Module</span>
    </div>
  </div>
);

export const Default = (props: LogoutProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonInteraction, setIsButtonInteraction] = useState(false);
  const [me, setMe] = useState<MeUser>();
  const { sitecoreContext } = useSitecoreContext();

  const { data: session } = useSession();

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await Me.Get();
      if ((tmpMe?.ID ?? 'default-anonymous-shopper') != 'default-anonymous-shopper') {
        setMe(tmpMe);
      }
      setIsLoading(false);
    }

    if (sitecoreContext.pageState != LayoutServicePageState.Edit) {
      GetMe();
    }
  }, [session, sitecoreContext.pageState]);

  const handleLogout = async () => {
    setIsButtonInteraction(true);
    await Logout().catch();
    if (session) {
      await signOut();
    }

    // setMe(undefined);
    Router.reload();
    //setIsLoading(false);
  };

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component loginModule ${props.params.styles}`} id={id ? id : undefined}>
        {sitecoreContext.pageState != LayoutServicePageState.Edit && isLoading ? (
          // <Center>
          // <Spinner variant={'brandPrimary'} />
          // </Center>
          <></>
        ) : /* TODO Add condition when user is logged in with CHUB */
        sitecoreContext.pageState == LayoutServicePageState.Edit || me || session ? (
          <Container mt={6}>
            <Stack spacing="8">
              <Stack spacing="6">
                {/* <Logo /> */}
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                  <Heading size={{ base: 'sm', md: 'lg' }}>
                    {session?.user?.name ?? me?.FirstName} logout from your Account
                  </Heading>
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
                  <Stack spacing="6">
                    <Button
                      onClick={handleLogout}
                      isLoading={isButtonInteraction}
                      loadingText={'Logging out...'}
                      variant="outline"
                      colorScheme={'brand'}
                    >
                      Logout
                    </Button>
                  </Stack>
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

  return <LogoutDefaultComponent {...props} />;
};
