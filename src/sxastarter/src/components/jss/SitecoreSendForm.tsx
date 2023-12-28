import React from 'react';
import Script from 'next/script';
import { Field, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  FormId: Field<string>;
}

type NewsroomUpdateRegistrationProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: NewsroomUpdateRegistrationProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  const shortFormId = props.fields.FormId.value.replace('-', '');

  return (
    <>
      {sitecoreContext.pageState === 'edit' && <Text field={props.fields.FormId} />}
      <Script
        id="MoosendFormInit"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            `
           if(!window.mootrack){ !function(t,n,e,o,a){function d(t){var n=~~(Date.now()/3e5),o=document.createElement(e);o.async=!0,o.src=t+"?ts="+n;var a=document.getElementsByTagName(e)[0];a.parentNode.insertBefore(o,a)}t.MooTrackerObject=a,t[a]=t[a]||function(){return t[a].q?void t[a].q.push(arguments):void(t[a].q=[arguments])},window.attachEvent?window.attachEvent("onload",d.bind(this,o)):window.addEventListener("load",d.bind(this,o),!1)}(window,document,"script","https://cdn.stat-track.com/statics/moosend-tracking.min.js","mootrack"); } mootrack('loadForm', '` +
            shortFormId +
            `');`,
        }}
      />
      <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div data-mooform-id={props.fields.FormId.value}></div>
        </div>
      </div>
    </>
  );
};
