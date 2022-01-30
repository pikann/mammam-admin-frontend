import { Helmet } from 'react-helmet';

interface Props {
  title: string;
}

const HelmetComponent = (props: Props) => {
  const { title } = props;

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetComponent;