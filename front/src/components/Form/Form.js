import React from 'react';
import styles from './Form.styles';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography
} from '@material-ui/core';

import {
  Button,
  Input,
  Loading,
  Select
} from '@/components';

const useStyles = makeStyles(styles);

function Form (props) {
  const {
    className,
    title,
    fields,
    setError,
    onSubmit,
    submitText,
    isLoading,
    ...other
  } = props;

  const classes = useStyles();

  function getInputType (type) {
    switch (type) {
      case 'email': return 'email';
      case 'password':
      case 'repeatPassword': return 'password';
      default: return 'text';
    }
  }

  function handleSubmit () {
    // TODO: Check errors
    onSubmit();
  }

  return (
    <form className={clsx('Form', classes.root, className)} noValidate {...other}>
      <Typography className={clsx(classes.formTitle)} variant="h5">{title}</Typography>
      {fields.map((field, index) => {
        switch (field.type) {
          case 'input': {
            const {
              inputType,
              ...other
            } = field;

            return <Input
              key={index}
              className={classes.input}
              {...other}
              type={getInputType(field.inputType)}
              inputProps={field.inputType === 'password' ? {
                autoComplete: 'new-password'
              } : undefined}
            />
          }
          case 'select': {
            const {
              type,
              ...other
            } = field;

            return <Select
              key={index}
              {...other}
              inputProps={{ className: classes.input }}
            />
          }
          default:
            return null;
        }
      })}

      <div className={clsx(classes.actions)}>
        {onSubmit && <Button color="primary" onClick={handleSubmit}>{submitText || 'Submit'}</Button>}
      </div>

      <Loading className={clsx(classes.loading)} isLoading={isLoading} />
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool
};

Form.defaultProps = {

};

export default Form;
