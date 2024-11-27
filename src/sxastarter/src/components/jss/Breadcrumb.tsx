import React from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, SkeletonText } from '@chakra-ui/react';
import { useBreadcrumb } from 'src/hooks/useBreadcrumb';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type BreadcrumbProps = {
  params: { [key: string]: string };
};

export const Default = (props: BreadcrumbProps): JSX.Element => {
  const { isLoading, breadcrumb } = useBreadcrumb();
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();

  if (sitecoreContext.pageEditing) {
    <Breadcrumb
      fontSize={{ base: 'medium', sm: 'small', md: 'medium', lg: 'large' }}
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Root</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/">Branch</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage={true}>
        <BreadcrumbLink href="/">Leaf</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>;
  }

  if ((breadcrumb?.length ?? 0) <= 1) {
    return <> </>;
  }
  return (
    <Box pt={4} className={`component breadcrumb ${props.params.styles}`} id={id ? id : undefined}>
      {[...Array(isLoading ? 4 : 0).keys()].map((element) => {
        return (
          <>
            <SkeletonText
              visibility={isLoading ? 'visible' : 'visible'}
              display={'inline-block'}
              key={element}
              noOfLines={1}
              spacing="3"
              pr={2}
              pl={1}
              skeletonHeight="6"
              width={'15%'}
            />
            {element != 3 ? <ChevronRightIcon color="gray.500" /> : <></>}
          </>
        );
      })}
      {!isLoading ? (
        <Breadcrumb
          fontSize={{ base: 'medium', sm: 'small', md: 'medium', lg: 'large' }}
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          {breadcrumb?.map((element, key) => {
            return (
              <BreadcrumbItem key={key} isCurrentPage={window.location.pathname == element.url}>
                <BreadcrumbLink href={element.url}>{element.title}</BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      ) : (
        <></>
      )}
    </Box>
  );
};
