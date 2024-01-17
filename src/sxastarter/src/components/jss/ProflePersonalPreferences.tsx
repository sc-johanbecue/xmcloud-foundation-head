import React, { ChangeEvent, useEffect, useState } from 'react';
import { Text as JSSText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  ComposedMe,
  GetComposedMe,
  UpdatePersonalPreferences,
} from 'src/services/Ordercloud/AccountService';
import { Box, Heading, Stack, Text, Switch, StackDivider, SkeletonText } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { SetTokensBySession } from 'src/services/ContentHub/AuthenticationService';
import { BrandedBox } from 'src/shared/_brandedBox';

interface Fields {
  Title: Field<string>;
}

type ProfilePersonalPreferencesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProfilePersonalPreferencesDefaultComponent = (
  props: ProfilePersonalPreferencesProps
): JSX.Element => (
  <div className={`component loginModule ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Profile Personal Preferences Module</span>
    </div>
  </div>
);

export const Default = (props: ProfilePersonalPreferencesProps): JSX.Element => {
  const [me, setMe] = useState<ComposedMe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postPreference, setPostPreference] = useState<boolean>(false);
  const [emailPreference, setEmailPreference] = useState<boolean>(false);
  const [browserPreference, setBrowserPreference] = useState<boolean>(false);
  const [textMessagePreference, setTextMessagePreference] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await GetComposedMe();
      if (tmpMe && !(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
        if (tmpMe.Profile.xp?.PersonalPreferences) {
          setPostPreference(tmpMe.Profile.xp?.PersonalPreferences.Post);
          setEmailPreference(tmpMe.Profile.xp?.PersonalPreferences.Email);
          setBrowserPreference(tmpMe.Profile.xp?.PersonalPreferences.Browser);
          setTextMessagePreference(tmpMe.Profile.xp?.PersonalPreferences.TextMessage);
        }
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    GetMe();
    if (session) {
      SetTokensBySession(session);
    }
  }, [session]);

  async function onSwitchChanged(event: ChangeEvent<HTMLInputElement>, switchName: string) {
    const checked = event.target.checked;
    switch (switchName) {
      case 'Post':
        setPostPreference(checked);
        await UpdatePersonalPreferences(
          browserPreference,
          emailPreference,
          checked,
          textMessagePreference
        );
        break;
      case 'Email':
        setEmailPreference(checked);
        await UpdatePersonalPreferences(
          browserPreference,
          checked,
          postPreference,
          textMessagePreference
        );
        break;
      case 'TextMessage':
        setTextMessagePreference(checked);
        await UpdatePersonalPreferences(
          browserPreference,
          emailPreference,
          postPreference,
          checked
        );
        break;
      case 'Browser':
        setBrowserPreference(checked);
        await UpdatePersonalPreferences(
          checked,
          emailPreference,
          postPreference,
          textMessagePreference
        );
        break;
      default:
        break;
    }
  }

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
        <BrandedBox>
          {isLoading ? (
            <>
              <SkeletonText
                noOfLines={1}
                spacing="1"
                skeletonHeight="14"
                isLoaded={!isLoading}
                fadeDuration={2}
                mb={4}
              />
              <SkeletonText
                noOfLines={1}
                spacing="1"
                skeletonHeight="28"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
              <SkeletonText
                noOfLines={1}
                spacing="1"
                mt={2}
                skeletonHeight="28"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
              <SkeletonText
                noOfLines={1}
                spacing="1"
                mt={2}
                skeletonHeight="28"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
              <SkeletonText
                noOfLines={1}
                spacing="1"
                mt={2}
                skeletonHeight="28"
                isLoaded={!isLoading}
                fadeDuration={2}
              />
            </>
          ) : (me?.isAnon ?? true) && !session ? (
            <div className="profileModule-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Please login to see your Personal Preferences
              </Heading>
            </div>
          ) : session && !session?.user?.OCToken ? (
            <div className="profileModule-content">
              <Heading size={{ base: 'sm', md: 'lg' }}>
                Personal Preferences not available with social login
              </Heading>
            </div>
          ) : (
            <>
              <Heading>
                <JSSText as={'h1'} field={props.fields.Title} />
              </Heading>
              <Box
                mt={6}
                bg="bg-surface"
                boxShadow="sm"
                borderRadius="lg"
                p={{ base: '4', md: '6' }}
              >
                <Stack spacing="5" divider={<StackDivider />}>
                  <Stack justify="space-between" direction="row" spacing="4">
                    <Stack spacing="0.5" fontSize="2xl">
                      <Text color="emphasized" fontWeight="medium">
                        Email
                      </Text>
                      <Text color="muted">Receive email updates</Text>
                    </Stack>
                    <Switch
                      colorScheme={'brand'}
                      size={'lg'}
                      defaultChecked={emailPreference}
                      onChange={(e) => onSwitchChanged(e, 'Email')}
                      checked={emailPreference}
                    />
                  </Stack>
                  <Stack justify="space-between" direction="row" spacing="4">
                    <Stack spacing="0.5" fontSize="2xl">
                      <Text color="emphasized" fontWeight="medium">
                        Text Messages
                      </Text>
                      <Text color="muted">Receive updates by SMS</Text>
                    </Stack>
                    <Switch
                      colorScheme={'brand'}
                      size={'lg'}
                      defaultChecked={textMessagePreference}
                      onChange={(e) => onSwitchChanged(e, 'TextMessage')}
                      checked={textMessagePreference}
                    />
                  </Stack>
                  <Stack justify="space-between" direction="row" spacing="4">
                    <Stack spacing="0.5" fontSize="2xl">
                      <Text color="emphasized" fontWeight="medium">
                        Post
                      </Text>
                      <Text color="muted">Receive updates by post</Text>
                    </Stack>
                    <Switch
                      colorScheme={'brand'}
                      size={'lg'}
                      defaultChecked={postPreference}
                      onChange={(e) => onSwitchChanged(e, 'Post')}
                      checked={postPreference}
                    />
                  </Stack>
                  <Stack justify="space-between" direction="row" spacing="4">
                    <Stack spacing="0.5" fontSize="2xl">
                      <Text color="emphasized" fontWeight="medium">
                        Browser
                      </Text>
                      <Text color="muted">We&apos;ll send via our desktop or mobile app</Text>
                    </Stack>
                    <Switch
                      colorScheme={'brand'}
                      size={'lg'}
                      defaultChecked={browserPreference}
                      onChange={(e) => onSwitchChanged(e, 'Browser')}
                      checked={browserPreference}
                    />
                  </Stack>
                </Stack>
              </Box>
            </>
          )}
        </BrandedBox>
      </div>
    );
  }

  return <ProfilePersonalPreferencesDefaultComponent {...props} />;
};
