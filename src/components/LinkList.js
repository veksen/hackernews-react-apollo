import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

class LinkList extends Component {
  render() {
    // 1
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }

    // 2
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>
    }

    // 3
    const linksToRender = this.props.feedQuery.feed.links;

    return (
      <div>
        {linksToRender.map((link, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
      </div>
    )
  }
}

// 1
const FEED_QUERY = gql`
  # 2
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

// 3
export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);
