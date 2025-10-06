import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { brigades } from "../data/brigades";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const BrigadesList = () => {
  return (
    <Paper elevation={2}>
      <List>
        {brigades.map((brigade) => (
          <StyledLink to={`/brigade/:${brigade.id}`} key={brigade.id}>
            <ListItem>
              <ListItemText
                primary={brigade.name}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Керівник: {brigade.head}
                  </Typography>
                }
              />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Paper>
  );
};

export default BrigadesList;
