export const getStaticProps = async () => {
  return {
    props: {
      data: {
        title: "404",
        description: "Page not found",
        tags: "use-form, useform, nextjs, reactjs",
      },
    },
  };
};

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return <div>Page not found 404</div>;
}

export default Index;
