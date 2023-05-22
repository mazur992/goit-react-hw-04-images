import PropTypes from 'prop-types';
import { MutatingDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader(props) {
  const { loading } = props;
  return (
    loading && (
      <MutatingDots
        height="150"
        width="150"
        color="#303f9f"
        secondaryColor="#303f9f"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
        visible={true}
      />
    )
  );
}

Loader.propTypes = { loading: PropTypes.bool.isRequired };
