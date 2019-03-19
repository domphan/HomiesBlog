import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostMenu } from '.';

const StyledMedia = styled(CardMedia)`
  height: 240px;
  object-fit: contain;
`;

const StyledCard = styled(Card)`
  margin: auto;
  margin-bottom: 10px;
  max-width: 800px;
  padding: 1%;
`;

export const BlogPost = (props) => {
  const postObject = {
    id: props.postID,
    title: props.title,
    textContent: props.textContent,
    mediaUrl: props.mediaUrl
  }
  return (
    <StyledCard>
      <Grid container
        spacing={8}
        justify='space-between'
      >
        <Grid item>
          <Typography component="p">
            <Link to="">Domphan</Link>
          </Typography>
        </Grid>
        <Grid item>
          <PostMenu currentPost={postObject} />
        </Grid>
      </Grid>
      <CardActionArea>
        {props.mediaUrl && <StyledMedia
          component="img"
          image={props.mediaUrl}
          title={props.title}
        />}
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography component="p">
          {props.textContent}
        </Typography>
      </CardContent>
    </StyledCard>

  )

}

export default BlogPost;