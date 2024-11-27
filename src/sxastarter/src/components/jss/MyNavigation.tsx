import {
  ButtonGroup,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerContent,
  HStack,
  Icon,
  IconButton,
  IconButtonProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SkeletonText,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import { PageItem } from 'src/services/XMCloud/ItemService';
import { FiChevronDown } from 'react-icons/fi';
import NextLink from 'next/link';
import { SlMenu } from 'react-icons/sl';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useNavigation } from 'src/hooks/useNavigation';

interface Fields {
  Root: {
    id: string;
  };
}

type MyNavigationProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: MyNavigationProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const { data: session } = useSession();
  const navitgationModel = useNavigation(
    props?.fields?.Root?.id ?? '',
    sitecoreContext.language ?? ''
  );

  return (
    <div
      className={`component myNavigation ${props.params.styles}`}
      id={props.params.RenderingIdentifier ? props.params.RenderingIdentifier : undefined}
    >
      <HStack justify="space-between" spacing="8" width={'100%'}>
        <HStack spacing="10" width={'100%'}>
          <HStack spacing="3" pt={{ base: 7, sm: 3, md: 3, lg: 7, xl: 7 }}>
            <MobileDrawer root={navitgationModel} session={session} />
          </HStack>
          <ButtonGroup
            size="xl"
            variant="text"
            colorScheme="gray"
            spacing="20"
            width={'100%'}
            mr={4}
            display={{ base: 'none', lg: 'flex' }}
          >
            {[...Array(!navitgationModel ? 5 : 0).keys()].map((element) => {
              return (
                <SkeletonText
                  visibility={navitgationModel ? 'hidden' : 'visible'}
                  isLoaded={navitgationModel != undefined}
                  display={'inline-block'}
                  key={element}
                  noOfLines={1}
                  spacing="1"
                  skeletonHeight="6"
                  width={'15%'}
                />
              );
            })}

            {navitgationModel?.children?.map((element, key) => {
              if ((element?.children?.length ?? 0) == 0) {
                return (
                  <Text key={key} mx={3} fontSize={'large'} fontWeight={'bold'}>
                    <NextLink href={element?.url ?? ''} passHref>
                      {/* <Button mx={3} fontSize={'large'}> */}

                      {element?.NavigationName}

                      {/* </Button> */}
                    </NextLink>
                  </Text>
                );
              } else {
                return <MenuPopover key={key} root={element} session={session} />;
              }
            })}
          </ButtonGroup>
        </HStack>
      </HStack>
    </div>
  );
};

interface MenuPopoverProps {
  root: PageItem | undefined;
  session: Session | null;
}

const MobileDrawer = ({ root, session }: MenuPopoverProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  if (root == undefined) {
    return <></>;
  }
  return (
    <>
      <ToggleButton
        p={0.5}
        isOpen={isOpen}
        onClick={onToggle}
        aria-label="Open menu"
        display={{ base: 'inline-flex', lg: 'none' }}
      />
      <Drawer placement="top" isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerBody p={6}>
            <Stack spacing="1">
              {root?.children?.map((element, key) => {
                if ((element?.children?.length ?? 0) == 0) {
                  return (
                    <Text key={key} justifyContent="start">
                      <NextLink key={key} href={element?.url ?? ''} passHref>
                        {element?.NavigationName}
                      </NextLink>
                    </Text>
                  );
                } else {
                  return <MenuCollapse key={key} root={element} session={session} />;
                }
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MenuPopover = ({ root }: MenuPopoverProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger="click"
      matchWidth={false}
      openDelay={0}
      id={root?.NavigationName}
    >
      <PopoverTrigger>
        <Text
          mx={3}
          fontWeight={'bold'}
          fontSize={'large'}
          aria-label={root?.NavigationName}
          id={root?.NavigationName}
          // as="a"
        >
          {root?.NavigationName} <PopoverIcon isOpen={isOpen} />
        </Text>
      </PopoverTrigger>
      <PopoverContent id={root?.NavigationName} p="4" width="500px">
        <Stack spacing="0" alignItems="stretch">
          <Text justifyContent="start" pb={4} fontSize={'x-large'} fontWeight={'bold'}>
            <NextLink href={root?.url ?? ''} passHref>
              {root?.NavigationName}
            </NextLink>
          </Text>
          {root?.children?.map((item, key) => {
            return (
              <Text
                key={key}
                pl={6}
                justifyContent="start"
                pb={4}
                fontSize={'large'}
                fontWeight={'bold'}
              >
                <NextLink href={item?.url ?? ''} passHref>
                  {item?.NavigationName}
                </NextLink>
              </Text>
            );
          })}
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

const MenuCollapse = ({ root }: MenuPopoverProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Text justifyContent="space-between" variant="tertiary" size="lg" onClick={onToggle}>
        <Text as="span">{root?.NavigationName}</Text>
        <PopoverIcon isOpen={isOpen} />
      </Text>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="4">
          <Text size="xl" justifyContent="start">
            <NextLink href={root?.url ?? ''} passHref>
              {root?.NavigationName}
            </NextLink>
          </Text>
          {root?.children?.map((item, key) => {
            return (
              <Text key={key} pl={6} size="lg" justifyContent="start">
                <NextLink href={item?.url ?? ''} passHref>
                  {item?.NavigationName}
                </NextLink>
              </Text>
            );
          })}
        </Stack>
      </Collapse>
    </>
  );
};

const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { ...iconButtonProps } = props;
  return (
    <IconButton
      mt={1}
      variant="unstyled"
      display="inline-flex"
      size="xl"
      fontWeight={'bold'}
      fontSize={'xl'}
      pt={0}
      icon={<SlMenu size={24} />}
      {...iconButtonProps}
    />
  );
};
