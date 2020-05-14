import { gql } from "apollo-boost";

export const GET_SONGS = gql`
  query getSongs {
    songs(order_by: { created_at: desc }) {
      id
      thumbnail
      title
      url
      duration
      artist
    }
  }
`;

//query from local cache apollo
export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queue @client {
      id
      duration
      title
      artist
      thumbnail
      url
    }
  }
`;
