import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getDefaultValues from './getDefaultValues';
import FormField from './FormField';
import Toolbar from './Toolbar';

const noop = () => {};

export const SimpleForm = ({ children, handleSubmit, invalid, record, resource, basePath, submitOnEnter, onSubmit, toolbar, redirect }) => {
    return (
        <form onSubmit={ submitOnEnter ? handleSubmit : noop } className="simple-form">
            <div style={{ padding: '0 1em 1em 1em' }}>
                {React.Children.map(children, input => input && (
                    <div key={input.props.source} className={`aor-input-${input.props.source}`} style={input.props.style}>
                        <FormField input={input} resource={resource} record={record} basePath={basePath} />
                    </div>
                ))}
            </div>
            {toolbar && React.cloneElement(toolbar, { invalid, submitOnEnter, handleSubmit, onSubmit, redirect })}
        </form>
    );
};

SimpleForm.propTypes = {
    toolbar: PropTypes.element,
    children: PropTypes.node,
    defaultValue: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    validate: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
};

SimpleForm.defaultProps = {
    submitOnEnter: true,
    toolbar: <Toolbar />,
};

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
    })),
    reduxForm({
        form: 'record-form',
        enableReinitialize: true,
    }),
);

export default enhance(SimpleForm);
