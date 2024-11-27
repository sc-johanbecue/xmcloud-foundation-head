import { Stack, Heading, Text, Box, Tag } from '@chakra-ui/react';
import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';

interface NewsTeaserProps {
  image: string;
  title: string;
  abstract: string;
  publicationDate: string;
  tag: string;
}
export const SharedNewsTeaser = (props: NewsTeaserProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const mappedPublicationDate = new Date(props?.publicationDate);
  return (
    <Box height={'full'} w={'full'} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
      <Box
        mt={-6}
        mx={-6}
        mb={6}
        pos={'relative'}
        height={{ base: 250, sm: 250, md: 200, lg: 213 }}
      >
        {sitecoreContext.pageState == LayoutServicePageState.Normal ? (
          <Image
            sizes="50vw"
            quality={90}
            fill={true}
            alt={props?.title ?? ''}
            src={props?.image ?? ''}
          />
        ) : (
          <img sizes="50vw" alt={props?.title ?? ''} src={props?.image ?? ''} />
        )}
      </Box>
      <Stack>
        {props?.tag ? (
          <Tag colorScheme="brand" pb={4}>
            {props?.tag}
          </Tag>
        ) : (
          <></>
        )}

        <Text fontWeight={'extrabold'}>{mappedPublicationDate?.toLocaleDateString()}</Text>
        <Heading pb={4} pt={2} fontSize={'3xl'} fontFamily={'body'}>
          {props?.title}
        </Heading>

        <Text align={'justify'} noOfLines={[2, 5]}>
          {props.abstract}
        </Text>
      </Stack>
    </Box>
  );
};
