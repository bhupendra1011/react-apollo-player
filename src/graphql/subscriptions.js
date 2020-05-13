import { gql } from "apollo-boost";

export const GET_SONGS = gql`
  subscription getSongs {
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
