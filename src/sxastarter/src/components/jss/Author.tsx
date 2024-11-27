import React from 'react';
import {
  RichText as JSSRichText,
  ImageField,
  Field,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Text,
  Box,
  Avatar,
  HStack,
  Icon,
  Stack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

interface Author {
  Image: ImageField;
  Title: Field<string>;
  Name: Field<string>;
  ShortDescription: Field<string>;
  LongDescription: Field<string>;
  GitHub: Field<string>;
  X: Field<string>;
  LinkedIn: Field<string>;
}

interface Fields {
  data: {
    datasource: {
      fields: Author;
    };
    contextItem: {
      Author: {
        jsonValue: {
          fields: Author;
        };
      };
    };
  };
}

type AuthorProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AuthorDefaultComponent = (props: AuthorProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Author</span>
    </div>
  </div>
);

export const Default = (props: AuthorProps): JSX.Element => {
  const textColor = useColorModeValue('brand.600', 'brand.400');
  const imageUrl =
    props?.fields?.data?.datasource?.fields?.Image?.value?.src ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.Image?.value?.src ??
    '';
  const name =
    props?.fields?.data?.datasource?.fields?.Name ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.Name ??
    '';
  const title =
    props?.fields?.data?.datasource?.fields?.Title ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.Title ??
    '';
  const shortDescription =
    props?.fields?.data?.datasource?.fields?.ShortDescription ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.ShortDescription ??
    '';
  const gitHub =
    props?.fields?.data?.datasource?.fields?.GitHub?.value ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.GitHub?.value ??
    '';
  const x =
    props?.fields?.data?.datasource?.fields?.X?.value ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.X?.value ??
    '';
  const linkedIn =
    props?.fields?.data?.datasource?.fields?.LinkedIn?.value ??
    props?.fields?.data?.contextItem?.Author?.jsonValue?.fields?.LinkedIn?.value ??
    '';
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component author ${props.params.styles}`} id={id ? id : undefined}>
        <Box width={'full'} bg="bg.surface" px={6} py={1} boxShadow="sm" borderRadius="md">
          <Stack width={'full'} spacing="4" align="center" textAlign="center">
            <Stack width={'full'}>
              <Stack width={'full'} spacing={{ base: '4', md: '5' }} align="center">
                <Heading textAlign={'left'}>About the Author:</Heading>
                <Avatar name={name?.value} src={imageUrl} boxSize={{ base: '260', md: 'full' }} />
                <Box>
                  <Text fontWeight="medium" fontSize="3xl">
                    <JSSText field={name} />
                  </Text>
                  <Text fontSize="xl" color={textColor}>
                    <JSSText field={title} />
                  </Text>
                </Box>
              </Stack>
              <Text color="fg.muted" textAlign={'justify'}>
                <JSSRichText field={shortDescription} />
              </Text>
            </Stack>
            <HStack spacing="12" color="fg.subtle">
              {gitHub ?? (
                <Link href={gitHub}>
                  <Icon as={FaGithub} boxSize="12" name="Github" />
                </Link>
              )}
              {linkedIn && (
                <Link href={linkedIn}>
                  <Icon as={FaLinkedin} boxSize="12" name="LinkedIn" />
                </Link>
              )}
              {x && (
                <Link href={x}>
                  <Icon as={FaTwitter} boxSize="12" name="X" />
                </Link>
              )}
            </HStack>
          </Stack>
        </Box>
      </div>
    );
  }

  return <AuthorDefaultComponent {...props} />;
};
