
import Head from "next/head";

export default function CustomHead({ title, descriptionMetaContent, children }) {
    return (
        <Head>
            <title>{ title }</title>
            <meta name="description" content={descriptionMetaContent} />
            <link rel="icon" href="/favicon.ico" />
            { children }
        </Head>
    )
}

CustomHead.defaultProps = {
    title: "AccelerAid",
    descriptionMetaContent: "A tool for helping manage delivered aid to reciepients in need."
}