import * as FEAAS from '@sitecore-feaas/clientside/react';
export default function ExampleClientsideComponent(props: { datasources?: FEAAS.DataScopes }) {
  const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;
  console.log(datasource);
  return (
    <>
      <h2>List Example</h2>
      <div className="container">
        <div className="row">
          {datasource?.data?.allAthlete?.results?.map((element: any, key: string) => {
            return (
              <div key={key} className="col-md-3">
                <h3>{element?.athleteName}</h3>
                <p>{element?.athleteQuote}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div>{JSON.stringify(datasource?.data?.allAthlete?.results[0], null, 2)}</div> */}
    </>
  );
}
FEAAS.registerComponent(ExampleClientsideComponent, {
  name: 'Some Fancy external List Component',
  title: 'Some Fancy external List Component',
  description: 'Description of my example component',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Examples Hahn',
  required: [],
  properties: {},
  ui: {},
});
