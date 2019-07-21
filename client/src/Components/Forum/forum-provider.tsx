// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ForumCanvas, IDiscussionPreviewData } from "./forum-canvas";
import { baseGetRequest } from "./../../util/base-requests";

interface IForumProviderState {
    forumData: {
        chatTitle: string,
        chatPreviews: IDiscussionPreviewData[]
    };
}

class ForumProviderClass extends React.Component<RouteComponentProps<{}>, IForumProviderState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            forumData: undefined
        };
    }

    getTopicId = () => {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        console.log(topicId);
        return topicId;
    };

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <ForumCanvas
                forumData={this.state.forumData}
                match={this.props.match}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveChatPreviews();
    }

    retrieveChatPreviewsResponseHandler = (data: any) => {
        this.setState({
            forumData: data
        });
    }

    retrieveChatPreviewsErrorHandler = (error: any) => {
        console.error(error);
    }

    retrieveChatPreviews = () => {
        const params = [
            {["topicId"]: this.getTopicId()}
        ];
        baseGetRequest("getchatpreviews", params, this.retrieveChatPreviewsResponseHandler, this.retrieveChatPreviewsErrorHandler);
    }
}

export const Forum = withRouter(ForumProviderClass);