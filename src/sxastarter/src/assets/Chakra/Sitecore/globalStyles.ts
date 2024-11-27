export const globalStyles = {
  styles: {
    global: (props: any) => ({
      html: {
        fontSize: '12px',
      },
      [`@media screen and (max-width: ${props.theme.breakpoints.sm})`]: {
        h1: {
          fontSize: '3xl',
          margin: '2',
        },
        h2: {
          fontSize: 'xl',
          margin: '1',
        },
        h3: {
          fontSize: 'lg',
          margin: '1',
        },
        h4: {
          fontSize: 'lg',
        },
        p: {
          fontSize: 'lg',
          marginBottom: '2',
        },
        strong: {
          fontWeight: 'bold',
        },
      },
      [`@media screen and (min-width: ${props.theme.breakpoints.sm} and max-width: ${props.theme.breakpoints.md})`]:
        {
          h1: {
            fontSize: '3xl',
            margin: '2',
          },
          h2: {
            fontSize: 'xl',
            margin: '1',
          },
          h3: {
            fontSize: 'lg',
            margin: '1',
          },
          h4: {
            fontSize: 'lg',
          },
          p: {
            fontSize: 'sm',
            marginBottom: '2',
          },
          strong: {
            fontWeight: 'bold',
          },
        },
      [`@media screen and (min-width: ${props.theme.breakpoints.md} and max-width: ${props.theme.breakpoints.xl})`]:
        {
          h1: {
            fontSize: '3xl',
            margin: '2',
          },
          h2: {
            fontSize: 'xl',
            margin: '1',
          },
          h3: {
            fontSize: 'lg',
            margin: '1',
          },
          h4: {
            fontSize: 'lg',
          },
          p: {
            fontSize: 'sm',
            marginBottom: '2',
          },
          strong: {
            fontWeight: 'bold',
          },
        },
    }),
  },
};
