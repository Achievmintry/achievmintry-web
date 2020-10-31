import React from "react";

const Iframe = ({iframe}) => {
    return (<div dangerouslySetInnerHTML={ {__html: iframe ? iframe : ""}} />);
};

export default Iframe;