import {
  Heading,
  Box,
  Text,
  Image,
  Input,
  Select,
  Icon,
  InputGroup,
  InputRightElement,
  Link,
  Badge,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { MdOutlineTextFields } from 'react-icons/md';
import { SharedNewsTeaser } from 'src/shared/_newsTeaser';

interface News {
  title: {
    jsonValue: {
      value: string;
    };
  };
  content: {
    jsonValue: {
      value: string;
    };
  };
  abstract: {
    jsonValue: {
      value: string;
    };
  };
  publicationDate: {
    jsonValue: {
      value: string;
    };
  };
  tag: {
    jsonValue: {
      fields: {
        Title: {
          value: string;
        };
      };
    };
  };
  image: {
    jsonValue: {
      value: {
        src: string;
        alt: string;
      };
    };
  };
  url: {
    path: string;
  };
  template: {
    name: string;
  };
}

interface Fields {
  data: {
    newsItems: {
      children: {
        results: News[];
      };
    };
  };
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const NewsGridDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">News Grid</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  // const id = props.params.RenderingIdentifier;
  const numberOfNews = Number(props.params['NumberOfNews']) ?? 12;
  if (props.fields) {
    return (
      <div className="container">
        <div className="row">
          {props?.fields?.data?.newsItems?.children?.results?.map((element, key) => {
            if (element?.template?.name == 'Page Data') {
              return <></>;
            }
            const grid =
              props.params['NumberOfNewsPerGrid'] == '2'
                ? 'col-md-6'
                : props.params['NumberOfNewsPerGrid'] == '3'
                ? 'col-md-4'
                : props.params['NumberOfNewsPerGrid'] == '4'
                ? 'col-md-3'
                : 'col-md-12';
            if (key >= numberOfNews) {
              return <></>;
            } else {
              return (
                <div className={grid} key={key}>
                  <SharedNewsTeaser
                    title={element?.title?.jsonValue?.value}
                    abstract={element?.abstract?.jsonValue?.value}
                    image={element?.image?.jsonValue?.value?.src}
                    publicationDate={element?.publicationDate?.jsonValue?.value}
                    tag={element?.tag?.jsonValue?.fields?.Title?.value}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return <NewsGridDefaultComponent {...props} />;
};

export const List = (props: PromoProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const onlyNews = props?.fields?.data?.newsItems?.children?.results?.filter(
    (element) => element?.template?.name != 'Page Data'
  );
  const [tags] = useState<string[]>(
    Array.from(
      new Set(
        onlyNews?.map((news) => {
          return news?.tag?.jsonValue?.fields?.Title?.value;
        })
      ).values()
    )
  );
  const [monthes] = useState<number[]>(
    Array.from(
      new Set(
        onlyNews?.map((news) => {
          return new Date(news.publicationDate?.jsonValue?.value).getMonth() + 1;
        })
      ).values()
    )
  );
  const [years] = useState<number[]>(
    Array.from(
      new Set(
        onlyNews?.map((news) => {
          return new Date(news.publicationDate?.jsonValue?.value).getFullYear();
        })
      ).values()
    )
  );
  const [chosenTag, setChosenTag] = useState<string>('Please Choose');
  const [filteredNews, setFilteredNews] = useState<News[]>(onlyNews);
  const [fromMonth, setFromMonth] = useState<string>('Please Choose');
  const [toMonth, setToMonth] = useState<string>('Please Choose');
  const [fromYear, setFromYear] = useState<string>('Please Choose');
  const [toYear, setToYear] = useState<string>('Please Choose');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    executeSearch(e.target.value, chosenTag, fromMonth, toMonth, fromYear, toYear);
  };

  const selectFromMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFromMonth(value);
    executeSearch(searchQuery, chosenTag, value, toMonth, fromYear, toYear);
  };

  const selectToMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setToMonth(value);
    executeSearch(searchQuery, chosenTag, fromMonth, value, fromYear, toYear);
  };

  const selectToYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setToYear(value);
    executeSearch(searchQuery, chosenTag, fromMonth, toMonth, fromYear, value);
  };

  const selectFromYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFromYear(value);
    executeSearch(searchQuery, chosenTag, fromMonth, toMonth, value, toYear);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setChosenTag(value);
    executeSearch(searchQuery, value, fromMonth, toMonth, fromYear, toYear);
  };

  const executeSearch = (
    query: string,
    tag: string,
    fromMonth: string,
    toMonth: string,
    fromYear: string,
    toYear: string
  ) => {
    console.log('QUERY: ' + query);
    console.log('Tag: ' + tag);
    console.log('From Month: ' + fromMonth);
    console.log('From Year: ' + fromYear);
    console.log('To Month: ' + toMonth);
    console.log('To Year: ' + toYear);

    let filteredNews = onlyNews.filter(
      (news) =>
        news.title?.jsonValue?.value?.toLowerCase()?.includes(query.toLowerCase()) ||
        news.tag?.jsonValue?.fields?.Title?.value?.toLowerCase()?.includes(query.toLowerCase())
    );

    if (tag && tag !== 'Please Choose') {
      filteredNews = filteredNews.filter(
        (news) => news?.tag?.jsonValue?.fields?.Title?.value === tag
      );
    }

    if (fromMonth && fromMonth !== 'Please Choose' && fromYear && fromYear !== 'Please Choose') {
      filteredNews = filteredNews.filter(
        (news) =>
          new Date(news.publicationDate.jsonValue.value) >=
          new Date(Number(fromYear), Number(fromMonth) - 1, 1)
      );
    }

    if (toYear && toYear !== 'Please Choose' && toMonth && toMonth !== 'Please Choose') {
      filteredNews = filteredNews.filter(
        (news) =>
          new Date(news.publicationDate.jsonValue.value) <=
          new Date(Number(toYear), Number(toMonth), 0)
      );
    }

    setFilteredNews(filteredNews);
  };

  const textColor = useColorModeValue('gray.700', 'gray.300');

  // const id = props.params.RenderingIdentifier;
  const numberOfNews = Number(props.params['NumberOfNews']) ?? 12;
  if (props.fields) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Text fontWeight={'extrabold'}>Enter Search</Text>
          </div>
          <div className="col-md-5">
            <InputGroup>
              <Input
                type={'text'}
                variant={'brandPrimary'}
                placeholder="SEARCH"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <InputRightElement pointerEvents="none">
                <Icon as={MdOutlineTextFields} />
              </InputRightElement>
            </InputGroup>
          </div>
          <div className="col-md-5">
            <Select variant={'brandPrimary'} onChange={selectChange} placeholder="Select Tag">
              {tags.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        <hr />
        <Box className="row" pb={2}>
          <div className="col-md-2">
            <Text fontWeight={'extrabold'}>(Range) From</Text>
          </div>
          <div className="col-md-5">
            <Select variant={'brandPrimary'} onChange={selectFromMonthChange}>
              <option value="Please Choose">Month</option>
              {monthes.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="col-md-5">
            <Select variant={'brandPrimary'} onChange={selectFromYearChange}>
              <option value="Please Choose">Year</option>
              {years.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </Select>
          </div>
        </Box>
        <Box className="row">
          <div className="col-md-2">
            <Text fontWeight={'extrabold'}>(Range) To</Text>
          </div>
          <div className="col-md-5">
            <Select variant={'brandPrimary'} onChange={selectToMonthChange}>
              <option value="Please Choose">Month</option>
              {monthes.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="col-md-5">
            <Select variant={'brandPrimary'} onChange={selectToYearChange}>
              <option value="Please Choose">Year</option>
              {years.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </Select>
          </div>
        </Box>
        <hr />
        <div className="row">
          {filteredNews.map((element, key) => {
            const publicationDate = new Date(element.publicationDate?.jsonValue?.value);
            if (key >= numberOfNews) {
              return <></>;
            } else {
              return (
                <Box
                  key={key}
                  marginTop={{ base: '1', sm: '5' }}
                  display="flex"
                  flexDirection={{ base: 'column', sm: 'row' }}
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flex="1"
                    marginRight="3"
                    position="relative"
                    alignItems="center"
                  >
                    <Box
                      width={{ base: '100%', sm: '85%' }}
                      zIndex="2"
                      marginLeft={{ base: '0', sm: '5%' }}
                      marginTop="5%"
                    >
                      <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        <Image
                          borderRadius="lg"
                          src={element.image?.jsonValue?.value?.src ?? ''}
                          alt="some good alt text"
                        />
                      </Link>
                    </Box>
                    <Box zIndex="1" width="100%" position="absolute" height="100%">
                      <Box
                        bgGradient={'radial(brand.400 1px, transparent 1px)'}
                        backgroundSize="20px 20px"
                        opacity="0.4"
                        height="100%"
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="center"
                    marginTop={{ base: '2', sm: '0' }}
                  >
                    <HStack spacing={2}>
                      <Badge variant={'brandFilled'}>
                        {element.tag?.jsonValue?.fields?.Title?.value}
                      </Badge>
                    </HStack>
                    <Heading marginTop="1">
                      <Link
                        href={element?.url?.path}
                        textDecoration="none"
                        _hover={{ textDecoration: 'none' }}
                      >
                        {element.title?.jsonValue?.value}
                      </Link>
                    </Heading>
                    <Text pb={4} fontWeight={'extrabold'}>
                      {publicationDate.toLocaleDateString()}
                    </Text>
                    <Text as="p" marginTop="2" color={textColor} fontSize="2xl">
                      {element.abstract?.jsonValue?.value}
                    </Text>
                  </Box>
                </Box>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return <NewsGridDefaultComponent {...props} />;
};
