import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
export default function ExampleClientsideComponent(props: {
  title: string;
  description?: string;
  bold?: boolean;
  datasources?: FEAAS.DataScopes;
}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;
  //   const { title, description } = datasource;
  console.log(JSON.stringify(datasource, null, 2));
  return (
    <div>
      {' '}
      <h2>Clientside</h2>{' '}
      <dl style={props.bold ? { fontWeight: 'bold' } : {}}>
        {' '}
        <dt>Description</dt> <dd>Interactive UI</dd> <dt>Rendered on</dt> <dd>Clientside</dd>{' '}
        <dt>Data</dt>{' '}
        <dd>
          <div>
            <p>Title: {props.title} </p>
            <p>Description: {props.description} </p>
          </div>
        </dd>{' '}
        <dt>RAW Data</dt>{' '}
        <dd>
          <div>
            <p>Title: {datasource?.title} </p>
            <p>Description: {datasource?.description} </p>
          </div>
        </dd>{' '}
        <dt>Clientside hook</dt>{' '}
        <dd>
          {' '}
          <var>{counter}</var>s elapsed{' '}
        </dd>{' '}
        <dt>Data:</dt>
        <dd>
          <pre>{JSON.stringify(props.datasources, null, 2)}</pre>
        </dd>
      </dl>
    </div>
  );
}
FEAAS.registerComponent(ExampleClientsideComponent, {
  name: 'clientside-only',
  title: 'Clientside-only component',
  description: 'Description of my example component',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Examples Hahn',
  required: ['firstName'],
  properties: {
    title: { type: 'string', title: 'Title' },
    description: { type: 'string', title: 'Description' },
    bold: { type: 'boolean', title: 'Show text in bold weight' },
  },
  ui: {
    title: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Write some title',
    },
    bold: { 'ui:widget': 'radio' },
  },
});
