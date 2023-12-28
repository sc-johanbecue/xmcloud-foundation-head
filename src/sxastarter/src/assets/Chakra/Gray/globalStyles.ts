export const globalStyles = {
  styles: {
    global: (props: any) => ({
      [`@media screen and (max-width: ${props.theme.breakpoints.sm})`]: {
        h1: {
          fontSize: '4xl',
          margin: '2',
        },
        h2: {
          fontSize: '2xl',
          margin: '1',
        },
        h3: {
          fontSize: 'xl',
          margin: '1',
        },
        h4: {
          fontSize: 'xl',
        },
        p: {
          fontSize: 'md',
          marginBottom: '2',
        },
        strong: {
          fontWeight: 'bold',
        },
      },
      [`@media screen and (min-width: ${props.theme.breakpoints.sm} and max-width: ${props.theme.breakpoints.md})`]:
        {
          h1: {
            fontSize: '4xl',
            margin: '2',
          },
          h2: {
            fontSize: '2xl',
            margin: '1',
          },
          h3: {
            fontSize: '2xl',
            margin: '1',
          },
          h4: {
            fontSize: 'xl',
          },
          p: {
            fontSize: 'lg',
            marginBottom: '2',
          },
          strong: {
            fontWeight: 'bold',
          },
        },
      [`@media screen and (min-width: ${props.theme.breakpoints.md} and max-width: ${props.theme.breakpoints.xl})`]:
        {
          h1: {
            fontSize: '4xl',
            margin: '2',
          },
          h2: {
            fontSize: '3xl',
            margin: '1',
          },
          h3: {
            fontSize: '2xl',
            margin: '1',
          },
          h4: {
            fontSize: 'xl',
          },
          p: {
            fontSize: 'lg',
            marginBottom: '2',
          },
          strong: {
            fontWeight: 'bold',
          },
        },
    }),
  },
};
