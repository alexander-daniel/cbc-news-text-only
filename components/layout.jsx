import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";

export default withRouter(({ title, children, router }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        <small>{new Date().toDateString()}</small>
      </div>

      {router.pathname === "/" ? null : <Link href="/">{"Home"}</Link>}

      <h1>{title}</h1>

      {children}
    </>
  );
});
