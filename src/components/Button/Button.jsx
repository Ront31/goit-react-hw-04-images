import propTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, children }) => (
  <button className={css.Button} onClick={onClick} type="button">
    {children}
  </button>
);
Button.propTypes = {
  onClick: propTypes.func.isRequired,
};
