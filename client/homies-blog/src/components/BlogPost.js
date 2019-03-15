import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

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
  return (
    <StyledCard>
      <Typography component="p">
        <a href="">Domphan</a>
      </Typography>
      <CardActionArea>
        <StyledMedia
          component="img"
          image={props.mediaUrl}
          title={props.title}
        />
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