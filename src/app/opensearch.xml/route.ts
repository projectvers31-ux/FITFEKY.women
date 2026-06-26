/**
 * GET /opensearch.xml
 *
 * OpenSearch description document. Allows browsers and AI tools to register
 * FitFeky as a search provider, enabling direct catalog search from the
 * address bar or assistant interfaces.
 */
export const dynamic = "force-static";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>FitFeky</ShortName>
  <Description>Search quality-scored at-home fitness gear for women over 40</Description>
  <Tags>fitness women over 40 walking pad resistance bands yoga smart scale massage gun</Tags>
  <Contact>hello@fitfeky.com</Contact>
  <Url type="text/html" method="get" template="https://fitfeky.com/?q={searchTerms}"/>
  <Image height="64" width="64" type="image/svg+xml">https://fitfeky.com/logo.svg</Image>
  <AdultContent>false</AdultContent>
  <Language>en-us</Language>
  <OutputEncoding>UTF-8</OutputEncoding>
  <InputEncoding>UTF-8</InputEncoding>
  <SyndicationRight>open</SyndicationRight>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
    },
  });
}
