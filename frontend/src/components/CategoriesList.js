import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Panel, PanelBlock, PanelHeading} from 'bloomer';
import {capitalize} from "../util/helpers_util";
import ReactPlaceholder from 'react-placeholder';


class CategoriesList extends Component {

    renderList() {
        const {active, categories, fetchPost} = this.props;

        if (categories) {
            return (
                <div>
                    <Panel>
                        <PanelHeading>Categories</PanelHeading>
                        <PanelBlock isActive={active === "all"}>
                            <Link to="/" onClick={() => fetchPost("all")}>All</Link>
                        </PanelBlock>
                        {
                            _.map(categories, category => {
                                return (
                                    <PanelBlock
                                        key={category.path}
                                        isActive={active === category.path}
                                    >
                                        <Link
                                            to={`/${category.path}`}
                                            onClick={() => fetchPost(category.path)}
                                        >
                                            {capitalize(category.name)}
                                        </Link>
                                    </PanelBlock>
                                );
                            })
                        }
                    </Panel>
                </div>
            )
        }
        return (
            <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                <div>Loading...</div>
            </ReactPlaceholder>
        );

    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

export default CategoriesList;