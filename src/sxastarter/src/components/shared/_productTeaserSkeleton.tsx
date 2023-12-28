import { SkeletonText, Divider, Box } from '@chakra-ui/react';

interface WishlistSkeletonProps {
  numberElements: number;
}
export const ProductTeaserSkeleton = ({ numberElements }: WishlistSkeletonProps): JSX.Element => {
  const array = new Array(numberElements).fill(0);
  return (
    <>
      {array.map(() => {
        return (
          <>
            <Box className="row" marginBottom={4}>
              <Box className="col-md-3" position="relative">
                <SkeletonText
                  noOfLines={1}
                  spacing="1"
                  skeletonHeight="40"
                  isLoaded={false}
                  fadeDuration={2}
                />
              </Box>
              <Box className="col-md-8" marginTop="4">
                <SkeletonText
                  noOfLines={1}
                  spacing="1"
                  skeletonHeight="10 "
                  isLoaded={false}
                  fadeDuration={2}
                />
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="10"
                  isLoaded={false}
                  fadeDuration={2}
                />
              </Box>
              <Box className={'col-md-1'}>
                {' '}
                <SkeletonText
                  mt="4"
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="10"
                  isLoaded={false}
                  fadeDuration={2}
                />
              </Box>
            </Box>
            <Divider variant={'brandPrimary'} />
          </>
        );
      })}
    </>
  );
};
