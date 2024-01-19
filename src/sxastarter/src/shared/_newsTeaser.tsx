import { Stack, Badge, Heading, Text, Box, Image } from '@chakra-ui/react';

interface NewsTeaserProps {
  image: string;
  title: string;
  abstract: string;
  publicationDate: string;
  tag: string;
}
export const SharedNewsTeaser = (props: NewsTeaserProps) => {
  const mappedPublicationDate = new Date(props?.publicationDate);
  return (
    <Box w={'full'} bg={'gray.100'} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
      <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
        <Image src={props?.image ?? ''} />
      </Box>
      <Stack>
        <Badge variant={'brandText'} pb={4}>
          {props?.tag}
        </Badge>
        <Text fontWeight={'extrabold'}>{mappedPublicationDate?.toLocaleDateString()}</Text>
        <Heading pb={4} pt={2} color={'BrandedTextColor.900'} fontSize={'3xl'} fontFamily={'body'}>
          {props?.title}
        </Heading>

        <Text align={'justify'} color={'gray.500'}>
          {props.abstract}
        </Text>
      </Stack>
    </Box>
  );
};
