import React from 'react';
import styles from './Card.styles';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card as MuiCard,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { LocaleContext } from '@/context';

const useStyles = makeStyles(styles);

function Card (props) {
  const {
    className,
    contentClass,
    header,
    media,
    children,
    actions,
    expand,
    translate,
    ...other
  } = props;

  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <MuiCard className={clsx('Card', className, classes.card)} {...other}>
      {header && <CardHeader
        avatar={header.avatar}
        action={header.action}
        title={header.title}
        subheader={header.subtitle}
      />}
      {media && <CardMedia
        className={classes.media}
        image={media.src}
        title={media.title}
      />}
      <CardContent className={clsx(contentClass)}>
        {children}
      </CardContent>
      {actions && actions.length > 0 && <CardActions disableSpacing>
        {actions.map((action, index) => (
          <IconButton key={index} aria-label={action.title} onClick={action.onClick}>
            {action.icon}
          </IconButton>
        ))}
        {expand &&
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label={expanded ? translate('Collapse') : translate('Expand')}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      </CardActions>}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

        </CardContent>
      </Collapse>
    </MuiCard>
  );
}

Card.propTypes = {
  actions: PropTypes.array
};
Card.defaultProps = {
  actions: []
};

export default React.forwardRef((props, ref) => (
  <LocaleContext.Consumer>
    {(locale) => <Card {...props} translate={locale.translate} ref={ref} />}
  </LocaleContext.Consumer>
));
