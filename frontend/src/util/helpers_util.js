import _ from "lodash";
import React from 'react';

export const log = (type, file, message) => {
    switch (type) {
        case "debug":
            console.debug(file,message);
            break;
        case "info":
            console.info(file,message);
            break;
        case "error":
            console.error(file,message);
            break;
        default:
            console.log(file,message);
            break;
    }
};

export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export function getDate(timestamp) {
    let d = new Date(timestamp);
    return d.toLocaleString();
}

export function getPostByID(posts, post_id) {
    let find = {};
    _.map(posts, post => {
        if (post.id === post_id) {
            find = post;
        }
    });

    return find;
}

export function renderField({
                                input,
                                label,
                                type,
                                meta: {touched, error, warning}
                            }) {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div>
                <input className="input" {...input} placeholder={label} type={type}/>
                {touched &&
                ((error && <span className="help is-danger">{error}</span>) ||
                    (warning && <span className="help is-warning">{warning}</span>))}
            </div>
        </div>
    )
}