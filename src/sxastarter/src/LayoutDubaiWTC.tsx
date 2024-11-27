/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  Field,
  HTMLLink,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import Link from 'next/link';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  OgTitle?: Field;
  OgDescription?: Field;
  OgImage?: ImageField;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <link rel="canonical" href={publicUrl} />
        <meta property="og:title" content={fields?.OgTitle?.value?.toString()} />
        <meta property="og:description" content={fields?.OgDescription?.value?.toString()} />
        <meta property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        <meta property="og:type" content={route?.templateName} data-attr="JSS-21.6.0" />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="text/javascript">
          {`
         var base_url = 'https://dwtc.exhibitoronlinemanual.com/';
         var env_slug = 'gitex-global-2024';
         `}
        </script>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6lriqNYLouhhTFX-5anjxpcugENE-HrM"
          async
          defer
        />
        {/* <script type="text/javascript" src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/" integrity="sha384-sHe6VoZfbVCWcsNmdLRbc6a3ZSUIQSogjGkx3guln2mVjjVQ+YfaxzRQdyOpw7E1" crossOrigin="anonymous" ></script> */}
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/vendor/bootstrap/js/popper.min.js?mt=1728376865"
          integrity="sha384-rn0XrCNfhQuw2/tzfv4cvBHjPnljfEYSGlYLk2VmCk0ts82JdJvQ72xx/nV/XJcB"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery-3.7.1.min.js?mt=1728376865"
          integrity="sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery-migrate-3.4.1.min.js?mt=1728376865"
          integrity="sha384-czcQ6JCNAUZEN3Lgaz+MCStLIwPMDsflaEetvR2p8sO+ayIMQvaqWLKAsy9vIsBW"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/vendor/bootstrap/js/bootstrap.min.js?mt=1728376865"
          integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js//vendor/metisMenu/metisMenu.min.js?mt=1728376865"
          integrity="sha384-F21Q4YFCU/iioflzam9g/N68S5oNeUjUfHDdxjxgm7Aj1gKgOcLIDVM1o5azfVSb"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js//dist/js/sb-admin-2.js?mt=1728376865"
          integrity="sha384-2WnzfE4zLreTwwL8e1cGE8+xBK93ZaJYFzfASYjZpR3O91CGJjFeIOwbP/8L1mpA"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/dist/js/jquery.timepicker.js?mt=1728376865"
          integrity="sha384-1VS+CtHXh5ARGyKso0jwATKb50fcDDwZiWZRhOt8VaeqFQtkL7cn2d/CYFwzB76n"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/dist/js/bootstrap-datetimepicker.js?mt=1728376865"
          integrity="sha384-OGT58VvB/yxvTiPIKa41CQzcW5QBulC4zSB8gpyk+jTW3p8/4QDWSfSYmMUaNUVU"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/dist/js/bootstrap-multiselect.js?mt=1728376865"
          integrity="sha384-pK+ObHXVn4zICKnR3PzKJKFRaDHDwebrhq1BqGFBPvxUrlxyBClCuH2amVyG0JIB"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.cookie.js?mt=1728376865"
          integrity="sha384-dE6K/TgpU4Ua5nitZ3HVYXiyeXqKmPkRoi0LQ6i3V+wgLa+aHb+7Yk7MmnIsaaYe"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.colorbox.js?mt=1728376865"
          integrity="sha384-MiuiPDrnIKG1EsaEPM0JvPlp2RAJDBvaaLbuWAX7ME7Z6/tBptQ0KEFSqEnPUpZB"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery-ui.min.js?mt=1728376865"
          integrity="sha384-8EM386r8XMMzwGPUxfGNr6c1wIOYnPQBJ6VFxzKCZeklpQarHoZGB40kdNDA3gYr"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/imglib/imgcrp.js?mt=1728376865"
          integrity="sha384-zGYJyE9QINipfgHDEVMLyVLeZr+ulKm91OCv9Aaan1SpyMfWKTkGRtqXMIK5V3Lv"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/imglib/jcanvas.js?mt=1728376865"
          integrity="sha384-ZfpTyOFL/GG0/Qlr8De6YLHLS9RDiV4mKWJJ72HAiGgWuYD7MYH9saXuDoyXT+vs"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.slimscroll.js?mt=1728376865"
          integrity="sha384-Fb+vGKUJ1e6L1uOAI4wjYuoyhin4/rFZAWm3ULWpC1osCQaxoBIyIkygf5kWE3iz"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.base64.js?mt=1728376865"
          integrity="sha384-qyX47n2ncUDFWEQgVJv/ydsEnm+2+8t/F/8D8GhZ6VpF7CU6Os0y0oop+rvKSn5s"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.matchHeight-min.js?mt=1728376865"
          integrity="sha384-dfOR5hjVOg6B2OvgyHIS71mJWX5TgNQeFGo5cNNVglSep7ZvYcByrpEya6xbwwyB"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/custom.js?mt=1728376865"
          integrity="sha384-hKMm4zBw/ys6xcHNcYlOQzHtQaM+3WhgNL2BCAZwWZfA2P6qZgl6oTi/1QWLp+w3"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/map.js?mt=1728376865"
          integrity="sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jQuery.print.js?mt=1728376865"
          integrity="sha384-8fepLealm9uJzVKWKvzXeS4UOEcbS/8UR3cOIV80lXDPEdskf94WIQJsXW5DEOfe"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/vendor/datatables/js/jquery.dataTables.min.js?mt=1728376865"
          integrity="sha384-k5vbMeKHbxEZ0AEBTSdR7UjAgWCcUfrS8c0c5b2AfIh7olfhNkyCZYwOfzOQhauK"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/edit.js?mt=1728376865"
          integrity="sha384-KcT1tlBYIg6W9bZsdFO5vJyNOQlXKFubc2VXkONtzxiCjaxRrSjjDkMjtwGh/I4d"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/tinymce/js/tinymce/tinymce.min.js?mt=1728376865"
          integrity="sha384-SwQRvvbMuxNm8MdKBxD0q87IHYsikSs486bjgG/t6UGVihxV0iJ0c8JlqjZmBRTW"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/owl/owl.carousel.min.js?mt=1728376865"
          integrity="sha384-l/y5WJTphApmSlx76Ev6k4G3zxu/+19CVvn9OTKI7gs4Yu5Hm8mjpdtdr5oyhnNo"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery-cropper/cropper.js?mt=1728376865"
          integrity="sha384-fHDdrtMpa9ZX1KI9u2MvrcSKlh39ck1HvuxqclDHiyw9bqRDNvXcg7HdSdP12AH8"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery-cropper/jquery-cropper.min.js?mt=1728376865"
          integrity="sha384-LSutq9ZuPOgDEpbdNKdnaZnUg9zGHJQ/RmiMfokTaqi/g592mwiohhCa/MOgI844"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/crop.js?mt=1728376865"
          integrity="sha384-xDWfEZHk61sGVQ+uWy0rqLygycO/DBtNHZrDLew125uOHhDff7NxoR2OAoywYTp9"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.plugin.js?mt=1728376865"
          integrity="sha384-BIGNqh5fnc5LPWm+ztUxDKO6jHkNSGtoVJkiK0rIDdFwrrou6qPoxfuHGOwqwknS"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/jquery.countdown.js?mt=1728376865"
          integrity="sha384-j4AUFt4R7DFrAS0HyPwpxzvsHqcrTDuqa++8s9sK/bxY5V3wX/nqUu38kflm22F3"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/js/comman.js?mt=1728376865"
          integrity="sha384-NtrQPUAdS1RXqmN+uzAt8N0kdq5rJpzp/2cr66/cwVY4d3R5Cd1nH1Hd/MvYXluP"
          crossOrigin="anonymous"
        ></script>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard"
        />
        <meta property="og:site_name" content="Expo." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="" />
        {/*<link rel="shortcut icon" href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/favicon.ico" type="image/x-icon" />*/}
        <link
          rel="shortcut icon"
          href="https://dwtc.exhibitoronlinemanual.com/themes/frontend/images/favicon.ico"
          type="image/x-icon"
        />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
        {/* <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">  */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com"> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/*crossOrigin removed out JBE*/}
        <link
          href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100;200;300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/vendor/bootstrap/css/bootstrap.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/vendor/metisMenu/metisMenu.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/dist/css/sb-admin-2.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/dist/css/style.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/vendor/morrisjs/morris.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/vendor/font-awesome/css/font-awesome.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/dist/css/bootstrap-datetimepicker.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/dist/css/styles.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/dist/css/custom.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/awesome/css/font-awesome.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/jquery-ui.theme.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/jquery-ui.structure.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/colorbox.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/style.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/dwtcmefooter.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/jquery-cropper/cropper.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/owl/owl.carousel.min.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/response.css?mt=1728376865"
        />
        <link
          rel="stylesheet"
          href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/jquery.countdown.css"
        />
        {/*[if lte IE 8]>
      <link rel="stylesheet" type="text/css" href="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/css/style_ie8.css" />
      <![endif]*/}
      </Head>
      <div id="mobile_menu">
        <span className="close">&times;</span>
        <div className="mi-countdown-table">
          <table width="100%">
            <tr>
              <td>
                <div className="micountdown" style={{ margin: '0px', width: '240px' }}></div>
                <script>
                  {`
                        $(function () {
                             var miuntil_time = new Date(+2024, 10-1, 14,+12, +00, +00);
                           //   var miuntil_time = new Date('2024-10-14 12:00:00');
                             console.log(miuntil_time);
                        $('.micountdown').countdown({until: miuntil_time, padZeroes: true,timezone: +4,format: 'DHMS'});
                           });
                        `}
                </script>
              </td>
            </tr>
            {/* <tr><td>
                  <div className="about_company_outer col-xs-12 mt20 mb30">
                      <div className="about_company">
                              <h5 className="blue-color"> Sitecore Middle East FZ-LLC</h5>
                          <p><b>Stand No - </b>H4-B10</p>
                          <p><b>Stand Type - </b>Space Only</p>
                          <p><b>Stand Size - </b>10.00 X 12.00 meters</p>
                          <p><b>Contractual Sq.m - </b>120.00 </p>
                                      <br />
                          <Link>
                              <h5 className="blue-color"> GITEX GLOBAL DWTC 2024</h5>
                          </Link>
                      </div>
                  </div>
                      </td></tr> */}
          </table>
        </div>
        <div className="  ">
          <div className="inner">
            <ul className="nav navbar-nav menu-list" id=""></ul>
          </div>
        </div>
        <div className="  ">
          <div className="inner">
            <ul className="nav sidebar-menu" id="side-menu">
              <li className="">
                <Link
                  data-type="a"
                  className="home click-xhttp-request  mi-icon mi-icon-home"
                  href="/gitex-global-2024/dashboard"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Home"
                >
                  Home
                </Link>
              </li>
              <li className="">
                <Link
                  data-type="a"
                  className="checklist click-xhttp-request  mi-icon mi-icon-checklist"
                  href="/gitex-global-2024/exb_zone/checklist "
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Checklist"
                >
                  Checklist
                </Link>
              </li>
              <li className=" dropdown">
                <Link
                  data-type="a"
                  className="exhibitor-zone dropdown_anchor dropdown_anchor  mi-icon mi-icon-exhibitor-zone"
                  href="#"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Company Profile"
                >
                  Company Profile
                </Link>
                <i className="icon icon-plus dropdown_icon"></i>
                <ul className="dropdown-content" style={{ display: 'none' }}>
                  <li className="   drop-down-list">
                    <Link
                      data-type="a"
                      className=" click-xhttp-request click-xhttp-request   "
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/my_profile"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Company Information"
                    >
                      Company Information
                    </Link>
                  </li>
                  <li className="   drop-down-list">
                    <Link
                      data-type="a"
                      className=" click-xhttp-request click-xhttp-request   "
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/exh_zone_form"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Matchmaking"
                    >
                      Matchmaking
                    </Link>
                  </li>
                  <li className="   drop-down-list">
                    <Link
                      data-type="a"
                      className=" click-xhttp-request click-xhttp-request   "
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/tag_products"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Products & Categories"
                    >
                      Products & Categories
                    </Link>
                  </li>
                  <li className="   drop-down-list">
                    <Link
                      data-type="a"
                      className=" click-xhttp-request click-xhttp-request   "
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/promotional_material"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Promote Your Company"
                    >
                      Promote Your Company
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="">
                <Link
                  data-type="a"
                  className="exhibitor-badges mi-icon mi-icon-exhibitor-badges"
                  href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE2YQ=="
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  target="_blank"
                  data-name="Badges & Promo Codes"
                >
                  Badges & Promo Codes
                </Link>
              </li>
              <li className="">
                <Link
                  data-type="a"
                  className="free-markeing-tools click-xhttp-request  mi-icon mi-icon-freetools"
                  href="/gitex-global-2024/banner/banner_list"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Marketing Assets"
                >
                  Marketing Assets
                </Link>
              </li>
              <li className=" dropdown">
                <Link
                  data-type="a"
                  className="exhibitor-manual dropdown_anchor Exhibitor Manual mi-icon mi-icon-exhibitor-manual"
                  href="/gitex-global-2024/dashboard"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Manuals & Guides"
                >
                  Manuals & Guides
                </Link>
                <i className="icon icon-plus dropdown_icon"></i>
                <ul className="dropdown-content" style={{ display: 'none' }}>
                  <li className="essential-information    drop-down-list">
                    <Link
                      data-type="a"
                      className="essential-information click-xhttp-request click-xhttp-request   Essential Information"
                      href="/gitex-global-2024/cms/essential-information"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Event Information"
                    >
                      Event Information
                    </Link>
                  </li>
                  <li className="general-information    drop-down-list">
                    <Link
                      data-type="a"
                      className="general-information click-xhttp-request click-xhttp-request   General Information"
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/general-information"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Essential Information"
                    >
                      Essential Information
                    </Link>
                  </li>
                  <li className="official-contractor-manuals-forms    drop-down-list">
                    <Link
                      data-type="a"
                      className="official-contractor-manuals-forms click-xhttp-request click-xhttp-request   Official Freight Forwarder Manual & Forms"
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/official-freight-forwarder-manual-forms"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Freight Forwarder"
                    >
                      Freight Forwarder
                    </Link>
                  </li>
                  <li className="health-safety-rules-and-regulations    drop-down-list">
                    <Link
                      data-type="a"
                      className="health-safety-rules-and-regulations click-xhttp-request click-xhttp-request   Health & Safety Rules And Regulations"
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/health-safety-rules-and-regulations"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Health & Safety Regulations"
                    >
                      Health & Safety Regulations
                    </Link>
                  </li>
                  <li className="technical-manual    drop-down-list">
                    <Link
                      data-type="a"
                      className="technical-manual click-xhttp-request click-xhttp-request   Technical Manual"
                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/technical-manual"
                      data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                      data-name="Technical Manual"
                    >
                      Technical Manual
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="">
                <Link
                  data-type="a"
                  className="exhibitor-order-forms click-xhttp-request  Exhibitor Order Forms mi-icon mi-icon-exhibitor-manual"
                  href="/gitex-global-2024/dashboard/forms"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Forms & Services"
                >
                  Forms & Services
                </Link>
              </li>
              <li className="">
                <Link
                  data-type="a"
                  className="assign-new-contact click-xhttp-request  mi-icon mi-icon-user-add"
                  href="/gitex-global-2024/exb/assign_new_contact"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Add a Contractor User"
                >
                  Add a Contractor User
                </Link>
              </li>
              <li className="">
                <Link
                  data-type="a"
                  className="additinal-users click-xhttp-request  mi-icon mi-icon-additional-user"
                  href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb/addonexb"
                  data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                  data-name="Add Additional User"
                >
                  Add Additional User
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className="inner">
            <ul className="nav sidebar-menu in" id="system_menu"></ul>
          </div>
        </div>
      </div>
      <div className="screen_wrapper">
        <div id="request">
          <div className="mloader">
            <img
              src="https://dwtc.exhibitoronlinemanual.com//themes/frontend/css/images/loader1.gif"
              alt=""
            />
          </div>
        </div>
        <div id="wrapper">
          <div className="header_div_wrapper">
            <div id="header_div" className="header_wrapper clearfix">
              <div className="col-xs-12 topsection whitebg">
                <div className="row">
                  <nav
                    className="navbar headtitle col-xs-12  col-md-12 navbar-default navbar-static-top main-top header_nav_drop mi-header-image"
                    role="navigation"
                    style={{ marginTop: '0px', background: '#ffffff', border: '1px #012c61' }}
                  >
                    <div className="  pull-left">
                      <ul className="icons  event_logo">
                        <style>
                          {`
                                    .event_logo {
                                    width: 100%;
                                    margin-top: 0px !important;
                                    }
                                    nav > div:first-child {
                                    width: 100%;
                                    }
                                    .event_logo li {
                                    padding: 0px !important;
                                    }
                                    .main-top {
                                    padding: 0px !important;
                                    }
                                    `}
                        </style>
                        <li>
                          <Link
                            data-type="a"
                            href="https://www.gitex.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/media/s3download/Production/media/2014/banner_Banner.png"
                              alt=""
                              style={{ width: '100%!important', height: 'auto!important' }}
                            />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className=" navbar-header logo-title  pull-right mi-navbar-hide-mobile">
                      <button
                        type="button"
                        className="navbar-toggle"
                        data-bs-toggle="collapse"
                        data-bs-target=".navbar-collapse1"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                    </div>
                    {/* /.navbar-header */}
                  </nav>
                  <div className="col-xs-12 menumain main_navbar">
                    <div className="row">
                      <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                          <div className="collapse navbar-collapse " id="myNavbar">
                            <div className="col-xs-3 main-header w250 np">
                              <ul className="header-nav nav navbar-nav mi-custom-header">
                                <li className="mi-dashbord-link w20p">
                                  <Link
                                    data-type="a"
                                    href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard"
                                  >
                                    <span
                                      className="glyphicon mi-icon-home"
                                      aria-hidden="true"
                                    ></span>
                                  </Link>
                                </li>
                                <li className="w67p">
                                  <form id="ddd">
                                    <div className="form-group">
                                      <div className="search_box select_type_box nplr_xs">
                                        <div className="input-group pull-right col-xs-12 nplr mi-border">
                                          <input
                                            name="keyword"
                                            type="search"
                                            className="txt-search form-control form-with-change-key-up "
                                            value=""
                                            data-href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/search"
                                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                                            placeholder="Search"
                                            id="txtSearch"
                                            style={{ color: '#ffffff' }}
                                          />
                                          <div className="input-group-btn pull-left">
                                            <button
                                              className="btn btn-primary"
                                              data-href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/search"
                                              data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                                              type="button"
                                            >
                                              <span className="glyphicon mi-icon-search"></span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </li>
                              </ul>
                            </div>
                            <div className="col-xs-5 np w55p">
                              <nav className="navbar">
                                <div className="container-fluid np">
                                  <ul className="header-nav col-xs-5 nav navbar-nav  mi-custom-header head_stand_wrap">
                                    <li className="sh_switch-stand">
                                      <div className="form-group">
                                        <div className="search_box select_type_box nplr_xs">
                                          <p>Stand : </p>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="switch-stand-dwtc">
                                      <form className="w90p">
                                        <div className="form-group">
                                          <div className="mi-border col-lg-12 col-sm-12 col-md-12 col-xs-12 input_fileds_header-/ np">
                                            <label
                                              className="drpdown-arrow-up-dwn col-md-12 np mi-stand-select-head"
                                              style={{ marginBottom: '0px', fontWeight: '100' }}
                                            >
                                              {/* <i className="fa fa-chevron-up up-arrow-select"></i> */}
                                              <span className="glyphicon mi-select mi-icon-angle-up"></span>
                                              <select
                                                data-type="select"
                                                className="form-control blk-bg-naviblue cursor-pointer no-border no-shadow change-base-xhttp-request"
                                                data-base="stand_type"
                                                name="stand_type"
                                                data-qr="mi_encoded_string=hSNzEiisZFw7+McbFRFSB2VdJfcb6oRRQG8It7eLFg1rax83ZWQwQauq3jGPK2POkVvPhxeH59/9vdRz3GCnSA==&opd=content"
                                                data-href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb/switch_exb_stand"
                                                data-confirmmessage="Do you want to switch your stand number?"
                                                data-confirm="yes"
                                              >
                                                {/*placeholder="Switch Stand"*/}
                                                <option value="16525" selected>
                                                  H4-B10
                                                </option>
                                              </select>
                                              <span className="glyphicon mi-select     mi-icon-angle-down"></span>
                                              {/* <i className="fa fa-chevron-down down-arrow-select"></i> */}
                                            </label>
                                          </div>
                                        </div>
                                      </form>
                                    </li>
                                  </ul>
                                  <div className="  ">
                                    <div className="inner">
                                      <ul className="nav navbar-nav menu-list" id=""></ul>
                                    </div>
                                  </div>
                                </div>
                              </nav>
                            </div>
                            <ul className="col-xs-3 nav navbar-nav navbar-right hidden-xs mi-header-user mi_user_wel_wrap">
                              <li className="dropdown pull-right">
                                <Link
                                  data-type="a"
                                  className="dropdown-toggle profile_icons pd-right0"
                                  data-bs-toggle="dropdown"
                                  href="javascript:void(0);"
                                >
                                  <span className="glyphicon mi-icon-user "></span>
                                  <span className="glyphicon mi-icon-angle-down"></span>
                                </Link>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link
                                      data-type="a"
                                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/profile"
                                    >
                                      <div>
                                        <strong>Profile</strong>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      data-type="a"
                                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/logout"
                                    >
                                      <div>
                                        <strong>Logout</strong>
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="hidden_1200 pull-right mi-welcome-user mi_user_wel_txt">
                                <Link
                                  data-type="a"
                                  href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/profile"
                                  className="mi_wel_msg"
                                >
                                  Welcome, Moatez Habayeb
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="navbar-header ">
                            <ul className="mobile_search">
                              <ul className="header-nav nav navbar-nav mi-custom-header">
                                <li className="mi-dashbord-link w20p">
                                  <Link
                                    data-type="a"
                                    href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard"
                                  >
                                    <span
                                      className="glyphicon mi-icon-home"
                                      aria-hidden="true"
                                    ></span>
                                  </Link>
                                </li>
                                <li className="w67p">
                                  <form id="ddd">
                                    <div className="form-group">
                                      <div className="search_box select_type_box nplr_xs">
                                        <div className="input-group pull-right col-xs-12 nplr mi-border">
                                          <input
                                            name="keyword"
                                            type="search"
                                            className="txt-search form-control form-with-change-key-up "
                                            value=""
                                            data-href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/search"
                                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                                            placeholder="Search"
                                            id="txtSearch"
                                            style={{ color: '#ffffff' }}
                                          />
                                          <div className="input-group-btn pull-left">
                                            <button
                                              className="btn btn-primary"
                                              data-href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/search"
                                              data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                                              type="button"
                                            >
                                              <span className="glyphicon mi-icon-search"></span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </li>
                              </ul>
                            </ul>
                            {/*                            <button type="button" className="navbar-toggle pull-left" data-bs-toggle="collapse" data-bs-target="#myNavbar">*/}
                            <button
                              type="button"
                              className="navbar-toggle pull-left"
                              data-target="#myNavbar"
                            >
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                            </button>
                            <ul className="header-nav col-xs-12 nav navbar-nav navbar-right  mi-custom-header switch_stand_mobile text-center">
                              <li className="sh_switch-stand">
                                <div className="form-group">
                                  <div className="search_box select_type_box nplr_xs">
                                    <p>Stand : </p>
                                  </div>
                                </div>
                              </li>
                              <li className="switch-stand-dwtc">
                                <form className="w90p">
                                  <div className="form-group">
                                    <div className="mi-border col-lg-12 col-sm-12 col-md-12 col-xs-12 input_fileds_header-/ np">
                                      <label
                                        className="drpdown-arrow-up-dwn col-md-12 np mi-stand-select-head"
                                        style={{ marginBottom: '0px', fontWeight: '100' }}
                                      >
                                        {/* <i className="fa fa-chevron-up up-arrow-select"></i> */}
                                        <span className="glyphicon mi-select mi-icon-angle-up"></span>
                                        <select
                                          data-type="select"
                                          className="form-control blk-bg-naviblue cursor-pointer no-border no-shadow change-base-xhttp-request"
                                          data-base="stand_type"
                                          name="stand_type"
                                          data-qr="mi_encoded_string=hSNzEiisZFw7+McbFRFSB2VdJfcb6oRRQG8It7eLFg1rax83ZWQwQauq3jGPK2POkVvPhxeH59/9vdRz3GCnSA==&opd=content"
                                          data-href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb/switch_exb_stand"
                                          data-confirmmessage="Do you want to switch your stand number?"
                                          data-confirm="yes"
                                        >
                                          {/*placeholder="Switch Stand" */}
                                          <option value="16525" selected>
                                            H4-B10
                                          </option>
                                        </select>
                                        <span className="glyphicon mi-select     mi-icon-angle-down"></span>
                                        {/* <i className="fa fa-chevron-down down-arrow-select"></i> */}
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </li>
                            </ul>
                            <ul className="responsive-menu nav navbar-nav navbar-right hidden-lg hidden-sm hidden-md pull-right">
                              <li>
                                <Link
                                  data-type="a"
                                  className="dropdown-toggle profile_icons pd-right0"
                                  data-bs-toggle="dropdown"
                                  href="javascript:void(0);"
                                >
                                  <span className="glyphicon mi-icon-user "></span>
                                  <span className="glyphicon mi-icon-angle-down"></span>
                                </Link>
                                <ul className="dropdown-menu width767_nav">
                                  <li>
                                    <Link
                                      data-type="a"
                                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/profile"
                                    >
                                      <div>
                                        <strong>Profile</strong>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      data-type="a"
                                      href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/logout"
                                    >
                                      <div>
                                        <strong>Logout</strong>
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* /.sidebar-collapse */}
              </div>
              <script type="text/javascript">
                {`
                     if ($(window).width() < 1024) {
                         adjust_table();
                     }
                  `}
              </script>
            </div>
          </div>
          {/*        <div id="notice">
               </div>*/}
          <div className="navbar-default sidebar pull-left" role="navigation">
            <div className="sidebar-nav navbar-collapse collapse navbar-collapse1">
              <div className="mi-countdown-table">
                <table width="100%">
                  <tr>
                    <td>
                      <div className="micountdown" style={{ margin: '0px', width: '240px' }}></div>
                      <script>
                        {`
                                 $(function () {
                                      var miuntil_time = new Date(+2024, 10-1, 14,+12, +00, +00);
                                    //   var miuntil_time = new Date('2024-10-14 12:00:00');
                                      console.log(miuntil_time);
                                 $('.micountdown').countdown({until: miuntil_time, padZeroes: true,timezone: +4,format: 'DHMS'});
                                    });
                                `}
                      </script>
                    </td>
                  </tr>
                  {/* <tr><td>
                           <div className="about_company_outer col-xs-12 mt20 mb30">
                               <div className="about_company">

                                       <h5 className="blue-color"> Sitecore Middle East FZ-LLC</h5>

                                   <p><b>Stand No - </b>H4-B10</p>
                                   <p><b>Stand Type - </b>Space Only</p>
                                   <p><b>Stand Size - </b>10.00 X 12.00 meters</p>
                                   <p><b>Contractual Sq.m - </b>120.00 </p>
                                               <br />
                                   <Link>
                                       <h5 className="blue-color"> GITEX GLOBAL DWTC 2024</h5>
                                   </Link>
                               </div>
                           </div>
                               </td></tr> */}
                </table>
              </div>
              <div className="  ">
                <div className="inner">
                  <ul className="nav sidebar-menu" id="side-menu">
                    <li className="">
                      <Link
                        data-type="a"
                        className="home click-xhttp-request  mi-icon mi-icon-home"
                        href="/gitex-global-2024/dashboard"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Home"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        data-type="a"
                        className="checklist click-xhttp-request  mi-icon mi-icon-checklist"
                        href="/gitex-global-2024/exb_zone/checklist "
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Checklist"
                      >
                        Checklist
                      </Link>
                    </li>
                    <li className=" dropdown">
                      <Link
                        data-type="a"
                        className="exhibitor-zone dropdown_anchor dropdown_anchor  mi-icon mi-icon-exhibitor-zone"
                        href="#"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Company Profile"
                      >
                        Company Profile
                      </Link>
                      <i className="icon icon-plus dropdown_icon"></i>
                      <ul className="dropdown-content" style={{ display: 'none' }}>
                        <li className="   drop-down-list">
                          <Link
                            data-type="a"
                            className=" click-xhttp-request click-xhttp-request   "
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/my_profile"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Company Information"
                          >
                            Company Information
                          </Link>
                        </li>
                        <li className="   drop-down-list">
                          <Link
                            data-type="a"
                            className=" click-xhttp-request click-xhttp-request   "
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/exh_zone_form"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Matchmaking"
                          >
                            Matchmaking
                          </Link>
                        </li>
                        <li className="   drop-down-list">
                          <Link
                            data-type="a"
                            className=" click-xhttp-request click-xhttp-request   "
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/tag_products"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Products & Categories"
                          >
                            Products & Categories
                          </Link>
                        </li>
                        <li className="   drop-down-list">
                          <Link
                            data-type="a"
                            className=" click-xhttp-request click-xhttp-request   "
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb_zone/promotional_material"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Promote Your Company"
                          >
                            Promote Your Company
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="">
                      <Link
                        data-type="a"
                        className="exhibitor-badges mi-icon mi-icon-exhibitor-badges"
                        href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE2YQ=="
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        target="_blank"
                        data-name="Badges & Promo Codes"
                      >
                        Badges & Promo Codes
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        data-type="a"
                        className="free-markeing-tools click-xhttp-request  mi-icon mi-icon-freetools"
                        href="/gitex-global-2024/banner/banner_list"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Marketing Assets"
                      >
                        Marketing Assets
                      </Link>
                    </li>
                    <li className=" dropdown">
                      <Link
                        data-type="a"
                        className="exhibitor-manual dropdown_anchor Exhibitor Manual mi-icon mi-icon-exhibitor-manual"
                        href="/gitex-global-2024/dashboard"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Manuals & Guides"
                      >
                        Manuals & Guides
                      </Link>
                      <i className="icon icon-plus dropdown_icon"></i>
                      <ul className="dropdown-content" style={{ display: 'none' }}>
                        <li className="essential-information    drop-down-list">
                          <Link
                            data-type="a"
                            className="essential-information click-xhttp-request click-xhttp-request   Essential Information"
                            href="/gitex-global-2024/cms/essential-information"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Event Information"
                          >
                            Event Information
                          </Link>
                        </li>
                        <li className="general-information    drop-down-list">
                          <Link
                            data-type="a"
                            className="general-information click-xhttp-request click-xhttp-request   General Information"
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/general-information"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Essential Information"
                          >
                            Essential Information
                          </Link>
                        </li>
                        <li className="official-contractor-manuals-forms    drop-down-list">
                          <Link
                            data-type="a"
                            className="official-contractor-manuals-forms click-xhttp-request click-xhttp-request   Official Freight Forwarder Manual & Forms"
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/official-freight-forwarder-manual-forms"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Freight Forwarder"
                          >
                            Freight Forwarder
                          </Link>
                        </li>
                        <li className="health-safety-rules-and-regulations    drop-down-list">
                          <Link
                            data-type="a"
                            className="health-safety-rules-and-regulations click-xhttp-request click-xhttp-request   Health & Safety Rules And Regulations"
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/health-safety-rules-and-regulations"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Health & Safety Regulations"
                          >
                            Health & Safety Regulations
                          </Link>
                        </li>
                        <li className="technical-manual    drop-down-list">
                          <Link
                            data-type="a"
                            className="technical-manual click-xhttp-request click-xhttp-request   Technical Manual"
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/cms/technical-manual"
                            data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                            data-name="Technical Manual"
                          >
                            Technical Manual
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="">
                      <Link
                        data-type="a"
                        className="exhibitor-order-forms click-xhttp-request  Exhibitor Order Forms mi-icon mi-icon-exhibitor-manual"
                        href="/gitex-global-2024/dashboard/forms"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Forms & Services"
                      >
                        Forms & Services
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        data-type="a"
                        className="assign-new-contact click-xhttp-request  mi-icon mi-icon-user-add"
                        href="/gitex-global-2024/exb/assign_new_contact"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Add a Contractor User"
                      >
                        Add a Contractor User
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        data-type="a"
                        className="additinal-users click-xhttp-request  mi-icon mi-icon-additional-user"
                        href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/exb/addonexb"
                        data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content"
                        data-name="Add Additional User"
                      >
                        Add Additional User
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="">
                <div className="inner">
                  <ul className="nav sidebar-menu in" id="system_menu"></ul>
                </div>
              </div>
            </div>
            {/* /.sidebar-collapse */}
          </div>
        </div>
        <div id="page-wrapper">
          {/* /.row */}
          <div className="col-xs-12 main-section">
            <div className="row">
              <div className="content_wrapper doctor content_outer" id="content">
                <div className="col-xs-12 padding-fifteen">
                  <div className="col-xs-12 nplr_xs">
                    <div className="col-xs-12"></div>
                    <div className="col-xs-12  whitebg mrg_bt30 formlabels">
                      <div>
                        <div
                          data-shortcode="W1NIT1JUOlN0YW5kLUNvbnRlbnQgZW52X2lkPSIyMDE0IiBleGJfaWQ9IjE2MzUxIl0="
                          data-editable="no"
                          className=" mceNonEditable"
                        >
                          <div
                            className="col-xs-12 stand_block np"
                            style={{ paddingLeft: '10px;' }}
                          >
                            <div className="col-xs-12 col-md-6 np">
                              <h5> Sitecore Middle East FZ-LLC</h5>
                            </div>
                            <div className="col-xs-12 col-md-6 text-right np">
                              <div className="col-xs-10  np width-auto np">
                                <h5 className="text-right">STAND DETAILS</h5>
                              </div>
                              <div className="col-xs-2 img_wrapper">
                                <img
                                  src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/stand_details.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xs-12 np">
                            <div className="stdblk-container-col-8">
                              <div className="std-block">
                                Stand No:
                                <p>H4-B10</p>
                              </div>
                              <div className="std-block">
                                Hall No:
                                <p>Hall 4</p>
                              </div>
                              <div className="std-block">
                                Pavilion:
                                <p>-</p>
                              </div>
                              <div className="std-block">
                                Stand Type:
                                <p>Space Only</p>
                              </div>
                              <div className="std-block">
                                Stand Area:
                                <p>120.00 Sq.m </p>
                              </div>
                              <div className="std-block">
                                Stand Width:
                                <p>10.00</p>
                              </div>
                              <div className="std-block">
                                Stand Depth:
                                <p>12.00</p>
                              </div>
                              <div className="std-block">
                                Open Sides:
                                <p>4</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-xs-12 padding-fifteen pd-top0">
                              <div className="col-xs-12 nplr_xs"> */}
                    {/* <div className="col-xs-12 padding-fifteen pd-top0 micheck-pd0 panelsection nm np">
                              <div className="col-xs-12 np ">
                                  <div className="np col-xs-12 padding-fifteen add_contact_outer ">
                                  <div className="col-xs-12 nplr_xs nplr">
                                  <div className="manage_exhibitors_box col-xs-12 section-padding whitebg shadow border-radius text-bold npb">
                                  <div className="checklist_heading col-xs-12 col-sm-12 col-md-12 col-lg-12 nplr">
                                      <p>Exhibitor Zone</p>
                                  </div>
                                  <div className="checklist_form_wrapper col-xs-12 whitebg">
                                                                      <ul className="exb_checklist">
                                                                                      <li className="list">
                                                      <label className="btn">
                                                              <i className="fa fa-check-square-o  pull-left"></i> 
                                                                                                              <i className="fa fa-times  pull-left"></i>     
                                                                                                      </label>
                                                      <span><Link data-type='a' className="click-xhttp-request type_btn" data-qr="mi_encoded_string=PTArADA/VjNNUTz+FSNWCw==&opd=content" data-href=""></Link></span>
                                                  </li>
                                                                              </ul>
                                                              </div>
                                  </div>
                                  </div>
                                  </div>
                              </div>
                              </div> */}
                    {/* </div>
                              </div> */}
                    <div className="col-xs-12 np ">
                      <div className=""></div>
                    </div>
                    <div className="mi_button_wrapp np ">
                      <div className="mi_video_btn_wrap">
                        <div className="mi_video_btn">
                          <div className="col-xs-12 np video-tutorial ">
                            <Link
                              data-type="a"
                              href="https://drive.google.com/file/d/1-vGDkUrZSCphfhByLmeYBR0vfnqmWAOk/view?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://dwtc.exhibitoronlinemanual.com//themes/frontend/images/VIEW TUTORIAL VIDEO.svg"
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="mi_user_btn">
                          <div
                            className=""
                            style={{ width: '200px', position: 'absolute', right: '10px' }}
                          >
                            <Link
                              data-type="a"
                              id=""
                              href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/media/s3download/Production/media/2014/22nd_Aug_EXHIBITOR_portal_user_guidelines_2024.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://dwtc.exhibitoronlinemanual.com//themes/frontend/images/VIEW USER GUIDE.svg"
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="mi_list_grid_btn">
                        <div style={{ width: '41px', position: 'absolute' }}>
                          <Link
                            data-type="a"
                            className="click-xhttp-request click-xhttp-request active active_nav"
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard"
                            data-qr="mi_encoded_string=i4eKeGL5vlS0wiJeG+o8RemxvAULiZZ8JaD/QSgODptygnq8keoNAm5znGpwQZZRw3ah6VBA2a1aae+x3m8fWQ==&opd=content"
                            data-name="Grid view"
                            style={{
                              background: '#393c4d',
                              padding: '6px',
                              borderRadius: '5px',
                              height: '38px',
                              width: '41px',
                              display: 'block',
                            }}
                          >
                            <span>
                              <i className="fa fa-th fa-2x" style={{ color: '#FFF' }}></i>
                            </span>
                          </Link>
                        </div>
                        <div style={{ width: '41px', position: 'absolute', left: '50px' }}>
                          <Link
                            data-type="a"
                            className="click-xhttp-request click-xhttp-request active active_nav"
                            href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard"
                            data-qr="mi_encoded_string=5lpmUcYSDx85x663XYeq+xPgb5v8/qYTrHNGjxQjgk4=&opd=content"
                            data-name="View List"
                            style={{
                              background: '#cd3641',
                              padding: '6px',
                              borderRadius: '5px',
                              height: '38px',
                              width: '41px',
                              display: 'block',
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-align-justify fa-2x"
                                style={{ color: '#FFF' }}
                              ></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="row order_outer mi-checklist-panel ">
                      <div
                        className="responsive-padding col-xs-12 mce-content-body formname nplr"
                        style={{ marginTop: '20px;' }}
                      >
                        {/* <h2 className="heading_page text-uppercase mrg-top0">Checklist</h2> */}
                      </div>
                      {/* <div className="col-xs-12 padding-fifteen">
                                 <div className="col-xs-12 nplr_xs"> */}
                      {/*                <div className="col-xs-12 panelsection nm np">
                                 <div className="col-xs-12 np ">
                                     <div className="np col-xs-12  add_contact_outer ">
                                     <div className="col-xs-12 nplr_xs nplr">
                                     <div className="manage_exhibitors_box col-xs-12 whitebg shadow border-radius text-bold npb">
                                      <div className="checklist_heading col-xs-12 col-sm-12 col-md-12 col-lg-12 nplr">
                                         <p>Exhibitor Order Forms</p>
                                     </div>
                                     <div className="checklist_form_wrapper col-xs-12 whitebg">*/}
                      <div className="col-xs-12 panelsection nm np">
                        <div className="col-xs-12 np ">
                          <div className="np col-xs-12  add_contact_outer ">
                            <div className="col-xs-12 nplr_xs nplr">
                              <div className="manage_exhibitors_box col-xs-12 whitebg shadow border-radius text-bold npb">
                                <div className="checklist_form_wrapper col-xs-12 whitebg">
                                  <div className="col-xs-12 np">
                                    <div className="col-xs-12 formname nplr_xs np">
                                      <h2 className="heading_page ">Compulsory Forms</h2>
                                    </div>
                                  </div>
                                  <div className="my_message_table common_table col-xs-12 nplr">
                                    <div className="table-responsive">
                                      <table
                                        id="example_data"
                                        className="table table-striped display"
                                        style={{ verticalAlign: 'middle' }}
                                        width="100%"
                                      >
                                        <thead>
                                          <tr>
                                            <th className="w285">Form Name</th>
                                            <th>Deadline Date</th>
                                            <th>Time Left</th>
                                            <th style={{ width: '25%', textWrap: 'nowrap' }}>
                                              Form Status{' '}
                                            </th>
                                            <th>Action</th>
                                            <th>Add To Calendar</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNj"
                                              >
                                                {' '}
                                                Health & Safety Declaration
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            <td className="">2 DAYS</td>
                                            <td>
                                              <span className="label label-active ">
                                                Submitted{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNj"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form3c"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNz"
                                              >
                                                {' '}
                                                Appointed Contractor Details Submission Form
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            <td className="">2 DAYS</td>
                                            <td>
                                              <span className="label label-active ">
                                                Submitted{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNz"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form3s"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNi"
                                              >
                                                {' '}
                                                Performance Bond & Letter of Undertaking for
                                                UAE-Based Contractors
                                              </Link>
                                            </td>
                                            <td className="">09 October 2024</td>
                                            <td className="">1 DAY</td>
                                            <td>
                                              <span className="label label-submitted ">
                                                Approved{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNi"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form3b"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNzZA=="
                                              >
                                                {' '}
                                                Click here to submit stand design
                                              </Link>
                                            </td>
                                            <td className="">09 October 2024</td>
                                            <td className="">1 DAY</td>
                                            <td>
                                              <span className="label" style={{ color: '#626262' }}>
                                                -
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTNzZA=="
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form3sd"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybThh"
                                              >
                                                {' '}
                                                Event Plus - Utilities & other Exhibitor Services
                                              </Link>
                                            </td>
                                            <td className="">15 October 2024</td>
                                            <td className="">7 DAYS</td>
                                            <td>
                                              <span className="label" style={{ color: '#626262' }}>
                                                -
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybThh"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form8a"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE1Mg=="
                                              >
                                                {' '}
                                                Get access to New Global Opportunities
                                              </Link>
                                            </td>
                                            <td className="">18 October 2024</td>
                                            <td className="">9 DAYS</td>
                                            <td>
                                              <span className="label" style={{ color: '#626262' }}>
                                                -
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE1Mg=="
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form152"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 panelsection nm np">
                        <div className="col-xs-12 np ">
                          <div className="np col-xs-12  add_contact_outer ">
                            <div className="col-xs-12 nplr_xs nplr">
                              <div className="manage_exhibitors_box col-xs-12 whitebg shadow border-radius text-bold npb">
                                <div className="checklist_form_wrapper col-xs-12 whitebg">
                                  <div className="col-xs-12 np">
                                    <div className="col-xs-12 formname nplr_xs np">
                                      <h2 className="heading_page ">Optional Forms</h2>
                                    </div>
                                  </div>
                                  <div className="my_message_table common_table col-xs-12 nplr">
                                    <div className="table-responsive">
                                      <table
                                        id="example_data"
                                        className="table table-striped display"
                                        style={{ verticalAlign: 'middle' }}
                                        width="100%"
                                      >
                                        <thead>
                                          <tr>
                                            {/* <th>Form No.</th> */}
                                            <th className="w285">Form Name</th>
                                            <th>Deadline Date</th>
                                            {/* <th>CATEGORY</th> */}
                                            <th>Time Left</th>
                                            {/* <th>EMAIL RECIPIENT</th> */}
                                            <th style={{ width: '25%', textWrap: 'nowrap' }}>
                                              Form Status{' '}
                                            </th>
                                            <th>Action</th>
                                            <th>Add To Calendar</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            {/* <td className="color-red">
                                                                  </td> */}
                                            <td className="color-red">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTExMg=="
                                              >
                                                {' '}
                                                Dubai Municipality Letter
                                              </Link>
                                            </td>
                                            <td className="color-red">04 October 2024</td>
                                            {/* <td valign="middle"  className="color-red ">
                                                                  Optional                                                        </td> */}
                                            <td className="color-red">0</td>
                                            {/* <td  className="color-red">
                                                                  <Link data-type='a' href="mailto:GitexOps@dwtc.com"  style="color:#eb3409 !important;" > 
                                                                      GitexOps@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Deadline Passed{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTExMg=="
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form112"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            {/* <td className="">
                                                                  </td> */}
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTExMQ=="
                                              >
                                                {' '}
                                                Dubai Economic Department Letter for Raffle/Prize
                                                Giveaways
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            {/* <td valign="middle"  className=" ">
                                                                  Optional                                                        </td> */}
                                            <td className="">2 DAYS</td>
                                            {/* <td  className="">
                                                                  <Link data-type='a' href="mailto:Gitexops@dwtc.com"  > 
                                                                      Gitexops@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Not Filled{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTExMQ=="
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form111"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            {/* <td className="">
                                                                  </td> */}
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTk2"
                                              >
                                                {' '}
                                                Vehicle Display Notification
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            {/* <td valign="middle"  className=" ">
                                                                  Optional                                                        </td> */}
                                            <td className="">2 DAYS</td>
                                            {/* <td  className="">
                                                                  <Link data-type='a' href="mailto:GitexOps@dwtc.com"  > 
                                                                      GitexOps@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Not Filled{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTk2"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form96"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            {/* <td className="">
                                                                  </td> */}
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTIx"
                                              >
                                                {' '}
                                                Exhibitors - Visa Invitation Letter
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            {/* <td valign="middle"  className=" ">
                                                                  Optional                                                        </td> */}
                                            <td className="">2 DAYS</td>
                                            {/* <td  className="">
                                                                  <Link data-type='a' href="mailto: GitexOps@dwtc.com"  > 
                                                                       GitexOps@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Not Filled{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTIx"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form21"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            {/* <td className="">
                                                                  </td> */}
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE4"
                                              >
                                                {' '}
                                                Dubai Customs Clearance Letter
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            {/* <td valign="middle"  className=" ">
                                                                  Optional                                                        </td> */}
                                            <td className="">2 DAYS</td>
                                            {/* <td  className="">
                                                                  <Link data-type='a' href="mailto:GitexOps@dwtc.com"  > 
                                                                      GitexOps@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Not Filled{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE4"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form18"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            {/* <td className="">
                                                                  </td> */}
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE0"
                                              >
                                                {' '}
                                                Participation Letter
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            {/* <td valign="middle"  className=" ">
                                                                  Optional                                                        </td> */}
                                            <td className="">2 DAYS</td>
                                            {/* <td  className="">
                                                                  <Link data-type='a' href="mailto:GitexOps@dwtc.com"  > 
                                                                      GitexOps@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Not Filled{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTE0"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form14"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            {/* <td className="">
                                                                  </td> */}
                                            <td className="">
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTEw"
                                              >
                                                {' '}
                                                Temporary Staff List
                                              </Link>
                                            </td>
                                            <td className="">10 October 2024</td>
                                            {/* <td valign="middle"  className=" ">
                                                                  Optional                                                        </td> */}
                                            <td className="">2 DAYS</td>
                                            {/* <td  className="">
                                                                  <Link data-type='a' href="mailto:OpsAdmin@dwtc.com"  > 
                                                                      OpsAdmin@dwtc.com                                                            </Link>
                                                                  </td> */}
                                            <td>
                                              <span className="label label-suspend ">
                                                Not Filled{' '}
                                              </span>
                                            </td>
                                            <td>
                                              <Link
                                                data-type="a"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/forms/view/Zm9ybTEw"
                                              >
                                                {' '}
                                                <i className="icon icon-eye-1"></i> View Form{' '}
                                              </Link>
                                            </td>
                                            <td className="ical text-center">
                                              <Link
                                                data-type="a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ical"
                                                href="https://dwtc.exhibitoronlinemanual.com/gitex-global-2024/dashboard/add_ical/form10"
                                              >
                                                <span data-tooltip-top="Add To Calendar">
                                                  <img
                                                    src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/calendar.png"
                                                    alt=""
                                                    style={{ width: '20px', height: 'auto' }}
                                                  />
                                                </span>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*                        </div>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 </div>*/}
                      {/* </div>
                                 </div> */}
                    </div>
                  </div>
                </div>
                <script type="text/javascript">
                  {`
                        $(document).ready(function () {
                            if ($(window).width() < 1024) { 
                                adjust_table();
                            }
                        });
                       `}
                </script>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_wrapper footerpanel" style={{ clear: 'both', position: 'relative' }}>
          <div id="footter_t"></div>
          <div id="highlighter_script"></div>
          <footer>
            {/* <div className="col-xs-12 section-padding warning-section footer_warning text-center"> */}
            {/* <p className="red-text ancerlink-color"><b>WARNING FOR EXHIBITORS - MISLEADING SALES</b></p>
                  <p className="text-gray">Please be warned that the below companies are approaching exhibitors with an offer to sell supposed past attendee data and/or exhibitor directory services.</p>
                  <div align="center">
                      <ul className="points ancerlink-color">
                          <li>Eprospectmedia.com/Global Zest Business Solutions</li>
                          <li>International Fairs Directory</li>
                          <li>EListAppenders/ELA</li>
                          <li>InfoCapp</li>
                          <li>tradeeventslist.com</li>
                          <li>Amy Gibbs</li>
                          <li>Events Info Group - Global Events Partner</li>
                  
                      </ul>
                  </div>
                  <p className="text-gray">We assure you that the above mentioned organizations do not possess any such data.<br />
                      If you are approached or have any questions, feel free to contact us on: <span className="whitelinks">T:</span> <Link data-type='a' href="tel:97144380355" className="whitelinks">XXX X XXX XXXX</Link> | <span className="whitelinks">E:</span> <Link data-type='a' href="mailto:no-reply@xporience.com" className="whitelinks">no-reply@xporience.com</Link> </p>
                  
                  */}
            {/* <p>
                  <div className="col-lg-4 col-md-4 warn-bar ">
                      <div className="col-lg-12 col-md-12 footer_warn_bar">
                          <b className="red-text warn-btn  ancerlink-color"> WARNING!</b> <br /><br />
                          <b className="red-text warn-text ancerlink-color"> Beware of email scams</b>
                      </div>
                  </div>
                  <div className="col-lg-8 col-md-8 warn-side ">
                  
                      Please notify us immediately on <b><Link data-type='a' className="whitelinks" href="mailto:no-reply@xporience.com">no-reply@xporience.com</Link></b> if you receive any emails falsely claiming to sell attendee data or acting as third-party representatives for the exhibitor catalogue/show directory.
                      <br />
                      <br />
                      Beware in any dealings with the following companies/domains<br />
                  
                  </p>
                  
                  
                  </div>
                  <div className="col-lg-12 col-md-12 footerlinks_wrp" align="center">
                  <ul className="col-lg-12 col-md-12  warn-sites ancerlink-color">
                  
                  <li> <i className="square"></i>International Fairs Directory (Inter-Fairs.com)
                  <li><i className="square"></i>Expo Guide, FairGuide.com
                  <li><i className="square"></i>ConstructDataVerlag.com
                  <li><i className="square"></i>MarketingInfoZone.com
                  <li><i className="square"></i>ZoomAppend.com
                  <li><i className="square"></i> DataMarketMedia.com
                  <li><i className="square"></i>WisdowTargets.com
                  <li><i className="square"></i>WWTechData.com
                  
                  </ul>
                  
                  </div> */}
            {/* </div> */}
            <div id="footer" className="dwtcfooter">
              <div className="container" style={{ padding: '25px !important' }}>
                {/* <div className="row">
                        <div className="col-lg-12 text-center dwtclogo"><Link data-type='a' href="http://www.dwtc.com"  target="_blank" rel="noopener noreferrer" ><img width="231" src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/logo-w.png" alt="" /></Link></div>
                        </div> */}
                {/* <div className="row">
                        <hr className="style1">
                        </div> */}
                {/* <div id="overlay" className="row" style="padding-left: 0; padding-right: 0">
                        <div id="overlay">
                            <div className="col-md-1 text-center resetl social_icons">
                                <div className="leftbox">
                                    <table width="120" border="0" cellspacing="0" cellpadding="5" className="social" align="center">
                                        <tbody>
                                            <tr>
                                                <td><Link data-type='a' href="#"  target="_blank" rel="noopener noreferrer" ><img src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/linkedin.svg" width="30" alt="" /></Link></td>
                                                <td><Link data-type='a' href="#"  target="_blank" rel="noopener noreferrer" ><img src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/facebook.svg" width="30" alt="" /></Link></td>
                                                <td><Link data-type='a' href="#"  target="_blank" rel="noopener noreferrer" ><img src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/twitter.svg" width="30" alt="" /></Link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-9 col-sm-12 text-center blurp middle_text"><Link data-type='a' href="#"  target="_blank" rel="noopener noreferrer" >Click here</Link> to view our data protection and privacy policy. | Online Exhibitor Manual Developed by: : <Link data-type='a' href="http://www.xporience.com"  target="_blank" rel="noopener noreferrer" >www.xporience.com</Link></div>
                            <div className="col-md-2 resetr middle_text_inner">
                                <div className="resetr"><img src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/aeo-ufi.svg" alt="" width="168" height="44" usemap="#Map" />
                                    <map name="Map">
                                        <area shape="rect" coords="82,4,132,43" href="https://www.aeo.org.uk/"  target="_blank" rel="noopener noreferrer" >
                                        <area shape="rect" coords="143,3,171,49" href="http://www.ufi.org/"  target="_blank" rel="noopener noreferrer" >
                                    </map>
                                </div>
                            </div>
                        </div>
                        </div> */}
                {/* <div className="row">
                        <hr className="style1">
                        </div> */}
                <div className="row overlaymob">
                  <div className="col-md-12 blurp text-center">
                    <Link
                      data-type="a"
                      href="http://www.dwtc.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        width="50px"
                        height="auto"
                        src="https://dwtc.exhibitoronlinemanual.com/themes/gitex_theme/images/logo-w.png"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="col-md-12 text-center blurp" style={{ marginTop: '10px;' }}>
                    <span>
                      Click here for{' '}
                      <Link
                        data-type="a"
                        href="https://www.dwtc.com/en/terms/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link
                        data-type="a"
                        href="https://www.dwtc.com/en/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Policies
                      </Link>{' '}
                      &#124; Online Exhibitor Manual developed by Xporience &#124;{' '}
                      <Link
                        data-type="a"
                        href="https://xporience.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.xporience.com
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <form name="csrf_token" style={{ display: 'none' }}></form>
      </div>
      <Link data-type="a" href="" id="page_scroller">
        ^
      </Link>
      <div id="readonly_script"></div>
      <div id="current_csrf_token" style={{ display: 'none' }}>
        {/*{current_csrf_token} JBE COMMENTED OUT*/}
      </div>
      <div style={{ display: 'none' }}>{/*{readonly_script} JBE COMMENTED OUT*/}</div>
      {/* message popup  */}
      <div id="myModal" className="modal fade" role="dialog">
        <div id="popup_div"></div>
      </div>
      <div id="myModalsucess" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="">
              <div className="modal-body ">
                <div className="messagefail">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <i className="msg_icon fa"></i>
                  <div id="message" style={{ display: 'block' }}>
                    <div id="usrresponse" style={{ display: 'block !important' }}></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn add-user close" data-dismiss="modal">
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* COMMENTED JBE
      </div>
      </div>
       */}
        {/* end */}
        {/* <Link data-type='a' id="welcome_msg_lnk" className="" data-bs-toggle="modal" data-bs-target="#disclaimerModal"></Link> */}
        {/* <Link data-type='a' id="promocode_msg_lnk" className="" data-bs-toggle="modal" data-bs-target="#disclaimerModal"></Link> */}
        {/* crop js  */}
        <script>
          {`
         $(window).load(function() {
             var announcement_closed = localStorage.getItem('announcement_closed');
         
             if(announcement_closed != 'yes'){
                                                         $('#announcementModal').modal('show');  
                     start_announcement_close_timer();
                                                 }
             $("#announcementModal").on("hidden.bs.modal", function () {
                 
                 localStorage.setItem('announcement_closed', 'yes');
             });
         
         
             function start_announcement_close_timer(){
                 var timer = 5000;
                 var close_timer = setInterval(function(){
                     console.log(timer);
                     if(timer === 0){
                         jQuery('#close_announcement_model').html('<button type="button" className="close" data-bs-dismiss="modal">&times;</button>');
                         clearInterval(close_timer);
                     }
                     timer-=1000;
                 }, 1000);
             }
         });
         `}
        </script>
        <style>
          {`
         #announcementModal{padding:0px!important;}
        `}
        </style>
        <div
          id="announcementModal"
          className="modal fade in"
          role="dialog"
          style={{ textAlign: 'unset', width: '800px', margin: '0 auto', maxWidth: '90%' }}
        >
          <div className="modal-dialog" style={{ width: '100%!important', margin: '0px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <div id="close_announcement_model"></div>
                <h4 className="modal-title">Promocode</h4>
              </div>
              <div className="modal-body" style={{ textAlign: 'unset' }}>
                <div
                  className="elementToProof"
                  style={{
                    textAlign: 'left',
                    textIndent: '0px',
                    margin: '0px',
                    fontSize: '14pt',
                    color: '#000000',
                  }}
                >
                  <b>
                    <br />
                    Use your promo codes by 13th October!
                  </b>
                </div>
                <div
                  style={{
                    textAlign: 'left',
                    textIndent: '0px',
                    margin: '0px',
                    fontSize: '12pt',
                    color: '#000000',
                  }}
                >
                  &nbsp;
                </div>
                <div
                  style={{
                    textAlign: 'left',
                    textIndent: '0px',
                    lineHeight: '25.5467px',
                    margin: '0px 0px 8pt',
                    fontSize: '12pt',
                    color: '#000000',
                  }}
                >
                  Get ready to fuel your presence at GITEX GLOBAL! We have exclusive promo codes
                  tailored just for you to boost visitor traffic to your stand:
                </div>
                <ol style={{ textAlign: 'left', marginTop: '0px', marginBottom: '0px' }}>
                  <li
                    style={{
                      fontSize: '12pt',
                      color: '#000000',
                      lineHeight: '15.5467px',
                      margin: '0px 0px 8pt',
                    }}
                  >
                    <b>Free Visitor Passes for Your Clients and Partners</b>
                  </li>
                  <li
                    style={{
                      fontSize: '12pt',
                      color: '#000000',
                      lineHeight: '15.5467px',
                      margin: '0px 0px 8pt',
                    }}
                  >
                    <b>50% Off Delegate Passes using the promo code &ldquo;EXH50GTX&ldquo;</b>
                  </li>
                </ol>
                <div
                  className="elementToProof"
                  style={{
                    textAlign: 'left',
                    textIndent: '0px',
                    lineHeight: '15.5467px',
                    margin: '0px 0px 8pt',
                    fontSize: '12pt',
                    color: '#000000',
                  }}
                >
                  <br />
                  Detailed promo code instructions are in your{' '}
                  <Link
                    data-type="a"
                    href="https://APPICT.dwtcmarketing.com/e/er?s=1627913114&amp;lid=5913&amp;elq=~~eloqua..type--emailfield..syntax--recipientid..encodeFor--url~~"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Exhibitor Portal Guide."
                    style={{ margin: '0px', color: '#6073dd !important' }}
                  >
                    Exhibitor Portal Guide.
                  </Link>
                </div>
                <div
                  className="elementToProof"
                  style={{ fontSize: '12pt', color: '#000000' }}
                ></div>
                <div className="elementToProof" style={{ fontSize: '12pt', color: '#000000' }}>
                  Link to register for passes using promo codes:{' '}
                  <Link
                    data-type="a"
                    href="https://visit.gitex.com/Event/GITEXGLOBAL/Visitor/Registration/SelectPass"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="OWAf9bbedd1-35bf-1c5a-c446-2bc07e35c578"
                    className="OWAAutoLink"
                    data-auth="NotApplicable"
                    data-linkindex="1"
                    style={{ margin: '0px', color: '#6073dd !important' }}
                  >
                    {' '}
                    https://visit.gitex.com/Event/GITEXGLOBAL/Visitor/Registration/SelectPass
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="mycopmodal" className="modal fade" role="dialog">
          <div className="modal-dialog" style={{ marginTop: '0' }}>
            <div className="modal-content">
              <div className="">
                <div className="modal-body" style={{ padding: '2px' }}>
                  <div>
                    <div style={{ width: '100%' }} className="croperholder">
                      <img style={{ maxWidth: '100%' }} id="image" src="" alt="" />
                    </div>
                  </div>
                  <div
                    style={{ margin: '10px 0' }}
                    className="col-md-12 col-xs-12 col-lg-12 col-sm-12"
                  >
                    {/* <button className="move-left-cropper btn "> 
                           <i className="fa fa-arrow-left"> </i>
                           </button> */}
                    {/* <button className="move-right-cropper btn "> 
                           <i className="fa fa-arrow-right"> </i>
                           </button> */}
                    {/* <button className="move-top-cropper btn "> 
                           <i className="fa fa-arrow-up"> </i>
                           </button> */}
                    {/* <button className="move-bottom-cropper btn "> 
                           <i className="fa fa-arrow-down"> </i>
                           </button> */}
                    <div className="dis-table">
                      <div
                        className="zoom-inout-outer"
                        style={{ width: '10%', textAlign: 'right', paddingRight: '20px' }}
                      >
                        {/* <button className=" btn"> */}
                        <i className="fa fa-search-minus"> </i>
                        {/* </button> */}
                      </div>
                      <div className="zoom-inout-outer" style={{ paddingTop: '5px' }}>
                        <div id="zoom-slider"></div>
                        <div className="row">
                          <div className="slider-val-area">
                            <span id="min-zoom-val" className="pull-left">
                              0
                            </span>
                          </div>
                          <div className="slider-val-area">
                            <span id="max-zoom-val" className="pull-right">
                              1
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="zoom-inout-outer"
                        style={{ width: '10%', textAlign: 'left', paddingLeft: '20px' }}
                      >
                        {/* <button className=" btn"> */}
                        <i className="fa fa-search-plus"> </i>
                        {/* </button> */}
                      </div>
                    </div>
                    {/* <button className="rotaedclock-cropper btn">    
                           <i className="fa fa-repeat"> </i>
                           </button> */}
                    {/* <button className="rotaedclocksanti-cropper btn"> 
                           <i className="fa fa-undo"> </i> 
                           </button> */}
                    {/* <button className="flip1-cropper btn">
                           <i className="fa fa-arrows-h"> </i> 
                           </button> */}
                    {/* <button className="flip2-cropper btn">
                           <i className="fa fa-arrows-v"> </i> 
                           </button> */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn add-user close crop-img btn-danger mkt_back_button"
                    data-dismiss="modal"
                  >
                    Crop And Upload
                  </button>
                  <button
                    type="button"
                    className="btn add-user  cancel close mkt_back_button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* crop js end  */}
        <div id="mycopmodal" className="modal fade" role="dialog">
          <div className="modal-dialog" style={{ marginTop: '0' }}>
            <div className="modal-content">
              <div className="">
                <div className="modal-body" style={{ padding: '2px' }}>
                  <div>
                    <div style={{ width: '100%' }} className="croperholder">
                      <img style={{ maxWidth: '100%' }} id="crop_target_image" src="" alt="" />
                    </div>
                  </div>
                  <div
                    style={{ margin: '10px 0' }}
                    className="col-md-12 col-xs-12 col-lg-12 col-sm-12"
                  >
                    {/* <button className="move-left-cropper btn "> 
                           <i className="fa fa-arrow-left"> </i>
                           </button> */}
                    {/* <button className="move-right-cropper btn "> 
                           <i className="fa fa-arrow-right"> </i>
                           </button> */}
                    {/* <button className="move-top-cropper btn "> 
                           <i className="fa fa-arrow-up"> </i>
                           </button> */}
                    {/* <button className="move-bottom-cropper btn "> 
                           <i className="fa fa-arrow-down"> </i>
                           </button> */}
                    <div className="dis-table">
                      <div
                        className="zoom-inout-outer"
                        style={{ width: '10%', textAlign: 'right', paddingRight: '20px' }}
                      >
                        {/* <button className=" btn"> */}
                        <i className="fa fa-search-minus"> </i>
                        {/* </button> */}
                      </div>
                      <div className="zoom-inout-outer" style={{ paddingTop: '5px' }}>
                        <div id="zoom-slider"></div>
                        <div className="row">
                          <div className="slider-val-area">
                            <span id="min-zoom-val" className="pull-left">
                              0
                            </span>
                          </div>
                          <div className="slider-val-area">
                            <span id="max-zoom-val" className="pull-right">
                              1
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="zoom-inout-outer"
                        style={{ width: '10%', textAlign: 'left', paddingLeft: '20px' }}
                      >
                        {/* <button className=" btn"> */}
                        <i className="fa fa-search-plus"> </i>
                        {/* </button> */}
                      </div>
                    </div>
                    {/* <button className="rotaedclock-cropper btn">    
                           <i className="fa fa-repeat"> </i>
                           </button> */}
                    {/* <button className="rotaedclocksanti-cropper btn"> 
                           <i className="fa fa-undo"> </i> 
                           </button> */}
                    {/* <button className="flip1-cropper btn">
                           <i className="fa fa-arrows-h"> </i> 
                           </button> */}
                    {/* <button className="flip2-cropper btn">
                           <i className="fa fa-arrows-v"> </i> 
                           </button> */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn add-user close crop-img btn-danger mkt_back_button"
                    data-dismiss="modal"
                  >
                    Crop And Upload
                  </button>
                  <button
                    type="button"
                    className="btn add-user  cancel close mkt_back_button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      {/* ADDED JBE*/}
      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <header>
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main>
          <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
        </main>
        <footer>
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
